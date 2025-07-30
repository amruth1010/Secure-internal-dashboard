from django.shortcuts import render
from .models import Passkey
from django.contrib.auth.models import User  
from rest_framework.response import Response
from rest_framework import status
import base64
import json
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer
from .utils import log_action 
from twilio.rest import Client
from decouple import config
from django.conf import settings
from .models import AuditLog
from .models import CallLog
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Passkey
from .serializers import AuditLogSerializer
from django.http import HttpResponse
from .models import Contact
import csv

@api_view(['POST'])
def register_passkey(request):
    try:
        data = request.data

        
        credential_id = data.get("id")
        raw_id = data.get("rawId")
        attestation_object = data["response"]["attestationObject"]
        client_data_json = data["response"]["clientDataJSON"]

        
        user = User.objects.get(username="admin") 

       
        Passkey.objects.create(
            user=user,
            credential_id=credential_id,
            raw_id=raw_id,
            attestation_object=attestation_object,
            client_data_json=client_data_json
        )

       
        log_action(user, "Registered Passkey", f"Credential ID: {credential_id[:10]}...")

        return Response({"message": "✅ Passkey stored in DB!"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def login_passkey(request):
    try:
        data = request.data
        print("Received login credential:", data)

        credential_id = data.get("id")
        passkey = Passkey.objects.filter(credential_id=credential_id).first()

        if not passkey:
            return Response({"error": "Passkey not found"}, status=status.HTTP_404_NOT_FOUND)

        user = passkey.user

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login success",
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_contacts(request):
    contacts = Contact.objects.filter(user__username="admin")  
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=User.objects.get(username="admin"))  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response({"error": "Contact not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ContactSerializer(contact, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_contact(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
        contact.delete()
        return Response({"message": "Contact deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Contact.DoesNotExist:
        return Response({"error": "Contact not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def audit_logs(request):
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication required."}, status=status.HTTP_403_FORBIDDEN)

    logs = AuditLog.objects.filter(user=request.user).order_by('-timestamp')
    serializer = AuditLogSerializer(logs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def export_contacts_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="contacts.csv"'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Name', 'Email', 'Phone', 'Notes', 'Created At'])

    contacts = Contact.objects.filter(user=request.user)

    for contact in contacts:
        writer.writerow([
            contact.id,
            contact.name,
            contact.email,
            contact.phone,
            contact.notes,
            contact.created_at.strftime('%Y-%m-%d %H:%M:%S')
        ])

    return response


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_call(request):
    try:
        to_phone_number = request.data.get('to')

        if not to_phone_number:
            return Response({"error": "Phone number is required."}, status=status.HTTP_400_BAD_REQUEST)

        account_sid = config('TWILIO_ACCOUNT_SID')
        auth_token = config('TWILIO_AUTH_TOKEN')
        twilio_number = config('TWILIO_PHONE_NUMBER')

        client = Client(account_sid, auth_token)

        call = client.calls.create(
            to=to_phone_number,
            from_=twilio_number,
            twiml='<Response><Say>Hello! This is a test call from your Django app.</Say></Response>'
        )


        CallLog.objects.create(
            user=request.user,
            to_phone=to_phone_number,
            sid=call.sid,
            status="initiated"
        )

        return Response({"message": "Call initiated", "call_sid": call.sid}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def call_logs(request):
    logs = CallLog.objects.filter(user=request.user).order_by('-created_at')
    data = [
        {
            "to": log.to_phone,
            "sid": log.sid,
            "status": log.status,
            "created_at": log.created_at
        }
        for log in logs
    ]
    return Response(data, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_sms(request):
    try:
        to_phone = request.data.get("to")
        message_body = request.data.get("message")

        if not to_phone or not message_body:
            return Response({"error": "Phone and message are required."}, status=status.HTTP_400_BAD_REQUEST)

        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

        message = client.messages.create(
            body=message_body,
            from_=settings.TWILIO_PHONE_NUMBER,
            to=to_phone
        )

        
        AuditLog.objects.create(
            user=request.user,
            action="Sent SMS",
            detail=f"Message to {to_phone}: {message_body}"
        )

        return Response({"message": "SMS sent", "sid": message.sid}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_call_logs(request):
    logs = CallLog.objects.filter(user=request.user).order_by('-timestamp')
    data = [
        {
            "id": log.id,
            "to": log.to,
            "status": log.status,
            "duration": log.duration,
            "timestamp": log.timestamp
        }
        for log in logs
    ]
    return Response(data)

from django.db import models
from django.contrib.auth.models import User  

class Passkey(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    credential_id = models.CharField(max_length=255, unique=True)
    raw_id = models.TextField()
    attestation_object = models.TextField()
    client_data_json = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Passkey for {self.user.username}"



class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Who owns this contact
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class AuditLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    detail = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.action} at {self.timestamp}"

from django.db import models
from django.contrib.auth.models import User

class CallLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    to_phone = models.CharField(max_length=20)
    sid = models.CharField(max_length=100)  # Twilio Call SID
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} → {self.to_phone} ({self.status})"        
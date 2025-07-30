from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register-passkey/", views.register_passkey),
    path("login-passkey/", views.login_passkey),
    path("contacts/", views.list_contacts),
    path("contacts/create/", views.create_contact),
    path("contacts/<int:pk>/update/", views.update_contact),
    path("contacts/delete/<int:pk>/", views.delete_contact),
    path("profile/", views.user_profile, name='user-profile'), 
    path("audit-logs/", views.audit_logs),
    path("export-contacts/", views.export_contacts_csv),
    
    # JWT Auth endpoints
    path("token/", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),
    
    path('make-call/', views.make_call, name='make-call'),
    path('send-sms/', views.send_sms, name='send_sms'),
    path('call-logs/', views.call_logs, name='call_logs'),
    path('call-logs/', views.get_call_logs, name='call_logs'),

]

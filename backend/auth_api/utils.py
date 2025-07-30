from .models import AuditLog

def log_action(user, action, detail=""):
    AuditLog.objects.create(
        user=user,
        action=action,
        detail=detail
    )
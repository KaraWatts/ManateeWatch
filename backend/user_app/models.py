from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager  # add this import
import uuid
from django.utils import timezone
from datetime import timedelta

# Create your models here.
class Client(AbstractUser):
    username = None 
    email = models.EmailField(unique=True)

    objects = UserManager()  # add this line
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    #related to profile

class PasswordResetToken(models.Model):
    user = models.ForeignKey(Client, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    used = models.BooleanField(default=False)
    
    def is_valid(self):
        """Check if token is still valid (not used and not expired)"""
        return not self.used and self.created_at > timezone.now() - timedelta(hours=24)
    
    def __str__(self):
        return f"Password reset token for {self.user.email}"
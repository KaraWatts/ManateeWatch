from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager  # add this import

# Create your models here.
class Client(AbstractUser):
    username = None 
    email = models.EmailField(unique=True)

    objects = UserManager()  # add this line
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    #related to profile
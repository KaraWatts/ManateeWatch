from django.db import models
from user_app.models import Client


# Create your models here.
class User_Profile(models.Model):
    user = models.OneToOneField(Client, on_delete=models.CASCADE)
    display_name=models.CharField()
    profile_picture = models.TextField(null=True)
    #sightings - from Sighting_data model
    #num_sightings - calculated from serializer
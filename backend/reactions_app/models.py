from django.db import models
from map_app.models import Sighting_Data
from profile_app.models import User_Profile

# Create your models here.
class Reactions(models.Model):
    sighting = models.ForeignKey(Sighting_Data, on_delete=models.CASCADE, related_name="reactions")
    comment=models.TextField(max_length=500)
    user=models.ForeignKey(User_Profile, on_delete=models.CASCADE)
    date=models.DateTimeField()
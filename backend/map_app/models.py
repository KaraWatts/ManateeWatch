from django.db import models
from user_app.models import Client

# Create your models here.
class Sighting_Data(models.Model):
    lat = models.DecimalField(max_digits=25, decimal_places=10)
    lon = models.DecimalField(max_digits=25, decimal_places=10)
    user = models.ForeignKey(Client, on_delete=models.SET_NULL, related_name="sightings", null=True)
    data_source = models.CharField(null=True)
    num_Adults = models.SmallIntegerField(default=0, null=True)
    num_Calf = models.SmallIntegerField(default=0, null=True)
    activity = models.CharField(default="Swimming")
    comments = models.TextField(null=True, blank=True)
    sighting_date = models.DateTimeField()
    created_date = models.DateTimeField(auto_now_add=True)
    image = models.TextField(null=True)


    
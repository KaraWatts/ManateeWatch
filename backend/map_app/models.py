from django.db import models

# Create your models here.
class Sighting_Data(models.Model):
    lat = models.DecimalField(max_digits=25, decimal_places=10)
    lon = models.DecimalField(max_digits=25, decimal_places=10)
    User_ID = models.CharField()
    Num_Adults = models.SmallIntegerField(null=True, blank=True)
    Num_Calf = models.SmallIntegerField(null=True, blank=True)
    Activity = models.CharField(null=True, blank=True)
    Comments = models.TextField(null=True, blank=True)
    Sighting_date = models.DateTimeField()
    Created_date = models.DateTimeField()
    Image = models.TextField(null=True)
    # Image = models.ImageField(null=True)

    
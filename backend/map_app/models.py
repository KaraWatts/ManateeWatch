from django.db import models

# Create your models here.
class Sighting_Data(models.Model):
    lat = models.DecimalField(max_digits=25, decimal_places=10)
    lon = models.DecimalField(max_digits=25, decimal_places=10)
    User_ID = models.CharField()
    Num_Adults = models.SmallIntegerField()
    Num_Calf = models.SmallIntegerField()
    Activity = models.CharField()
    Comments = models.TextField(null=True)
    Sighting_date = models.DateTimeField()
    Created_date = models.DateTimeField()
    Image = models.ImageField(null=True)
    
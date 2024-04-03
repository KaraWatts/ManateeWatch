from django.urls import path
from .views import AllSightings

urlpatterns = [
    path('', AllSightings.as_view(), name="all_sightings")
]
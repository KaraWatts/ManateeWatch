from django.urls import path
from .views import AllSightings, ModerateImage, NewSighting

urlpatterns = [
    path('', AllSightings.as_view(), name="all_sightings"),
    path('submitImage/', ModerateImage.as_view(), name="moderate_image"),
    path('new/', NewSighting.as_view(), name="new_sighting")
]
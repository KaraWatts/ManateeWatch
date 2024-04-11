from django.urls import path
from .views import AllSightings, ModerateImage

urlpatterns = [
    path('', AllSightings.as_view(), name="all_sightings"),
    path('submitImage/', ModerateImage.as_view(), name="moderate_image")
]
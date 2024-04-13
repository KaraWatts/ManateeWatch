from django.urls import path
from .views import ViewAllProfiles, View_Profile, EditProfile

urlpatterns = [
    path('', View_Profile.as_view(), name="profile_by_id"),
]
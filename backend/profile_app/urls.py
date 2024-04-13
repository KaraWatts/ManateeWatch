from django.urls import path
from .views import ViewAllProfiles, View_Profile, EditProfile

urlpatterns = [
    path('', ViewAllProfiles.as_view(), name="all_profiles"),
    path('<int:user_id>/', View_Profile.as_view(), name="profile_by_id"),
    path('<int:user_id>/edit/', EditProfile.as_view(), name='edit_profile')

]
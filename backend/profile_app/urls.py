from django.urls import path
from .views import ViewProfile, SearchProfile
urlpatterns = [
    path('', ViewProfile.as_view(), name="user_profile"),
    path('<int:user_id>/', SearchProfile.as_view(), name="profile_by_id"),
    ]
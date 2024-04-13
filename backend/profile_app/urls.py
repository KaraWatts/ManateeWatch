from django.urls import path
from .views import ViewProfile
urlpatterns = [
    path('', ViewProfile.as_view(), name="profile_by_id"),
]
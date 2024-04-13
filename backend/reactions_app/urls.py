from django.urls import path
from .views import NewComment

urlpatterns = [
    path('new/', NewComment.as_view(), name="new_comment"),
    # path('')
    # path('submitImage/', ModerateImage.as_view(), name="moderate_image"),
    # path('new/', NewSighting.as_view(), name="new_sighting"),
    # path('<int:sighting_id>/', include('reactions_app.urls')),
]
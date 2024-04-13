from django.urls import path
from .views import AllComments, A_Comment

urlpatterns = [
    path('', AllComments.as_view(), name="all_comments"),
    path('<int:comment_id>', A_Comment.as_view(), name="comment_by_id"),
]
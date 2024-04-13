
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_406_NOT_ACCEPTABLE,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from manateewatch_proj.settings import env
from user_app.views import TokenReq
from map_app.models import Sighting_Data
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from profile_app.models import User_Profile
from .models import Reactions
from .serializers import CommentSerializer


# Create your views here.
class NewComment(APIView):
    def post(self, request, sighting_id):
        requestData = request.data.copy()
        sighting = get_object_or_404(Sighting_Data, id=sighting_id)
        user = get_object_or_404(User_Profile, id=requestData['user_id'])
        new_comment = Reactions(comment=requestData['comment'], sighting=sighting, user=user)
        print(CommentSerializer(new_comment).data)
        return Response(requestData, status=HTTP_200_OK)



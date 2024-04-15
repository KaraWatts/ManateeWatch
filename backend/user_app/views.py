from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from django.contrib.auth import login, logout, authenticate
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import Client
from profile_app.serializers import User_Profile, ProfileSerializer
from .serializers import UserSerializer



# Create your views here.
class Sign_Up(APIView):

    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("username", request.data.get("email"))

        #create new user instance
        new_user = Client(email=data['email'], username=data["username"], password=data['password'])
        #create new profile instance
        new_profile = User_Profile(user=new_user, display_name=data.get("display_name"))

        try:
            new_user.full_clean()
            #set user password
            new_user.set_password(data.get("password"))
            #set user data
            new_user.save()

            #set profile data
            new_profile.save()
            #automatically login to new user
            login(request, new_user)
            token = Token.objects.create(user = new_user)
            profileData = ProfileSerializer(new_profile)
            return Response({"user":profileData.data, "token":token.key}, status=HTTP_201_CREATED)
        
        except ValidationError as e:
            print(e)
            return Response(e, status=HTTP_400_BAD_REQUEST)


class Log_in(APIView):

    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("username", request.data.get("email"))
        #Check that user exists in database
        if Client.objects.filter(email=request.data.get("email")).exists():
            #authenticate credentials
            user = authenticate(username=data.get("username"), password=data.get("password"))

            if user:
                login(request, user)
                token, created = Token.objects.get_or_create(user = user)

                profileData = User_Profile.objects.get(user=user)
                ser_profile = ProfileSerializer(profileData)
                return Response({"user":ser_profile.data, "token":token.key}, status=HTTP_200_OK)
            return Response("Incorrect Password", status=HTTP_401_UNAUTHORIZED)
        
        return Response("No user matching credentials", status=HTTP_400_BAD_REQUEST)

class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Log_out(TokenReq):
    
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)
    
class Info(TokenReq):

    def get(self, request):
        try:
            ruser = request.user
            
            return Response(ruser.id, status=HTTP_200_OK)
        except:
            return Response("No user matching credentials", status=HTTP_400_BAD_REQUEST)
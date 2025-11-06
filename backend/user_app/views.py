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
    HTTP_404_NOT_FOUND,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import Client, PasswordResetToken
from profile_app.serializers import User_Profile, ProfileSerializer
from .serializers import UserSerializer
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import get_object_or_404



# Create your views here.
class Sign_Up(APIView):

    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("username", request.data.get("email"))

        #create new user instance
        new_user = Client(email=data['email'], password=data['password'])
        #create new profile instance
        new_profile = User_Profile(user=new_user, display_name=data.get("display_name"))

        #password match validation
        if data.get("password") != data.get("confirm_password"):
            return Response("Passwords do not match", status=HTTP_400_BAD_REQUEST)
    
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
        
class Reset_Password(TokenReq):

    def post(self, request):
        data = request.data.copy()
        new_password = data.get("new_password")
        confirm_password = data.get("confirm_password")

        if new_password != confirm_password:
            return Response("Passwords do not match", status=HTTP_400_BAD_REQUEST)
        
        user = request.user
        user.set_password(new_password)
        user.save()
        return Response("Password successfully changed", status=HTTP_200_OK)


class ForgotPassword(APIView):
    """
    Send password reset email to user
    """
    def post(self, request):
        email = request.data.get('email')
        
        if not email:
            return Response({"error": "Email is required"}, status=HTTP_400_BAD_REQUEST)
        
        try:
            user = Client.objects.get(email=email)
            
            # Invalidate any existing tokens for this user
            PasswordResetToken.objects.filter(user=user, used=False).update(used=True)
            
            # Create new reset token
            reset_token = PasswordResetToken.objects.create(user=user)
            
            # Create reset URL (you'll need to adjust this based on your frontend URL)
            reset_url = f"{settings.FRONTEND_URL}/reset-password/{reset_token.token}"
            
            # Send email
            subject = "ManateeWatch - Password Reset Request"
            message = f"""
            Hello,
            
            You requested a password reset for your ManateeWatch account.
            
            Click the link below to reset your password:
            {reset_url}
            
            This link will expire in 24 hours.
            
            If you didn't request this reset, please ignore this email.
            
            Best regards,
            ManateeWatch Team
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            
            return Response({"message": "Password reset email sent successfully"}, status=HTTP_200_OK)
            
        except Client.DoesNotExist:
            # Don't reveal if email exists or not for security
            return Response({"message": "If the email exists, a reset link has been sent"}, status=HTTP_200_OK)
        except Exception as e:
            print(f"Error sending password reset email: {e}")
            return Response({"error": "Failed to send reset email"}, status=HTTP_400_BAD_REQUEST)


class ResetPasswordConfirm(APIView):
    """
    Reset password using token from email
    """
    def post(self, request, token):
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')
        
        if not new_password or not confirm_password:
            return Response({"error": "Both password fields are required"}, status=HTTP_400_BAD_REQUEST)
        
        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=HTTP_400_BAD_REQUEST)
        
        try:
            reset_token = get_object_or_404(PasswordResetToken, token=token)
            
            if not reset_token.is_valid():
                return Response({"error": "Token is invalid or expired"}, status=HTTP_400_BAD_REQUEST)
            
            # Reset the password
            user = reset_token.user
            user.set_password(new_password)
            user.save()
            
            # Mark token as used
            reset_token.used = True
            reset_token.save()
            
            # Invalidate all auth tokens to force re-login
            Token.objects.filter(user=user).delete()
            
            return Response({"message": "Password reset successfully"}, status=HTTP_200_OK)
            
        except Exception as e:
            print(f"Error resetting password: {e}")
            return Response({"error": "Failed to reset password"}, status=HTTP_400_BAD_REQUEST)
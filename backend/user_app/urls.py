from django.urls import path
from .views import Sign_Up, Log_in, Log_out, Info, Reset_Password, ForgotPassword, ResetPasswordConfirm

urlpatterns = [
    path('signup/', Sign_Up.as_view(), name='signup'),
    path('login/', Log_in.as_view(), name='login'),
    path('logout/', Log_out.as_view(), name='logout'),
    path('reset-password/', Reset_Password.as_view(), name='reset_password'),
    path('forgot-password/', ForgotPassword.as_view(), name='forgot_password'),
    path('reset-password-confirm/<uuid:token>/', ResetPasswordConfirm.as_view(), name='reset_password_confirm'),
    path('', Info.as_view(), name='info'),
]
from django.urls import path
from . import views
    
urlpatterns = [
    path('sign-in', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sign-up', views.RegistrationView.as_view(), name='register'),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('refresh', views.RefreshTokenView.as_view(), name='token_refresh'),
]

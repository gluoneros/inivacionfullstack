from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    CustomTokenObtainPairView,
    CookieTokenRefreshView,
    LogoutView,
    MeView
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),  # login simple
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),  # login con JWT
    path("token/refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", MeView.as_view(), name="me"),
]

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    CustomTokenObtainPairSerializer
)
from .models import User


class RegisterView(generics.CreateAPIView):
    """Registro de usuario"""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(generics.GenericAPIView):
    """Login usando el LoginSerializer"""
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class CustomTokenObtainPairView(TokenObtainPairView):
    """Login pero usando JWT directamente"""
    serializer_class = CustomTokenObtainPairSerializer


class CookieTokenRefreshView(TokenRefreshView):
    """Refrescar el token"""
    pass


class LogoutView(generics.GenericAPIView):
    """Logout invalidando el refresh token"""
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout exitoso"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"detail": "Token inválido o ya caducado"}, status=status.HTTP_400_BAD_REQUEST)


class MeView(generics.RetrieveAPIView):
    """Devuelve el perfil del usuario autenticado"""
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

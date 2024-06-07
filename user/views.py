"""
Views for the user API.
"""

from rest_framework.response import Response
from rest_framework import (
    status,
    generics
)
from rest_framework_simplejwt import authentication as authenticationJWT
from user.serializers import UserSerializer
from user.permissions import IsCreationOrIsAuthenticated

class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer

class ManagerUserApiView(generics.RetrieveUpdateAPIView):
    """Manage for the authenticated users"""
    serializer_class = UserSerializer
    authentication_classes = [authenticationJWT.JWTAuthentication]
    permission_classes = [IsCreationOrIsAuthenticated]
    
    def get_object(self):
        return self.request.user
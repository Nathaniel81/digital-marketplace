from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from cloudinary.utils import cloudinary_url


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'email',
        ]

    def get__id(self, obj):
        return obj.id

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializer(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'id', 
            'email', 
            'password', 
        ]
        read_only_fields = ['id']

    def save(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        validated_data['id'] = user.id

        refresh_token = RefreshToken.for_user(user)
        access_token = str(refresh_token.access_token)

        validated_data['access_token'] = access_token
        validated_data['refresh_token'] = str(refresh_token)

        return validated_data

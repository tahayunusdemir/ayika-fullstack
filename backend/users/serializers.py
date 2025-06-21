from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('tc_kimlik_no', 'password', 'password_confirm', 'email', 'first_name', 'last_name', 'phone_number', 'city')

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Şifreler eşleşmiyor."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            tc_kimlik_no=validated_data['tc_kimlik_no'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data.get('phone_number', ''),
            city=validated_data.get('city', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Token'a ek bilgi ekleyebilirsiniz (isteğe bağlı)
        token['first_name'] = user.first_name
        return token

    default_error_messages = {
        'no_active_account': 'Bu kimlik bilgileriyle eşleşen aktif bir hesap bulunamadı.'
    }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Frontend'e gönderilecek alanları belirle
        fields = ('tc_kimlik_no', 'first_name', 'last_name', 'email', 'phone_number', 'city') 
from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.validators import RegexValidator
from rest_framework.validators import UniqueValidator

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Bu e-posta adresi zaten kullanılıyor.")],
        error_messages={
            'required': 'E-posta alanı zorunludur.',
            'blank': 'E-posta alanı boş bırakılamaz.',
            'invalid': 'Lütfen geçerli bir e-posta adresi girin.'
        }
    )
    tc_kimlik_no = serializers.CharField(
        required=True,
        validators=[
            UniqueValidator(queryset=User.objects.all(), message="Bu T.C. Kimlik Numarası zaten kayıtlı."),
            RegexValidator(
                regex=r'^[0-9]{11}$',
                message='T.C. Kimlik Numarası 11 rakamdan oluşmalıdır.',
                code='invalid_tc_kimlik_no'
            )
        ],
        error_messages={
            'required': 'T.C. Kimlik Numarası alanı zorunludur.',
            'blank': 'T.C. Kimlik Numarası alanı boş bırakılamaz.'
        }
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        min_length=6,
        error_messages={
            'required': 'Şifre alanı zorunludur.',
            'blank': 'Şifre alanı boş bırakılamaz.',
            'min_length': 'Şifre en az 6 karakter uzunluğunda olmalıdır.'
        }
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        error_messages={
            'required': 'Şifre doğrulama alanı zorunludur.',
            'blank': 'Şifre doğrulama alanı boş bırakılamaz.',
        }
    )

    class Meta:
        model = User
        fields = ('tc_kimlik_no', 'password', 'password_confirm', 'email', 'first_name', 'last_name', 'phone_number', 'city')
        extra_kwargs = {
            'first_name': {
                'required': True,
                'error_messages': {'required': 'Ad alanı zorunludur.', 'blank': 'Ad alanı boş bırakılamaz.'}
            },
            'last_name': {
                'required': True,
                'error_messages': {'required': 'Soyad alanı zorunludur.', 'blank': 'Soyad alanı boş bırakılamaz.'}
            },
            'phone_number': {
                'required': False,
                'allow_blank': True,
                'validators': [
                    RegexValidator(
                        regex=r'^(\d{10})?$',
                        message='Telefon numarası 10 rakamdan oluşmalıdır (örn: 5551234567).',
                        code='invalid_phone_number'
                    )
                ]
            }
        }

    def validate(self, attrs):
        if attrs['password'] != attrs.get('password_confirm'):
            raise serializers.ValidationError({"password_confirm": "Şifreler eşleşmiyor."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm', None)
        return User.objects.create_user(**validated_data)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Varsayılan `USERNAME_FIELD` `tc_kimlik_no` olduğu için onu kullanıyoruz
        tc_kimlik_no = attrs.get(self.username_field)
        password = attrs.get('password')

        user = None
        try:
            # User modelindeki USERNAME_FIELD'e göre kullanıcıyı getir
            user = User.objects.get(tc_kimlik_no=tc_kimlik_no)
        except User.DoesNotExist:
            raise serializers.ValidationError({
                'detail': 'Bu T.C. Kimlik Numarasına sahip bir kullanıcı bulunamadı.'
            })

        if not user.check_password(password):
            raise serializers.ValidationError({'detail': 'Girilen şifre yanlış.'})

        if not user.is_active:
            raise serializers.ValidationError({'detail': 'Bu kullanıcı hesabı aktif değil.'})

        self.user = user

        # Doğrulama başarılı, token'ları oluştur
        refresh = self.get_token(self.user)

        data = {}
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Cevaba ek kullanıcı bilgilerini ekle
        # Not: UserSerializer, frontend'e hangi alanların gönderileceğini tanımlar.
        data['user'] = UserSerializer(self.user).data

        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Frontend'e gönderilecek alanları belirle
        fields = ('tc_kimlik_no', 'first_name', 'last_name', 'email', 'phone_number', 'city') 
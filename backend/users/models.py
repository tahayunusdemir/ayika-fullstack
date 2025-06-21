from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Varsayılan 'username' alanını T.C. Kimlik No ile değiştireceğiz.
    # Bu nedenle, login için kullanılacak alanı belirtiyoruz.
    USERNAME_FIELD = 'tc_kimlik_no'

    # AbstractUser'daki username'i null yapıp unique'i kaldırıyoruz, çünkü tc_kimlik_no kullanacağız
    username = models.CharField(max_length=150, unique=False, blank=True, null=True)

    # Yeni alanlar
    tc_kimlik_no = models.CharField(max_length=11, unique=True, primary_key=True, verbose_name="T.C. Kimlik Numarası")
    phone_number = models.CharField(max_length=15, blank=True, verbose_name="Telefon Numarası")
    city = models.CharField(max_length=50, blank=True, verbose_name="Şehir")

    # Kayıt olurken 'email' ve 'tc_kimlik_no' alanlarının zorunlu olmasını sağlıyoruz
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def __str__(self):
        return self.get_full_name() or self.tc_kimlik_no

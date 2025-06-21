# Django Backend ile Kimlik Doğrulama (Authentication) Entegrasyon Planı (Genişletilmiş Versiyon)

Bu döküman, mevcut React `frontend` uygulaması için sıfırdan bir Django backend oluşturarak kimlik doğrulama (kayıt olma, giriş yapma) işlemlerini gerçeklemeye yönelik adımları içerir. Bu plan, PostgreSQL entegrasyonu ve detaylı frontend uygulama adımlarını da kapsar.

---

## Genel Bakış

-   **Backend:** Django, Django REST Framework
-   **Kimlik Doğrulama:** JWT (JSON Web Tokens) ile `djangorestframework-simplejwt`
-   **Veritabanı:** Üretim için **PostgreSQL**
-   **İletişim:** Frontend ve backend arasında REST API üzerinden.

---

## Bölüm 1: Django Projesi Kurulumu ve Yapılandırma

### Adım 1.1: Sanal Ortam ve Proje Kurulumu

Proje ana dizininde (`ayika-fullstack`) bir terminal açın ve `backend` klasörünü oluşturun.

```bash
# Ana dizindeyken
mkdir backend
cd backend

# Python sanal ortamı oluşturma ve aktifleştirme
python -m venv venv
# Windows için:
venv\Scripts\activate
# macOS/Linux için:
# source venv/bin/activate

# Gerekli kütüphaneleri yükleme (PostgreSQL desteği ile)
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers psycopg2-binary
```

### Adım 1.2: Django Projesi ve Uygulama Oluşturma

```bash
# "ayika_backend" adında bir proje ve "users" adında bir uygulama oluşturalım
django-admin startproject ayika_backend .
python manage.py startapp users
```

### Adım 1.3: `settings.py` Yapılandırması

`ayika_backend/settings.py` dosyasını açın ve aşağıdaki düzenlemeleri yapın:

1.  **`INSTALLED_APPS`'e yeni uygulamaları ekleyin:**
    ```python
    INSTALLED_APPS = [
        # ...
        'rest_framework',
        'rest_framework_simplejwt',
        'corsheaders',
        'users', # Kendi uygulamamız
        # ...
    ]
    ```

2.  **Özel Kullanıcı Modelini Tanımlayın (bir sonraki adımda oluşturulacak):**
    ```python
    # Dosyanın sonlarına doğru ekleyin
    AUTH_USER_MODEL = 'users.User'
    ```

3.  **Veritabanını PostgreSQL olarak yapılandırın:**
    *Lütfen `kullanici_adiniz`, `sifreniz` ve `veritabani_adiniz` alanlarını kendi PostgreSQL bilgilerinizle güncelleyin.*
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'veritabani_adiniz',
            'USER': 'kullanici_adiniz',
            'PASSWORD': 'sifreniz',
            'HOST': 'localhost', # veya veritabanı sunucunuzun adresi
            'PORT': '5432',
        }
    }
    ```

4.  **CORS (Cross-Origin Resource Sharing) Ayarları:**
    Frontend'in (örneğin `http://localhost:5173`) backend'e istek atabilmesi için izin verin.
    ```python
    # MIDDLEWARE listesine ekleyin ( mümkünse CsrfViewMiddleware'den önce)
    MIDDLEWARE = [
        'corsheaders.middleware.CorsMiddleware',
        # ...
    ]

    # Frontend adresini buraya ekleyin
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:5173", # Vite'ın varsayılan adresi
        "http://127.0.0.1:5173",
    ]
    ```

5.  **Django REST Framework Ayarları:**
    ```python
    # Dosyanın sonuna ekleyin
    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework_simplejwt.authentication.JWTAuthentication',
        )
    }
    ```

---

## Bölüm 2: Özel Kullanıcı Modeli (Custom User Model)

`TODO-5.md`'de belirtilen T.C. Kimlik No, şehir gibi ek alanları saklamak için Django'nun varsayılan `User` modelini genişletmemiz gerekiyor.

### Adım 2.1: `users/models.py` Düzenlemesi

`users/models.py` dosyasını açın ve içeriğini aşağıdaki gibi değiştirin:

```python
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
```

### Adım 2.2: Migration Oluşturma

Modelde değişiklik yaptığımız için veritabanı şemasını güncellemeliyiz.

```bash
python manage.py makemigrations users
python manage.py migrate
```

### Adım 2.3: Admin Panelini Güncelleme

Yeni kullanıcı modelini Django admin panelinde yönetmek için `users/admin.py` dosyasını güncelleyin.

```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    # Admin panelinde gösterilecek alanlar
    list_display = ('tc_kimlik_no', 'email', 'first_name', 'last_name', 'is_staff')
    # Admin panelinde arama yapılacak alanlar
    search_fields = ('tc_kimlik_no', 'first_name', 'last_name', 'email')
    ordering = ('tc_kimlik_no',)

admin.site.register(User, CustomUserAdmin)
```

---

## Bölüm 3: API Endpoint'leri (Görünümler ve Serializer'lar)

### Adım 3.1: Kayıt Olma (Register) İşlemi

**`users/serializers.py` (Yeni dosya oluşturun):**
Bu serializer, frontend'den gelen JSON verisini `User` modeline dönüştürecek ve şifreyi hash'leyecektir.

```python
from rest_framework import serializers
from .models import User

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
```

**`users/views.py` (Görünümü oluşturun):**
```python
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import RegisterSerializer
from .models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
```

### Adım 3.2: Giriş Yapma (Login) İşlemi

T.C. Kimlik No ile giriş yapabilmek için `simple-jwt`'nin varsayılan serializer'ını eziyoruz.

**`users/serializers.py`'a ekleyin:**
```python
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Token'a ek bilgi ekleyebilirsiniz (isteğe bağlı)
        token['first_name'] = user.first_name
        return token

    def __init__(self, *args, **kwargs):
        # Varsayılan username alanını tc_kimlik_no olarak değiştir
        # Frontend'den gelen 'tcKimlikNo' alanını 'username' olarak mapliyoruz.
        if 'data' in kwargs and 'tcKimlikNo' in kwargs['data']:
            kwargs['data']['username'] = kwargs['data']['tcKimlikNo']
        super().__init__(*args, **kwargs)

    default_error_messages = {
        'no_active_account': 'Bu kimlik bilgileriyle eşleşen aktif bir hesap bulunamadı.'
    }
```

**`users/views.py`'e ekleyin:**
```python
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
```

### Adım 3.3: Kullanıcı Bilgilerini Getirme (`/me`)

Kullanıcının kendi profil bilgilerini (ad, soyad vb.) getirebilmesi için korumalı bir endpoint oluşturalım. Bu, giriş yapıldıktan sonra arayüzü kişiselleştirmek için kullanılacaktır.

**`users/serializers.py`'a ekleyin:**
```python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Frontend'e gönderilecek alanları belirle
        fields = ('tc_kimlik_no', 'first_name', 'last_name', 'email', 'phone_number', 'city')
```

**`users/views.py`'e ekleyin:**
```python
from rest_framework.permissions import IsAuthenticated

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
```

### Adım 3.4: URL Yapılandırması

**`ayika_backend/urls.py` dosyasını düzenleyin:**
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')), # users uygulamasının URL'lerini dahil et
]
```

**`users/urls.py` (Mevcut dosyayı güncelleyin):**
```python
from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, UserDetailView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
]
```

---

## Bölüm 4: Frontend Entegrasyonu (Detaylandırılmış)

### Adım 4.1: Axios Interceptor ile Token Yönetimi

`frontend/src/api/axios.ts` dosyasını, API isteklerine otomatik olarak `Authorization` başlığını ekleyecek ve token süresi dolduğunda yenileme mantığını tetikleyecek şekilde yapılandırın.

```typescript
// frontend/src/api/axios.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Her isteğe Access Token'ı ekle
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// NOT: Token yenileme (refresh) mantığı için daha karmaşık bir response interceptor
// eklenebilir, ancak başlangıç için bu yapı yeterlidir.

export default apiClient;
```

### Adım 4.2: Global Durum Yönetimi (`AuthProvider`)

`frontend/src/providers/AuthProvider.tsx`'ı güncelleyin. `login` fonksiyonu artık kullanıcı nesnesini kabul etmeli ve `user` state'i bu nesneyi saklamalıdır.

```typescript
// frontend/src/providers/AuthProvider.tsx
import { createContext, useState, useContext, useMemo, useEffect } from 'react';
import apiClient from '@/api/axios'; // apiClient'i import et

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Sayfa yüklendiğinde token kontrolü için

  useEffect(() => {
    // Uygulama yüklendiğinde token varsa kullanıcıyı çekmeyi dene
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await apiClient.get('/auth/me/');
          setUser(response.data);
        } catch (error) {
          console.error("Token'la kullanıcı çekilemedi, muhtemelen süresi dolmuş.", error);
          localStorage.removeItem('accessToken');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // İsteğe bağlı: Kullanıcıyı login sayfasına yönlendir
  };

  const value = useMemo(
    () => ({ user, login, logout, loading }),
    [user, loading]
  );

  // loading false olana kadar alt bileşenleri render etme
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Adım 4.3: Gönüllü Olma (`SignUp`) Sayfası Uygulaması

`frontend/src/pages/SignUp/index.tsx` dosyasında, form gönderim mantığını detaylandıralım.

-   **State Yönetimi:** Kullanıcı girdileri, hatalar ve yüklenme durumu için state'ler tanımlanmalıdır.
-   **Doğrulama (Validation):**
    -   Şifre ve şifre doğrulama alanlarının eşleştiğini kontrol edin.
    -   `KVKK` ve `Gönüllülük Esasları` onay kutularının işaretlendiğini doğrulayın.
-   **API İsteği:** Tüm doğrulamalar başarılı olduğunda backend'e `register` isteği atın.

```tsx
// frontend/src/pages/SignUp/index.tsx içinde örnek handleSubmit

// ... import'lar ve state tanımlamaları (useState) ...

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // setErrors({}); // Hataları temizle
  // setLoading(true); // Yüklenme durumunu başlat

  const data = new FormData(event.currentTarget);
  const password = data.get('password');
  const confirmPassword = data.get('confirmPassword');
  const kvkkChecked = data.get('kvkk') === 'on';
  const gonullulukChecked = data.get('gonulluluk') === 'on';

  // --- Client-Side Validation ---
  if (password !== confirmPassword) {
    // setErrors(prev => ({...prev, password: 'Şifreler eşleşmiyor.'}));
    // setLoading(false);
    return;
  }
  if (!kvkkChecked || !gonullulukChecked) {
    // setErrors(prev => ({...prev, terms: 'Lütfen gerekli tüm onayları işaretleyin.'}));
    // setLoading(false);
    return;
  }
  
  const payload = {
    first_name: data.get('firstName'),
    last_name: data.get('lastName'),
    tc_kimlik_no: data.get('tcKimlikNo'),
    phone_number: data.get('phoneNumber'),
    city: data.get('city'),
    email: data.get('email'),
    password: password,
    password_confirm: confirmPassword,
  };

  try {
    const response = await axios.post('/auth/register/', payload);
    console.log('Kayıt başarılı:', response.data);
    // Kayıt sonrası giriş sayfasına yönlendir ve bir başarı mesajı göster
    // navigate('/signin', { state: { message: 'Kaydınız başarıyla oluşturuldu. Lütfen giriş yapın.' } });
  } catch (error) {
    console.error('Kayıt başarısız:', error.response?.data);
    // Backend'den gelen hataları state'e alıp formda göster
    // setErrors(error.response?.data);
  } finally {
    // setLoading(false); // Yüklenme durumunu bitir
  }
};
```

### Adım 4.4: Giriş Yapma (`SignIn`) Sayfası ve Yönlendirme

`frontend/src/pages/SignIn/index.tsx` dosyasında, başarılı giriş sonrası kullanıcıyı `/dashboard`'a yönlendirecek mantığı kuralım.

-   **Global State (AuthProvider):** Başarılı giriş sonrası `useAuth` hook'u ile kullanıcı verisini global state'e yazın.
-   **Token Saklama:** `access` ve `refresh` token'larını `localStorage`'a kaydedin.
-   **Yönlendirme:** `react-router-dom`'un `useNavigate` hook'u ile yönlendirme yapın.

```tsx
// frontend/src/pages/SignIn/index.tsx içinde örnek handleSubmit
// ... import { useAuth } from '@/providers/AuthProvider';
// ... import { useNavigate } from 'react-router-dom';

// const { login } = useAuth();
// const navigate = useNavigate();

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // setLoading(true);
  // setErrors({});

  const data = new FormData(event.currentTarget);
  const tcKimlikNo = data.get('tcKimlikNo');
  const password = data.get('password');

  try {
    // 1. Token al
    const tokenResponse = await axios.post('/auth/token/', {
      tcKimlikNo,
      password,
    });
    
    // Token'ları localStorage'a kaydet
    localStorage.setItem('accessToken', tokenResponse.data.access);
    localStorage.setItem('refreshToken', tokenResponse.data.refresh);
    
    // 2. Token ile kullanıcı verisini al
    const userResponse = await axios.get('/auth/me/');
    
    // 3. AuthContext'i ve global state'i güncelle
    login(userResponse.data);

    // 4. Kullanıcıyı dashboard'a yönlendir
    navigate('/dashboard');

  } catch (error) {
    console.error('Giriş başarısız:', error.response?.data);
    // setErrors(error.response?.data);
  } finally {
    // setLoading(false);
  }
};
```

### Adım 4.5: `SideMenu`'de Kullanıcı Adını Gösterme

`useAuth` hook'unu kullanarak global state'ten kullanıcı bilgilerini çekin ve `SideMenu.tsx` ile `SideMenuMobile.tsx` bileşenlerinde gösterin.

**`frontend/src/pages/Dashboard/components/SideMenu.tsx`'i düzenleyin:**

```tsx
import { Avatar, Box, Drawer, Typography } from '@mui/material';
import { useAuth } from '@/providers/AuthProvider';
// ... diğer import'lar

export default function SideMenu() {
  const { user } = useAuth(); // Global state'ten kullanıcıyı al

  return (
    <Drawer
      variant="permanent"
      sx={{
        // ... sx stilleri
      }}
    >
      {/* ... Üst kısımdaki logo ve menü öğeleri ... */}
      
      {/* Spacer, bu kutuyu en alta iter */}
      <Box sx={{ flexGrow: 1 }} />

      {/* --- En alttaki kullanıcı bilgisi bölümü --- */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            alt={user ? `${user.first_name} ${user.last_name}` : ''}
            // src={user?.avatar_url} // Opsiyonel: avatar varsa
          >
            {/* Avatar yoksa ve kullanıcı varsa ismin baş harfleri */}
            {user ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase() : null}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography fontWeight="bold">
              {user ? `${user.first_name} ${user.last_name}` : 'Kullanıcı'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user ? user.email : 'Yükleniyor...'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
```

*Not: `SideMenuMobile.tsx` için de benzer bir düzenleme (`useAuth` hook'unu kullanarak) yapılmalıdır.*

---

## Bölüm 5: Sonraki Adımlar ve İyileştirmeler

-   **Kullanıcı Profili (`/me`):** Kullanıcının token'ı ile kendi bilgilerini (`first_name`, `email` vb.) çekebileceği bir `/api/auth/me/` endpoint'i oluşturun. Bu, `login` sonrası `AuthProvider`'ı doldurmak için kritik öneme sahiptir.
-   **Güvenli Rotalar (Protected Routes):** `react-router-dom` kullanarak sadece giriş yapmış kullanıcıların erişebileceği (örneğin `/dashboard`) özel bir rota bileşeni (`<ProtectedRoute />`) oluşturun. Bu bileşen, kullanıcının `AuthContext`'te olup olmadığını kontrol etmelidir.
-   **Şifre Sıfırlama (`ForgotPassword`):** Şifresini unutan kullanıcılar için e-posta ile token gönderimi ve şifre sıfırlama akışını backend ve frontend'de implemente edin.
-   **Çıkış Yapma (Logout):** Bir "Çıkış Yap" butonu ile `localStorage`'daki token'ları temizleyen ve kullanıcıyı ana sayfaya yönlendiren bir fonksiyon yazın. Daha güvenli bir yöntem için backend'de `simple-jwt`'nin "token blacklisting" özelliği aktif edilebilir.
-   **Testler:** API endpoint'leri ve React bileşenleri için testler yazın.

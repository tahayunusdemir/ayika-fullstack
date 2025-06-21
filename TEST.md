# Ayika Projesi Test Rehberi (Docker ile)

Bu rehber, Docker kullanarak projenin backend ve veritabanı servislerini başlatmayı ve frontend ile entegrasyonu test etmeyi adım adım açıklar.

### Ön Hazırlık: Docker

Testlere başlamadan önce, bilgisayarınızda **Docker Desktop** uygulamasının kurulu ve çalışır durumda olduğundan emin olun.

### 1. Adım: Backend ve Veritabanını Docker ile Başlatma

Backend ve veritabanı servisleri, `docker-compose` ile tek bir komutla ayağa kaldırılacaktır.

1.  **Terminal Açın:** Projenin ana dizininde (`ayika-fullstack`) bir terminal penceresi açın.
2.  **Konteynerleri Başlatın:** Aşağıdaki komutu çalıştırın. `--build` bayrağı, kodda bir değişiklik yaptıysanız Docker imajının yeniden oluşturulmasını sağlar.
    ```bash
    docker-compose up --build
    ```
    Bu komutun tamamlanmasını bekleyin. Loglarda veritabanının (`ayika_db`) ve web sunucusunun (`ayika_web`) başarıyla başladığını göreceksiniz.
    
    **Bu terminali kapatmayın**, konteynerlerin çalışır durumda kalması gerekiyor.

### 2. Adım: Veritabanını Hazırlama (Sadece İlk Kurulumda)

Konteynerler ilk kez başlatıldığında, Django'nun veritabanı tablolarını oluşturması gerekir.

1.  **YENİ bir Terminal Açın:** Bir önceki terminali açık bırakarak **yeni bir terminal** açın.
2.  **Migration'ları Çalıştırın:** Proje ana dizinindeyken aşağıdaki komutu çalıştırın. Bu komut, çalışan `web` konteyneri içinde `migrate` işlemini tetikler.
    ```bash
    docker-compose exec web python manage.py migrate
    ```
    Bu adımı yalnızca veritabanını ilk kez kurarken veya model (`models.py`) dosyalarında değişiklik yaptığınızda tekrarlamanız gerekir.

### 3. Adım: Frontend Sunucusunu Başlatma

Backend artık Docker üzerinde çalıştığına göre, frontend geliştirme sunucusunu başlatabiliriz.

1.  **Yine YENİ bir Terminal Açın:** Diğer iki terminali açık bırakarak **yeni bir tane daha** açın.
2.  **Dizine Gidin:** Projenin `frontend` klasörüne girin.
    ```bash
    cd frontend
    ```
3.  **Sunucuyu Başlatın:**
    ```bash
    npm run dev
    ```
    Bu komut Vite geliştirme sunucusunu başlatacak ve size `http://localhost:5173/` gibi bir adres verecektir. **Bu terminali de kapatmayın.**

### 4. Adım: Tarayıcıda Test Etme

Artık her üç sunucu da (Docker'da backend/DB, yerelde frontend) çalıştığına göre, uygulamayı tarayıcıda test edebiliriz:

1.  **Kayıt Olma (Sign Up):**
    *   Tarayıcınızda `http://localhost:5173/` adresine gidin.
    *   Sağ üstteki **"Gönüllü Ol"** linkine tıklayarak kayıt sayfasına gidin (`/signup`).
    *   Formdaki tüm alanları (Ad, Soyad, T.C. Kimlik No, Şifre vb.) doğru bir şekilde doldurun.
    *   KVKK ve Gönüllülük metinlerini onaylayın.
    *   **"Gönüllü Ol"** butonuna basın.
    *   **Kontrol:** `docker-compose up` komutunu çalıştırdığınız terminalde `ayika_web | "POST /api/auth/register/ HTTP/1.1" 201` gibi bir başarı mesajı görmelisiniz.

2.  **Giriş Yapma (Sign In):**
    *   Kayıt olduktan sonra, sağ üstteki menüden veya manuel olarak `/signin` adresine giderek giriş sayfasını açın.
    *   Az önce kayıt olurken kullandığınız **T.C. Kimlik Numarası** ve **Şifre** ile giriş yapın.
    *   **"Giriş yap"** butonuna tıklayın.

3.  **Dashboard ve Oturum Kontrolü:**
    *   Başarılı girişin ardından otomatik olarak `/dashboard` sayfasına yönlendirilmelisiniz.
    *   Sol taraftaki menünün en altında ve mobil menüde, kayıt olurken girdiğiniz **Ad ve Soyadın** doğru bir şekilde göründüğünü kontrol edin.
    *   **Çıkış Yapma:** Menülerdeki **"Çıkış Yap"** (Logout) butonuna basın. Ana sayfaya (`/`) yönlendirilmelisiniz.

4.  **Güvenli Rota Testi:**
    *   Çıkış yaptıktan sonra, tarayıcınızın adres çubuğuna manuel olarak `http://localhost:5173/dashboard` yazıp gitmeyi deneyin.
    *   Giriş yapmadığınız için otomatik olarak giriş sayfasına (`/signin`) yönlendirilmeniz gerekiyor. Bu, korumalı rotanın doğru çalıştığını gösterir.

Bu adımları takip ederek tüm kimlik doğrulama sistemini test etmiş olacaksınız. Herhangi bir adımda hata alırsanız, ilgili terminaldeki (Docker veya npm) hata mesajlarını kontrol etmek sorunun kaynağını bulmanıza yardımcı olacaktır.
## Proje Geliştirme Görevleri

### 1. Marka Adını Güncelleme

-   **Amaç:** Proje genelinde "Sitemark" markası yerine "ayika" ismini kullanmak.
-   **Detaylar:**
    1.  Projedeki tüm dosyalarda, özellikle `AppAppBar.tsx` ve `Hero.tsx` gibi bileşenlerde "Sitemark" metnini veya logosunu bulun ve "ayika" metniyle değiştirin.
    2.  Logo kullanılan yerlerde metin logosu olarak "ayika" isminin tasarıma uygun bir şekilde görüntülenmesini sağlayın.

### 2. Kayıt Olma Metnini Değiştirme

-   **Amaç:** Kullanıcıları kayıt olmaya teşvik etmek yerine "Gönüllü Olmaya" davet etmek.
-   **Detaylar:**
    1.  `SignUp/index.tsx`, `SignIn/index.tsx` ve `AppAppBar.tsx` gibi dosyalardaki "Kayıt Ol" metinlerini "Gönüllü Ol" olarak değiştirin.
    2.  "Gönüllü Ol" butonlarının ve bağlantılarının yanına `Diversity1Icon` ekleyin. İkonu kullanmak için `@mui/icons-material/Diversity1`'dan import edin.

### 3. Hero Bölümünü Yeniden Tasarlama

-   **Dosyalar:**
    -   `frontend/src/pages/MarketingPage/components/Hero.tsx`
-   **Amaç:** Ana karşılama (Hero) bölümünü, projenin amacını daha iyi yansıtacak şekilde güncellemek.
-   **Detaylar:**
    1.  "En yeni ürünlerimiz" başlığını "Acil Yardım ve İhtiyaç Koordinasyon Ağı" olarak değiştirin.
    2.  "Hemen Başla" butonunu kaldırın.
    3.  Mevcut görseli kaldırıp, yerine interaktif bir OpenStreetMap haritası entegre edin. (Örn: `react-leaflet` kütüphanesi kullanılabilir).

### 4. Navigasyon ve Sayfa Yapısını Güncelleme

-   **Dosyalar:**
    -   `frontend/src/pages/MarketingPage/index.tsx`
    -   `frontend/src/pages/MarketingPage/components/AppAppBar.tsx`
-   **Amaç:** Pazarlama sayfasına yeni bölümler eklemek ve navigasyonu bu yeni yapıya göre güncellemek.
-   **Detaylar:**
    1.  Navigasyon çubuğundaki (`AppAppBar.tsx`) menü öğelerini şu sırayla güncelleyin: "Özellikler", "Öne Çıkanlar", "Ekibimiz", "SSS", "Destekçilerimiz", "İletişim".
    2.  `MarketingPage/index.tsx` içerisine `Ekibimiz`, `Destekçilerimiz` ve `İletişim` için yeni bileşenler ekleyin.

### 5. "Ekibimiz" Bölümünü Oluşturma

-   **Amaç:** Projeyi geliştiren ekibi tanıtmak için modern bir bölüm eklemek.
-   **Detaylar:**
    1.  `frontend/src/pages/MarketingPage/components/` altında `Team.tsx` adında yeni bir bileşen oluşturun.
    2.  Bu bileşen içinde, 4 ekip üyesi için profil kartları tasarlayın. Kartlarda aşağıdaki bilgiler yer almalıdır:
        -   **Taha Yunus Demir:** Kütahya Dumlupınar Üniversitesi, Bilgisayar Mühendisliği - 4. Sınıf ([LinkedIn](https://linkedin.com/in/taha-yunus-demir), [GitHub](https://github.com/tahayunusdemir), [E-posta](mailto:tahayunusdemir@gmail.com))
        -   **Harun Celen:** Kırıkkale Üniversitesi, Bilgisayar Mühendisliği - 4. Sınıf ([LinkedIn](https://linkedin.com/in/harun-celen-566665258), [GitHub](https://github.com/HarunCelen), [E-posta](mailto:haruncelen89@gmail.com))
        -   **Hamza Erdal:** Kütahya Dumlupınar Üniversitesi, Bilgisayar Mühendisliği - 4. Sınıf ([LinkedIn](https://linkedin.com/in/hamza-erdal-29b58519b), [GitHub](https://github.com/Toruk-Makto-01), [E-posta](mailto:hamzaerdal123@gmail.com))
        -   **Doç. Dr. Durmuş Özdemir:** Akademik Danışman ([E-posta](mailto:durmus.ozdemir@dpu.edu.tr))
    3.  Tasarımın genel sayfa estetiğiyle uyumlu, modern ve profesyonel olmasını sağlayın. Her üye için placeholder bir profil fotoğrafı alanı bulunsun.

### 6. "Destekçilerimiz" Bölümünü Oluşturma

-   **Amaç:** Projeye destek veren kurumları göstermek.
-   **Detaylar:**
    1.  `frontend/src/pages/MarketingPage/components/` altında `Supporters.tsx` adında yeni bir bileşen oluşturun.
    2.  Bu bölümde, aşağıdaki iki kurumun logosunu sergileyin:
        -   **TÜBİTAK:** [Logo URL](https://tubitak.gov.tr/sites/default/files/2025-02/TUBITAK-Logo_0.svg)
        -   **Kütahya Dumlupınar Üniversitesi:** [Logo URL](https://www.dpu.edu.tr/app/views/panel/ckfinder/userfiles/1/images/logolar/dpu-logo.png)
    3.  Logoların `LogoCollection` bileşenine benzer bir yapıda, temiz ve düzenli bir şekilde gösterilmesini sağlayın.

### 7. "İletişim" Bölümünü Oluşturma

-   **Amaç:** Kullanıcıların iletişime geçebileceği bir alan hazırlamak.
-   **Detaylar:**
    1.  `frontend/src/pages/MarketingPage/components/` altında `Contact.tsx` adında yeni bir bileşen oluşturun.
    2.  Bu bileşeni şimdilik bir başlık ("İletişim") ve bir alt metin ("Bizimle [email protected] üzerinden iletişime geçebilirsiniz.") içeren bir placeholder olarak tasarlayın.

---

## 8. Teknik İyileştirmeler ve Detaylar

-   **Amaç:** Kod kalitesini, okunabilirliği ve bakımı kolaylaştıran ek geliştirmeleri belgelemek.
-   **Detaylar:**
    1.  **Mutlak İçe Aktarma Yolları (`@/`):**
        -   `tsconfig.json` ve `vite.config.ts` dosyaları, `../` gibi göreceli yollar yerine `@/components/` gibi mutlak yolların kullanılabilmesi için yapılandırıldı. Bu, kodun daha temiz ve taşınabilir olmasını sağlar.
    2.  **HTML Sayfa Başlığı:**
        -   Kullanıcının tarayıcı sekmesinde gördüğü başlık, marka kimliğine uygun olarak `frontend/index.html` dosyasında "Sitemark" yerine "ayika" olarak güncellendi.
    3.  **Harita Uygulaması:**
        -   `Hero` bölümündeki interaktif harita, `react-leaflet` yerine özel bir `TurkeyMap.tsx` bileşeni ve `public/iller.json` verisi kullanılarak oluşturulmuştur.
    4.  **Ekip Fotoğrafları:**
        -   `Ekibimiz` bölümünde placeholder fotoğraflar yerine, gerçek ekip üyelerinin resimleri (`public/team/` altında) kullanılmıştır.

---

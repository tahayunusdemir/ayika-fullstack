# Geliştirme Görevleri (TODO-3) - Nihai Plan

Bu döküman, projenin mevcut durumunu iyileştirmek, kullanıcı deneyimini artırmak ve arayüzü yerelleştirmek için gereken görevleri listeler.

---

## 1. Genel Arayüz ve Kullanıcı Deneyimi

### Görev 1.1: Tema Değiştirme Butonunu Toggle Olarak Ayarlama

-   **Dosyalar:**
    -   `frontend/src/pages/MarketingPage/components/AppAppBar.tsx`
    -   `frontend/src/theme/shared-theme/ColorModeIconDropdown.tsx`
-   **Amaç:** Tema seçimini basitleştirerek kullanıcının tek bir butona tıklayarak açık ve koyu tema arasında geçiş yapmasını sağlamak.
-   **Detaylar:**
    1.  `ColorModeIconDropdown.tsx` bileşenini, bir dropdown menü yerine tek bir `IconButton` olacak şekilde yeniden yapılandırın.
    2.  Butona tıklandığında, `useColorScheme()` hook'undan gelen `setMode` fonksiyonunu kullanarak mevcut modu (`light` ise `dark`, `dark` ise `light`) tersine çevirin.
    3.  Buton içinde, mevcut `mode`'a göre `<DarkMode />` veya `<LightMode />` ikonunu dinamik olarak gösterin.

## 2. Sayfaların Türkçeleştirilmesi ve Sadeleştirilmesi

### Görev 2.1: MarketingPage Sayfasını Türkçeleştirme ve Düzenleme

-   **Dosyalar:**
    -   `frontend/src/pages/MarketingPage/index.tsx`
    -   İlgili tüm alt bileşenler: `AppAppBar.tsx`, `Hero.tsx`, `Features.tsx`, `Highlights.tsx`, `FAQ.tsx`, `Footer.tsx`, `LogoCollection.tsx`
-   **Amaç:** Pazarlama sayfasını tamamen Türkçeleştirmek, gereksiz bölümleri kaldırmak ve sayfa düzenini güncellemek.
-   **Detaylar:**
    1.  **İçerik Kaldırma:**
        -   `Pricing` ve `Testimonials` bölümlerini `MarketingPage/index.tsx` içerisinden tamamen kaldırın.
        -   `frontend/src/pages/MarketingPage/components/Pricing.tsx`, `frontend/src/pages/MarketingPage/components/Testimonials.tsx` ve `frontend/src/pages/MarketingPage/components/LogoCollection.tsx` dosyalarını projeden silin. (`LogoCollection` bileşeninin görevi, `TODO-4.md`'de tanımlanan `Supporters.tsx` bileşenine devredilmiştir.)
        -   `AppAppBar.tsx` içindeki navigasyon menüsünden "Pricing" ve "Testimonials" bağlantılarını kaldırın.
    2.  **Yeniden Konumlandırma:**
        -   Bu adım, `LogoCollection.tsx` dosyasının silinmesiyle geçersiz kalmıştır.
    3.  **Türkçeleştirme:**
        -   Yukarıda listelenen tüm bileşenlerdeki metin içeriğini (başlıklar, paragraflar, butonlar, menü öğeleri vb.) anlamlı bir şekilde Türkçe'ye çevirin.
        -   `LogoCollection.tsx` içindeki "Trusted by the best companies" metnini "En iyi şirketlerin tercihi" gibi bir ifadeyle değiştirin.

### Görev 2.2: SignIn ve SignUp Sayfalarını Türkçeleştirme

-   **Dosyalar:**
    -   `frontend/src/pages/SignIn/index.tsx`
    -   `frontend/src/pages/SignUp/index.tsx`
-   **Amaç:** Kimlik doğrulama (giriş ve kayıt) sayfalarını tamamen Türkçeleştirmek.
-   **Detaylar:**
    1.  **Giriş Sayfası (`SignIn`):**
        -   "Sign In" -> "Giriş Yap"
        -   "Email", "Password" -> "E-posta", "Şifre"
        -   "Remember me" -> "Beni Hatırla"
        -   "Forgot password?" -> "Şifreni mi unuttun?"
        -   "Don't have an account? Sign up" -> "Hesabın yok mu? Kayıt ol"
    2.  **Kayıt Sayfası (`SignUp`):**
        -   "Sign up" -> "Kayıt Ol"
        -   "First name", "Last name" -> "Ad", "Soyad"
        -   "I want to receive inspiration..." -> "Pazarlama ve promosyon e-postaları almak istiyorum."
        -   "Already have an account? Sign in" -> "Zaten bir hesabın var mı? Giriş yap"

## 3. Navigasyon ve Yönlendirme Tutarlılığı

### Görev 3.1: Kimlik Doğrulama Sayfalarında Navigasyon Düzeltmesi

-   **Dosyalar:**
    -   `frontend/src/pages/MarketingPage/components/AppAppBar.tsx`
    -   `frontend/src/index.css`
-   **Amaç:** `SignIn` ve `SignUp` gibi farklı sayfalardayken, navigasyon çubuğundaki (`AppAppBar`) bağlantıların ana sayfadaki (`MarketingPage`) doğru bölümlere pürüzsüzce kaymasını sağlamak.
-   **Detaylar:**
    1.  `AppAppBar.tsx` içindeki `Features`, `Highlights`, `FAQ` gibi `MenuItem` bileşenlerinde kullanılan `onClick={scrollToSection('...')}` olayını kaldırın.
    2.  Bu `MenuItem` bileşenlerini `react-router-dom`'dan gelen `<Link>` bileşeni ile sarmalayın veya `component={Link}` prop'unu kullanın.
    3.  Linklerin `to` hedefini hash formatında belirtin: `to="/#features"`, `to="/#highlights"`, `to="/#faq"`. Bu, önce ana sayfaya yönlenmeyi, sonra ilgili ID'ye sahip bölüme gitmeyi sağlar.
    4.  Pürüzsüz kaydırma efektini proje genelinde etkinleştirmek için `frontend/src/index.css` dosyasına şu kuralı ekleyin: `html { scroll-behavior: smooth; }`.

---

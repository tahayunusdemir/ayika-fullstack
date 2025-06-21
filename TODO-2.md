# Geliştirme Görevleri (TODO-2) - Sonlandırılmış Plan

Bu döküman, proje dosyaları (`App.tsx`, vb.) incelenerek kesinleştirilmiş, yapılacak ek geliştirme ve düzenleme görevlerini listeler.

---

## 1. MarketingPage (`/marketing`) Geliştirmeleri

### Görev 1.1: Navigasyon Çubuğu Mantığının İyileştirilmesi

-   **Dosya:** `frontend/src/pages/MarketingPage/components/AppAppBar.tsx`
-   **Amaç:** Statik navigasyon elemanlarını, `react-router-dom` kullanarak işlevsel ve doğru yönlendirmeler yapan bağlantılara dönüştürmek.
-   **Detaylar:**
    1.  **Ana Sayfa Yönlendirmesi:** Sol üstteki "Sitemark" logosu veya marka elementine tıklandığında, kullanıcıyı ana sayfa olan `/` yoluna yönlendirmelidir. Bu, `App.tsx` içinde ana yol olarak tanımlanmıştır. Mevcut `scrollTo` işlevi yerine `<Link to="/">` bileşeni kullanılmalıdır.
    2.  **Kimlik Doğrulama Yönlendirmeleri:**
        -   "Giriş Yap" butonu, `/signin` yoluna yönlendirme yapmalıdır. `<Link to="/signin">` kullanılmalıdır.
        -   "Kayıt Ol" butonu, `/signup` yoluna yönlendirme yapmalıdır. `<Link to="/signup">` kullanılmalıdır.
    3.  **Eski Bağlantıyı Kaldırma:** Menüdeki "Blog" öğesi artık geçerli olmadığından JSX içinden tamamen kaldırılmalıdır.

### Görev 1.2: Sayfa İçi Pürüzsüz Kaydırma (Smooth Scroll)

-   **Dosya:** `frontend/src/pages/MarketingPage/components/AppAppBar.tsx`
-   **Amaç:** Sayfa içi navigasyon bağlantılarının, ilgili bölümlere pürüzsüz bir kaydırma efektiyle gitmesini sağlamak.
-   **Detaylar:**
    1.  `scrollToSection` fonksiyonunun, `MarketingPage/index.tsx` içinde bulunan `Features`, `Testimonials`, `Highlights`, `Pricing` ve `FAQ` gibi bölümlerin `id`'lerini doğru hedeflediğini doğrulayın.
    2.  CSS'te `scroll-behavior: smooth;` kullanarak veya bir JavaScript çözümü ile kaydırmanın pürüzsüz olduğundan emin olun.

---

## 2. Kimlik Doğrulama Sayfaları (`/signin`, `/signup`) Düzenlemeleri

### Görev 2.1: Tutarlı Arayüz için Ortak Navigasyon Eklenmesi

-   **Dosyalar:** `frontend/src/pages/SignIn/index.tsx`, `frontend/src/pages/SignUp/index.tsx`
-   **Amaç:** Kullanıcı deneyiminde tutarlılık sağlamak amacıyla ana uygulama navigasyon çubuğunu kimlik doğrulama sayfalarına eklemek.
-   **Detaylar:**
    1.  `AppAppBar` bileşenini (`frontend/src/pages/MarketingPage/components/AppAppBar.tsx`) her iki sayfaya da (`SignIn` ve `SignUp`) import edin.
    2.  `
<AppAppBar />
` bileşenini, her iki sayfanın JSX yapısının en üstüne, sayfa içeriğinden önce render edin.

### Görev 2.2: Formları Sadeleştirme ve Bağlantıları Düzeltme

-   **Dosyalar:** `frontend/src/pages/SignIn/index.tsx`, `frontend/src/pages/SignUp/index.tsx`
-   **Amaç:** Giriş ve kayıt formlarını daha temiz hale getirmek ve bu iki sayfa arasındaki geçişlerin doğru çalışmasını sağlamak.
-   **Detaylar:**
    1.  **Form İçi Marka Öğesini Kaldırma:** Form alanının üzerinde yer alan `SitemarkIcon` veya benzeri büyük logo bileşenini kaldırın. `AppAppBar` içindeki logo kalacaktır.
    2.  **Sosyal Medya Girişini Kaldırma:** "Sign in with Google" ve "Sign in with Facebook" butonlarını, ikonlarını ve bunlarla ilgili tüm JSX ve mantığı (`CustomIcons.tsx` bileşeni dahil) kaldırın.
    3.  **Doğru Yönlendirme Bağlantıları:**
        -   `SignIn/index.tsx` içinde, "Don't have an account? Sign up" metnini içeren elementi bulun ve bunu `<Link to="/signup">Don't have an account? Sign up</Link>` şeklinde `react-router-dom` bağlantısı ile değiştirin.
        -   `SignUp/index.tsx` içinde, "Already have an account? Sign in" metnini içeren elementi bulun ve bunu `<Link to="/signin">Already have an account? Sign in</Link>` şeklinde bir bağlantı ile değiştirin.

---

## 3. Dashboard (`/dashboard`) Arayüz Ayarlamaları

### Görev 3.1: Yan Menü Başlığını Sadeleştirme

-   **Dosyalar:** `frontend/src/pages/Dashboard/components/SideMenu.tsx`, `frontend/src/pages/Dashboard/components/SelectContent.tsx`
-   **Amaç:** Dashboard'daki ana yan menünün (`SideMenu`) üst kısmını sadeleştirmek ve marka kimliğini öne çıkarmak.
-   **Detaylar:**
    1.  **Gereksiz Bileşeni Kaldırma:** `frontend/src/pages/Dashboard/components/SideMenu.tsx` dosyasında, üst kısımda bulunan ve ürünler arası geçişi sağlayan `<SelectContent />` bileşenini ve ilgili `import`'u kaldırın.
    2.  **Marka Logosu Ekleme:** Kaldırılan bileşenin yerine, sade ve tıklanabilir olmayan bir "Sitemark" logosu ekleyin. Bu amaçla `MarketingPage`'de kullanılan `SitemarkIcon` referans alınabilir veya `Typography` bileşeni ile basitçe "Sitemark" yazılabilir. Logonun `SideMenu.tsx` içerisindeki üst `Box` bileşenine, uygun `padding` ve hizalama ile yerleştirildiğinden emin olun.
    3.  **Artık Kullanılmayan Dosyayı Silme:** Yapılan değişiklikle `frontend/src/pages/Dashboard/components/SelectContent.tsx` dosyasına artık gerek kalmamıştır. Bu dosya projeden silinmelidir.

---

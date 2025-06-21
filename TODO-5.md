# Geliştirme Görevleri (TODO-5) - Arayüz ve Form Geliştirmeleri

Bu döküman, kullanıcı arayüzü ve form işlevselliklerini iyileştirmeye yönelik görevleri içerir.

---

## 1. Navigasyon İyileştirmeleri

### Görev 1.1: Pürüzsüz Kaydırma (Smooth Scroll) Ofsetini Düzeltme

-   **Dosya:** `frontend/src/pages/MarketingPage/components/AppAppBar.tsx` ve `frontend/src/pages/MarketingPage/index.tsx`
-   **Amaç:** Navigasyon çubuğundan bir bölüme tıklandığında, sayfanın sabit duran navigasyon çubuğunun yüksekliğini hesaba katarak doğru pozisyona kaymasını sağlamak.
-   **Detaylar:**
    1.  Mevcut kaydırma mantığı, bölümün tam en üstüne gittiği için sabit navigasyon çubuğu (`AppAppBar`) bölüm başlığını gizlemektedir.
    2.  Bu sorunu çözmek için en temiz yöntem, hedeflenen bölümlere CSS ile bir `scroll-margin-top` değeri vermektir.
    3.  `MarketingPage/index.tsx` dosyasını açın ve `Features`, `Highlights`, `Team`, `FAQ`, ve `Supporters` gibi `id` ataması yapılmış `<Box>` bileşenlerini bulun.
    4.  Bu bileşenlerin `sx` prop'una `scrollMarginTop: '64px'` (veya `AppAppBar`'ın gerçek yüksekliğine denk gelen bir değer) ekleyin. Örnek: `<Box id="features" sx={{ py: { xs: 4, sm: 12 }, scrollMarginTop: '64px' }}>`.
    5.  Bu değişiklik, tarayıcının `scrollIntoView` veya hash link (`/#features`) yönlendirmelerinde, belirtilen boşluğu üst kısımda bırakmasını sağlayacaktır.

---

## 2. Gönüllü Olma (Kayıt) Formu Geliştirmeleri

-   **Dosya:** `frontend/src/pages/SignUp/index.tsx`
-   **Amaç:** "Gönüllü Ol" formuna yeni alanlar ekleyerek daha kapsamlı bilgi toplamak ve yasal gereklilikleri karşılamak.

### Görev 2.1: Yeni Giriş Alanları Ekleme

-   **Amaç:** Formu T.C. Kimlik Numarası, Telefon Numarası, Şehir ve Şifre Doğrulama alanlarıyla zenginleştirmek.
-   **Detaylar:**
    1.  **T.C. Kimlik Numarası:** "Ad" (`firstName`) ve "Soyad" (`lastName`) alanlarının bulunduğu `Grid`'in hemen altına, "T.C. Kimlik Numarası" için yeni bir `Grid item xs={12}` içinde `TextField` ekleyin. `label="T.C. Kimlik Numarası"` ve `name="tcKimlikNo"` olarak ayarlayın.
    2.  **Telefon Numarası:** T.C. Kimlik Numarası alanının altına, "Telefon Numarası" için benzer şekilde bir `TextField` ekleyin.
    3.  **Şehir Seçimi:** Telefon Numarası alanının altına, şehir seçimi için bir `FormControl` ile birlikte `Select` bileşeni ekleyin.
        -   `public/iller.json` dosyasını `fetch` veya `import` ile okuyarak şehir verilerini `useEffect` içinde bir state'e atayın.
        -   Gelen verileri `map` ile `MenuItem` bileşenlerine dönüştürerek `Select` içine yerleştirin. `InputLabel` olarak "Yaşadığınız Şehir" kullanın.
    4.  **Şifre Doğrulama:** "Şifre" (`password`) alanının hemen altına, "Şifreyi Doğrula" için ikinci bir `TextField` ekleyin. `label="Şifreyi Doğrula"`, `name="confirmPassword"` ve `type="password"` olarak ayarlayın.

### Görev 2.2: Onay Kutularını Güncelleme ve Zorunlu Hale Getirme

-   **Amaç:** Formdaki onay kutularını yasal metinlere uygun hale getirmek, metinleri modal içinde sunmak ve gönderim için zorunlu kılmak.
-   **Detaylar:**
    1.  Mevcut `FormControlLabel`'i, ilgili metni (`KVKK Onay Metni`) içeren bir `<Link>` bileşenini gösterecek şekilde güncelleyin. Bu link, tıklandığında `KvkkModal` bileşenini açmalıdır.
    2.  Etiketin devamı `...'ni okudum, anladım ve kabul ediyorum.` şeklinde olmalıdır.
    3.  Bu `Checkbox`'ı, form gönderimi için zorunlu hale getirin.
    4.  Aynı yapıyı kullanarak `"Gönüllülük Esasları"` için yeni bir `FormControlLabel` ve `Checkbox` ekleyin. Bu link de `GonullulukModal` bileşenini açmalıdır.
    5.  Her iki onay kutusunun da işaretlenmesini zorunlu kılın. Form gönderilmeden önce bu kontrol yapılmalıdır.

---

## 3. Giriş Yap Formu Geliştirmeleri

### Görev 3.1: E-posta ile Girişi T.C. Kimlik Numarası ile Değiştirme

-   **Dosya:** `frontend/src/pages/SignIn/index.tsx`
-   **Amaç:** Giriş yapma yöntemini e-posta yerine T.C. Kimlik Numarası ile olacak şekilde değiştirmek.
-   **Detaylar:**
    1.  "E-posta" etiketli `TextField` bileşenini bulun.
    2.  `label` özelliğini "T.C. Kimlik Numarası" olarak güncelleyin.
    3.  `name` özelliğini "email" yerine "tcKimlikNo" olarak değiştirin.
    4.  `autoComplete` özelliğini "email" yerine "username" olarak değiştirebilirsiniz, bu tarayıcıların otomatik doldurma davranışı için daha uygun olabilir.
    5.  "Şifremi Unuttum?" (`ForgotPassword`) ve "Beni Hatırla" (`Remember me`) işlevselliklerinin T.C. Kimlik No ile nasıl çalışacağı ilerleyen adımlarda değerlendirilecektir, şimdilik arayüzde kalabilirler.

---

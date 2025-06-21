# Öğrenim Günlüğü

Bu dosyada, proje kurulumu ve geliştirme sürecinde karşılaşılan sorunlar, alınan kararlar ve önemli notlar yer almaktadır.

Bu günlük, `TODO-2.md` görevleri sırasında karşılaşılan sorunları, alınan kararları ve önemli notları içerir.

Bu günlük, `TODO-1.md` dosyasındaki adımlar takip edilerek yapılan proje kurulumu sırasında alınan notları içerir.

Bu günlük, `TODO-3.md` görevleri uygulanırken karşılaşılan sorunları, alınan kararları ve öğrenilen dersleri belgelemek için oluşturulmuştur.

### Adım 1: Gerekli Bağımlılıkların Yüklenmesi

- **Belgeden Sapma:** `TODO-1.md` dosyasında belirtilen bağımlılıklara ek olarak `react-router-dom` paketi de kurulmuştur.
- **Gerekçe:** 6. Adım'da yeni sayfalar için rota yapılandırması talep edilmektedir ve bu adımda `react-router-dom` kullanımı varsayılmaktadır. Paketin en başta kurulması, projenin bütünlüğünü sağlar ve sonraki adımlarda yaşanabilecek hataları önler.

### Adım 2: Dosya ve Klasörlerin Kopyalanması

- **Karşılaşılan Sorun:** Dosya kopyalama komutu (`robocopy`) çalıştırılırken "Sistem belirtilen yolu bulamıyor" hatası alındı.
- **Neden:** Komut, bir önceki adımda geçilen `frontend` dizini içerisinden çalıştırıldı. Kaynak `templates` klasörü bu dizinde bulunmadığı için yollar geçersiz oldu.
- **Çözüm:** Komutu proje kök dizinine dönerek (`cd ..`) yeniden çalıştırarak sorun giderildi.
- **Ek Not:** `robocopy` komutları `&&` ile zincirlendiğinde, `robocopy`'nin başarılı bitiş kodları (1 gibi) CMD tarafından bir "hata" olarak yorumlanabilir ve bu da zincirdeki sonraki komutların çalışmasını engelleyebilir. Bu nedenle kopyalama işlemleri ayrı adımlara bölündü.

### Adım 3: İçe Aktarma (Import) Yollarının Güncellenmesi

- **Belgeden Sapma:** `TODO-1.md` dosyasında belirtilen göreceli `../` import yolları yerine, `@/` şeklinde mutlak yol alias'ları kullanılacaktır.
- **Gerekçe:** Bu yaklaşım, dosya yapısı değiştikçe veya dosyalar taşındıkça bozulacak içe aktarma yollarını düzeltme ihtiyacını ortadan kaldırır. Kodun okunabilirliğini ve bakımını kolaylaştırır. Bu, modern frontend geliştirme pratiğidir.
- **Uygulama:** `@` alias'ını tanıtmak için `tsconfig.json` ve `vite.config.ts` dosyaları güncellenecektir.

### Adım 5: Statik Varlıkların (Static Assets) Yönetimi

- **Karar:** `SideMenu.tsx` ve `SideMenuMobile.tsx` bileşenlerindeki `<Avatar>` komponentlerinden `src="/static/images/avatar/7.jpg"` özelliği kaldırıldı.
- **Gerekçe:** Projede bu yolda bir resim bulunmuyor. `src` özelliğini kaldırmak, kırık resim hatasını önler ve MUI `Avatar` bileşeninin, `alt` özelliğindeki ismin baş harflerini ("RC") göstererek zarif bir şekilde fallback yapmasına olanak tanır. Bu, `TODO-1.md`'de önerilen çözümlerden biridir ve harici bir varlığa ihtiyaç duymadığı için daha pratik bir yaklaşımdır.

### Adım 8: Ortam Değişkeni (Environment Variable) Sorunlarının Çözülmesi

- **Karşılaşılan Sorun:** Pazarlama sayfası bileşenlerinde (`Hero.tsx`, `Features.tsx`) resim yolları için `process.env.TEMPLATE_IMAGE_URL` kullanılıyordu. Bu, Vite projelerinde istemci tarafında desteklenmeyen bir yöntemdir ve resimlerin yüklenmemesine neden olur.
- **Çözüm:** Kodda zaten bir fallback olarak `https://mui.com` adresi belirtilmişti. Projede bu değişken için bir `.env` tanımı olmadığından, kod basitleştirildi ve `process.env` kısmı kaldırılarak doğrudan `https://mui.com` URL'sinin kullanılması sağlandı. Bu, hem sorunu çözer hem de gereksiz bir ortam değişkeni yapılandırmasını önler.

### Adım 9: İç İçe Yönlendirici (Nested Router) Hatasının Giderilmesi

- **Karşılaşılan Sorun:** Uygulama başlatıldığında tarayıcı konsolunda `Uncaught Error: You cannot render a <Router> inside another <Router>` hatası alındı.
- **Neden:** Hem `frontend/src/main.tsx` hem de `frontend/src/App.tsx` dosyaları `<BrowserRouter>` bileşenini içeriyordu. React Router, yalnızca tek bir yönlendirici bileşeninin uygulama ağacını sarmalamasına izin verir.
- **Çözüm:** Uygulamanın ana giriş noktası `main.tsx` olduğu için buradaki `<BrowserRouter>` korundu. `App.tsx` dosyasındaki `<Router>` sarmalayıcısı kaldırılarak hatanın önüne geçildi.

---

## Notlar

### Terminal Çalışma Dizini (CWD) Davranışı
- **Sorun:** `cd frontend && npm install` komutu "Sistem belirtilen yolu bulamıyor" hatası verdi.
- **Neden:** Komutu çalıştıran terminalin mevcut çalışma dizini zaten `.../frontend` idi. Komut, `frontend` içinde başka bir `frontend` dizini aradı ve bulamadı.
- **Öğrenim:** Terminal komutlarını çalıştırırken, bir sonraki komut için çalışma dizininin ne olacağını belirten araç mesajları yanıltıcı olabiliyor. Komutların çıktısındaki en son komut istemi satırı (`C:\... >`), bir sonraki adımdaki gerçek çalışma dizinini daha doğru bir şekilde yansıtıyor. Emin olmak için `dir` veya `ls` gibi komutlarla dizini doğrulamak en güvenli yoldur.

### Dizin Yapısı Oluşturma Hataları
- **Sorun:** `mkdir .vscode` komutu, `frontend/src` dizini içindeyken çalıştırıldı ve klasör yanlış yere oluşturuldu.
- **Neden:** Bir önceki adımdan sonra terminalin `frontend/src` dizininde kaldığını gözden kaçırdım.
- **Çözüm:** `rmdir .vscode && cd .. && mkdir .vscode` komut zinciri ile yanlış oluşturulan dizin silindi, bir üst dizine geçildi ve klasör doğru yerde (proje ana dizini) yeniden oluşturuldu.
- **Öğrenim:** Karmaşık görevlerde adımlar arasında terminalin mevcut çalışma dizinini (CWD) zihinsel olarak takip etmek kritik öneme sahiptir. Her adımdan önce CWD'yi varsaymak yerine doğrulamak (örn: `pwd` veya `dir`) bu tür hataları önler.

---
## Belgeden Sapmalar

### ESLint Yapılandırması: `.eslintrc.json` yerine `eslint.config.js`
- **Durum:** `TODO.md` belgesi, ESLint yapılandırması için `.eslintrc.json` formatını önermektedir. Ancak, `npm create vite@latest` komutuyla oluşturulan modern proje yapısı, ESLint'in yeni "flat config" standardı olan `eslint.config.js` dosyasını kullanmaktadır.
- **Karar:** Projenin güncel standartlara (Haziran 2025 varsayımıyla) uygunluğunu korumak amacıyla `eslint.config.js` dosyası kullanılmaya devam edilecektir.
- **Uygulama:** `TODO.md`'de belirtilen ESLint kuralları (`eslint:recommended`, `react/recommended`, `react-hooks/recommended`, `prettier` entegrasyonu ve `react/prop-types: "off"`) `eslint.config.js` dosyasının formatına uygun olarak yeniden düzenlenmiş ve dosyaya uygulanmıştır. Bu yaklaşım, projenin daha modern ve geleceğe dönük olmasını sağlar.

---
## Hata Ayıklama ve Çözüm Notları

### Proje Doğrulama (`npm run lint`) Sırasında Karşılaşılan Sorunlar ve Çözümleri

Proje kurulumunun son adımında `npm run lint` komutu çalıştırıldığında birkaç önemli hata ve uyarı ile karşılaşıldı. Aşağıda bu sorunların analizi ve uygulanan çözümler listelenmiştir.

**1. Sorun: `Parsing error: Unexpected token <`**
   - **Neden:** ESLint, JSX sözdizimini (HTML benzeri kod) ayrıştıramıyordu. Varsayılan JavaScript ayrıştırıcısı JSX'i tanımaz.
   - **Çözüm:** `eslint.config.js` dosyasına, JSX'in etkinleştirildiğini belirten bir `languageOptions.parserOptions` nesnesi eklendi. Bu, ESLint'e `.jsx` dosyalarını doğru bir şekilde işlemesi için talimat verdi.

**2. Sorun: `'test' and 'expect' is not defined`**
   - **Neden:** `vitest` testleri için `test` ve `

## Bölüm 1 Notları

- **Sorun:** `ColorModeIconDropdown` bileşeni `ColorModeToggleButton` olarak yeniden düzenlendikten ve dosyası yeniden adlandırıldıktan sonra, `Dashboard` sayfasında yer alan `AppNavbar.tsx` bileşeninde bir "import" hatası oluştu.
- **Neden:** `AppNavbar.tsx`, hala var olmayan eski `ColorModeIconDropdown` bileşenini import etmeye çalışıyordu. Bu durum, `TODO-3.md` belgesinde öngörülmemiş bir yan etkiydi.
- **Çözüm:** `AppNavbar.tsx` dosyası manuel olarak düzenlendi. Eski import ifadesi kaldırıldı ve yerine yeni `ColorModeToggleButton` bileşeninin importu ve kullanımı eklendi.
- **Öğrenim:** Bir bileşeni yeniden yapılandırmak veya yeniden adlandırmak gibi temel değişiklikler, projenin beklenmedik yerlerinde hatalara yol açabilir. Değişiklik sonrası projenin genelinde bir test veya `lint` kontrolü yapmak bu tür sorunları erkenden tespit etmeyi sağlar.
# Material UI Şablon Entegrasyon Planı

Bu döküman, Material UI şablonlarını mevcut `frontend` projesine entegre etmek için adımları içermektedir.

### Adım 1: Gerekli Bağımlılıkların Yüklenmesi

Öncelikle, şablonların ihtiyaç duyduğu kütüphaneleri projeye ekleyin. `frontend` klasöründe bir terminal açın ve aşağıdaki komutu çalıştırın:

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @mui/x-charts @mui/x-date-pickers @mui/x-data-grid-pro @mui/x-tree-view dayjs @react-spring/web clsx
```

*Not: Bazı şablonlar `@mui/x-data-grid` kullanırken, tema dosyaları `@mui/x-data-grid-pro`'ya referans veriyor. Entegrasyonun sorunsuz olması için Pro versiyonunu eklemeniz önerilir.*

### Adım 2: Dosya ve Klasörlerin Kopyalanması

Şablon dosyalarını projenizin yapısına uygun şekilde kopyalayın.

1.  **`templates/shared-theme`** klasörünü **`frontend/src/theme/shared-theme`** olarak kopyalayın.
2.  **`templates/dashboard`** klasörünü **`frontend/src/pages/Dashboard`** olarak kopyalayın.
3.  **`templates/marketing-page`** klasörünü **`frontend/src/pages/MarketingPage`** olarak kopyalayın.
4.  **`templates/sign-in`** klasörünü **`frontend/src/pages/SignIn`** olarak kopyalayın.
5.  **`templates/sign-up`** klasörünü **`frontend/src/pages/SignUp`** olarak kopyalayın.

Daha temiz importlar için kopyaladığınız ana bileşen dosyalarını `index.tsx` olarak yeniden adlandırın:

*   `frontend/src/pages/Dashboard/Dashboard.tsx` -> `frontend/src/pages/Dashboard/index.tsx`
*   `frontend/src/pages/MarketingPage/MarketingPage.tsx` -> `frontend/src/pages/MarketingPage/index.tsx`
*   `frontend/src/pages/SignIn/SignIn.tsx` -> `frontend/src/pages/SignIn/index.tsx`
*   `frontend/src/pages/SignUp/SignUp.tsx` -> `frontend/src/pages/SignUp/index.tsx`

### Adım 3: İçe Aktarma (Import) Yollarının Güncellenmesi

Dosyaları yeni yerlerine kopyaladıktan sonra, dosya içi `import` yolları bozulacaktır. Aşağıdaki dosyalarda belirtilen güncellemeleri yapmanız gerekmektedir:

*   **`frontend/src/pages/Dashboard/index.tsx`**:
    *   `import AppTheme from '../shared-theme/AppTheme';` -> `import AppTheme from '../../theme/shared-theme/AppTheme';`
*   **`frontend/src/pages/Dashboard/components/AppNavbar.tsx`**:
    *   `import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';` -> `import ColorModeIconDropdown from '../../../theme/shared-theme/ColorModeIconDropdown';`
*   **`frontend/src/pages/Dashboard/components/Header.tsx`**:
    *   `import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';` -> `import ColorModeIconDropdown from '../../../theme/shared-theme/ColorModeIconDropdown';`
*   **`frontend/src/pages/Dashboard/theme/customizations/` içindeki tüm dosyalar**:
    *   `import { ... } from '../../../shared-theme/themePrimitives';` -> `import { ... } from '../../../../theme/shared-theme/themePrimitives';`
*   **`frontend/src/pages/MarketingPage/index.tsx`**:
    *   `import AppTheme from '../shared-theme/AppTheme';` -> `import AppTheme from '../../theme/shared-theme/AppTheme';`
*   **`frontend/src/pages/MarketingPage/components/AppAppBar.tsx`**:
    *   `import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';` -> `import ColorModeIconDropdown from '../../../theme/shared-theme/ColorModeIconDropdown';`
*   **`frontend/src/pages/SignIn/index.tsx`**:
    *   `import AppTheme from '../shared-theme/AppTheme';` -> `import AppTheme from '../../theme/shared-theme/AppTheme';`
    *   `import ColorModeSelect from '../shared-theme/ColorModeSelect';` -> `import ColorModeSelect from '../../theme/shared-theme/ColorModeSelect';`
*   **`frontend/src/pages/SignUp/index.tsx`**:
    *   `import AppTheme from '../shared-theme/AppTheme';` -> `import AppTheme from '../../theme/shared-theme/AppTheme';`
    *   `import ColorModeSelect from '../shared-theme/ColorModeSelect';` -> `import ColorModeSelect from '../../theme/shared-theme/ColorModeSelect';`

### Adım 4: Fontların Eklenmesi

Şablonlar `Inter` fontunu kullanmaktadır. Bu fontu projenize eklemek için `frontend/index.html` dosyasının `<head>` etiketleri arasına aşağıdaki satırları ekleyin:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Adım 5: Statik Varlıkların (Static Assets) Yönetimi

Dashboard bileşenleri (`SideMenu.tsx` ve `SideMenuMobile.tsx`) bir avatar resmi (`/static/images/avatar/7.jpg`) kullanıyor. Bu yol projenizde çalışmayacaktır.

*   **Çözüm:** `frontend/public/` klasörü altına `static/images/avatar/` yolunu oluşturup kendi avatar resminizi `7.jpg` olarak kaydedebilir veya ilgili bileşenlerdeki `<Avatar>` komponentinin `src` özelliğini şimdilik kaldırabilirsiniz.

### Adım 6: Rotaların (Routing) Yapılandırılması

Yeni oluşturduğunuz sayfaları uygulamanızda görüntülenebilir hale getirmek için rotaları tanımlamanız gerekir. Genellikle bu işlem `frontend/src/App.tsx` veya benzeri bir ana yönlendirici bileşeninde yapılır. `react-router-dom` kullandığınızı varsayarak örnek bir yapılandırma:

```tsx
// frontend/src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MarketingPage from './pages/MarketingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage'; // Mevcut anasayfanız

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### Adım 7: Uygulamayı Başlatma ve Test Etme

Tüm adımları tamamladıktan sonra projenizi başlatın:

```bash
cd frontend
npm run dev
```

Ardından tarayıcınızda `/dashboard`, `/marketing`, `/signin` ve `/signup` yollarını ziyaret ederek yeni sayfaların doğru bir şekilde çalışıp çalışmadığını kontrol edin.

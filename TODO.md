# Nihai Frontend Şablonu: Üretim Seviyesinde React, Vite, MUI (Geliştirilmiş Versiyon)

Bu kılavuz, herhangi bir projeye başlarken kullanabileceğiniz, "tak ve çalıştır" (plug-and-play) niteliğinde, üretim seviyesine hazır (production-ready) bir frontend şablonu oluşturma adımlarını içerir. Şablon, en iyi pratikleri standart olarak benimser ve yaygın geliştirme senaryoları için hazır çözümler sunar.

---

## Bölüm 1: Proje Başlatma ve Temel Kurulum

### Adım 1: Proje Oluşturma ve Git Başlatma

Terminalde, `frontend` adında yeni bir React projesi oluşturun, dizine geçin ve Git'i başlatın.

```bash
npm create vite@latest frontend -- --template react
cd frontend
git init && git add . && git commit -m "Initial commit: Setup project with Vite"
```

### Adım 2: Gerekli Paketleri Yükleme

Proje için gerekli tüm kütüphaneleri tek komutla yükleyin.

```bash
# Uygulama bağımlılıkları (UI, routing, API)
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom axios

# Geliştirme bağımlılıkları (Kod kalitesi, test)
npm install -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier vitest jsdom @testing-library/react @testing-library/jest-dom
```

---

## Bölüm 2: Kod Kalitesi ve Klasör Yapısı

### Adım 3: Gelişmiş Klasör Yapısı

Projenin modüler ve ölçeklenebilir olması için aşağıdaki klasör yapısını oluşturalım.

```
frontend/
├── .vscode/
│   └── settings.json
├── public/
├── src/
│   ├── api/             # API isteklerinin yönetildiği katman
│   ├── components/      # Genel, tekrar kullanılabilir UI bileşenleri
│   ├── hooks/           # Özel (custom) React hook'ları
│   ├── layouts/         # Ana sayfa yerleşimi (Navbar, Footer vb.)
│   ├── pages/           # Uygulama sayfaları
│   ├── providers/       # Global durum yönetimi (Context API)
│   ├── theme/           # MUI tema yapılandırması
│   ├── tests/           # Test dosyaları
│   ├── utils/           # Yardımcı fonksiyonlar
│   ├── App.jsx          # Ana rota yapılandırması
│   ├── index.css
│   └── main.jsx         # Uygulamanın giriş noktası
├── .env.development
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
└── vite.config.js
```

`src` altında gerekli klasörleri oluşturun:
```bash
# Proje ana dizinindeyken çalıştırın
cd src
mkdir api components hooks layouts pages providers theme tests utils
cd ..
```

### Adım 4: Kod Kalitesi ve Geliştirici Deneyimi (DX)

Proje genelinde tutarlı bir kod stili ve kalitesi sağlamak için ESLint, Prettier ve VSCode ayarlarını yapılandıralım.

**`.vscode/settings.json` (VSCode için otomatik formatlama):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
*Bu ayar, dosyayı her kaydettiğinizde Prettier'ın otomatik olarak çalışmasını sağlar.*

**`.prettierrc` (Prettier yapılandırması):**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

**`.eslintrc.json` (ESLint kuralları):**
```json
{
  "env": { "browser": true, "es2021": true, "node": true },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "parserOptions": { "ecmaVersion": "latest", "sourceType": "module" },
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": "warn",
    "react/prop-types": "off"
  },
  "settings": { "react": { "version": "detect" } }
}
```

**`package.json`'a script'leri ekleyin:**
`package.json` dosyanızdaki `"scripts"` bölümünü aşağıdaki gibi güncelleyerek kod kalitesi araçlarını kolayca çalıştırılabilir hale getirin.
```json
// ...
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
  "format": "prettier --write \"src/**/*.{js,jsx}\""
},
// ...
```

### Adım 5: Mutlak Yol ve Test Yapılandırması (`vite.config.js`)

İç içe klasörlerde `../../../` gibi karmaşık yolları önlemek ve test ortamını kurmak için `vite.config.js` dosyasını güncelleyelim.

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @ sembolünü src klasörü olarak ayarla
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  },
});
```
*Artık `import MainLayout from '@/layouts/MainLayout';` gibi temiz importlar yapabilirsiniz.*

---

## Bölüm 3: Uygulama İskeleti

### Adım 6: Ortam Değişkenleri ve API İstemcisi

Uygulamanın dış servislerle iletişim kurması için merkezi bir API istemcisi ve ortam değişkenleri oluşturalım.

**`.env.development` (Geliştirme ortamı değişkenleri):**
```
VITE_API_URL=http://localhost:5000/api
```

**`src/api/axios.js` (Merkezi Axios yapılandırması):**
```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İsteğe bağlı: Token gibi dinamik header'lar için interceptor
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;
```

### Adım 7: Merkezi Tema Yapılandırması (Material-UI)

Uygulama genelinde tutarlı bir görünüm sağlamak için `src/theme/` altında özel bir tema dosyası oluşturalım.

**`src/theme/theme.js`:**
```javascript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Örnek mavi renk
    },
    secondary: {
      main: '#dc004e', // Örnek pembe renk
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
```

### Adım 8: Global Durum Yönetimi (React Context)

Uygulama genelinde kullanıcı bilgileri gibi verileri paylaşmak için bir `Context` oluşturalım.

**`src/providers/AuthProvider.jsx`:**
```jsx
import { createContext, useState, useContext, useMemo } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  // Performansı optimize etmek için değeri memoize edelim
  const value = useMemo(
    () => ({ user, login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Adım 9: Ana Yerleşim ve Vitrin Sayfası

Kullanıcının göreceği temel arayüz bileşenlerini oluşturalım.

**`src/layouts/MainLayout.jsx`:**
```jsx
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Proje Şablonu
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
        <Container>
          <Outlet /> {/* Sayfa içeriği burada render edilecek */}
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
```

**`src/pages/HomePage.jsx`:**
```jsx
import { Typography, Box, Paper } from '@mui/material';

const HomePage = () => {
  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Proje Başlamaya Hazır!
      </Typography>
      <Typography variant="body1">
        Bu profesyonel React şablonu, geliştirme sürecinizi hızlandırmak için
        tüm gerekli araçlarla donatılmıştır.
      </Typography>
    </Paper>
  );
};

export default HomePage;
```

### Adım 10: Rota Yapılandırması ve Uygulama Girişi

Oluşturduğumuz tüm parçaları bir araya getirelim.

**`src/App.jsx` (Rotaları yönetir):**
```jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* Diğer sayfalarınızı buraya ekleyebilirsiniz */}
      </Route>
    </Routes>
  );
}

export default App;
```

**`src/main.jsx` (Uygulamayı başlatır):**
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import { AuthProvider } from '@/providers/AuthProvider';
import theme from '@/theme/theme'; // Özelleştirilmiş tema
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
```

---

## Bölüm 4: Test ve Proje Sunumu

### Adım 11: Test Altyapısını Tamamlama

Projemizin güvenilirliğini testlerle doğrulayalım.

**`src/tests/setup.js` (Vitest için başlangıç ayarı):**
```javascript
import '@testing-library/jest-dom';
```

**Örnek Test `src/tests/HomePage.test.jsx`:**
```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';

test('HomePage "Proje Başlamaya Hazır!" metnini render etmelidir', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  const headingElement = screen.getByText(/Proje Başlamaya Hazır!/i);
  expect(headingElement).toBeInTheDocument();
});
```
*Artık `npm test` komutuyla testlerinizi çalıştırabilirsiniz.*

### Adım 12: Proje Vitrini (`README.md`)

Her iyi şablonun bir vitrini olmalıdır. `frontend` klasörünün ana dizininde `README.md` adında yeni bir dosya oluşturun ve içeriğini aşağıdaki gibi doldurun.

```markdown
# React + Vite + Material-UI Profesyonel Frontend Şablonu

Bu şablon, modern web uygulamaları geliştirmek için üretim seviyesine hazır bir başlangıç noktası sunar.

## ✨ Özellikler

- **Modern Araç Seti:** Vite, React 18
- **UI Kütüphanesi:** Material-UI (Özelleştirilmiş Tema ile)
- **Kod Kalitesi:** ESLint & Prettier (Otomatik formatlama ile)
- **Test Altyapısı:** Vitest & React Testing Library
- **Routing:** React Router DOM
- **API İstemcisi:** Axios
- **Geliştirici Deneyimi:** Mutlak yol (`@/`) desteği
- **Durum Yönetimi:** React Context API ile başlangıç

## 🚀 Hızlı Başlangıç

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlat
```bash
npm run dev
```

## 🛠️ Mevcut Script'ler

- `npm run dev`: Geliştirme sunucusunu başlatır.
- `npm run build`: Projeyi üretim için derler.
- `npm run lint`: ESLint ile kod hatalarını kontrol eder.
- `npm run format`: Prettier ile tüm kod dosyalarını formatlar.
- `npm run test`: Vitest ile testleri çalıştırır.
- `npm run preview`: Üretim derlemesini lokalde görüntüler.

## 📁 Klasör Yapısı
*Açıklamalar için kılavuzdaki klasör yapısı tablosuna bakın.*
```

### Adım 13: Projeyi Doğrulama

Tüm adımları tamamladıktan sonra, aşağıdaki komutlarla şablonunuzun kusursuz çalıştığını doğrulayın:
```bash
# Geliştirme sunucusunu başlat
npm run dev

# Testleri çalıştır
npm test

# Kod kalitesini kontrol et
npm run lint
```
---

## Bonus: TypeScript Entegrasyonu

Bu şablonu daha da güçlü hale getirmek için TypeScript ekleyebilirsiniz.

**1. Bağımlılıkları Yükleyin:**
```bash
npm install -D typescript @types/react @types/react-dom @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

**2. `tsconfig.json` Oluşturun:**
Proje ana dizininde `tsconfig.json` dosyası oluşturun.
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**3. Dosya Uzantılarını Değiştirin:**
`src` klasöründeki tüm `.js` ve `.jsx` dosyalarını `.ts` ve `.tsx` olarak yeniden adlandırın.

**4. ESLint'i Yapılandırın:**
`.eslintrc.json` dosyasını TypeScript'e uyumlu hale getirin.

Bu adımlardan sonra projeniz tamamen tür-güvenli (type-safe) olacaktır!
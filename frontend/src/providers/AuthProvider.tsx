import { createContext, useState, useContext, useMemo, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
    user: any;
    login: (userData: any) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else if (accessToken) {
          // Eğer sadece token var ama user bilgisi yoksa, kullanıcıyı çekmeyi dene
          // Bu durum, sayfa yenilendiğinde veya tarayıcı kapatılıp açıldığında olabilir
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          const response = await axios.get('http://127.0.0.1:8000/api/auth/me/');
          const userData = response.data;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Oturum başlatılamadı veya token geçersiz.", error);
        // Hata durumunda token ve kullanıcı bilgilerini temizle
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = useMemo(
    () => ({ user, login, logout, loading }),
    [user, loading]
  );

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

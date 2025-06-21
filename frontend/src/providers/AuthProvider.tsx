import { createContext, useState, useContext, useMemo, useEffect, ReactNode } from 'react';
import apiClient from '@/api/axios'; // apiClient'i import et

interface AuthContextType {
    user: any;
    login: (userData: any) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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

  const login = (userData: any) => setUser(userData);
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

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from '@/pages/Dashboard';
import MarketingPage from '@/pages/MarketingPage';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        const offset = 128;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<MarketingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marketing" element={<MarketingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;

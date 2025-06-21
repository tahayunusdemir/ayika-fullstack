import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import MarketingPage from '@/pages/MarketingPage';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

function App() {
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

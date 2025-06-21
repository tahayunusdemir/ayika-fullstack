import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute; 
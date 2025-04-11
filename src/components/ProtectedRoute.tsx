
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  // Show loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // If authenticated, render the nested routes
  return <Outlet />;
};


import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import Navigation from '@/components/Navigation';
import NotificationsCard from '@/components/NotificationsCard';
import ProfileSection from '@/components/dashboard/ProfileSection';
import TeachingSection from '@/components/dashboard/TeachingSection';
import LearningSection from '@/components/dashboard/LearningSection';
import SessionsSection from '@/components/dashboard/SessionsSection';

const Dashboard = () => {
  const { logout } = useAuth();
  const { profile, teachingOffers, sessions, isLoading, refreshSessions } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={logout}>Logout</Button>
        </div>

        <div className="mb-8">
          <NotificationsCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProfileSection profile={profile} />
          <TeachingSection teachingOffers={teachingOffers} />
          <LearningSection />

          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-4">Your Sessions</h2>
            <SessionsSection sessions={sessions} onStatusUpdate={refreshSessions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

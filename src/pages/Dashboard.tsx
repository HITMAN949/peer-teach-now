
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tables } from '@/integrations/supabase/types';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={logout}>Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-semibold">Name:</span> {profile?.full_name}</p>
              <p><span className="font-semibold">Points:</span> {profile?.points}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/profile'}>
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teaching</CardTitle>
            <CardDescription>Subjects you teach</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">You haven't created any teaching offers yet.</p>
            <Button onClick={() => window.location.href = '/offers/create'}>
              Create Teaching Offer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning</CardTitle>
            <CardDescription>Find teachers to learn from</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/offers/browse'}>
              Browse Teaching Offers
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

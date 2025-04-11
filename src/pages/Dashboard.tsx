
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tables } from '@/integrations/supabase/types';
import { BookOpen, Book, Plus, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [teachingOffers, setTeachingOffers] = useState<Tables<'teaching_offers'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;

        setIsLoading(true);
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        setProfile(profileData);

        // Fetch teaching offers
        const { data: offerData, error: offerError } = await supabase
          .from('teaching_offers')
          .select('*')
          .eq('teacher_id', user.id)
          .order('created_at', { ascending: false });

        if (offerError) {
          throw offerError;
        }

        setTeachingOffers(offerData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

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
                <Button variant="outline" className="mt-4" onClick={() => navigate('/profile')}>
                  <Pencil className="mr-2 h-4 w-4" />
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
              {teachingOffers.length > 0 ? (
                <div className="space-y-4">
                  {teachingOffers.slice(0, 3).map((offer) => (
                    <div key={offer.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{offer.subject}</h4>
                          <Badge className="mt-1" variant="outline">
                            {offer.level.charAt(0).toUpperCase() + offer.level.slice(1)}
                          </Badge>
                        </div>
                        <span className="text-sm font-medium">{offer.points_per_hour} pts/hr</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 w-full"
                        onClick={() => navigate(`/offers/${offer.id}`)}
                      >
                        View Offer
                      </Button>
                    </div>
                  ))}
                  
                  {teachingOffers.length > 3 && (
                    <Button 
                      variant="ghost" 
                      className="w-full mt-2"
                      onClick={() => navigate('/dashboard/teaching')}
                    >
                      View All ({teachingOffers.length})
                    </Button>
                  )}
                  
                  <Button 
                    className="w-full mt-2" 
                    onClick={() => navigate('/offers/create')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Offer
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 mb-4">You haven't created any teaching offers yet.</p>
                  <Button onClick={() => navigate('/offers/create')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Teaching Offer
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning</CardTitle>
              <CardDescription>Find teachers to learn from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/offers/browse')}
                >
                  <Book className="mr-2 h-4 w-4" />
                  Browse Teaching Offers
                </Button>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Popular Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer"
                      onClick={() => navigate('/offers/browse?subject=Mathematics')}
                    >
                      Mathematics
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer"
                      onClick={() => navigate('/offers/browse?subject=Programming')}
                    >
                      Programming
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer"
                      onClick={() => navigate('/offers/browse?subject=Physics')}
                    >
                      Physics
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer"
                      onClick={() => navigate('/offers/browse?subject=English')}
                    >
                      English
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

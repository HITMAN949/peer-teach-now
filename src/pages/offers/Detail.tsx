
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Clock, User, Book, ArrowLeft } from 'lucide-react';

type TeachingOffer = {
  id: string;
  subject: string;
  description: string;
  level: string;
  points_per_hour: number;
  location_type: string;
  teacher: {
    id: string;
    full_name: string;
    bio: string | null;
    school_university: string | null;
  };
};

const OfferDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState<TeachingOffer | null>(null);

  useEffect(() => {
    if (id) {
      fetchOfferDetails(id);
    }
  }, [id]);

  const fetchOfferDetails = async (offerId: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('teaching_offers')
        .select(`
          id,
          subject,
          description,
          level,
          points_per_hour,
          location_type,
          teacher:profiles!teaching_offers_teacher_id_fkey(
            id,
            full_name,
            bio,
            school_university
          )
        `)
        .eq('id', offerId)
        .single();

      if (error) {
        throw error;
      }

      setOffer(data as TeachingOffer);
    } catch (error: any) {
      toast({
        title: "Error loading offer",
        description: error.message || "Failed to load teaching offer details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLocationBadgeColor = (location: string) => {
    switch (location) {
      case 'online':
        return 'bg-blue-100 text-blue-800';
      case 'in-person':
        return 'bg-amber-100 text-amber-800';
      case 'both':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isCurrentUserTeacher = offer?.teacher.id === user?.id;

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : offer ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <CardTitle className="text-2xl">{offer.subject}</CardTitle>
                    <CardDescription className="mt-1 text-base">
                      Taught by {offer.teacher.full_name}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getLevelBadgeColor(offer.level)} variant="outline">
                      {offer.level.charAt(0).toUpperCase() + offer.level.slice(1)}
                    </Badge>
                    <Badge className={getLocationBadgeColor(offer.location_type)} variant="outline">
                      <MapPin className="h-3 w-3 mr-1" />
                      {offer.location_type.charAt(0).toUpperCase() + offer.location_type.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">About this learning opportunity</h3>
                <p className="whitespace-pre-line text-gray-700">{offer.description}</p>

                <div className="mt-6 flex items-center text-lg font-medium">
                  <Clock className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="text-westudy-600">{offer.points_per_hour} points per hour</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Schedule</CardTitle>
                <CardDescription>
                  Available time slots for booking lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12 text-gray-500">
                  <Calendar className="h-12 w-12 mr-4 opacity-50" />
                  <div className="text-center">
                    <p className="mb-2">No time slots available yet</p>
                    {isCurrentUserTeacher && (
                      <Button 
                        variant="outline" 
                        onClick={() => navigate(`/offers/${id}/schedule`)}
                      >
                        Add Availability
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Teacher</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 rounded-full h-16 w-16 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{offer.teacher.full_name}</h3>
                    {offer.teacher.school_university && (
                      <p className="text-sm text-gray-500">{offer.teacher.school_university}</p>
                    )}
                  </div>
                </div>

                {offer.teacher.bio ? (
                  <p className="text-sm text-gray-700">{offer.teacher.bio}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">No bio provided</p>
                )}
              </CardContent>
            </Card>

            {!isCurrentUserTeacher && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Book a lesson</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">
                    Select a time slot from the schedule to book a lesson with this teacher.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    <Book className="mr-2 h-4 w-4" />
                    No slots available
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Teaching offer not found.</p>
          <Button onClick={() => navigate('/offers/browse')}>
            Browse Other Offers
          </Button>
        </div>
      )}
    </div>
  );
};

export default OfferDetail;

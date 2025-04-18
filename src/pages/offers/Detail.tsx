
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AvailabilitySlots } from '@/components/AvailabilitySlots';
import { TeacherCard } from '@/components/offers/TeacherCard';
import { OfferDetailsCard } from '@/components/offers/OfferDetailsCard';
import OfferBookingCard from '@/components/offers/OfferBookingCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { TeachingOffer } from '@/types/teaching';

const OfferDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState<TeachingOffer | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    id: string;
    startTime: Date;
    endTime: Date;
  } | null>(null);

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
            <OfferDetailsCard offer={offer} />

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Schedule</CardTitle>
                <CardDescription>
                  Available time slots for booking lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                {id && (
                  <AvailabilitySlots 
                    offerId={id} 
                    isCurrentUserTeacher={isCurrentUserTeacher}
                    onSelectTimeSlot={setSelectedTimeSlot}
                    selectedTimeSlotId={selectedTimeSlot?.id}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <TeacherCard 
              teacherId={offer.teacher.id}
              fullName={offer.teacher.full_name}
              bio={offer.teacher.bio}
              schoolUniversity={offer.teacher.school_university}
            />

            {!isCurrentUserTeacher && (
              <OfferBookingCard 
                offerId={offer.id}
                teacherId={offer.teacher.id}
                pointsPerHour={offer.points_per_hour}
                selectedTimeSlot={selectedTimeSlot}
                onResetSelection={() => setSelectedTimeSlot(null)}
              />
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

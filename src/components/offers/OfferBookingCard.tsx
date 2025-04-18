
import React, { useState } from 'react';
import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface OfferBookingCardProps {
  offerId: string;
  teacherId: string;
  pointsPerHour: number;
  selectedTimeSlot: {
    id: string;
    startTime: Date;
    endTime: Date;
  } | null;
  onResetSelection: () => void;
}

const OfferBookingCard = ({ offerId, teacherId, pointsPerHour, selectedTimeSlot, onResetSelection }: OfferBookingCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isBooking, setIsBooking] = useState(false);

  const handleBookSession = async () => {
    if (!user || !selectedTimeSlot) return;
    
    try {
      setIsBooking(true);
      
      // Calculate duration in hours (rounded to nearest 0.5)
      const startTime = new Date(selectedTimeSlot.startTime);
      const endTime = new Date(selectedTimeSlot.endTime);
      const durationMs = endTime.getTime() - startTime.getTime();
      const durationHours = Math.round((durationMs / (1000 * 60 * 60)) * 2) / 2;
      
      // Calculate cost in points
      const totalPoints = Math.round(pointsPerHour * durationHours);
      const platformFee = Math.round(totalPoints * 0.1); // 10% platform fee
      
      // First create the session
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .insert({
          offer_id: offerId,
          teacher_id: teacherId,
          student_id: user.id,
          time_slot_id: selectedTimeSlot.id,
          points_amount: totalPoints,
          platform_fee: platformFee,
          status: 'requested' // Changed to 'requested' which should be a valid enum value in the database
        })
        .select()
        .single();
      
      if (sessionError) throw sessionError;
      
      // Then update the time slot to mark it as booked
      const { error: timeSlotError } = await supabase
        .from('time_slots')
        .update({ is_booked: true })
        .eq('id', selectedTimeSlot.id);
      
      if (timeSlotError) throw timeSlotError;
      
      toast({
        title: "Session Booked!",
        description: "Your learning session has been successfully booked.",
      });
      
      onResetSelection();
      
      // Navigate to dashboard after successful booking
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to book session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  const formatDateTime = (dateTime: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date(dateTime));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Book a lesson</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedTimeSlot ? (
          <>
            <p className="font-medium mb-2">Selected Time:</p>
            <div className="bg-green-50 p-3 rounded-md mb-4">
              <p className="text-sm font-medium text-green-800">
                {formatDateTime(selectedTimeSlot.startTime)} - {formatDateTime(selectedTimeSlot.endTime)}
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Session rate:</span>
                <span className="font-medium">{pointsPerHour} points/hour</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Total:</span>
                <span>{Math.round(pointsPerHour * 
                  ((new Date(selectedTimeSlot.endTime).getTime() - new Date(selectedTimeSlot.startTime).getTime()) / 
                  (1000 * 60 * 60)))} points</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-700 mb-4">
            Select a time slot from the schedule to book a lesson with this teacher.
          </p>
        )}
      </CardContent>
      <CardFooter>
        {selectedTimeSlot ? (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" onClick={onResetSelection} disabled={isBooking}>
              Cancel
            </Button>
            <Button onClick={handleBookSession} disabled={isBooking || !user}>
              {isBooking ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current"></div>
                  Booking...
                </>
              ) : (
                <>
                  <Book className="mr-2 h-4 w-4" />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>
        ) : (
          <Button className="w-full" disabled>
            <Book className="mr-2 h-4 w-4" />
            No slots selected
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OfferBookingCard;


import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';

// Update the allowed status values to match the database constraint
// The error indicates that our current values violate the database constraint
type SessionStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'scheduled';

interface SessionCardProps {
  session: {
    id: string;
    status: SessionStatus;
    points_amount: number;
    teacher_id: string;
    student_id: string;
    time_slot: {
      start_time: string;
      end_time: string;
    };
    offer: {
      subject: string;
      level: string;
    };
    teacher: {
      full_name: string;
    };
    student: {
      full_name: string;
    };
  };
  isTeacher: boolean;
  onStatusUpdate: () => void;
}

const SessionCard = ({ session, isTeacher, onStatusUpdate }: SessionCardProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const updateSessionStatus = async (newStatus: SessionStatus) => {
    try {
      setIsUpdating(true);
      
      // Log the status update attempt for debugging
      console.log(`Attempting to update session ${session.id} to status: ${newStatus}`);
      
      const { error } = await supabase
        .from('sessions')
        .update({ status: newStatus })
        .eq('id', session.id);

      if (error) {
        console.error('Error updating session:', error);
        throw error;
      }

      toast({
        title: "Session Updated",
        description: `Session has been ${newStatus}`,
      });
      
      onStatusUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {session.offer.subject} - {session.offer.level}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {isTeacher ? 'Student' : 'Teacher'}: {isTeacher ? session.student.full_name : session.teacher.full_name}
            </p>
            <p className="text-sm text-muted-foreground">
              Time: {formatDateTime(session.time_slot.start_time)} - {formatDateTime(session.time_slot.end_time)}
            </p>
            <p className="text-sm font-medium">Points: {session.points_amount}</p>
            <p className="text-sm font-medium">Status: <span className="capitalize">{session.status}</span></p>
          </div>

          {session.status === 'scheduled' && isTeacher && (
            <div className="flex gap-2">
              <Button
                onClick={() => updateSessionStatus('confirmed')}
                disabled={isUpdating}
                className="flex-1"
              >
                <Check className="w-4 h-4 mr-2" />
                Confirm
              </Button>
              <Button
                onClick={() => updateSessionStatus('cancelled')}
                variant="destructive"
                disabled={isUpdating}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </div>
          )}

          {session.status === 'confirmed' && (
            <Button
              onClick={() => updateSessionStatus('completed')}
              disabled={isUpdating || session.status === 'completed'}
              className="w-full"
            >
              Mark as Completed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;

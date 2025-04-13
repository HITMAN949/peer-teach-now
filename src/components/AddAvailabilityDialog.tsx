
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddAvailabilityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  offerId: string;
  onAvailabilityAdded: () => void;
}

export function AddAvailabilityDialog({
  isOpen,
  onClose,
  offerId,
  onAvailabilityAdded,
}: AddAvailabilityDialogProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: "Error",
        description: "Please select a date",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Format the date and times into ISO strings
      const startDate = new Date(selectedDate);
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      startDate.setHours(startHours, startMinutes, 0, 0);
      
      const endDate = new Date(selectedDate);
      const [endHours, endMinutes] = endTime.split(":").map(Number);
      endDate.setHours(endHours, endMinutes, 0, 0);
      
      // Validate times
      if (startDate >= endDate) {
        toast({
          title: "Invalid time range",
          description: "End time must be after start time",
          variant: "destructive",
        });
        return;
      }

      // Add time slot to the database
      const { error } = await supabase.from("time_slots").insert({
        offer_id: offerId,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        is_booked: false,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Availability added successfully",
      });
      
      onAvailabilityAdded();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error adding availability",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Availability</DialogTitle>
          <DialogDescription>
            Select a date and time range when you're available to teach.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="border rounded-md"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Add Availability"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

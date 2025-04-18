
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddAvailabilityDialog } from "./AddAvailabilityDialog";
import { Card, CardContent } from "@/components/ui/card";

interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface AvailabilitySlotsProps {
  offerId: string;
  isCurrentUserTeacher: boolean;
  onSelectTimeSlot?: (slot: { id: string; startTime: Date; endTime: Date } | null) => void;
  selectedTimeSlotId?: string | null;
}

export function AvailabilitySlots({ 
  offerId, 
  isCurrentUserTeacher, 
  onSelectTimeSlot,
  selectedTimeSlotId 
}: AvailabilitySlotsProps) {
  const { toast } = useToast();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchTimeSlots = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("time_slots")
        .select("*")
        .eq("offer_id", offerId)
        .order("start_time", { ascending: true });

      if (error) {
        throw error;
      }

      setTimeSlots(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading availability",
        description: error.message || "Failed to load time slots",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, [offerId]);

  const formatTimeSlot = (slot: TimeSlot) => {
    const startDate = new Date(slot.start_time);
    const endDate = new Date(slot.end_time);
    
    return {
      date: format(startDate, "EEEE, MMMM do, yyyy"),
      time: `${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`,
    };
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.is_booked || isCurrentUserTeacher) return;
    
    if (onSelectTimeSlot) {
      if (selectedTimeSlotId === slot.id) {
        // Deselect if already selected
        onSelectTimeSlot(null);
      } else {
        // Select this slot
        onSelectTimeSlot({
          id: slot.id,
          startTime: new Date(slot.start_time),
          endTime: new Date(slot.end_time)
        });
      }
    }
  };

  const groupedSlots = timeSlots.reduce<Record<string, TimeSlot[]>>((acc, slot) => {
    const { date } = formatTimeSlot(slot);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {isCurrentUserTeacher && (
            <div className="flex justify-end">
              <Button onClick={() => setIsDialogOpen(true)}>
                <Calendar className="mr-2 h-4 w-4" />
                Add Availability
              </Button>
            </div>
          )}

          {Object.keys(groupedSlots).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedSlots).map(([date, slots]) => (
                <Card key={date}>
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-3 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                      {date}
                    </h3>
                    <div className="grid gap-2">
                      {slots.map((slot) => {
                        const { time } = formatTimeSlot(slot);
                        const isSelected = selectedTimeSlotId === slot.id;
                        
                        return (
                          <div 
                            key={slot.id}
                            onClick={() => handleSlotClick(slot)}
                            className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                              slot.is_booked 
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
                                : isSelected
                                ? "bg-green-100 text-green-800 border border-green-500"
                                : "bg-green-50 text-green-700 hover:bg-green-100"
                            }`}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{time}</span>
                            <span className="ml-auto text-sm font-medium">
                              {slot.is_booked 
                                ? "Booked" 
                                : isSelected 
                                  ? "Selected" 
                                  : "Available"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <Calendar className="h-12 w-12 mr-4 opacity-50" />
              <div className="text-center">
                <p className="mb-2">No time slots available yet</p>
                {isCurrentUserTeacher && (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Add Availability
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      )}

      <AddAvailabilityDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        offerId={offerId}
        onAvailabilityAdded={fetchTimeSlots}
      />
    </div>
  );
}

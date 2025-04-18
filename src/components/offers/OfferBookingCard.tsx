
import React from 'react';
import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const OfferBookingCard = () => {
  return (
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
  );
};

export default OfferBookingCard;


import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { TeachingOffer } from '@/types/teaching';

interface OfferDetailsCardProps {
  offer: TeachingOffer;
}

export const OfferDetailsCard = ({ offer }: OfferDetailsCardProps) => {
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

  return (
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
  );
};

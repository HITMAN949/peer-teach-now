
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tables } from '@/integrations/supabase/types';

interface TeachingSectionProps {
  teachingOffers: Tables<'teaching_offers'>[];
}

const TeachingSection = ({ teachingOffers }: TeachingSectionProps) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default TeachingSection;

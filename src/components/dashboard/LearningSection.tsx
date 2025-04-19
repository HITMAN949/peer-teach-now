
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LearningSection = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default LearningSection;

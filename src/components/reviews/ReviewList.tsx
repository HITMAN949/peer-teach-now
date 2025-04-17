
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer: {
    full_name: string;
  };
}

interface ReviewListProps {
  revieweeId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ revieweeId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select(`
            id, 
            rating, 
            comment, 
            created_at,
            reviewer:profiles!inner(full_name)
          `)
          .eq('reviewee_id', revieweeId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReviews(data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [revieweeId]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Reviews</span>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">{calculateAverageRating()}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(Number(calculateAverageRating()))
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="flex space-x-4 border-b pb-4 last:border-b-0">
              <Avatar>
                <AvatarFallback>{review.reviewer.full_name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{review.reviewer.full_name}</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
                {review.comment && (
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewList;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Book, MapPin } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

// Define a more flexible type that matches what Supabase returns
type TeachingOfferWithTeacher = Tables<'teaching_offers'> & {
  profiles: {
    id: string;
    full_name: string;
    bio?: string | null;
    school_university?: string | null;
    points?: number;
    created_at?: string;
    updated_at?: string;
  } | null;
};

const BrowseOffers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState<TeachingOfferWithTeacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('teaching_offers')
        .select(`
          *,
          profiles:teacher_id(id, full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Cast the data to match our expected type
      setOffers(data as TeachingOfferWithTeacher[]);
    } catch (error: any) {
      toast({
        title: "Error loading offers",
        description: error.message || "Failed to load teaching offers",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterOffers = () => {
    return offers.filter((offer) => {
      const matchesSearch = 
        offer.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (offer.profiles?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = levelFilter === 'all' || offer.level === levelFilter;
      const matchesLocation = locationFilter === 'all' || offer.location_type === locationFilter;
      
      return matchesSearch && matchesLevel && matchesLocation;
    });
  };

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
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Find Teachers</h1>
      
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search by subject, description, or teacher name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterOffers().length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 mb-4">No teaching offers match your criteria.</p>
              <Button onClick={() => {
                setSearchTerm('');
                setLevelFilter('all');
                setLocationFilter('all');
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            filterOffers().map((offer) => (
              <Card key={offer.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{offer.subject}</CardTitle>
                  <CardDescription>{offer.profiles?.full_name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Badge className={getLevelBadgeColor(offer.level)} variant="outline">
                      {offer.level.charAt(0).toUpperCase() + offer.level.slice(1)}
                    </Badge>
                    <Badge className={getLocationBadgeColor(offer.location_type)} variant="outline">
                      <MapPin className="h-3 w-3 mr-1" />
                      {offer.location_type.charAt(0).toUpperCase() + offer.location_type.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {offer.description}
                  </p>
                  <p className="font-semibold">
                    {offer.points_per_hour} points/hour
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate(`/offers/${offer.id}`)}>
                    <Book className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BrowseOffers;

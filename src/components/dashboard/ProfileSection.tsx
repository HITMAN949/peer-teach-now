
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tables } from '@/integrations/supabase/types';

interface ProfileSectionProps {
  profile: Tables<'profiles'> | null;
}

const ProfileSection = ({ profile }: ProfileSectionProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> {profile?.full_name}</p>
          <p><span className="font-semibold">Points:</span> {profile?.points}</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/profile')}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;

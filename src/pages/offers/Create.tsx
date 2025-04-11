
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

const CreateOffer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    level: 'beginner',
    pointsPerHour: 10,
    locationType: 'online',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a teaching offer.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create a properly typed insert object for Supabase
      const offerData: TablesInsert<'teaching_offers'> = {
        teacher_id: user.id,
        subject: formData.subject,
        description: formData.description,
        level: formData.level as 'beginner' | 'intermediate' | 'advanced',
        points_per_hour: Number(formData.pointsPerHour),
        location_type: formData.locationType as 'online' | 'in-person' | 'both',
      };

      const { data, error } = await supabase
        .from('teaching_offers')
        .insert(offerData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Offer created!",
        description: "Your teaching offer has been successfully created.",
      });
      navigate(`/dashboard`);
    } catch (error: any) {
      toast({
        title: "Error creating offer",
        description: error.message || "Failed to create teaching offer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Create Teaching Offer</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Offer Details</CardTitle>
            <CardDescription>
              Share what you want to teach and how others can learn from you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="e.g., Mathematics, Programming, Physics"
                required
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe what you'll teach and your qualifications"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Level *</Label>
                <Select value={formData.level} onValueChange={(value) => handleSelectChange('level', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pointsPerHour">Points per hour *</Label>
                <Input
                  id="pointsPerHour"
                  name="pointsPerHour"
                  type="number"
                  min="1"
                  required
                  value={formData.pointsPerHour}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="locationType">Location Type *</Label>
                <Select value={formData.locationType} onValueChange={(value) => handleSelectChange('locationType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-person</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Offer'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CreateOffer;


import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tables } from '@/integrations/supabase/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Trash2, BookOpen, BookText, GraduationCap, Award } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    schoolUniversity: '',
  });
  
  // New state variables for skills, interests, and history
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState('');
  const [teachingHistory, setTeachingHistory] = useState<any[]>([]);
  const [learningHistory, setLearningHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data);
        setFormData({
          fullName: data.full_name,
          bio: data.bio || '',
          schoolUniversity: data.school_university || '',
        });
        
        // Fetch teaching subjects (skills)
        const { data: teachingData, error: teachingError } = await supabase
          .from('teaching_subjects')
          .select('subject')
          .eq('user_id', user.id);
          
        if (teachingError) throw teachingError;
        setSkills(teachingData.map(item => item.subject));
        
        // Fetch learning subjects (interests)
        const { data: learningData, error: learningError } = await supabase
          .from('learning_subjects')
          .select('subject')
          .eq('user_id', user.id);
          
        if (learningError) throw learningError;
        setInterests(learningData.map(item => item.subject));
        
        // Fetch teaching history
        const { data: teachingHistoryData, error: teachingHistoryError } = await supabase
          .from('sessions')
          .select(`
            id,
            created_at,
            status,
            points_amount,
            teaching_offers (
              subject,
              level
            )
          `)
          .eq('teacher_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (teachingHistoryError) throw teachingHistoryError;
        setTeachingHistory(teachingHistoryData);
        
        // Fetch learning history
        const { data: learningHistoryData, error: learningHistoryError } = await supabase
          .from('sessions')
          .select(`
            id,
            created_at,
            status,
            points_amount,
            teaching_offers (
              subject,
              level
            )
          `)
          .eq('student_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (learningHistoryError) throw learningHistoryError;
        setLearningHistory(learningHistoryData);
        
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile information',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          bio: formData.bio,
          school_university: formData.schoolUniversity,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated',
      });
    } catch (error: any) {
      toast({
        title: 'Update failed',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addSkill = async () => {
    if (!newSkill.trim() || !user) return;
    
    try {
      const { error } = await supabase
        .from('teaching_subjects')
        .insert({
          user_id: user.id,
          subject: newSkill.trim()
        });
        
      if (error) throw error;
      
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      
      toast({
        title: 'Skill added',
        description: 'Your teaching skill has been added successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to add skill',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  
  const removeSkill = async (skill: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('teaching_subjects')
        .delete()
        .eq('user_id', user.id)
        .eq('subject', skill);
        
      if (error) throw error;
      
      setSkills(skills.filter(s => s !== skill));
      
      toast({
        title: 'Skill removed',
        description: 'Your teaching skill has been removed',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to remove skill',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  
  const addInterest = async () => {
    if (!newInterest.trim() || !user) return;
    
    try {
      const { error } = await supabase
        .from('learning_subjects')
        .insert({
          user_id: user.id,
          subject: newInterest.trim()
        });
        
      if (error) throw error;
      
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
      
      toast({
        title: 'Interest added',
        description: 'Your learning interest has been added successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to add interest',
        description: error.message,
        variant: 'destructive'
      });
    }
  };
  
  const removeInterest = async (interest: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('learning_subjects')
        .delete()
        .eq('user_id', user.id)
        .eq('subject', interest);
        
      if (error) throw error;
      
      setInterests(interests.filter(i => i !== interest));
      
      toast({
        title: 'Interest removed',
        description: 'Your learning interest has been removed',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to remove interest',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          {/* Profile Image */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${profile?.full_name || 'User'}&background=random`} />
                <AvatarFallback>{profile?.full_name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <Button variant="outline" disabled>
                Change Picture
              </Button>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details and points balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-semibold">Email:</span> {user?.email}</p>
                <p><span className="font-semibold">Points Balance:</span> {profile?.points}</p>
                <p><span className="font-semibold">Member Since:</span> {new Date(profile?.created_at || '').toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          {/* Basic Information */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schoolUniversity">School/University</Label>
                  <Input
                    id="schoolUniversity"
                    name="schoolUniversity"
                    value={formData.schoolUniversity}
                    onChange={handleChange}
                    placeholder="Where do you study?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us a bit about yourself..."
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>
          </form>

          {/* Teaching Skills */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <BookText className="mr-2 h-5 w-5 text-primary" />
                  Teaching Skills
                </CardTitle>
                <CardDescription>Subjects you can teach to others</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.length === 0 ? (
                  <p className="text-muted-foreground italic">No teaching skills added yet</p>
                ) : (
                  skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                      {skill}
                      <Trash2 
                        className="h-3 w-3 ml-1 cursor-pointer text-muted-foreground hover:text-destructive" 
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))
                )}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a new skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Learning Interests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Learning Interests
              </CardTitle>
              <CardDescription>Subjects you want to learn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {interests.length === 0 ? (
                  <p className="text-muted-foreground italic">No learning interests added yet</p>
                ) : (
                  interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 flex items-center gap-1">
                      {interest}
                      <Trash2 
                        className="h-3 w-3 ml-1 cursor-pointer text-muted-foreground hover:text-destructive" 
                        onClick={() => removeInterest(interest)}
                      />
                    </Badge>
                  ))
                )}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a learning interest"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                />
                <Button type="button" onClick={addInterest} size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Teaching History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                Teaching History
              </CardTitle>
              <CardDescription>Your recent teaching sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {teachingHistory.length === 0 ? (
                <p className="text-muted-foreground italic">No teaching history available</p>
              ) : (
                <div className="space-y-4">
                  {teachingHistory.map((session, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{session.teaching_offers?.subject || 'Unknown Subject'}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">
                              {session.teaching_offers?.level || 'Unknown Level'}
                            </Badge>
                            <Badge variant={
                              session.status === 'completed' ? 'default' :
                              session.status === 'cancelled' ? 'destructive' : 'secondary'
                            }>
                              {session.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">+{session.points_amount} pts</span>
                          <p className="text-xs text-muted-foreground">
                            {new Date(session.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Learning History
              </CardTitle>
              <CardDescription>Your recent learning sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {learningHistory.length === 0 ? (
                <p className="text-muted-foreground italic">No learning history available</p>
              ) : (
                <div className="space-y-4">
                  {learningHistory.map((session, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{session.teaching_offers?.subject || 'Unknown Subject'}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">
                              {session.teaching_offers?.level || 'Unknown Level'}
                            </Badge>
                            <Badge variant={
                              session.status === 'completed' ? 'default' : 
                              session.status === 'cancelled' ? 'destructive' : 'secondary'
                            }>
                              {session.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">-{session.points_amount} pts</span>
                          <p className="text-xs text-muted-foreground">
                            {new Date(session.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;


import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export function useDashboardData() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [teachingOffers, setTeachingOffers] = useState<Tables<'teaching_offers'>[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;

        setIsLoading(true);
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        setProfile(profileData);

        // Fetch teaching offers
        const { data: offerData, error: offerError } = await supabase
          .from('teaching_offers')
          .select('*')
          .eq('teacher_id', user.id)
          .order('created_at', { ascending: false });

        if (offerError) {
          throw offerError;
        }

        setTeachingOffers(offerData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const fetchSessions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('sessions')
      .select(`
        *,
        time_slot:time_slots(*),
        offer:teaching_offers(*),
        teacher:profiles!sessions_teacher_id_fkey(*),
        student:profiles!sessions_student_id_fkey(*)
      `)
      .or(`teacher_id.eq.${user.id},student_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSessions(data);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  return {
    profile,
    teachingOffers,
    sessions,
    isLoading,
    refreshSessions: fetchSessions
  };
}

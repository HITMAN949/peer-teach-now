
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Profile {
  id: string;
  full_name: string;
}

interface ConversationListProps {
  onSelectUser: (userId: string) => void;
}

export function ConversationList({ onSelectUser }: ConversationListProps) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConversations() {
      if (!user) return;

      const { data: messages, error } = await supabase
        .from('messages')
        .select('sender_id, receiver_id, profiles!messages_sender_id_fkey(full_name)')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading conversations:', error);
        return;
      }

      // Get unique users from conversations
      const uniqueUsers = new Map<string, Profile>();
      messages?.forEach((message) => {
        const otherUserId = message.sender_id === user.id ? message.receiver_id : message.sender_id;
        if (!uniqueUsers.has(otherUserId)) {
          uniqueUsers.set(otherUserId, {
            id: otherUserId,
            full_name: message.profiles.full_name,
          });
        }
      });

      setConversations(Array.from(uniqueUsers.values()));
      setLoading(false);
    }

    loadConversations();
  }, [user]);

  if (loading) {
    return <div className="p-4">Loading conversations...</div>;
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-4 space-y-2">
        {conversations.map((profile) => (
          <button
            key={profile.id}
            onClick={() => onSelectUser(profile.id)}
            className="w-full p-3 text-left hover:bg-accent rounded-lg transition-colors"
          >
            {profile.full_name}
          </button>
        ))}
        {conversations.length === 0 && (
          <p className="text-muted-foreground text-sm">No conversations yet</p>
        )}
      </div>
    </ScrollArea>
  );
}


import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { ConversationList } from "@/components/messages/ConversationList";
import { ChatWindow } from "@/components/messages/ChatWindow";

const Messages = () => {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  if (!user) {
    return <div>Please log in to access messages</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
        <div className="border rounded-lg overflow-hidden">
          <ConversationList onSelectUser={setSelectedUserId} />
        </div>
        <div className="md:col-span-2 border rounded-lg">
          <ChatWindow selectedUserId={selectedUserId} />
        </div>
      </div>
    </div>
  );
};

export default Messages;

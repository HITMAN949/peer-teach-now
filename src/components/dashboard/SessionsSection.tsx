
import SessionCard from '@/components/SessionCard';
import { useAuth } from '@/hooks/use-auth';

interface SessionsSectionProps {
  sessions: any[];
  onStatusUpdate: () => void;
}

const SessionsSection = ({ sessions, onStatusUpdate }: SessionsSectionProps) => {
  const { user } = useAuth();

  if (sessions.length === 0) {
    return (
      <p className="text-muted-foreground col-span-full text-center py-8">
        No sessions found. Browse teaching offers to book a session!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          isTeacher={session.teacher_id === user?.id}
          onStatusUpdate={onStatusUpdate}
        />
      ))}
    </div>
  );
};

export default SessionsSection;

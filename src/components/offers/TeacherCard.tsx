
import React from 'react';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TeacherCardProps {
  teacherId: string;
  fullName: string;
  bio: string | null;
  schoolUniversity: string | null;
}

export const TeacherCard = ({ teacherId, fullName, bio, schoolUniversity }: TeacherCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Teacher</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 rounded-full h-16 w-16 flex items-center justify-center">
            <User className="h-8 w-8 text-gray-500" />
          </div>
          <div>
            <h3 className="font-medium">{fullName}</h3>
            {schoolUniversity && (
              <p className="text-sm text-gray-500">{schoolUniversity}</p>
            )}
          </div>
        </div>

        {bio ? (
          <p className="text-sm text-gray-700">{bio}</p>
        ) : (
          <p className="text-sm text-gray-500 italic">No bio provided</p>
        )}
      </CardContent>
    </Card>
  );
};

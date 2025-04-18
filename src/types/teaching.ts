
export type TeachingOffer = {
  id: string;
  subject: string;
  description: string;
  level: string;
  points_per_hour: number;
  location_type: string;
  teacher: {
    id: string;
    full_name: string;
    bio: string | null;
    school_university: string | null;
  };
};

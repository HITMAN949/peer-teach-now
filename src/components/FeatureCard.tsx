
import React from 'react';
import { 
  Users, GraduationCap, Calendar, Shield, 
  Lock, Target, LucideIcon 
} from 'lucide-react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

const FeatureCard = ({ icon, title, description, color = "bg-westudy-500" }: FeatureCardProps) => {
  // Map of icon names to Lucide icon components
  const iconMap: Record<string, LucideIcon> = {
    Users,
    GraduationCap,
    Calendar,
    Shield,
    Lock,
    Target
  };

  // Get the icon component or default to Users if not found
  const IconComponent = iconMap[icon] || Users;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
        <IconComponent size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;


import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
}

const TestimonialCard = ({ quote, name, role, avatarUrl, rating }: TestimonialCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 dark:text-gray-600"}
          />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-6">"{quote}"</p>
      <div className="flex items-center">
        <img 
          src={avatarUrl} 
          alt={name} 
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <div>
          <h4 className="font-medium dark:text-gray-200">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

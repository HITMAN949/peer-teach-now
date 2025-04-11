
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';

const PopularSubjects = () => {
  const navigate = useNavigate();
  
  const subjects = [
    {
      name: "Mathematics",
      icon: "🧮",
      teachers: 245,
      color: "bg-westudy-100 text-westudy-700"
    },
    {
      name: "Computer Science",
      icon: "💻",
      teachers: 189,
      color: "bg-westudy-blue-100 text-westudy-blue-700"
    },
    {
      name: "Physics",
      icon: "⚛️",
      teachers: 167,
      color: "bg-westudy-green-100 text-westudy-green-700"
    },
    {
      name: "Chemistry",
      icon: "🧪",
      teachers: 152,
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "English Literature",
      icon: "📚",
      teachers: 135,
      color: "bg-amber-100 text-amber-700"
    },
    {
      name: "Biology",
      icon: "🧬",
      teachers: 128,
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      name: "History",
      icon: "🏛️",
      teachers: 117,
      color: "bg-red-100 text-red-700"
    },
    {
      name: "Languages",
      icon: "🗣️",
      teachers: 110,
      color: "bg-blue-100 text-blue-700"
    }
  ];

  const handleSubjectClick = (subject: string) => {
    navigate(`/offers/browse?search=${encodeURIComponent(subject)}`);
  };

  const handleViewAllSubjects = () => {
    navigate('/offers/browse');
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Subjects</h2>
            <p className="text-lg text-gray-600">Find tutors for the most in-demand subjects</p>
          </div>
          <Button 
            variant="ghost" 
            className="hidden md:flex items-center text-westudy-600 hover:text-westudy-700"
            onClick={handleViewAllSubjects}
          >
            View all subjects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject, index) => (
            <div
              key={index}
              onClick={() => handleSubjectClick(subject.name)}
              className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full ${subject.color} flex items-center justify-center text-2xl`}>
                  {subject.icon}
                </div>
                <div>
                  <h3 className="font-medium">{subject.name}</h3>
                  <p className="text-sm text-gray-500">{subject.teachers} teachers</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button 
            variant="outline" 
            className="border-westudy-200 text-westudy-600"
            onClick={handleViewAllSubjects}
          >
            View all subjects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularSubjects;

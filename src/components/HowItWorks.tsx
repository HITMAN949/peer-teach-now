
import React from 'react';
import { Search, Calendar, Book, DollarSign } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-10 h-10 text-westudy-500" />,
      title: "Find a Teacher",
      description: "Search for tutors based on subject, availability, and ratings."
    },
    {
      icon: <Calendar className="w-10 h-10 text-westudy-500" />,
      title: "Book a Session",
      description: "Choose a time that works for you and book a one-on-one session."
    },
    {
      icon: <Book className="w-10 h-10 text-westudy-500" />,
      title: "Learn & Improve",
      description: "Join the session and learn directly from your peer tutor."
    },
    {
      icon: <DollarSign className="w-10 h-10 text-westudy-500" />,
      title: "Pay with Points",
      description: "Use points to pay for lessons, or earn points by teaching others."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How WeStudy Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to connect with other students for peer-to-peer learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl p-6 shadow-md h-full">
                <div className="mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import PopularSubjects from '@/components/PopularSubjects';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import Footer from '@/components/Footer';
import { BookOpen, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Learn From Peers",
      description: "Get help from students who excel at the subjects you're struggling with.",
      color: "bg-westudy-500"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book sessions when it's convenient for you - evenings, weekends, or between classes.",
      color: "bg-westudy-green-500"
    },
    {
      icon: DollarSign,
      title: "Affordable Points System",
      description: "Pay with points and earn them back by teaching others what you know.",
      color: "bg-westudy-blue-500"
    },
    {
      icon: Users,
      title: "Verified Community",
      description: "Connect with students from your school or universities worldwide.",
      color: "bg-purple-500"
    }
  ];

  const testimonials = [
    {
      quote: "WeStudy helped me ace my Calculus final. My tutor explained concepts way better than my professor!",
      name: "Alex Johnson",
      role: "Computer Science Student",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      quote: "I started teaching Spanish on WeStudy and not only earned points, but also improved my own language skills.",
      name: "Maria Garcia",
      role: "Languages Student",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      quote: "Finding study partners was always difficult until I discovered WeStudy. Now I have a whole network!",
      name: "James Wilson",
      role: "Biology Student",
      avatarUrl: "https://randomuser.me/api/portraits/men/62.jpg",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection />

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose WeStudy?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique advantages for students who want to learn and earn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <PopularSubjects />

      {/* Stats Section */}
      <section className="py-16 bg-westudy-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">10k+</p>
              <p className="text-lg">Students</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">2.5k+</p>
              <p className="text-lg">Teachers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">25k+</p>
              <p className="text-lg">Sessions</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">4.8</p>
              <p className="text-lg">Avg. Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from students who have used WeStudy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                avatarUrl={testimonial.avatarUrl}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-westudy-500 to-westudy-600 rounded-2xl p-8 md:p-12 shadow-lg text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students already using WeStudy to connect, learn, and succeed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-westudy-600 hover:bg-gray-100 text-lg py-6 px-8">
                Find a Teacher
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-westudy-700 text-lg py-6 px-8">
                Become a Teacher
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

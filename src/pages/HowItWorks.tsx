
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HowItWorksComponent from '@/components/HowItWorks';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-westudy-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How WeStudy Works</h1>
            <p className="text-lg text-gray-600 mb-8">
              Our platform makes peer-to-peer learning simple, affordable and effective. 
              Connect with fellow students to learn what you need or teach what you know.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offers/browse">
                <Button className="bg-westudy-500 hover:bg-westudy-600 text-white">
                  Find a Teacher
                </Button>
              </Link>
              <Link to="/offers/create">
                <Button variant="outline" className="border-westudy-300 text-westudy-700 hover:bg-westudy-50">
                  Become a Teacher
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main How It Works Explanation */}
      <HowItWorksComponent />
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to the most common questions about our platform
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y">
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-2">How do I earn points?</h3>
              <p className="text-gray-600">
                You can earn points by teaching other students subjects you're good at. 
                Each hour of teaching earns you points based on your set rate.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-2">How do I spend points?</h3>
              <p className="text-gray-600">
                Use your earned points to book sessions with other tutors on the platform.
                The points are deducted from your account when you book a session.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-2">What subjects can I teach or learn?</h3>
              <p className="text-gray-600">
                WeStudy supports a wide range of academic subjects from mathematics and sciences 
                to languages, humanities, and more. If you know it, you can teach it!
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-2">Do I need to be a student to use WeStudy?</h3>
              <p className="text-gray-600">
                While our platform is designed primarily for students, anyone with knowledge to share 
                or a desire to learn can join our community.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-westudy-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/offers/browse">
              <Button className="bg-westudy-500 hover:bg-westudy-600 text-white">
                Find a Teacher
              </Button>
            </Link>
            <Link to="/offers/create">
              <Button variant="outline" className="border-westudy-300 text-westudy-700 hover:bg-westudy-50">
                Become a Teacher
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;

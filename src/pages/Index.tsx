
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import PopularSubjects from '@/components/PopularSubjects';
import HowItWorks from '@/components/HowItWorks';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import AdminControls from '@/components/AdminControls';
import { useAuth } from '@/hooks/use-auth';

const Index = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [showAdminControls, setShowAdminControls] = useState(false);
  
  // Update document title
  useEffect(() => {
    document.title = 'WeStudy - Peer-to-Peer Learning Platform';
  }, []);

  return (
    <div className="min-h-screen flex flex-col antialiased transition-colors duration-300">
      <Navigation />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Database Seeding - Always visible in development */}
        {process.env.NODE_ENV !== 'production' && (
          <section className="py-8 bg-red-50 dark:bg-red-900/20 border-y border-red-200 dark:border-red-800/30">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-400">Developer Tools</h3>
              <p className="mb-4 text-red-600 dark:text-red-300">Click the button below to load test data into the database.</p>
              <AdminControls />
            </div>
          </section>
        )}
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">How WeStudy Works</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Our platform makes it easy to connect with peers for learning</p>
            </div>
            <HowItWorks />
          </div>
        </section>
        
        {/* Popular Subjects */}
        <section className="py-16 md:py-24 transition-colors">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Popular Subjects</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Browse our most sought-after learning categories</p>
            </div>
            <PopularSubjects />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Why Choose WeStudy</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Discover the benefits of our peer-to-peer learning platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                title="Learn from Peers" 
                description="Connect with students who have mastered the subjects you want to learn."
                icon="Users"
                color="bg-westudy-500 dark:bg-westudy-600"
              />
              <FeatureCard 
                title="Earn While Teaching" 
                description="Share your knowledge and earn points that you can use for your own learning."
                icon="GraduationCap"
                color="bg-westudy-blue-500 dark:bg-westudy-blue-600"
              />
              <FeatureCard 
                title="Flexible Scheduling" 
                description="Set your own availability and learn at times that work for you."
                icon="Calendar"
                color="bg-westudy-green-500 dark:bg-westudy-green-600"
              />
              <FeatureCard 
                title="Verified Profiles" 
                description="We verify all teachers to ensure quality learning experiences."
                icon="Shield"
                color="bg-westudy-purple-500 dark:bg-westudy-purple-600"
              />
              <FeatureCard 
                title="Secure Payments" 
                description="Our points system makes transactions simple and secure."
                icon="Lock"
                color="bg-westudy-yellow-500 dark:bg-westudy-yellow-600"
              />
              <FeatureCard 
                title="Personalized Learning" 
                description="Find teachers who match your learning style and pace."
                icon="Target"
                color="bg-westudy-red-500 dark:bg-westudy-red-600"
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 md:py-24 transition-colors">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Student Stories</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Hear what our community has to say about WeStudy</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard 
                quote="I was struggling with calculus until I found a peer tutor on WeStudy. Now I'm acing my exams!"
                name="Mia Chen"
                role="Computer Science Student"
                avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                rating={5}
              />
              <TestimonialCard 
                quote="Teaching on WeStudy has been amazing. I've helped fellow students while earning points for my own learning needs."
                name="James Wilson"
                role="Physics Major"
                avatarUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                rating={4}
              />
              <TestimonialCard 
                quote="The flexibility of scheduling sessions around my busy timetable has been a game changer for my studies."
                name="Sophia Rodriguez"
                role="Pre-Med Student"
                avatarUrl="https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                rating={5}
              />
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="py-16 md:py-20 bg-gray-100 dark:bg-gray-800 transition-colors">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-westudy-600 dark:text-westudy-400 mb-2">5,000+</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Active Students</p>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-westudy-600 dark:text-westudy-400 mb-2">1,200+</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Peer Teachers</p>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-westudy-600 dark:text-westudy-400 mb-2">25,000+</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Sessions Completed</p>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-westudy-600 dark:text-westudy-400 mb-2">15+</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Subject Categories</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Only show if not logged in */}
        {!user && (
          <section className="py-16 md:py-24 bg-westudy-50 dark:bg-gray-900 transition-colors">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Ready to Transform Your Learning Experience?</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Join our community of students teaching and learning from each other.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/auth?tab=signup">
                    <Button className="text-lg py-6 px-8 bg-westudy-500 hover:bg-westudy-600 dark:bg-westudy-600 dark:hover:bg-westudy-700">
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link to="/how-it-works">
                    <Button variant="outline" className="text-lg py-6 px-8 border-westudy-300 text-westudy-700 dark:border-westudy-700 dark:text-westudy-300">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

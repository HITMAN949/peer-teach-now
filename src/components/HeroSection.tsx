
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/offers/browse?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-westudy-50 via-white to-westudy-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Learn from peers.<br />
              <span className="text-westudy-600 dark:text-westudy-400">Teach what you know.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              WeStudy connects students for peer-to-peer learning. Find the perfect tutor or share your knowledge and earn points.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/offers/browse">
                <Button className="bg-westudy-500 hover:bg-westudy-600 dark:bg-westudy-600 dark:hover:bg-westudy-700 text-white py-6 px-8 text-lg">
                  Find a Teacher
                </Button>
              </Link>
              <Link to="/offers/create">
                <Button variant="outline" className="border-westudy-300 text-westudy-700 dark:border-westudy-700 dark:text-westudy-300 hover:bg-westudy-50 dark:hover:bg-gray-800 py-6 px-8 text-lg">
                  Become a Teacher
                </Button>
              </Link>
            </div>

            <form onSubmit={handleSearch} className="mt-12 flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md max-w-md">
              <div className="pl-4">
                <Search size={20} className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full py-3 px-4 rounded-full focus:outline-none bg-transparent dark:text-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-westudy-500 hover:bg-westudy-600 dark:bg-westudy-600 dark:hover:bg-westudy-700 text-white font-medium px-6 py-3 rounded-full transition-colors"
              >
                Search
              </button>
            </form>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-westudy-200 dark:bg-westudy-900/50 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float"></div>
              <div className="absolute -bottom-8 right-4 w-72 h-72 bg-westudy-blue-200 dark:bg-blue-900/40 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float animation-delay-2000"></div>
              <div className="absolute -top-4 right-20 w-72 h-72 bg-westudy-green-200 dark:bg-green-900/40 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float animation-delay-4000"></div>
              <div className="relative">
                <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-2 md:p-4 relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="Students studying together"
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-20">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-3">
                      <div className="w-8 h-8 rounded-full bg-westudy-400 text-white flex items-center justify-center text-xs font-bold">JD</div>
                      <div className="w-8 h-8 rounded-full bg-westudy-green-400 text-white flex items-center justify-center text-xs font-bold">KL</div>
                      <div className="w-8 h-8 rounded-full bg-westudy-blue-400 text-white flex items-center justify-center text-xs font-bold">AM</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium dark:text-gray-200">300+ students</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">joined this week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

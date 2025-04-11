
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 bg-white shadow-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-westudy-600">We<span className="text-westudy-800">Study</span></span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-westudy-600 transition-colors">
              <span>Find Teachers</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-westudy-50 hover:text-westudy-600">By Subject</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-westudy-50 hover:text-westudy-600">By Location</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-westudy-50 hover:text-westudy-600">By Availability</a>
              </div>
            </div>
          </div>
          <a href="#" className="text-gray-700 hover:text-westudy-600 transition-colors">Become a Teacher</a>
          <a href="#" className="text-gray-700 hover:text-westudy-600 transition-colors">How It Works</a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-westudy-200 text-westudy-600 hover:bg-westudy-50">Log In</Button>
          <Button className="bg-westudy-500 hover:bg-westudy-600 text-white">Sign Up</Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-50 bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="pt-2 pb-4">
              <p className="px-4 text-sm font-medium text-gray-500">Find Teachers</p>
              <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-westudy-50 hover:text-westudy-600">By Subject</a>
              <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-westudy-50 hover:text-westudy-600">By Location</a>
              <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-westudy-50 hover:text-westudy-600">By Availability</a>
            </div>
            <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-westudy-50 hover:text-westudy-600">Become a Teacher</a>
            <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-westudy-50 hover:text-westudy-600">How It Works</a>
            <div className="pt-4 flex flex-col space-y-2 px-4">
              <Button variant="outline" className="w-full justify-center border-westudy-200 text-westudy-600 hover:bg-westudy-50">Log In</Button>
              <Button className="w-full justify-center bg-westudy-500 hover:bg-westudy-600 text-white">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

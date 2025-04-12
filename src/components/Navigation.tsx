
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from './ThemeToggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full py-4 bg-background border-b border-border shadow-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-westudy-600 dark:text-westudy-400">We<span className="text-westudy-800 dark:text-westudy-300">Study</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="relative group">
            <button className="flex items-center space-x-1 text-foreground hover:text-westudy-600 dark:hover:text-westudy-400 transition-colors">
              <span>Find Teachers</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <Link to="/offers/browse" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground">By Subject</Link>
                <Link to="/offers/browse?filter=location" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground">By Location</Link>
                <Link to="/offers/browse?filter=availability" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground">By Availability</Link>
              </div>
            </div>
          </div>
          <Link to="/offers/create" className="text-foreground hover:text-westudy-600 dark:hover:text-westudy-400 transition-colors">Become a Teacher</Link>
          <Link to="/how-it-works" className="text-foreground hover:text-westudy-600 dark:hover:text-westudy-400 transition-colors">How It Works</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" className="border-muted text-foreground hover:bg-accent">
                  <User size={18} className="mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" className="border-muted text-foreground hover:bg-accent">Log Out</Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" className="border-muted text-foreground hover:bg-accent">Log In</Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button className="bg-westudy-500 hover:bg-westudy-600 dark:bg-westudy-600 dark:hover:bg-westudy-700 text-white">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-50 bg-background border-b border-border shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="pt-2 pb-4">
              <p className="px-4 text-sm font-medium text-muted-foreground">Find Teachers</p>
              <Link to="/offers/browse" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-base text-foreground hover:bg-accent hover:text-accent-foreground">By Subject</Link>
              <Link to="/offers/browse?filter=location" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-base text-foreground hover:bg-accent hover:text-accent-foreground">By Location</Link>
              <Link to="/offers/browse?filter=availability" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-base text-foreground hover:bg-accent hover:text-accent-foreground">By Availability</Link>
            </div>
            <Link to="/offers/create" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-base text-foreground hover:bg-accent hover:text-accent-foreground">Become a Teacher</Link>
            <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-base text-foreground hover:bg-accent hover:text-accent-foreground">How It Works</Link>
            <div className="pt-4 flex flex-col space-y-2 px-4">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center border-muted text-foreground hover:bg-accent">
                      <User size={18} className="mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="outline" className="w-full justify-center border-muted text-foreground hover:bg-accent">Log Out</Button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center border-muted text-foreground hover:bg-accent">Log In</Button>
                  </Link>
                  <Link to="/auth?tab=signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-center bg-westudy-500 hover:bg-westudy-600 dark:bg-westudy-600 dark:hover:bg-westudy-700 text-white">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

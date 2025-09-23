import { Button } from "@/components/ui/button";
import { Search, User, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">CrewFinder</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/explore">
              <Button 
                variant={isActive("/explore") ? "default" : "ghost"} 
                className="font-medium"
              >
                <Search size={16} />
                Explore
              </Button>
            </Link>
            <Link to="/my-groups">
              <Button 
                variant={isActive("/my-groups") ? "default" : "ghost"} 
                className="font-medium"
              >
                My Groups
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <MapPin size={18} />
            </Button>
            <Button variant="outline">
              <User size={16} />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
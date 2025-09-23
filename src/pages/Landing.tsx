import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InterestTag } from "@/components/ui/interest-tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, ArrowRight, Users, Search, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-community.jpg";

const INTEREST_CATEGORIES = [
  "Outdoors", "Fitness", "Tech", "Arts", "Music", "Food", 
  "Language", "Faith", "Volunteering", "Entrepreneurship", 
  "Board Games", "Photography", "Reading", "Cooking"
];

const POPULAR_CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX",
  "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA"
];

export default function Landing() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customCity, setCustomCity] = useState("");
  const navigate = useNavigate();

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGetStarted = () => {
    if (selectedCity && selectedInterests.length > 0) {
      navigate("/explore", { 
        state: { 
          city: selectedCity, 
          interests: selectedInterests 
        }
      });
    }
  };

  const isComplete = selectedCity && selectedInterests.length > 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Hero Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero/90" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Find Your
            <span className="block bg-gradient-accent bg-clip-text text-transparent">
              Perfect Crew
            </span>
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Discover amazing local clubs, recurring meetups, and communities for young adults. 
            Make real connections in your city.
          </p>
          
          <div className="flex items-center justify-center gap-6 text-primary-foreground/80 text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>10,000+ Groups</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>50+ Cities</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Weekly Meetups</span>
            </div>
          </div>
        </div>

        {/* Onboarding Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* City Selection */}
          <Card className="bg-card/95 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                Choose Your City
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {POPULAR_CITIES.map((city) => (
                  <Button
                    key={city}
                    variant={selectedCity === city ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCity(city)}
                    className="text-left justify-start"
                  >
                    {city}
                  </Button>
                ))}
              </div>
              
              <div className="pt-2">
                <Input
                  placeholder="Or type your city..."
                  value={customCity}
                  onChange={(e) => {
                    setCustomCity(e.target.value);
                    setSelectedCity(e.target.value);
                  }}
                  className="bg-background/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Interest Selection */}
          <Card className="bg-card/95 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Search className="w-5 h-5 text-primary" />
                Pick Your Interests
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Select at least 3 to get personalized recommendations
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {INTEREST_CATEGORIES.map((interest) => (
                  <InterestTag
                    key={interest}
                    label={interest}
                    selected={selectedInterests.includes(interest)}
                    onClick={() => toggleInterest(interest)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Get Started Button */}
        <div className="text-center">
          <Button
            variant="hero"
            size="xl"
            onClick={handleGetStarted}
            disabled={!isComplete}
            className="px-12"
          >
            Find My Crews
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          {!isComplete && (
            <p className="text-primary-foreground/70 text-sm mt-3">
              Select a city and interests to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
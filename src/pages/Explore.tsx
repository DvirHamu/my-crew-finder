import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { GroupCard } from "@/components/ui/group-card";
import { InterestTag } from "@/components/ui/interest-tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, MapPin, Clock, DollarSign } from "lucide-react";
import { useLocation } from "react-router-dom";

// Mock data - in real app this would come from Supabase
const MOCK_GROUPS = [
  {
    id: "1",
    name: "SF Hiking Adventures",
    description: "Explore beautiful trails around the Bay Area every Saturday. All fitness levels welcome!",
    tags: ["Outdoors", "Fitness"],
    location: "Various trails, SF Bay Area", 
    schedule: "Saturdays 9:00 AM",
    memberCount: 127,
    nextMeeting: "Jan 27",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "2", 
    name: "Tech Startup Founders",
    description: "Monthly meetup for aspiring and current startup founders. Share experiences, network, and learn.",
    tags: ["Tech", "Entrepreneurship"],
    location: "WeWork SOMA, San Francisco",
    schedule: "First Thursday 7:00 PM", 
    memberCount: 89,
    nextMeeting: "Feb 1",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "3",
    name: "Photography Walks",
    description: "Capture the beauty of the city together. Bring your camera and explore new neighborhoods.",
    tags: ["Photography", "Arts"],
    location: "Mission District, SF",
    schedule: "Sundays 2:00 PM",
    memberCount: 64,
    nextMeeting: "Jan 28", 
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "4",
    name: "Board Game Night",
    description: "Weekly board game sessions at local cafes. From classics to modern strategy games.",
    tags: ["Board Games"],
    location: "Mission Cliffs Cafe",
    schedule: "Wednesdays 7:30 PM",
    memberCount: 42,
    nextMeeting: "Jan 31",
    isFree: false,
    isBeginnerFriendly: true
  }
];

const INTEREST_FILTERS = [
  "All", "Outdoors", "Fitness", "Tech", "Arts", "Music", "Food", 
  "Board Games", "Photography", "Entrepreneurship"
];

export default function Explore() {
  const location = useLocation();
  const { city, interests } = location.state || { city: "San Francisco, CA", interests: [] };
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(interests || []);
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleInterest = (interest: string) => {
    if (interest === "All") {
      setSelectedInterests([]);
      return;
    }
    
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Filter groups based on search and interests
  const filteredGroups = MOCK_GROUPS.filter(group => {
    const matchesSearch = !searchQuery || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesInterests = selectedInterests.length === 0 ||
      selectedInterests.some(interest => group.tags.includes(interest));
      
    return matchesSearch && matchesInterests;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <MapPin size={14} />
            <span>{city}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Discover Local Groups
          </h1>
          <p className="text-muted-foreground mt-1">
            Found {filteredGroups.length} groups matching your interests
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search groups, activities, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6"
              >
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            {/* Interest Tags */}
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground mb-3">Filter by Interest</p>
              <div className="flex flex-wrap gap-2">
                {INTEREST_FILTERS.map((interest) => (
                  <InterestTag
                    key={interest}
                    label={interest}
                    selected={interest === "All" ? selectedInterests.length === 0 : selectedInterests.includes(interest)}
                    onClick={() => toggleInterest(interest)}
                  />
                ))}
              </div>
            </div>

            {/* Additional Filters (collapsible) */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Day of Week</p>
                    <div className="flex flex-wrap gap-2">
                      {["Weekdays", "Weekends", "Monday", "Saturday"].map((day) => (
                        <InterestTag key={day} label={day} />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Time</p>
                    <div className="flex flex-wrap gap-2">
                      {["Morning", "Afternoon", "Evening"].map((time) => (
                        <InterestTag key={time} label={time} />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Cost</p>
                    <div className="flex flex-wrap gap-2">
                      {["Free", "Paid", "Under $20"].map((cost) => (
                        <InterestTag key={cost} label={cost} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard key={group.id} {...group} />
          ))}
        </div>
        
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No groups found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
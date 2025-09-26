import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { GroupCard } from "@/components/ui/group-card";
import { InterestTag } from "@/components/ui/interest-tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, MapPin, Clock, DollarSign } from "lucide-react";
import { useLocation } from "react-router-dom";

// Mock volunteer opportunities - in real app this would come from Supabase
const MOCK_GROUPS = [
  {
    id: "1",
    name: "Park Cleanup Heroes",
    description: "Join us every Saturday to clean and beautify our local parks. Help create green spaces for everyone to enjoy!",
    tags: ["Environment", "Community Building"],
    location: "Golden Gate Park, SF", 
    schedule: "Saturdays 9:00 AM",
    memberCount: 127,
    nextMeeting: "Jan 27",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "2", 
    name: "Animal Shelter Support",
    description: "Help care for rescue animals at the local shelter. Walk dogs, socialize cats, and assist with adoption events.",
    tags: ["Animals", "Healthcare"],
    location: "SF SPCA, San Francisco",
    schedule: "First Thursday 7:00 PM", 
    memberCount: 89,
    nextMeeting: "Feb 1",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "3",
    name: "Youth Art Mentoring",
    description: "Mentor young artists in after-school programs. Share your creativity and inspire the next generation.",
    tags: ["Arts & Culture", "Youth Mentoring"],
    location: "Community Arts Center, SF",
    schedule: "Sundays 2:00 PM",
    memberCount: 64,
    nextMeeting: "Jan 28", 
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "4",
    name: "Senior Gaming Companions",
    description: "Bring joy to elderly residents through board games and card games. Combat loneliness with fun!",
    tags: ["Elderly Care", "Community Building"],
    location: "Sunset Manor Care Home",
    schedule: "Wednesdays 7:30 PM",
    memberCount: 42,
    nextMeeting: "Jan 31",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "5",
    name: "Food Bank Distribution",
    description: "Help pack and distribute food to families in need. Make a direct impact on food insecurity.",
    tags: ["Food Security", "Community Building"],
    location: "SF Food Bank",
    schedule: "Second Saturday 6:00 PM",
    memberCount: 78,
    nextMeeting: "Feb 10",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "6",
    name: "Homeless Outreach Team",
    description: "Distribute meals, supplies, and connect homeless individuals with resources and support services.",
    tags: ["Homeless Support", "Social Justice"],
    location: "Tenderloin District",
    schedule: "Tuesdays 7:00 PM",
    memberCount: 35,
    nextMeeting: "Jan 30",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "7",
    name: "Beach Cleanup Warriors",
    description: "Protect our coastline by removing plastic and debris. Help preserve marine ecosystems.",
    tags: ["Environment", "Community Building"],
    location: "Ocean Beach, SF",
    schedule: "Saturdays 10:00 AM",
    memberCount: 52,
    nextMeeting: "Jan 27",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "8",
    name: "Hospital Reading Volunteers",
    description: "Bring comfort to patients by reading stories and providing companionship during recovery.",
    tags: ["Healthcare", "Elderly Care"],
    location: "UCSF Medical Center",
    schedule: "Mon/Wed/Fri 6:30 PM",
    memberCount: 24,
    nextMeeting: "Jan 29",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "9",
    name: "Coding for Nonprofits",
    description: "Use your tech skills to build websites and apps for local nonprofits and social causes.",
    tags: ["Tech for Good", "Education"],
    location: "Code for SF Meetup",
    schedule: "First Friday 8:00 PM",
    memberCount: 67,
    nextMeeting: "Feb 2",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "10",
    name: "Community Garden Collective",
    description: "Grow fresh produce for local food banks while learning sustainable gardening practices.",
    tags: ["Environment", "Food Security"],
    location: "Alemany Farm",
    schedule: "Saturdays 9:00 AM",
    memberCount: 43,
    nextMeeting: "Jan 27",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "11",
    name: "Disaster Relief Training",
    description: "Get certified in emergency response and help communities prepare for and recover from disasters.",
    tags: ["Disaster Relief", "Community Building"],
    location: "Red Cross Training Center",
    schedule: "Third Thursday 6:00 PM",
    memberCount: 156,
    nextMeeting: "Feb 15",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "12",
    name: "Adult Literacy Tutors",
    description: "Help adults improve their reading and writing skills. Make education accessible for everyone.",
    tags: ["Education", "Social Justice"],
    location: "Public Library Branch",
    schedule: "Last Sunday 3:00 PM",
    memberCount: 28,
    nextMeeting: "Jan 28",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "13",
    name: "Community Sports Coaches",
    description: "Coach youth sports teams and teach kids the value of teamwork and healthy living.",
    tags: ["Sports & Recreation", "Youth Mentoring"],
    location: "Local Recreation Center",
    schedule: "Sundays 11:00 AM",
    memberCount: 85,
    nextMeeting: "Jan 28",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "14",
    name: "Refugee Resettlement Support",
    description: "Welcome new Americans by helping with housing, job searches, and cultural integration.",
    tags: ["Social Justice", "Community Building"],
    location: "International Rescue Committee",
    schedule: "Saturdays 2:00 PM",
    memberCount: 36,
    nextMeeting: "Feb 3",
    isFree: true,
    isBeginnerFriendly: true
  },
  {
    id: "15",
    name: "Veterans Support Network",
    description: "Provide companionship and assistance to veterans in need. Honor those who served.",
    tags: ["Healthcare", "Community Building"],
    location: "VA Medical Center",
    schedule: "Thursdays 8:00 PM",
    memberCount: 41,
    nextMeeting: "Feb 1",
    isFree: true,
    isBeginnerFriendly: true
  }
];

const CAUSE_FILTERS = [
  "All", "Environment", "Animals", "Education", "Healthcare", "Elderly Care", "Homeless Support", 
  "Food Security", "Community Building", "Youth Mentoring", "Disaster Relief", "Arts & Culture", 
  "Sports & Recreation", "Tech for Good", "Social Justice"
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
            Volunteer Opportunities
          </h1>
          <p className="text-muted-foreground mt-1">
            Found {filteredGroups.length} volunteer opportunities matching your causes
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search volunteer opportunities, causes, or keywords..."
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
              <p className="text-sm font-medium text-foreground mb-3">Filter by Cause</p>
              <div className="flex flex-wrap gap-2">
                {CAUSE_FILTERS.map((interest) => (
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
            <p className="text-muted-foreground text-lg">No volunteer opportunities found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
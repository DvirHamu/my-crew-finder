import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InterestTag } from "@/components/ui/interest-tag";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MapPin, Clock, Users, Calendar, Check, ArrowLeft, 
  Star, MessageCircle, Share, ExternalLink 
} from "lucide-react";
import { useGroups } from "@/contexts/GroupContext";
import { toast } from "@/hooks/use-toast";

// Mock data - in real app this would come from Supabase
const MOCK_GROUP_DATA: Record<string, any> = {
  "1": {
    id: "1",
    name: "SF Hiking Adventures",
    description: "Explore beautiful trails around the Bay Area every Saturday. All fitness levels welcome! We've been building a community of outdoor enthusiasts since 2022, focusing on both fitness and friendship. Our hikes range from easy coastal walks to challenging mountain trails.",
    longDescription: "Join us for weekly adventures exploring the stunning natural beauty around San Francisco. Whether you're a seasoned hiker or just starting out, our group welcomes everyone. We believe hiking is about more than just exercise - it's about connecting with nature, meeting new people, and building lasting friendships. Each hike is led by experienced members who know the trails well and prioritize safety.",
    tags: ["Outdoors", "Fitness"],
    location: "Various trails, SF Bay Area",
    schedule: "Saturdays 9:00 AM",
    memberCount: 127,
    nextMeeting: "Jan 27",
    isFree: true,
    isBeginnerFriendly: true,
    organizer: {
      name: "Sarah Chen",
      role: "Hiking Guide & Organizer",
      memberSince: "2022"
    },
    rating: 4.8,
    totalEvents: 52,
    upcomingEvents: [
      {
        id: "e1",
        title: "Mount Tamalpais Easy Trail",
        date: "Jan 27, 2024",
        time: "9:00 AM - 1:00 PM",
        location: "Mount Tamalpais State Park",
        difficulty: "Easy",
        attendees: 24,
        maxAttendees: 30,
        rsvpStatus: null
      },
      {
        id: "e2", 
        title: "Muir Woods & Beach Combo",
        date: "Feb 3, 2024",
        time: "8:30 AM - 3:00 PM", 
        location: "Muir Woods National Monument",
        difficulty: "Moderate",
        attendees: 18,
        maxAttendees: 25,
        rsvpStatus: null
      },
      {
        id: "e3",
        title: "Twin Peaks Sunset Hike",
        date: "Feb 10, 2024",
        time: "5:30 PM - 7:30 PM",
        location: "Twin Peaks, SF",
        difficulty: "Easy",
        attendees: 31,
        maxAttendees: 35,
        rsvpStatus: null
      }
    ],
    recentMembers: [
      { name: "Alex M.", joined: "2 days ago" },
      { name: "Jessica R.", joined: "1 week ago" },
      { name: "Mike T.", joined: "2 weeks ago" },
      { name: "Emma L.", joined: "3 weeks ago" },
      { name: "David K.", joined: "1 month ago" }
    ],
    photos: [],
    rules: [
      "Come prepared with water, snacks, and appropriate footwear",
      "Respect nature - leave no trace",
      "Stay with the group and follow the hike leader's instructions",
      "Let us know if you need to cancel at least 2 hours before the hike",
      "Be kind and welcoming to new members"
    ]
  },
  "2": {
    id: "2",
    name: "Tech Startup Founders",
    description: "Monthly meetup for aspiring and current startup founders. Share experiences, network, and learn.",
    longDescription: "Connect with like-minded entrepreneurs in San Francisco's thriving startup ecosystem. Whether you're in the ideation phase, building your MVP, or scaling your company, our community provides valuable insights, networking opportunities, and peer support. We host monthly meetups featuring successful founders, VCs, and industry experts.",
    tags: ["Tech", "Entrepreneurship"],
    location: "WeWork SOMA, San Francisco",
    schedule: "First Thursday 7:00 PM",
    memberCount: 89,
    nextMeeting: "Feb 1",
    isFree: true,
    isBeginnerFriendly: true,
    organizer: {
      name: "Marcus Rodriguez",
      role: "Serial Entrepreneur & Founder",
      memberSince: "2021"
    },
    rating: 4.9,
    totalEvents: 38,
    upcomingEvents: [
      {
        id: "e4",
        title: "Pitch Night: Get Feedback on Your Idea",
        date: "Feb 1, 2024",
        time: "7:00 PM - 9:30 PM",
        location: "WeWork SOMA",
        difficulty: "All levels",
        attendees: 32,
        maxAttendees: 50,
        rsvpStatus: null
      },
      {
        id: "e5",
        title: "Fundraising 101: From Seed to Series A",
        date: "Mar 7, 2024", 
        time: "7:00 PM - 9:00 PM",
        location: "WeWork SOMA",
        difficulty: "Intermediate",
        attendees: 28,
        maxAttendees: 40,
        rsvpStatus: null
      }
    ],
    recentMembers: [
      { name: "Jennifer K.", joined: "1 day ago" },
      { name: "Ryan P.", joined: "3 days ago" },
      { name: "Lisa W.", joined: "1 week ago" },
      { name: "Carlos M.", joined: "2 weeks ago" }
    ],
    photos: [],
    rules: [
      "Respect everyone's ideas and feedback",
      "No direct selling or pitching unless it's pitch night",
      "Share knowledge generously and ask for help when needed",
      "Follow up on connections made during meetups",
      "Keep discussions focused on entrepreneurship and startups"
    ]
  },
  "4": {
    id: "4",
    name: "Board Game Night",
    description: "Weekly board game sessions at local cafes. From classics to modern strategy games.",
    longDescription: "Discover the joy of tabletop gaming in a friendly, welcoming environment. Every Wednesday, we gather to play everything from classic games like Settlers of Catan to the latest indie releases. Whether you're a seasoned strategist or completely new to modern board games, you'll find something fun to play and people to enjoy it with.",
    tags: ["Board Games"],
    location: "Mission Cliffs Cafe",
    schedule: "Wednesdays 7:30 PM",
    memberCount: 42,
    nextMeeting: "Jan 31",
    isFree: false,
    isBeginnerFriendly: true,
    organizer: {
      name: "Amy Chen",
      role: "Board Game Enthusiast", 
      memberSince: "2023"
    },
    rating: 4.7,
    totalEvents: 24,
    upcomingEvents: [
      {
        id: "e6",
        title: "Strategy Game Night",
        date: "Jan 31, 2024",
        time: "7:30 PM - 10:30 PM",
        location: "Mission Cliffs Cafe",
        difficulty: "All levels", 
        attendees: 16,
        maxAttendees: 20,
        rsvpStatus: null
      },
      {
        id: "e7",
        title: "Cooperative Games Evening",
        date: "Feb 7, 2024",
        time: "7:30 PM - 10:30 PM",
        location: "Mission Cliffs Cafe", 
        difficulty: "Beginner friendly",
        attendees: 14,
        maxAttendees: 18,
        rsvpStatus: null
      }
    ],
    recentMembers: [
      { name: "Tom H.", joined: "4 days ago" },
      { name: "Maria S.", joined: "1 week ago" },
      { name: "Jake L.", joined: "2 weeks ago" }
    ],
    photos: [],
    rules: [
      "Games are provided, but feel free to bring your own favorites",
      "Be patient with new players learning rules",
      "Keep drinks and snacks away from game components", 
      "Help clean up after games",
      "Everyone should get a chance to play different games"
    ]
  }
};

export default function GroupProfile() {
  const { groupId } = useParams();
  const { joinGroup, leaveGroup, isGroupJoined } = useGroups();
  const [rsvpStatuses, setRsvpStatuses] = useState<Record<string, string>>({});
  
  const group = MOCK_GROUP_DATA[groupId || ""];
  const isJoined = isGroupJoined(groupId || "");
  
  if (!group) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Group Not Found</h1>
          <Link to="/explore">
            <Button variant="outline">
              <ArrowLeft size={16} />
              Back to Explore
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleJoinGroup = () => {
    if (isJoined) {
      leaveGroup(group.id);
      toast({
        title: "Left group",
        description: `You've left ${group.name}`,
      });
    } else {
      joinGroup(group);
      toast({
        title: "Joined group! 🎉",
        description: `Welcome to ${group.name}`,
      });
    }
  };

  const handleRSVP = (eventId: string, status: string) => {
    setRsvpStatuses(prev => ({
      ...prev,
      [eventId]: status
    }));
    toast({
      title: status === 'yes' ? "RSVP Confirmed! ✅" : "RSVP Updated",
      description: status === 'yes' ? "See you at the event!" : `Changed RSVP to ${status}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/explore" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={16} />
          Back to Explore
        </Link>

        {/* Hero Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {group.tags.map((tag: string) => (
                  <InterestTag key={tag} label={tag} />
                ))}
                {group.isFree && (
                  <Badge variant="secondary" className="bg-accent/20 text-accent">FREE</Badge>
                )}
                {group.isBeginnerFriendly && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">Beginner Friendly</Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-foreground mb-2">{group.name}</h1>
              
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{group.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{group.memberCount} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{group.totalEvents} events hosted</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-primary" />
                  <span>{group.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-primary" />
                  <span>{group.schedule}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Join Button & Actions */}
          <div className="space-y-4">
            <Button 
              size="lg"
              variant={isJoined ? "secondary" : "hero"}
              onClick={handleJoinGroup}
              className="w-full"
            >
              {isJoined ? (
                <>
                  <Check size={16} />
                  Joined Group
                </>
              ) : (
                "Join Group"
              )}
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <MessageCircle size={14} />
                Message
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share size={14} />
                Share
              </Button>
            </div>

            {/* Organizer Info */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-foreground mb-2">Organizer</p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {group.organizer.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{group.organizer.name}</p>
                    <p className="text-xs text-muted-foreground">{group.organizer.role}</p>
                    <p className="text-xs text-muted-foreground">Member since {group.organizer.memberSince}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {group.upcomingEvents.map((event: any) => (
                  <Card key={event.id} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                          
                          <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={14} />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users size={14} />
                              <span>{event.attendees}/{event.maxAttendees} attending</span>
                            </div>
                          </div>
                          
                          <Badge variant="outline" className="text-xs">
                            {event.difficulty} difficulty
                          </Badge>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            variant={rsvpStatuses[event.id] === 'yes' ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleRSVP(event.id, 'yes')}
                          >
                            {rsvpStatuses[event.id] === 'yes' && <Check size={14} />}
                            Going
                          </Button>
                          <Button
                            variant={rsvpStatuses[event.id] === 'maybe' ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => handleRSVP(event.id, 'maybe')}
                          >
                            Maybe
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">About This Group</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {group.longDescription}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {group.description}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Group Guidelines</h3>
              <Card>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {group.rules.map((rule: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Members ({group.memberCount})
              </h2>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Joins</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {group.recentMembers.map((member: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-muted">
                            {member.name.split(' ')[0][0]}{member.name.split(' ')[1]?.[0] || ''}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{member.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{member.joined}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No photos yet</p>
              <p className="text-sm text-muted-foreground">
                Photos from group events will appear here once members start sharing them.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
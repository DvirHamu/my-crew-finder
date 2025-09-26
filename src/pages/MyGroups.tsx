import { Navigation } from "@/components/navigation";
import { GroupCard } from "@/components/ui/group-card";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGroups } from "@/contexts/GroupContext";
import { Trophy, Calendar, Clock, Heart, Target, Award } from "lucide-react";

// Mock user data - would come from Supabase in real app
const mockUserStats = {
  totalHoursVolunteered: 47,
  eventsAttended: 12,
  impactScore: 850,
  level: 5,
  nextLevelProgress: 70, // percentage to next level
  streak: 6, // weeks in a row
  badges: [
    {
      id: "1",
      name: "Environmental Hero",
      description: "Completed 5 environmental volunteer events",
      icon: "🌱",
      earned: true,
      dateEarned: "Jan 15"
    },
    {
      id: "2", 
      name: "Community Champion",
      description: "Volunteered 25+ hours in community building",
      icon: "🏘️",
      earned: true,
      dateEarned: "Jan 20"
    },
    {
      id: "3",
      name: "Animal Advocate",
      description: "Helped at 3 different animal shelters",
      icon: "🐕",
      earned: true,
      dateEarned: "Dec 28"
    },
    {
      id: "4",
      name: "Food Security Fighter",
      description: "Distributed meals to 100+ people",
      icon: "🍽️",
      earned: false,
      dateEarned: undefined
    },
    {
      id: "5",
      name: "Youth Mentor Master",
      description: "Mentored young people for 6+ months",
      icon: "🎓",
      earned: false,
      dateEarned: undefined
    },
    {
      id: "6",
      name: "Disaster Relief Responder",
      description: "Responded to emergency disaster situations",
      icon: "🚨",
      earned: false,
      dateEarned: undefined
    },
    {
      id: "7",
      name: "Senior Support Star",
      description: "Provided 20+ hours of elderly care",
      icon: "⭐",
      earned: false,
      dateEarned: undefined
    },
    {
      id: "8",
      name: "Tech for Good Guru",
      description: "Used tech skills to help 5+ nonprofits",
      icon: "💻",
      earned: false,
      dateEarned: undefined
    }
  ]
};

export default function MyGroups() {
  const { joinedGroups } = useGroups();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Impact Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your volunteer journey and see the difference you're making
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mx-auto mb-3">
                <Clock size={24} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {mockUserStats.totalHoursVolunteered}
              </div>
              <div className="text-sm text-muted-foreground">Hours Volunteered</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-lg mx-auto mb-3">
                <Calendar size={24} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {mockUserStats.eventsAttended}
              </div>
              <div className="text-sm text-muted-foreground">Events Attended</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mx-auto mb-3">
                <Target size={24} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {mockUserStats.impactScore}
              </div>
              <div className="text-sm text-muted-foreground">Impact Score</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-lg mx-auto mb-3">
                <Trophy size={24} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                Level {mockUserStats.level}
              </div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Level {mockUserStats.level}</span>
              <span className="text-sm text-muted-foreground">
                {mockUserStats.nextLevelProgress}% to Level {mockUserStats.level + 1}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                style={{ width: `${mockUserStats.nextLevelProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <Badge variant="secondary" className="text-xs">
                🔥 {mockUserStats.streak} Week Streak
              </Badge>
              <span className="text-xs text-muted-foreground">
                150 more points to next level!
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Badges & Achievements */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Badges & Achievements
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {mockUserStats.badges.filter(b => b.earned).length} of {mockUserStats.badges.length} badges earned
            </p>
          </CardHeader>
          <CardContent>
            <BadgeDisplay badges={mockUserStats.badges} />
          </CardContent>
        </Card>

        {/* My Volunteer Opportunities */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            My Volunteer Commitments ({joinedGroups.length})
          </h2>
          
          {joinedGroups.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedGroups.map((group) => (
                <GroupCard key={group.id} {...group} />
              ))}
            </div>
          ) : (
            <Card className="shadow-card">
              <CardContent className="text-center py-12">
                <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Start Your Volunteer Journey
                </h3>
                <p className="text-muted-foreground mb-4">
                  You haven't signed up for any volunteer opportunities yet. 
                  Find causes you care about and start making a difference!
                </p>
                <a href="/explore" className="text-primary hover:underline font-medium">
                  Explore Volunteer Opportunities →
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
import { Navigation } from "@/components/navigation";
import { GroupCard } from "@/components/ui/group-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";
import { useGroups } from "@/contexts/GroupContext";
import { Link } from "react-router-dom";

export default function MyGroups() {
  const { joinedGroups } = useGroups();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Groups</h1>
          <p className="text-muted-foreground mt-1">
            {joinedGroups.length > 0 
              ? `You've joined ${joinedGroups.length} group${joinedGroups.length === 1 ? '' : 's'}`
              : "You haven't joined any groups yet"
            }
          </p>
        </div>

        {joinedGroups.length === 0 ? (
          /* Empty State */
          <Card className="shadow-card max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                No Groups Yet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Start exploring to find groups that match your interests!
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Calendar size={14} />
                  <span>Discover upcoming events</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={14} />
                  <span>Find groups near you</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users size={14} />
                  <span>Meet like-minded people</span>
                </div>
              </div>
              <Link to="/explore">
                <Button variant="default" className="mt-4">
                  <span>Explore Groups</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          /* Joined Groups Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedGroups.map((group) => (
              <GroupCard key={group.id} {...group} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin } from "lucide-react";

export default function MyGroups() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Groups</h1>
          <p className="text-muted-foreground mt-1">
            Manage your joined groups and upcoming events
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="shadow-card max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your personal dashboard for managing groups and events is coming soon!
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Calendar size={14} />
                <span>View upcoming events</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin size={14} />
                <span>Track your groups</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Users size={14} />
                <span>Manage RSVPs</span>
              </div>
            </div>
            <Button variant="outline" className="mt-4">
              Explore Groups Instead
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
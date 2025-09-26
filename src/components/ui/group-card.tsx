import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InterestTag } from "@/components/ui/interest-tag";
import { MapPin, Clock, Users, Calendar, Check } from "lucide-react";
import { useGroups } from "@/contexts/GroupContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface GroupCardProps {
  id: string;
  name: string;
  description: string;
  tags: string[];
  location: string;
  schedule: string;
  memberCount: number;
  nextMeeting: string;
  isFree: boolean;
  isBeginnerFriendly: boolean;
  onClick?: () => void;
}

export function GroupCard({
  id,
  name,
  description,
  tags,
  location,
  schedule,
  memberCount,
  nextMeeting,
  isFree,
  isBeginnerFriendly,
  onClick
}: GroupCardProps) {
  const { joinGroup, leaveGroup, isGroupJoined } = useGroups();
  const navigate = useNavigate();
  const isJoined = isGroupJoined(id);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/group/${id}`);
    }
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isJoined) {
      leaveGroup(id);
      toast({
        title: "Volunteer signup cancelled",
        description: `You're no longer signed up for ${name}`,
      });
    } else {
      joinGroup({
        id,
        name,
        description,
        tags,
        location,
        schedule,
        memberCount,
        nextMeeting,
        isFree,
        isBeginnerFriendly
      });
      toast({
        title: "Signed up to volunteer! 🎉",
        description: `You're now helping with ${name}`,
      });
    }
  };
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-smooth cursor-pointer border-border hover:border-accent/30" onClick={handleCardClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground leading-tight">{name}</h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{description}</p>
          </div>
          {isFree && (
            <div className="bg-accent/20 text-accent font-medium px-2 py-1 rounded-lg text-xs">
              FREE
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <InterestTag key={tag} label={tag} />
          ))}
          {tags.length > 3 && (
            <span className="text-muted-foreground text-xs self-center">+{tags.length - 3} more</span>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>Next: {nextMeeting}</span>
          </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>{memberCount} volunteers</span>
            </div>
        </div>
        
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex gap-2">
            {isBeginnerFriendly && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-lg text-xs font-medium">
                Beginner Friendly
              </span>
            )}
          </div>
          <Button 
            size="sm" 
            variant={isJoined ? "secondary" : "outline"}
            onClick={handleJoinClick}
          >
            {isJoined ? (
              <>
                <Check size={14} />
                Joined
              </>
              ) : (
                "Volunteer"
              )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
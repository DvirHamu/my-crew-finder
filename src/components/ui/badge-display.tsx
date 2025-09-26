import { Badge } from "@/components/ui/badge";

interface BadgeDisplayProps {
  badges: {
    id: string;
    name: string;
    description: string;
    icon: string;
    earned: boolean;
    dateEarned?: string;
  }[];
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`p-4 text-center rounded-lg border transition-all ${
            badge.earned
              ? "bg-primary/10 border-primary/30 shadow-sm"
              : "bg-muted/50 border-border opacity-60"
          }`}
        >
          <div className="text-2xl mb-2">{badge.icon}</div>
          <h4 className="font-medium text-sm mb-1">{badge.name}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {badge.description}
          </p>
          {badge.earned && badge.dateEarned && (
            <Badge variant="secondary" className="mt-2 text-xs">
              {badge.dateEarned}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
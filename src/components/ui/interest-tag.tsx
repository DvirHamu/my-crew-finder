import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InterestTagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function InterestTag({ label, selected, onClick, className }: InterestTagProps) {
  return (
    <Button
      variant="tag"
      size="tag"
      onClick={onClick}
      className={cn(
        "transition-smooth",
        selected && "bg-gradient-accent text-accent-foreground border-accent shadow-hover",
        className
      )}
    >
      {label}
    </Button>
  );
}
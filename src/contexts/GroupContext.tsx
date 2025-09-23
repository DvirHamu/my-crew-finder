import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Group {
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
}

interface GroupContextType {
  joinedGroups: Group[];
  joinGroup: (group: Group) => void;
  leaveGroup: (groupId: string) => void;
  isGroupJoined: (groupId: string) => boolean;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: ReactNode }) {
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);

  // Load joined groups from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("crewfinder-joined-groups");
    if (saved) {
      try {
        setJoinedGroups(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load joined groups:", error);
      }
    }
  }, []);

  // Save joined groups to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("crewfinder-joined-groups", JSON.stringify(joinedGroups));
  }, [joinedGroups]);

  const joinGroup = (group: Group) => {
    setJoinedGroups(prev => {
      if (prev.some(g => g.id === group.id)) return prev;
      return [...prev, group];
    });
  };

  const leaveGroup = (groupId: string) => {
    setJoinedGroups(prev => prev.filter(g => g.id !== groupId));
  };

  const isGroupJoined = (groupId: string) => {
    return joinedGroups.some(g => g.id === groupId);
  };

  return (
    <GroupContext.Provider value={{
      joinedGroups,
      joinGroup,
      leaveGroup,
      isGroupJoined
    }}>
      {children}
    </GroupContext.Provider>
  );
}

export function useGroups() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error("useGroups must be used within a GroupProvider");
  }
  return context;
}
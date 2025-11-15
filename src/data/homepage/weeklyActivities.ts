type WeeklyActivity = {
  id: number;
  user?: string;
  action: string;
  time: string;
  icon: string;
  color: string;
};

export const weeklyActivitiesData: WeeklyActivity[] = [
  {
    id: 1,
    action: "Henry uploaded quarterly report",
    time: "1 day ago",
    icon: "document",
    color: "green",
  },
  {
    id: 2,
    action: "New traders completed first purchase",
    time: "2 days ago",
    icon: "users",
    color: "blue",
  },
];

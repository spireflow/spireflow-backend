type WeeklyActivity = {
  id: number;
  user: string;
  action: string;
  time: string;
  icon: string;
  color: string;
};

export const weeklyActivitiesData: WeeklyActivity[] = [
  {
    id: 1,
    user: "Henry",
    action: "uploaded smartfirm file",
    time: "1 day ago",
    icon: "document",
    color: "green",
  },
  {
    id: 2,
    user: "You",
    action: "assigned @Renee to do illustration of process",
    time: "2 days ago",
    icon: "users",
    color: "blue",
  },
];

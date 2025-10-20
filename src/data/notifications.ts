type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  isNew: boolean;
};

export const notificationsData: Notification[] = [
  {
    id: "1",
    title: "Update complete",
    description: "Restart server to complete update.",
    time: "Today",
    icon: "update",
    isNew: true,
  },
  {
    id: "2",
    title: "New connection",
    description: "Anna accepted your request.",
    time: "Yesterday",
    icon: "users",
    isNew: true,
  },
  {
    id: "3",
    title: "Task completed",
    description: "Your export has been generated successfully.",
    time: "2 days ago",
    icon: "check",
    isNew: false,
  },
  {
    id: "4",
    title: "Monthly report",
    description: "Your monthly analytics report is ready to view.",
    time: "11 Aug",
    icon: "document",
    isNew: false,
  },
];

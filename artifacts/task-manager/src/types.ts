export type Priority = "low" | "medium" | "high";

export type Filter = "all" | "active" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

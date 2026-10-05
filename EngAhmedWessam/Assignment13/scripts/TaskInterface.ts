export type TaskStatus = "todo" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface TaskInterface {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
}

export interface InputTaskInfo {
  taskTitle: string;
  taskDescription: string;
  taskPriority: TaskPriority;
  taskDueDate: string;
}

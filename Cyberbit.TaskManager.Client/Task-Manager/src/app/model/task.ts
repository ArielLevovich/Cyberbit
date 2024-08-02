import { TaskStatus } from './enums/task-status';
export interface Task {
    id: number,
    title: string,
    description: string,
    createdByUserId: number,
    creationTime: Date;
    dueDate: Date;
    userId: number;
    status: TaskStatus;
    userName: string;
    categoryIds:  number[];
    categoryNames: string[];
  }

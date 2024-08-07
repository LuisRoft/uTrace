// src/types/Goal.ts

export interface Goal {
    completed: any;
    id: number;
    type: string;
    name: string;
    description: string;
    startDate: string;
    streak: number;
    lastCompleted: string;
    completedToday: boolean;
    completionType: string; // 'success' or 'fail'
  }
  
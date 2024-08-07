// src/types/Goal.ts

export interface Goal {
    id: number;
    type: string;
    name: string;
    description: string;
    startDate: string;
    endDate?: string; // Hacer que endDate sea opcional
    streak: number;
    lastCompleted: string;
    completedToday: boolean;
    completionType: string; // 'success' or 'fail'
    completed?: boolean;
  }
  
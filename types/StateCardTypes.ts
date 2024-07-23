export type ActivitieProps = {
    activity: string;
    cost: number;
}

export interface StateCardProps {
    color: string;
    colorFlag: string;
    textColor: string;
    emotion: string;
    date: string;
    hour: string;
    imageUrl: string;
    flags: string[];
    activities: { activity: string, cost: number }[];
    EmotionComponent: React.ComponentType<any>;
    emotionProps: { width: number, height: number };
    backgroundColor: string;
    customWidth?: number; 
    customHeight?: number; 
    description?: string;  
}

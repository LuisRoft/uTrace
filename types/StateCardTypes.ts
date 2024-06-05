export type ActivitieProps = {
    activity: string;
    cost: number;
}

export type StateCardProps = {
    color: string;
    colorFlag: string;
    emotion: string;
    textColor: string;
    date: string;
    hour: string;
    imageUrl: any;
    flags: Array<string>;
    activities: Array<ActivitieProps>;
  }
  
  
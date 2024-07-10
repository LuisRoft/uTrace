export type ActivityButtonContainerProps = {
    activityButtons: string[][];
    containerBackgroundColor: string;
    onButtonPress: (buttonLabel: string) => void;
    selectedButtons: string[];
  };
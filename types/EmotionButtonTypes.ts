export type EmotionButton = 'Feliz' | 'Emocionado' | 'Vigoroso' | 'Alegre' | 'Ambicioso' | 'Triste';


export type EmotionButtonContainerProps = {
  emotionButtons: string[][];
  containerBackgroundColor: string;
  onButtonPress: (buttonLabel: string) => void;
  selectedButtons: string[];
};
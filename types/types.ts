import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  index: undefined;
  register: undefined;
  AddEmotion: undefined;
};

export type AddEmotionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddEmotion'>;
export type AddEmotionScreenRouteProp = RouteProp<RootStackParamList, 'AddEmotion'>;

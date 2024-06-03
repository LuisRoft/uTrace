import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ButtonFormProps } from '@/types/ButtonFormTypes';
import { styles } from '@/styles/buttonFormStyles';



export function ButtonForm({ text, style, ...rest}: ButtonFormProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <ThemedText style={styles.buttonText}>{text}</ThemedText>
    </TouchableOpacity>
  );
};



import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/emotionsStyles';
import { EmotionButtonContainerProps } from '@/types/EmotionButtonTypes';

export function EmotionButtonContainer ({ emotionButtons }: EmotionButtonContainerProps) {
  return (
    <View style={styles.emotionButtonContainer}>
      {emotionButtons.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.buttonRow}>
          {row.map((emotion, index) => (
            <TouchableOpacity key={`emotion-${rowIndex}-${index}`} style={styles.button}>
              <ThemedText style={styles.buttonText}>{emotion}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};


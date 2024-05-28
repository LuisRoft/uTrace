// EmotionButtonContainer.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/constants/styles';

type EmotionButton = 'Feliz' | 'Emocionado' | 'Vigoroso' | 'Alegre' | 'Ambicioso' | 'Triste';

interface EmotionButtonContainerProps {
  emotionButtons: EmotionButton[][];
}

const EmotionButtonContainer: React.FC<EmotionButtonContainerProps> = ({ emotionButtons }) => {
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

export default EmotionButtonContainer;

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/emotionsStyles';

interface EmotionButtonContainerProps {
  emotionButtons: string[][]; // Cambiado a matriz bidimensional de strings
  containerBackgroundColor: string; // Prop para recibir el color de fondo del contenedor
}

const EmotionButtonContainer: React.FC<EmotionButtonContainerProps> = ({ emotionButtons, containerBackgroundColor }) => {
  return (
    <View style={[styles.emotionButtonContainer, { backgroundColor: containerBackgroundColor }]}>
      {emotionButtons.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.buttonRow}>
          {row.map((emotion, colIndex) => (
            <TouchableOpacity key={`button-${rowIndex}-${colIndex}`} style={styles.button}>
              <ThemedText style={styles.buttonText}>{emotion}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default EmotionButtonContainer;

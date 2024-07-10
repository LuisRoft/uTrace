import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/Emotions/emotionsStyles';
import ButtonAdd from './ButtonAdd';
import { router } from 'expo-router';
import { EmotionButtonContainerProps } from '@/types/EmotionButtonTypes';



const EmotionButtonContainer: React.FC<EmotionButtonContainerProps> = ({ emotionButtons, containerBackgroundColor, onButtonPress, selectedButtons }) => {
  const onAddPress = () => {
    router.push('/AddEmotion');
  };

  return (
    <View style={[styles.emotionButtonContainer, { backgroundColor: containerBackgroundColor }]}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.containerText}>Sentimientos</ThemedText>
        <ButtonAdd onPress={onAddPress} color={containerBackgroundColor} />
      </View>
      {emotionButtons.map((buttonRow, rowIndex) => (
        <View key={rowIndex} style={styles.buttonRow}>
          {buttonRow.map((buttonLabel, buttonIndex) => (
            <TouchableOpacity
              key={buttonIndex}
              style={[
                styles.button,
                selectedButtons.includes(buttonLabel) && styles.selectedButton
              ]}
              onPress={() => onButtonPress(buttonLabel)}
            >
              <ThemedText style={styles.buttonText}>{buttonLabel}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default EmotionButtonContainer;

import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/Emotions/emotionsStyles';
import ButtonAdd from './ButtonAdd';
import { EmotionButtonContainerProps } from '@/types/EmotionButtonTypes';

const EmotionButtonContainer: React.FC<EmotionButtonContainerProps> = ({ emotionButtons, containerBackgroundColor, onButtonPress, selectedButtons }) => {
  const [newEmotion, setNewEmotion] = useState('');
  const [showInput, setShowInput] = useState(false);

  const onAddPress = () => {
    setShowInput(prevState => !prevState);
  };

  const onAddEmotion = () => {
    if (newEmotion.trim()) {
      emotionButtons.push([newEmotion]);
      setNewEmotion('');
      setShowInput(false);
    }
  };

  return (
    <View style={[styles.emotionButtonContainer, { backgroundColor: containerBackgroundColor }]}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.containerText}>Sentimientos</ThemedText>
        <ButtonAdd onPress={onAddPress} color={containerBackgroundColor} />
      </View>
      {showInput && (
        <View style={styles.addEmotionContainer}>
          <TextInput
            style={styles.input}
            placeholder="Añadir sentimiento"
            value={newEmotion}
            onChangeText={setNewEmotion}
          />
          <TouchableOpacity onPress={onAddEmotion} style={[styles.addButton, { backgroundColor: containerBackgroundColor }]}>
            <ThemedText style={styles.addButtonText}>Agregar</ThemedText>
          </TouchableOpacity>
        </View>
      )}
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

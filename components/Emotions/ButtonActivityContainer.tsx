import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/Emotions/emotionsStyles';
import ButtonAddActivity from './ButtonAddActivity';
import { ActivityButtonContainerProps } from '@/types/ButtonActivityContainerTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivityButtonContainer: React.FC<ActivityButtonContainerProps> = ({ activityButtons, containerBackgroundColor, onButtonPress, selectedButtons }) => {
  const [newActivity, setNewActivity] = useState('');
  const [buttons, setButtons] = useState(activityButtons);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const savedActivities = await AsyncStorage.getItem('activities');
        if (savedActivities) {
          setButtons(JSON.parse(savedActivities));
        }
      } catch (error) {
        console.error('Failed to load activities from storage', error);
      }
    };
    loadActivities();
  }, []);

  const saveActivities = async (updatedButtons: string[][]) => {
    try {
      await AsyncStorage.setItem('activities', JSON.stringify(updatedButtons));
    } catch (error) {
      console.error('Failed to save activities to storage', error);
    }
  };

  const onAddPress = () => {
    setShowInput(prevState => !prevState);
  };

  const onAddActivity = () => {
    if (newActivity.trim()) {
      const updatedButtons = [...buttons, [newActivity]];
      setButtons(updatedButtons);
      saveActivities(updatedButtons);
      setNewActivity('');
      setShowInput(false);
    }
  };

  return (
    <View style={[styles.activityButtonContainer, { backgroundColor: containerBackgroundColor }]}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.containerTextActivity}>Actividades</ThemedText>
        <ButtonAddActivity onPress={onAddPress} color={containerBackgroundColor} />
      </View>
      {showInput && (
        <View style={styles.addActivityContainer}>
          <TextInput
            style={styles.input}
            placeholder="Añadir actividad"
            value={newActivity}
            onChangeText={setNewActivity}
          />
          <TouchableOpacity onPress={onAddActivity} style={[styles.addButton, { backgroundColor: containerBackgroundColor }]}>
            <ThemedText style={styles.addButtonText}>Agregar</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      {buttons.map((buttonRow, rowIndex) => (
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

export default ActivityButtonContainer;

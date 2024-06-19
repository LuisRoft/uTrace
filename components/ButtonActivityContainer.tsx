// ActivityButtonContainer.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/emotionsStyles';
import ButtonAddActivity from './ButtonAddActivity';
import { router } from 'expo-router';

type ActivityButtonContainerProps = {
  activityButtons: string[][];
  containerBackgroundColor: string;
  onButtonPress: (buttonLabel: string) => void;
  selectedButtons: string[];
};

const ActivityButtonContainer: React.FC<ActivityButtonContainerProps> = ({ activityButtons, containerBackgroundColor, onButtonPress, selectedButtons }) => {
  const onAddPress = () => {
    router.push('/AddActivity');
  };

  return (
    <View style={[styles.activityButtonContainer, { backgroundColor: containerBackgroundColor }]}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.containerTextActivity}>Actividades</ThemedText>
        <ButtonAddActivity onPress={onAddPress} color={containerBackgroundColor} />
      </View>
      {activityButtons.map((buttonRow, rowIndex) => (
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

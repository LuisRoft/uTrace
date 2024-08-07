import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/goalsStyles';
import { Goal } from '@/components/goals/Goal'; // Importa la interfaz Goal

interface GoalItemProps {
  goal: Goal;
  handleGoalCompletion: (id: number, isCompleted: boolean) => void;
  handleDeleteGoal: (id: number) => void;
  isDeleteMode: boolean;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal, handleGoalCompletion, handleDeleteGoal, isDeleteMode }) => {
  return (
    <View style={styles.goalContainer}>
      <ThemedText style={styles.goalText}>{goal.name}</ThemedText>
      <ThemedText style={styles.goalDescription}>{goal.description}</ThemedText>
      <ThemedText style={styles.goalDate}>{goal.startDate} - {goal.streak} días en racha</ThemedText>
      <View style={styles.buttonContainer}>
        {!goal.completedToday && (
          <>
            <TouchableOpacity
              onPress={() => handleGoalCompletion(goal.id, true)}
              style={styles.markButton}
            >
              <ThemedText style={styles.markButtonText}>✓</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleGoalCompletion(goal.id, false)}
              style={[styles.markButton, styles.markButtonFail]}
            >
              <ThemedText style={styles.markButtonText}>✗</ThemedText>
            </TouchableOpacity>
          </>
        )}
        {goal.completedToday && (
          <TouchableOpacity
            style={[
              styles.markButton,
              goal.completionType === 'success' ? {} : styles.markButtonFail
            ]}
          >
            <ThemedText style={styles.markButtonText}>
              {goal.completionType === 'success' ? '✓' : '✗'}
            </ThemedText>
          </TouchableOpacity>
        )}
        {isDeleteMode && (
          <TouchableOpacity
            onPress={() => handleDeleteGoal(goal.id)}
            style={styles.deleteButton}
          >
            <ThemedText style={styles.markButtonText}>🗑</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default GoalItem;

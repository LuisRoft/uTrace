import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/goalsStyles';
import { Goal } from '@/components/goals/Goal';
import Ionicons from '@expo/vector-icons/Ionicons';
//johannes
interface GoalItemProps {
  goal: Goal;
  handleGoalCompletion: (id: number, isCompleted: boolean) => void;
  handleDeleteGoal: (id: number) => void;
  handleResetStreak: (id: number) => void; // Añade esta función
  isDeleteMode: boolean;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal, handleGoalCompletion, handleDeleteGoal, handleResetStreak, isDeleteMode }) => {
  const calculateDaysLeftOrOverdue = () => {
    if (!goal.endDate) return '';
    const today = new Date();
    const endDate = new Date(goal.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Días de atraso: ${Math.abs(diffDays)}`;
    } else {
      return `Días restantes: ${diffDays}`;
    }
  };

  return (
    <View style={styles.goalContainer}>
      <ThemedText style={styles.goalText}>{goal.name}</ThemedText>
      <ThemedText style={styles.goalDescription}>{goal.description}</ThemedText>
      <ThemedText style={styles.goalDate}>
        {goal.startDate} - {goal.streak} días en racha
      </ThemedText>
      {goal.type === 'Específico' && (
        <ThemedText style={styles.goalDate}>{calculateDaysLeftOrOverdue()}</ThemedText>
      )}
      <View style={styles.buttonContainer}>
        {!goal.completedToday && !goal.streakLost && (
          <>
            <TouchableOpacity
              onPress={() => handleGoalCompletion(goal.id, true)}
              style={styles.markButton}
            >
              <Ionicons name="checkmark-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleGoalCompletion(goal.id, false)}
              style={[styles.markButton, styles.markButtonFail]}
            >
              <Ionicons name="close-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </>
        )}
        {goal.completedToday && !goal.streakLost && (
          <TouchableOpacity
            style={[
              styles.markButton,
              goal.completionType === 'success' ? {} : styles.markButtonFail
            ]}
          >
            <Ionicons
              name={goal.completionType === 'success' ? "checkmark-outline" : "close-outline"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {goal.streakLost && (
          <TouchableOpacity
            onPress={() => handleResetStreak(goal.id)}
            style={[styles.markButton, styles.resetButton]}
          >
            <Ionicons name="refresh-outline" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        {isDeleteMode && (
          <TouchableOpacity
            onPress={() => handleDeleteGoal(goal.id)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash-outline" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default GoalItem;

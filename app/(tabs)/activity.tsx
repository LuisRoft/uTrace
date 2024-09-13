import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '@/styles/goalsStyles';
import Header from '@/components/goals/Header';
import GoalItem from '@/components/goals/GoalItem';
import AddGoalModal from '@/components/goals/AddGoalModal';
import { ThemedText } from '@/components/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface Goal {
  id: number;
  type: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  streak: number;
  lastCompleted: string;
  completedToday: boolean;
  completionType: string;
  completed?: boolean;
  streakLost?: boolean;
  streakGoal?: number;
}

const GoalsScreen: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const savedGoals = await AsyncStorage.getItem('goals');
        if (savedGoals) {
          setGoals(JSON.parse(savedGoals));
        }
      } catch (error) {
        console.error('Failed to load goals from storage', error);
      }
    };
    loadGoals();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const updatedGoals = goals.map(goal => {
      if (goal.type === 'Diario' && goal.lastCompleted !== today && goal.lastCompleted !== '' && !goal.streakLost) {
        return { ...goal, completedToday: false, streakLost: true };
      }
      return goal;
    });
    if (JSON.stringify(goals) !== JSON.stringify(updatedGoals)) {
      setGoals(updatedGoals);
      saveGoals(updatedGoals);
    }
  }, [goals]);

  const saveGoals = async (updatedGoals: Goal[]) => {
    try {
      await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
    } catch (error) {
      console.error('Failed to save goals to storage', error);
    }
  };

  const handleAddGoal = (goal: Partial<Goal>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now(),
      streak: 0,
      lastCompleted: '',
      completedToday: false,
      completionType: '',
      completed: false,
      streakLost: false, // Asegura que streakLost sea false al crear un objetivo
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const handleGoalCompletion = (id: number, isCompleted: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedGoals = goals.map(goal => {
      if (goal.id === id) {
        if (goal.lastCompleted === today && !goal.streakLost) {
          Alert.alert('Error', 'Este objetivo ya ha sido marcado hoy.');
          return goal;
        }
        if (goal.type === 'Específico') {
          if (!isCompleted) {
            return {
              ...goal,
              completedToday: false,
              streakLost: false,
              completionType: 'fail',
            };
          }
          return {
            ...goal,
            completed: true,
            lastCompleted: today,
            completedToday: true,
          };
        }
        if (goal.streakLost) {
          return {
            ...goal,
            streak: 1,
            streakLost: false,
            lastCompleted: today,
            completedToday: true,
            completionType: 'success',
            completed: false,
          };
        }
        return {
          ...goal,
          streak: isCompleted ? goal.streak + 1 : 0,
          lastCompleted: today,
          completedToday: true,
          streakLost: !isCompleted,
          completionType: isCompleted ? 'success' : 'fail',
          completed: isCompleted && goal.streakGoal && goal.streak >= goal.streakGoal,
        };
      }
      return goal;
    });
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const handleResetStreak = (id: number) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === id) {
        return {
          ...goal,
          streak: 0,
          streakLost: false,
          completedToday: false,
        };
      }
      return goal;
    });
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const handleDeleteGoal = (id: number) => {
    Alert.alert(
      "Eliminar objetivo",
      "¿Estás seguro de que deseas eliminar este objetivo?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            const updatedGoals = goals.filter(goal => goal.id !== id);
            setGoals(updatedGoals);
            saveGoals(updatedGoals);
          },
          style: "destructive"
        }
      ]
    );
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <ThemedView style={styles.container}>
      <Header onAddPress={() => setShowModal(true)} onDeletePress={toggleDeleteMode} />
      <ScrollView>
        <View style={styles.inner}>
          {goals.filter(goal => goal.type === 'Diario' && (!goal.completed || goal.streakLost)).length > 0 && (
            <>
              <ThemedText style={styles.subTitle}>Diarios</ThemedText>
              {goals.filter(goal => goal.type === 'Diario' && (!goal.completed || goal.streakLost)).map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  handleGoalCompletion={handleGoalCompletion}
                  handleDeleteGoal={handleDeleteGoal}
                  handleResetStreak={handleResetStreak}
                  isDeleteMode={isDeleteMode}
                />
              ))}
            </>
          )}
          {goals.filter(goal => goal.type === 'Específico' && !goal.completed).length > 0 && (
            <>
              <ThemedText style={styles.subTitle}>Específicos</ThemedText>
              {goals.filter(goal => goal.type === 'Específico' && !goal.completed).map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  handleGoalCompletion={handleGoalCompletion}
                  handleDeleteGoal={handleDeleteGoal}
                  isDeleteMode={isDeleteMode}
                />
              ))}
            </>
          )}
          {showCompleted && goals.filter(goal => goal.completed).length > 0 && (
            <>
              <ThemedText style={styles.subTitle}>Completados</ThemedText>
              {goals.filter(goal => goal.completed).map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  handleDeleteGoal={handleDeleteGoal}
                  handleResetStreak={handleResetStreak}
                  isDeleteMode={isDeleteMode}
                />
              ))}
            </>
          )}
          <TouchableOpacity onPress={toggleShowCompleted} style={styles.toggleCompletedButton}>
            <Ionicons
              name={showCompleted ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#fff"
            />
            <ThemedText style={styles.toggleCompletedButtonText}>
              {showCompleted ? 'Ocultar Completados' : 'Mostrar Completados'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AddGoalModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAddGoal={handleAddGoal}
      />
    </ThemedView>
  );
};

export default GoalsScreen;
//johannes
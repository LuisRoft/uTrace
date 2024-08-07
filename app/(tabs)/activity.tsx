import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '@/styles/goalsStyles';
import Header from '@/components/goals/Header';
import GoalItem from '@/components/goals/GoalItem';
import AddGoalModal from '@/components/goals/AddGoalModal';
import { ThemedText } from '@/components/ThemedText';

interface Goal {
  id: number;
  type: string;
  name: string;
  description: string;
  startDate: string;
  streak: number;
  lastCompleted: string;
  completedToday: boolean;
  completionType: string; // 'success' or 'fail'
}

const GoalsScreen: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

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
      if (goal.lastCompleted !== today && goal.completedToday) {
        if (goal.completionType === 'success') {
          return goal;
        } else {
          return { ...goal, streak: 0, completedToday: false, completionType: '' };
        }
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
    const updatedGoals = [...goals, { ...goal, id: Date.now() } as Goal];
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const handleGoalCompletion = (id: number, isCompleted: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedGoals = goals.map(goal => {
      if (goal.id === id) {
        if (goal.lastCompleted === today) {
          Alert.alert('Error', 'Este objetivo ya ha sido marcado hoy.');
          return goal;
        }
        return {
          ...goal,
          streak: isCompleted ? goal.streak + 1 : 0,
          lastCompleted: today,
          completedToday: true,
          completionType: isCompleted ? 'success' : 'fail'
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

  return (
    <ThemedView style={styles.container}>
      <Header onAddPress={() => setShowModal(true)} onDeletePress={toggleDeleteMode} />
      <ScrollView>
        <View style={styles.inner}>
          {goals.filter(goal => goal.type === 'Diario').length > 0 && (
            <>
              <ThemedText style={styles.subTitle}>Diarios</ThemedText>
              {goals.filter(goal => goal.type === 'Diario').map((goal) => (
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
          {goals.filter(goal => goal.type === 'Específico').length > 0 && (
            <>
              <ThemedText style={styles.subTitle}>Específicos</ThemedText>
              {goals.filter(goal => goal.type === 'Específico').map((goal) => (
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

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/goalsStyles';
import { Goal } from '@/components/goals/Goal'; // Importa la interfaz Goal

interface AddGoalModalProps {
  visible: boolean;
  onClose: () => void;
  onAddGoal: (goal: Partial<Goal>) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ visible, onClose, onAddGoal }) => {
  const [goalType, setGoalType] = useState<string>('');
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({ type: '', name: '', description: '' });

  const handleAddGoal = () => {
    if (newGoal.type && newGoal.name && newGoal.description) {
      onAddGoal({ ...newGoal, startDate: new Date().toISOString().split('T')[0], streak: 0, lastCompleted: '', completedToday: false, completionType: '' });
      setNewGoal({ type: '', name: '', description: '' });
      setGoalType('');
      onClose();
      Alert.alert('Éxito', 'Objetivo agregado exitosamente.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {!goalType && (
            <>
              <ThemedText style={styles.modalTitle}>Agregar Objetivo</ThemedText>
              <TouchableOpacity onPress={() => setGoalType('Diario')} style={styles.goalTypeButton}>
                <ThemedText style={styles.goalTypeButtonText}>Diario</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGoalType('Específico')} style={styles.goalTypeButton}>
                <ThemedText style={styles.goalTypeButtonText}>Específico</ThemedText>
              </TouchableOpacity>
            </>
          )}
          {goalType && (
            <View style={styles.inputContainer}>
              <ThemedText style={styles.selectedGoalType}>{goalType}</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Nombre del objetivo"
                value={newGoal.name}
                onChangeText={(text) => setNewGoal({ ...newGoal, name: text, type: goalType })}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción del objetivo"
                value={newGoal.description}
                onChangeText={(text) => setNewGoal({ ...newGoal, description: text })}
              />
              <TouchableOpacity onPress={handleAddGoal} style={[styles.modalButton, styles.modalAddButton]}>
                <ThemedText style={styles.modalButtonText}>Agregar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGoalType('')} style={[styles.modalButton, styles.backButton]}>
                <ThemedText style={styles.modalButtonText}>Volver</ThemedText>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <ThemedText style={styles.closeButtonText}>Cerrar</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddGoalModal;

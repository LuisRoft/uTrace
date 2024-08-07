import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Alert, Switch } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/goalsStyles';
import { Goal } from '@/components/goals/Goal'; // Importa la interfaz Goal
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddGoalModalProps {
  visible: boolean;
  onClose: () => void;
  onAddGoal: (goal: Partial<Goal>) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ visible, onClose, onAddGoal }) => {
  const [goalType, setGoalType] = useState<string>('');
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({ type: '', name: '', description: '', startDate: '', endDate: '' });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isNoEndDate, setIsNoEndDate] = useState(false);

  const handleAddGoal = () => {
    if (newGoal.type && newGoal.name && newGoal.description && newGoal.startDate && (isNoEndDate || newGoal.endDate)) {
      onAddGoal({
        ...newGoal,
        startDate: new Date(newGoal.startDate).toISOString().split('T')[0],
        endDate: isNoEndDate ? undefined : new Date(newGoal.endDate).toISOString().split('T')[0],
        streak: 0,
        lastCompleted: '',
        completedToday: false,
        completionType: '',
        completed: false,
      });
      setNewGoal({ type: '', name: '', description: '', startDate: '', endDate: '' });
      setGoalType('');
      onClose();
      Alert.alert('Éxito', 'Objetivo agregado exitosamente.');
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos.');
    }
  };

  const handleStartDateChange = (event: any, selectedDate: string | undefined) => {
    const currentDate = selectedDate || newGoal.startDate;
    setShowStartDatePicker(false);
    setNewGoal({ ...newGoal, startDate: currentDate });
  };

  const handleEndDateChange = (event: any, selectedDate: string | undefined) => {
    const currentDate = selectedDate || newGoal.endDate;
    setShowEndDatePicker(false);
    setNewGoal({ ...newGoal, endDate: currentDate });
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
              <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePickerButton}>
                <ThemedText style={styles.datePickerButtonText}>
                  {newGoal.startDate ? new Date(newGoal.startDate).toLocaleDateString() : 'Fecha de inicio'}
                </ThemedText>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={newGoal.startDate ? new Date(newGoal.startDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleStartDateChange}
                />
              )}
              <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePickerButton} disabled={isNoEndDate}>
                <ThemedText style={styles.datePickerButtonText}>
                  {newGoal.endDate ? new Date(newGoal.endDate).toLocaleDateString() : 'Fecha de finalización'}
                </ThemedText>
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={newGoal.endDate ? new Date(newGoal.endDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleEndDateChange}
                />
              )}
              <View style={styles.noEndDateContainer}>
                <Switch
                  value={isNoEndDate}
                  onValueChange={(value) => setIsNoEndDate(value)}
                />
                <ThemedText style={styles.noEndDateText}>Sin fecha límite</ThemedText>
              </View>
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

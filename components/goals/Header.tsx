import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/goalsStyles';
import Ionicons from '@expo/vector-icons/Ionicons'; // Importa Ionicons

interface HeaderProps {
  onAddPress: () => void;
  onDeletePress: () => void;
}
//johannes
const Header: React.FC<HeaderProps> = ({ onAddPress, onDeletePress }) => {
  return (
    <View style={styles.header}>
      <ThemedText style={styles.title}>Objetivos</ThemedText>
      <View style={styles.headerButtons}>
        <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
          {/* Reemplaza el texto "+" con el ícono "add-outline" */}
          <Ionicons name="add-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeletePress} style={styles.deleteButton}>
          {/* Reemplaza el texto "🗑" con el ícono "trash-outline" */}
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;


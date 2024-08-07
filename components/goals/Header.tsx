import React from 'react';//johannes
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/goalsStyles';

interface HeaderProps {
  onAddPress: () => void;
  onDeletePress: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddPress, onDeletePress }) => {
  return (
    <View style={styles.header}>
      <ThemedText style={styles.title}>Objetivos</ThemedText>
      <View style={styles.headerButtons}>
        <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
          <ThemedText style={styles.addButtonText}>+</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeletePress} style={styles.deleteButton}>
          <ThemedText style={styles.addButtonText}>🗑</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/styles/Emotions/activityStyles';

export default function Activity () {
  return (
    <ThemedView style={styles.container}>
      <ScrollView>
      <View style={styles.inner}>
        <ThemedText type="subtitle" darkColor="#000" style={styles.title}>
          Actividad
        </ThemedText>
      </View>
      </ScrollView>
    </ThemedView>
  );
}



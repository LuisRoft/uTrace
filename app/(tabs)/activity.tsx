import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/styles/activityStyles';
import CaraFeliz from '@/components/icons/caraFeliz'; 
import CaraTriste from '@/components/icons/caraTriste';
import CaraEnojado from '@/components/icons/caraEnojado';
import CaraMiedo from '@/components/icons/caraMiedo';
import CaraAsco from '@/components/icons/caraAsco';
import CaraNose from '@/components/icons/caraNose';

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



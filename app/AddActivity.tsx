import { View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';

export default function AddEmotion() {
  return (
    <View style={{ backgroundColor: '#ffff' ,flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText type='title' style={{color:'black'}}>IN PROCESS...</ThemedText>
    </View>
);  
}

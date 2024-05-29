import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StateCard} from '@/components/State_card/StateCard';

export default function Calendar() {
    return (
        <View>
            <StateCard 
                imageUrl="example.jpg"
                emotion="Feliz"
                description="Description"
                 date="fecha"
            />
        </View>
    );
}
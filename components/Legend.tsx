import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '@/styles/reportStyles';

interface LegendProps {
    data: any[];
}

export const Legend: React.FC<LegendProps> = ({ data }) => (
    <View>
        {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
                <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                <ThemedText style={styles.text}>{item.emotionName}: {item.text}</ThemedText>
            </View>
        ))}
    </View>
);
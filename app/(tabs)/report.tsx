import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/styles/activityStyles';
import { styles as reportStyles } from '@/styles/reportStyles';
import { PieChartComponent } from '@/components/PieChartComponent'; 
import { Legend } from '@/components/Legend';
import { useFetchEmotions } from '@/hooks/useFetchEmotions';


export default function Report() {
    const [emotionData, loading] = useFetchEmotions();

    if (loading) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Cargando...</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <ScrollView>
                <View style={styles.inner}>
                    <ThemedText type="subtitle" darkColor="#000" style={styles.title}>
                        Estadísticas
                    </ThemedText>
                    {emotionData.length > 0 && (
                        <View style={reportStyles.chartContainer}>
                            <PieChartComponent data={emotionData} />
                            <Legend data={emotionData} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </ThemedView>
    );
}



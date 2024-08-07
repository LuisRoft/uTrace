import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/styles/activityStyles';
import { styles as reportStyles } from '@/styles/reportStyles';
import { PieChartComponent } from '@/components/PieChartComponent'; 
import { Legend } from '@/components/Legend';
import { useFetchEmotions } from '@/hooks/useFetchEmotions';

export default function Report() {
    const [dailyEmotionData, monthlyEmotionData, yearlyEmotionData, loading] = useFetchEmotions();
    const [active, setActive] = React.useState('Dia');

    const getActiveData = () => {
        switch (active) {
            case 'Dia':
                return dailyEmotionData;
            case 'Mes':
                return monthlyEmotionData;
            case 'Año':
                return yearlyEmotionData;
            default:
                return [];
        }
    };

    if (loading) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Cargando...</ThemedText>
            </ThemedView>
        );
    }

    const activeData = getActiveData();

    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inner}>
                    <ThemedText type="subtitle" darkColor="#000" style={styles.title}>
                        Estadísticas
                    </ThemedText>

                    <View style={reportStyles.navbar}>
                        <TouchableOpacity
                            style={[reportStyles.navItem, active === 'Dia' && reportStyles.active]}
                            onPress={() => setActive('Dia')}
                        >
                            <Text style={[reportStyles.navText, active === 'Dia' && reportStyles.activeText]}>Dia</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[reportStyles.navItem, reportStyles.borderLeft, active === 'Mes' && reportStyles.active]}
                            onPress={() => setActive('Mes')}
                        >
                            <Text style={[reportStyles.navText, active === 'Mes' && reportStyles.activeText]}>Mes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[reportStyles.navItem, reportStyles.borderLeft, active === 'Año' && reportStyles.active]}
                            onPress={() => setActive('Año')}
                        >
                            <Text style={[reportStyles.navText, active === 'Año' && reportStyles.activeText]}>Año</Text>
                        </TouchableOpacity>
                    </View>

                    {activeData.length > 0 && (
                        <View style={reportStyles.chartContainer}>
                            <PieChartComponent data={activeData} />
                            <Legend data={activeData} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </ThemedView>
    );
}

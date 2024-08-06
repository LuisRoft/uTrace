import React, { useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/styles/Emotions/activityStyles';
import { styles as reportStyles } from '@/styles/Report/reportStyles';
import { PieChartComponent } from '@/components/Report/PieChartComponent'; 
import { Legend } from '@/components/Report/Legend';
import { useFetchEmotions } from '@/hooks/useFetchEmotions';
import { useUserSelections } from '@/context/UserSelectionsContext';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function Report() {
  const { userSelections, fetchUserSelections } = useUserSelections();
  const [dailyEmotionData, monthlyEmotionData, yearlyEmotionData, loading] = useFetchEmotions(userSelections);
  const [active, setActive] = React.useState('Dia');

  useEffect(() => {
    fetchUserSelections();
  }, [fetchUserSelections]);

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

  const generatePieChartSVG = (data: any[]) => {
    let total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;
    let paths: string[] = [];

    data.forEach((item) => {
      let angle = (item.value / total) * 360;
      let endAngle = startAngle + angle;
      let largeArcFlag = angle > 180 ? 1 : 0;
      
      let start = polarToCartesian(100, 100, 100, startAngle);
      let end = polarToCartesian(100, 100, 100, endAngle);

      let d = [
        "M", 100, 100,
        "L", start.x, start.y,
        "A", 100, 100, 0, largeArcFlag, 1, end.x, end.y,
        "Z"
      ].join(" ");

      paths.push(`<path d="${d}" fill="${item.color}" />`);
      startAngle = endAngle;
    });

    return `
      <svg width="200" height="200" viewBox="0 0 200 200">
        ${paths.join('')}
      </svg>
    `;
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const printToFile = async () => {
    try {
      const activeData = getActiveData();
      const pieChartSVG = generatePieChartSVG(activeData);

      const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <style>
              body { font-family: system-ui; padding: 20px; vh: 100%;}
              .title{ text-align: center; }
              .chart-container { display: flex; justify-content: center; padding: 20px; border: 1px solid #000; }
              .chart-info { margin-top: 20px; display: flex; flex-direction: column; align-items: center; font-size: 26px; }
              .emotion-item { margin-bottom: 10px; }
              .emotion-name { font-weight: bold; margin-right: 10px; }
            </style>
          </head>
          <body>
            <h1 class='title'>Reporte de Emociones - ${active}</h1>
            <div class="chart-container">
              ${pieChartSVG}
            </div>
            <div class="chart-info">
              <h2>Detalles de las Emociones:</h2>
              ${activeData.map(item => `
                <div class="emotion-item">
                  <span class="emotion-name" style="color: ${item.color};">${item.emotionName}:</span>
                  <span class="emotion-value">${item.value}%</span>
                </div>
              `).join('')}
            </div>
          </body>
        </html>
      `;

      const { uri: pdfUri } = await Print.printToFileAsync({ html });
      await shareAsync(pdfUri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error al generar el PDF:', error);
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
      <TouchableOpacity style={reportStyles.button} onPress={printToFile}>
        <Text>Imprimir Reporte</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}
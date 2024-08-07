import React, { useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/styles/Emotions/activityStyles';
import { styles as reportStyles } from '@/styles/Report/reportStyles';
import { PieChartComponent } from '@/components/Report/PieChartComponent'; 
import { Legend } from '@/components/Report/Legend';
import { EmotionData, useFetchEmotions } from '@/hooks/useFetchEmotions';
import { useUserSelections } from '@/context/UserSelectionsContext';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing';

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

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  
  const generatePieChartSVG = (data: EmotionData[]): string => {
    if (data.length === 0) {
      return '<svg width="200" height="200" viewBox="0 0 200 200"><text x="100" y="100" text-anchor="middle">No data</text></svg>';
    }
  
    if (data.length === 1) {
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="100" fill="${data[0].color}" />
        </svg>
      `;
    }
  
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;
    const paths: string[] = [];
  
    data.forEach((item) => {
      const angle = (item.value / total) * 360;
      const endAngle = startAngle + angle;
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const start = polarToCartesian(100, 100, 100, startAngle);
      const end = polarToCartesian(100, 100, 100, endAngle);
  
      const d = [
        "M", 100, 100,
        "L", start.x.toFixed(2), start.y.toFixed(2),
        "A", 100, 100, 0, largeArcFlag, 1, end.x.toFixed(2), end.y.toFixed(2),
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

  const printToFile = async () => {
    try {
      const activeData = getActiveData();
      const pieChartSVG = generatePieChartSVG(activeData);
      console.log('DATAAAAAA: ', activeData)
      const html = `
        <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <title>Reporte de Emociones</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f4f8;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 8px;
            padding: 30px;
        }
        .title { 
            text-align: center;
            color: #2c3e50;
            font-size: 28px;
            margin-bottom: 30px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
        }
        .chart-container { 
            display: flex; 
            justify-content: center; 
            padding: 40px; 
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: #f9f9f9;
            margin-bottom: 30px;
        }
        .chart-info { 
            margin-top: 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            grid-gap: 15px;
        }
        .emotion-item { 
            background: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            padding: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
        }
        .emotion-item:hover {
            transform: translateY(-3px);
        }
        .emotion-name { 
            font-weight: bold; 
            margin-right: 10px;
            font-size: 18px;
        }
        .emotion-value {
            font-size: 16px;
        }
        .logo {
            display: block;
            margin: 30px auto 0;
            width: 100px;
            margin-bottom: 20px;
        }
        h2 {
            text-align: center;
            color: #2c3e50;
            margin-top: 30px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class='title'>Reporte de Emociones - ${active}</h1>
        <img src="https://i.imgur.com/guhp3rb.png" alt="logo" class="logo" />
        <div class="chart-container">
            ${pieChartSVG}
        </div>
        <h2>Detalles de las Emociones:</h2>
        <div class="chart-info">
            ${activeData.map(item => `
                <div class="emotion-item">
                    <span class="emotion-name" style="color: ${item.color};">${item.emotionName}:</span>
                    <span class="emotion-value">${Number(item.value.toFixed(2))}%</span>
                </div>
            `).join('')}
        </div>        
    </div>
</body>
</html>
      `;
          const response = await Print.printToFileAsync({html})      
          const pdfName = `${response.uri.slice(
              0,
              response.uri.lastIndexOf('/') + 1
          )}Reporte_De_Emociones.pdf`
      
          await FileSystem.moveAsync({
              from: response.uri,
              to: pdfName,
          })
          sharePdf(pdfName)
  
    
    
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };
  const sharePdf = (url: string) => {
    Sharing.shareAsync(url)
}
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
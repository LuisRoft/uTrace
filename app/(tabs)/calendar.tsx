import React, { useState, useEffect } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Calendar, DateData } from 'react-native-calendars';
import { styles as calendarStyles, customTheme } from '@/styles/Calendar/calendarStyles';
import { useUserSelections } from '@/context/UserSelectionsContext';
import StateCards from '@/components/StateCard/StateCard';
import { emotions } from '@/components/Emotions/Emotions';
import { PieChartComponent } from '@/components/Report/PieChartComponent'; 
import { Legend } from '@/components/Report/Legend';
import { useFetchEmotions, getEmotionDataForDate, EmotionData } from '@/hooks/useFetchEmotions';
import { useAuth } from '@/hooks/useAuth';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { userSelections, loading, deleteUserSelection } = useUserSelections(); // Añadir deleteUserSelection aquí
  const [,,, loadingEmotions] = useFetchEmotions(userSelections);
  const [activeTab, setActiveTab] = useState<string>('Emociones');
  const [selectedDateEmotionData, setSelectedDateEmotionData] = useState<EmotionData[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user && selectedDate) {
        const data = await getEmotionDataForDate(user.userId, selectedDate);
        setSelectedDateEmotionData(data);
      }
    };
    fetchData();
  }, [user, selectedDate, getEmotionDataForDate, userSelections]);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const getMarkedDates = () => {
    const marked: any = {};
    userSelections.forEach((selection, index) => {
      const date = selection.date.split('T')[0];
      if (!marked[date]) {
        marked[date] = { dots: [] };
      }
      marked[date].dots.push({
        key: `${selection.date}-${selection.selectedEmotion}-${index}-${Math.random()}`,  // Clave única
        color: selection.backgroundColor, 
      });
    });

    Object.keys(marked).forEach((date) => {
      marked[date].customStyles = {
        container: {
          backgroundColor: date === selectedDate ? 'blue' : 'transparent'
        },
        text: {
          color: date === selectedDate ? 'white' : 'black',
          fontWeight: date === selectedDate ? 'bold' : 'normal'
        }
      };
    });

    return marked;
  };

  const extractDateAndTime = (isoString: string) => {
    const [datePart, timePart] = isoString.split('T');
    const time = timePart.split('.')[0]; 
    return { date: datePart, time };
  };

  const handleDeleteSelection = async (id: number) => {
    try {
      await deleteUserSelection(id);
    } catch (error) {
      console.error('Error eliminando datos: ', error);
    }
  };

  if (loading || loadingEmotions) {
    return (
      <ThemedView style={calendarStyles.container}>
        <ThemedText>Cargando...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={calendarStyles.container}>
      <ScrollView>
        <View>
          <ThemedText type="subtitle" darkColor="#000" style={calendarStyles.title}>
            Calendario
          </ThemedText>
          <Calendar
            onDayPress={handleDayPress}
            markingType={'multi-dot'}
            markedDates={getMarkedDates()}
            theme={customTheme}
            firstDay={1}
            hideExtraDays={false}
            showWeekNumbers={false}
            enableSwipeMonths={true}
            style={calendarStyles.calendar}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={calendarStyles.centeredView}>
          <View style={calendarStyles.modalView}>
            <Text style={calendarStyles.modalText}>Historial del {selectedDate}</Text>

            <View style={calendarStyles.navbar}>
              <TouchableOpacity
                style={[calendarStyles.navItem, activeTab === 'Emociones' && calendarStyles.active]}
                onPress={() => setActiveTab('Emociones')}
              >
                <Text style={[calendarStyles.navText, activeTab === 'Emociones' && calendarStyles.activeText]}>Emociones</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[calendarStyles.navItem, calendarStyles.borderLeft, activeTab === 'Reporte' && calendarStyles.active]}
                onPress={() => setActiveTab('Reporte')}
              >
                <Text style={[calendarStyles.navText, activeTab === 'Reporte' && calendarStyles.activeText]}>Reporte</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {activeTab === 'Emociones' && userSelections
                .filter((selection) => selection.date.split('T')[0] === selectedDate)
                .map((selection, index) => {
                  const { date, time } = extractDateAndTime(selection.date);
                  const emotionData = emotions[selection.selectedEmotion];
                  return (
                    <StateCards
                      key={`${selection.date}-${selection.selectedEmotion}-${index}`}  
                      color={selection.backgroundColor}
                      colorFlag={selection.flagColor}
                      textColor={selection.textColor}
                      date={date}
                      hour={time}
                      emotion={selection.selectedEmotionButtons.join(', ')}
                      flags={selection.selectedEmotionButtons}
                      activities={selection.selectedActivityButtons.map((activity: string) => ({ activity, cost: 5 }))}
                      EmotionComponent={emotionData.image}
                      emotionProps={{ width: 60, height: 100 }}
                      backgroundColor={emotionData.backgroundColor}
                      imageUrl={''}
                      customWidth={260}
                      customHeight={150}
                      description={selection.description}  // Pasar la descripción aquí
                      id={selection.id}  // Pasar el ID aquí
                      onDelete={handleDeleteSelection}  // Pasar la función de eliminación aquí
                    />
                  );
                })}
              {activeTab === 'Reporte' && (
                <View style={calendarStyles.chartContainer}>
                  {selectedDateEmotionData.length > 0 ? (
                    <>
                      <PieChartComponent data={selectedDateEmotionData} />
                      <Legend data={selectedDateEmotionData} />
                    </>
                  ) : (
                    <ThemedText>No hay datos para esta fecha</ThemedText>
                  )}
                </View>
              )}
            </ScrollView>
            <TouchableOpacity
              style={calendarStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={calendarStyles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

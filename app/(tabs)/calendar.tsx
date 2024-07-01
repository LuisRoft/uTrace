import React, { useState } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Calendar, DateData } from 'react-native-calendars';
import { styles as calendarStyles, customTheme } from '@/styles/calendarStyles';
import { useUserSelections } from '@/hooks/useUserSelections';
import StateCards from '@/components/StateCard/StateCard';
import { emotions } from '@/components/Emotions';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userSelections, loading] = useUserSelections();

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const getMarkedDates = () => {
    const marked: any = {};
    userSelections.forEach((selection) => {
      const date = selection.date.split('T')[0];
      if (!marked[date]) {
        marked[date] = { dots: [] };
      }
      marked[date].dots.push({
        key: `${selection.date}-${selection.selectedEmotion}`,
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

  if (loading) {
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
            <ScrollView showsVerticalScrollIndicator={false}>
              {userSelections
                .filter((selection) => selection.date.split('T')[0] === selectedDate)
                .map((selection, index) => {
                  const emotionData = emotions[selection.selectedEmotion];
                  return (
                    <StateCards
                      key={index}
                      color={selection.backgroundColor}
                      colorFlag={selection.flagColor}
                      textColor={selection.textColor}
                      date={selection.date}
                      hour={selection.hour}
                      emotion={selection.selectedEmotionButtons.join(', ')}
                      flags={selection.selectedEmotionButtons}
                      activities={selection.selectedActivityButtons.map((activity: string) => ({ activity, cost: 5 }))}
                      EmotionComponent={emotionData.image}
                      emotionProps={{ width: 60, height: 100 }}
                      backgroundColor={emotionData.backgroundColor}
                      imageUrl={''}
                      customWidth={260}
                      customHeight={150} 
                    />
                  );
                })}
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

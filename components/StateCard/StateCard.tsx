import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Flags from '@/components/StateCard/Flags';
import FlagsActivitie from '@/components/StateCard/FlagsActivitie';
import { StateCardProps } from '@/types/StateCardTypes';
import { styles } from '@/styles/StateCard/stateCardStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';

const StateCards: React.FC<StateCardProps> = ({
  colorFlag, textColor, date, hour, flags, activities, EmotionComponent, emotionProps, backgroundColor, customWidth, customHeight, description, id, onDelete
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  let mood;

  switch (backgroundColor) {
    case '#F9F4E2':
      colorFlag = '#FECD5D';
      textColor = '#000000';
      mood = "FELIZ";
      break;

    case '#8DAEEB':
      colorFlag = '#4B72FE';
      textColor = '#FFFFFF';
      mood = "TRISTE";
      break;

    case '#f9ac8c':
      colorFlag = '#FE814B';
      textColor = '#FFFFFF';
      mood = "ENOJADO";
      break;

    case '#E7C1FE':
      colorFlag = '#A44BFE';
      textColor = '#000000';
      mood = "ASUSTADO";
      break;

    case '#85E0A3':
      colorFlag = '#48F301';
      textColor = '#000000';
      mood = "ASQUEADO";
      break;

    case '#EAFAFF':
      colorFlag = '#C4D6FE';
      textColor = '#000000';
      mood = "NEUTRAL";
      break;

    default:
      mood = "DESCONOCIDO"; 
      break;
  }

  const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString + 'T' + timeString);
    const months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const day = date.getDate();
    const month = months[date.getMonth()];

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedDate = `${day} DE ${month}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return { date: formattedDate, time: formattedTime };
  };

  const { date: formattedDate, time: formattedTime } = formatDateTime(date, hour);

  const confirmDelete = async () => {
    try {
      await onDelete(id);
      setAlertVisible(false);
    } catch (error) {
      console.error('Error eliminando datos: ', error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { backgroundColor, width: customWidth, height: customHeight }]}>
          <View style={styles.left}>
            <EmotionComponent {...emotionProps} />
          </View>

          <View style={styles.right}>
            <View style={styles.title}>
              <Text style={{
                color: textColor,
                fontSize: 14,
              }}>TE SENTISTE {mood}</Text>
            </View>

            <View style={styles.emotions}>
              {flags.slice(0, 3).map((flag, index) => (
                <Flags key={index} flags={flag} flagColor={colorFlag} textColor={textColor} />
              ))}
            </View>

            <View style={styles.activities}>
              {activities.slice(0, 3).map((flag, index) => (
                <FlagsActivitie key={index} flags={flag.activity} flagColor={textColor} textColor={colorFlag} />
              ))}
            </View>

            <View style={styles.time}>
              <Text style={{
                color: textColor,
                fontSize: 14,
              }}>{formattedTime}</Text>
            </View>

          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor }]}>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor }]}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="times" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deleteButton, { backgroundColor }]}
              onPress={() => setAlertVisible(true)}
            >
              <Icon name="trash" size={28} color="white" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.modalBody}>
              <EmotionComponent {...emotionProps} />
              <Text style={[styles.modalText, { color: textColor, fontWeight: 'bold', fontSize: 24, marginTop: 5 }]}>TE SENTISTE {mood}</Text>
              <View style={styles.modalRow}>
                <Text style={[styles.modalText, { color: textColor, fontWeight: 'bold', fontSize: 17 }]}>Fecha: {formattedDate}</Text>
                <Text style={[styles.modalText, { color: textColor, fontWeight: 'bold', fontSize: 18 }]}>Hora: {formattedTime}</Text>
              </View>
              <View style={styles.modalRow}>
                <View style={styles.modalColumn}>
                  <Text style={[styles.modalText, { color: textColor, fontWeight: 'bold', fontSize: 18 }]}>Sentimientos:</Text>
                  <View style={styles.modalFlagsContainer}>
                    {flags.map((flag, index) => (
                      <Flags key={index} flags={flag} flagColor={colorFlag} textColor={textColor} />
                    ))}
                  </View>
                </View>
                <View style={styles.modalColumn}>
                  <Text style={[styles.modalText, { color: textColor, fontWeight: 'bold', fontSize: 18 }]}>Actividades:</Text>
                  <View style={styles.modalFlagsContainer}>
                    {activities.map((activity, index) => (
                      <FlagsActivitie key={index} flags={activity.activity} flagColor={textColor} textColor={colorFlag} />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={[styles.modalText, { color: textColor, fontWeight: 'bold', fontSize: 18 }]}>Descripción:</Text>
              <Text style={[styles.modalText, { color: textColor, marginBottom: 10 }]}>
                {description ? description : 'No hay descripción'}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <AwesomeAlert
        show={alertVisible}
        showProgress={false}
        title="Confirmación"
        message="¿Estás seguro que deseas eliminar esta selección?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Eliminar"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setAlertVisible(false)}
        onConfirmPressed={confirmDelete}
      />
    </>
  );
};

export default StateCards;

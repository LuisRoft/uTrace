import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Flags from '@/components/StateCard/Flags';
import { StateCardProps } from '@/types/StateCardTypes';
import { styles } from '@/styles/StateCard/stateCardStyles';

const StateCards: React.FC<StateCardProps> = ({
  colorFlag, textColor, date, hour, flags, activities, EmotionComponent, emotionProps, backgroundColor, customWidth, customHeight
}) => {

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
      mood = "DESCONOCIDO"; // Opcional: para manejar colores no especificados
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

  switch (backgroundColor) {
    case '#F9F4E2':
      colorFlag = '#FECD5D';
      textColor = '#000000';
      break;

    case '#8DAEEB':
      colorFlag = '#4B72FE';
      textColor = '#FFFFFF';
      break;

    case '#f9ac8c':
      colorFlag = '#FE814B';
      textColor = '#FFFFFF';
      break;

    case '#E7C1FE':
      colorFlag = '#A44BFE';
      textColor = '#FFFFFF';
      break;

    case '#85E0A3':
      colorFlag = '#48F301';
      textColor = '#000000';
      break;

    case '#EAFAFF':
      colorFlag = '#C4D6FE';
      textColor = '#000000';
      break;
  }

  return (
    <View style={[styles.container, { backgroundColor, width: customWidth, height: customHeight }]}>
      <View style={styles.left}>
        <EmotionComponent {...emotionProps} />
      </View>

      <View style={styles.right}>
        <View style={styles.title}>
          <Text style={
            {
              color: textColor,
              fontSize: 14,
            }
          }>TE SENTISTE {mood}</Text>
        </View>

        <View style={styles.emotions}>
          {flags.slice(0, 3).map((flag, index) => (
            <Flags key={index} flags={flag} flagColor={colorFlag} textColor={textColor} />
          ))}
        </View>

        <View style={styles.activities}>
          {activities.slice(0, 3).map((flag, index) => (
            <Flags key={index} flags={flag.activity} flagColor={textColor} textColor={colorFlag} />
          ))}
        </View>

        <View style={styles.time}>
          <Text style={
            {
              color: textColor,
              fontSize: 14,
            }
          }>{formattedTime}</Text>
        </View>

      </View>
    </View>
  );
};

export default StateCards;

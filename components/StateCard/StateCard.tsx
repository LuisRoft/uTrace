import { View, Text, Image } from 'react-native';
import { Flags } from '@/components/StateCard/Flags';
import { StateCardProps } from '@/types/StateCardTypes';
import { styles } from '@/styles/stateCardStyles';



export function StateCard ({ color, imageUrl, emotion, description, date, flags } : StateCardProps) {
  return (
    <View style={[styles.container, { backgroundColor: color }]} >
      <View style={styles.content}>
        <Image source={imageUrl} style={styles.image} />
        <View style={styles.cardDescription}>
          <Text style={styles.emotion}>{emotion}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View style={styles.flags}>
        {flags.map((flag, index) => (
          <Flags key={index} flags={flag} />
        ))}
      </View>
    </View>
  );
};




import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Flags from '@/components/State_card/Flags';


interface CardProps {
  color: string;
  imageUrl: string;
  emotion: string;
  description: string;
  date: string;
  flags: Array<string>;
}

export const StateCard: React.FC<CardProps> = ({ color, imageUrl, emotion, description, date, flags }) => {
  return (
    <View style={{
      backgroundColor: color,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 19.2, 
      elevation: 3,
      margin: 6.4, 
      overflow: 'hidden',
      maxWidth: 400,
    }}>
      <View style={styles.content}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.cardDescripcion}>
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

const styles = StyleSheet.create({

  content: {
    padding: 6.4,
    fontSize: 8.96, 
    gap: 32, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 96, 
    height: 96,
  },
  emotion: {
    fontSize: 19.2, // 20% menos de 24
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12.8, // 20% menos de 16
    color: '#000',
  },
  date: {
    fontSize: 12.8, // 20% menos de 16
    color: '#000',
    fontWeight: 'bold'
  },
  cardDescripcion: {
    flexDirection: 'column',
    gap: 6.4, // 20% menos de 8
    padding: 6.4, // 20% menos de 8
    width: 128, // 20% menos de 160
  },
  flags: {
    margin: 6.4, // 20% menos de 8// 20% menos de 8
    fontSize: 8.96, // 20% menos de 11.2
    gap: 12.8, // 20% menos de 16
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12.8, // 20% menos de 16
    width: 96, // 20% menos de 120
  },
});



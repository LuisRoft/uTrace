import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Flags from '@/components/State_card/Flags';


interface CardProps {
  imageUrl: string;
  emotion: string;
  description: string;
  date: string;
}

export const StateCard: React.FC<CardProps> = ({ imageUrl, emotion, description, date}) => {
  return (
    <View style={styles.card}>
        <View style={styles.content}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.cardDescripcion}>
            <Text style={styles.emotion}>{emotion}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.date}>{date}</Text>
            </View>
      </View>
      <View style={styles.flags}>
        <Flags flags='Nostalgico'></Flags>
        <Flags flags='Felicidad'></Flags>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: '#E2C9FC',
    elevation: 3,
    margin: 10,
    overflow: 'hidden',
    maxWidth: 700,
  },
  content:{
    padding: 10,
    fontSize: 14,
    flexDirection: 'row',
    gap: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
image: {
    borderWidth: 20,
    borderColor: '#fff',
    borderRadius: 100,
    width: 200,
    height: 200,
    backgroundColor: 'blue',
},
  emotion: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: { 
        fontSize: 20,
        color: '#000',
    },
  date: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  },
    cardDescripcion: {
        flexDirection: 'column',
        gap: 10,
        padding: 10,
        width: 200,
    },
  flags: {
    margin: 10,
    padding: 10,
    fontSize: 14,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 150,
},
});



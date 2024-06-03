import React, { useState } from 'react';
import { Image, TouchableOpacity, ScrollView, View, TextInput } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '@/styles/emotionsStyles';
import { EmotionButtonContainer } from '@/components/EmotionButtonContainer';
import { EmotionButton } from '@/types/EmotionButtonTypes';
import { Images } from '@/constants/Images';

const emotionButtons: EmotionButton[][] = [
  ['Feliz', 'Emocionado', 'Vigoroso'],
  ['Alegre', 'Ambicioso', 'Triste'],
  ['Alegre', 'Triste', 'Emocionado'],
];

const images: number[] = [
  Images.happy, Images.angry, Images.sad
];

export default function Emotions() {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const goToPreviousImage = () => {
    setCurrentImage(prevIndex => Math.max(0, prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImage(prevIndex => Math.min(images.length - 1, prevIndex + 1));
  };

  return (
    <ThemedView style={styles.container} darkColor="#FFF">
      <View style={styles.content}>
        <ThemedText type="subtitle" darkColor="#000" style={styles.title}>
          Hoy
        </ThemedText>
        <TouchableOpacity onPress={() => {}}>
          <Image source={images[currentImage]} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={goToPreviousImage}>
            <Icon name="arrow-left" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextImage}>
            <Icon name="arrow-right" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.iconsContainer}>
          <EmotionButtonContainer emotionButtons={emotionButtons} />
        </ScrollView>
        <View style={styles.descriptionContainer}>
          <ThemedText>Descripción</ThemedText>
          <TextInput
            style={styles.textInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Escribe tu descripción aquí..."
            placeholderTextColor="#888"
            multiline
          />
        </View>
      </View>
    </ThemedView>
  );
}

import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, View, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '@/styles/emotionsStyles';
import EmotionButtonContainer from '@/components/EmotionButtonContainer';
import { emotions } from '@/components/Emotions';

const Emotions: React.FC = () => {
  const [currentEmotion, setCurrentEmotion] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const goToPreviousEmotion = () => {
    setCurrentEmotion(prevIndex => Math.max(0, prevIndex - 1));
  };

  const goToNextEmotion = () => {
    setCurrentEmotion(prevIndex => Math.min(emotions.length - 1, prevIndex + 1));
  };

  const { image: EmotionImage, buttons, backgroundColor, containerBackgroundColor } = emotions[currentEmotion];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.constainerKeyBoard}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={[styles.container, {backgroundColor}]}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <ThemedText type="subtitle" darkColor="#000" style={styles.title}>
                Hoy
              </ThemedText>
              <TouchableOpacity onPress={() => {}}>
                <EmotionImage style={styles.image} />
              </TouchableOpacity>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={goToPreviousEmotion}>
                  <Icon name="arrow-left" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToNextEmotion}>
                  <Icon name="arrow-right" size={30} color="#000" />
                </TouchableOpacity>
              </View>
              <EmotionButtonContainer emotionButtons={buttons} containerBackgroundColor={containerBackgroundColor} />
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={[styles.descriptionContainer, { backgroundColor: containerBackgroundColor }]}>
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
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Emotions;

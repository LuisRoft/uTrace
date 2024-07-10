import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, View, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '@/styles/Emotions/emotionsStyles';
import EmotionButtonContainer from '@/components/Emotions/EmotionButtonContainer';
import ActivityButtonContainer from '@/components/Emotions/ButtonActivityContainer';
import { emotions } from '@/components/Emotions/Emotions';
import activities from '@/constants/activities';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { ref, push } from 'firebase/database';
import { useAuth } from '@/hooks/useAuth';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Emotions: React.FC = () => {
  const [currentEmotion, setCurrentEmotion] = useState<number>(0);
  const [selectedEmotionButtons, setSelectedEmotionButtons] = useState<string[]>([]);
  const [selectedActivityButtons, setSelectedActivityButtons] = useState<string[]>([]);
  const { user } = useAuth();
  const translateX = useSharedValue(0);

  const goToPreviousEmotion = () => {
    translateX.value = withSpring(SCREEN_WIDTH);
    setTimeout(() => {
      setCurrentEmotion(prevIndex => (prevIndex === 0 ? emotions.length - 1 : prevIndex - 1));
      translateX.value = withSpring(0);
    }, 200);
  };

  const goToNextEmotion = () => {
    translateX.value = withSpring(-SCREEN_WIDTH);
    setTimeout(() => {
      setCurrentEmotion(prevIndex => (prevIndex === emotions.length - 1 ? 0 : prevIndex + 1));
      translateX.value = withSpring(0);
    }, 200);
  };

  const handleEmotionButtonPress = (buttonLabel: string) => {
    setSelectedEmotionButtons(prevState =>
      prevState.includes(buttonLabel) ? prevState.filter(label => label !== buttonLabel) : [...prevState, buttonLabel]
    );
  };

  const handleActivityButtonPress = (buttonLabel: string) => {
    setSelectedActivityButtons(prevState =>
      prevState.includes(buttonLabel) ? prevState.filter(label => label !== buttonLabel) : [...prevState, buttonLabel]
    );
  };

  const handleSave = async () => {
    const currentEmotionData = emotions[currentEmotion];
    const data = {
      userId: user?.userId,
      selectedEmotion: currentEmotion,
      selectedEmotionButtons,
      selectedActivityButtons,
      date: new Date().toISOString(),
      backgroundColor: currentEmotionData.backgroundColor,
      containerBackgroundColor: currentEmotionData.containerBackgroundColor,
    };

    try {
      await push(ref(FIREBASE_DB, 'userSelections'), data);
      Alert.alert('Éxito', 'Datos guardados correctamente');
    } catch (error) {
      console.error('Error guardando datos: ', error);
      Alert.alert('Error', 'No se pudieron guardar los datos');
    }
  };

  const { image: EmotionImage, buttons, backgroundColor, containerBackgroundColor } = emotions[currentEmotion];
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.constainerKeyBoard}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <ThemedView style={[styles.container, { backgroundColor }]}>
          <View style={styles.content}>
            <ThemedText type="subtitle" darkColor="#000" style={styles.title}>
              Hoy
            </ThemedText>
            <Animated.View style={[styles.animatedContainer, animatedStyle]}>
              <TouchableOpacity onPress={() => { }}>
                <EmotionImage style={styles.image} />
              </TouchableOpacity>
            </Animated.View>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={goToPreviousEmotion}>
                <Icon name="arrow-left" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={goToNextEmotion}>
                <Icon name="arrow-right" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <EmotionButtonContainer
              emotionButtons={buttons}
              containerBackgroundColor={containerBackgroundColor}
              onButtonPress={handleEmotionButtonPress}
              selectedButtons={selectedEmotionButtons}
            />
            <ActivityButtonContainer
              activityButtons={activities}
              containerBackgroundColor={containerBackgroundColor}
              onButtonPress={handleActivityButtonPress}
              selectedButtons={selectedActivityButtons}
            />
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: containerBackgroundColor }]} onPress={handleSave}>
              <ThemedText style={styles.saveButtonText}>Guardar</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Emotions;

import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../../styles/Emotions/emotionsStyles";


interface RoundButtonProps {
    onPress: () => void;
    color: string;
  }
  
  const ButtonAdd: React.FC<RoundButtonProps> = ({ onPress, color }) => {
    
    return (
      <TouchableOpacity  onPress={onPress}>
        <View style={styles.plusContainer}>
          <Text style={[styles.plusText, {color}]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  };

export default ButtonAdd;
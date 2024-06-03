import { InputFormProps } from "@/types/InputFormTypes";
import { TextInput } from "react-native";
import { styles } from "@/styles/inputFormStyles";

export function InputForm({ placeholder} : InputFormProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder= {placeholder}
      underlineColorAndroid="transparent"
      placeholderTextColor="#999999"
      
    />
  );
}

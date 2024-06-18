import { InputFormProps } from "@/types/InputFormTypes";
import { TextInput } from "react-native";
import { styles } from "@/styles/inputFormStyles";

export function InputForm({style,...rest} : InputFormProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      underlineColorAndroid="transparent"
      placeholderTextColor="#999999"
      {...rest}
      
    />
  );
}

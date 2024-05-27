import { View, StyleSheet, TextInput } from "react-native";


export type InputFormProps = {
  placeholder: string;
};

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

const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: 16,
    color: '#333333',  
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 8,  
  },
});

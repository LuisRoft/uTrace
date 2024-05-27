import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native';

export type ButtonFormProps = TouchableOpacityProps & {
    text: string;
};
export function ButtonForm({ text, ...rest }: ButtonFormProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native';
import { ThemedText } from './ThemedText';

export type ButtonFormProps = TouchableOpacityProps & {
    text: string;
};
export function ButtonForm({ text, ...rest }: ButtonFormProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <ThemedText style={styles.buttonText}>{text}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Blinker-Bold',
    fontSize: 19,
    textAlign: 'center',
  },
});

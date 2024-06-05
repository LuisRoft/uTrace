import { type TextInputProps } from "react-native";

export type InputFormProps = TextInputProps & {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
  };
  
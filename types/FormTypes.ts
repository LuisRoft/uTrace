import { type ViewProps } from "react-native";
import { InputFormProps } from "./InputFormTypes";

export type FormProps = ViewProps & {
    fields: InputFormProps[];
    buttonText: string;
    handleClick: () => void;
  }
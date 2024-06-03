import { View } from "react-native";
import { InputForm } from "./InputForm";
import { ButtonForm } from "./ButtonForm";
import { styles } from '@/styles/formStyles';
import { FormProps } from "@/types/FormTypes";
import { ThemedText } from "./ThemedText";


export function Form ({ fields, style, handleClick, buttonText, children}: FormProps ) {
    return (
    <View style={[styles.form, style]}>
        <ThemedText style={styles.subtitle}type="subtitle" darkColor="#000">{children}</ThemedText>
        {fields.map((field, index) => (
            <InputForm  key={index} placeholder={field.placeholder} />
        ))}
        <ButtonForm text={buttonText} style={styles.formButton} onPress={handleClick} />        
      </View>
    );
}
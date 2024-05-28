import { ButtonForm } from "@/components/ButtonForm";
import { InputForm } from "@/components/InputForm";
import { LineSeparator } from "@/components/LineSeparator";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { View } from "react-native";

export default function Login() {
  const handleLogin = () => {
    router.push('(tabs)');
  };
  
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 35, width: '100%'}} darkColor="#FFF" >
      <ThemedText type="superTitle" darkColor="#000">¡Hola Bienvenido!</ThemedText>
      <View style={{ width: '100%', marginTop: 80, alignItems: "center"}}>
        <InputForm placeholder="Correo Electronico"/>
        <InputForm placeholder="Contraseña"/>
        <ButtonForm text="Iniciar Sesion" onPress={handleLogin}/>
        <LineSeparator/>  
      </View>
    </ThemedView>
  );
}

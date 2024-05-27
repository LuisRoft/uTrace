import { ButtonForm } from "@/components/ButtonForm";
import { InputForm } from "@/components/InputForm";
import { LineSeparator } from "@/components/LineSeparator";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

export default function Login() {
  const handleLogin = () => {
    router.push('(tabs)');
  };
  
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 35}} darkColor="#FFF" >
      <ThemedText type="title" darkColor="#000"> ¡Hola Bienvenido!</ThemedText>
      <InputForm placeholder="Correo Electronico"/>
      <InputForm placeholder="Contraseña"/>
      <ButtonForm text="Iniciar Sesion" onPress={handleLogin}/>
      <LineSeparator/>  
    </ThemedView>
  );
}

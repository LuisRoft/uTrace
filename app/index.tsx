import { ButtonForm } from "@/components/ButtonForm";
import { LineSeparator } from "@/components/LineSeparator";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Form } from "@/components/Form";
import { Image, View, useWindowDimensions } from "react-native";
import { Images } from "@/constants/Images";
const fields = [
  {placeholder: 'Correo Electronico'},
  {placeholder: 'Contraseña'}
];

export default function Login() {
  const { width: windowWidth } = useWindowDimensions();

  const handleLogin = () => {
    router.push('(tabs)');
  };
  
  const handleRegister = () => {
    router.push('register');
  };  

  return (
    <ThemedView darkColor="#FFF" style={{alignItems:"center", justifyContent:"center"}}>
      <View style={{alignSelf:"flex-start"}}>
        <Image source={Images.welcome} style={{height:150, width:Math.min(Math.max(250, windowWidth * 0.8), 480)}} resizeMode="contain"/>
      </View>
      <Form handleClick={handleLogin} buttonText="Iniciar Sesion" fields={fields} style={{marginBottom:30}}>Ingresa tu cuenta</Form>
      <LineSeparator/> 
      <ThemedText style={{fontSize:18}} darkColor="#000">¿No tienes cuenta?</ThemedText>
      <ButtonForm text="Registrate" onPress={handleRegister} style={{marginTop:30}}/>
    </ThemedView>
  );
}



import { ButtonForm } from "@/components/ButtonForm";
import { LineSeparator } from "@/components/LineSeparator";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Alert, Image, KeyboardAvoidingView, View, useWindowDimensions } from "react-native";
import { Images } from "@/constants/Images";
import { styles } from "@/styles/formStyles";
import { InputForm } from "@/components/InputForm";
import { useState } from "react";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const { width: windowWidth } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const singIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      console.log(response)
      router.push('(tabs)');
    } catch (error: any) {
      console.log(error)
      Alert.alert('Sign in failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async () => {
    await singIn()
  }
  
  const handleRegister = () => {
    router.push('register');
  };  

  return (
    <ThemedView darkColor="#FFF" style={{alignItems:"center", justifyContent:"center"}}>
      <View style={{alignSelf:"flex-start"}}>
        <Image source={Images.welcome} style={{height:150, width:Math.min(Math.max(250, windowWidth * 0.8), 480)}} resizeMode="contain"/>
      </View>
      <View style={[styles.form, {marginBottom:30}]}>
        <ThemedText style={styles.subtitle}type="subtitle" darkColor="#000">Ingresa tus datos</ThemedText>
        <KeyboardAvoidingView behavior="padding" style={{width:"100%"}}>
          <InputForm placeholder="Correo" value={email} onChangeText={setEmail} style={{marginBottom:40}}/>
          <InputForm placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry={true}/>
        </KeyboardAvoidingView>
        <ButtonForm text="Inicia Sesion" style={styles.formButton} onPress={handleLogin}/>        
      </View>
      <LineSeparator/> 
      <ThemedText style={{fontSize:18}} darkColor="#000">¿No tienes cuenta?</ThemedText>
      <ButtonForm text="Registrate" onPress={handleRegister} style={{marginTop:30}}/>
    </ThemedView>
  );
}



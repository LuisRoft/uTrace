import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useState } from "react";
import { styles } from "@/styles/formStyles";
import { Alert, KeyboardAvoidingView, View } from "react-native";
import { InputForm } from "@/components/InputForm";
import { ButtonForm } from "@/components/ButtonForm";
import { createUser, saveUser } from '@/services/RegisterService';

// Rules for Email and Password
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRegister = async () => {
    // Verification of the fields is not empty
    if (!name || !surname || !email || !password) {
      setError("Todos los campos son obligatorios");
    }
    // Verify the email Regex
    if (!emailRegex.test(email)) {
      setEmailError("Correo electrónico inválido");
      return;
    } 
    // Verify the password Regex
    if (!passwordRegex.test(password)) {
      setPasswordError("La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número");
      return;
    } 
    // try to create the user and save it
    try {
      setLoading(true); 
      await createUser(email, password, name, surname); // Create the user in Authentication Services in Firebase
      router.push("/");
    } catch (error:any) {
      setError("Hubo un error al crear la cuenta. Por favor, inténtalo de nuevo");
    } finally {
      setLoading(false); 
    }
  }
    
  return (
    <ThemedView style={{alignItems:"center", justifyContent:"center"}} darkColor="#FFF" >
      <ThemedText type="superTitle" darkColor="#000" style={{fontFamily: 'Blinker-Bold', alignSelf:"baseline"} }>Registrate!</ThemedText>
      <View style={[styles.form, {marginBottom:30}]}>
        <ThemedText style={styles.subtitle}type="subtitle" darkColor="#000">Crea tu cuenta</ThemedText>
        <KeyboardAvoidingView behavior="padding" style={{width:"100%"}}>
          <InputForm placeholder="Nombre" value={name} onChangeText={setName} style={{marginBottom:30}}/>
          <InputForm placeholder="Apellido" value={surname} onChangeText={setSurname} style={{marginBottom:30}}/>
          <InputForm placeholder="Correo" value={email} onChangeText={setEmail}/>
          {emailError ? <ThemedText style={styles.error}>{emailError}</ThemedText> : null}
          <InputForm placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry={true} style={{marginTop:30}}/>
          {passwordError ? <ThemedText style={styles.error}>{passwordError}</ThemedText> : null}
        </KeyboardAvoidingView>
        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        <ButtonForm text="Registrate" style={styles.formButton} onPress={handleRegister} />        
      </View>
    </ThemedView>
  );
}

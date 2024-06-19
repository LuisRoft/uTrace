import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
import { ref, set } from 'firebase/database'
import { styles } from "@/styles/formStyles";
import { Alert, KeyboardAvoidingView, ScrollViewBase, View, ScrollView } from "react-native";
import { InputForm } from "@/components/InputForm";
import { ButtonForm } from "@/components/ButtonForm";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

  const auth = FIREBASE_AUTH;

  const saveUser = async (user: any) => {
    const db = FIREBASE_DB;
    await set(ref(db, 'users/' + user.uid), {
      name,
      surname,
      email,
      password
    });
  }

  const createUser = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      console.log(response)
      await saveUser(response.user)
      router.push('/');
    } catch (error: any) {
      console.log(error)
      Alert.alert('Sign in failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  
  const handleRegister = async () => {
    if (!name || !surname || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    } 

    if(!emailRegex.test(email) && !passwordRegex.test(password)) {
      setEmailError("Correo electrónico inválido");
      setPasswordError("La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número");
      return
    } 

    if (!emailRegex.test(email)) {
      setEmailError("Correo electrónico inválido");
      return;
    } 

    if (!passwordRegex.test(password)) {
      setPasswordError("La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número");
      return;
    } 

    await createUser();
    
  };    

  return (
    <ThemedView style={{alignItems:"center", justifyContent:"center"}} darkColor="#FFF" >
      <ScrollView style={{width:"100%"}}>
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
      </ScrollView>
    </ThemedView>
  );
}

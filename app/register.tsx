import { ButtonForm } from "@/components/ButtonForm";
import { InputForm } from "@/components/InputForm";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function Login() {
  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 35, width: '100%'}} darkColor="#FFF" >
      <ThemedText type="superTitle" darkColor="#000">Registrate!</ThemedText>
      <View style={{ width: '100%', marginTop: 70, alignItems: "center"}}>
        <ThemedText style={styles.subTitle} type="subtitle" darkColor="#000">Crea tu cuenta</ThemedText>
        <InputForm placeholder="Correo Electronico"/>
        <InputForm placeholder="Contraseña"/>
        <InputForm placeholder="Confirmar contraseña"/>
      </View>
      <ButtonForm text="Registrarse" onPress={handleBack}/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
});

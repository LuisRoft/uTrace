import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { Button, View } from "react-native";

export default function Login() {
  const handleLogin = () => {
    router.push('(tabs)');
  };
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <ThemedText type='title'>Hola</ThemedText>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

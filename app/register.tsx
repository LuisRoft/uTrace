import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Form } from "@/components/Form";

const fields = [
  { placeholder: "Nombre" },
  { placeholder: "Apellido" },
  { placeholder: "Correo" },
  { placeholder: "Contraseña" },
  { placeholder: "Confirmar contraseña" },
];

export default function Register() {
  const handleBack = () => {
    router.push("/");
  };

  return (
    <ThemedView style={{alignItems:"center", justifyContent:"center"}} darkColor="#FFF" >
      <ThemedText type="superTitle" darkColor="#000" style={{fontFamily: 'Blinker-Bold', alignSelf:"baseline"} }>Registrate!</ThemedText>
      <Form handleClick={handleBack} buttonText="Registrarme" fields={fields}>Ingresa tus datos</Form>
    </ThemedView>
  );
}

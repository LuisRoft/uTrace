import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View, TextInput, Alert} from "react-native";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, Octicons } from "@expo/vector-icons";
import { LineSeparator } from "@/components/LineSeparator";
import { Images } from "@/constants/Images";
import { Loading } from "@/components/Loading";
import CustomKeyBoardView from "@/components/CustomKeyBoardView";
import { useAuth } from "@/hooks/useAuth";


export default function SignUp() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(false);
  const {register} = useAuth();


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert('Sign Up', "Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    let response = await register({
      email: emailRef.current,
      password: passwordRef.current,
      username: usernameRef.current
    });
    setLoading(false);

    console.log('results:', response);
    if (response.success) {
      Alert.alert('Sign Up', 'Correo de verificación enviado, revisa tu correo.');
      router.push('/signIn'); // Navigate to the EmailVerification screen
    } else {
      Alert.alert('Sign Up', response.msg);
    }
  }



  return (
    <CustomKeyBoardView >
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: wp(5), paddingTop:hp(3)}} className="flex-1 justify-start">
        <View className="self-start h-fit">
          <Image source={Images.welcome} resizeMode="contain" style={{width: wp(90)}}/>
        </View>
        <View>
          <Text style={{ fontSize: hp(2.5) }} className="font-medium tracking-wider">Crea tu cuenta</Text>

          <View className="gap-5 mt-2 ">
            <View style={{ height: (hp(7)) }} className="flex-row items-center rounded-xl border-black border-[1px] gap-x-4" >
              <Feather name="user" size={hp(2.7)} color="black" />
              <TextInput
                placeholder="Username"
                style={{ fontSize: hp(2) }}
                className="flex-1"
                placeholderTextColor={'gray'}
                onChangeText={(text) => usernameRef.current = text}
              />
            </View>
            <View style={{ height: (hp(7)) }} className="flex-row items-center rounded-xl border-black border-[1px] gap-x-4" >
              <Octicons name="mail" size={hp(2.7)} color="black" />
              <TextInput
                placeholder="Correo"
                style={{ fontSize: hp(2) }}
                className="flex-1"
                placeholderTextColor={'gray'}
                onChangeText={(text) => emailRef.current = text}
              />
            </View>
            <View style={{ height: (hp(7)) }} className="flex-row items-center rounded-xl border-black border-[1px] gap-x-4">
              <Octicons name="lock" size={hp(2.7)} color="black" />
              <TextInput
                placeholder="Contraseña"
                style={{ fontSize: hp(2) }}
                className="flex-1"
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor={'gray'}
                onChangeText={(text) => {
                  passwordRef.current = text
                  setIsIconVisible(text.length > 0)
                }}
              />
              { isIconVisible ? (
                  <TouchableOpacity onPress={togglePasswordVisibility} style={{ padding: hp(2) }}>
                    <Octicons
                      name={isPasswordVisible ? "eye" : "eye-closed"}
                      size={hp(2.7)}
                    />
                  </TouchableOpacity> ) : null
                }
            </View>
            <View className="items-center">
              {
                loading ? (
                  <View className="flex-row justify-center" style={{ marginBottom: hp(2) }}>
                    <Loading size={hp(10)} />
                  </View>
                ) : (
                  <TouchableOpacity style={{ height: hp(8), marginTop: hp(2), marginBottom: hp(5) }} className="flex-row rounded-full border-black border-[1px] justify-center items-center w-2/3"
                    onPress={handleRegister}>
                    <Text style={{ fontSize: hp(2.7) }} className="text-black font-bold tracking-wider">
                      Registrarse
                    </Text>
                  </TouchableOpacity>
                )
              }
              <LineSeparator />
              <View className="items-center flex-row gap-1">
                <Text style={{ fontSize: hp(2) }} className="text-center">¿Ya tienes cuenta creada?</Text>
                <TouchableOpacity onPress={() => router.push('signIn')}>
                  <Text style={{ fontSize: hp(2) }} className="text-center font-bold">Inicia Sesion</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>
      </View>
    </CustomKeyBoardView>
  );
}

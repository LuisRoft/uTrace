import { router } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Images } from "@/constants/Images";
import { useRef, useState } from "react";
import { Loading } from "@/components/Loading";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { LineSeparator } from "@/components/LineSeparator";
import { useAuth } from "@/hooks/useAuth";
import CustomKeyBoardView from "@/components/CustomKeyBoardView";

export default function SignIn() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {login} = useAuth();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', "Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    const response = await login({
      email: emailRef.current,
      password: passwordRef.current
    })
    setLoading(false);

    if(!response.success) Alert.alert('Sign In', response.msg)
  }

  return (
    <CustomKeyBoardView>
      <StatusBar style="dark"/>      
      <View style={{paddingHorizontal:wp(5)}} className="flex-1 justify-center">
        <View className="self-start h-auto">
          <Image source={Images.welcome} resizeMode="contain" style={{width: wp(90)}}/>
        </View>
        <View>
          <Text style={{fontSize: hp(2.5)}} className="font-medium tracking-wider">Ingresa tus datos</Text>

          <View className="gap-5 mt-2">
            <View style={{height:(hp(7))}} className="flex-row items-center rounded-xl border-black border-[1px] gap-x-4" >
              <Octicons name="mail"  size={hp(2.7)}color="black" />
              <TextInput 
                placeholder="Correo"  
                style={{fontSize: hp(2)}}
                className="flex-1"
                placeholderTextColor={'gray'}
                onChangeText={(text) => emailRef.current = text}
              />
            </View>
            <View style={{paddingLeft:wp(4)}}>
              <View style={{height:(hp(7)), position:"relative"}} className="flex-row items-center rounded-xl border-black border-[1px] gap-x-4">
                <Octicons name="lock"  size={hp(2.7)} color="black" />
                <TextInput 
                  placeholder="Contraseña"  
                  style={{fontSize: hp(2)}}
                  className="flex-1"
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor={'gray'}
                  onChangeText={(text) => passwordRef.current = text}
                />                    
                <TouchableOpacity onPress={togglePasswordVisibility} style={{ padding: hp(1.5) }}>
                  <Octicons
                    name={isPasswordVisible ? "eye" : "eye-closed"}
                    size={hp(2.7)}
                  />
                </TouchableOpacity>
              </View>
              <Text style={{fontSize: hp(1.8)}} className="text-right mt-2">Olvidaste tu contraseña?</Text>
            </View>
            <View className="items-center">
              {
                loading ? (
                  <View className="flex-row justify-center">
                    <Loading size={hp(10)}/>
                  </View>
                ): (
                  <TouchableOpacity style={{height: hp(8), marginBottom:hp(5)}} className="flex-row rounded-full border-black border-[1px] justify-center items-center w-2/3"
                  onPress={handleLogin}>
                    <Text style={{fontSize: hp(2.5)}} className="text-black font-bold tracking-wider">
                      Iniciar Sesion 
                    </Text>
                  </TouchableOpacity>        
                )
              }
              <LineSeparator />  
              <View className="items-center flex-row gap-1">
                <Text style={{fontSize: hp(2)}} className="text-center">¿No tienes cuenta?</Text>
                <TouchableOpacity onPress={() => router.push('signUp')}>
                  <Text style={{fontSize: hp(2)}} className="text-center font-bold">Registrate</Text>
                </TouchableOpacity>
              </View>

            </View> 
          </View>
        </View>
      </View>
    </CustomKeyBoardView>
  );
}




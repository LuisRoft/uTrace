import { useEffect } from 'react';
import { useFonts } from "expo-font";
import { Fonts } from "@/constants/Fonts";
import * as SplashScreen from 'expo-splash-screen';
import MainLayout from '@/components/MainLayout';
import { AuthContextProvider } from '@/context/authContext';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [loaded] = useFonts(Fonts);
    useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);
  
    if (!loaded) {
      return null;
    }
    
    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    );
}

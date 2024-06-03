import { StyleSheet } from "react-native";

export const styles = StyleSheet.create ({

    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 19.2, 
      elevation: 3,
      margin: 6.4, 
      overflow: 'hidden',
      maxWidth: 400,
    },
  
    content: {
      padding: 6.4,
      fontSize: 8.96, 
      gap: 32, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 96, 
      height: 96,
    },
    emotion: {
      fontSize: 19.2, // 20% menos de 24
      fontWeight: 'bold',
    },
    description: {
      fontSize: 12.8, // 20% menos de 16
      color: '#000',
    },
    date: {
      fontSize: 12.8, // 20% menos de 16
      color: '#000',
      fontWeight: 'bold'
    },
    cardDescription: {
      flexDirection: 'column',
      gap: 6.4, // 20% menos de 8
      padding: 6.4, // 20% menos de 8
      width: 128, // 20% menos de 160
    },
    flags: {
      margin: 6.4, // 20% menos de 8// 20% menos de 8
      fontSize: 8.96, // 20% menos de 11.2
      gap: 12.8, // 20% menos de 16
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12.8, // 20% menos de 16
      width: 96, // 20% menos de 120
    },
  });
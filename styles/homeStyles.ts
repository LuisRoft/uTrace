import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    cardContent: {
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'visible'
    },
    containerHome: {
      flex: 1,
      backgroundColor: 'white',
      padding: 20,
    },
    textHome: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    header: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      marginBottom: 30,
    },
    iconTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    settingsIcon: {
      width: 25,
      height: 25,
    },
  });
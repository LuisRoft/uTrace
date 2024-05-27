import { StyleSheet, View } from 'react-native';

export function LineSeparator() {
    return <View style={styles.line} />;
}

const styles = StyleSheet.create({
    line: {
      height: 1,
      width: '100%',
      backgroundColor: '#000',
      marginVertical: 20,
    },
  });
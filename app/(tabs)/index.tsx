import { StateCard } from '@/components/State_card/StateCard';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.containerHome}>      
      <Text style={styles.textHome}>Registro de hoy</Text>
      <StateCard 
                color='#3f9'
                imageUrl="/assets/images/enojado.png"
                emotion="Feliz"
                description="Description"
                date="fecha"
                flags={["flag", "flag2", "flag3"]}
            />
    </View>
  )
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
  },
  textHome:{
    fontWeight: 'bold',
    fontSize: 20,
  }
});
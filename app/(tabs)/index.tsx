import { StateCard } from '@/components/State_card/StateCard';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Home() {

  const images: number[] = [
    require('../../assets/images/facehappy.png'),
    require('../../assets/images/settings.png'),
  ];

  const listCards = [
    {
      color: '#FE814B',
      imageUrl: "/assets/images/enojado.png",
      emotion: "Reunión",
      description: "Reunión para desarrollar la aplicación (Sale mal)",
      date: "28 de Mayo 2024",
      flags: ["Impotente", "Estresado"]
    },
    {
      color: '#8DAEEB',
      imageUrl: "/assets/images/triste.png",
      emotion: "Ver mis notas",
      description: "Me saque cero en todo por vagoneta",
      date: "28 de Mayo 2024",
      flags: ["Resentido", "Impotente", "Inconforme"]
    },
  ];


  return (
    <View style={styles.containerHome}>
      <View style={styles.header}>
        <View style={styles.iconTextContainer}>
          <Image source={images[0]} style={styles.icon} />
          <Text style={styles.text}>Hola, Luis!</Text>
        </View>
        <View>
          <Image source={images[1]} style={styles.settingsIcon} />
        </View>
      </View>
      <Text style={styles.textHome}>Registro de hoy</Text>
      <View style={styles.cardContent}>
        {listCards.map((card, index) => (
          <StateCard key={index} color={card.color} imageUrl={card.imageUrl} emotion={card.emotion} description={card.description} date={card.date} flags={card.flags} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
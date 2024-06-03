import { StateCard } from '@/components/StateCard/StateCard';
import { View, Text, Image } from 'react-native';
import { styles } from '@/styles/homeStyles';
import { Images } from '@/constants/Images';

const listCards = [
  {
    color: '#FE814B',
    imageUrl: Images.angry,
    emotion: "Reunión",
    description: "Reunión para desarrollar la aplicación (Sale mal)",
    date: "28 de Mayo 2024",
    flags: ["Impotente", "Estresado"]
  },
  {
    color: '#8DAEEB',
    imageUrl: Images.sad,
    emotion: "Ver mis notas",
    description: "Me saque cero en todo por vagoneta",
    date: "28 de Mayo 2024",
    flags: ["Resentido", "Impotente", "Inconforme"]
  },
];

export default function Home() {
  return (
    <View style={styles.containerHome}>
      <View style={styles.header}>
        <View style={styles.iconTextContainer}>
          <Image source={Images.happy} style={styles.icon} />
          <Text style={styles.text}>Hola, Luis!</Text>
        </View>
        <View>
          <Image source={Images.settings} style={styles.settingsIcon} />
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
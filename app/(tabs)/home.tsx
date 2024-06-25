import { StateCard } from '@/components/StateCard/StateCard';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '@/styles/homeStyles';
import { Images } from '@/constants/Images';
import { useAuth } from '@/hooks/useAuth';

const listCards = [
  {
    color: '#FEEBC1',
    colorFlag: '#FECD5D',
    textColor: '#000',
    date: "29 DE MAYO",
    hour: "10:00 AM",
    imageUrl: Images.happy,
    emotion: "FELIZ",
    flags: ["Agradable", "Reconfortante", "Divertido", "Inspirador", "Motivado"],
    activities: [
      {
        activity: "Salida con Luis",
        cost: 5
      },
      {
        activity: "Salida con Byron",
        cost: 5
      },
      {
        activity: "Salida con Stiven",
        cost: 5
      },
      {
        activity: "Salida con Jose",
        cost: 5
      },
      {
        activity: "Salida con Zea",
        cost: 5
      },
      {
        activity: "Salida con Caro",
        cost: 5
      },
    ],
  },
  {
    color: '#8CBEF9',
    colorFlag: '#4B72FE',
    textColor: '#FFF',
    date: "29 DE MAYO",
    hour: "10:00 AM",
    imageUrl: Images.sad,
    emotion: "TRISTE",
    flags: ["Resentido", "Desagradable", "Incomodo", "Desmotivado"],
    activities: [
      {
        activity: "Encebollado",
        cost: 2
      },
      {
        activity: "Salida con Luis",
        cost: 5
      },
      {
        activity: "Salida con Byron",
        cost: 5
      },
    ],
  },
  {
    color: '#B2FFBA',
    colorFlag: '#48F400',
    textColor: '#000',
    date: "29 DE MAYO",
    hour: "10:00 AM",
    imageUrl: Images.disgust,
    emotion: "ASQUEADO",
    flags: ["Resentido", "Desagradable", "Incomodo", "Desmotivado"],
    activities: [
      {
        activity: "Encebollado",
        cost: 2
      },
      {
        activity: "Salida con Luis",
        cost: 5
      },
      {
        activity: "Salida con Byron",
        cost: 5
      },
    ],
  },
];

export default function Home() {
  const {logout, user} = useAuth();

  const handleLogout = async () => {
    await logout();
  }

  console.log('user data: ', user);

  return (
    <View style={styles.containerHome}>
      <View style={styles.header}>
        <View style={styles.iconTextContainer}>
          <Image source={Images.happy} style={styles.icon} />
          <Text style={styles.text}>Hola, {user?.username}!</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <Image source={Images.settings} style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.textHome}>Registros de hoy</Text>
      <Text style={styles.textHome}> </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContent}>
          {listCards.map((card, index) => (
            <StateCard key={index} color={card.color} colorFlag={card.colorFlag} textColor={card.textColor} emotion={card.emotion} date={card.date} hour={card.hour} imageUrl={card.imageUrl} flags={card.flags} activities={card.activities} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
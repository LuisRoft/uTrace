import { View, Text, Image, ScrollView } from 'react-native';
import { Flags } from '@/components/StateCard/Flags';
import { StateCardProps } from '@/types/StateCardTypes';
import { styles } from '@/styles/stateCardStyles';


export function StateCard({ color, colorFlag, textColor, emotion, date, hour, imageUrl, flags, activities }: StateCardProps) {

  const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>

      <View style={styles.leftCont}>
        <Image source={imageUrl} style={styles.icon} />
      </View>

      <View style={styles.centerCont}>

        <View><Text style={{ fontWeight: 'bold', fontSize: 18, color: textColor }}>{emotion}</Text></View>

        <View style={styles.date}>
          <Text style={{ fontSize: 12, color: textColor }}>{date}</Text>
          <Text style={{ fontSize: 12, color: textColor }}>{hour}</Text>
        </View>

        <ScrollView>
          <View style={styles.grid}>
            {flags.map((flag, index) => (
              <Flags key={index} flags={flag} flagColor={colorFlag} textColor={textColor} />
            ))}
          </View>
        </ScrollView>

      </View>

      <View style={styles.rightCont}>
        <ScrollView>
          <View style={styles.activities}>
            {
              activities.map((activity, index) => (
                <View key={index}>
                  <Text style={{ fontSize: 10 }}>{activity.activity}</Text>
                </View>
              ))

            }
          </View>
        </ScrollView>

        <View style={[styles.costs, { backgroundColor: colorFlag }]}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: textColor }}>GASTO TOTAL:</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: textColor }}>${totalCost}</Text>
        </View>
      </View>

    </View >
  );
};




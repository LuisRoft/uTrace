import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Flags from '@/components/StateCard/Flags';
import { StateCardProps } from '@/types/StateCardTypes';
import { styles } from '@/styles/stateCardStyles';

const StateCards: React.FC<StateCardProps> = ({
  colorFlag, textColor, date, hour, flags, activities, EmotionComponent, emotionProps, backgroundColor, customWidth, customHeight 
}) => {
  const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0);

  return (
    <View style={[styles.container, { backgroundColor, width: customWidth, height: customHeight }]}>
      <View style={styles.leftCont}>
        <EmotionComponent {...emotionProps} />
      </View>
      <View style={styles.centerCont}>
        <View style={styles.date}>
          <Text style={{ fontSize: 12, color: textColor }}>{date}</Text>
          <Text style={{ fontSize: 12, color: textColor }}>{hour}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {flags.map((flag, index) => (
              <Flags key={index} flags={flag} flagColor={colorFlag} textColor={textColor} />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.rightCont}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.activities}>
            {activities.map((activity, index) => (
              <View key={index}>
                <Text style={{ fontSize: 10 }}>{activity.activity}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={[styles.costs, { backgroundColor: colorFlag }]}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: textColor }}>GASTO TOTAL:</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: textColor }}>${totalCost}</Text>
        </View>
      </View>
    </View>
  );
};

export default StateCards;

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/styles/StateCard/flagsStyles';

interface FlagsActiviteProps {
  flags: string;
  flagColor: string;
  textColor: string;
}

const FlagsActivitie: React.FC<FlagsActiviteProps> = ({ flags, flagColor, textColor }) => {
  return (
    <View style={[styles.flagsContainer, { backgroundColor: flagColor }]}>
      <Text style={[styles.flags, { color: textColor }]}>{flags}</Text>
    </View>
  );
};

export default FlagsActivitie;

// Flags.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/styles/flagsStyles';

interface FlagsProps {
  flags: string;
  flagColor: string;
  textColor: string;
}

const Flags: React.FC<FlagsProps> = ({ flags, flagColor, textColor }) => {
  return (
    <View style={[styles.flagsContainer, { backgroundColor: flagColor }]}>
      <Text style={[styles.flags, { color: textColor }]}>{flags}</Text>
    </View>
  );
};

export default Flags;

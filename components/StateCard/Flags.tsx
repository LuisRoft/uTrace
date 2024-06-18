import { View, Text } from 'react-native';
import { styles } from '@/styles/flagsStyles';

export function Flags({ flags, flagColor, textColor }: { flags: string, flagColor: string, textColor: string }) {
    return (
        <View style={[styles.flagsContainer, { backgroundColor: flagColor }]}>
            <Text style={[styles.flags, { color: textColor }]}>{flags}</Text>
        </View>
    );
}



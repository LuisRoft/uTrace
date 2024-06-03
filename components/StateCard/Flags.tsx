import { View, Text} from 'react-native';
import { styles } from '@/styles/flagsStyles';

export function Flags({ flags }: { flags: string }) {
    return (
        <View style={styles.flagsContainer}>
             <Text style={styles.flags}>{flags}</Text>
        </View>
    );


}



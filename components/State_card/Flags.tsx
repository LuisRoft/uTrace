import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


export default function Flags({ flags }: { flags: string }) {
    return (
        <View style={styles.flagsContainer}>
             <Text style={styles.flags}>{flags}</Text>
        </View>
    );


}

const styles = StyleSheet.create({
    flagsContainer:{
        backgroundColor: '#fff',
        fontSize: 20,
        padding: 10,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        
    },
    flags:{
        fontWeight: 'bold',
    }
});

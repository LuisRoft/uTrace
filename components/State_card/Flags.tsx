import React from 'react';
import { View, Text} from 'react-native';


export default function Flags({ flags }: { flags: string }) {
    return (
        <Text >{flags}</Text>
    );
}

import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';


const { width } = Dimensions.get('window');

interface PieChartComponentProps {
    data: any[];
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => (
    <View>
        <PieChart
            data={data}
            donut
            textColor="black"
            radius={width * 0.3}
            innerRadius={width * 0.18}
            textSize={12}
            focusOnPress
            showValuesAsLabels
            fontStyle='italic'
            textBackgroundRadius={-1}
            labelsPosition="outward"
        />
    </View>
);
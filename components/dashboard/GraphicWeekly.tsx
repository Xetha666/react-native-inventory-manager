import { COLORS, MoreIcon } from '@/components/Icon';
import React from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { LineChart } from "react-native-gifted-charts";

export default function GraphicWeekly() {
  const { width: screenWidth } = useWindowDimensions();
  
  // Cálculo responsivo
  const CONTAINER_PADDING = 40; // px-5 del ScrollView
  const CARD_PADDING = 48;      // p-6 de la tarjeta
  const CHART_WIDTH = screenWidth - CONTAINER_PADDING - CARD_PADDING;

  const lineData = [
    {value: 20, label: 'MON'},
    {value: 35},
    {value: 30, label: 'WED'},
    {value: 45},
    {value: 25, label: 'FRI'},
    {value: 55},
    {value: 40, label: 'SUN'},
  ];

  return (
    <View className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 mb-10">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-lg font-bold text-slate-800">Weekly movement</Text>
        <Pressable>
          <MoreIcon />
        </Pressable>
      </View>

      <View className="items-center -ml-5">
        <LineChart
          data={lineData}
          height={150}
          width={CHART_WIDTH}
          initialSpacing={25}
          spacing={(CHART_WIDTH - 40) / (lineData.length - 1)}
          thickness={4}
          hideRules
          hideYAxisText
          yAxisThickness={0}
          xAxisThickness={0}
          color={COLORS.primary}
          curved
          dataPointsColor={COLORS.primary}
          dataPointsRadius={4}
          areaChart
          startFillColor="rgba(99, 102, 241, 0.1)"
          endFillColor="rgba(99, 102, 241, 0.01)"
          noOfSections={3}
          xAxisLabelTextStyle={{
            color: COLORS.secondary, 
            fontSize: 10, 
            fontWeight: 'bold'
          }}
        />
      </View>
    </View>
  );
}

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
    {value: 20, label: 'LUN'},
    {value: 35, label: 'MAR'},
    {value: 30, label: 'MIE'},
    {value: 45, label: 'JUE'},
    {value: 25, label: 'VIE'},
    {value: 55, label: 'SAB'},
    {value: 40, label: 'DOM'},
  ];

  return (
    <View className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 mb-10">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-lg font-bold text-slate-800">Weekly movement</Text>
        <Pressable>
          <MoreIcon />
        </Pressable>
      </View>

      <View className="items-center" style={{ marginLeft: -10 }}>
        <LineChart
          data={lineData}
          height={180}
          width={CHART_WIDTH}
          initialSpacing={15}
          endSpacing={40}
          spacing={(CHART_WIDTH - 25) / (lineData.length - 1)}
          thickness={2}
          hideRules
          hideYAxisText
          yAxisThickness={0}
          xAxisThickness={0}
          color={COLORS.primary}
          curved
          curveType={1}
          maxValue={100} // ESTO ES LA CLAVE: Da espacio arriba para que la curva no sea picuda
          dataPointsColor={COLORS.primary}
          dataPointsRadius={3}
          areaChart
          startFillColor="#6366f1"
          startOpacity={0.15} // Transparencia real para móvil
          endOpacity={0.01}   // Transparencia real para móvil
          noOfSections={3}
          xAxisLabelTextStyle={{
            color: COLORS.secondary, 
            fontSize: 9, 
            fontWeight: '600'
          }}
        />
      </View>
    </View>
  );
}

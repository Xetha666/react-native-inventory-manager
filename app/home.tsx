import { COLORS } from '@/components/Icon';
import ScreenWrapper from "@/components/ScreenWrapper";
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

// Importación de componentes del Dashboard
import AlertStock from '@/components/dashboard/AlertStock';
import AmountProducts from '@/components/dashboard/AmountProducts';
import GraphicWeekly from '@/components/dashboard/GraphicWeekly';
import Valorization from '@/components/dashboard/Valorization';

export default function HomePage() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light }}>
      <ScreenWrapper style={{ backgroundColor: 'transparent' }}>
        
        <ScrollView showsVerticalScrollIndicator={false} className="px-5">
          
          {/* Welcome Section */}
          <View className="mt-8 mb-6">
            <Text className="text-3xl font-bold text-slate-800">Dashboard</Text>
            <Text className="text-slate-400 font-medium">General overview for today</Text>
          </View>

          {/* Saldo / Valorización */}
          <Valorization amount="$2,450,180" percentage="+4.2%" />

          {/* Fila de Mini Cards */}
          <View className="flex-row gap-x-4 mb-4">
            <AmountProducts count="8,402" />
            <AlertStock count="24" />
          </View>

          {/* Gráfico Semanal */}
          <GraphicWeekly />

        </ScrollView>
      </ScreenWrapper>
    </View>
  );
}
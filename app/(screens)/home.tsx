import { COLORS } from '@/components/Icon';
import ScreenWrapper from "@/components/ScreenWrapper";
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

// Importación de componentes del Dashboard
import AlertStock from '@/components/dashboard/AlertStock';
import AmountProducts from '@/components/dashboard/AmountProducts';
import GraphicWeekly from '@/components/dashboard/GraphicWeekly';
import Valorization from '@/components/dashboard/Valorization';

import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { profile } = useAuth();
  
  // Obtener solo el primer nombre
  const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Usuario';

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light }}>
      <ScreenWrapper style={{ backgroundColor: 'transparent' }}>
        
        <ScrollView showsVerticalScrollIndicator={false} className="px-5">
          
          {/* Welcome Section */}
          <View className="mt-8 mb-6">
            <Text className="text-3xl font-bold text-slate-800">Hola, {firstName}</Text>
            <Text className="text-slate-400 font-medium">Este es el resumen de hoy</Text>
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
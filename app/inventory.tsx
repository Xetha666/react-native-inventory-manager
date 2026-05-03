import Header from "@/components/Header";
import { COLORS } from '@/components/Icon';
import ScreenWrapper from "@/components/ScreenWrapper";
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light }}>
      <ScreenWrapper style={{ backgroundColor: 'transparent' }}>
        
        {/* IMPORTANTE: Agregamos showSearch={true} para que se vea la lupa */}
        <Header 
          showSearch={true} 
          onSearch={(text) => setSearchQuery(text)} 
        />        

        <ScrollView showsVerticalScrollIndicator={false} className="px-5">
          <View className="mt-8 mb-6">
            <Text className="text-3xl font-bold text-slate-800">Inventario</Text>
            {searchQuery ? (
              <Text className="text-slate-400 font-medium">Buscando: "{searchQuery}"</Text>
            ) : (
              <Text className="text-slate-400 font-medium">Gestiona tus existencias</Text>
            )}
          </View>

          {/* Tarjeta de ejemplo de productos */}
          <View className="items-center justify-center mt-10 py-12 bg-white rounded-[30px] border border-slate-100 shadow-sm">
            <Text className="text-slate-500 font-medium text-center px-10 leading-6">
              Aquí aparecerá tu lista de productos.{"\n"}
              Usa la <Text className="text-indigo-600 font-bold">lupa</Text> de arriba para filtrar por nombre o categoría.
            </Text>
          </View>
        </ScrollView>

      </ScreenWrapper>
    </View>
  );
}

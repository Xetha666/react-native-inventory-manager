import { InventoryIcon } from '@/components/Icon';
import React from 'react';
import { Text, View } from 'react-native';

interface AmountProductsProps {
  count: string;
}

export default function AmountProducts({ count }: AmountProductsProps) {
  return (
    <View className="flex-1 bg-white p-5 rounded-[30px] shadow-sm border border-slate-100">
      <View className="w-10 h-10 bg-indigo-50 rounded-xl items-center justify-center mb-4">
        <InventoryIcon />
      </View>
      <Text className="text-2xl font-bold text-slate-800">{count}</Text>
      <Text className="text-[10px] font-bold text-slate-400 uppercase leading-tight mt-1">
        Productos{"\n"}Totales
      </Text>
    </View>
  );
}

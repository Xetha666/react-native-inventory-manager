import { AlertIcon } from '@/components/Icon';
import React from 'react';
import { Text, View } from 'react-native';

interface AlertStockProps {
  count: string;
}

export default function AlertStock({ count }: AlertStockProps) {
  return (
    <View className="flex-1 bg-white p-5 rounded-[30px] shadow-sm border border-slate-100">
      <View className="w-10 h-10 bg-red-50 rounded-xl items-center justify-center mb-4">
        <AlertIcon />
      </View>
      <Text className="text-2xl font-bold text-red-600">{count}</Text>
      <Text className="text-[10px] font-bold text-red-500 uppercase leading-tight mt-1">
        Alertas de{"\n"}Stock
      </Text>
    </View>
  );
}

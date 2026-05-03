import { AlertIcon } from '@/components/Icon';
import React from 'react';
import { Text, View } from 'react-native';

interface AlertStockProps {
  count: string;
}

export default function AlertStock({ count }: AlertStockProps) {
  return (
    <View className="flex-1 bg-red-50/50 p-5 rounded-[30px] shadow-sm border border-red-100">
      <View className="w-10 h-10 bg-red-100 rounded-xl items-center justify-center mb-4">
        <AlertIcon />
      </View>
      <Text className="text-2xl font-bold text-red-500">{count}</Text>
      <Text className="text-[10px] font-bold text-red-400 uppercase leading-tight mt-1">
        Alertas de{"\n"}Stock
      </Text>
    </View>
  );
}

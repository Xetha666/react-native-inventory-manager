import { TrendingUpIcon, WalletIcon } from '@/components/Icon';
import React from 'react';
import { Text, View } from 'react-native';

interface ValorizationProps {
  amount: string;
  percentage: string;
}

export default function Valorization({ amount, percentage }: ValorizationProps) {
  return (
    <View className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Valorización</Text>
        <WalletIcon />
      </View>
      <Text className="text-3xl font-bold text-slate-800">{amount}</Text>
      <View className="flex-row items-center mt-2 bg-indigo-50 self-start px-3 py-1 rounded-full">
        <TrendingUpIcon />
        <Text className="text-indigo-600 font-bold text-[12px] ml-1">{percentage}</Text>
      </View>
    </View>
  );
}

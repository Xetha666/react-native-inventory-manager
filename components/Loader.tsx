import { InventoryIcon } from '@/components/Icon';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
  variant?: 'default' | 'splash';
}

const Loader = ({ message, fullScreen = true, variant = 'default' }: LoaderProps) => {
  if (variant === 'splash') {
    return (
      <View className="flex-1 bg-indigo-600 items-center justify-center">
        <View className="mb-8">
           <InventoryIcon color="white" size={60} />
        </View>
        <ActivityIndicator size="large" color="white" />
        <Text className="mt-6 text-indigo-100 font-bold uppercase tracking-[4px] text-medium">
          InventoryFlow
        </Text>
      </View>
    );
  }

  return (
    <View 
      className={`items-center justify-center ${fullScreen ? 'flex-1 bg-white' : 'py-10'}`}
    >
      <View className="bg-indigo-50 p-6 rounded-[30px] items-center shadow-sm border border-indigo-100/50">
        <ActivityIndicator size="large" color="#6366f1" />
        {message && (
          <Text className="mt-4 text-indigo-900/60 font-bold text-xs uppercase tracking-widest">
            {message}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Loader;

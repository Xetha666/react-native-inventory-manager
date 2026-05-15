import BiometricAuth from '@/components/auth/BiometricAuth';
import LoginForm from '@/components/auth/LoginForm';
import { InventoryIcon } from '@/components/Icon';
import ScreenWrapper from '@/components/ScreenWrapper';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function LoginPage() {
  return (
    <ScreenWrapper className="bg-slate-50">
      <View className="flex-1 justify-center items-center px-6">
        
        {/* Card Principal */}
        <View className="w-full bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 items-center max-w-xl">
          
          {/* Logo Icon */}
          <View className="bg-indigo-600 p-4 rounded-2xl mb-4">
             <InventoryIcon color="white" />
          </View>

          {/* Titles */}
          <Text className="text-3xl font-bold text-indigo-900">InventoryFlow</Text>
          <Text className="text-slate-400 font-medium mb-8">Access your warehouse dashboard</Text>

          {/* Formulario */}
          <LoginForm />

          <View className="mt-6 flex-row">
            <Text className="text-slate-400 text-xs">¿No tienes cuenta? </Text>
            <Link href="/register" asChild>
              <Pressable>
                <Text className="text-indigo-600 font-bold text-xs">Regístrate</Text>
              </Pressable>
            </Link>
          </View>

          {/* Sección de Biometría */}
          <BiometricAuth />

        </View>

      </View>
    </ScreenWrapper>
  );
}

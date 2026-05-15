import RegisterForm from '@/components/auth/RegisterForm';
import { InventoryIcon } from '@/components/Icon';
import ScreenWrapper from "@/components/ScreenWrapper";
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <ScreenWrapper className="bg-slate-50">
      <View className="flex-1 justify-center items-center px-6">
        
        <View className="w-full bg-white p-6 rounded-[40px] shadow-sm border border-slate-100 items-center max-w-xl">
          
          <View className="bg-indigo-600 p-3 rounded-2xl mb-3">
             <InventoryIcon color="white" size={24} />
          </View>

          <Text className="text-2xl font-bold text-indigo-900">Crear Cuenta</Text>
          <Text className="text-slate-400 font-medium mb-4 text-center">Únete a InventoryFlow</Text>

          {/* Formulario Migrado */}
          <RegisterForm />

          <View className="mt-6 flex-row">
            <Text className="text-slate-400 text-xs">¿Ya tienes cuenta? </Text>
            <Link href="/login" asChild>
              <Pressable>
                <Text className="text-indigo-600 font-bold text-xs">Inicia Sesión</Text>
              </Pressable>
            </Link>
          </View>

        </View>

      </View>
    </ScreenWrapper>
  );
}

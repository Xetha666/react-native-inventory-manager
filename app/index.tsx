import { FaceIdIcon, FingerprintIcon, InventoryIcon } from '@/components/Icon';
import ScreenWrapper from "@/components/ScreenWrapper";
import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function LoginPage() {
  const router = useRouter();
  const { handleBiometricAuth, isBiometricSupported, authType } = useBiometricAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ScreenWrapper className="bg-slate-50">
      <View className="flex-1 justify-center items-center px-6">
        
        {/* Card Principal */}
        <View className="w-full bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 items-center max-w-xl">
          
          {/* Logo Icon */}
          <View className="bg-brand-primary p-4 rounded-2xl mb-4">
             <InventoryIcon color="white" />
          </View>

          {/* Titles */}
          <Text className="text-3xl font-bold text-indigo-900">InventoryFlow</Text>
          <Text className="text-slate-400 font-medium mb-8">Access your warehouse dashboard</Text>

          {/* Form */}
          <View className="w-full gap-y-4">
            
            {/* Email Field */}
            <View>
              <Text className="text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Email Address</Text>
              <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-3">
                <MaterialIcons name="email" size={20} color="#94a3b8" />
                <TextInput 
                  placeholder="manager@warehouse.com" 
                  placeholderTextColor="#cbd5e1"
                  className="flex-1 ml-3 text-slate-700 font-medium outline-none"
                />
              </View>
            </View>

            {/* Password Field */}
            <View>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[10px] font-bold text-slate-400 uppercase ml-1">Password</Text>
                <Pressable>
                  <Text className="text-[10px] font-bold text-indigo-600">Olvidé mi contraseña</Text>
                </Pressable>
              </View>
              <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-3">
                <MaterialIcons name="lock" size={20} color="#94a3b8" />
                <TextInput 
                  placeholder="********" 
                  placeholderTextColor="#cbd5e1"
                  secureTextEntry={!isPasswordVisible}
                  className="flex-1 ml-3 text-slate-700 font-medium outline-none"
                />
                <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <MaterialIcons 
                    name={isPasswordVisible ? "visibility" : "visibility-off"} 
                    size={20} 
                    color={isPasswordVisible ? "#6366f1" : "#cbd5e1"} 
                  />
                </Pressable>
              </View>
            </View>

            {/* Login Button */}
            <Pressable 
              onPress={() => router.replace('/home')}
              className="bg-indigo-600 flex-row justify-center items-center py-4 rounded-2xl mt-4 shadow-lg shadow-indigo-200 active:opacity-80"
            >
              <Text className="text-white font-bold uppercase tracking-widest mr-2">Entrar</Text>
              <MaterialIcons name="arrow-forward" size={18} color="white" />
            </Pressable>

          </View>

          {/* Sección de Biometría Condicional */}
          {isBiometricSupported && (
            <>
              {/* Divider */}
              <View className="flex-row items-center my-8 w-full">
                <View className="flex-1 h-[1px] bg-slate-100" />
                <Text className="mx-4 text-[10px] font-bold text-black uppercase">O accede con {authType}</Text>
                <View className="flex-1 h-[1px] bg-slate-100" />
              </View>

              {/* Botón Dinámico de Biometría */}
              <Pressable 
                onPress={handleBiometricAuth}
                className="w-14 h-14 border border-slate-100 rounded-2xl items-center justify-center shadow-sm bg-white active:bg-slate-50"
              >
                {authType === 'rostro' ? <FaceIdIcon /> : <FingerprintIcon />}
              </Pressable>
            </>
          )}

        </View>

      </View>
    </ScreenWrapper>
  );
}

import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import { supabase } from '@/lib/supabase';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { FaceIdIcon, FingerprintIcon } from '../Icon';

export default function BiometricAuth() {
  const { handleBiometricAuth, isBiometricSupported, authType } = useBiometricAuth();

  // Intentar login biométrico automático al cargar si está habilitado
  useEffect(() => {
    const checkAutoBiometrics = async () => {
      const enabled = await SecureStore.getItemAsync('biometric_enabled');
      if (enabled === 'true') {
        // Un pequeño delay para que el usuario vea la pantalla antes de que salte el FaceID
        setTimeout(() => triggerBiometricLogin(), 500);
      }
    };
    if (isBiometricSupported) {
      checkAutoBiometrics();
    }
  }, [isBiometricSupported]);

  const triggerBiometricLogin = async () => {
    // 1. Pedir la cara/huella al teléfono
    const success = await handleBiometricAuth();
    
    if (success) {
      // 2. Sacar los datos de la caja fuerte
      const savedUser = await SecureStore.getItemAsync('saved_username');
      const savedPass = await SecureStore.getItemAsync('saved_password');

      if (!savedUser || !savedPass) {
        Alert.alert('Acceso Biométrico', 'Primero debes iniciar sesión manualmente para activar esta función.');
        return;
      }

      // 3. Buscar el email y entrar
      const { data: profileData } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', savedUser)
        .single();

      if (profileData?.email) {
        const { error } = await supabase.auth.signInWithPassword({
          email: profileData.email,
          password: savedPass,
        });

        if (error) {
          Alert.alert('Error', 'La contraseña guardada ya no es válida.');
        }
      }
    }
  };

  const showBiometricInfo = () => {
    Alert.alert(
      '¿Cómo funciona el acceso biométrico?',
      '• Dispositivo Nuevo: Por seguridad, la primera vez en cada teléfono debes entrar con tu contraseña.\n\n• Cambio de Contraseña: Si cambias tu clave, deberás entrar manualmente una vez para actualizar el acceso rápido.\n\n• Privacidad: Tus datos biométricos nunca salen de este teléfono.',
      [{ text: 'Entendido' }]
    );
  };

  if (!isBiometricSupported) return null;

  return (
    <>
      {/* Divider */}
      <View className="flex-row items-center my-8 w-full">
        <View className="flex-1 h-[1px] bg-slate-100" />
          <Text className="ml-4 text-medium font-bold text-black uppercase">
            O accede con {authType}
          </Text>
          <Pressable 
            onPress={showBiometricInfo}
            className="size-10 border border-slate-50 rounded-full items-center justify-center active:bg-slate-50"
          >
            <MaterialIcons name="help-outline" size={20} color="#94a3b8" />
          </Pressable>
        <View className="flex-1 h-[1px] bg-slate-100" />
      </View>

      {/* Botones de Biometría y Ayuda */}
      <View className="flex-row items-center justify-center gap-x-4">
        <Pressable 
          onPress={triggerBiometricLogin}
          className="w-14 h-14 border border-slate-100 rounded-2xl items-center justify-center shadow-sm bg-white active:bg-slate-50"
        >
          {authType === 'rostro' ? <FaceIdIcon /> : <FingerprintIcon />}
        </Pressable>

        
      </View>
    </>
  );
}

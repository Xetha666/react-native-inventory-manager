import { supabase } from '@/lib/supabase';
import { MaterialIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from 'react-native';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor ingresa tu usuario y contraseña');
      return;
    }

    setLoading(true);
    
    // 1. Buscar el email asociado a ese username en la tabla profiles
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', username)
      .single();

    if (profileError || !profileData?.email) {
      Alert.alert('Error de acceso', 'El usuario no existe');
      setLoading(false);
      return;
    }

    // 2. Iniciar sesión con el email encontrado
    const { error } = await supabase.auth.signInWithPassword({
      email: profileData.email,
      password,
    });

    if (error) {
      Alert.alert('Error de acceso', error.message);
      setLoading(false);
      return;
    }

    // 3. Login manual exitoso -> ¿Activamos biometría?
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      
      // Si el teléfono tiene biometría y no está activada en nuestra app aún
      const biometricEnabled = await SecureStore.getItemAsync('biometric_enabled');
      
      if (hasHardware && isEnrolled && biometricEnabled !== 'true') {
        Alert.alert(
          'Acceso Biométrico',
          '¿Deseas activar el acceso con tu huella o rostro para entrar más rápido la próxima vez?',
          [
            { text: 'Ahora no', style: 'cancel' },
            { 
              text: 'Sí, activar', 
              onPress: async () => {
                // Pedimos una confirmación biométrica rápida
                const result = await LocalAuthentication.authenticateAsync({
                  promptMessage: 'Confirma tu identidad para activar el acceso'
                });

                if (result.success) {
                  // Guardamos credenciales y bandera de activado
                  await SecureStore.setItemAsync('biometric_enabled', 'true');
                  await SecureStore.setItemAsync('saved_username', username);
                  await SecureStore.setItemAsync('saved_password', password);
                  Alert.alert('¡Activado!', 'Ya puedes usar tu biometría para entrar.');
                }
              }
            }
          ]
        );
      }
    } catch (err) {
      console.error('Biometric enrollment error:', err);
    }
    
    // El AuthProvider hará la redirección al home automáticamente al detectar la sesión
  }

  return (
    <View className="w-full gap-y-4">
      
      {/* Username Field */}
      <View>
        <Text className="text-medium font-bold text-slate-400 uppercase mb-2 ml-1">Usuario</Text>
        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-3">
          <MaterialIcons name="person" size={20} color="#94a3b8" />
          <TextInput 
            placeholder="Ej. bmoreno" 
            placeholderTextColor="#cbd5e1"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
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
            value={password}
            onChangeText={setPassword}
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
        onPress={handleLogin}
        disabled={loading}
        className="bg-indigo-600 flex-row justify-center items-center py-4 rounded-2xl mt-4 shadow-lg shadow-indigo-200 active:opacity-80"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Text className="text-white font-bold uppercase tracking-widest mr-2">Entrar</Text>
            <MaterialIcons name="arrow-forward" size={18} color="white" />
          </>
        )}
      </Pressable>

    </View>
  );
}

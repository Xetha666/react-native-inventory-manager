import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!username || !password || !fullName || !email) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    
    try {
      // 1. Crear el usuario en Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        Alert.alert('Error de registro', signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // 2. Crear el perfil en nuestra tabla 'profiles'
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              full_name: fullName,
              username: username,
              email: email,
            }
          ]);

        if (profileError) {
          console.error('Error al crear perfil:', profileError);
          // Si falla el perfil, avisamos pero quizás la cuenta de auth ya se creó
          Alert.alert('Aviso', 'Se creó la cuenta pero hubo un problema con el perfil. Contacta a soporte.');
        }

        Alert.alert(
          '¡Cuenta creada!', 
          'Tu cuenta ha sido registrada con éxito. Ya puedes iniciar sesión.',
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      } else {
        // Caso raro donde no hay error pero tampoco usuario
        Alert.alert('Error', 'No se pudo completar el registro. Inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      Alert.alert('Error crítico', 'Ocurrió un error inesperado durante el registro.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="w-full gap-y-2">
      
      {/* Full Name Field */}
      <View>
        <Text className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Nombre Completo</Text>
        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-2">
          <MaterialIcons name="person" size={20} color="#94a3b8" />
          <TextInput 
            placeholder="Ej. Alejandro Moreno" 
            placeholderTextColor="#cbd5e1"
            value={fullName}
            onChangeText={setFullName}
            className="flex-1 ml-3 text-slate-700 font-medium outline-none"
          />
        </View>
      </View>

      {/* Username Field */}
      <View>
        <Text className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Nombre de Usuario</Text>
        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-2">
          <MaterialIcons name="alternate-email" size={20} color="#94a3b8" />
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

      {/* Email Field */}
      <View>
        <Text className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Email de recuperación</Text>
        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-2">
          <MaterialIcons name="email" size={20} color="#94a3b8" />
          <TextInput 
            placeholder="ejemplo@correo.com" 
            placeholderTextColor="#cbd5e1"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className="flex-1 ml-3 text-slate-700 font-medium outline-none"
          />
        </View>
      </View>

      {/* Password Field */}
      <View>
        <Text className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Contraseña</Text>
        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-2">
          <MaterialIcons name="lock" size={20} color="#94a3b8" />
          <TextInput 
            placeholder="********" 
            placeholderTextColor="#cbd5e1"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="flex-1 ml-3 text-slate-700 font-medium outline-none"
          />
        </View>
      </View>

      {/* Register Button */}
      <Pressable 
        onPress={handleRegister}
        disabled={loading}
        className="bg-indigo-600 flex-row justify-center items-center py-3 rounded-2xl mt-2 shadow-lg shadow-indigo-200 active:opacity-80"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Text className="text-white font-bold uppercase tracking-widest mr-2">Registrarme</Text>
            <MaterialIcons name="app-registration" size={18} color="white" />
          </>
        )}
      </Pressable>

    </View>
  );
}

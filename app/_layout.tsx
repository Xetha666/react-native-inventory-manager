import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import "@/styles/global.css";
import { Slot, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function LayoutContent() {
  const { session, loading } = useAuthRedirect();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  
  const isLoginPage = pathname === "/";

  if (loading) {
    return <Loader variant="splash" />;
  }

  return (
    <View className="flex-1 bg-brand-off-white">
      <StatusBar style="auto" />
      
      <View className="flex-1">
        <Slot />
      </View>

      {!isLoginPage && session && (
        <View className="items-center bg-white rounded-t-3xl border-t border-slate-100 shadow-2xl" style={[styles.navbarContainer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <Navbar />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  }
});

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LayoutContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
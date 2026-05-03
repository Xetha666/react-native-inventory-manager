import Navbar from '@/components/Navbar';
import "@/styles/global.css";
import { Slot, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function LayoutContent() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isLoginPage = pathname === "/";

  return (
    <View className="flex-1 bg-brand-off-white">
      <StatusBar style="auto" />
      
      <View className="flex-1">
        <Slot />
      </View>

      {!isLoginPage && (
        <View 
        className="items-center bg-white rounded-t-3xl border-t border-slate-100 shadow-2xl"
        style={[styles.navbarContainer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <Navbar />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    elevation: 20, // Elevation se mantiene aquí ya que Tailwind no siempre lo maneja igual en Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  }
});

export default function Layout() {
  return (
    <SafeAreaProvider>
      <LayoutContent />
    </SafeAreaProvider>
  );
}
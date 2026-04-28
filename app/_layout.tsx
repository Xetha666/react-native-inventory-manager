import "@/styles/global.css";
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';


export default function Layout() {
  return (
    <View className="bg-black h-screen flex-1">
      <StatusBar style="auto" />
      <Slot />
    </View>
  )
}
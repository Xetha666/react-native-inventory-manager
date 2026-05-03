import { Link, usePathname } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { HomeIcon, InventoryIcon, QrCodeIcon, SettingsIcon } from './Icon';

export default function Navbar() {
  const pathname = usePathname();

  const ACTIVE_COLOR = '#6366f1';
  const INACTIVE_COLOR = '#94a3b8';

  // Helper para verificar si la ruta es la activa
  const isActive = (path: string) => pathname === path;

  return (
    <View className="flex-row justify-around items-center p-3 w-full max-w-xl">
      
      {/* Home */}
      <Link href="/home" asChild>
        <Pressable className={`items-center px-6 py-2 rounded-3xl active:opacity-70 ${isActive('/home') ? 'bg-brand-light' : ''}`}>
          <HomeIcon color={isActive('/home') ? ACTIVE_COLOR : INACTIVE_COLOR} />
          <Text className={`uppercase text-small font-bold mt-1 ${isActive('/home') ? 'text-brand-primary' : 'text-brand-secondary'}`}>
            Home
          </Text>
        </Pressable>
      </Link>

      {/* Inventory */}
      <Link href="/inventory" asChild>
        <Pressable className={`items-center px-6 py-2 rounded-3xl active:opacity-70 ${isActive('/inventory') ? 'bg-brand-light' : ''}`}>
          <InventoryIcon color={isActive('/inventory') ? ACTIVE_COLOR : INACTIVE_COLOR} />
          <Text className={`uppercase text-small font-bold mt-1 ${isActive('/inventory') ? 'text-brand-primary' : 'text-brand-secondary'}`}>
            Inventory
          </Text>
        </Pressable>
      </Link>

      {/* Scanner */}
      <Link href="/scanner" asChild>
        <Pressable className={`items-center px-6 py-2 rounded-3xl active:opacity-70 ${isActive('/scanner') ? 'bg-brand-light' : ''}`}>
          <QrCodeIcon color={isActive('/scanner') ? ACTIVE_COLOR : INACTIVE_COLOR} />
          <Text className={`uppercase text-small font-bold mt-1 ${isActive('/scanner') ? 'text-brand-primary' : 'text-brand-secondary'}`}>
            Scanner
          </Text>
        </Pressable>
      </Link>

      {/* Settings */}
      <Link href="/settings" asChild>
        <Pressable className={`items-center px-6 py-2 rounded-3xl active:opacity-70 ${isActive('/settings') ? 'bg-brand-light' : ''}`}>
          <SettingsIcon color={isActive('/settings') ? ACTIVE_COLOR : INACTIVE_COLOR} />
          <Text className={`uppercase text-small font-bold mt-1 ${isActive('/settings') ? 'text-brand-primary' : 'text-brand-secondary'}`}>
            Settings
          </Text>
        </Pressable>
      </Link>

    </View>
  );
}

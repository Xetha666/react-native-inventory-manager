import { BellIcon, ChevronRightIcon, EditIcon, ExternalLinkIcon, HelpIcon, LocationIcon, LogoutIcon, PreferencesIcon, SecurityIcon } from '@/components/Icon';
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

interface SettingRowProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isLast?: boolean;
  rightIcon?: React.ReactNode;
}

const SettingRow = ({ icon, title, subtitle, isLast, rightIcon }: SettingRowProps) => (
  <Pressable className={`flex-row items-center py-4 px-4 active:bg-indigo-50/50 ${!isLast ? 'border-b border-slate-50' : ''}`}>
    <View className="w-10 h-10 bg-indigo-50/80 rounded-xl items-center justify-center mr-4">
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-slate-700 font-bold text-[15px]">{title}</Text>
      <Text className="text-slate-400 text-[12px]">{subtitle}</Text>
    </View>
    {rightIcon || <ChevronRightIcon />}
  </Pressable>
);

const SectionTitle = ({ title }: { title: string }) => (
  <Text className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-3 ml-2">
    {title}
  </Text>
);


export default function SettingsPage() {
  const SETTINGS_BG = "#F5F7FF";
  const { profile } = useAuth();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: SETTINGS_BG }}>
      <ScreenWrapper style={{ backgroundColor: 'transparent' }}>
        
        <ScrollView showsVerticalScrollIndicator={false} className="px-5">
          
          {/* Profile Section */}
          <View className="items-center mt-12 mb-8">
            <View className="relative">
              <Image 
                source={{ uri: profile?.avatar_url || 'https://i.pravatar.cc/300?img=12' }} 
                className="w-28 h-28 rounded-full border-4 border-white shadow-sm"
              />
              <View className="absolute bottom-1 right-1 bg-indigo-600 w-8 h-8 rounded-full border-2 border-white items-center justify-center">
                <EditIcon />
              </View>
            </View>
            <Text className="text-2xl font-bold text-slate-800 mt-4">
              {profile?.full_name || 'Nombre no disponible'}
            </Text>
            <Text className="text-slate-500 font-medium">
              @{profile?.username || 'Usuario no disponible'}
            </Text>
          </View>

          {/* Account Section */}
          <SectionTitle title="Account" />
          <View className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <SettingRow 
              icon={<SecurityIcon />} 
              title="Security" 
              subtitle="Password, 2FA, Session history" 
            />
            <SettingRow 
              icon={<BellIcon />} 
              title="Notifications" 
              subtitle="Push, Email, Inventory alerts" 
              isLast 
            />
          </View>

          {/* Warehouse Section */}
          <SectionTitle title="Warehouse" />
          <View className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <SettingRow 
              icon={<LocationIcon />} 
              title="Location" 
              subtitle="Primary hub, Shipping zones" 
            />
            <SettingRow 
              icon={<PreferencesIcon />} 
              title="Preferences" 
              subtitle="Language, Units, View modes" 
              isLast 
            />
          </View>

          {/* Support Section */}
          <SectionTitle title="Support" />
          <View className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <SettingRow 
              icon={<HelpIcon />} 
              title="Help Center" 
              subtitle="FAQs, Guides, Live chat" 
              isLast
              rightIcon={<ExternalLinkIcon />}
            />
          </View>

          {/* Logout Button */}
          <Pressable onPress={handleSignOut} className="mt-10 mb-6 flex-row justify-center items-center py-4 rounded-2xl border border-red-200 bg-red-50/30 active:bg-red-50">
            <LogoutIcon />
            <Text className="text-red-500 font-bold ml-2">Cerrar Sesión</Text>
          </Pressable>

          {/* Footer */}
          <View className="items-center mb-24">
            <Text className="text-medium font-bold text-slate-300 uppercase tracking-tighter">InventoryFlow v2.4.1</Text>
            <Text className="text-medium text-slate-300">Made with precision for global logistics</Text>
          </View>

        </ScrollView>
      </ScreenWrapper>
    </View>
  );
}

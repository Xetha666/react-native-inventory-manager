import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

// Centralización de colores de marca
export const COLORS = {
  primary: '#6366f1',    // Indigo-500
  secondary: '#94a3b8',  // Slate-400
  success: '#10b981',    // Emerald-500
  danger: '#ef4444',     // Red-500
  warning: '#f59e0b',    // Amber-500
  light: '#f1f5f9',      // Slate-100
  white: '#ffffff',
  dark: '#1e293b',       // Slate-800
};

interface IconProps {
  color?: string;
  size?: number;
}

export const HomeIcon = ({ color = COLORS.secondary, size = 24 }: IconProps) => (
  <FontAwesome name="home" size={size} color={color} />
);

export const InventoryIcon = ({ color = COLORS.primary, size = 20 }: IconProps) => (
  <MaterialIcons name="inventory" size={size} color={color} />
);

export const QrCodeIcon = ({ color = COLORS.secondary, size = 24 }: IconProps) => (
  <FontAwesome name="qrcode" size={size} color={color} />
);

export const SettingsIcon = ({ color = COLORS.secondary, size = 24 }: IconProps) => (
  <FontAwesome name="cog" size={size} color={color} />
);

export const FingerprintIcon = ({ color = COLORS.secondary, size = 28 }: IconProps) => (
  <MaterialIcons name="fingerprint" size={size} color={color} />
);

export const FaceIdIcon = ({ color = COLORS.secondary, size = 28 }: IconProps) => (
  <FontAwesome name="smile-o" size={size} color={color} />
);

export const SearchIcon = ({ color = COLORS.primary, size = 20 }: IconProps) => (
  <MaterialIcons name="search" size={size} color={color} />
);

export const EditIcon = ({ color = COLORS.white, size = 16 }: IconProps) => (
  <MaterialIcons name="edit" size={size} color={color} />
);

export const SecurityIcon = ({ color = COLORS.primary, size = 22 }: IconProps) => (
  <MaterialCommunityIcons name="shield-check-outline" size={size} color={color} />
);

export const BellIcon = ({ color = COLORS.primary, size = 22 }: IconProps) => (
  <MaterialCommunityIcons name="bell-outline" size={size} color={color} />
);

export const LocationIcon = ({ color = COLORS.primary, size = 22 }: IconProps) => (
  <MaterialCommunityIcons name="map-marker-outline" size={size} color={color} />
);

export const PreferencesIcon = ({ color = COLORS.primary, size = 22 }: IconProps) => (
  <MaterialCommunityIcons name="tune-vertical" size={size} color={color} />
);

export const HelpIcon = ({ color = COLORS.primary, size = 22 }: IconProps) => (
  <MaterialCommunityIcons name="help-circle-outline" size={size} color={color} />
);

export const LogoutIcon = ({ color = COLORS.danger, size = 20 }: IconProps) => (
  <MaterialIcons name="logout" size={size} color={color} />
);

export const ChevronRightIcon = ({ color = COLORS.secondary, size = 20 }: IconProps) => (
  <MaterialIcons name="chevron-right" size={size} color={color} />
);

export const ExternalLinkIcon = ({ color = COLORS.secondary, size = 20 }: IconProps) => (
  <MaterialIcons name="open-in-new" size={size} color={color} />
);

export const WalletIcon = ({ color = COLORS.primary, size = 20 }: IconProps) => (
  <MaterialCommunityIcons name="wallet-outline" size={size} color={color} />
);

export const AlertIcon = ({ color = COLORS.danger, size = 24 }: IconProps) => (
  <MaterialCommunityIcons name="alert-decagram-outline" size={size} color={color} />
);

export const TrendingUpIcon = ({ color = COLORS.primary, size = 14 }: IconProps) => (
  <MaterialIcons name="trending-up" size={size} color={color} />
);

export const MoreIcon = ({ color = COLORS.secondary, size = 20 }: IconProps) => (
  <MaterialIcons name="more-horiz" size={size} color={color} />
);
import { COLORS, SearchIcon } from '@/components/Icon';
import React, { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

interface HeaderProps {
  showSearch?: boolean;
  onSearch?: (text: string) => void;
}

export default function Header({ showSearch = false, onSearch }: HeaderProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (text: string) => {
    setSearchValue(text);
    if (onSearch) onSearch(text);
  };

  return (
    <View className="flex-row justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-slate-100">
      
      {/* Lado Izquierdo: Logo y Avatar */}
      {!isSearching && (
        <View className="flex-row items-center">
          <Image 
            source={{ uri: 'https://i.pravatar.cc/100?img=12' }} 
            className="w-10 h-10 rounded-full mr-3 border border-slate-200"
          />
          <Text className="text-indigo-600 font-bold text-lg">InventoryFlow</Text>
        </View>
      )}

      {/* Lado Derecho: Buscador dinámico */}
      {showSearch && (
        <View className={`flex-row items-center bg-slate-50 rounded-2xl px-3 py-1 ${isSearching ? 'flex-1 ml-0' : 'w-10 h-10 justify-center'}`}>
          <Pressable onPress={() => setIsSearching(!isSearching)}>
            <SearchIcon color={isSearching ? COLORS.primary : COLORS.secondary} />
          </Pressable>
          
          {isSearching && (
            <TextInput
              autoFocus
              placeholder="Buscar productos..."
              placeholderTextColor="#94a3b8"
              value={searchValue}
              onChangeText={handleSearch}
              className="flex-1 ml-2 text-slate-700 font-medium h-8 outline-none"
              onBlur={() => {
                if (searchValue === '') setIsSearching(false);
              }}
            />
          )}
        </View>
      )}
    </View>
  );
}

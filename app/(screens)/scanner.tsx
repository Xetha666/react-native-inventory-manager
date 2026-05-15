import { CheckCircleIcon, CubeIcon, MinusIcon, PlusIcon, SearchIcon, UserIcon } from "@/components/Icon";
import ScreenWrapper from "@/components/ScreenWrapper";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function ScannerPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <ScreenWrapper className="bg-black">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-xl font-bold text-white text-center mb-4">
            Necesitamos acceso a tu cámara para escanear códigos.
          </Text>
          <Button onPress={requestPermission} title="Permitir Cámara" color="#4f46e5" />
        </View>
      </ScreenWrapper>
    );
  }

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScannedData(data);
  };

  return (
    <ScreenWrapper className="bg-black">
      <View className="flex-1">
        <CameraView 
          style={StyleSheet.absoluteFillObject} 
          facing="back"
          onBarcodeScanned={scannedData ? undefined : handleBarcodeScanned}
        />
        
        {/* Overlay UI - Camera Target */}
        <View className="absolute inset-0 items-center justify-center pointer-events-none">
          <View className="w-64 h-64 border-2 border-indigo-500 rounded-3xl relative overflow-hidden">
            <View className="absolute top-0 bottom-0 left-0 right-0 bg-indigo-500 opacity-10" />
            <View className="absolute top-1/2 left-4 right-4 h-0.5 bg-red-500" />
            
            {/* Corner markers */}
            <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-500 rounded-tl-xl" />
            <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-500 rounded-tr-xl" />
            <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-indigo-500 rounded-bl-xl" />
            <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-indigo-500 rounded-br-xl" />
          </View>
        </View>

        {/* Header (Title & Actions) */}
        <View className="absolute top-12 left-0 right-0 flex-row justify-between items-center px-6">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-zinc-800 items-center justify-center mr-2 border border-zinc-700">
              <UserIcon size={16} color="white" />
            </View>
            <Text className="text-indigo-400 font-bold text-lg">InventoryFlow</Text>
          </View>
          <Pressable>
            <SearchIcon size={24} color="#818cf8" />
          </Pressable>
        </View>

        {/* Product Info Bottom Sheet */}
        {scannedData && (
          <View className="absolute bottom-6 left-4 right-4 bg-white rounded-3xl p-6 shadow-lg border border-zinc-200">
            <View className="flex-row items-center mb-4">
              <View className="w-16 h-16 bg-zinc-100 rounded-xl mr-4 items-center justify-center">
                <CubeIcon size={32} color="#a1a1aa" />
              </View>
              <View className="flex-1">
                <Text className="text-zinc-500 font-medium text-xs">Código: {scannedData}</Text>
                <Text className="text-xl font-bold text-zinc-900 mt-1" numberOfLines={2}>
                  Producto Escaneado
                </Text>
              </View>
            </View>
            
            <View className="flex-row bg-zinc-100 rounded-xl p-1 mb-6">
              <Pressable className="flex-1 bg-white rounded-lg py-3 shadow-sm items-center">
                <Text className="font-bold text-zinc-800 text-xs">ENTRADA</Text>
              </Pressable>
              <Pressable className="flex-1 rounded-lg py-3 items-center">
                <Text className="font-bold text-zinc-500 text-xs">SALIDA</Text>
              </Pressable>
            </View>
            
            <View className="bg-indigo-50/50 rounded-2xl p-4 flex-row items-center justify-between border border-indigo-100">
              <Pressable className="w-10 h-10 items-center justify-center">
                <MinusIcon size={24} color="#52525b" />
              </Pressable>
              <View className="items-center">
                <Text className="text-[10px] font-bold text-zinc-500 tracking-wider">CANTIDAD</Text>
                <Text className="text-3xl font-bold text-indigo-700 mt-1">1</Text>
              </View>
              <Pressable className="w-10 h-10 items-center justify-center">
                <PlusIcon size={24} color="#4338ca" />
              </Pressable>
            </View>
            
            <Pressable 
              className="mt-6 bg-indigo-700 rounded-2xl py-4 flex-row items-center justify-center shadow-md shadow-indigo-500/30"
              onPress={() => setScannedData(null)}
            >
              <CheckCircleIcon size={22} color="white" />
              <Text className="text-white font-bold ml-2 text-base">Confirmar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

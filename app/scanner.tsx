import ScreenWrapper from "@/components/ScreenWrapper";
import { Text, View } from "react-native";

export default function ScannerPage() {
  return (
    <ScreenWrapper className="bg-black">
      <View className="flex-1 items-center justify-center gap-y-10">
        <Text className="text-3xl font-bold text-white">Escáner QR</Text>
        
        <View className="items-center bg-zinc-900 w-64 h-64 rounded-3xl border-2 border-dashed border-zinc-700 justify-center">
          <Text className="text-zinc-600 font-medium text-center">
            [ Espacio para la Cámara ]
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}

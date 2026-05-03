import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useBiometricAuth = () => {
  const router = useRouter();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [authType, setAuthType] = useState<string>('biometría');

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(hasHardware);

      if (hasHardware) {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        
        if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          setAuthType('huella');
        } 
       
        else if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          setAuthType('rostro');
        }
      }
    })();
  }, []);

  const handleBiometricAuth = async () => {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isEnrolled) {
      Alert.alert(
        "No configurado", 
        `No has registrado tu ${authType} en este dispositivo. Por favor, configúralo en los ajustes de tu teléfono.`
      );
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: `Inicia sesión con tu ${authType}`,
      fallbackLabel: 'Usar contraseña',
    });

    if (result.success) {
      router.replace('/home');
      return true;
    }

    return false;
  };

  return { 
    handleBiometricAuth, 
    isBiometricSupported,
    authType // 'huella', 'rostro' o 'biometría'
  };
};

import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export function useAuthRedirect() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // Si no hay sesión y no estamos en la carpeta (auth) -> Al Login
      router.replace('/login');
    } else if (session && inAuthGroup) {
      // Si hay sesión pero seguimos en la carpeta (auth) -> Al Home
      router.replace('/home');
    }
  }, [session, loading, segments, pathname]);

  return { loading, session };
}

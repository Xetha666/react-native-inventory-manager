import Loader from '@/components/Loader';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

export default function Index() {
  const { session, loading } = useAuth();

  // Mientras carga la sesión inicial, mostramos el Splash
  if (loading) return <Loader variant="splash" />;

  // Si ya hay sesión, vamos al home, si no, al login
  return <Redirect href={session ? "/home" : "/login"} />;
}

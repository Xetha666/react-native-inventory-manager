import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://xhegxxjnkrhxffftpdqt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZWd4eGpua3JoeGZmZnRwZHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTI5NjIsImV4cCI6MjA5NDMyODk2Mn0.J6lIfaEmMhw-L35FBO6TW9PpaZnEudOk1hQYd6i9HsI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

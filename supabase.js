import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://qyjsnavzfkzpwiwkxtev.supabase.co";  
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5anNuYXZ6Zmt6cHdpd2t4dGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MjU5NTMsImV4cCI6MjA3MTEwMTk1M30.Z6ysY80Ede5OXMw68jbiA1886cCcEDVaVN-iLZKavFc";                    

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

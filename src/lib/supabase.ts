import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Membuat instance klien Supabase tunggal untuk digunakan di seluruh proyek
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

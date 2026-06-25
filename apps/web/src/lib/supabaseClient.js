import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

// Provide a valid fallback URL if the env var is missing or not a valid URL format
if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  supabaseUrl = 'https://placeholder.supabase.co';
}

export const supabase = createClient(supabaseUrl, supabaseKey);

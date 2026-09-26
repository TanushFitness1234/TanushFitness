import { createClient } from '@supabase/supabase-js';
import { env } from './env';

if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️ Supabase URL or Service Role Key missing in environment.');
}

// Client with Service Role privileges for server-side administrative operations
export const supabaseAdmin = createClient(
  env.SUPABASE_URL || 'https://lpnfwludlkygysxtohkw.supabase.co',
  env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Client with Anon key for public/client operations if needed
export const supabaseAnon = createClient(
  env.SUPABASE_URL || 'https://lpnfwludlkygysxtohkw.supabase.co',
  env.SUPABASE_ANON_KEY || ''
);

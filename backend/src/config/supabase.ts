import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from './env';

const SUPABASE_URL = env.SUPABASE_URL || 'https://lpnfwludlkygysxtohkw.supabase.co';
const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';
const ANON_KEY = env.SUPABASE_ANON_KEY || '';

let supabaseAdmin: SupabaseClient;
let supabaseAnon: SupabaseClient;

if (!SERVICE_ROLE_KEY || !ANON_KEY) {
  console.warn('⚠️ Supabase keys missing in environment. Supabase features will be unavailable.');
  console.warn('⚠️ Set SUPABASE_SERVICE_ROLE_KEY and SUPABASE_ANON_KEY to enable Supabase.');
}

try {
  // Client with Service Role privileges for server-side administrative operations
  supabaseAdmin = SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : (null as unknown as SupabaseClient);
} catch (error) {
  console.warn('⚠️ Failed to initialize Supabase Admin client:', error);
  supabaseAdmin = null as unknown as SupabaseClient;
}

try {
  // Client with Anon key for public/client operations if needed
  supabaseAnon = ANON_KEY
    ? createClient(SUPABASE_URL, ANON_KEY)
    : (null as unknown as SupabaseClient);
} catch (error) {
  console.warn('⚠️ Failed to initialize Supabase Anon client:', error);
  supabaseAnon = null as unknown as SupabaseClient;
}

export { supabaseAdmin, supabaseAnon };

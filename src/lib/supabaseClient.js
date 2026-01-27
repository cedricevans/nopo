// Re-export the singleton Supabase client from customSupabaseClient to avoid
// accidentally creating multiple GoTrueClient instances during HMR or when
// different modules import different client files.
import { supabase } from './customSupabaseClient';

export { supabase };
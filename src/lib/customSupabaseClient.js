import { createClient } from '@supabase/supabase-js';

// Prefer env-based configuration but fall back to the embedded values if present.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uwfobkqyiwajxzehsguq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Zm9ia3F5aXdhanh6ZWhzZ3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTEwMTQsImV4cCI6MjA3MzA4NzAxNH0.r75fv3dYyKpBUhZxnuwtJkXmf58y82HVZGo4AluKSRM';

// Runtime check for valid URL
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
    throw new Error('[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing or invalid!\n' +
        `VITE_SUPABASE_URL: ${supabaseUrl}\nVITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '[set]' : '[missing]'}`);
}

// Ensure a single Supabase client instance across HMR / module reloads.
const globalRef = typeof globalThis !== 'undefined' ? globalThis : window;

if (!globalRef.__nopo_supabase) {
    globalRef.__nopo_supabase = createClient(supabaseUrl, supabaseAnonKey);
}

const supabase = globalRef.__nopo_supabase;

export default supabase;
export { supabase };

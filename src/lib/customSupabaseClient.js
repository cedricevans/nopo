import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uwfobkqyiwajxzehsguq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Zm9ia3F5aXdhanh6ZWhzZ3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTEwMTQsImV4cCI6MjA3MzA4NzAxNH0.r75fv3dYyKpBUhZxnuwtJkXmf58y82HVZGo4AluKSRM';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};

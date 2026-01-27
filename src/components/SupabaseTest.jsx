import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('test_table').select('*').limit(1);
        if (error) {
          setStatus('Supabase connection failed: ' + error.message);
        } else {
          setStatus('Supabase connection successful!');
        }
      } catch (err) {
        setStatus('Supabase connection error: ' + err.message);
      }
    }
    testConnection();
  }, []);

  return <div>{status}</div>;
}

import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const requireEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing ${name}. Set it in the server environment.`);
  }
  return value;
};

const SUPABASE_URL = requireEnv(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  'SUPABASE_URL'
);
const SUPABASE_SERVICE_ROLE_KEY = requireEnv(
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  'SUPABASE_SERVICE_ROLE_KEY'
);
const VERIFIER_PEPPER = requireEnv(
  process.env.TRACKING_VERIFIER_PEPPER,
  'TRACKING_VERIFIER_PEPPER'
);

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const normalizeLast4 = (value: string) => {
  const digits = (value || '').replace(/\D/g, '');
  return digits.length >= 4 ? digits.slice(-4) : '';
};

const hashVerifier = (value: string) => {
  return crypto.createHmac('sha256', VERIFIER_PEPPER).update(value).digest('hex');
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { trackingCode, phoneLast4 } = req.body || {};

    if (!trackingCode || !phoneLast4) {
      res.status(400).json({ error: 'Missing trackingCode or phoneLast4.' });
      return;
    }

    const last4 = normalizeLast4(phoneLast4);
    if (!last4) {
      res.status(400).json({ error: 'phoneLast4 must include 4 digits.' });
      return;
    }

    const verifierHash = hashVerifier(last4);

    const { data, error } = await supabase
      .from('cases')
      .select('id, tracking_code, tracking_verifier_hint, status, status_stage, summary, next_steps, created_at')
      .eq('tracking_code', trackingCode)
      .eq('tracking_verifier_hash', verifierHash)
      .single();

    if (error) {
      res.status(404).json({ error: 'No case found with that tracking code.' });
      return;
    }

    res.status(200).json({ case: data });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Server error.' });
  }
}

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
const DEFAULT_TENANT_ID = process.env.DEFAULT_TENANT_ID || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const TRACKING_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const normalizeLast4 = (phone: string) => {
  const digits = (phone || '').replace(/\D/g, '');
  return digits.length >= 4 ? digits.slice(-4) : '';
};

const hashVerifier = (value: string) => {
  return crypto.createHmac('sha256', VERIFIER_PEPPER).update(value).digest('hex');
};

const generateTrackingCode = (length = 8) => {
  const bytes = crypto.randomBytes(length);
  let code = '';
  for (let i = 0; i < length; i += 1) {
    code += TRACKING_ALPHABET[bytes[i] % TRACKING_ALPHABET.length];
  }
  return code;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const {
      tenantId,
      ticketId,
      firmId,
      userId,
      contactName,
      contactEmail,
      contactPhone,
      locale,
      language,
      summary,
      nextSteps,
      extra,
    } = req.body || {};

    const resolvedTenantId = tenantId || DEFAULT_TENANT_ID;

    if (!resolvedTenantId) {
      res.status(400).json({ error: 'Missing tenantId.' });
      return;
    }

    if (!contactPhone) {
      res.status(400).json({ error: 'Missing contactPhone for tracking verifier.' });
      return;
    }

    const last4 = normalizeLast4(contactPhone);
    if (!last4) {
      res.status(400).json({ error: 'contactPhone must include at least 4 digits.' });
      return;
    }

    const verifierHash = hashVerifier(last4);
    const verifierHint = `••••${last4}`;

    let createdCase: any = null;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const trackingCode = generateTrackingCode(8);
      const payload = {
        tenant_id: resolvedTenantId,
        firm_id: firmId || null,
        ticket_id: ticketId || null,
        user_id: userId || null,
        tracking_code: trackingCode,
        tracking_verifier_type: 'phone_last4',
        tracking_verifier_hash: verifierHash,
        tracking_verifier_hint: verifierHint,
        contact_name: contactName || null,
        contact_email: contactEmail || null,
        contact_phone: contactPhone || null,
        locale: locale || null,
        language: language || null,
        summary: summary || null,
        next_steps: nextSteps || null,
        extra: extra || null,
      };

      const { data, error } = await supabase
        .from('cases')
        .insert(payload)
        .select('*')
        .single();

      if (!error) {
        createdCase = data;
        break;
      }

      if (error.code !== '23505') {
        throw error;
      }
    }

    if (!createdCase) {
      res.status(500).json({ error: 'Failed to allocate a unique tracking code.' });
      return;
    }

    if (ticketId) {
      await supabase
        .from('tickets')
        .update({ case_id: createdCase.id })
        .eq('id', ticketId);
    }

    res.status(200).json({
      case: createdCase,
      tracking: {
        tracking_code: createdCase.tracking_code,
        verifier_type: createdCase.tracking_verifier_type,
        verifier_hint: createdCase.tracking_verifier_hint,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Server error.' });
  }
}

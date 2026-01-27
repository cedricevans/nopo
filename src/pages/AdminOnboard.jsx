import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const AdminOnboard = () => {
  const [tenantName, setTenantName] = useState('');
  const [tenantDomain, setTenantDomain] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateTenant = async (e) => {
    e.preventDefault();
    setLoading(true);
    // 1. Create tenant
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({ name: tenantName, domain: tenantDomain })
      .select()
      .single();
    if (tenantError) {
      toast({ title: 'Error', description: tenantError.message, variant: 'destructive' });
      setLoading(false);
      return;
    }
    // 2. Create admin user for tenant
    const { error: userError } = await supabase
      .from('users')
      .insert({ email: adminEmail, tenant_id: tenant.id, role: 'admin' });
    if (userError) {
      toast({ title: 'Error', description: userError.message, variant: 'destructive' });
      setLoading(false);
      return;
    }
    toast({ title: 'Success', description: 'Tenant and admin created!' });
    setTenantName('');
    setTenantDomain('');
    setAdminEmail('');
    setLoading(false);
  };

  return (
  <div className="max-w-lg mx-auto mt-[150px] mb-[30px] p-8 bg-[#0A1A2F] rounded-xl shadow-lg border border-[#C6FF4D] text-white">
      <h1 className="text-2xl font-bold mb-6">Onboard New Law Firm / Tenant</h1>
      <form onSubmit={handleCreateTenant} className="space-y-4">
        <Input
          placeholder="Firm Name"
          value={tenantName}
          onChange={e => setTenantName(e.target.value)}
          required
        />
        <Input
          placeholder="Firm Domain (optional)"
          value={tenantDomain}
          onChange={e => setTenantDomain(e.target.value)}
        />
        <Input
          placeholder="Admin Email"
          value={adminEmail}
          onChange={e => setAdminEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full bg-[#C6FF4D] text-[#0A1A2F] font-bold">
          {loading ? 'Creating...' : 'Create Tenant'}
        </Button>
      </form>
    </div>
  );
};

export default AdminOnboard;

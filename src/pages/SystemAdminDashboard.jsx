// SystemAdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Building2,
  Users,
  Ticket,
  CreditCard,
  FileText,
  UserPlus,
  Search,
  RefreshCcw,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "tenants", label: "Tenants", icon: Building2 },
  { key: "users", label: "Users", icon: Users },
  { key: "tickets", label: "Tickets", icon: Ticket },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "logs", label: "Logs", icon: FileText },
  { key: "onboarding", label: "Onboarding", icon: UserPlus },
];

const norm = (v) => String(v || "").trim();

const formatDate = (iso) => {
  if (!iso) return "N/A";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "N/A";
  return d.toISOString().slice(0, 10);
};

const statusBadgeClass = (status) => {
  const s = String(status || "").toLowerCase();

  if (s.includes("review")) return "bg-amber-500/15 text-amber-300 border-amber-500/20";
  if (s.includes("open")) return "bg-sky-500/15 text-sky-300 border-sky-500/20";
  if (s.includes("closed") || s.includes("resolved")) return "bg-emerald-500/15 text-emerald-300 border-emerald-500/20";
  if (s.includes("hold") || s.includes("pending")) return "bg-violet-500/15 text-violet-300 border-violet-500/20";

  return "bg-white/5 text-white/70 border-white/10";
};

function SidebarItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-[#C6FF4D]/10 text-[#C6FF4D] border border-[#C6FF4D]/25"
          : "text-white/80 hover:text-white hover:bg-white/5 border border-transparent",
      ].join(" ")}
    >
      <Icon className="w-4 h-4" />
      <span className="truncate">{item.label}</span>
    </button>
  );
}

function MetricCard({ label, value, sub }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xs uppercase tracking-[0.2em] text-white/60">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
        {sub ? <div className="mt-1 text-sm text-white/60">{sub}</div> : null}
      </CardContent>
    </Card>
  );
}

function EmptyState({ title, description, action }) {
  return (
    <Card className="border border-white/10 bg-[#071225]">
      <CardContent className="py-10 text-center">
        <div className="text-white font-semibold">{title}</div>
        <div className="mt-2 text-sm text-white/60">{description}</div>
        {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
      </CardContent>
    </Card>
  );
}

export default function SystemAdminDashboard() {
  const { toast } = useToast();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [activeView, setActiveView] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [tenants, setTenants] = useState([]);
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [selectedTenant, setSelectedTenant] = useState(null);

  const [globalSearch, setGlobalSearch] = useState("");

  const [tenantSearch, setTenantSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [ticketSearch, setTicketSearch] = useState("");
  const [ticketStatus, setTicketStatus] = useState("all");

  const [tenantName, setTenantName] = useState("");
  const [tenantDomain, setTenantDomain] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [onboardLoading, setOnboardLoading] = useState(false);

  const tenantById = useMemo(() => {
    const m = new Map();
    for (const t of tenants) m.set(t.id, t);
    return m;
  }, [tenants]);

  const overview = useMemo(() => {
    const totalTenants = tenants.length;
    const totalUsers = users.length;
    const totalTickets = tickets.length;

    const inReview = tickets.filter((t) => String(t.status || "").toLowerCase().includes("review")).length;
    const open = tickets.filter((t) => String(t.status || "").toLowerCase().includes("open")).length;
    const closed = tickets.filter((t) => {
      const s = String(t.status || "").toLowerCase();
      return s.includes("closed") || s.includes("resolved");
    }).length;

    const latestTickets = [...tickets]
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
      .slice(0, 8);

    const latestTenants = [...tenants]
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
      .slice(0, 6);

    return {
      totalTenants,
      totalUsers,
      totalTickets,
      inReview,
      open,
      closed,
      latestTickets,
      latestTenants,
    };
  }, [tenants, users, tickets]);

  const filteredTenants = useMemo(() => {
    const q = (tenantSearch || globalSearch).trim().toLowerCase();
    if (!q) return tenants;

    return tenants.filter((t) => {
      const hay = `${t.name || ""} ${t.domain || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [tenants, tenantSearch, globalSearch]);

  const filteredUsers = useMemo(() => {
    const q = (userSearch || globalSearch).trim().toLowerCase();
    if (!q) return users;

    return users.filter((u) => {
      const tn = tenantById.get(u.tenant_id)?.name || "";
      const hay = `${u.email || ""} ${u.role || ""} ${tn}`.toLowerCase();
      return hay.includes(q);
    });
  }, [users, userSearch, globalSearch, tenantById]);

  const filteredTickets = useMemo(() => {
    const q = (ticketSearch || globalSearch).trim().toLowerCase();

    return tickets
      .filter((t) => {
        if (ticketStatus === "all") return true;
        return String(t.status || "").toLowerCase() === ticketStatus;
      })
      .filter((t) => {
        if (!q) return true;
        const tn = tenantById.get(t.tenant_id)?.name || "";
        const hay = `${t.ticket_number || ""} ${t.id || ""} ${t.status || ""} ${tn}`.toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  }, [tickets, ticketSearch, globalSearch, ticketStatus, tenantById]);

  const reloadAll = async () => {
    setLoading(true);
    try {
      const [tenantsRes, usersRes, ticketsRes] = await Promise.all([
        supabase.from("tenants").select("*"),
        supabase.from("users").select("*"),
        supabase.from("tickets").select("*"),
      ]);

      setTenants(tenantsRes.data || []);
      setUsers(usersRes.data || []);
      setTickets(ticketsRes.data || []);
    } catch (e) {
      toast({ title: "Error", description: "Failed to load data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateTenant = async (e) => {
    e.preventDefault();
    setOnboardLoading(true);

    const { data, error } = await supabase
      .from("tenants")
      .insert([{ name: tenantName, domain: tenantDomain }])
      .select("*");

    setOnboardLoading(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    setTenantName("");
    setTenantDomain("");
    setAdminEmail("");

    toast({ title: "Tenant created", description: "New tenant onboarded." });

    setTenants((prev) => [...prev, ...(data || [])]);
    setActiveView("tenants");
  };

  const PageHeader = ({ title, subtitle }) => {
    return (
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="text-2xl md:text-3xl font-bold text-white truncate">{title}</div>
          {subtitle ? <div className="mt-1 text-sm text-white/60">{subtitle}</div> : null}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="relative w-full sm:w-[340px]">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search across the platform"
              className="pl-10 bg-[#071225] border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <Button
            variant="outline"
            onClick={reloadAll}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    );
  };

  const SidebarContent = ({ onNavigate }) => {
    return (
      <>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-sm text-white/60 uppercase tracking-[0.2em]">NoPo</div>
              <div className="text-lg font-bold text-white truncate">Super Admin</div>
            </div>
            <Badge className="bg-[#C6FF4D]/15 text-[#C6FF4D] border border-[#C6FF4D]/25">Live</Badge>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <div className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Tenants</div>
              <div className="text-white font-semibold">{overview.totalTenants}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <div className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Users</div>
              <div className="text-white font-semibold">{overview.totalUsers}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <div className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Tickets</div>
              <div className="text-white font-semibold">{overview.totalTickets}</div>
            </div>
          </div>
        </div>

        <div className="px-3 pb-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 px-2 mb-2">Navigation</div>
          <div className="space-y-1 px-3">
            {NAV.map((item) => (
              <SidebarItem
                key={item.key}
                item={item}
                active={activeView === item.key}
                onClick={() => {
                  setSelectedTenant(null);
                  setActiveView(item.key);
                  if (onNavigate) onNavigate(item.key);
                }}
              />
            ))}
          </div>
        </div>

        <div className="px-4 pb-5">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/70">Quick actions</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                size="sm"
                className="bg-[#C6FF4D] text-[#0A1A2F] font-bold hover:bg-[#C6FF4D]/90"
                onClick={() => { setActiveView("onboarding"); if (onNavigate) onNavigate('onboarding'); }}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                New tenant
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                onClick={() => { setActiveView("tickets"); if (onNavigate) onNavigate('tickets'); }}
              >
                <Ticket className="w-4 h-4 mr-2" />
                Tickets
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const AdminTopBar = () => {
    return (
      <div className="w-full border-b border-white/6 bg-[#071225]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="md:hidden rounded-md p-2 text-white/90 bg-white/5 border border-white/10"
                aria-label="Open admin menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden md:flex items-center gap-2">
                {NAV.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => { setSelectedTenant(null); setActiveView(item.key); }}
                    className={[
                      "text-sm px-3 py-2 rounded-md",
                      activeView === item.key
                        ? "bg-[#C6FF4D]/10 text-[#C6FF4D]"
                        : "text-white/80 hover:bg-white/5",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={reloadAll}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <a
                href="/"
                className="ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm bg-transparent text-white/80 hover:bg-white/5"
              >
                Return to site
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Shell = ({ children }) => {
    return (
      <div className="min-h-[70vh] mt-[20px] mb-[30px]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="relative rounded-2xl border border-[#C6FF4D]/20 bg-[#0A1A2F] shadow-lg overflow-hidden font-sans">
            <AdminTopBar />

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
              <aside className="hidden lg:block border-b lg:border-b-0 lg:border-r border-white/10 bg-[#071225]">
                <SidebarContent onNavigate={(k) => { setActiveView(k); setSelectedTenant(null); }} />
              </aside>

              <section className={`p-4 md:p-6 ${activeView === 'onboarding' ? 'pt-6 md:pt-8' : ''}`}>
                {loading ? (
                  <div className="text-white/70">Loading...</div>
                ) : (
                  <div className="space-y-6">{children}</div>
                )}
              </section>
            </div>

            {/* Mobile drawer overlay */}
            {mobileOpen ? (
              <div className="fixed inset-0 z-50 flex md:hidden">
                <div className="w-80 max-w-[80%] border-r border-white/10 bg-[#071225]">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <div className="text-sm text-white/60 uppercase tracking-[0.2em]">NoPo</div>
                      <div className="text-lg font-bold text-white">Super Admin</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href="/" className="text-sm text-white/70 hover:underline mr-2">Return to site</a>
                      <button
                      type="button"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md p-2 text-white/90 bg-white/5 border border-white/10"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="overflow-y-auto">
                    <SidebarContent onNavigate={(k) => { setActiveView(k); setSelectedTenant(null); setMobileOpen(false); }} />
                  </div>
                </div>

                <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const OverviewView = () => {
    return (
      <>
        <PageHeader title="Command Center" subtitle="Operational view of tenants, users, and tickets." />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total tenants" value={overview.totalTenants} />
          <MetricCard label="Total users" value={overview.totalUsers} />
          <MetricCard label="Total tickets" value={overview.totalTickets} />
          <MetricCard label="Tickets in review" value={overview.inReview} sub={`Open ${overview.open}, Closed ${overview.closed}`} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border border-white/10 bg-[#071225]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-white">Latest tickets</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {overview.latestTickets.length ? (
                <div className="space-y-2">
                  {overview.latestTickets.map((t) => {
                    const tenantName = tenantById.get(t.tenant_id)?.name || "N/A";
                    return (
                      <div
                        key={t.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                      >
                        <div className="min-w-0">
                          <div className="text-sm text-white truncate">
                            Ticket {t.ticket_number || String(t.id).slice(0, 8)}
                          </div>
                          <div className="text-xs text-white/60 truncate">
                            {tenantName} · {formatDate(t.created_at)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={[
                              "text-[11px] px-2 py-1 rounded-md border whitespace-nowrap",
                              statusBadgeClass(t.status),
                            ].join(" ")}
                          >
                            {t.status || "Unknown"}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                            onClick={() => setActiveView("tickets")}
                          >
                            View
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-sm text-white/60">No tickets.</div>
              )}
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-[#071225]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-white">Latest tenants</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {overview.latestTenants.length ? (
                <div className="space-y-2">
                  {overview.latestTenants.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <div className="text-sm text-white truncate">{t.name || "Unnamed tenant"}</div>
                        <div className="text-xs text-white/60 truncate">
                          {t.domain || "No domain"} · {formatDate(t.created_at)}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => {
                          setSelectedTenant(t);
                          setActiveView("tenants");
                        }}
                      >
                        View
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-white/60">No tenants.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const TenantsView = () => {
    if (selectedTenant) {
      return (
        <>
          <PageHeader title="Tenants" subtitle="Tenant profile and drilldown." />

          <Card className="border border-white/10 bg-[#071225]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">{selectedTenant.name || "Unnamed tenant"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Domain</div>
                  <div className="mt-1 text-sm text-white">{selectedTenant.domain || "N/A"}</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Created</div>
                  <div className="mt-1 text-sm text-white">{formatDate(selectedTenant.created_at)}</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Tenant ID</div>
                  <div className="mt-1 text-sm text-white truncate">{selectedTenant.id}</div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70">
                Tenant drilldown panels go here: users, tickets, payments, logs.
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => setSelectedTenant(null)}
                >
                  Back
                </Button>
                <Button
                  className="bg-[#C6FF4D] text-[#0A1A2F] font-bold hover:bg-[#C6FF4D]/90"
                  onClick={() => setActiveView("tickets")}
                >
                  View tickets
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      );
    }

    return (
      <>
        <PageHeader title="Tenants" subtitle="Search, view, and manage tenants." />

        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <Card className="border border-white/10 bg-[#071225]">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-white text-base">All tenants</CardTitle>
                <div className="w-full md:w-[320px]">
                  <Input
                    value={tenantSearch}
                    onChange={(e) => setTenantSearch(e.target.value)}
                    placeholder="Search tenants"
                    className="bg-[#0A1A2F] border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {filteredTenants.length ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-base">
                    <thead>
                      <tr className="text-white/60">
                        <th className="py-3 pr-4 text-left font-medium">Name</th>
                        <th className="py-3 pr-4 text-left font-medium">Domain</th>
                        <th className="py-3 pr-4 text-left font-medium">Created</th>
                        <th className="py-3 text-right font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTenants.map((t) => (
                        <tr key={t.id} className="border-t border-white/10">
                          <td className="py-3 pr-4 text-white">{t.name || "Unnamed tenant"}</td>
                          <td className="py-3 pr-4 text-white/70">{t.domain || "N/A"}</td>
                          <td className="py-3 pr-4 text-white/70">{formatDate(t.created_at)}</td>
                          <td className="py-3 text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                              onClick={() => setSelectedTenant(t)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-sm text-white/60 py-6">No tenants found.</div>
              )}
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-[#071225]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Onboarding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-white/60">
                Create a tenant, then assign an admin user.
              </div>
              <Button
                className="w-full bg-[#C6FF4D] text-[#0A1A2F] font-bold hover:bg-[#C6FF4D]/90"
                onClick={() => setActiveView("onboarding")}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                New tenant
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const UsersView = () => {
    return (
      <>
        <PageHeader title="Users" subtitle="Search and review all platform users." />

        <Card className="border border-white/10 bg-[#071225]">
          <CardHeader className="pb-2">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-white text-base">All users</CardTitle>
              <div className="w-full md:w-[320px]">
                <Input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users"
                  className="bg-[#0A1A2F] border-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {filteredUsers.length ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-base">
                  <thead>
                    <tr className="text-white/60">
                      <th className="py-3 pr-4 text-left font-medium">Email</th>
                      <th className="py-3 pr-4 text-left font-medium">Role</th>
                      <th className="py-3 pr-4 text-left font-medium">Tenant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="border-t border-white/10">
                        <td className="py-3 pr-4 text-white">{u.email || "N/A"}</td>
                        <td className="py-3 pr-4 text-white/70">{u.role || "N/A"}</td>
                        <td className="py-3 pr-4 text-white/70">
                          {tenantById.get(u.tenant_id)?.name || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-sm text-white/60 py-6">No users found.</div>
            )}
          </CardContent>
        </Card>
      </>
    );
  };

  const TicketsView = () => {
    const distinctStatuses = useMemo(() => {
      const s = new Set();
      for (const t of tickets) {
        const v = String(t.status || "").toLowerCase().trim();
        if (v) s.add(v);
      }
      return ["all", ...Array.from(s)];
    }, [tickets]);

    return (
      <>
        <PageHeader title="Tickets" subtitle="Operational queue for support and case handling." />

        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <Card className="border border-white/10 bg-[#071225]">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-white text-base">All tickets</CardTitle>
                <div className="w-full md:w-[320px]">
                  <Input
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    placeholder="Search tickets"
                    className="bg-[#0A1A2F] border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {filteredTickets.length ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-base">
                    <thead>
                      <tr className="text-white/60">
                        <th className="py-3 pr-4 text-left font-medium">Ticket</th>
                        <th className="py-3 pr-4 text-left font-medium">Status</th>
                        <th className="py-3 pr-4 text-left font-medium">Tenant</th>
                        <th className="py-3 pr-4 text-left font-medium">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.slice(0, 250).map((t) => {
                        const tenantName = tenantById.get(t.tenant_id)?.name || "N/A";
                        return (
                          <tr key={t.id} className="border-t border-white/10">
                            <td className="py-3 pr-4 text-white">
                              {t.ticket_number || String(t.id).slice(0, 10)}
                            </td>
                            <td className="py-3 pr-4">
                              <span
                                className={[
                                  "text-[11px] px-2 py-1 rounded-md border whitespace-nowrap",
                                  statusBadgeClass(t.status),
                                ].join(" ")}
                              >
                                {t.status || "Unknown"}
                              </span>
                            </td>
                            <td className="py-3 pr-4 text-white/70">{tenantName}</td>
                            <td className="py-3 pr-4 text-white/70">{formatDate(t.created_at)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-sm text-white/60 py-6">No tickets found.</div>
              )}
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-[#071225]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Queue filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">Status</div>
              <div className="flex flex-wrap gap-2">
                {distinctStatuses.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant="outline"
                    className={[
                      "border-white/10 bg-white/5 text-white hover:bg-white/10",
                      ticketStatus === s ? "border-[#C6FF4D]/40 text-[#C6FF4D]" : "",
                    ].join(" ")}
                    onClick={() => setTicketStatus(s)}
                  >
                    {s === "all" ? "All" : s}
                  </Button>
                ))}
              </div>

              <div className="pt-2 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70">
                Payments and audit logs link into ticket activity once those tables exist.
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const PaymentsView = () => {
    return (
      <>
        <PageHeader title="Payments" subtitle="Billing and payouts overview." />
        <EmptyState
          title="Payments panel"
          description="Stripe view goes here: subscriptions, invoices, failed payments, refunds."
        />
      </>
    );
  };

  const LogsView = () => {
    return (
      <>
        <PageHeader title="Logs" subtitle="System events and audit trail." />
        <EmptyState
          title="Logs panel"
          description="Audit events go here: tenant creation, role changes, ticket lifecycle, payment events."
        />
      </>
    );
  };

  const OnboardingView = () => {
    return (
      <>
        <PageHeader title="Onboarding" subtitle="Create a tenant and set up an admin user." />

        <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
          <Card className="border border-white/10 bg-[#071225]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Create tenant</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTenant} className="space-y-3">
                <Input
                  placeholder="Firm name"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  required
                  className="bg-[#0A1A2F] border-white/10 text-white placeholder:text-white/40"
                />
                <Input
                  placeholder="Firm domain"
                  value={tenantDomain}
                  onChange={(e) => setTenantDomain(e.target.value)}
                  className="bg-[#0A1A2F] border-white/10 text-white placeholder:text-white/40"
                />
                <Input
                  placeholder="Admin email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className="bg-[#0A1A2F] border-white/10 text-white placeholder:text-white/40"
                />

                <Button
                  type="submit"
                  disabled={onboardLoading}
                  className="w-full bg-[#C6FF4D] text-[#0A1A2F] font-bold hover:bg-[#C6FF4D]/90"
                >
                  {onboardLoading ? "Creating..." : "Create tenant"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-[#071225]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-white/70">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                1. Create tenant record.
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                2. Create admin user, link to tenant.
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                3. Confirm domain, branding, and firm contact info.
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                4. Verify ticket intake and payment routing.
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderView = () => {
    if (activeView === "overview") return <OverviewView />;
    if (activeView === "tenants") return <TenantsView />;
    if (activeView === "users") return <UsersView />;
    if (activeView === "tickets") return <TicketsView />;
    if (activeView === "payments") return <PaymentsView />;
    if (activeView === "logs") return <LogsView />;
    if (activeView === "onboarding") return <OnboardingView />;
    return <OverviewView />;
  };

  return <Shell>{renderView()}</Shell>;
}
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const attorneys = ['Unassigned', 'Ava Carter', 'Liam Brooks', 'Priya Shah', 'Mateo Ruiz'];
const statusOptions = ['New', 'In Review', 'Awaiting Client', 'Filed', 'Court Scheduled', 'Resolved'];
const priorityOptions = ['Low', 'Medium', 'High'];
const intakeSources = ['Web', 'Partner', 'Manual'];

const mockTickets = [
  {
    id: 'CN-10428',
    clientName: 'Jordan Miles',
    phone: '(404) 555-0198',
    email: 'jordan.miles@email.com',
    state: 'GA',
    county: 'Fulton',
    courtLocation: 'Fulton County Traffic Court',
    violation: 'Speeding 15+',
    ticketNumber: 'GA-993482',
    courtDate: '2025-02-14',
    status: 'In Review',
    priority: 'High',
    assignedTo: 'Ava Carter',
    intakeSource: 'Web',
    lastUpdated: '2025-01-04',
    notes: 'Client wants dismissal due to calibration issues.',
    documents: ['Ticket photo', 'Vehicle registration'],
  },
  {
    id: 'CN-10431',
    clientName: 'Leslie Park',
    phone: '(678) 555-1142',
    email: 'leslie.park@email.com',
    state: 'GA',
    county: 'Dekalb',
    courtLocation: 'Dekalb County Court',
    violation: 'Red light',
    ticketNumber: 'GA-993611',
    courtDate: '2025-02-28',
    status: 'Awaiting Client',
    priority: 'Medium',
    assignedTo: 'Liam Brooks',
    intakeSource: 'Partner',
    lastUpdated: '2025-01-02',
    notes: 'Waiting on dashcam video upload.',
    documents: ['Ticket photo'],
  },
  {
    id: 'CN-10436',
    clientName: 'Morgan Chen',
    phone: '(770) 555-2319',
    email: 'morgan.chen@email.com',
    state: 'GA',
    county: 'Cobb',
    courtLocation: 'Cobb County Traffic Court',
    violation: 'No seatbelt',
    ticketNumber: 'GA-993889',
    courtDate: '2025-03-08',
    status: 'New',
    priority: 'Low',
    assignedTo: 'Unassigned',
    intakeSource: 'Web',
    lastUpdated: '2025-01-06',
    notes: '',
    documents: ['Ticket photo'],
  },
  {
    id: 'CN-10439',
    clientName: 'Riley Adams',
    phone: '(470) 555-7721',
    email: 'riley.adams@email.com',
    state: 'GA',
    county: 'Gwinnett',
    courtLocation: 'Gwinnett County Court',
    violation: 'Speeding 10-14',
    ticketNumber: 'GA-993905',
    courtDate: '2025-03-12',
    status: 'Court Scheduled',
    priority: 'Medium',
    assignedTo: 'Priya Shah',
    intakeSource: 'Manual',
    lastUpdated: '2025-01-05',
    notes: 'Court date confirmed. Client prefers no court appearance.',
    documents: ['Ticket photo', 'Court notice'],
  },
];

const createEmptyTicket = () => ({
  id: '',
  clientName: '',
  phone: '',
  email: '',
  state: '',
  county: '',
  courtLocation: '',
  violation: '',
  ticketNumber: '',
  courtDate: '',
  status: 'New',
  priority: 'Medium',
  assignedTo: 'Unassigned',
  intakeSource: 'Web',
  lastUpdated: '',
  notes: '',
  documents: [],
});

const AdminDashboard = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedId, setSelectedId] = useState(mockTickets[0]?.id);
  const [filters, setFilters] = useState({ status: 'All', attorney: 'All', search: '' });
  const [newTicket, setNewTicket] = useState(createEmptyTicket());
  const [alertMessage, setAlertMessage] = useState('');

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId) || tickets[0];

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStatus = filters.status === 'All' || ticket.status === filters.status;
      const matchesAttorney = filters.attorney === 'All' || ticket.assignedTo === filters.attorney;
      const search = filters.search.trim().toLowerCase();
      const matchesSearch =
        !search ||
        ticket.clientName.toLowerCase().includes(search) ||
        ticket.ticketNumber.toLowerCase().includes(search) ||
        ticket.id.toLowerCase().includes(search);
      return matchesStatus && matchesAttorney && matchesSearch;
    });
  }, [tickets, filters]);

  const metrics = useMemo(() => {
    const total = tickets.length;
    const inReview = tickets.filter((ticket) => ticket.status === 'In Review').length;
    const awaiting = tickets.filter((ticket) => ticket.status === 'Awaiting Client').length;
    const court = tickets.filter((ticket) => ticket.status === 'Court Scheduled').length;
    return { total, inReview, awaiting, court };
  }, [tickets]);

  const updateTicket = (field, value) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === selectedId ? { ...ticket, [field]: value, lastUpdated: new Date().toISOString().slice(0, 10) } : ticket
      )
    );
  };

  const addTicket = (event) => {
    event.preventDefault();
    if (!newTicket.clientName || !newTicket.ticketNumber) return;
    const record = {
      ...newTicket,
      id: `CN-${Math.floor(Math.random() * 90000) + 10000}`,
      lastUpdated: new Date().toISOString().slice(0, 10),
      documents: newTicket.documents.filter(Boolean),
    };
    setTickets((prev) => [record, ...prev]);
    setSelectedId(record.id);
    setNewTicket(createEmptyTicket());
    setAlertMessage(`New ticket added: ${record.id}`);
  };

  const playNotification = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = 880;
      gain.gain.value = 0.08;
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.15);
      oscillator.onended = () => audioContext.close();
    } catch {}
  }, []);

  useEffect(() => {
    if (!alertMessage) return undefined;
    if (alertMessage.toLowerCase().includes('new ticket')) {
      playNotification();
    }
    const timeout = setTimeout(() => setAlertMessage(''), 4000);
    return () => clearTimeout(timeout);
  }, [alertMessage, playNotification]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickets((prev) => {
        if (prev.length === 0) return prev;
        const shouldAdd = Math.random() < 0.35;
        if (shouldAdd) {
          const newRecord = {
            ...createEmptyTicket(),
            id: `CN-${Math.floor(Math.random() * 90000) + 10000}`,
            clientName: 'New Intake',
            ticketNumber: `GA-${Math.floor(Math.random() * 900000) + 100000}`,
            state: 'GA',
            county: 'Fulton',
            courtLocation: 'Fulton County Traffic Court',
            violation: 'Speeding 10-14',
            courtDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            status: 'New',
            priority: 'Medium',
            intakeSource: 'Web',
            lastUpdated: new Date().toISOString().slice(0, 10),
            documents: ['Ticket photo'],
          };
          setAlertMessage(`New ticket received: ${newRecord.id}`);
          return [newRecord, ...prev];
        }

        const index = Math.floor(Math.random() * prev.length);
        const ticket = prev[index];
        const nextStatus =
          ticket.status === 'New'
            ? 'In Review'
            : ticket.status === 'In Review'
              ? 'Awaiting Client'
              : ticket.status === 'Awaiting Client'
                ? 'Court Scheduled'
                : ticket.status === 'Court Scheduled'
                  ? 'Resolved'
                  : 'In Review';
        const updated = {
          ...ticket,
          status: nextStatus,
          lastUpdated: new Date().toISOString().slice(0, 10),
        };
        const next = [...prev];
        next[index] = updated;
        return next;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-slate-900 pt-36 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {alertMessage && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#4EA1FF]/40 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
            <span>{alertMessage}</span>
            {alertMessage.toLowerCase().includes('new ticket') && (
              <span className="rounded-full border border-[#4EA1FF]/40 bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                New ticket
              </span>
            )}
          </div>
        )}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-600 font-semibold">Admin Command Center</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold">Ticket Operations Dashboard</h1>
            <p className="mt-3 text-slate-700 max-w-2xl">
              Track every ticket, assign attorneys, and update intake details in one place.
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
              Live demo updates every 30 seconds
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Data source</p>
            <p className="mt-2 text-sm text-slate-900">Mock data (Supabase-ready)</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Tickets', value: metrics.total },
            { label: 'In Review', value: metrics.inReview },
            { label: 'Awaiting Client', value: metrics.awaiting },
            { label: 'Court Scheduled', value: metrics.court },
          ].map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap gap-3">
              <input
                value={filters.search}
                onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
                placeholder="Search by name, ticket, or ID"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400"
              />
              <div className="flex gap-2 w-full">
                <select
                  value={filters.status}
                  onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="All">All Statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  value={filters.attorney}
                  onChange={(event) => setFilters((prev) => ({ ...prev, attorney: event.target.value }))}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="All">All Attorneys</option>
                  {attorneys.map((attorney) => (
                    <option key={attorney} value={attorney}>
                      {attorney}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {filteredTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedId(ticket.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    ticket.id === selectedId
                      ? 'border-[#4EA1FF]/40 bg-[#F0F6FF]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{ticket.status}</span>
                    <span>{ticket.lastUpdated}</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{ticket.clientName}</p>
                  <p className="text-sm text-slate-500">
                    {ticket.violation} · {ticket.county}, {ticket.state}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">{ticket.id}</span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                      {ticket.assignedTo}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                      {ticket.priority} priority
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Ticket details</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">{selectedTicket?.clientName || 'Select a ticket'}</h2>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500">
                  {selectedTicket?.id}
                </span>
              </div>

              {selectedTicket && (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="text-sm text-slate-600">
                    Status
                    <select
                      value={selectedTicket.status}
                      onChange={(event) => updateTicket('status', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm text-slate-600">
                    Assigned attorney
                    <select
                      value={selectedTicket.assignedTo}
                      onChange={(event) => updateTicket('assignedTo', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                    >
                      {attorneys.map((attorney) => (
                        <option key={attorney} value={attorney}>
                          {attorney}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm text-slate-600">
                    Court date
                    <input
                      type="date"
                      value={selectedTicket.courtDate}
                      onChange={(event) => updateTicket('courtDate', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                  <label className="text-sm text-slate-600">
                    Court location
                    <input
                      type="text"
                      value={selectedTicket.courtLocation}
                      onChange={(event) => updateTicket('courtLocation', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                  <label className="text-sm text-slate-600">
                    Priority
                    <select
                      value={selectedTicket.priority}
                      onChange={(event) => updateTicket('priority', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                    >
                      {priorityOptions.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm text-slate-600">
                    Client contact
                    <input
                      type="text"
                      value={`${selectedTicket.phone} · ${selectedTicket.email}`}
                      disabled
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400"
                    />
                  </label>
                  <label className="text-sm text-slate-600">
                    Ticket number
                    <input
                      type="text"
                      value={selectedTicket.ticketNumber}
                      onChange={(event) => updateTicket('ticketNumber', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                  <label className="text-sm text-slate-600 md:col-span-2">
                    Notes
                    <textarea
                      rows="3"
                      value={selectedTicket.notes}
                      onChange={(event) => updateTicket('notes', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Quick intake</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Add a new ticket</h2>
              <form onSubmit={addTicket} className="mt-4 grid gap-4 md:grid-cols-2">
                <input
                  value={newTicket.clientName}
                  onChange={(event) => setNewTicket((prev) => ({ ...prev, clientName: event.target.value }))}
                  placeholder="Client name"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                />
                <input
                  value={newTicket.ticketNumber}
                  onChange={(event) => setNewTicket((prev) => ({ ...prev, ticketNumber: event.target.value }))}
                  placeholder="Ticket number"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                />
                <input
                  value={newTicket.violation}
                  onChange={(event) => setNewTicket((prev) => ({ ...prev, violation: event.target.value }))}
                  placeholder="Violation"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                />
                <input
                  value={newTicket.courtDate}
                  onChange={(event) => setNewTicket((prev) => ({ ...prev, courtDate: event.target.value }))}
                  placeholder="Court date"
                  type="date"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                />
                <input
                  value={newTicket.courtLocation}
                  onChange={(event) => setNewTicket((prev) => ({ ...prev, courtLocation: event.target.value }))}
                  placeholder="Court location"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                />
                <input
                  value={newTicket.state}
                  onChange={(event) => setNewTicket((prev) => ({ ...prev, state: event.target.value }))}
                  placeholder="State"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                />
                <input
                  value={newTicket.county}
                  onChange={(event) => setNewTicket((prev) => ({ ...prev, county: event.target.value }))}
                  placeholder="County"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                />
                <select
                  value={newTicket.intakeSource}
                  onChange={(event) => setNewTicket((prev) => ({ ...prev, intakeSource: event.target.value }))}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  {intakeSources.map((source) => (
                    <option key={source} value={source}>
                      {source} intake
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1D4ED8]"
                >
                  Add ticket
                </button>
              </form>
              <p className="mt-3 text-xs text-slate-500">
                Demo mode uses editable mock data. Swap in Supabase when ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;

import React from 'react';

const InvestorGuide = () => (
  <main className="bg-[#050e19] text-white">
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(78,161,255,0.22),_transparent_55%),radial-gradient(circle_at_80%_10%,_rgba(198,255,77,0.2),_transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28 sm:pt-32">
        <div className="rounded-3xl border border-white/10 bg-[#0A1A2F]/85 p-6 sm:p-8 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C6FF4D] font-semibold">
            Investor Guide
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
            NoPo: What You Are Buying
          </h1>
          <p className="mt-4 text-base text-white/80 max-w-2xl">
            A plain-English overview of the AI-powered ticket intake and strategy platform, revenue model, and
            partnership paths. Built for CEOs, managing partners, and investors who want clarity fast.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <span className="text-sm uppercase tracking-[0.2em] text-white/50">Product in one sentence</span>
            <h2 className="mt-3 text-xl sm:text-2xl font-semibold">
              We turn traffic tickets into clean, case-ready files and route them to the right attorney in minutes.
            </h2>
            <p className="mt-3 text-base text-white/70">
              Citation Nation combines AI ticket analysis, guided intake, and a lawyer dashboard so firms can
              take more cases without adding staff overhead.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 text-base text-white/70">
              <div>
                <p className="text-white font-semibold">Drivers</p>
                <p>Upload a ticket and get clear next steps.</p>
              </div>
              <div>
                <p className="text-white font-semibold">Law Firms</p>
                <p>Receive qualified cases with supporting evidence.</p>
              </div>
              <div>
                <p className="text-white font-semibold">Partners</p>
                <p>White-label or revenue-share access to the platform.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <span className="text-sm uppercase tracking-[0.2em] text-white/50">Quick facts</span>
            <div className="mt-4 grid gap-4">
              <div className="rounded-xl border border-white/10 bg-[#0A1A2F] p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">Primary revenue</p>
                <p className="mt-2 text-lg font-semibold">Per-ticket fees + firm subscriptions</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0A1A2F] p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">Core asset</p>
                <p className="mt-2 text-lg font-semibold">Proprietary intake + routing workflow</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0A1A2F] p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">Go-to-market</p>
                <p className="mt-2 text-lg font-semibold">Attorney partnerships + direct consumer flow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">The problem</p>
          <h2 className="mt-3 text-xl font-semibold">Ticket cases are profitable but messy to intake.</h2>
          <ul className="mt-4 space-y-3 text-white/70 text-base">
            <li>Manual intake wastes time and leads to dropped cases.</li>
            <li>Firms struggle to qualify tickets fast enough.</li>
            <li>Drivers delay action because they do not understand next steps.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">The solution</p>
          <h2 className="mt-3 text-xl font-semibold">Automated intake with a case-ready output.</h2>
          <ul className="mt-4 space-y-3 text-white/70 text-base">
            <li>OCR + AI extract violations, court dates, and key facts.</li>
            <li>Guided intake fills gaps with simple questions.</li>
            <li>Attorney dashboard tracks status, documents, and next steps.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">What a buyer gets</p>
        <h2 className="mt-3 text-xl font-semibold">You are buying a revenue engine, not just software.</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-white/70 text-base">
          <li>Platform access: intake, analytics, and case tracking.</li>
          <li>Case-ready output: structured summaries that reduce staff time.</li>
          <li>Lead flow: inbound drivers routed to your firm or territory.</li>
          <li>Brand leverage: white-label options for your own customer experience.</li>
        </ul>
        <p className="mt-4 text-sm text-white/50">
          We can structure this as equity, licensing, or revenue-share depending on your strategy.
        </p>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">Offering paths</p>
        <h2 className="mt-3 text-xl font-semibold">Choose the model that fits your organization.</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#C6FF4D]/60 bg-[#C6FF4D]/25 p-5 text-white">
            <h3 className="text-lg font-semibold">Strategic Investment</h3>
            <p className="mt-2 text-base text-white/80">Equity participation in the core company.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-white">
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1">Target raise: $250k to $1.5M</span>
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1">Use of funds: product + sales</span>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/70">What you get</p>
            <ul className="mt-4 space-y-2 text-base text-white/80">
              <li>Board or advisor seat optional.</li>
              <li>Access to roadmap and KPIs.</li>
              <li>Priority in future territory licensing.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold">Revenue-Share Partnership</h3>
            <p className="mt-2 text-base text-white/70">
              Operate the platform in your region or firm with shared revenue.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-white/80">
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">Setup: $5k to $25k</span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">Rev share: 15% to 35%</span>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/50">What you get</p>
            <ul className="mt-4 space-y-2 text-base text-white/70">
              <li>Co-branded intake portal.</li>
              <li>Shared marketing ownership.</li>
              <li>Monthly performance reviews.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold">White-Label License</h3>
            <p className="mt-2 text-base text-white/70">Your brand, your clients, our platform.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-white/80">
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">License: $1.5k to $5k / mo</span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">Usage: $3 to $7 / ticket</span>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/50">What you get</p>
            <ul className="mt-4 space-y-2 text-base text-white/70">
              <li>Custom domain + branding.</li>
              <li>Firm-controlled data pipeline.</li>
              <li>Implementation support + training.</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0A1A2F] p-5 text-base text-white/70">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">How pricing works</p>
          <p className="mt-2 text-base">
            Licensing is a base monthly fee plus per-ticket usage. Revenue share is a percentage of collected
            case revenue. Setup fees cover onboarding, training, and portal configuration.
          </p>
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">Business model</p>
          <h2 className="mt-3 text-xl font-semibold">Revenue streams</h2>
          <ul className="mt-4 space-y-3 text-white/70 text-base">
            <li>Per-ticket processing fee.</li>
            <li>Subscription access for firms.</li>
            <li>Premium modules (voice AI, advanced analytics).</li>
            <li>Marketing partnerships and territory exclusivity.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">Competitive edge</p>
          <h2 className="mt-3 text-xl font-semibold">Why this wins</h2>
          <ul className="mt-4 space-y-3 text-white/70 text-base">
            <li>Automates the slowest part of ticket law: intake and triage.</li>
            <li>Built for high-volume, low-touch workflows.</li>
            <li>Dual-sided marketplace: drivers + firms.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">Growth plan</p>
        <h2 className="mt-3 text-xl font-semibold">How we scale in 12 months</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3 text-base text-white/70">
          <div className="rounded-xl border border-white/10 bg-[#0A1A2F] p-4">
            <p className="text-[#C6FF4D] font-semibold">1. Pilot city launch</p>
            <p className="mt-2">Onboard 3-5 firms, validate conversion, refine onboarding.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0A1A2F] p-4">
            <p className="text-[#C6FF4D] font-semibold">2. Regional expansion</p>
            <p className="mt-2">Add 5-10 metro areas with co-marketing partners.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0A1A2F] p-4">
            <p className="text-[#C6FF4D] font-semibold">3. National licensing</p>
            <p className="mt-2">Scale white-label + revenue-share packages.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Interested in a pilot or term sheet?</h2>
          <p className="mt-2 text-white/70 text-base max-w-xl">
            We can tailor the structure to your firm or investment thesis. Request the full financial model,
            pipeline, and live demo.
          </p>
        </div>
        <a
          href="mailto:support@citationnation.com"
          className="inline-flex items-center justify-center rounded-full border border-[#4EA1FF]/50 bg-[#4EA1FF]/20 px-5 py-3 text-sm font-semibold text-white hover:bg-[#4EA1FF]/30 transition-colors"
        >
          Request the full deck
        </a>
      </div>
      <p className="mt-4 text-sm text-white/40">
        This guide is a high-level overview. Final terms are subject to legal agreements and due diligence.
      </p>
    </section>
  </main>
);

export default InvestorGuide;

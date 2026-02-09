import React from "react";
import { Button } from "@/components/ui/button";

const LawFirmGuide = () => (
  <main className="bg-[#050e19] text-white">
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(78,161,255,0.2),_transparent_55%),radial-gradient(circle_at_80%_10%,_rgba(198,255,77,0.18),_transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28 sm:pt-32">
        <div className="rounded-3xl border border-white/10 bg-[#0A1A2F]/85 p-6 sm:p-8 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C6FF4D] font-semibold">
            Law Firm Guide
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold">
            Bring NoPo to Your Firm in the Way That Fits You
          </h1>
          <p className="mt-4 text-base text-white/80 max-w-3xl">
            NoPo is the AI-powered ticket intake and strategy platform. We are pitching Citation Nation as our first
            flagship partner, and we can also deploy it for other law firms with SaaS, white-label, or custom build
            options.
          </p>
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">What you get</p>
          <h2 className="mt-3 text-xl font-semibold">A case-ready ticket pipeline.</h2>
          <ul className="mt-4 space-y-3 text-white/70 text-base">
            <li>AI intake reads tickets and pulls key details.</li>
            <li>Guided intake to fill missing info in minutes.</li>
            <li>Attorney dashboard for status, documents, and client updates.</li>
            <li>Optional voice assistant to increase completions.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">Why it matters</p>
          <h2 className="mt-3 text-xl font-semibold">Take more cases with the same staff.</h2>
          <ul className="mt-4 space-y-3 text-white/70 text-base">
            <li>Faster intake = more billable cases.</li>
            <li>Cleaner files reduce paralegal load.</li>
            <li>Higher conversion from clear next steps.</li>
            <li>Repeatable process across locations.</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">Pricing ladder</p>
        <h2 className="mt-3 text-xl font-semibold">From basic upgrade to full white-label.</h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#4EA1FF]/40 bg-gradient-to-br from-[#0A1A2F] via-[#0D2336] to-[#1A2B1A] p-5 shadow-[0_0_35px_rgba(78,161,255,0.12)]">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Level 1</p>
            <h3 className="mt-2 text-lg font-semibold">Basic Upgrade (Entry Level)</h3>
            <p className="mt-2 text-base text-white/70">Website + intake form. No AI, no automation.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-base font-bold text-white">
              <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">
                $2,500 to $7,500 one-time
              </span>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/50">Includes</p>
            <ul className="mt-2 space-y-2 text-base text-white/70">
              <li>Modern website redesign</li>
              <li>Mobile-optimized pages</li>
              <li>Basic intake form</li>
              <li>Branding refresh</li>
              <li>Speed + security improvements</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#4EA1FF]/40 bg-gradient-to-br from-[#0A1A2F] via-[#0D2336] to-[#1A2B1A] p-5 shadow-[0_0_35px_rgba(78,161,255,0.12)]">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Level 2</p>
            <h3 className="mt-2 text-lg font-semibold">SaaS Access (Standard Platform)</h3>
            <p className="mt-2 text-base text-white/70">Core product. No customization, no white-label.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-base font-bold text-white">
              <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">Onboarding: $1,500</span>
              <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">Monthly: $299</span>
              <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">Usage: $5 / ticket</span>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/50">Includes</p>
            <ul className="mt-2 space-y-2 text-base text-white/70">
              <li>AI intake + document capture</li>
              <li>Issue detection + strategy options</li>
              <li>Case summaries + optional voice AI</li>
              <li>Attorney dashboard + status tracking</li>
              <li>Standard support</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#4EA1FF]/40 bg-gradient-to-br from-[#0A1A2F] via-[#0D2336] to-[#1A2B1A] p-5 text-white shadow-[0_0_35px_rgba(78,161,255,0.15)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C6FF4D]">Level 3</p>
            <h3 className="mt-2 text-lg font-semibold text-white">
              Partner-Plus <span className="text-[#4EA1FF]">(Flagship Partnership)</span>
            </h3>
            <p className="mt-2 text-base text-white">
              Premium partnership tier with partner ticket rate and referral revenue.
            </p>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#C6FF4D]/70 bg-[#0A1A2F] p-4">
                <p className="text-sm font-semibold text-[#C6FF4D]">Citation Nation flagship offer</p>
                <div className="mt-3 flex flex-wrap gap-2 text-base font-bold text-white">
                  <span className="rounded-full border border-[#C6FF4D] bg-[#0A1A2F] px-3 py-1 text-[#C6FF4D]">
                    Flagship fee: $3,500
                  </span>
                  <span className="rounded-full border border-white/50 bg-[#0A1A2F] px-3 py-1">Monthly: $299</span>
                  <span className="rounded-full border border-white/50 bg-[#0A1A2F] px-3 py-1">Usage: $3 / ticket</span>
                  <span className="rounded-full border border-white/50 bg-[#0A1A2F] px-3 py-1">
                    Referral: 10% to 15%
                  </span>
                  <span className="rounded-full border border-white bg-[#0A1A2F] px-3 py-1 text-white">
                    Early access: 12 months
                  </span>
                </div>
                <p className="mt-3 text-sm text-white">First access to new add-ons and upgrades. Voice AI included.</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-[#0A1A2F] p-4">
                <p className="text-sm font-semibold text-[#4EA1FF]">All other partners</p>
                <div className="mt-3 flex flex-wrap gap-2 text-base font-bold text-white">
                  <span className="rounded-full border border-white/50 bg-[#0A1A2F] px-3 py-1">Partner fee: $5,500</span>
                  <span className="rounded-full border border-white/50 bg-[#0A1A2F] px-3 py-1">Monthly: $299</span>
                  <span className="rounded-full border border-white/50 bg-[#0A1A2F] px-3 py-1">Usage: $5 / ticket</span>
                  <span className="rounded-full border border-white/50 bg-[#0A1A2F] px-3 py-1">
                    Referral: 10% to 15%
                  </span>
                </div>
                <p className="mt-3 text-sm text-white">
                  AI intake included. Voice AI and premium add-ons available for a premium.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#C6FF4D]">Includes</p>
            <ul className="mt-2 space-y-2 text-base text-white list-disc list-inside marker:text-[#C6FF4D]">
              <li>Everything in SaaS Access</li>
              <li>Early access to new features</li>
              <li>Roadmap influence</li>
              <li>Priority support</li>
              <li>Locked-in pricing for 12 months</li>
              <li>Revenue share on firms they refer</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#4EA1FF]/40 bg-gradient-to-br from-[#0A1A2F] via-[#0D2336] to-[#1A2B1A] p-5 shadow-[0_0_35px_rgba(78,161,255,0.12)]">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Level 4</p>
            <h3 className="mt-2 text-lg font-semibold">White Label (Your Brand, Our Platform)</h3>
            <p className="mt-2 text-base text-white/70">
              A white-label license with monthly access plus per-ticket usage.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-base font-bold text-white">
              <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">
                Monthly license: $1.5k to $3k
              </span>
              <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">
                Per-ticket usage: $5 / ticket
              </span>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/50">Includes</p>
            <ul className="mt-2 space-y-2 text-base text-white/70">
              <li>Full white-label branding</li>
              <li>Custom domain + custom colors/logos/UI</li>
              <li>Dashboard branding</li>
              <li>Optional custom workflows</li>
              <li>Priority support</li>
            </ul>
          </div>

          {/* Level 5 full width */}
          <div className="lg:col-span-2 rounded-2xl border border-[#4EA1FF]/40 bg-gradient-to-br from-[#0A1A2F] via-[#0D2336] to-[#1A2B1A] p-6 shadow-[0_0_35px_rgba(78,161,255,0.12)]">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Level 5</p>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="lg:max-w-2xl">
                <h3 className="mt-2 text-xl font-semibold">Custom Deployment (Private Instance)</h3>
                <p className="mt-3 text-base text-white/70">
                  A fully customized version of the NoPo intake experience, built for your firm’s workflows, branding,
                  and domain, powered by the NoPo engine. This is a licensed private instance, not a sale of the
                  platform or IP.
                </p>

                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-white/50">Includes</p>
                <ul className="mt-2 space-y-2 text-base text-white/70">
                  <li>Custom UI and branded intake experience</li>
                  <li>Your domain (e.g., intake.yourfirm.com)</li>
                  <li>Custom workflows, fields, and automations</li>
                  <li>Private environment connected to the NoPo engine</li>
                  <li>Attorney dashboard with your branding</li>
                  <li>Training + launch support</li>
                </ul>
              </div>

              <div className="lg:w-[420px] rounded-2xl border border-white/10 bg-[#0A1A2F]/80 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-white/50">Pricing</p>
                <div className="mt-3 flex flex-wrap gap-2 text-base font-bold text-white">
                  <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">One-time build: $35,000+</span>
                  <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">Monthly license: $299</span>
                  <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">Usage: $5 / ticket</span>
                </div>

                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-white/50">Important</p>
                <ul className="mt-2 space-y-2 text-base text-white/70">
                  <li>This is a licensed deployment. NoPo retains all IP and backend control</li>
                  <li>Your dev team may customize the UI layer, but cannot modify the NoPo engine</li>
                  <li>No resale, sublicensing, or redistribution rights</li>
                  <li>Platform access is revocable if monthly or usage fees lapse</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#4EA1FF]/50 bg-gradient-to-br from-[#0A1A2F] via-[#0A1A2F] to-[#10253D] p-5">
            <h3 className="text-lg font-semibold text-[#4EA1FF]">Optional Add-on: Exclusive Territory</h3>
            <p className="mt-2 text-base text-white/70">Add exclusivity in a defined region to block competitors.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-base font-bold text-white">
              <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">County: $3k to $7.5k / mo</span>
              <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">State: $12k to $25k / mo</span>
              <span className="rounded-full border border-white/40 bg-[#0A1A2F] px-3 py-1">Plus: $5 / ticket</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0A1A2F] p-5">
            <h3 className="text-lg font-semibold">SEO Add-ons (Any Level)</h3>
            <p className="mt-2 text-base text-white/70">Drive more qualified traffic to your intake page.</p>
            <div className="mt-4 grid gap-4 text-base text-white/70">
              <div>
                <p className="text-[#C6FF4D] font-semibold">SEO Starter — $499 / month</p>
                <p className="mt-1">Keyword optimization, local SEO, Google Business updates.</p>
              </div>
              <div>
                <p className="text-[#C6FF4D] font-semibold">SEO Growth — $999 / month</p>
                <p className="mt-1">Monthly blogs, backlink building, competitor tracking, conversion optimization.</p>
              </div>
              <div>
                <p className="text-[#C6FF4D] font-semibold">SEO Dominance — $2,500 / month</p>
                <p className="mt-1">Full content strategy, high-authority backlinks, funnels, A/B tests.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">One-sentence summary</p>
          <p className="mt-3 text-base text-white/80">
            Pick a simple upgrade, full SaaS, flagship partnership, or white-label buildout.
          </p>
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Ready for a pilot or rollout plan?</h2>
          <p className="mt-2 text-white/70 text-base max-w-xl">
            We will tailor onboarding, training, and launch support to your firm size and region. Flagship partners
            get co-marketing support to help us both win the market.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="rounded-full bg-[#C6FF4D] text-[#0A1A2F] hover:bg-[#C6FF4D]/90 font-semibold">
            <a href="tel:4048890186">Call 404.889.0186</a>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10">
            <a href="mailto:indigowebdesigns@gmail.com">Email indigowebdesigns@gmail.com</a>
          </Button>
        </div>
      </div>
      <p className="mt-4 text-sm text-white/40">
        Pricing shown is a guide; final terms depend on volume, region, and implementation scope.
      </p>
    </section>
  </main>
);

export default LawFirmGuide;
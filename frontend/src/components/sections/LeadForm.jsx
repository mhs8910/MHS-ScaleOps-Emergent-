import { useState } from 'react';
import axios from 'axios';
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { LINKS } from '../../lib/constants';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const REVENUE_TIERS = [
  'Pre-revenue · Just starting',
  '$0 – $500 / month',
  '$500 – $2,000 / month',
  '$2,000 – $10,000 / month',
  '$10,000+ / month',
];

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    expertise: '',
    monthly_revenue: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const payload = { ...form };
      if (!payload.monthly_revenue) delete payload.monthly_revenue;
      if (!payload.message) delete payload.message;
      await axios.post(`${API}/leads`, payload);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      const detail = err?.response?.data?.detail;
      setErrorMsg(typeof detail === 'string' ? detail : 'Something went wrong. Try again or email us directly.');
    }
  };

  return (
    <section id="apply" data-testid="lead-form-section" className="relative py-28 sm:py-36 border-y border-slate-900 bg-[#070709] overflow-hidden">
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-teal-500/8 blur-[140px] -z-0" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[140px] -z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-5">
          <div className="label-eyebrow mb-5">Apply to Build With Me</div>
          <h2 className="heading-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
            Tell me about your <span className="text-teal-400">expertise</span><span className="text-amber-500">.</span>
          </h2>
          <p className="font-body text-slate-400 text-base leading-relaxed mb-8">
            Two minutes. Five questions. If we're a fit, you'll get a Calendly link in your inbox within 24 hours.
            If we're not, I'll tell you straight — no pretending.
          </p>

          <ul className="space-y-3 mb-8">
            {[
              'No sales pitch — operator-led conversation',
              'No upfront cost ever required',
              'You\'ll know exactly what we build, in what order',
            ].map((p) => (
              <li key={p} className="flex gap-3 items-start text-sm text-slate-300">
                <Check size={16} className="text-teal-400 shrink-0 mt-0.5" />
                {p}
              </li>
            ))}
          </ul>

          <div className="text-xs text-slate-500 leading-relaxed">
            Prefer email? <a href={`mailto:${LINKS.email}`} className="text-teal-400 hover:text-teal-300">{LINKS.email}</a>
          </div>
        </div>

        <div className="lg:col-span-7">
          {status === 'success' ? (
            <div data-testid="lead-form-success" className="border border-teal-500/40 bg-teal-500/5 p-8 sm:p-10 rounded-sm">
              <div className="w-14 h-14 bg-teal-500 text-black flex items-center justify-center rounded-sm mb-5">
                <Check size={26} strokeWidth={3} />
              </div>
              <h3 className="font-display font-black text-white text-3xl tracking-tight mb-3">Got it. Talk soon.</h3>
              <p className="font-body text-slate-300 text-base leading-relaxed mb-7">
                Your application is in. I personally read every one. You'll hear from me within 24 hours
                — usually faster — with a Calendly link or a clear "not a fit" note.
              </p>
              <a
                href={LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="lead-form-calendly-cta"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-bold tracking-wide hover:bg-amber-400 hover:-translate-y-0.5 transition-all rounded-sm"
              >
                Or grab a slot now <ArrowRight size={16} />
              </a>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              data-testid="lead-form"
              className="border border-slate-800 bg-[#0a0b0e] p-7 sm:p-9 rounded-sm space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" required>
                  <input
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={onChange}
                    data-testid="lead-form-name"
                    className="w-full bg-[#050505] border border-slate-800 px-4 py-3 text-white text-sm focus:border-teal-500/60 focus:outline-none rounded-sm"
                    placeholder="Muhammad Ali"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    data-testid="lead-form-email"
                    className="w-full bg-[#050505] border border-slate-800 px-4 py-3 text-white text-sm focus:border-teal-500/60 focus:outline-none rounded-sm"
                    placeholder="you@domain.com"
                  />
                </Field>
              </div>

              <Field label="Your expertise / niche" required>
                <input
                  name="expertise"
                  type="text"
                  required
                  minLength={2}
                  value={form.expertise}
                  onChange={onChange}
                  data-testid="lead-form-expertise"
                  className="w-full bg-[#050505] border border-slate-800 px-4 py-3 text-white text-sm focus:border-teal-500/60 focus:outline-none rounded-sm"
                  placeholder="e.g. Cardiology · IELTS prep · Frontend dev · Trading psychology"
                />
              </Field>

              <Field label="Current monthly revenue (optional)">
                <select
                  name="monthly_revenue"
                  value={form.monthly_revenue}
                  onChange={onChange}
                  data-testid="lead-form-revenue"
                  className="w-full bg-[#050505] border border-slate-800 px-4 py-3 text-white text-sm focus:border-teal-500/60 focus:outline-none rounded-sm"
                >
                  <option value="">Select a range</option>
                  {REVENUE_TIERS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label="What are you trying to build? (optional)">
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  data-testid="lead-form-message"
                  className="w-full bg-[#050505] border border-slate-800 px-4 py-3 text-white text-sm focus:border-teal-500/60 focus:outline-none rounded-sm resize-none"
                  placeholder="Tell me what you teach, what you've tried, and where you're stuck."
                />
              </Field>

              {status === 'error' && (
                <div data-testid="lead-form-error" className="flex items-start gap-2 border border-red-500/40 bg-red-500/5 p-4 text-sm text-red-300 rounded-sm">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                data-testid="lead-form-submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 text-black font-bold text-base tracking-wide hover:bg-amber-400 hover:-translate-y-0.5 transition-all rounded-sm glow-amber disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Send Application <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center">
                By submitting, you agree to be contacted about this application. We don't share or sell data.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold mb-2 block">
        {label}{required && <span className="text-amber-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

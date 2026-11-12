import { useState, useEffect } from 'react';
import {
  Activity,
  Bell,
  Building2,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  QrCode,
  Shield,
  Unlock,
  Wifi
} from 'lucide-react';
import EagleLogo from './EagleLogo';
import EarthGlobe from './EarthGlobe';
import './LandingPage.css';

export interface LandingPageProps {
  showToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
  brandName?: string;
}

const stats = [
  ['2,400+', 'handsets under management'],
  ['₹1.2Cr', 'recovered this quarter'],
  ['< 3 sec', 'average lock delivery'],
  ['98.6%', 'payment compliance rate']
];

const features = [
  [
    'Installment Engine',
    'Create flexible EMI plans, record partial payments, auto-calculate overdue penalties, and push lock commands the moment a deadline is missed.',
    CreditCard
  ],
  [
    'Full MDM Grip',
    'Block factory reset, disable USB debugging, restrict camera or calls — full Android device policy without touching the phone physically.',
    Shield
  ],
  [
    'Real-Time Pulse',
    'Live SIM slot info, network operator, battery level, GPS coordinates, and last-seen timestamps — all visible from one retailer view.',
    Activity
  ],
  [
    'Shop-Floor Enrolment',
    'Scan a QR code at point of sale and the device is provisioned, ownership assigned, and MDM activated — no IT team needed.',
    QrCode
  ]
];

const steps = [
  ['01', 'Add the buyer', 'Enter Aadhaar, phone number, selfie, and address. Customer profile links directly to your retailer account.'],
  ['02', 'Register the handset', 'Punch in IMEI1, IMEI2, serial number and brand. Generate a provisioning QR code in seconds.'],
  ['03', 'Set up the EMI plan', 'Choose tenure, down payment, and interest rate. Installment calendar is auto-generated and shared with the customer.'],
  ['04', 'Stay in full command', 'EMI missed — lock fires remotely. Customer pays — unlock happens instantly. You are always in control.']
];

const demoStates = {
  lock: {
    title: 'Device Locked',
    subtitle: 'EMI overdue',
    note: 'Phone access blocked. Customer must clear dues to resume normal use.',
    pill: 'Device Locked',
    Icon: Lock,
    tone: 'danger'
  },
  unlock: {
    title: 'Access Restored',
    subtitle: 'Payment received',
    note: 'Payment confirmed. Full access restored to the customer instantly.',
    pill: 'Device Unlocked',
    Icon: Unlock,
    tone: 'success'
  },
  locate: {
    title: 'Live Location',
    subtitle: 'Tracking on',
    note: 'GPS ping received. Device location is live on your retailer map.',
    pill: 'Tracking ON',
    Icon: MapPin,
    tone: 'warning'
  },
  alert: {
    title: 'Reminder Sent',
    subtitle: 'Due date alert',
    note: 'Payment reminder delivered to customer before lock triggers.',
    pill: 'Alert Delivered',
    Icon: Bell,
    tone: 'info'
  },
  enroll: {
    title: 'MDM Enrolled',
    subtitle: 'Device bound',
    note: 'Ownership registered. Device policy active from the shop counter.',
    pill: 'Enrolled',
    Icon: QrCode,
    tone: 'success'
  }
};

type DemoStateKey = keyof typeof demoStates;

export default function LandingPage({
  showToast = (msg: string) => console.log(`Toast: ${msg}`),
  brandName = 'SkyEagle'
}: LandingPageProps) {
  const [demoState, setDemoState] = useState<DemoStateKey>('lock');
  const activeDemo = demoStates[demoState];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.setAttribute('data-theme', 'dark');
  }, []);

  const ActiveDemoIcon = activeDemo.Icon;

  const setDemo = (state: DemoStateKey) => {
    setDemoState(state);
    showToast(`${demoStates[state].pill} command sent`, 'info');
  };

  return (
    <div className="fl-page">
      {/* ===== HEADER / NAVBAR ===== */}
      <header className="fl-nav">
        <a className="fl-brand" href="/" aria-label={brandName}>
          <span><EagleLogo size={32} fill="gradient" /></span>
          <strong>{brandName}</strong>
        </a>

        <nav className="fl-links" aria-label="Product navigation">
          <a href="#features">Features</a>
          <a href="#workflow">How it Works</a>
          <a href="#coverage">Cities</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="fl-actions">
          <a className="fl-btn fl-btn-muted" href="#contact">
            Contact
          </a>
          <a className="fl-btn fl-btn-primary" href="#contact">
            Request Demo <ChevronRight size={14} />
          </a>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main>
        {/* HERO */}
        <section className="fl-hero">
          <div>
            <span className="fl-badge" style={{ WebkitTextFillColor: '#9db8e5' }}>
              <Wifi size={12} /> Built for Indian EMI retailers
            </span>
            <h1 style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>
              Your financed phones,
              <span style={{ WebkitTextFillColor: '#9db8e5' }}> always under your control</span>
            </h1>
            <p>
              {brandName} gives you real-time command over every handset you've sold on EMI —
              lock, locate, alert, or unlock from anywhere, in under 3 seconds.
            </p>

            <div className="fl-cta-row">
              <a className="fl-btn fl-btn-primary fl-btn-large" href="#contact">
                Request a Demo <ChevronRight size={14} />
              </a>
              <a className="fl-btn fl-btn-muted fl-btn-large" href="#features">
                See Features
              </a>
            </div>

            <div className="fl-hero-proof">
              <div>
                <strong>2,400+</strong>
                <span>Phones managed</span>
              </div>
              <div>
                <strong>180+</strong>
                <span>Retailers live</span>
              </div>
              <div>
                <strong>₹1.2Cr</strong>
                <span>Recovered this quarter</span>
              </div>
            </div>

            <div className="fl-trust">
              <span><CheckCircle size={14} /> No extra app needed on buyer's phone</span>
              <span><CheckCircle size={14} /> Commands queue when device is offline</span>
              <span><CheckCircle size={14} /> Works on all Android 8+ handsets</span>
            </div>
          </div>

          {/* INTERACTIVE MOBILE DEMO */}
          <div className="fl-demo-stage" aria-label="Interactive device command demo">
            <div className={`fl-single-phone fl-phone-${activeDemo.tone}`}>
              <div className="fl-phone-notch" />
              <div className="fl-phone-topline">
                <span>10:42</span>
                <span>4G 78%</span>
              </div>

              <div key={demoState} className="fl-phone-anim">
                <button
                  className={`fl-demo-status fl-status-${activeDemo.tone}`}
                  onClick={() => showToast(`${activeDemo.pill} command delivered`, 'success')}
                >
                  <CheckCircle size={14} /> {activeDemo.pill}
                </button>
                <div className="fl-demo-icon">
                  <ActiveDemoIcon size={40} />
                </div>
                <h3>Galaxy A54</h3>
                <strong>{activeDemo.subtitle.toUpperCase()}</strong>
                <p>{activeDemo.note}</p>
              </div>

              <div className="fl-phone-mini">
                <span className="fl-live-dot" />
                <span>Live · Model Town, Ludhiana</span>
              </div>
            </div>

            <div className="fl-demo-options">
              {[
                ['lock', 'Lock Device', Lock],
                ['unlock', 'Unlock', Unlock],
                ['locate', 'Track GPS', MapPin],
                ['alert', 'Send Alert', Bell],
                ['enroll', 'QR Enroll', QrCode]
              ].map(([state, label, Icon]) => {
                const OptionIcon = Icon as typeof Lock;
                return (
                  <button
                    key={state as string}
                    className={demoState === state ? 'active' : ''}
                    onClick={() => setDemo(state as DemoStateKey)}
                  >
                    <OptionIcon size={18} />
                    <span>{label as string}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* METRICS / STATS */}
        <section className="fl-stats" aria-label="Operational metrics">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="fl-section">
          <div className="fl-section-head">
            <span>What you get</span>
            <h2>Everything a financed-phone retailer actually needs.</h2>
          </div>

          <div className="fl-feature-grid">
            {features.map(([title, text, Icon]) => {
              const FeatureIcon = Icon as typeof Shield;
              return (
                <article className="fl-card" key={title as string}>
                  <FeatureIcon size={22} />
                  <h3>{title as string}</h3>
                  <p>{text as string}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4-STEP WORKFLOW */}
        <section id="workflow" className="fl-section">
          <div className="fl-section-head">
            <span>How it works</span>
            <h2>From sale to settlement — four simple steps.</h2>
          </div>

          <div className="fl-step-grid">
            {steps.map(([num, title, text]) => (
              <div key={num}>
                <strong>{num}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GLOBAL NETWORK WITH 3D ANIMATED EARTH GLOBE */}
        <section id="coverage" className="fl-section">
          <div className="fl-coverage-wrap">
            <div className="fl-section-head" style={{ marginBottom: '28px' }}>
              <span>Global MDM Relay & Live Hubs</span>
              <h2>Instant device grip, everywhere your devices travel.</h2>
              <p>Explore real-time retail hubs, high-speed MDM signal relays, and active lock corridors on the 3D interactive globe.</p>
            </div>
            <EarthGlobe />
          </div>
        </section>

        {/* CONTACT / CTA INQUIRY SECTION */}
        <section id="contact" className="fl-contact">
          <div className="fl-contact-info">
            <span className="fl-badge" style={{ marginTop: 0, WebkitTextFillColor: '#9db8e5' }}>
              Direct Retailer Inquiries
            </span>
            <h2>Ready to secure your financed handset sales?</h2>
            <p>Connect with our technical team for a full product demonstration, custom EMI engine setup, and retailer onboarding support.</p>
            <div className="fl-contact-meta">
              <span><Mail size={14} /> support@skyeagle.online</span>
              <span><Building2 size={14} /> Ludhiana, Punjab</span>
            </div>
          </div>
          <div className="fl-contact-action">
            <a
              className="fl-btn fl-btn-primary fl-btn-large fl-btn-cta"
              href="mailto:support@skyeagle.online?subject=SkyEagle%20Demo%20Inquiry"
            >
              <Mail size={16} /> Contact Support <ChevronRight size={15} />
            </a>
          </div>
        </section>
      </main>

      {/* ===== MODERN SAAS FOOTER ===== */}
      <footer className="fl-footer">
        <div className="fl-footer-inner">
          <div className="fl-footer-main">
            {/* Brand & Direct Contact Card */}
            <div className="fl-footer-brand">
              <div className="fl-footer-logo">
                <EagleLogo size={32} fill="gradient" />
                <strong>{brandName}</strong>
              </div>
              <p>India's real-time EMI & MDM control platform for financed-device retailers. Lock, locate, and recover — all in under 3 seconds.</p>

              <div className="fl-footer-contact-pills">
                <a href="mailto:support@skyeagle.online">
                  <Mail size={13} /> support@skyeagle.online
                </a>
                <a href="tel:+919810000000">
                  <Wifi size={13} /> +91 98100 00000
                </a>
                <span className="fl-footer-addr-pill">
                  <Building2 size={13} /> Ludhiana, Punjab, India
                </span>
              </div>

              <div className="fl-footer-social">
                <a href="#" aria-label="X / Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="fl-footer-links-group">
              {/* Product */}
              <div className="fl-footer-col">
                <h4>Platform</h4>
                <a href="#features">EMI Engine</a>
                <a href="#features">MDM Grip</a>
                <a href="#features">GPS Tracking</a>
                <a href="#features">QR Enrolment</a>
                <a href="#workflow">Workflow</a>
              </div>

              {/* Company */}
              <div className="fl-footer-col">
                <h4>Company</h4>
                <a href="#coverage">Coverage Hubs</a>
                <a href="#features">Features</a>
                <a href="#workflow">How It Works</a>
                <a href="#contact">Contact Team</a>
                <a href="mailto:support@skyeagle.online">Retailer Support</a>
              </div>

              {/* Newsletter */}
              <div className="fl-footer-col fl-footer-col-news">
                <h4>Updates</h4>
                <p className="fl-footer-news-desc">Get product changelog & retail updates</p>
                <form
                  className="fl-footer-news-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    showToast('Subscribed to updates! 🎉', 'success');
                  }}
                >
                  <input type="email" placeholder="your@email.com" required />
                  <button type="submit" aria-label="Subscribe">
                    <ChevronRight size={14} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="fl-footer-divider" />

          <div className="fl-footer-bottom">
            <span>© {new Date().getFullYear()} {brandName} Technologies Pvt. Ltd. All rights reserved.</span>
            <span className="fl-footer-tagline">Lock · Locate · Recover · Repeat</span>
            <div className="fl-footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

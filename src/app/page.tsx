import { Bell, Check, ChevronRight, Lock, MapPin, Unlock } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneDemo } from '@/components/phone-demo'
import { Reveal } from '@/components/reveal'
import { apps, site } from '@/lib/site'

/* A fixed pattern that reads as a QR code. Decorative only. */
const QR_SIZE = 17
const qrCells = Array.from({ length: QR_SIZE * QR_SIZE }, (_, i) => {
  const r = Math.floor(i / QR_SIZE)
  const c = i % QR_SIZE
  // The three corner markers: a 7x7 ring around a 3x3 block.
  for (const [r0, c0] of [
    [0, 0],
    [0, QR_SIZE - 7],
    [QR_SIZE - 7, 0],
  ]) {
    const dr = r - r0
    const dc = c - c0
    if (dr >= -1 && dr <= 7 && dc >= -1 && dc <= 7) {
      if (dr < 0 || dr > 6 || dc < 0 || dc > 6) return false
      const edge = dr === 0 || dr === 6 || dc === 0 || dc === 6
      const core = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4
      return edge || core
    }
  }
  return (r * 7 + c * 13 + r * c + ((r ^ c) & 3)) % 3 === 0
})

const schedule = [
  ['1', '9 Jul', 'Paid'],
  ['2', '9 Aug', 'Paid'],
  ['3', '9 Sep', 'Paid'],
  ['4', '9 Oct', 'Paid'],
  ['5', '9 Nov', 'Due'],
  ['6', '9 Dec', 'Upcoming'],
] as const

const steps = [
  ['Verify the customer', 'Record the customer’s details and identity documents at the counter, with the customer present.'],
  ['Register the phone', 'Scan the box label to capture the phone’s identifiers, then enrol it with a QR code during setup.'],
  ['Set the plan', 'Enter the down payment, the number of instalments and the due dates. The customer sees the same schedule.'],
  ['Keep it current', 'Record each payment as it arrives. Reminders go out before a due date, and a lock lifts when dues are cleared.'],
] as const

const faqs = [
  [
    'Is Sky Eagle a lender?',
    'No. Sky Eagle does not provide credit and does not handle money. The instalment plan is between the retailer and the customer. Sky Eagle keeps the record of that plan and provides the tools to manage the phone.',
  ],
  [
    'What happens when an instalment is overdue?',
    'The customer first receives reminders. If the instalment stays unpaid, the retailer can lock the phone. The lock screen shows the amount due and how to pay the shop, and emergency calls stay available. The retailer unlocks the phone as soon as the payment is recorded.',
  ],
  [
    'Does a lock delete anything on the phone?',
    'No. Photos, contacts and other data on the phone are untouched. The lock only limits use of the phone until the retailer unlocks it.',
  ],
  [
    'What does the customer see?',
    `Everything the retailer has recorded: the schedule, each payment and what is due next, in the ${apps.customer} app. The customer agrees to the plan and to device management at the counter, before the phone is handed over.`,
  ],
  [
    'What happens when the plan is complete?',
    'When the final instalment is recorded, the retailer releases the phone and device management is removed from it.',
  ],
  [
    'Which phones are supported?',
    'Android phones running Android 8.0 or later.',
  ],
] as const

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="wrap">
          <Reveal className="hero-copy">
            <p className="kicker">{site.brand}</p>
            <h1>Phones sold on instalments. Managed with confidence.</h1>
            <p className="lede">
              One platform for retailers to enrol each phone, keep the instalment record, and stay in touch with
              the customer until the last payment.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#contact">
                Request a demo
              </a>
              <a className="link-more" href="#platform">
                See how it works <ChevronRight size={16} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="stage">
              <PhoneDemo />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Facts ---------- */}
      <section className="facts-band" aria-label="At a glance">
        <div className="wrap">
          <dl className="facts">
            <div>
              <dt>Android 8.0+</dt>
              <dd>Supported phones</dd>
            </div>
            <div>
              <dt>QR code</dt>
              <dd>Enrolment at the counter</dd>
            </div>
            <div>
              <dt>Every action</dt>
              <dd>Recorded in an audit trail</dd>
            </div>
            <div>
              <dt>Two apps</dt>
              <dd>One for the shop, one for the customer</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------- Platform: feature tiles ---------- */}
      <section id="platform" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Everything a shop needs for instalment sales.</h2>
            <p>From the moment the box is opened to the day the phone is fully paid for.</p>
          </Reveal>

          <div className="bento">
            <Reveal className="tile tile-wide">
              <div className="tile-copy">
                <h3>Enrol at the counter.</h3>
                <p>Scan the box, verify the customer, and scan one QR code during setup. The phone leaves the shop ready.</p>
              </div>
              <div className="tile-art art-enrol" aria-hidden="true">
                <div className="qr">
                  {qrCells.map((on, i) => (
                    <i key={i} className={on ? 'on' : undefined} />
                  ))}
                </div>
                <ol>
                  <li>
                    <Check size={14} /> Box label scanned
                  </li>
                  <li>
                    <Check size={14} /> Customer verified
                  </li>
                  <li>
                    <Check size={14} /> Phone enrolled
                  </li>
                </ol>
              </div>
            </Reveal>

            <Reveal className="tile tile-wide" delay={0.05}>
              <div className="tile-copy">
                <h3>A record both sides can trust.</h3>
                <p>Every instalment, every payment, every due date. The shop and the customer see the same schedule.</p>
              </div>
              <div className="tile-art art-schedule" aria-hidden="true">
                {schedule.map(([n, day, status]) => (
                  <div key={n} className="sched-row">
                    <span>Instalment {n}</span>
                    <span>{day}</span>
                    <span className={`dot dot-${status.toLowerCase()}`}>{status}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="tile">
              <div className="tile-copy">
                <h3>Controls when they are needed.</h3>
                <p>Remind, lock, unlock and locate, from the shop’s phone.</p>
              </div>
              <div className="tile-art art-controls" aria-hidden="true">
                <span>
                  <Bell size={20} />
                </span>
                <span>
                  <Lock size={20} />
                </span>
                <span>
                  <Unlock size={20} />
                </span>
                <span>
                  <MapPin size={20} />
                </span>
              </div>
            </Reveal>

            <Reveal className="tile" delay={0.05}>
              <div className="tile-copy">
                <h3>Nothing happens unrecorded.</h3>
                <p>Each command is logged with who sent it and when.</p>
              </div>
              <div className="tile-art art-log" aria-hidden="true">
                <p>
                  <span>10:42</span> Reminder sent
                </p>
                <p>
                  <span>10:44</span> Payment recorded
                </p>
                <p>
                  <span>10:44</span> Phone unlocked
                </p>
              </div>
            </Reveal>

            <Reveal className="tile" delay={0.1}>
              <div className="tile-copy">
                <h3>Works when the phone is offline.</h3>
                <p>Commands wait and are delivered when the phone is next online.</p>
              </div>
              <div className="tile-art art-queue" aria-hidden="true">
                <span className="q q-wait">Queued</span>
                <i />
                <span className="q q-done">Delivered</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how-it-works" className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Four steps, from sale to final instalment.</h2>
          </Reveal>
          <ol className="steps">
            {steps.map(([title, text], i) => (
              <li key={title}>
                <Reveal delay={i * 0.06}>
                  <span className="step-n">{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Apps ---------- */}
      <section id="apps" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>A clear view for everyone involved.</h2>
          </Reveal>
          <div className="trio">
            <Reveal className="tile tile-tall">
              <p className="tile-label">For the shop</p>
              <h3>{apps.partner}</h3>
              <ul className="ticks">
                <li>
                  <Check size={16} /> Customer verification and phone registration
                </li>
                <li>
                  <Check size={16} /> Instalment plans and payment entries
                </li>
                <li>
                  <Check size={16} /> Reminders, lock, unlock and locate
                </li>
              </ul>
            </Reveal>
            <Reveal className="tile tile-tall" delay={0.05}>
              <p className="tile-label">For the customer</p>
              <h3>{apps.customer}</h3>
              <ul className="ticks">
                <li>
                  <Check size={16} /> The full schedule and payment history
                </li>
                <li>
                  <Check size={16} /> Reminders before each due date
                </li>
                <li>
                  <Check size={16} /> Shop directory and support requests
                </li>
              </ul>
            </Reveal>
            <Reveal className="tile tile-tall" delay={0.1}>
              <p className="tile-label">For operations</p>
              <h3>Admin console</h3>
              <ul className="ticks">
                <li>
                  <Check size={16} /> Partner onboarding and verification review
                </li>
                <li>
                  <Check size={16} /> A full log of device commands
                </li>
                <li>
                  <Check size={16} /> Support and address change requests
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Transparency ---------- */}
      <section id="transparency" className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Fair to the customer, by design.</h2>
            <p>The customer always knows what is on the phone, what is due, and what happens next.</p>
          </Reveal>
          <div className="trio">
            <Reveal className="plain">
              <h3>Agreed at the counter</h3>
              <p>The plan and the device controls are explained and signed for before the phone is enrolled.</p>
            </Reveal>
            <Reveal className="plain" delay={0.05}>
              <h3>Nothing hidden</h3>
              <p>The schedule, every payment and the status of the phone are visible in the customer’s app.</p>
            </Reveal>
            <Reveal className="plain" delay={0.1}>
              <h3>Released at the end</h3>
              <p>After the final instalment, the shop releases the phone and management is removed.</p>
            </Reveal>
          </div>
          <p className="legal-links">
            <Link className="link-more" href="/privacy/">
              Read the Privacy Policy <ChevronRight size={16} />
            </Link>
            <Link className="link-more" href="/delete-account/">
              Delete your account and data <ChevronRight size={16} />
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- Questions ---------- */}
      <section id="questions" className="section">
        <div className="wrap wrap-narrow">
          <Reveal className="section-head">
            <h2>Questions, answered.</h2>
          </Reveal>
          <div className="faq">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <ChevronRight size={18} aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="section section-alt">
        <div className="wrap">
          <Reveal className="closing">
            <h2>See {site.brand} in your shop.</h2>
            <p>Write to us for a demonstration or for help getting started.</p>
            <div className="cta-row cta-center">
              <a className="btn btn-primary" href={`mailto:${site.supportEmail}?subject=Sky%20Eagle%20demo%20request`}>
                Email us
              </a>
              <span className="copyable">{site.supportEmail}</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

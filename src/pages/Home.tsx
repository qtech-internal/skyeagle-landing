import {
  ArrowRight,
  Bell,
  Check,
  ClipboardList,
  Eye,
  Lock,
  MapPin,
  QrCode,
  ShieldCheck,
  Smartphone,
  Unlock,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import Shell from '../components/Shell'
import { apps, site } from '../site'

type Status = 'Active' | 'Due' | 'Restricted'

interface Device {
  id: string
  model: string
  customer: string
  status: Status
  plan: string
  nextDue: string
}

/** Sample rows for the illustration only. None of it is real customer data. */
const sampleDevices: Device[] = [
  { id: 'SE-10482', model: 'Galaxy A55', customer: 'Sample customer A', status: 'Due', plan: '4 of 9 paid', nextDue: 'Due today' },
  { id: 'SE-10477', model: 'Redmi Note 14', customer: 'Sample customer B', status: 'Active', plan: '2 of 6 paid', nextDue: 'In 12 days' },
  { id: 'SE-10463', model: 'Vivo Y29', customer: 'Sample customer C', status: 'Restricted', plan: '5 of 12 paid', nextDue: '9 days overdue' },
  { id: 'SE-10451', model: 'Oppo A5', customer: 'Sample customer D', status: 'Active', plan: '8 of 9 paid', nextDue: 'In 3 days' },
]

const pillClass: Record<Status, string> = {
  Active: 'pill pill-active',
  Due: 'pill pill-due',
  Restricted: 'pill pill-restricted',
}

type Command = 'remind' | 'restrict' | 'release' | 'locate'

const commands: { key: Command; label: string; Icon: LucideIcon }[] = [
  { key: 'remind', label: 'Remind', Icon: Bell },
  { key: 'restrict', label: 'Restrict', Icon: Lock },
  { key: 'release', label: 'Release', Icon: Unlock },
  { key: 'locate', label: 'Locate', Icon: MapPin },
]

function DeviceConsole() {
  const [devices, setDevices] = useState(sampleDevices)
  const [selectedId, setSelectedId] = useState(sampleDevices[0].id)
  const [log, setLog] = useState('Select a command to see how it is recorded.')
  const selected = devices.find((d) => d.id === selectedId) ?? devices[0]

  const run = (command: Command) => {
    const setStatus = (status: Status) =>
      setDevices((rows) => rows.map((d) => (d.id === selected.id ? { ...d, status } : d)))

    if (command === 'restrict') setStatus('Restricted')
    if (command === 'release') setStatus('Active')

    const line: Record<Command, string> = {
      remind: 'reminder queued, delivered as a notification on the device',
      restrict: 'restricted mode applied, emergency calls remain available',
      release: 'restriction released, device returned to normal use',
      locate: 'location requested, shown to the retailer when the device replies',
    }
    setLog(`${selected.id} · ${line[command]}`)
  }

  return (
    <div className="console" role="group" aria-label="Illustration of the device console">
      <div className="console-bar">
        <span>Devices</span>
        <span>{devices.length} sample records</span>
      </div>
      <div className="console-body">
        <div className="device-list">
          {devices.map((d) => (
            <button
              key={d.id}
              type="button"
              className="device-row"
              aria-pressed={d.id === selected.id}
              onClick={() => setSelectedId(d.id)}
            >
              <div>
                <strong>{d.model}</strong>
                <small>{d.id}</small>
              </div>
              <span className={pillClass[d.status]}>{d.status}</span>
            </button>
          ))}
        </div>
        <div className="device-detail">
          <div className="detail-head">
            <div>
              <h3>{selected.model}</h3>
              <p>{selected.customer}</p>
            </div>
            <span className={pillClass[selected.status]}>{selected.status}</span>
          </div>
          <dl className="facts">
            <div>
              <dt>Instalments</dt>
              <dd>{selected.plan}</dd>
            </div>
            <div>
              <dt>Next instalment</dt>
              <dd>{selected.nextDue}</dd>
            </div>
          </dl>
          <div className="commands">
            {commands.map(({ key, label, Icon }) => (
              <button key={key} type="button" onClick={() => run(key)}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
          <p className="log" aria-live="polite">
            {log}
          </p>
        </div>
      </div>
      <p className="console-note">Illustration with sample data. Try the commands.</p>
    </div>
  )
}

const features: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: 'Counter enrolment',
    text: 'Register the handset by scanning its box, verify the customer, and enrol the phone with a QR code before it leaves the shop.',
    Icon: QrCode,
  },
  {
    title: 'Instalment records',
    text: 'Record the plan agreed with the customer, log each payment received, and see at a glance what is due, paid or overdue.',
    Icon: ClipboardList,
  },
  {
    title: 'Device controls',
    text: 'Send a reminder, place the phone in restricted mode when an instalment is overdue, and release it as soon as payment is recorded.',
    Icon: ShieldCheck,
  },
  {
    title: 'Clear view for customers',
    text: 'Customers see their own schedule, payment history and the shop’s contact details in the customer app. Nothing is hidden from them.',
    Icon: Eye,
  },
]

const steps = [
  ['Verify the customer', 'The retailer records the customer’s details and identity documents at the counter, with the customer present.'],
  ['Register the handset', 'The phone’s identifiers are captured from the box label, and the device is enrolled with a QR code during first setup.'],
  ['Record the instalment plan', 'Down payment, number of instalments and due dates are saved. The customer sees the same schedule in their app.'],
  ['Keep the record current', 'Payments are logged as they are received. Reminders go out before a due date, and restrictions lift once dues are cleared.'],
] as const

const appCards = [
  {
    name: apps.partner,
    audience: 'Retailers and distributors',
    points: [
      'Customer verification and handset registration',
      'Instalment plans and payment entries',
      'Reminders and device controls',
    ],
  },
  {
    name: apps.customer,
    audience: 'Customers',
    points: [
      'Instalment schedule and payment history',
      'Due date reminders',
      'Shop directory and support requests',
    ],
  },
  {
    name: 'Admin console',
    audience: 'Sky Eagle operations',
    points: [
      'Partner onboarding and verification review',
      'Audit trail of every device command',
      'Support and address change requests',
    ],
  },
]

export default function Home() {
  return (
    <Shell>
      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <span className="tag">
              <i /> For mobile retailers in India
            </span>
            <h1>
              Financed phones, <span>managed from one place.</span>
            </h1>
            <p>
              {site.brand} helps retailers enrol the phones they sell on instalments, keep an accurate record of
              every payment, and manage device controls agreed with the customer at the time of sale.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="#contact">
                Request a demo <ArrowRight size={16} />
              </a>
              <a className="btn btn-outline btn-lg" href="#platform">
                See the platform
              </a>
            </div>
            <ul className="hero-points">
              <li>
                <Check size={16} /> Enrolment completed at the shop counter
              </li>
              <li>
                <Check size={16} /> Commands are delivered when the device is next online
              </li>
              <li>
                <Check size={16} /> Every action is recorded in an audit trail
              </li>
            </ul>
          </div>
          <DeviceConsole />
        </div>
      </section>

      <section id="platform" className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Platform</span>
            <h2>What a retailer needs to run instalment sales.</h2>
            <p>
              {site.brand} is a record-keeping and device management platform. It does not provide credit and
              does not process payments.
            </p>
          </div>
          <div className="grid grid-4">
            {features.map(({ title, text, Icon }) => (
              <article className="card" key={title}>
                <span className="card-icon">
                  <Icon size={18} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>From sale to final instalment.</h2>
          </div>
          <ol className="steps">
            {steps.map(([title, text], i) => (
              <li key={title}>
                <span className="n">Step {i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="apps" className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Apps</span>
            <h2>One platform, a view for each person involved.</h2>
          </div>
          <div className="grid grid-3">
            {appCards.map(({ name, audience, points }) => (
              <article className="card" key={name}>
                <span className="card-icon">
                  <Smartphone size={18} />
                </span>
                <span className="for">{audience}</span>
                <h3>{name}</h3>
                <ul>
                  {points.map((p) => (
                    <li key={p}>
                      <Check size={14} /> {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="transparency" className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Transparency</span>
            <h2>Customers know what is on their phone and why.</h2>
            <p>
              A phone bought on instalments through a {site.brand} retailer is enrolled as a managed device with
              the customer’s agreement, at the counter, before it is handed over.
            </p>
          </div>
          <div className="grid grid-3">
            <article className="card">
              <h3>Agreed at the time of sale</h3>
              <p>
                The retailer explains the instalment plan and the device controls, and the customer signs the
                agreement before enrolment.
              </p>
            </article>
            <article className="card">
              <h3>Visible in the customer app</h3>
              <p>
                The schedule, every recorded payment and the status of the device are shown to the customer in
                the {apps.customer} app.
              </p>
            </article>
            <article className="card">
              <h3>Removed when the plan ends</h3>
              <p>
                Once the final instalment is recorded, the retailer releases the device and management is
                removed from the phone.
              </p>
            </article>
          </div>
          <p className="notice info" style={{ marginTop: '1rem' }}>
            <ShieldCheck size={18} />
            <span>
              Read how personal data is handled in the <a href="/privacy/">Privacy Policy</a>, or see how to{' '}
              <a href="/delete-account/">request deletion of your account and data</a>.
            </span>
          </p>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="wrap">
          <div className="contact">
            <div>
              <h2>Speak to the {site.brand} team.</h2>
              <p>
                Write to us for a product demonstration or for help with onboarding your shop. Existing
                partners and customers can use the same address for support.
              </p>
            </div>
            <div className="cta-row">
              <span className="copyable">{site.supportEmail}</span>
              <a className="btn btn-primary btn-lg" href={`mailto:${site.supportEmail}?subject=Sky%20Eagle%20demo%20request`}>
                Send an email
              </a>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}

"use client"

import {
  Bell,
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  Heart,
  Home,
  IndianRupee,
  Lock,
  MapPin,
  RotateCcw,
  Unlock,
  User,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/*
 * Two phones that behave like the product. The left one is the retailer's
 * Partner app; what the retailer does there happens on the customer's phone
 * on the right. Both screens follow the layouts of the real apps. Every figure
 * is sample data.
 */

const EMI = 2450
const COUNT = 9
const START_PAID = 4
const DUE_DAY = '9 November'
const NEXT_DUE_DAY = '9 December'

const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`

/** Critically damped: settles without overshoot, as system sheets do. */
const settle = { type: 'spring', bounce: 0, duration: 0.5 } as const

type Filter = 'All' | 'Pending' | 'Overdue' | 'Completed'
const filters: Filter[] = ['All', 'Pending', 'Overdue', 'Completed']

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure className="phone">
      <div className="phone-body">
        <div className="phone-screen">
          <span className="phone-island" aria-hidden="true" />
          {children}
        </div>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  )
}

function StatusBar({ tone }: { tone: 'light' | 'dark' }) {
  return (
    <div className={`statusbar statusbar-${tone}`} aria-hidden="true">
      <span>9:41</span>
      <span>5G · 82%</span>
    </div>
  )
}

export function PhoneDemo() {
  const [paid, setPaid] = useState(START_PAID)
  const [overdue, setOverdue] = useState(true)
  const [locked, setLocked] = useState(false)
  const [reminder, setReminder] = useState(false)
  const [located, setLocated] = useState(false)
  const [filter, setFilter] = useState<Filter>('All')
  const [view, setView] = useState<'retailer' | 'customer'>('retailer')
  const [activity, setActivity] = useState<string[]>(['Instalment 5 became overdue'])
  const reminderTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(reminderTimer.current), [])

  const complete = paid >= COUNT
  const outstanding = (COUNT - paid) * EMI
  const total = COUNT * EMI
  const phase: Exclude<Filter, 'All'> = complete ? 'Completed' : overdue ? 'Overdue' : 'Pending'

  const note = (line: string) => setActivity((lines) => [line, ...lines].slice(0, 2))

  const sendReminder = () => {
    setReminder(true)
    setView('customer')
    note('Reminder sent to the customer')
    window.clearTimeout(reminderTimer.current)
    reminderTimer.current = window.setTimeout(() => setReminder(false), 4200)
  }

  const lock = () => {
    setLocked(true)
    setView('customer')
    note('Phone locked by the retailer')
  }

  const unlock = () => {
    setLocked(false)
    setView('customer')
    note('Phone unlocked by the retailer')
  }

  const recordPayment = () => {
    if (complete) return
    const next = paid + 1
    setPaid(next)
    setOverdue(false)
    setFilter('All')
    setView('customer')
    if (locked) {
      setLocked(false)
      note(`Instalment ${next} recorded. Phone unlocked`)
    } else {
      note(next >= COUNT ? 'Final instalment recorded. Plan complete' : `Instalment ${next} recorded`)
    }
  }

  const locate = () => {
    setLocated(true)
    setView('retailer')
    note('Location received from the phone')
  }

  const reset = () => {
    window.clearTimeout(reminderTimer.current)
    setPaid(START_PAID)
    setOverdue(true)
    setLocked(false)
    setReminder(false)
    setLocated(false)
    setFilter('All')
    setView('retailer')
    setActivity(['Instalment 5 became overdue'])
  }

  const statusLabel = complete ? 'Completed' : locked ? 'Locked' : overdue ? 'Overdue' : 'Active'
  const statusTone = complete ? 'muted' : locked || overdue ? 'red' : 'green'

  const showLoan = filter === 'All' || filter === phase
  const showOldLoan = filter === 'All' || filter === 'Completed'

  return (
    <div className="demo" data-view={view}>
      <div className="demo-switch" role="tablist" aria-label="Choose a phone">
        {(['retailer', 'customer'] as const).map((v) => (
          <button key={v} type="button" role="tab" aria-selected={view === v} onClick={() => setView(v)}>
            {view === v && <motion.span layoutId="demo-switch-pill" className="demo-switch-pill" transition={settle} />}
            <span>{v === 'retailer' ? 'Retailer' : 'Customer'}</span>
          </button>
        ))}
      </div>

      <div className="demo-phones">
        {/* ---------------- Retailer: Sky Eagle Partner ---------------- */}
        <div className="demo-slot demo-slot-retailer">
          <Frame label="Retailer · Sky Eagle Partner">
            <div className="p-app">
              <StatusBar tone="light" />
              <div className="p-bar">
                <ChevronLeft size={18} aria-hidden="true" />
                <strong>Device</strong>
                <button type="button" className="p-reset" onClick={reset} aria-label="Reset the demo">
                  <RotateCcw size={14} />
                </button>
              </div>

              <div className="p-scroll">
                <div className="p-card">
                  <div className="p-device">
                    <span className="p-avatar">S</span>
                    <div>
                      <strong>Galaxy A55</strong>
                      <small>Sample customer · IMEI ••• 3809</small>
                    </div>
                    <span className={`p-pill p-pill-${statusTone}`}>{statusLabel}</span>
                  </div>
                  <div className="p-progress" aria-hidden="true">
                    <motion.span
                      animate={{ width: `${(paid / COUNT) * 100}%` }}
                      transition={settle}
                      style={{ background: overdue && !complete ? '#DC2626' : '#4FAF5A' }}
                    />
                  </div>
                  <div className="p-row">
                    <span>
                      {paid} of {COUNT} paid
                    </span>
                    <span>{complete ? 'Nothing due' : overdue ? `${rupees(EMI)} overdue` : `Next ${NEXT_DUE_DAY}`}</span>
                  </div>
                </div>

                <div className="p-actions">
                  <button type="button" onClick={recordPayment} disabled={complete} className="p-primary">
                    <IndianRupee size={15} /> Record payment
                  </button>
                  <button type="button" onClick={sendReminder} disabled={complete}>
                    <Bell size={14} /> Remind
                  </button>
                  {locked ? (
                    <button type="button" onClick={unlock}>
                      <Unlock size={14} /> Unlock
                    </button>
                  ) : (
                    <button type="button" onClick={lock} disabled={complete}>
                      <Lock size={14} /> Lock
                    </button>
                  )}
                  <button type="button" onClick={locate}>
                    <MapPin size={14} /> Locate
                  </button>
                </div>

                <div className="p-dots">
                  <h4>Instalments</h4>
                  <div>
                    {Array.from({ length: COUNT }, (_, i) => (
                      <i key={i} className={i < paid ? 'paid' : i === paid && overdue ? 'late' : undefined}>
                        {i + 1}
                      </i>
                    ))}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {located && (
                    <motion.div
                      key="map"
                      className="p-map"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 84 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={settle}
                    >
                      <span className="p-pin" aria-hidden="true">
                        <MapPin size={16} />
                      </span>
                      <small>Model Town, Ludhiana · just now</small>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-log">
                  <h4>Activity</h4>
                  <ul aria-live="polite">
                    <AnimatePresence initial={false}>
                      {activity.map((line, i) => (
                        <motion.li
                          key={line + (activity.length - i)}
                          layout
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: i === 0 ? 1 : 0.55, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={settle}
                        >
                          {line}
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              </div>
            </div>
          </Frame>
        </div>

        {/* ---------------- Customer's phone ---------------- */}
        <div className="demo-slot demo-slot-customer">
          <Frame label={locked ? 'Customer · lock screen' : 'Customer · Sky Eagle Customer'}>
            <div className="c-app">
              <div className="c-header">
                <StatusBar tone="dark" />
                <h3>My EMIs</h3>
                <p>Track your active and completed EMIs.</p>
              </div>

              <div className="c-sheet">
                <div className="c-chips">
                  {filters.map((f) => (
                    <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                      {f}
                    </button>
                  ))}
                </div>

                <div className="c-list">
                  {showLoan && (
                    <div className="c-loan">
                      <div className="c-loan-head">
                        <span className="c-avatar">S</span>
                        <div>
                          <strong>Galaxy A55</strong>
                          <small>Samsung</small>
                        </div>
                        <span className={`c-badge c-badge-${complete ? 'muted' : overdue ? 'red' : 'green'}`}>
                          {complete ? 'Completed' : overdue ? 'Overdue' : 'Active'}
                        </span>
                      </div>
                      <hr />
                      <p className="c-amount">
                        <strong>{rupees(outstanding)}</strong>/{rupees(total)}
                      </p>
                      <div className="c-progress" aria-hidden="true">
                        <motion.span
                          animate={{ width: `${(paid / COUNT) * 100}%` }}
                          transition={settle}
                          style={{ background: overdue && !complete ? '#DC2626' : '#22C55E' }}
                        />
                      </div>
                      {complete ? (
                        <p className="c-foot">All EMIs paid</p>
                      ) : overdue ? (
                        <p className="c-foot c-foot-strong">
                          <span>{rupees(EMI)} due · 3 days late</span>
                          <button type="button" onClick={recordPayment}>
                            Pay now →
                          </button>
                        </p>
                      ) : (
                        <p className="c-foot">
                          <span>
                            {COUNT - paid} EMI{COUNT - paid === 1 ? '' : 's'} pending
                          </span>
                          <span className="c-next">
                            <small>Next Due on</small>
                            {NEXT_DUE_DAY}
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  {showOldLoan && (
                    <div className="c-loan c-loan-compact">
                      <div className="c-loan-head">
                        <span className="c-avatar">R</span>
                        <div>
                          <strong>Redmi 12</strong>
                          <small>Xiaomi</small>
                        </div>
                        <span className="c-badge c-badge-muted">Completed</span>
                      </div>
                    </div>
                  )}

                  {!showLoan && !showOldLoan && <p className="c-empty">Nothing {filter.toLowerCase()}.</p>}
                </div>
              </div>

              <nav className="c-tabs" aria-hidden="true">
                <span>
                  <Home size={17} />
                  Home
                </span>
                <span className="on">
                  <CreditCard size={17} />
                  EMI
                </span>
                <span>
                  <Heart size={17} />
                  Wishlist
                </span>
                <span>
                  <User size={17} />
                  Profile
                </span>
              </nav>

              {/* The lock screen rises over the app and leaves the way it came. */}
              <AnimatePresence>
                {locked && (
                  <motion.div
                    key="lock"
                    className="c-lock"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={settle}
                  >
                    <StatusBar tone="dark" />
                    <div className="c-lock-brand">
                      <span className="c-lock-mark">
                        <Lock size={14} />
                      </span>
                      <div>
                        <strong>Sky Eagle</strong>
                        <small>Device protection</small>
                      </div>
                    </div>
                    <h3>This phone is locked</h3>
                    <p>An EMI payment is overdue. Pay it to get full access back right away.</p>

                    <div className="c-lock-card">
                      <small>AMOUNT OVERDUE</small>
                      <strong>{rupees(EMI)}</strong>
                      <span className="c-lock-chip">Due {DUE_DAY}</span>
                    </div>

                    <button type="button" className="c-lock-pay" onClick={recordPayment}>
                      Pay {rupees(EMI)} with UPI
                    </button>
                    <div className="c-lock-how">
                      <small>HOW TO UNLOCK</small>
                      <div>
                        <i>1</i>
                        <p>
                          <strong>Call your retailer</strong>
                          <span>They can unlock this phone remotely in a moment.</span>
                        </p>
                      </div>
                      <div>
                        <i>2</i>
                        <p>
                          <strong>Or enter an unlock code</strong>
                          <span>Your retailer can read you a one-time code.</span>
                        </p>
                      </div>
                    </div>
                    <p className="c-lock-safe">
                      <CheckCircle2 size={14} /> Your photos, contacts and data are untouched.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* A reminder arrives from the top edge and returns to it. */}
              <AnimatePresence>
                {reminder && (
                  <motion.div
                    key="reminder"
                    className="c-notice"
                    role="status"
                    initial={{ y: -90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -90, opacity: 0 }}
                    transition={settle}
                  >
                    <span className="c-notice-icon">
                      <Bell size={14} />
                    </span>
                    <div>
                      <strong>EMI reminder</strong>
                      <small>
                        {complete
                          ? 'Your plan is complete. Thank you.'
                          : overdue
                            ? `${rupees(EMI)} was due on ${DUE_DAY}. Please pay your shop.`
                            : `${rupees(EMI)} is due on ${NEXT_DUE_DAY}.`}
                      </small>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Frame>
        </div>
      </div>

      <p className="demo-caption">
        A working demonstration with sample data. Use the buttons on the retailer’s phone and watch the
        customer’s phone respond.
      </p>
    </div>
  )
}

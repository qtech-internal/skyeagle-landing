import { Moon, Sun } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { site } from '../site'

type Theme = 'light' | 'dark'

function currentTheme(): Theme {
  const set = document.documentElement.getAttribute('data-theme')
  if (set === 'light' || set === 'dark') return set
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    // Until the visitor picks a theme, follow the system setting as it changes.
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const follow = () => setTheme(currentTheme())
    media.addEventListener('change', follow)
    return () => media.removeEventListener('change', follow)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('se-theme', next)
    } catch {
      // Storage can be blocked; the choice then lasts for this page only.
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export function Logo() {
  return (
    <a className="logo" href="/" aria-label={`${site.brand} home`}>
      <img className="on-light" src="/brand/logo-horizontal-light.svg" alt="" width={168} height={24} />
      <img className="on-dark" src="/brand/logo-horizontal-dark.svg" alt="" width={168} height={24} />
    </a>
  )
}

const homeLinks = [
  ['/#platform', 'Platform'],
  ['/#how-it-works', 'How it works'],
  ['/#apps', 'Apps'],
  ['/#transparency', 'Transparency'],
] as const

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap">
          <Logo />
          <nav className="site-nav" aria-label="Main">
            {homeLinks.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <a className="btn btn-primary" href="/#contact">
              Request a demo
            </a>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <Logo />
              <p>
                Device financing operations for mobile retailers: enrolment, instalment records and device
                controls in one place.
              </p>
              <p>{site.address}</p>
            </div>
            <div className="footer-cols">
              <div>
                <h4>Product</h4>
                <ul>
                  {homeLinks.map(([href, label]) => (
                    <li key={href}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Legal</h4>
                <ul>
                  <li>
                    <a href="/privacy/">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/delete-account/">Delete account and data</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Contact</h4>
                <ul>
                  <li>
                    <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            </span>
            <span>Android is a trademark of Google LLC.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

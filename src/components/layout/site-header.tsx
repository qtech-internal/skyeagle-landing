import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { homeLinks } from "@/lib/nav"
import { Logo } from "./logo"

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Logo />
        <nav className="site-nav" aria-label="Main">
          {homeLinks.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="btn btn-primary btn-sm" href="/#contact">
            Request a demo
          </Link>
        </div>
      </div>
    </header>
  )
}

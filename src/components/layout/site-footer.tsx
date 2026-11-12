import Link from "next/link"
import { homeLinks } from "@/lib/nav"
import { site } from "@/lib/site"
import { Logo } from "./logo"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>One platform for retailers who sell phones on instalments.</p>
            <p>{site.address}</p>
          </div>
          <div className="footer-cols">
            <div>
              <h4>Product</h4>
              <ul>
                {homeLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link href="/privacy/">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/delete-account/">Delete account and data</Link>
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
            © {site.copyrightYear} {site.legalName}. All rights reserved.
          </span>
          <span>Android is a trademark of Google LLC.</span>
        </div>
      </div>
    </footer>
  )
}

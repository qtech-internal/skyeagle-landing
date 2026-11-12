import Link from "next/link"

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="closing">
          <h2>This page could not be found.</h2>
          <p>The link may be out of date, or the page may have moved.</p>
          <div className="cta-row cta-center">
            <Link className="btn btn-primary" href="/">
              Go to the home page
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

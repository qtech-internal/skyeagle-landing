import { Mail } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, type DocSection } from '@/components/doc-page'
import { pageMetadata } from '@/lib/seo'
import { apps, site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Delete your account and data',
  description:
    'How to ask Sky Eagle to delete your account and the personal data associated with it.',
  path: '/delete-account/',
})

const subject = encodeURIComponent('Account deletion request')
const body = encodeURIComponent(
  [
    'I request deletion of my Sky Eagle account and personal data.',
    '',
    'App (Sky Eagle Partner or Sky Eagle Customer):',
    'Registered mobile number:',
    'Full name:',
  ].join('\n'),
)

const sections: DocSection[] = [
  {
    id: 'how-to-request',
    title: 'How to request deletion',
    body: (
      <>
        <ol>
          <li>
            Send an email to <span className="copyable">{site.privacyEmail}</span> from the email address on
            your account, or include your registered mobile number.
          </li>
          <li>State which app you use ({apps.partner} or {apps.customer}) and your full name.</li>
          <li>
            We confirm the request with a one-time password sent to your registered mobile number, so that
            nobody else can delete your account.
          </li>
          <li>
            We complete the deletion within {site.deletionDays} days of confirmation and write to you when it
            is done.
          </li>
        </ol>
        <div className="request-card">
          <strong>Send the request by email</strong>
          <div className="row">
            <span className="copyable">{site.privacyEmail}</span>
            <a className="btn btn-primary" href={`mailto:${site.privacyEmail}?subject=${subject}&body=${body}`}>
              <Mail size={16} /> Open email
            </a>
          </div>
          <span style={{ color: 'var(--fg-2)', fontSize: '0.875rem' }}>
            If the button does not open your email app, copy the address above and write to us directly.
          </span>
        </div>
      </>
    ),
  },
  {
    id: 'what-is-deleted',
    title: 'What is deleted',
    body: (
      <ul>
        <li>Your account and sign-in credentials. All active sessions are signed out.</li>
        <li>Your name, mobile number, email address and postal address.</li>
        <li>Identity verification documents: photographs, document images, signatures and videos.</li>
        <li>Push notification tokens and stored device location history.</li>
        <li>Support messages linked to your account.</li>
      </ul>
    ),
  },
  {
    id: 'what-is-kept',
    title: 'What is kept, and why',
    body: (
      <>
        <ul>
          <li>
            <strong>The retailer’s transaction records.</strong> The record of the sale and of instalments
            received belongs to the retailer’s business records. It is kept, with your personal details
            removed or anonymised, for the period required by tax and commercial law.
          </li>
          <li>
            <strong>Audit and security logs.</strong> Kept in anonymised form to investigate misuse and meet
            legal obligations.
          </li>
        </ul>
        <p>
          Details are in the <Link href="/privacy/#retention">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'open-plans',
    title: 'If you have an open instalment plan',
    body: (
      <p>
        A customer account cannot be deleted while an instalment plan is open, because the retailer and the
        customer both rely on that record and the phone is still enrolled. Once the final instalment is
        recorded and the retailer releases the device, send the request and we will delete the account. You
        can still ask us at any time to correct inaccurate details.
      </p>
    ),
  },
  {
    id: 'partners',
    title: 'Retailers and distributors',
    body: (
      <p>
        Partner accounts are created by {site.brand}. To close a partner account, write to the same address
        from your registered email. Devices and plans recorded under the account must be closed or
        transferred first.
      </p>
    ),
  },
]

export default function DeleteAccount() {
  return (
    <DocPage
      title="Delete your account and data"
      summary={
        <>
          How to ask {site.brand} to delete your {apps.partner} or {apps.customer} account and the personal
          data associated with it.
        </>
      }
      meta={[apps.partner, apps.customer, `Completed within ${site.deletionDays} days`]}
      sections={sections}
    />
  )
}

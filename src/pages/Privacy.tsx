import { Info } from 'lucide-react'
import DocPage, { type DocSection } from '../components/DocPage'
import { apps, site } from '../site'

const mail = <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>

const sections: DocSection[] = [
  {
    id: 'scope',
    title: 'Who we are and what this policy covers',
    body: (
      <>
        <p>
          {site.legalName} ({site.legalName === site.brand ? '' : `“${site.brand}”, `}“we”, “us”) operates a record-keeping and device management
          platform used by mobile retailers who sell phones on instalments. This policy explains how we handle
          personal data in:
        </p>
        <ul>
          <li>
            <strong>{apps.partner}</strong>, the app used by retailers and distributors;
          </li>
          <li>
            <strong>{apps.customer}</strong>, the app used by customers who bought a phone on instalments from
            a {site.brand} retailer;
          </li>
          <li>
            the <strong>{site.brand} device management app</strong> installed on a phone enrolled by a
            retailer;
          </li>
          <li>our admin console and this website.</li>
        </ul>
        <p>
          {site.brand} does not provide credit, does not arrange credit and does not process payments. The
          instalment plan is an arrangement between the retailer and the customer. We store the record of that
          plan and provide the tools to manage the enrolled device.
        </p>
      </>
    ),
  },
  {
    id: 'data-we-collect',
    title: 'Information we collect',
    body: (
      <>
        <h3>Retailers and distributors</h3>
        <ul>
          <li>Name, mobile number, email address and sign-in credentials.</li>
          <li>Business details: shop name and address, GSTIN, PAN, and the business documents submitted for verification.</li>
          <li>A photograph of the account holder.</li>
          <li>Shop location, when you choose to set it using your device’s location.</li>
        </ul>

        <h3>Customers</h3>
        <p>The retailer records the following at the counter, with the customer present:</p>
        <ul>
          <li>Name, mobile number, email address and postal address.</li>
          <li>
            Identity verification documents: images of the front and back of the Aadhaar card, a photograph, a
            signature, a short verification video, and the photograph and signature of a witness. The Aadhaar
            number may be recorded where the customer provides it.
          </li>
          <li>
            The instalment plan agreed with the retailer: price, down payment, number and amount of
            instalments, due dates, and the payments the retailer records as received.
          </li>
        </ul>

        <h3>Enrolled devices</h3>
        <p>For a phone enrolled as a managed device we collect:</p>
        <ul>
          <li>Device identifiers: IMEI numbers, serial number, manufacturer and model.</li>
          <li>Device status: battery level, connectivity, SIM and phone number information, and whether the device is restricted.</li>
          <li>
            Device location, including when the app is not in use, so that the retailer can locate a financed
            device. See “Device management on enrolled phones” below.
          </li>
        </ul>

        <h3>All users</h3>
        <ul>
          <li>A push notification token, so we can deliver reminders and commands.</li>
          <li>App version, device model, operating system version, IP address, and a log of sign-ins and actions taken in the apps.</li>
          <li>Messages you send to support.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'permissions',
    title: 'App permissions',
    body: (
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Permission</th>
              <th>{apps.partner}</th>
              <th>{apps.customer}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Camera</td>
              <td>Capturing verification documents and scanning handset box labels and QR codes.</td>
              <td>Scanning a QR code to sign in.</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>Setting the shop’s location and showing devices on a map. Used while the app is open.</td>
              <td>Showing nearby shops on the map. Used while the app is open, and optional.</td>
            </tr>
            <tr>
              <td>Notifications</td>
              <td>Alerts about customers, devices and verification.</td>
              <td>Instalment reminders and updates about your device.</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'device-management',
    title: 'Device management on enrolled phones',
    body: (
      <>
        <p>
          When a customer buys a phone on instalments from a {site.brand} retailer, the phone is enrolled as a
          managed device at the counter, with the customer’s agreement, before it is handed over. The{' '}
          {site.brand} device management app then runs on the phone for as long as the instalment plan is
          open.
        </p>
        <p>While the phone is enrolled, the device management app can:</p>
        <ul>
          <li>report the device identifiers, status and location described above to the retailer;</li>
          <li>show instalment reminders on the device;</li>
          <li>
            place the device in a restricted mode when an instalment is overdue, on the retailer’s
            instruction. Emergency calls remain available in restricted mode;
          </li>
          <li>prevent removal of device management, including by factory reset, until the plan is closed.</li>
        </ul>
        <p>
          When the retailer records the final instalment and releases the device, management is removed and
          this collection stops.
        </p>
      </>
    ),
  },
  {
    id: 'use',
    title: 'How we use information',
    body: (
      <ul>
        <li>To create and secure accounts, and to verify the identity of partners and customers.</li>
        <li>To keep the record of instalment plans and payments, and show it to the retailer and the customer.</li>
        <li>To deliver reminders and carry out device commands issued by the retailer.</li>
        <li>To provide support and respond to requests.</li>
        <li>To keep an audit trail, prevent misuse and fraud, and meet legal obligations.</li>
      </ul>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share information with',
    body: (
      <>
        <p>We do not sell personal data and we do not use it for advertising. We share it only as follows:</p>
        <ul>
          <li>
            <strong>The retailer and their distributor.</strong> A customer’s details, plan and device
            information are visible to the retailer who sold the phone and to that retailer’s distributor.
          </li>
          <li>
            <strong>Service providers</strong> who process data on our behalf: Google Cloud (hosting and file
            storage), Firebase Cloud Messaging (push notifications), Google Maps Platform (maps and address
            search), MSG91 (one-time passwords and service messages by SMS and email) and Cloudflare (content
            delivery).
          </li>
          <li>
            <strong>Authorities</strong>, where the law requires it or to protect the rights and safety of our
            users.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Storage and security',
    body: (
      <ul>
        <li>All data sent between the apps and our servers is encrypted in transit.</li>
        <li>Identity verification documents are encrypted in storage, and access to them is limited to authorised staff and the partner who submitted them.</li>
        <li>Passwords and PINs are stored only in hashed form.</li>
        <li>Access to the admin console is restricted and recorded.</li>
      </ul>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep information',
    body: (
      <>
        <p>
          We keep account and device information for as long as the account is active or an instalment plan is
          open. After that, we keep only what is needed for the retailer’s business records and for legal, tax
          and dispute purposes, and then delete or anonymise it.
        </p>
        <p>
          Records of the sale and of instalments received are the retailer’s business records. When a customer
          asks for deletion we remove or anonymise their personal details, and the retailer’s transaction
          records are kept for the period the law requires.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your choices and rights',
    body: (
      <>
        <ul>
          <li>
            <strong>Access and correction.</strong> You can view your details in the app. To correct them,
            contact your retailer or write to us.
          </li>
          <li>
            <strong>Deletion.</strong> You can ask us to delete your account and personal data. The steps are
            on the <a href="/delete-account/">Delete account and data</a> page.
          </li>
          <li>
            <strong>Permissions.</strong> You can turn off location, camera or notification access in your
            device settings. Some features will not work without them. On an enrolled phone, device management
            cannot be turned off while the plan is open.
          </li>
          <li>
            <strong>Complaints.</strong> Write to {mail}. We acknowledge complaints promptly and aim to
            resolve them within {site.deletionDays} days.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        Our apps are for adults. We do not knowingly collect personal data from anyone under 18. If you
        believe a minor’s data has been recorded, write to {mail} and we will remove it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We will update this page when our practices change and revise the effective date above. For
        significant changes we will also notify users in the apps.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <>
        <p>For any question about this policy or your personal data:</p>
        <ul>
          <li>
            Email: <span className="copyable">{site.privacyEmail}</span>
          </li>
          <li>
            Address: {site.legalName}, {site.address}
          </li>
        </ul>
      </>
    ),
  },
]

export default function Privacy() {
  return (
    <DocPage
      title="Privacy Policy"
      summary={
        <>
          How {site.brand} collects, uses, shares and deletes personal data in the {apps.partner} app, the{' '}
          {apps.customer} app and on phones enrolled by a {site.brand} retailer.
        </>
      }
      meta={[`Effective ${site.policyEffectiveDate}`, apps.partner, apps.customer]}
      sections={sections}
      lead={
        <p className="notice info">
          <Info size={18} />
          <span>
            In short: we keep the records a retailer needs to run instalment sales and manage the enrolled
            device. We do not sell personal data, show advertising, provide credit or process payments.
          </span>
        </p>
      }
    />
  )
}

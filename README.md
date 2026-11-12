# Sky Eagle website

The public site at skyeagle.online: the landing page, the privacy policy and the
account deletion page. Built with Vite, React and TypeScript.

## Pages

| URL | Entry | Purpose |
|---|---|---|
| `/` | `index.html` | Landing page |
| `/privacy/` | `privacy/index.html` | Privacy policy. Linked from both Play Store listings. |
| `/delete-account/` | `delete-account/index.html` | How to request account and data deletion. Linked from the Play Data safety forms. |

Each page is its own HTML entry, so the URLs work on any static host without
rewrite rules. Do not rename `/privacy/` or `/delete-account/`: the store
listings point at them.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output in dist/
npm run preview   # serve dist/ locally
npm run lint
```

## Where things live

```text
index.html, privacy/, delete-account/   HTML entries
src/site.ts                             company facts the pages state (names, emails, dates)
src/styles/site.css                     design tokens and all styles, light and dark
src/components/Shell.tsx                header, footer, theme toggle
src/components/DocPage.tsx              layout for the policy and deletion pages
src/components/PhoneDemo.tsx            the interactive two-phone demonstration
src/components/Reveal.tsx               fade and rise as a block scrolls into view
src/pages/                              Home, Privacy, DeleteAccount
public/brand/                           logo files, copied from mdm-admin/public/brand
```

## Design

Large display type set tight, wide quiet sections that alternate between the
page colour and a soft grey, a translucent header, and rounded tiles that carry
one idea each. The system typeface is used on purpose. The site follows the
system theme and has a manual toggle.

The two phones at the top are a working demonstration, in
`src/components/PhoneDemo.tsx`. The left phone is the retailer's Partner app;
its buttons change the customer's phone on the right. The customer screens
follow the real apps: the "My EMIs" screen from the Customer app and the lock
screen from the device management app, with the same wording and colours. If
those screens change in the apps, update the demo to match. All figures in it
are sample data.

Motion uses the `motion` library with critically damped springs, and is turned
off for readers who ask for reduced motion.

## Editing the policy

The privacy policy and the deletion page are public commitments. Change the
facts in `src/site.ts` and the text in `src/pages/Privacy.tsx` or
`src/pages/DeleteAccount.tsx` only when the business has agreed to the change,
and update `policyEffectiveDate` when the policy text changes.

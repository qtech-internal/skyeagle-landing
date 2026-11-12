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
src/pages/                              Home, Privacy, DeleteAccount
public/brand/                           logo files, copied from mdm-admin/public/brand
```

## Design

The site follows the admin dashboard's neutral palette (white or near-black
surfaces, hairline borders, near-black primary) and takes the Geist typeface,
the green and amber status colours and the pill-shaped buttons from the Partner
and Customer apps. It follows the system theme and has a manual toggle.

## Editing the policy

The privacy policy and the deletion page are public commitments. Change the
facts in `src/site.ts` and the text in `src/pages/Privacy.tsx` or
`src/pages/DeleteAccount.tsx` only when the business has agreed to the change,
and update `policyEffectiveDate` when the policy text changes.

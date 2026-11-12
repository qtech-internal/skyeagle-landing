# Sky Eagle website

The public site at skyeagle.online: the landing page, the privacy policy and the
account deletion page. Built with Next.js (App Router), React and TypeScript,
set up the same way as `mdm-admin`.

## Pages

| URL | File | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing page |
| `/privacy/` | `src/app/privacy/page.tsx` | Privacy policy. Linked from both Play Store listings. |
| `/delete-account/` | `src/app/delete-account/page.tsx` | How to request account and data deletion. Linked from the Play Data safety forms. |

All three are pre-rendered as static HTML at build time, so the policy text is
in the page source and readable without scripts. Do not rename `/privacy/` or
`/delete-account/`: the store listings point at them.

## Run

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm start    # serve the production build
pnpm lint
```

## Where things live

```text
src/app/layout.tsx                 html shell, metadata, theme and motion providers, header and footer
src/app/page.tsx                   landing page
src/app/privacy/page.tsx           privacy policy
src/app/delete-account/page.tsx    account deletion page
src/app/not-found.tsx              404 page
src/app/robots.ts, sitemap.ts      crawl rules and sitemap, generated
src/app/globals.css                design tokens and all styles, light and dark
src/components/layout/             site header, footer, logo
src/components/phone-demo.tsx      the interactive two-phone demonstration (client)
src/components/reveal.tsx          fade and rise as a block scrolls into view (client)
src/components/doc-page.tsx        layout for the policy and deletion pages
src/components/theme-*.tsx         next-themes provider and the toggle (client)
src/lib/site.ts                    company facts the pages state (names, emails, dates)
src/lib/nav.ts                     landing page sections for the header and footer
public/brand/                      logo files, copied from mdm-admin/public/brand
```

Pages and layout are Server Components. Only the pieces that need the browser
are client components: the phone demonstration, the scroll reveals, and the
theme toggle.

## Design

Large display type set tight, wide quiet sections that alternate between the
page colour and a soft grey, a translucent header, and rounded tiles that carry
one idea each. The system typeface is used on purpose. The site follows the
system theme and has a manual toggle.

The two phones at the top are a working demonstration. The left phone is the
retailer's Partner app; its buttons change the customer's phone on the right.
The customer screens follow the real apps: the "My EMIs" screen from the
Customer app and the lock screen from the device management app, with the same
wording and colours. If those screens change in the apps, update the demo to
match. All figures in it are sample data.

Motion uses the `motion` library with critically damped springs, and is turned
off for readers who ask for reduced motion.

## Editing the policy

The privacy policy and the deletion page are public commitments. Change the
facts in `src/lib/site.ts` and the text in the two page files only when the
business has agreed to the change, and update `policyEffectiveDate` when the
policy text changes.

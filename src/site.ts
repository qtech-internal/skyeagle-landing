/**
 * Facts the pages state about the company. The privacy policy and the
 * deletion page are linked from the Play Store listings, so every value here
 * is a public commitment: change it only when the business has agreed to it.
 */
export const site = {
  brand: 'Sky Eagle',
  /** The entity named on the Play Console developer account. */
  legalName: 'Sky Eagle',
  supportEmail: 'support@skyeagle.online',
  /** Receives privacy and deletion requests. */
  privacyEmail: 'support@skyeagle.online',
  address: 'Ludhiana, Punjab, India',
  url: 'https://skyeagle.online',
  policyEffectiveDate: '12 November 2026',
  /** Days within which a verified deletion request is completed. */
  deletionDays: 30,
} as const

export const apps = {
  partner: 'Sky Eagle Partner',
  customer: 'Sky Eagle Customer',
} as const

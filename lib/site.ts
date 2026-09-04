export const siteConfig = {
  name: "PixelDojo",
  supportUrl: process.env.NEXT_PUBLIC_SUPPORT_URL ?? "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  newsletterUrl: process.env.NEXT_PUBLIC_NEWSLETTER_URL ?? "",
  socials: {
    x: process.env.NEXT_PUBLIC_X_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  },
};

export const configuredSocials = Object.entries(siteConfig.socials).filter(
  ([, url]) => Boolean(url)
);

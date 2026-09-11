import type { Metadata } from "next";
import { headers } from "next/headers";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PixelDojo — Train your design judgment",
  description:
    "Train your design judgment through fast visual challenges and learn the principles behind good design.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-pixeldojo-locale") === "es" ? "es" : "en";

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}

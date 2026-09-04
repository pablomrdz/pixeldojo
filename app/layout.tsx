import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelDojo — Train your design judgment",
  description:
    "Train your design judgment through fast visual challenges and learn the principles behind good design.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

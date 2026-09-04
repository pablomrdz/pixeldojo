import Link from "next/link";
import type { Locale } from "@/lib/types";

export function PixelDojoLogo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="group inline-flex items-center gap-2.5" aria-label="PixelDojo">
      <span className="pixel-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="text-lg font-bold tracking-[-0.035em]">PixelDojo</span>
    </Link>
  );
}

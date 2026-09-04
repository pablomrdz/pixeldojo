import { BattleEngine } from "@/components/battle/BattleEngine";
import type { Locale } from "@/lib/types";

export default async function PlayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";

  return (
    <main className="shell py-8 md:py-12">
      <header className="mb-12 flex items-center justify-between">
        <a href="/" className="font-semibold">PixelDojo</a>
        <span className="text-sm text-neutral-500">Train your design judgment.</span>
      </header>
      <BattleEngine locale={locale} />
    </main>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <main className="shell py-10 md:py-16">
      <nav className="flex items-center justify-between">
        <strong className="text-lg">PixelDojo</strong>
        <Link href="/en/play" className="text-sm text-neutral-600">Enter the Dojo →</Link>
      </nav>

      <section className="py-24 md:py-36">
        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">Design judgment training</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          Know why good design works.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          Train your design judgment through fast visual challenges and learn the principle behind every decision.
        </p>
        <div className="mt-9 flex gap-3">
          <Link href="/en/play" className="rounded-xl bg-neutral-950 px-6 py-3 font-semibold text-white">
            Start a battle
          </Link>
          <Link href="/es/play" className="rounded-xl border border-neutral-300 px-6 py-3 font-semibold">
            Jugar en español
          </Link>
        </div>
        <p className="mt-4 text-sm text-neutral-500">No account required · 10-battle first session</p>
      </section>
    </main>
  );
}

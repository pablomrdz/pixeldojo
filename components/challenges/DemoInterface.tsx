import type { Locale } from "@/lib/types";

type DemoInterfaceProps = {
  variant: string;
  locale?: Locale;
};

const box = "rounded-2xl border border-neutral-200 bg-white";

export function DemoInterface({ variant, locale = "en" }: DemoInterfaceProps) {
  if (variant.startsWith("cta-")) {
    const strong = variant === "cta-clear";
    return (
      <div className={`${box} flex min-h-64 flex-col justify-between p-6`}>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Studio</div>
          <h3 className="mt-4 text-2xl font-semibold">
            {locale === "es" ? "Diseña con claridad" : "Design with clarity"}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
            {locale === "es"
              ? "Un espacio simple para organizar tus decisiones de producto."
              : "A simple space to organize your product decisions."}
          </p>
        </div>
        <div className="mt-8 flex gap-3">
          <span className={`rounded-xl px-4 py-3 text-sm font-semibold ${strong ? "bg-neutral-950 text-white" : "border border-neutral-300 text-neutral-600"}`}>
            {locale === "es" ? "Empezar" : "Get started"}
          </span>
          <span className="rounded-xl border border-neutral-300 px-4 py-3 text-sm">
            {locale === "es" ? "Ver demo" : "View demo"}
          </span>
        </div>
      </div>
    );
  }

  if (variant.startsWith("pricing-")) {
    const structured = variant === "pricing-structured";
    return (
      <div className={`${box} min-h-64 p-6`}>
        <p className={structured ? "text-sm font-medium text-neutral-500" : "text-base font-medium"}>
          Pro
        </p>
        <div className={structured ? "mt-2 text-4xl font-semibold tracking-tight" : "mt-4 text-2xl font-medium"}>
          $12 <span className="text-sm font-normal text-neutral-500">/mo</span>
        </div>
        <div className={structured ? "mt-5 space-y-2 text-sm text-neutral-600" : "mt-4 space-y-2 text-base"}>
          <p>✓ Unlimited projects</p>
          <p>✓ Team sharing</p>
          <p>✓ Export tools</p>
        </div>
        <div className={`mt-6 rounded-xl border px-4 py-3 text-center text-sm font-semibold ${structured ? "border-neutral-950 bg-neutral-950 text-white" : "border-neutral-300"}`}>
          {locale === "es" ? "Elegir Pro" : "Choose Pro"}
        </div>
      </div>
    );
  }

  if (variant.startsWith("card-")) {
    const grouped = variant === "card-grouped";
    return (
      <div className={`${box} min-h-64 p-6`}>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-neutral-200" />
          <div>
            <p className="font-semibold">Alex Rivera</p>
            <p className="text-xs text-neutral-500">Product Designer</p>
          </div>
        </div>
        <div className={grouped ? "mt-6 space-y-1" : "mt-3 space-y-3"}>
          <p className="text-sm font-medium">{locale === "es" ? "Proyecto actual" : "Current project"}</p>
          <p className="text-sm text-neutral-500">Mobile onboarding redesign</p>
        </div>
        <div className={grouped ? "mt-6 flex gap-2" : "mt-3 flex gap-2"}>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs">UX</span>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs">Mobile</span>
        </div>
      </div>
    );
  }

  if (variant.startsWith("form-")) {
    const semantic = variant === "form-semantic";
    return (
      <div className={`${box} min-h-64 p-6`}>
        <p className="font-semibold">{locale === "es" ? "Información de contacto" : "Contact information"}</p>
        <div className={semantic ? "mt-5 space-y-3" : "mt-4 space-y-5"}>
          <label className="block text-xs text-neutral-500">
            Email
            <div className="mt-1 h-10 rounded-lg border border-neutral-300 bg-neutral-50" />
          </label>
          <label className="block text-xs text-neutral-500">
            {locale === "es" ? "Teléfono" : "Phone"}
            <div className="mt-1 h-10 rounded-lg border border-neutral-300 bg-neutral-50" />
          </label>
        </div>
        <div className={semantic ? "mt-7" : "mt-4"}>
          <p className="text-xs font-medium text-neutral-500">{locale === "es" ? "Preferencias" : "Preferences"}</p>
          <div className="mt-2 h-10 rounded-lg border border-neutral-300 bg-neutral-50" />
        </div>
      </div>
    );
  }

  if (variant.startsWith("type-")) {
    const hierarchy = variant === "type-hierarchy";
    return (
      <div className={`${box} min-h-64 p-6`}>
        <p className={hierarchy ? "text-xs font-semibold uppercase tracking-wider text-neutral-400" : "text-base font-medium"}>
          Design systems
        </p>
        <h3 className={hierarchy ? "mt-3 text-2xl font-semibold leading-tight" : "mt-3 text-lg font-medium"}>
          {locale === "es" ? "Cómo diseñar interfaces consistentes" : "How to design consistent interfaces"}
        </h3>
        <p className={hierarchy ? "mt-3 text-sm leading-6 text-neutral-500" : "mt-3 text-base leading-6"}>
          {locale === "es"
            ? "Una guía breve para convertir decisiones repetidas en un sistema coherente."
            : "A short guide to turning repeated decisions into a coherent system."}
        </p>
        <p className={hierarchy ? "mt-5 text-xs text-neutral-400" : "mt-4 text-base"}>
          6 min read
        </p>
      </div>
    );
  }

  if (variant.startsWith("dashboard-")) {
    const metric = variant === "dashboard-metric";
    return (
      <div className={`${box} min-h-64 p-6`}>
        <p className="text-sm font-medium">{locale === "es" ? "Rendimiento semanal" : "Weekly performance"}</p>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            ["Revenue", "$24.8k"],
            ["Orders", "1,284"],
            ["Conv.", "4.8%"],
          ].map(([label, value], i) => (
            <div key={label} className="rounded-xl bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">{label}</p>
              <p className={metric && i === 0 ? "mt-1 text-2xl font-semibold" : "mt-1 text-lg font-medium"}>{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 h-16 rounded-xl bg-neutral-100" />
      </div>
    );
  }

  if (variant.startsWith("error-")) {
    const inline = variant === "error-inline";
    return (
      <div className={`${box} min-h-64 p-6`}>
        <p className="font-semibold">{locale === "es" ? "Iniciar sesión" : "Sign in"}</p>
        {!inline && (
          <div className="mt-4 rounded-lg bg-neutral-100 p-3 text-xs text-neutral-500">
            {locale === "es" ? "Algo salió mal." : "Something went wrong."}
          </div>
        )}
        <label className="mt-5 block text-xs text-neutral-500">
          Email
          <div className={`mt-1 h-10 rounded-lg border bg-neutral-50 ${inline ? "border-neutral-950" : "border-neutral-300"}`} />
          {inline && (
            <span className="mt-1 block text-xs text-neutral-700">
              {locale === "es" ? "Escribe un email válido, por ejemplo nombre@dominio.com" : "Enter a valid email, e.g. name@domain.com"}
            </span>
          )}
        </label>
      </div>
    );
  }

  if (variant.startsWith("checkout-")) {
    const guest = variant === "checkout-guest";
    return (
      <div className={`${box} min-h-64 p-6`}>
        <p className="font-semibold">Checkout</p>
        <div className="mt-4 rounded-xl bg-neutral-50 p-4">
          <p className="text-sm font-medium">{locale === "es" ? "Total" : "Total"}</p>
          <p className="mt-1 text-xl font-semibold">$48.00</p>
        </div>
        {guest ? (
          <div className="mt-5 space-y-3">
            <div className="h-10 rounded-lg border border-neutral-300 bg-neutral-50" />
            <div className="rounded-xl bg-neutral-950 px-4 py-3 text-center text-sm font-semibold text-white">
              {locale === "es" ? "Continuar como invitado" : "Continue as guest"}
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-2">
            <p className="text-xs font-medium text-neutral-500">{locale === "es" ? "Crea una cuenta para continuar" : "Create an account to continue"}</p>
            <div className="h-9 rounded-lg border border-neutral-300 bg-neutral-50" />
            <div className="h-9 rounded-lg border border-neutral-300 bg-neutral-50" />
          </div>
        )}
      </div>
    );
  }

  if (variant.startsWith("contrast-")) {
    const readable = variant === "contrast-readable";
    return (
      <div className={`${box} flex min-h-64 items-center justify-center p-6`}>
        <div className="rounded-2xl bg-neutral-100 p-6 text-center">
          <p className={`text-lg font-semibold ${readable ? "text-neutral-900" : "text-neutral-300"}`}>
            {locale === "es" ? "Tu pedido está listo" : "Your order is ready"}
          </p>
          <p className={`mt-2 text-sm ${readable ? "text-neutral-600" : "text-neutral-300"}`}>
            {locale === "es" ? "Recógelo antes de las 7:00 PM." : "Pick it up before 7:00 PM."}
          </p>
        </div>
      </div>
    );
  }

  const comfortable = variant === "touch-comfortable";
  return (
    <div className={`${box} flex min-h-64 items-center justify-center p-6`}>
      <div className="w-56 rounded-[28px] border border-neutral-300 bg-neutral-50 p-4">
        <div className="h-28 rounded-2xl bg-neutral-200" />
        <div className={`mt-4 flex items-center justify-between ${comfortable ? "gap-3" : "gap-1"}`}>
          {["♡", "↗", "⋯"].map((icon) => (
            <span
              key={icon}
              className={`flex items-center justify-center rounded-full border border-neutral-300 bg-white ${
                comfortable ? "h-11 w-11 text-base" : "h-6 w-6 text-[10px]"
              }`}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

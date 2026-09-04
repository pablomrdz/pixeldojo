type DemoInterfaceProps = { variant: string };

export function DemoInterface({ variant }: DemoInterfaceProps) {
  const isBetter = [
    "cta-clear","pricing-structured","card-grouped","form-semantic","type-hierarchy",
    "dashboard-metric","error-inline","checkout-guest","contrast-readable","touch-comfortable"
  ].includes(variant);

  return (
    <div className="card min-h-64 p-6 flex flex-col justify-between">
      <div className="space-y-4">
        <div className={`rounded-lg bg-neutral-200 ${isBetter ? "h-7 w-3/5" : "h-5 w-4/5"}`} />
        <div className="space-y-2">
          <div className="h-3 rounded bg-neutral-200 w-full" />
          <div className="h-3 rounded bg-neutral-200 w-4/5" />
          <div className={`h-3 rounded bg-neutral-200 ${isBetter ? "w-2/3" : "w-11/12"}`} />
        </div>
      </div>

      <div className={`mt-8 rounded-xl text-center font-semibold ${isBetter ? "border-2 border-neutral-900 px-5 py-4" : "border border-neutral-300 px-3 py-2 text-neutral-500"}`}>
        {isBetter ? "Primary action" : "Action"}
      </div>
    </div>
  );
}

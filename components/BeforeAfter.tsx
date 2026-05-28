import { ArrowRight, CheckCircle2, ListChecks } from "lucide-react";

const beforeItems = [
  "Select bridge",
  "Check liquidity",
  "Approve token",
  "Bridge assets",
  "Wait for confirmation",
  "Swap if needed",
  "Manage gas",
  "Send to recipient"
];

const afterItems = [
  "Define desired outcome",
  "Confirm intent",
  "Solver handles execution",
  "Recipient receives funds"
];

export function BeforeAfter() {
  return (
    <aside className="glass rounded-lg p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">UX Shift</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Before vs After</h2>
        </div>
        <div className="rounded-lg border border-aqua/25 bg-aqua/10 p-2 text-aqua">
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="space-y-5">
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
            <ListChecks className="h-4 w-4 text-violetglass" aria-hidden="true" />
            Before: Route-based UX
          </div>
          <ul className="space-y-2">
            {beforeItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.035] px-3 py-2 text-sm text-slate-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="surface-line h-px" />

        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
            <CheckCircle2 className="h-4 w-4 text-aqua" aria-hidden="true" />
            After: Intent-based UX
          </div>
          <ul className="space-y-2">
            {afterItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-lg border border-aqua/20 bg-aqua/[0.07] px-3 py-2 text-sm text-slate-100"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-aqua" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}

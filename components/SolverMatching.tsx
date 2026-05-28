"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Gauge, Info, Timer, WalletCards, Zap } from "lucide-react";
import { EducationCallout } from "./EducationCallout";

type SolverMatchingProps = {
  onSimulateFill: () => void;
};

const solvers = [
  {
    name: "Solver A",
    inventory: "Base USDC / Arbitrum USDC",
    delivery: "12 sec",
    fee: "0.12 USDC",
    status: "Selected",
    reason: "Fastest available fill",
    accent: "aqua"
  },
  {
    name: "Solver B",
    inventory: "Optimism USDC / Arbitrum USDC",
    delivery: "20 sec",
    fee: "0.09 USDC",
    status: "Available",
    reason: "Cheaper but slower",
    accent: "lime"
  },
  {
    name: "Solver C",
    inventory: "Ethereum USDC / Arbitrum USDC",
    delivery: "28 sec",
    fee: "0.18 USDC",
    status: "Available",
    reason: "Higher fee due to inventory cost",
    accent: "violet"
  }
];

const accentMap = {
  aqua: "border-aqua/35 bg-aqua/10 text-aqua",
  lime: "border-limeglass/35 bg-limeglass/10 text-limeglass",
  violet: "border-violetglass/35 bg-violetglass/10 text-violetglass"
};

export function SolverMatching({ onSimulateFill }: SolverMatchingProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-5"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-violetglass/25 bg-violetglass/10 px-3 py-1 text-xs font-medium text-violetglass">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            Solver Matching
          </div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Solvers compete to fulfill the outcome
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            The user-defined outcome is evaluated against mocked solver inventory, delivery speed, fee,
            and execution quality.
          </p>
        </div>
        <button
          type="button"
          onClick={onSimulateFill}
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-aqua px-5 py-3 text-sm font-semibold text-ink shadow-glow transition duration-200 hover:bg-mist"
        >
          Simulate Fill
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {solvers.map((solver, index) => (
          <motion.article
            key={solver.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.42 }}
            className={`glass rounded-lg p-5 ${
              solver.status === "Selected" ? "ring-1 ring-aqua/45" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{solver.name}</h3>
                <p className="mt-1 text-xs text-slate-400">Mock solver profile</p>
              </div>
              <span
                className={`rounded-lg border px-3 py-1 text-xs font-medium ${
                  accentMap[solver.accent as keyof typeof accentMap]
                }`}
              >
                {solver.status}
              </span>
            </div>

            <dl className="mt-5 space-y-3">
              <div className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <WalletCards className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-slate-400">Inventory</dt>
                  <dd className="mt-1 text-sm font-medium text-white">{solver.inventory}</dd>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <dt className="flex items-center gap-2 text-xs text-slate-400">
                    <Timer className="h-3.5 w-3.5 text-limeglass" aria-hidden="true" />
                    Estimated delivery
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-white">{solver.delivery}</dd>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <dt className="flex items-center gap-2 text-xs text-slate-400">
                    <Gauge className="h-3.5 w-3.5 text-violetglass" aria-hidden="true" />
                    Fee
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-white">{solver.fee}</dd>
                </div>
              </div>
              <div className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-slate-400">Reason</dt>
                  <dd className="mt-1 text-sm font-medium text-white">{solver.reason}</dd>
                </div>
              </div>
            </dl>
          </motion.article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <EducationCallout tone="violet">
          In an intent-based flow, the user does not manually select a bridge. Solvers compete or are
          matched based on inventory, price, speed, and execution quality.
        </EducationCallout>
        <div className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.055] px-4 py-3 text-sm leading-6 text-slate-300">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-limeglass" aria-hidden="true" />
          This demo uses mocked solver data for education. It is not executing real LI.FI Intents
          transactions.
        </div>
      </div>
    </motion.section>
  );
}

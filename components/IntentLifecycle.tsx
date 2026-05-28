"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleDotDashed,
  LockKeyhole,
  RadioTower,
  RotateCcw,
  SendToBack,
  ShieldCheck,
  Trophy
} from "lucide-react";
import { useEffect, useState } from "react";

type IntentLifecycleProps = {
  onReset: () => void;
};

const steps = [
  {
    title: "User locks input on source chain",
    explanation: "The user commits 100 USDC on Base as the input asset for the intent.",
    icon: LockKeyhole
  },
  {
    title: "Intent sent to order server",
    explanation: "The desired outcome is broadcast so available solvers can evaluate the order.",
    icon: RadioTower
  },
  {
    title: "Solver matched",
    explanation:
      "A solver with suitable inventory and pricing is selected to fulfill the destination-side output.",
    icon: CircleDotDashed
  },
  {
    title: "Solver delivers output on destination chain",
    explanation:
      "The recipient receives at least 99.8 USDC on Arbitrum without the user manually choosing a bridge path.",
    icon: SendToBack
  },
  {
    title: "Settlement completed",
    explanation: "The solver is settled after proving the destination-side delivery.",
    icon: ShieldCheck
  }
];

export function IntentLifecycle({ onReset }: IntentLifecycleProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(0);
    const timers = steps.map((_, index) =>
      window.setTimeout(() => setActiveStep(index), 520 + index * 820)
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  const isComplete = activeStep === steps.length - 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]"
    >
      <div className="glass rounded-lg p-5 sm:p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-aqua/25 bg-aqua/10 px-3 py-1 text-xs font-medium text-aqua">
              <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
              Intent Lifecycle
            </div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Watch the fill progress
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              A simulated lifecycle shows the handoff from user commitment to solver delivery and
              settlement.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-slate-300">
            Step <span className="font-semibold text-white">{activeStep + 1}</span> of {steps.length}
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => {
            const complete = index <= activeStep;
            const current = index === activeStep;
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0.45, x: -10 }}
                animate={{
                  opacity: complete ? 1 : 0.45,
                  x: complete ? 0 : -10,
                  scale: current ? 1.01 : 1
                }}
                transition={{ duration: 0.32 }}
                className={`rounded-lg border p-4 transition ${
                  complete
                    ? "border-aqua/24 bg-aqua/[0.065]"
                    : "border-white/10 bg-white/[0.035]"
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                      complete ? "border-aqua/35 bg-aqua/12 text-aqua" : "border-white/10 text-slate-500"
                    }`}
                  >
                    {complete ? (
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1 text-xs text-slate-300">
                        {index + 1}
                      </span>
                      <h3 className="text-base font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{step.explanation}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isComplete ? 1 : 0.5, y: isComplete ? 0 : 8 }}
          transition={{ duration: 0.4 }}
          className={`glass rounded-lg p-5 ${isComplete ? "ring-1 ring-aqua/45" : ""}`}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-aqua/30 bg-aqua/10 text-aqua">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-white">Intent Completed</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Recipient received <span className="font-semibold text-white">99.8 USDC</span> on Arbitrum.
            User only defined the outcome. Solver handled the execution path.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.07] px-4 py-3 text-sm font-semibold text-white transition hover:border-aqua/35 hover:text-aqua"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset Demo
          </button>
        </motion.div>

        <div className="glass-subtle rounded-lg p-5">
          <p className="text-sm font-medium text-white">Recording cue</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            A clean 30-60 second walkthrough: define the outcome, show solver matching, then let the
            lifecycle complete.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

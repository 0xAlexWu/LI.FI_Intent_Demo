"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy, FileCode2, Send, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { EducationCallout } from "./EducationCallout";

type IntentBuilderProps = {
  onCreateIntent: () => void;
};

const recipient = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

const intentFields = [
  { label: "From chain", value: "Base" },
  { label: "Input token", value: "USDC" },
  { label: "Amount", value: "100" },
  { label: "To chain", value: "Arbitrum" },
  { label: "Output token", value: "USDC" },
  { label: "Minimum received", value: "99.8 USDC" }
];

export function IntentBuilder({ onCreateIntent }: IntentBuilderProps) {
  const [copied, setCopied] = useState(false);

  const intentJson = useMemo(
    () =>
      JSON.stringify(
        {
          fromChain: "Base",
          inputToken: "USDC",
          amount: "100",
          toChain: "Arbitrum",
          outputToken: "USDC",
          minReceived: "99.8",
          recipient
        },
        null,
        2
      ),
    []
  );

  async function copyIntent() {
    try {
      await navigator.clipboard.writeText(intentJson);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="glass rounded-lg p-5 sm:p-6"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-lg border border-aqua/25 bg-aqua/10 px-3 py-1 text-xs font-medium text-aqua">
              Educational Demo
            </span>
            <span className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-300">
              Mocked
            </span>
            <span className="rounded-lg border border-limeglass/25 bg-limeglass/10 px-3 py-1 text-xs font-medium text-limeglass">
              No real funds
            </span>
          </div>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Intent Mesh Labs
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
            A lightweight LI.FI Intents Mini Builder Challenge demo that moves the conversation from
            route decisions to outcome definition.
          </p>
        </div>
        <div className="glass-subtle flex min-w-0 items-center gap-3 rounded-lg px-4 py-3">
          <div className="rounded-lg border border-aqua/25 bg-aqua/10 p-2 text-aqua">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Outcome first</p>
            <p className="text-xs text-slate-400">User expresses final state</p>
          </div>
        </div>
      </div>

      <div className="my-6 h-px bg-white/10" />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-5">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-aqua" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-white">Intent Builder</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {intentFields.map((field) => (
                <label
                  key={field.label}
                  className="rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3"
                >
                  <span className="block text-xs text-slate-400">{field.label}</span>
                  <span className="mt-1 block truncate text-sm font-medium text-white">
                    {field.value}
                  </span>
                </label>
              ))}
            </div>

            <label className="mt-3 block rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3">
              <span className="block text-xs text-slate-400">Recipient</span>
              <span className="mt-1 block break-all text-sm font-medium text-white">{recipient}</span>
            </label>
          </div>

          <section className="rounded-lg border border-aqua/20 bg-aqua/[0.06] p-4">
            <div className="mb-2 flex items-center gap-2">
              <Send className="h-4 w-4 text-aqua" aria-hidden="true" />
              <h3 className="text-base font-semibold text-white">Desired Outcome</h3>
            </div>
            <p className="text-sm leading-6 text-slate-200">
              Deliver at least <span className="font-semibold text-white">99.8 USDC</span> to{" "}
              <span className="font-mono text-aqua">0x742d...f44e</span> on Arbitrum.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              The user does not choose the bridge, swap path, or solver execution strategy.
            </p>
          </section>

          <EducationCallout>
            An intent describes the final state the user wants, not every execution step needed to get
            there.
          </EducationCallout>

          <button
            type="button"
            onClick={onCreateIntent}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-aqua px-5 py-3 text-sm font-semibold text-ink shadow-glow transition duration-200 hover:bg-mist sm:w-auto"
          >
            Create Intent
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>

        <div className="glass-subtle overflow-hidden rounded-lg">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <FileCode2 className="h-4 w-4 text-violetglass" aria-hidden="true" />
              <span className="text-sm font-medium text-white">Mock Intent JSON</span>
            </div>
            <button
              type="button"
              onClick={copyIntent}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-aqua/40 hover:text-aqua"
              aria-label="Copy mock intent JSON"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    Copy
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          <pre className="code-scroll max-h-[420px] overflow-auto p-4 text-xs leading-6 text-slate-200">
            <code>{intentJson}</code>
          </pre>
        </div>
      </div>
    </motion.section>
  );
}

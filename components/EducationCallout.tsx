"use client";

import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

type EducationCalloutProps = {
  children: React.ReactNode;
  tone?: "aqua" | "violet" | "lime";
};

const toneMap = {
  aqua: "border-aqua/45 bg-aqua/10 text-aqua",
  violet: "border-violetglass/45 bg-violetglass/10 text-violetglass",
  lime: "border-limeglass/45 bg-limeglass/10 text-limeglass"
};

export function EducationCallout({
  children,
  tone = "aqua"
}: EducationCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`flex gap-3 rounded-lg border-l-2 px-4 py-3 ${toneMap[tone]}`}
    >
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p className="text-sm leading-6 text-slate-200">{children}</p>
    </motion.div>
  );
}

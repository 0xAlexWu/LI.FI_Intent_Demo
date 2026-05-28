"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Check,
  Clipboard,
  Clock3,
  Languages,
  LockKeyhole,
  Play,
  RefreshCcw,
  Route,
  Send,
  TimerReset,
  Zap
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Locale = "zh" | "en";

type Field = {
  zh: string;
  en: string;
  value: string;
};

type FlowStep = {
  titleZh: string;
  titleEn: string;
  shortZh: string;
  shortEn: string;
  actionZh: string;
  actionEn: string;
  detailZh: string;
  detailEn: string;
  ctaZh: string;
  ctaEn: string;
  fields: Field[];
  promptZh: string;
  promptEn: string;
  logZh: string;
  logEn: string;
};

const afterSteps: FlowStep[] = [
  {
    titleZh: "锁定目标，一步到位",
    titleEn: "Define outcome",
    shortZh: "目标",
    shortEn: "Outcome",
    actionZh: "用户只填写最终到账要求。",
    actionEn: "The user only enters the final state they want.",
    detailZh: "向 Arbitrum 上的 0x742d...f44e 交付至少 99.8 USDC。",
    detailEn: "Deliver at least 99.8 USDC to 0x742d...f44e on Arbitrum.",
    ctaZh: "确认结果",
    ctaEn: "Confirm outcome",
    fields: [
      { zh: "源链", en: "From chain", value: "Base" },
      { zh: "输入", en: "Input", value: "100 USDC" },
      { zh: "目标链", en: "To chain", value: "Arbitrum" },
      { zh: "最少到账", en: "Minimum", value: "99.8 USDC" }
    ],
    promptZh: "没有桥选择，没有路径选择，没有 gas 策略选择。",
    promptEn: "No bridge selection, no path selection, no gas strategy choice.",
    logZh: "到账目标已确认。",
    logEn: "Desired outcome captured."
  },
  {
    titleZh: "提交意图",
    titleEn: "Create intent",
    shortZh: "意图",
    shortEn: "Intent",
    actionZh: "用户确认意图，输入资产在源链被锁定。",
    actionEn: "The user confirms the intent and locks input on the source chain.",
    detailZh: "订单被发送到 order server，等待求解器评估。",
    detailEn: "The order is sent to an order server for solvers to evaluate.",
    ctaZh: "创建意图",
    ctaEn: "Create intent",
    fields: [
      { zh: "锁定资产", en: "Locked asset", value: "100 USDC" },
      { zh: "源链", en: "Source", value: "Base" },
      { zh: "订单", en: "Order", value: "Mock intent #4821" },
      { zh: "资金风险", en: "Funds", value: "No real funds" }
    ],
    promptZh: "钱包只确认用户愿意提交这个结果意图。",
    promptEn: "The wallet only confirms the user's desired outcome intent.",
    logZh: "意图已广播给可用求解器。",
    logEn: "Intent broadcast to available solvers."
  },
  {
    titleZh: "匹配求解器",
    titleEn: "Match solver",
    shortZh: "匹配",
    shortEn: "Solver",
    actionZh: "系统根据库存、速度、费用和执行质量选择 Solver A。",
    actionEn: "The system selects Solver A by inventory, speed, fee, and execution quality.",
    detailZh: "用户不需要比较桥、DEX 或中间路径。",
    detailEn: "The user does not compare bridges, DEXs, or intermediate paths.",
    ctaZh: "接受匹配",
    ctaEn: "Accept match",
    fields: [
      { zh: "求解器", en: "Solver", value: "Solver A" },
      { zh: "库存", en: "Inventory", value: "Base / Arbitrum USDC" },
      { zh: "预计交付", en: "Delivery", value: "12s" },
      { zh: "费用", en: "Fee", value: "0.12 USDC" }
    ],
    promptZh: "匹配逻辑处理价格、速度和库存质量。",
    promptEn: "Matching logic handles price, speed, and inventory quality.",
    logZh: "Solver A 被选中：最快可用交付。",
    logEn: "Solver A selected: fastest available fill."
  },
  {
    titleZh: "收款人到账",
    titleEn: "Deliver output",
    shortZh: "到账",
    shortEn: "Delivery",
    actionZh: "求解器在目标链直接向收款人交付输出资产。",
    actionEn: "The solver delivers the output asset directly to the recipient on the destination chain.",
    detailZh: "收款人收到至少 99.8 USDC，用户没有手动选择桥路径。",
    detailEn: "The recipient receives at least 99.8 USDC without the user choosing a bridge path.",
    ctaZh: "模拟交付",
    ctaEn: "Simulate delivery",
    fields: [
      { zh: "目标链", en: "Destination", value: "Arbitrum" },
      { zh: "收款人", en: "Recipient", value: "0x742d...f44e" },
      { zh: "输出", en: "Output", value: "99.8 USDC" },
      { zh: "交易", en: "Tx", value: "0xintent...9a1" }
    ],
    promptZh: "执行路径由求解器处理，对用户隐藏。",
    promptEn: "The execution path is handled by the solver and hidden from the user.",
    logZh: "目标链交付完成。",
    logEn: "Destination-side delivery completed."
  },
  {
    titleZh: "完成结算",
    titleEn: "Settlement",
    shortZh: "结算",
    shortEn: "Settle",
    actionZh: "求解器证明目标链交付后完成结算。",
    actionEn: "The solver is settled after proving destination-side delivery.",
    detailZh: "用户只定义结果，求解器处理执行路径。",
    detailEn: "The user defined the outcome; the solver handled execution.",
    ctaZh: "完成",
    ctaEn: "Complete",
    fields: [
      { zh: "证明", en: "Proof", value: "Delivery verified" },
      { zh: "到账", en: "Received", value: "99.8 USDC" },
      { zh: "状态", en: "Status", value: "Completed" },
      { zh: "模式", en: "Mode", value: "Educational mock" }
    ],
    promptZh: "这是教育 demo，没有真实交易或真实资金移动。",
    promptEn: "This is an educational demo with no real transaction or fund movement.",
    logZh: "意图完成。",
    logEn: "Intent completed."
  }
];

const beforeSteps: FlowStep[] = [
  {
    titleZh: "选择桥接方案",
    titleEn: "Select bridge",
    shortZh: "选桥",
    shortEn: "Bridge",
    actionZh: "用户打开桥选择器，比较 Bridge X、Bridge Y 和聚合路线报价。",
    actionEn: "The user opens a bridge selector and compares Bridge X, Bridge Y, and aggregator quotes.",
    detailZh: "需要判断哪条路线能把 100 USDC 从 Base 送到 Arbitrum。",
    detailEn: "They must decide which path can move 100 USDC from Base to Arbitrum.",
    ctaZh: "选择 Bridge X",
    ctaEn: "Select Bridge X",
    fields: [
      { zh: "源链", en: "Source", value: "Base" },
      { zh: "目标链", en: "Destination", value: "Arbitrum" },
      { zh: "候选路径", en: "Candidate path", value: "Base -> Ethereum -> Arbitrum" },
      { zh: "预计时间", en: "ETA", value: "18-34s" }
    ],
    promptZh: "还没有交易，用户仍在人工判断路线。",
    promptEn: "No transaction yet. The user is still judging the route.",
    logZh: "打开桥列表，人工比较报价。",
    logEn: "Opened bridge list and compared quotes manually."
  },
  {
    titleZh: "检查流动性",
    titleEn: "Check liquidity",
    shortZh: "查池",
    shortEn: "Liquidity",
    actionZh: "用户查看源链和目标链池子，确认 USDC / USDC.e 是否足够。",
    actionEn: "The user checks source and destination pools to confirm USDC / USDC.e liquidity.",
    detailZh: "如果目标链库存不足，最终到账可能低于 99.8 USDC。",
    detailEn: "If destination inventory is thin, the output may fall below 99.8 USDC.",
    ctaZh: "确认流动性",
    ctaEn: "Confirm liquidity",
    fields: [
      { zh: "Base USDC", en: "Base USDC", value: "215,420 available" },
      { zh: "Arbitrum USDC", en: "Arbitrum USDC", value: "47,610 available" },
      { zh: "最大滑点", en: "Max slippage", value: "0.20%" },
      { zh: "最少到账", en: "Minimum out", value: "99.72-99.91 USDC" }
    ],
    promptZh: "用户需要自己理解滑点和池子深度。",
    promptEn: "The user has to understand slippage and pool depth.",
    logZh: "检查池子深度和最少到账。",
    logEn: "Checked pool depth and minimum received."
  },
  {
    titleZh: "授权代币",
    titleEn: "Approve token",
    shortZh: "授权",
    shortEn: "Approve",
    actionZh: "用户在钱包里单独授权 100 USDC 给桥合约。",
    actionEn: "The user separately approves 100 USDC to the bridge contract in the wallet.",
    detailZh: "这不是最终转账，只是额外授权步骤。",
    detailEn: "This is not the final transfer, only an extra approval step.",
    ctaZh: "签名 Approve",
    ctaEn: "Sign Approve",
    fields: [
      { zh: "授权资产", en: "Token", value: "USDC" },
      { zh: "授权额度", en: "Allowance", value: "100 USDC" },
      { zh: "合约", en: "Spender", value: "0xBridge...A91" },
      { zh: "Gas", en: "Gas", value: "0.00011 ETH" }
    ],
    promptZh: "钱包弹窗：Approve USDC spending on Base。",
    promptEn: "Wallet prompt: Approve USDC spending on Base.",
    logZh: "等待授权交易确认。",
    logEn: "Waiting for approval confirmation."
  },
  {
    titleZh: "发起桥接",
    titleEn: "Bridge assets",
    shortZh: "桥接",
    shortEn: "Bridge",
    actionZh: "用户提交桥接交易，把 100 USDC 送入桥接路径。",
    actionEn: "The user submits the bridge transaction and sends 100 USDC into the bridge path.",
    detailZh: "用户仍要追踪源链交易、桥状态和目标链到账。",
    detailEn: "The user still tracks source transaction, bridge state, and destination delivery.",
    ctaZh: "提交桥接",
    ctaEn: "Submit bridge",
    fields: [
      { zh: "源链 Tx", en: "Source tx", value: "0xb41...93e" },
      { zh: "桥接金额", en: "Bridge amount", value: "100 USDC" },
      { zh: "桥接费", en: "Bridge fee", value: "0.14 USDC" },
      { zh: "状态", en: "Status", value: "Broadcasting" }
    ],
    promptZh: "钱包弹窗：Bridge 100 USDC from Base。",
    promptEn: "Wallet prompt: Bridge 100 USDC from Base.",
    logZh: "源链交易已广播，等待桥服务处理。",
    logEn: "Source transaction broadcast; waiting for bridge processing."
  },
  {
    titleZh: "等待确认",
    titleEn: "Wait confirmation",
    shortZh: "等待",
    shortEn: "Wait",
    actionZh: "用户刷新桥状态页面，看确认数和中间消息。",
    actionEn: "The user refreshes the bridge status page and watches confirmations.",
    detailZh: "用户不知道问题出在源链、桥服务还是目标链。",
    detailEn: "The user has to infer whether the source, bridge service, or destination is slow.",
    ctaZh: "刷新状态",
    ctaEn: "Refresh status",
    fields: [
      { zh: "确认数", en: "Confirmations", value: "7 / 12" },
      { zh: "桥状态", en: "Bridge status", value: "Relaying" },
      { zh: "目标链 Tx", en: "Destination tx", value: "Pending" },
      { zh: "预计剩余", en: "Remaining", value: "12-18s" }
    ],
    promptZh: "无钱包弹窗，但用户持续等待和刷新。",
    promptEn: "No wallet prompt, but the user keeps waiting and refreshing.",
    logZh: "桥接中，用户监控确认数。",
    logEn: "Bridge in progress; user monitors confirmations."
  },
  {
    titleZh: "兑换资产",
    titleEn: "Swap if needed",
    shortZh: "兑换",
    shortEn: "Swap",
    actionZh: "目标链收到的可能是 USDC.e，用户还要选择 DEX 兑换成 USDC。",
    actionEn: "The destination may receive USDC.e, so the user chooses a DEX to swap into USDC.",
    detailZh: "这一步又引入价格影响、滑点设置、DEX 路由和第二次签名。",
    detailEn: "This adds price impact, slippage settings, DEX routing, and another signature.",
    ctaZh: "兑换为 USDC",
    ctaEn: "Swap to USDC",
    fields: [
      { zh: "收到资产", en: "Received asset", value: "99.92 USDC.e" },
      { zh: "DEX", en: "DEX", value: "Pool V3" },
      { zh: "价格影响", en: "Price impact", value: "0.04%" },
      { zh: "兑换后", en: "After swap", value: "99.84 USDC" }
    ],
    promptZh: "钱包弹窗：Swap USDC.e to USDC on Arbitrum。",
    promptEn: "Wallet prompt: Swap USDC.e to USDC on Arbitrum.",
    logZh: "检测到资产包装差异，准备兑换。",
    logEn: "Wrapped asset mismatch detected; preparing swap."
  },
  {
    titleZh: "处理 Gas",
    titleEn: "Manage gas",
    shortZh: "Gas",
    shortEn: "Gas",
    actionZh: "用户发现目标链还需要 ETH 才能完成最终发送。",
    actionEn: "The user discovers ETH is still needed on the destination chain to complete the final send.",
    detailZh: "如果钱包没有 Arbitrum ETH，用户要再找 gas top-up。",
    detailEn: "If the wallet has no Arbitrum ETH, the user needs a gas top-up.",
    ctaZh: "补充 Gas",
    ctaEn: "Top up gas",
    fields: [
      { zh: "当前 Gas", en: "Current gas", value: "0.00003 ETH" },
      { zh: "需要", en: "Required", value: "0.00009 ETH" },
      { zh: "补充方式", en: "Top-up", value: "Gas station" },
      { zh: "额外等待", en: "Extra wait", value: "4-9s" }
    ],
    promptZh: "钱包弹窗：Top up gas on Arbitrum。",
    promptEn: "Wallet prompt: Top up gas on Arbitrum.",
    logZh: "目标链 gas 不足，用户处理中。",
    logEn: "Destination gas is insufficient; user resolves it."
  },
  {
    titleZh: "发送给收款人",
    titleEn: "Send to recipient",
    shortZh: "发送",
    shortEn: "Send",
    actionZh: "用户手动填写收款地址，发起最后一笔 Arbitrum 转账。",
    actionEn: "The user manually enters the recipient and sends the final Arbitrum transfer.",
    detailZh: "这一步完成后，收款人才拿到资金。",
    detailEn: "Only after this step does the recipient receive funds.",
    ctaZh: "发送 99.8 USDC",
    ctaEn: "Send 99.8 USDC",
    fields: [
      { zh: "收款人", en: "Recipient", value: "0x742d...f44e" },
      { zh: "发送资产", en: "Send token", value: "USDC" },
      { zh: "发送金额", en: "Amount", value: "99.8" },
      { zh: "最终 Tx", en: "Final tx", value: "0x8c2...6ad" }
    ],
    promptZh: "钱包弹窗：Send USDC to recipient on Arbitrum。",
    promptEn: "Wallet prompt: Send USDC to recipient on Arbitrum.",
    logZh: "最终转账完成，收款人到账。",
    logEn: "Final transfer completed; recipient receives funds."
  }
];

const afterDuration = 4.2;
const beforeDuration = 31.6;
const afterRuntimeMs = 4200;
const beforeRuntimeMs = 8600;
const beforeMap = [0, 2, 4, 6, 7];

const celebrationPieces = Array.from({ length: 34 }, (_, index) => {
  const angle = -154 + index * (128 / 33);
  const distance = 150 + (index % 6) * 18;
  const drift = index % 2 === 0 ? -18 : 18;
  const colors = ["#34d399", "#67e8f9", "#f6d365", "#a7f3d0", "#93c5fd"];

  return {
    angle,
    distance,
    drift,
    delay: (index % 7) * 0.055,
    color: colors[index % colors.length],
    width: 4 + (index % 3),
    height: 14 + (index % 4) * 4,
    rotate: index * 23
  };
});

function primaryText(locale: Locale, zh: string, en: string) {
  return locale === "zh" ? zh : en;
}

function secondaryText(locale: Locale, zh: string, en: string) {
  return locale === "zh" ? en : zh;
}

function formatTime(value: number) {
  return `${value.toFixed(1)}s`;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [running, setRunning] = useState(false);
  const [afterIndex, setAfterIndex] = useState(-1);
  const [beforeIndex, setBeforeIndex] = useState(-1);
  const [afterProgress, setAfterProgress] = useState(0);
  const [beforeProgress, setBeforeProgress] = useState(0);
  const [afterComplete, setAfterComplete] = useState(false);
  const [beforeComplete, setBeforeComplete] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const afterElapsed = afterComplete ? afterDuration : Math.max(0, afterProgress * afterDuration);
  const beforeElapsed = beforeComplete
    ? beforeDuration
    : Math.max(0, beforeProgress * beforeDuration);

  const comparisonCopy = useMemo(
    () => ({
      zh: "左右使用同一套结构：流程、当前动作、参数、提示和日志都在同一位置。左边把执行细节收进意图，右边把每个细节都交给用户。",
      en: "Both sides now use the same layout: flow rail, current action, parameters, prompt, and log are aligned. The difference is the amount of work the user must do."
    }),
    []
  );

  function resetDemo() {
    setRunning(false);
    setAfterIndex(-1);
    setBeforeIndex(-1);
    setAfterProgress(0);
    setBeforeProgress(0);
    setAfterComplete(false);
    setBeforeComplete(false);
    setShowFireworks(false);
  }

  function runAuto() {
    resetDemo();
    window.setTimeout(() => setRunning(true), 80);
  }

  function advanceAfter() {
    if (afterComplete || running) return;

    const next = Math.min(afterSteps.length - 1, afterIndex + 1);
    const mappedBefore = beforeMap[next];
    setAfterIndex(next);
    setAfterProgress((next + 1) / afterSteps.length);
    setBeforeIndex(mappedBefore);
    setBeforeProgress((mappedBefore + 1) / beforeSteps.length);

    if (next === afterSteps.length - 1) {
      setAfterComplete(true);
      setBeforeComplete(true);
    }
  }

  useEffect(() => {
    if (!running) return;

    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const nextAfterProgress = Math.min(1, elapsed / afterRuntimeMs);
      const nextBeforeProgress = Math.min(1, elapsed / beforeRuntimeMs);

      setAfterProgress(nextAfterProgress);
      setBeforeProgress(nextBeforeProgress);
      setAfterIndex(Math.min(afterSteps.length - 1, Math.floor(nextAfterProgress * afterSteps.length)));
      setBeforeIndex(
        Math.min(beforeSteps.length - 1, Math.floor(nextBeforeProgress * beforeSteps.length))
      );
      setAfterComplete(nextAfterProgress >= 1);
      setBeforeComplete(nextBeforeProgress >= 1);

      if (nextBeforeProgress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setRunning(false);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  useEffect(() => {
    if (!afterComplete) {
      setShowFireworks(false);
      return;
    }

    setShowFireworks(true);
    const timer = window.setTimeout(() => setShowFireworks(false), 3800);

    return () => window.clearTimeout(timer);
  }, [afterComplete]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7fbf7] text-slate-950">
      <div className="ink-wash ink-wash-one" aria-hidden="true" />
      <div className="ink-wash ink-wash-two" aria-hidden="true" />
      <div className="absolute inset-0 bg-paper-grid" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-4 flex items-center justify-between gap-4 rounded-lg border border-slate-200/80 bg-white/76 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-950 shadow-[0_14px_34px_rgba(15,23,42,0.22)]">
              <Image
                src="/intent-logo.png"
                alt=""
                className="h-full w-full object-cover"
                width={44}
                height={44}
              />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#ccff58] shadow-[0_0_18px_rgba(204,255,88,0.9)]" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950">Intent Mesh Labs</p>
              <p className="truncate text-xs font-medium text-slate-500">
                {primaryText(locale, "从路线选择到结果表达", "From routes to outcomes")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
              className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 sm:inline-flex"
            >
              <Languages className="h-4 w-4" aria-hidden="true" />
              {locale === "zh" ? "中 / EN" : "EN / 中"}
            </button>
            <button
              type="button"
              onClick={resetDemo}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
            >
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{primaryText(locale, "重置", "Reset")}</span>
            </button>
            <button
              type="button"
              onClick={runAuto}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_45px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              {primaryText(locale, "自动执行", "Auto Execute")}
            </button>
          </div>
        </header>

        <section className="mb-4 grid flex-1 gap-4 lg:grid-cols-2">
          <ComparisonPanel
            variant="after"
            locale={locale}
            eyebrow="AFTER / Intent UX"
            titleZh="锁定目标，一步到位"
            titleEn="Specify one outcome"
            subtitleZh="只说明收款人最终应收到什么。"
            subtitleEn="The user only handles outcome expression."
            steps={afterSteps}
            activeIndex={afterIndex}
            progress={afterProgress}
            elapsed={afterElapsed}
            complete={afterComplete}
            durationLabel={formatTime(afterDuration)}
            onStep={advanceAfter}
            running={running}
            fireworkActive={showFireworks}
          />

          <ComparisonPanel
            variant="before"
            locale={locale}
            eyebrow="BEFORE / Route UX"
            titleZh="手动跨链，操作繁琐"
            titleEn="Operate the route manually"
            subtitleZh="桥、授权、等待、兑换和 Gas 都要自己处理。"
            subtitleEn="The user handles every execution detail."
            steps={beforeSteps}
            activeIndex={beforeIndex}
            progress={beforeProgress}
            elapsed={beforeElapsed}
            complete={beforeComplete}
            durationLabel={formatTime(beforeDuration)}
            running={running}
            fireworkActive={false}
          />
        </section>

        <section className="grid gap-4 rounded-lg border border-slate-200/80 bg-white/76 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              {primaryText(locale, "一眼看懂的对比", "Aligned Comparison")}
            </div>
            <h2 className="text-2xl font-semibold text-slate-950">
              {primaryText(locale, "同一个目标，两种工作量。", "Same goal, aligned positions.")}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {primaryText(locale, comparisonCopy.zh, comparisonCopy.en)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              label={primaryText(locale, "意图式", "Intent-based")}
              value={formatTime(afterDuration)}
              tone="emerald"
              caption={primaryText(locale, "5 个抽象步骤", "5 abstracted steps")}
            />
            <MetricCard
              label={primaryText(locale, "路线式", "Route-based")}
              value={formatTime(beforeDuration)}
              tone="slate"
              caption={primaryText(locale, "8 个手动步骤", "8 manual steps")}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function ComparisonPanel({
  variant,
  locale,
  eyebrow,
  titleZh,
  titleEn,
  subtitleZh,
  subtitleEn,
  steps,
  activeIndex,
  progress,
  elapsed,
  complete,
  durationLabel,
  onStep,
  running,
  fireworkActive
}: {
  variant: "after" | "before";
  locale: Locale;
  eyebrow: string;
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  subtitleEn: string;
  steps: FlowStep[];
  activeIndex: number;
  progress: number;
  elapsed: number;
  complete: boolean;
  durationLabel: string;
  onStep?: () => void;
  running: boolean;
  fireworkActive: boolean;
}) {
  const isAfter = variant === "after";
  const safeIndex = Math.max(0, activeIndex);
  const step = steps[safeIndex];
  const logs = activeIndex >= 0 ? steps.slice(0, safeIndex + 1) : [];
  const railTitle = isAfter
    ? primaryText(locale, "意图流程", "Intent flow")
    : primaryText(locale, "旧负担流程", "Legacy burden flow");

  return (
    <motion.article
      animate={{
        filter: !isAfter && complete ? "grayscale(0.84)" : "grayscale(0)",
        opacity: !isAfter && complete ? 0.86 : 1
      }}
      transition={{ duration: 0.5 }}
      className={`panel-light relative flex min-h-[760px] flex-col overflow-hidden rounded-lg border p-4 shadow-[0_22px_80px_rgba(71,85,105,0.12)] backdrop-blur-2xl ${
        isAfter ? "border-emerald-200/80 bg-white/82" : "border-slate-200 bg-white/76"
      }`}
    >
      <div
        className={`panel-overlay left-0 top-0 h-1 w-full ${
          isAfter
            ? "bg-gradient-to-r from-[#37f5cc] via-[#c8ff52] to-[#42b4ff]"
            : "bg-gradient-to-r from-slate-300 via-fuchsia-300 to-slate-300"
        }`}
      />
      {isAfter && fireworkActive ? <Fireworks /> : null}
      {isAfter && complete && !fireworkActive ? <ShineSweep /> : null}

      <div className="grid min-h-[128px] grid-cols-[1fr_auto] gap-4">
        <div>
          <div
            className={`mb-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-bold ${
              isAfter
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-slate-100 text-slate-600"
            }`}
          >
            {isAfter ? <Zap className="h-3.5 w-3.5" /> : <Route className="h-3.5 w-3.5" />}
            {eyebrow}
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            {primaryText(locale, titleZh, titleEn)}
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            {primaryText(locale, subtitleZh, subtitleEn)}
          </p>
        </div>

        <div
          className={`h-fit rounded-lg border px-4 py-3 text-right ${
            isAfter ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-100"
          }`}
        >
          <p className={`text-xs font-bold uppercase ${isAfter ? "text-emerald-700" : "text-slate-500"}`}>
            {complete ? primaryText(locale, "已完成", "Completed") : primaryText(locale, "模拟耗时", "Sim time")}
          </p>
          <p className="mt-1 text-3xl font-semibold text-slate-950">{formatTime(elapsed)}</p>
          <p className="mt-1 text-[11px] font-semibold text-slate-400">
            {primaryText(locale, `基准 ${durationLabel}`, `target ${durationLabel}`)}
          </p>
        </div>
      </div>

      <section className="mt-4 rounded-lg border border-slate-200 bg-slate-50/78 p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <TimerReset className={`h-4 w-4 ${isAfter ? "text-emerald-500" : "text-fuchsia-500"}`} />
            {railTitle}
          </div>
          <span className="rounded-lg border border-white bg-white px-2 py-1 text-xs font-bold text-slate-500">
            {primaryText(locale, `${steps.length} 步`, `${steps.length} steps`)}
          </span>
        </div>
        <NeonRail progress={progress} color={isAfter ? "emerald" : "fuchsia"} segmented={!isAfter} />
        <StepStrip steps={steps} activeIndex={activeIndex} locale={locale} />
      </section>

      <section className="mt-4 grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className={`text-xs font-bold uppercase ${isAfter ? "text-emerald-600" : "text-fuchsia-600"}`}>
                {primaryText(locale, `第 ${safeIndex + 1} / ${steps.length} 步`, `Step ${safeIndex + 1} / ${steps.length}`)}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">
                {primaryText(locale, step.titleZh, step.titleEn)}
              </h2>
            </div>
            <span
              className={`rounded-lg px-2 py-1 text-xs font-bold ${
                activeIndex >= 0
                  ? isAfter
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-fuchsia-100 text-fuchsia-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {complete
                ? primaryText(locale, "完成", "Done")
                : activeIndex >= 0
                  ? primaryText(locale, "进行中", "Active")
                  : primaryText(locale, "待开始", "Ready")}
            </span>
          </div>

          <div className="min-h-[104px]">
            <p className="text-sm leading-6 text-slate-700">
              {primaryText(locale, step.actionZh, step.actionEn)}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {primaryText(locale, step.detailZh, step.detailEn)}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {step.fields.map((field) => (
              <div key={`${field.en}-${field.value}`} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  {primaryText(locale, field.zh, field.en)}
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-slate-950">{field.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950 p-3 text-white shadow-inner">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-200">
              {isAfter ? <Send className="h-3.5 w-3.5" /> : <LockKeyhole className="h-3.5 w-3.5" />}
              {isAfter
                ? primaryText(locale, "系统提示", "System Prompt")
                : primaryText(locale, "钱包 / 页面提示", "Wallet / UI Prompt")}
            </div>
            <p className="text-xs leading-5 text-slate-200">
              {primaryText(locale, step.promptZh, step.promptEn)}
            </p>
          </div>

          <button
            type="button"
            onClick={onStep}
            disabled={!onStep || running || complete}
            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white shadow-[0_14px_35px_rgba(15,23,42,0.16)] transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 ${
              isAfter ? "bg-emerald-500 enabled:hover:bg-emerald-400" : "bg-fuchsia-500"
            }`}
          >
            {complete ? (
              <>
                <Check className="h-4 w-4" />
                {primaryText(locale, "已完成", "Completed")}
              </>
            ) : (
              <>
                <Clipboard className="h-4 w-4" />
                {primaryText(locale, step.ctaZh, step.ctaEn)}
              </>
            )}
          </button>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase text-slate-400">
              {primaryText(locale, "执行日志", "Execution Log")}
            </p>
            <p className="text-xs font-semibold text-slate-500">
              {Math.max(0, activeIndex + 1)}/{steps.length}
            </p>
          </div>

          <div className="space-y-2">
            {logs.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-xs leading-5 text-slate-500">
                {primaryText(locale, "等待开始。", "Waiting to start.")}
              </div>
            ) : (
              logs.slice(-5).map((item, index) => (
                <motion.div
                  key={`${item.titleEn}-${index}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                      isAfter ? "bg-emerald-500" : "bg-fuchsia-500"
                    }`}
                  >
                    {Math.max(1, safeIndex - logs.slice(-5).length + index + 2)}
                  </span>
                  <p className="text-xs leading-5 text-slate-600">
                    {primaryText(locale, item.logZh, item.logEn)}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </motion.article>
  );
}

function Fireworks() {
  return (
    <div className="panel-overlay pointer-events-none inset-0 z-30 overflow-hidden" data-fireworks="true">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.64, 0.38, 0] }}
        transition={{ duration: 3.2, times: [0, 0.12, 0.72, 1] }}
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.42),rgba(167,243,208,0.16)_38%,transparent_70%)]"
      />

      {celebrationPieces.map((piece, index) => {
        const radians = (piece.angle * Math.PI) / 180;
        const x = Math.cos(radians) * piece.distance + piece.drift;
        const y = Math.sin(radians) * piece.distance + 82;

        return (
          <motion.span
            key={index}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              rotate: piece.rotate,
              scale: 0.78
            }}
            animate={{
              x,
              y,
              opacity: [0, 1, 0.95, 0],
              rotate: piece.rotate + 220,
              scale: [0.78, 1, 0.94, 0.8]
            }}
            transition={{
              delay: piece.delay,
              duration: 2.45,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute left-1/2 top-[28%] rounded-full shadow-[0_0_12px_currentColor]"
            style={{
              width: piece.width,
              height: piece.height,
              color: piece.color,
              backgroundColor: piece.color
            }}
          />
        );
      })}

      {Array.from({ length: 8 }).map((_, index) => (
        <motion.span
          key={`spark-${index}`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.95, 0],
            scale: [0.4, 1.15, 0.4],
            y: [0, -18, -28]
          }}
          transition={{ delay: 0.2 + index * 0.16, duration: 1.6, ease: "easeOut" }}
          className="absolute top-[18%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]"
          style={{ left: `${30 + index * 6}%` }}
        />
      ))}
    </div>
  );
}

function ShineSweep() {
  return (
    <div className="panel-overlay pointer-events-none inset-0 z-20 overflow-hidden rounded-lg" data-shine="true">
      <motion.div
        animate={{
          x: ["-110%", "132%"],
          y: ["-82%", "88%"],
          opacity: [0, 0.78, 0]
        }}
        transition={{ repeat: Infinity, duration: 2.35, ease: "linear", times: [0, 0.48, 1] }}
        className="absolute -left-1/3 -top-1/3 h-[170%] w-1/2 -rotate-45 bg-gradient-to-r from-transparent via-white/72 to-transparent blur-sm"
      />
      <motion.div
        animate={{
          x: ["-122%", "128%"],
          y: ["-92%", "82%"],
          opacity: [0, 0.34, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.35,
          ease: "linear",
          times: [0, 0.48, 1],
          delay: 1.15
        }}
        className="absolute -left-1/3 -top-1/3 h-[170%] w-1/3 -rotate-45 bg-gradient-to-r from-transparent via-emerald-100/80 to-transparent blur-md"
      />
      <motion.div
        animate={{ opacity: [0.26, 0.46, 0.26] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
        className="absolute inset-0 rounded-lg ring-2 ring-emerald-300/50"
      />
    </div>
  );
}

function NeonRail({
  progress,
  color,
  segmented = false
}: {
  progress: number;
  color: "emerald" | "fuchsia";
  segmented?: boolean;
}) {
  const fill =
    color === "emerald"
      ? "from-[#36f5cc] via-[#caff5b] to-[#42b4ff]"
      : "from-[#a7a7b6] via-[#f071ff] to-[#c6c6d1]";

  return (
    <div className="relative h-4 overflow-hidden rounded-lg border border-white bg-slate-950/90 p-1 shadow-inner">
      {segmented ? (
        <div className="absolute inset-1 grid grid-cols-8 gap-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="rounded bg-white/10" />
          ))}
        </div>
      ) : null}
      <motion.div
        animate={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
        transition={{ duration: 0.28 }}
        className={`relative z-10 h-full rounded bg-gradient-to-r ${fill} shadow-[0_0_22px_rgba(94,242,210,0.75)]`}
      />
      <motion.div
        animate={{ x: ["-15%", "115%"] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
        className="absolute inset-y-1 z-20 w-20 rounded bg-white/35 blur-md"
      />
    </div>
  );
}

function StepStrip({
  steps,
  activeIndex,
  locale
}: {
  steps: FlowStep[];
  activeIndex: number;
  locale: Locale;
}) {
  return (
    <div className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((step, index) => {
        const active = index <= activeIndex;
        return (
          <div
            key={step.titleEn}
            className={`flex min-h-14 min-w-0 flex-col items-center justify-center rounded-lg border px-1.5 py-2 text-center text-[11px] font-semibold leading-4 ${
              active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            <div className="mb-1 flex items-center justify-center gap-1">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${
                  active ? "bg-[#5ef2d2] text-slate-950" : "bg-slate-100 text-slate-400"
                }`}
              >
                {index + 1}
              </span>
              <span className="whitespace-nowrap">{primaryText(locale, step.shortZh, step.shortEn)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MetricCard({
  label,
  value,
  caption,
  tone
}: {
  label: string;
  value: string;
  caption: string;
  tone: "emerald" | "slate";
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        tone === "emerald"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-slate-200 bg-slate-100 text-slate-700"
      }`}
    >
      <p className="text-xs font-bold uppercase">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-semibold">{caption}</p>
    </div>
  );
}

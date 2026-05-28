# Intent Mesh Labs — From Routes to Outcomes

A polished, lightweight developer education demo for the LI.FI Intents Mini Builder Challenge.

This demo illustrates the shift from route-based cross-chain UX to outcome-based intent UX. Instead of asking users to choose bridges, paths, and execution details, an intent lets the user define the final result they want. Solvers then compete or are matched to fulfill that result using inventory, liquidity sources, and execution logic.

## What This Demo Shows

- A user defines a desired cross-chain outcome.
- Mocked solvers compete or are matched to fulfill the intent.
- A simulated lifecycle animates from source-chain input lock to destination delivery and settlement.
- The interface makes clear that the user defines the outcome, while solvers handle execution details.

Example outcome:

```text
Deliver at least 99.8 USDC to 0x742d...f44e on Arbitrum.
```

## Why Intent-Based UX Matters

Traditional cross-chain flows often ask users to make infrastructure decisions: which bridge to use, whether liquidity exists, what gas is required, whether a swap is needed, and how to time each confirmation.

Intent-based UX reframes the interaction. The user states the final state they want. Solvers can then compete or be matched based on inventory, speed, price, and execution quality. For many users and developers, this turns a complex transaction path into a clearer checkout-like experience.

## What Is Mocked

This is an educational demo, not a production LI.FI integration.

- Solver inventory is mocked locally.
- Solver fees and delivery estimates are mocked locally.
- The intent lifecycle is simulated in React state.
- No wallet connection is required.
- No external API calls are made.
- No real transaction is created, signed, submitted, or settled.
- No real funds move.

## How To Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Project Structure

```text
app/page.tsx
components/IntentBuilder.tsx
components/SolverMatching.tsx
components/IntentLifecycle.tsx
components/BeforeAfter.tsx
components/EducationCallout.tsx
```

## Record This Flow

Suggested 30-60 second screen recording angle:

1. Open on the Intent Builder and say: "Traditional cross-chain UX asks users to choose routes. LI.FI Intents lets users express outcomes."
2. Show the Desired Outcome card: "The user only says what should arrive, where, and the minimum amount."
3. Click **Create Intent** and show solver matching: "Solvers are evaluated on inventory, speed, fees, and execution quality."
4. Click **Simulate Fill** and let the timeline complete: "The recipient receives the output while the solver handles execution."
5. End on the success card: "The product surface becomes outcome-first instead of route-first."

Suggested X post:

```text
Built a tiny LI.FI Intents demo for the Mini Builder Challenge:

Instead of choosing bridges, swaps, gas strategy, and paths, the user defines the final outcome:

"Deliver at least 99.8 USDC to this recipient on Arbitrum."

Mock solvers compete, the lifecycle is simulated, and the UI shows how intents turn cross-chain UX into a checkout-style flow.
```

## Disclaimer

This project is an educational demo for the LI.FI Intents Mini Builder Challenge. It is not a production bridge, not a wallet integration, and not a production LI.FI Intents integration. All solver data and lifecycle events are mocked locally for learning and presentation purposes.

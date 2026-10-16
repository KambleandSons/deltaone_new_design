# Delta One Back Office — React + Tailwind CSS

This is the complete React (JavaScript) + Tailwind CSS implementation of the Delta One customer and Ambassador back office handoff, transformed from the prototype codebase.

## 🚀 Key Features Converted

- **All 22 Screens in React**:
  - **Customer side**:
    - Dashboard (Live rewards clock, speed gauge needle, ring countdown to 16:00 Dubai, 4 totals, results panel with past 7 days bars, active modules with dual progress meters, founder video/flyer message)
    - Purchase a Module (3-step checkout, $1,000/$5,000/$10,000 chips, wallet deduction priority, 2.0x/2.2x illustration)
    - Module Booster (Reel spinning with ?, Δ, ★, ⚡, ✦, odds distribution, jackpot fanfare & confetti, 10-minute timer, top-up selection)
    - My Modules (All / Active / Completed filters, dual progress meters, finish estimates at 7d / 30d / 0.50% plan, auto-rebuy toggle)
    - Founder Seats (6 tiers: Sherpa, Mountaineer, Trailblazer, Pathfinder, Pioneer, Guide; immutable register seats count and share %)
    - Balances (4 non-merging buckets: Purchase Wallet, Rewards Wallet, Matrix Rewards, Active Modules)
    - Module Management (was AUM: 4 KPI totals, search/filters, full interactive table with days left)
    - Withdraw (USDT BEP-20 address, 25%/50%/75%/Max chips, minimum 5 USDT check, after balance calculation)
    - Account (Profile with rank bolt, Sign-in methods, Payout address, Display & Bolt toggles, Notifications switches, Security)
    - Activity (Filters, 5 tabs: Transactions, Daily rewards, Auto-Rebuy, Operations, Wallets; tx hashes, CSV export)
    - Help & Support (Instant search filtering, 8 expandable FAQ accordions, talk to live support)
    - Sign In (Split-screen branded design with Google, Email code, and Web3 wallet connect)
  - **Ambassador side**:
    - Ambassador Dashboard (Settlement countdown, Matrix rewards, Rank, Group volume, Total network, line quick stats)
    - Network Tree (Mountain matrix visualization with Ricky Lundell at Everest summit, 4 matrix ledges with 3-D rank-colored Bolts, dynamic rank selection)
    - Downline Directory (359 sample organization members, multi-rank filter chips with counts, "Leaders" shortcut, level bands, status, 21 lines selector, search query, sorting, detail drawer with next summit checklist, CSV download)
    - My Team (Personal enrollees, team volume, invite referral link with 1-click copy, 21 line leader cards with rank bolts)
    - Commissions (Base Matrix & Breakage Differential explanations, last 7 settlements breakdown)
    - Commission Reports (Period filter 7/14/30 days, Base vs Breakage stacked bar charts, breakdown by level and line, full report modal with CSV download)
    - Commission Projector (Donut chart breakdown, 90/180/400 day projections, interactive sliders for daily return, no-profit days, what-if conversion, monthly projection chart)
    - Rank (7 Summits staircase with 3-D rank-colored Bolts, detailed requirements per summit, line balance check with 8 line bars and cap limits)
    - Withdraw Matrix Rewards (Dedicated matrix withdrawal flow)
- **Bolt Guide Mascot**:
  - 8 animated expressions with SVG faces (happy, talk, cheer, surprise, think, sad, wink, love)
  - Web Audio API synthesizer for all 17 sound effects (`pop`, `whoosh`, `land`, `boing`, `chirp`, `cheer`, `sad`, `tick`, `win`, `jackpot`, `cash`, `flip`, `idle`, `beat`, `giggle`, `laugh`, `dizzy`, `hooray`)
  - Web Speech API speech synthesis
  - Interactive tooltips / button explanations (58 explanations from `explanations.json`)
  - Idle check-in & celebration modes
- **Review Hub & Companion Tools**:
  - Review UX UI dashboard
  - Before and After comparison with 8 original screenshots and full Was → Now tables
  - Partner Sign-Off Sheet with 10 open decisions and interactive Approve/Change voting
  - Bolt's Edit Desk with voice recording, timers, proposal editor
  - Bolt Drop-in Demo

## 🛠️ Stack & Dependencies

- **React 19**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (modern iconography)
- **Canvas Confetti** (jackpot celebrations)
- **Web Audio API** (in-browser retro sound synthesizer)

## 🏃 Running the Application

In the `react-app/` directory:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

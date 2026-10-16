import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, ArrowUpRight, Sparkles, ShoppingBag, Clock, TrendingUp, AlertCircle, Play, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { FOUNDER_MESSAGES, calcModule } from '../../data/mockData';
import { sfx } from '../../utils/sfx';

export default function CustomerDashboard({
  modules = [],
  wallets = { purchase: 0, rewards: 312.4, matrix: 2098.12 },
  avg7 = 0.0084,
  avg30 = 0.0051,
  yday = 0.005,
  prevDay = 0.0096,
  hist = [0.0071, 0.0093, 0, 0.0112, 0.0089, 0.0127, 0.0096],
  onNavigate,
  onOpenVideo
}) {
  const [fmIdx, setFmIdx] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Live rewards clock state
  const [clockDisplay, setClockDisplay] = useState({ whole: '0', cents: '00', fast: '0000' });
  const [countdown, setCountdown] = useState({ h: '00', m: '00', s: '00' });
  const [dayProgress, setDayProgress] = useState(0);

  const activeMods = modules.map((m) => calcModule(m, avg7, avg30)).filter((m) => !m.done);
  const totalOriginal = activeMods.reduce((sum, m) => sum + m._price, 0);
  const totalRemaining = activeMods.reduce((sum, m) => sum + m._rem, 0);
  const totalRewards = activeMods.reduce((sum, m) => sum + m._del, 0);

  // Settlement Countdown & Animated Clock Loop
  useEffect(() => {
    let animId;
    const updateTime = () => {
      const now = new Date();
      // Next 12:00 UTC (16:00 Dubai)
      const nextSettle = new Date(now);
      nextSettle.setUTCHours(12, 0, 0, 0);
      if (nextSettle <= now) nextSettle.setUTCDate(nextSettle.getUTCDate() + 1);

      // Previous 12:00 UTC
      const lastSettle = new Date(nextSettle);
      lastSettle.setUTCDate(lastSettle.getUTCDate() - 1);

      const elapsed = Math.max(0, now.getTime() - lastSettle.getTime());
      const frac = Math.min(1, elapsed / 86400000);
      setDayProgress(frac);

      // Countdown
      let diffSec = Math.max(0, Math.floor((nextSettle.getTime() - now.getTime()) / 1000));
      const h = String(Math.floor(diffSec / 3600)).padStart(2, '0');
      diffSec %= 3600;
      const m = String(Math.floor(diffSec / 60)).padStart(2, '0');
      const s = String(diffSec % 60).padStart(2, '0');
      setCountdown({ h, m, s });

      // Daily amount calculated across active modules
      const dailyTotal = activeMods.reduce(
        (sum, mod) => sum + Math.min(mod._price * yday, 2 * mod._price - mod._del),
        0
      );

      // Realtime live accumulation
      const currentValue = totalRewards + dailyTotal * frac;
      const parts = currentValue.toFixed(6).split('.');
      setClockDisplay({
        whole: Number(parts[0]).toLocaleString(),
        cents: parts[1].slice(0, 2),
        fast: parts[1].slice(2)
      });

      animId = requestAnimationFrame(updateTime);
    };

    animId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animId);
  }, [activeMods, totalRewards, yday]);

  const activeMsg = FOUNDER_MESSAGES[fmIdx];

  // Speed Gauge calculation
  const speedRatio = avg30 > 0 ? yday / avg30 : 1;
  const needleAngle = Math.max(-80, Math.min(80, -80 + 80 * speedRatio));

  let speedText = 'Same speed as yesterday';
  if (yday === 0) speedText = 'Standing still: no-profit day';
  else if (yday > prevDay + 0.0005) speedText = 'Faster than yesterday';
  else if (yday < prevDay - 0.0005) speedText = 'Slower than yesterday';

  const circ = 2 * Math.PI * 72;
  const strokeDash = `${(circ * dayProgress).toFixed(1)} ${circ.toFixed(1)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Header Greeting & Primary Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="kick">Customer Workspace</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Welcome back, Ricky
          </h1>
          <p className="lbl mt-1">
            Your Modules are active and rewards are counting in for the next Dubai settlement.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('balances')}
            className="b3 sm text-xs sm:text-sm inline-flex items-center gap-1.5"
          >
            <PlusCircle size={15} /> Add USDT
          </button>
          <button
            onClick={() => onNavigate('withdraw')}
            className="b3 sm text-xs sm:text-sm inline-flex items-center gap-1.5"
          >
            <ArrowUpRight size={15} /> Withdraw
          </button>
          <button
            onClick={() => onNavigate('boost')}
            className="b3 boost sm text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-lg"
          >
            <Sparkles size={15} /> Module Booster
          </button>
          <button
            onClick={() => onNavigate('purchase')}
            className="b3 gold sm text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-lg"
          >
            <ShoppingBag size={15} /> Purchase a Module
          </button>
        </div>
      </div>

      {/* 2. Message from Founders Card */}
      {activeMsg && (
        <div className="card bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 border border-amber-300/40 dark:border-amber-700/40 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="chip text-[11px] font-bold bg-amber-400 text-slate-900 border-none px-2 py-0.5">
                  NEW
                </span>
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  {activeMsg.from} · {activeMsg.date}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {activeMsg.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeMsg.text}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-none">
              <button
                onClick={() => {
                  sfx.play('pop');
                  setShowVideoModal(true);
                }}
                className="b3 gold sm text-xs inline-flex items-center gap-1.5"
              >
                <Play size={13} fill="currentColor" /> {activeMsg.cta}
              </button>
              <div className="flex items-center gap-1 ml-2">
                <button
                  disabled={fmIdx === 0}
                  onClick={() => setFmIdx((prev) => Math.max(0, prev - 1))}
                  className="b3 sm !min-h-0 !h-8 !w-8 !p-0"
                  title="Newer message"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={fmIdx === FOUNDER_MESSAGES.length - 1}
                  onClick={() => setFmIdx((prev) => Math.min(FOUNDER_MESSAGES.length - 1, prev + 1))}
                  className="b3 sm !min-h-0 !h-8 !w-8 !p-0"
                  title="Earlier message"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video / Flyer Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="card bg-white dark:bg-slate-900 max-w-2xl w-full p-6 space-y-4 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {activeMsg.title}
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="b3 sm !min-h-0 !h-8 !w-8 !p-0 text-slate-500"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl flex flex-col items-center justify-center text-white relative overflow-hidden p-6 text-center border border-slate-700">
              <div className="mark w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mb-4">
                <Play size={32} className="text-amber-400 ml-1" fill="currentColor" />
              </div>
              <h4 className="text-xl font-bold">{activeMsg.from}</h4>
              <p className="text-xs text-slate-300 max-w-md mt-1">
                "Thank you for climbing with us. Transparency and mathematical sustainability guide every step."
              </p>
              <span className="text-[11px] text-amber-400 mt-3 font-semibold uppercase tracking-wider">
                Video Duration: {activeMsg.dur || '3:12'} · Full HD
              </span>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setShowVideoModal(false)} className="b3 sm px-4">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Four Core KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 space-y-2">
          <span className="lbl text-xs">Active Modules</span>
          <div className="num font-light text-3xl sm:text-4xl text-slate-900 dark:text-white">
            {activeMods.length}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Climbing normally
          </div>
        </div>

        <div className="card p-5 space-y-2">
          <span className="lbl text-xs">Module Credits Remaining</span>
          <div className="num font-light text-2xl sm:text-3xl text-sky-600 dark:text-sky-400">
            ${totalRemaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500">
            Original: ${totalOriginal.toLocaleString()}
          </div>
        </div>

        <div className="card p-5 space-y-2">
          <span className="lbl text-xs">AI Module Rewards (delivered)</span>
          <div className="num font-light text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">
            ${totalRewards.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-amber-600/80 font-medium">
            Accumulated to date
          </div>
        </div>

        <div className="card p-5 space-y-2">
          <span className="lbl text-xs">Available Rewards (Wallet)</span>
          <div className="num font-light text-2xl sm:text-3xl text-slate-900 dark:text-white">
            ${wallets.rewards.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <button
            onClick={() => onNavigate('withdraw')}
            className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            Withdraw now <ArrowUpRight size={12} />
          </button>
        </div>
      </div>

      {/* 4. Results Panel & Live Rewards Clock Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Results Panel (5 cols) */}
        <div className="lg:col-span-5 card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="kick">Performance Results</span>
              <h2 className="text-xl font-light text-slate-900 dark:text-white mt-0.5">
                Past Settled Days
              </h2>
            </div>
            <span className="chip text-xs">Past results only</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2">
            <div className="tint p-3 rounded-xl">
              <span className="lbl text-[11px]">Yesterday</span>
              <div className="text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
                {(yday * 100).toFixed(2)}%
              </div>
            </div>
            <div className="tint p-3 rounded-xl">
              <span className="lbl text-[11px]">7-Day Avg</span>
              <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {(avg7 * 100).toFixed(2)}%
              </div>
            </div>
            <div className="tint p-3 rounded-xl">
              <span className="lbl text-[11px]">30-Day Avg</span>
              <div className="text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
                {(avg30 * 100).toFixed(2)}%
              </div>
            </div>
          </div>

          {/* 7-Day Visual Bars */}
          <div className="space-y-2 pt-2">
            <span className="text-xs text-slate-500 font-medium">Last 7 settled days:</span>
            <div className="flex items-end gap-2 h-28 pt-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              {hist.map((rate, i) => {
                const heightPct = Math.min(100, (rate / 0.015) * 100);
                const isZero = rate === 0;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10">
                      Day -{7 - i}: {isZero ? 'None' : (rate * 100).toFixed(2) + '%'}
                    </div>
                    <div
                      style={{ height: isZero ? '4px' : `${Math.max(12, heightPct)}%` }}
                      className={`w-full rounded-t-md transition-all ${
                        isZero
                          ? 'bg-rose-400/60'
                          : i === hist.length - 1
                          ? 'bg-gradient-to-t from-amber-500 to-amber-300'
                          : 'bg-gradient-to-t from-sky-600 to-sky-400'
                      }`}
                    />
                    <span className="text-[10px] text-slate-400 font-mono">D-{7 - i}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed italic">
            Each day can be more, less, or nothing. The plan illustration uses the 0.50% standard.
          </p>
        </div>

        {/* Live Rewards Clock & Settlement Countdown (7 cols) */}
        <div className="lg:col-span-7 card p-6 space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <span className="kick">Live Anticipation</span>
              <h2 className="text-xl font-light text-slate-900 dark:text-white mt-0.5">
                Rewards Counting In
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                12:00 UTC Settlement
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Live Odometer */}
            <div className="sm:col-span-7 space-y-3">
              <span className="lbl text-xs">Accumulated value for today:</span>
              <div className="flex items-baseline font-mono font-light select-none">
                <span className="text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white">
                  ${clockDisplay.whole}.{clockDisplay.cents}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-amber-500 ml-1">
                  {clockDisplay.fast}
                </span>
              </div>

              {/* Speed Gauge Comparison */}
              <div className="tint p-3 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="lbl font-medium">Live Pace:</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">{speedText}</span>
                </div>
                <div className="relative w-full h-3 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden flex items-center">
                  <div
                    style={{ left: `${Math.max(5, Math.min(95, 50 + needleAngle / 2))}%` }}
                    className="absolute w-2.5 h-5 bg-amber-500 rounded-sm shadow -translate-x-1/2 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Circular Ring Countdown */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-slate-200 dark:text-slate-800"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    fill="none"
                    stroke="url(#mbGold)"
                    strokeWidth="7"
                    strokeDasharray={strokeDash}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <Clock size={16} className="text-amber-500 mb-1" />
                  <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                    {countdown.h}:{countdown.m}:{countdown.s}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    To 16:00 Dubai
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3">
            Today's exact amount is revealed when it settles at 16:00 Dubai (12:00 UTC). Until then, watch the speed!
          </p>
        </div>
      </div>

      {/* 5. Active Modules Cards with Dual Meters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="kick">Active Inventory</span>
            <h2 className="text-2xl font-light text-slate-900 dark:text-white mt-0.5">
              Your Active Modules ({activeMods.length})
            </h2>
          </div>
          <button
            onClick={() => onNavigate('mine')}
            className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            View all modules in My Modules →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeMods.map((mod) => (
            <div key={mod.id} className="card p-6 space-y-5 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm">
                    Δ
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Module {mod.id}
                    </h3>
                    <span className="text-xs text-slate-500">
                      Day {mod.dayTxt} · {mod.phase}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {mod.priceTxt}
                  </span>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Cap: {mod.capTxt}
                  </div>
                </div>
              </div>

              {/* Dual Meters */}
              <div className="space-y-3 pt-2">
                {/* Credit Remaining Meter (Blue) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="lbl">Module Credits Remaining:</span>
                    <span className="font-medium text-sky-600 dark:text-sky-400">
                      {mod.remainTxt} ({mod.remainPct})
                    </span>
                  </div>
                  <div className="well bar h-3 rounded-full overflow-hidden p-0.5">
                    <div
                      style={{ width: mod.remainPct }}
                      className="fill-cr rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                {/* AI Module Rewards Meter (Gold) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="lbl">AI Module Rewards Delivered:</span>
                    <span className="font-medium text-amber-600 dark:text-amber-400">
                      {mod.rewardTxt} ({mod.rewardPct})
                    </span>
                  </div>
                  <div className="well bar h-3 rounded-full overflow-hidden p-0.5">
                    <div
                      style={{ width: mod.rewardPct }}
                      className="fill-gd rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Finish Estimates */}
              <div className="tint p-3 rounded-xl grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="lbl text-[10px]">At 7-Day Avg</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {mod.e7.days} days
                  </div>
                  <span className="text-[10px] text-slate-400">{mod.e7.date}</span>
                </div>
                <div>
                  <span className="lbl text-[10px]">At 30-Day Avg</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {mod.e30.days} days
                  </div>
                  <span className="text-[10px] text-slate-400">{mod.e30.date}</span>
                </div>
                <div>
                  <span className="lbl text-[10px]">Plan 0.50%</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {mod.ePlan.days} days
                  </div>
                  <span className="text-[10px] text-slate-400">{mod.ePlan.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


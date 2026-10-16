import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Clock, ArrowUpRight, ChevronRight, Play } from 'lucide-react';
import { RANKS, FOUNDER_MESSAGES } from '../../data/mockData';
import { sfx } from '../../utils/sfx';

export default function AmbassadorDashboard({
  wallets = { purchase: 0, rewards: 312.4, matrix: 2098.12 },
  onNavigate
}) {
  const [countdown, setCountdown] = useState({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextSettle = new Date(now);
      nextSettle.setUTCHours(12, 0, 0, 0);
      if (nextSettle <= now) nextSettle.setUTCDate(nextSettle.getUTCDate() + 1);

      let diffSec = Math.max(0, Math.floor((nextSettle.getTime() - now.getTime()) / 1000));
      const h = String(Math.floor(diffSec / 3600)).padStart(2, '0');
      diffSec %= 3600;
      const m = String(Math.floor(diffSec / 60)).padStart(2, '0');
      const s = String(diffSec % 60).padStart(2, '0');
      setCountdown({ h, m, s });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="kick text-purple-600 dark:text-purple-400">Ambassador Leadership</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Ambassador Dashboard
          </h1>
          <p className="lbl mt-1">
            Track your 21 sales lines, Base Matrix bonuses, breakage differential earnings, and rank qualification.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('tree')}
            className="b3 gold sm text-xs sm:text-sm inline-flex items-center gap-1.5 shadow"
          >
            <Users size={15} /> Network Tree
          </button>
          <button
            onClick={() => onNavigate('down')}
            className="b3 sm text-xs sm:text-sm inline-flex items-center gap-1.5"
          >
            Downline Directory
          </button>
          <button
            onClick={() => onNavigate('awd')}
            className="b3 sm text-xs sm:text-sm inline-flex items-center gap-1.5"
          >
            <ArrowUpRight size={15} /> Withdraw Matrix
          </button>
        </div>
      </div>

      {/* Ambassador KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 space-y-2">
          <span className="lbl text-xs">Current Summit Rank</span>
          <div className="flex items-center gap-2 mt-1">
            <svg className="w-8 h-9 overflow-visible" style={{ color: RANKS['Everest'].color }}>
              <use href="#mbolt" />
              <use href="#mcrown" />
            </svg>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              Everest
            </span>
          </div>
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
            Top Summit · 42% Entitlement
          </span>
        </div>

        <div className="card p-5 space-y-2">
          <span className="lbl text-xs">Available Matrix Rewards</span>
          <div className="num font-light text-2xl sm:text-3xl text-purple-600 dark:text-purple-400">
            ${wallets.matrix.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <button
            onClick={() => onNavigate('awd')}
            className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            Withdraw now <ArrowUpRight size={12} />
          </button>
        </div>

        <div className="card p-5 space-y-2">
          <span className="lbl text-xs">Total Group Volume</span>
          <div className="num font-light text-2xl sm:text-3xl text-slate-900 dark:text-white">
            $1,061,922.84
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">
            Qualifies line balance cap
          </span>
        </div>

        <div className="card p-5 space-y-2">
          <span className="lbl text-xs">Total Sales Organisation</span>
          <div className="num font-light text-2xl sm:text-3xl text-slate-900 dark:text-white">
            359
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            21 direct enrolled lines
          </span>
        </div>
      </div>

      {/* Countdown Card & Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6 card p-6 space-y-4 flex flex-col justify-between">
          <div>
            <span className="kick text-purple-600 dark:text-purple-400">Daily Matrix Distribution</span>
            <h2 className="text-xl font-light text-slate-900 dark:text-white mt-0.5">
              Next Settlement Window
            </h2>
            <p className="lbl text-xs mt-1">
              Commissions from all 21 levels calculate daily at 16:00 Dubai (12:00 UTC).
            </p>
          </div>

          <div className="tint p-6 rounded-2xl flex items-center justify-center text-center">
            <div className="space-y-1">
              <span className="text-4xl font-mono font-bold tracking-tight text-slate-900 dark:text-white">
                {countdown.h}:{countdown.m}:{countdown.s}
              </span>
              <span className="text-xs text-slate-500 block uppercase tracking-wider font-semibold">
                Countdown to Next Payout
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 card p-6 space-y-4">
          <span className="kick">Quick Tools</span>
          <h2 className="text-xl font-light text-slate-900 dark:text-white">
            Ambassador Operations
          </h2>

          <div className="space-y-2.5">
            {[
              { title: 'Interactive Network Tree', desc: 'Explore your mountain matrix visually with rank-colored Bolts.', nav: 'tree' },
              { title: 'Commission Reports', desc: 'Stacked charts for Base Matrix vs Breakage Differential.', nav: 'reports' },
              { title: 'Commission Projector', desc: 'Model 90–400 day earnings with interactive Auto-Rebuy sliders.', nav: 'proj' },
              { title: 'Rank Qualifications', desc: 'Check the 7 Summits staircase and 8 biggest line balance bars.', nav: 'rank' }
            ].map((tool) => (
              <button
                key={tool.title}
                onClick={() => {
                  sfx.play('pop');
                  onNavigate(tool.nav);
                }}
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-amber-400 dark:hover:border-amber-600 bg-slate-50/50 dark:bg-slate-800/40 text-left flex items-center justify-between gap-4 transition-all group"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-slate-500">{tool.desc}</p>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


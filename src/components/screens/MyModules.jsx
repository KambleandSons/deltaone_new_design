import React, { useState } from 'react';
import { calcModule } from '../../data/mockData';
import { Sparkles, CheckCircle2, RotateCw, Calendar } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function MyModules({
  modules = [],
  avg7 = 0.0084,
  avg30 = 0.0051,
  onToggleRebuy,
  onNavigate
}) {
  const [filter, setFilter] = useState('all');

  const calculatedMods = modules.map((m) => calcModule(m, avg7, avg30));
  const filtered = calculatedMods.filter((m) => {
    if (filter === 'active') return !m.done;
    if (filter === 'done') return m.done;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 sm:space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick">Module Portfolio</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            My Modules
          </h1>
          <p className="lbl mt-1">
            Track your Module Credits, AI Module Rewards delivered, and estimated completion times.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/70 p-1 rounded-xl">
          {[
            { id: 'all', label: 'All Modules' },
            { id: 'active', label: 'Active' },
            { id: 'done', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sfx.play('pop');
                setFilter(tab.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === tab.id
                  ? 'b3 gold sm text-xs !min-h-0 !h-7 !py-0'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((mod) => (
          <div
            key={mod.id}
            className={`card p-6 space-y-5 rounded-2xl border transition-all ${
              mod.done
                ? 'opacity-85 border-slate-300 dark:border-slate-700'
                : 'border-slate-300/80 dark:border-slate-700/80 shadow-md hover:shadow-xl'
            }`}
          >
            {/* Header info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm shadow">
                  Δ
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base text-slate-900 dark:text-white">
                      Module {mod.id}
                    </h3>
                    <span
                      className={`chip text-[11px] font-bold ${
                        mod.done
                          ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                      }`}
                    >
                      {mod.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Day {mod.dayTxt} · Original Price: {mod.priceTxt}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Cap Limit</span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {mod.capTxt} (2×)
                </span>
              </div>
            </div>

            {/* Dual Progress Bars */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="lbl font-medium">Module Credits Remaining:</span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">
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

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="lbl font-medium">AI Module Rewards Delivered:</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
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

            {/* Auto-Rebuy & Believer Status */}
            <div className="tint p-3.5 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  Auto-Rebuy Mode
                </span>
                <span className="text-[11px] text-slate-500">{mod.phase}</span>
              </div>
              <button
                disabled={mod.done}
                onClick={() => {
                  sfx.play('pop');
                  onToggleRebuy(mod.id);
                }}
                className={`b3 sm text-xs !min-h-0 !h-7 px-3 ${
                  mod.rebuy ? 'gold' : ''
                }`}
              >
                {mod.rebuy ? 'Auto-Rebuy ON (Believer)' : 'Auto-Rebuy OFF'}
              </button>
            </div>

            {/* Estimated Completion Timeline */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
              <div>
                <span className="lbl text-[10px]">7-Day Real Avg</span>
                <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                  {mod.e7.days} days
                </div>
                <span className="text-[10px] text-slate-400">{mod.e7.date}</span>
              </div>
              <div>
                <span className="lbl text-[10px]">30-Day Real Avg</span>
                <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                  {mod.e30.days} days
                </div>
                <span className="text-[10px] text-slate-400">{mod.e30.date}</span>
              </div>
              <div>
                <span className="lbl text-[10px]">Standard Plan</span>
                <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                  {mod.ePlan.days} days
                </div>
                <span className="text-[10px] text-slate-400">{mod.ePlan.date}</span>
              </div>
            </div>

            {/* Booster shortcut */}
            {!mod.done && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => onNavigate('boost')}
                  className="b3 boost sm text-xs inline-flex items-center gap-1.5"
                >
                  <Sparkles size={14} /> Booster Available
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { RANKS, ORDERED_RANKS, RANK_REQ } from '../../data/mockData';
import { Award, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function Rank() {
  const [selectedSummit, setSelectedSummit] = useState('Everest');

  // Top 8 lines volumes for line balance check
  const top8Lines = [
    { line: 1, name: 'Line 1 · Ambassador 001', vol: 259722.84 },
    { line: 2, name: 'Line 2 · Ambassador 002', vol: 205000.00 },
    { line: 3, name: 'Line 3 · Ambassador 003', vol: 160000.00 },
    { line: 4, name: 'Line 4 · Ambassador 004', vol: 120000.00 },
    { line: 5, name: 'Line 5 · Ambassador 005', vol: 95000.00 },
    { line: 6, name: 'Line 6 · Ambassador 006', vol: 70000.00 },
    { line: 7, name: 'Line 7 · Ambassador 007', vol: 48000.00 },
    { line: 8, name: 'Line 8 · Ambassador 008', vol: 30000.00 }
  ];

  const req = RANK_REQ[selectedSummit] || RANK_REQ['Everest'];
  const maxLineCap = req.tv * req.capPct;

  // Calculate volume counting after cap
  let totalAfterCap = 0;
  top8Lines.forEach((l) => {
    totalAfterCap += Math.min(l.vol, maxLineCap);
  });
  const qualifies = totalAfterCap >= req.tv;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick text-purple-600 dark:text-purple-400">Summit Progression</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Rank Qualifications
          </h1>
          <p className="lbl mt-1">
            Ascend the 7 Summits. Unlock deeper generational matrix levels, higher daily caps, and breakage differential.
          </p>
        </div>

        {/* Current status chip */}
        <div className="tint px-4 py-2 rounded-2xl flex items-center gap-3">
          <svg className="w-8 h-9 overflow-visible" style={{ color: RANKS['Everest'].color }}>
            <use href="#mbolt" />
            <use href="#mcrown" />
          </svg>
          <div>
            <span className="text-xs text-slate-500 block">Your Current Rank</span>
            <span className="text-base font-bold text-purple-600 dark:text-purple-400">
              Everest (Summit)
            </span>
          </div>
        </div>
      </div>

      {/* 7 Summits Staircase Component */}
      <div className="card p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 space-y-6">
        <span className="lbl text-xs font-semibold uppercase tracking-wider block">
          Select a Summit to Inspect Requirements & Line Balance:
        </span>

        {/* Staircase Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {ORDERED_RANKS.filter((r) => r !== 'No rank yet').map((summit, idx) => {
            const isSelected = selectedSummit === summit;
            const meta = RANKS[summit];

            return (
              <button
                key={summit}
                onClick={() => {
                  sfx.play('pop');
                  setSelectedSummit(summit);
                }}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between gap-3 transition-all ${
                  isSelected
                    ? 'ring-4 ring-amber-400 bg-amber-500/10 border-amber-400 dark:border-amber-500 shadow-lg scale-105'
                    : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase">
                  Step {idx + 1}
                </div>

                <svg className="w-9 h-11 overflow-visible" style={{ color: meta.color }}>
                  <use href="#mbolt" />
                  {summit === 'Everest' && <use href="#mcrown" />}
                </svg>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {summit}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {meta.ent} Entitlement
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Summit Detail Panel */}
        <div className="tint p-6 rounded-2xl space-y-5 border border-slate-300 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-10 h-12 overflow-visible" style={{ color: RANKS[selectedSummit]?.color }}>
                <use href="#mbolt" />
                {selectedSummit === 'Everest' && <use href="#mcrown" />}
              </svg>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedSummit} Requirements
                </h3>
                <span className="text-xs text-slate-500">
                  Paid on Levels {req.levels} · Maximum Base Daily Cap: {req.cap}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="chip text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold">
                <CheckCircle2 size={14} className="inline mr-1" />
                {qualifies ? 'Fully Qualified' : 'Qualification Pending'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="well p-3 rounded-xl bg-white/70 dark:bg-slate-900/70">
              <span className="lbl text-[10px]">Own Active Modules</span>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
                ${req.pv.toLocaleString()}
              </div>
            </div>
            <div className="well p-3 rounded-xl bg-white/70 dark:bg-slate-900/70">
              <span className="lbl text-[10px]">Personal Enrollees</span>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {req.enr} Lines
              </div>
            </div>
            <div className="well p-3 rounded-xl bg-white/70 dark:bg-slate-900/70">
              <span className="lbl text-[10px]">Qualifying Group Volume</span>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
                ${req.tv.toLocaleString()}
              </div>
            </div>
            <div className="well p-3 rounded-xl bg-white/70 dark:bg-slate-900/70">
              <span className="lbl text-[10px]">One Line Counts Up To</span>
              <div className="text-base font-bold text-purple-600 dark:text-purple-400 mt-1">
                {Math.round(req.capPct * 100)}% (${maxLineCap.toLocaleString()})
              </div>
            </div>
          </div>
        </div>

        {/* Line Balance Check */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <span className="kick text-xs">Line Balance Check (Top 8 Sponsorship Lines):</span>
            <span className="text-xs text-slate-500 font-medium">
              Red markers indicate max per-line volume cap ({Math.round(req.capPct * 100)}%)
            </span>
          </div>

          <div className="space-y-3">
            {top8Lines.map((l) => {
              const maxScale = top8Lines[0].vol;
              const barWidth = Math.min(100, (l.vol / maxScale) * 100);
              const capMarkerPos = Math.min(100, (maxLineCap / maxScale) * 100);
              const isCapped = l.vol > maxLineCap;

              return (
                <div key={l.line} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-xs">
                      {l.name}
                    </span>
                    <span className="text-slate-500">
                      ${l.vol.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      {isCapped && (
                        <span className="text-rose-500 text-[10px] ml-1 font-semibold">
                          (capped at ${maxLineCap.toLocaleString()})
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="relative w-full h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    {/* Cap red marker line */}
                    <div
                      style={{ left: `${capMarkerPos}%` }}
                      className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10"
                      title={`Line cap limit: $${maxLineCap.toLocaleString()}`}
                    />
                    <div
                      style={{ width: `${barWidth}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="tint p-3 rounded-xl flex items-center justify-between text-xs font-medium">
            <span className="text-slate-600 dark:text-slate-300">
              Total qualifying volume counted after line balance cap:
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              ${totalAfterCap.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / ${req.tv.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


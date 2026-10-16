import React from 'react';
import { BEFORE_AFTER_ROWS } from '../../data/mockData';
import { ArrowRight, Eye } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function BeforeAfter({ onSwitchView }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick text-amber-600 dark:text-amber-400">Compliance Audit</span>
          <h1 className="h1 text-3xl sm:text-5xl font-light tracking-tight mt-1">
            Before and After
          </h1>
          <p className="lbl mt-1 max-w-2xl">
            Each marked screenshot represents the legacy back office. Beside it: every single term that changes, what replaces it, and why.
          </p>
        </div>

        <button
          onClick={() => {
            sfx.play('cheer');
            onSwitchView('backoffice');
          }}
          className="b3 gold sm text-xs inline-flex items-center gap-1.5 shadow"
        >
          View Live in Back Office <ArrowRight size={14} />
        </button>
      </div>

      {/* Screen comparisons list */}
      <div className="space-y-8">
        {BEFORE_AFTER_ROWS.map((row) => (
          <div
            key={row.ref}
            className="card p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-md"
          >
            {/* Before (Original screenshot) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="chip text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800">
                  BEFORE: {row.ref}
                </span>
                <span className="text-xs text-slate-400 font-mono">Legacy UI</span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-inner">
                <img
                  src={row.img}
                  alt={row.alt}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </div>

            {/* After (Table of changed terminology) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="chip text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800">
                  AFTER: {row.where}
                </span>
              </div>

              <h3 className="text-2xl font-light text-slate-900 dark:text-white">
                {row.title}
              </h3>

              <div className="card p-0 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <table className="tbl w-full text-left">
                  <thead>
                    <tr>
                      <th className="w-1/2">Was (Legacy Phrase)</th>
                      <th className="w-1/2">Now (Delta One Standard)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.pairs.map((pair, pIdx) => (
                      <tr key={pIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="text-slate-500 line-through decoration-rose-500 text-xs">
                          {pair.was}
                        </td>
                        <td className="font-semibold text-emerald-700 dark:text-emerald-400 text-xs">
                          {pair.now}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


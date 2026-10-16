import React from 'react';
import { ArrowUpRight, BarChart3, TrendingUp, HelpCircle } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function Commissions({ onNavigate }) {
  const last7Days = [
    { date: '2026-10-15', pct: '0.96%', base: '$240.00', diff: '$198.40', total: '$438.40' },
    { date: '2026-10-14', pct: '1.27%', base: '$317.50', diff: '$262.20', total: '$579.70' },
    { date: '2026-10-13', pct: '0.89%', base: '$222.50', diff: '$183.80', total: '$406.30' },
    { date: '2026-10-12', pct: '1.12%', base: '$280.00', diff: '$231.20', total: '$511.20' },
    { date: '2026-10-11', pct: 'None (0%)', base: '$0.00', diff: '$0.00', total: '$0.00' },
    { date: '2026-10-10', pct: '0.93%', base: '$232.50', diff: '$192.10', total: '$424.60' },
    { date: '2026-10-09', pct: '0.71%', base: '$177.50', diff: '$146.70', total: '$324.20' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick text-purple-600 dark:text-purple-400">Compensation Engine</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Commissions
          </h1>
          <p className="lbl mt-1">
            Settlement payouts consist of Base Matrix (2% per level) and Breakage Differential (rank gap).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('reports')}
            className="b3 gold sm text-xs inline-flex items-center gap-1.5 shadow"
          >
            <BarChart3 size={15} /> Commission Reports
          </button>
          <button
            onClick={() => onNavigate('proj')}
            className="b3 sm text-xs inline-flex items-center gap-1.5"
          >
            <TrendingUp size={15} /> Commission Projector
          </button>
        </div>
      </div>

      {/* KPI Totals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Last Settlement (15 Oct)</span>
          <div className="num font-light text-2xl text-slate-900 dark:text-white">
            $438.40
          </div>
          <span className="text-xs text-emerald-600 font-medium">Delivered to Matrix Wallet</span>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Last 7 Settlements Total</span>
          <div className="num font-light text-2xl text-purple-600 dark:text-purple-400">
            $2,684.40
          </div>
          <span className="text-xs text-slate-500">Across 6 trading days</span>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Base Matrix Share</span>
          <div className="num font-light text-2xl text-amber-600 dark:text-amber-400">
            $1,470.00
          </div>
          <span className="text-xs text-slate-500">2% on all paid levels</span>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Breakage Differential</span>
          <div className="num font-light text-2xl text-sky-600 dark:text-sky-400">
            $1,214.40
          </div>
          <span className="text-xs text-slate-500">Uncapped line rank gaps</span>
        </div>
      </div>

      {/* Two Ways Explained */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 space-y-3 rounded-2xl border border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Base Matrix (2% per level)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            You receive 2% of every Module's daily result across all qualified levels (up to 21 levels for Everest).
            Capped daily by your rank ($7,000/day for Everest).
          </p>
          <div className="tint p-3 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300">
            Formula: 2% × Daily Yield × Volume on each Paid Level
          </div>
        </div>

        <div className="card p-6 space-y-3 rounded-2xl border border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Breakage Differential (Uncapped)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            You earn the entitlement percentage gap between your rank (Everest = 42%) and the highest rank in each of your 21 lines, multiplied by that line's daily result.
          </p>
          <div className="tint p-3 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300">
            Formula: (Your Entitlement % − Highest Downline %) × Line Yield
          </div>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="card p-0 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-md">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
            Last 7 Settlements History
          </h3>
          <span className="text-xs text-slate-500">16:00 Dubai Ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="tbl w-full text-left">
            <thead>
              <tr>
                <th>Date</th>
                <th>Network Result</th>
                <th className="r">Base Matrix</th>
                <th className="r">Breakage Differential</th>
                <th className="r">Total Commission</th>
              </tr>
            </thead>
            <tbody>
              {last7Days.map((row) => (
                <tr key={row.date} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="font-semibold text-slate-900 dark:text-white font-mono text-xs">
                    {row.date}
                  </td>
                  <td>
                    <span className={`chip text-[11px] font-semibold ${row.pct.includes('None') ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : ''}`}>
                      {row.pct}
                    </span>
                  </td>
                  <td className="r font-mono text-amber-600 dark:text-amber-400 font-medium">
                    {row.base}
                  </td>
                  <td className="r font-mono text-sky-600 dark:text-sky-400 font-medium">
                    {row.diff}
                  </td>
                  <td className="r font-mono font-bold text-slate-900 dark:text-white">
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { Download, BarChart2, Filter, ChevronRight, X } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function CommissionReports() {
  const [period, setPeriod] = useState(7); // 7, 14, 30
  const [type, setType] = useState('all'); // all, base, diff
  const [showFullModal, setShowFullModal] = useState(false);

  // Generate sample report days
  const days = Array.from({ length: period }, (_, i) => {
    const d = new Date(Date.now() - (period - 1 - i) * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const isZero = i % 6 === 4;
    const base = isZero ? 0 : Math.round(180 + Math.sin(i * 1.5) * 80);
    const diff = isZero ? 0 : Math.round(150 + Math.cos(i * 1.2) * 70);
    return {
      date: dateStr,
      p: isZero ? 0 : 0.008 + (i % 5) * 0.001,
      base,
      diff,
      total: base + diff
    };
  });

  const totalBase = days.reduce((sum, d) => sum + d.base, 0);
  const totalDiff = days.reduce((sum, d) => sum + d.diff, 0);
  const totalAll = totalBase + totalDiff;
  const maxBar = Math.max(...days.map((d) => d.total)) || 1;

  const downloadFullCSV = () => {
    sfx.play('cash');
    const headers = ['Date,Daily Yield %,Base Matrix USDT,Breakage Differential USDT,Total USDT'];
    const rows = days.map(
      (d) => `"${d.date}","${(d.p * 100).toFixed(2)}%",${d.base.toFixed(2)},${d.diff.toFixed(2)},${d.total.toFixed(2)}`
    );
    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `delta-one-commission-report-${period}d.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick text-purple-600 dark:text-purple-400">Ledger Analytics</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Commission Reports
          </h1>
          <p className="lbl mt-1">
            Deep settlement analysis of base matrix volume and breakage entitlement across all generations.
          </p>
        </div>

        <button
          onClick={() => {
            sfx.play('pop');
            setShowFullModal(true);
          }}
          className="b3 gold sm text-xs inline-flex items-center gap-1.5 shadow"
        >
          <BarChart2 size={15} /> Pull Full Report
        </button>
      </div>

      {/* Period & Type Pickers */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/70 p-1 rounded-xl">
          {[
            { id: 7, label: 'Last 7 settlements' },
            { id: 14, label: 'Last 14' },
            { id: 30, label: 'Last 30' }
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => {
                sfx.play('pop');
                setPeriod(p.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                period === p.id
                  ? 'b3 gold sm text-xs !min-h-0 !h-7 !py-0'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/70 p-1 rounded-xl">
          {[
            { id: 'all', label: 'All Commissions' },
            { id: 'base', label: 'Base Matrix' },
            { id: 'diff', label: 'Breakage Differential' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                sfx.play('pop');
                setType(t.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                type === t.id
                  ? 'b3 gold sm text-xs !min-h-0 !h-7 !py-0'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Total Selected Period</span>
          <div className="num font-light text-2xl sm:text-3xl text-slate-900 dark:text-white">
            ${type === 'base' ? totalBase.toFixed(2) : type === 'diff' ? totalDiff.toFixed(2) : totalAll.toFixed(2)}
          </div>
          <span className="text-xs text-slate-500">Across {period} settlements</span>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Base Matrix Share</span>
          <div className="num font-light text-2xl text-amber-600 dark:text-amber-400">
            ${totalBase.toFixed(2)}
          </div>
          <span className="text-xs text-slate-500">{(totalAll ? (totalBase / totalAll) * 100 : 0).toFixed(1)}% of total</span>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Breakage Differential</span>
          <div className="num font-light text-2xl text-sky-600 dark:text-sky-400">
            ${totalDiff.toFixed(2)}
          </div>
          <span className="text-xs text-slate-500">{(totalAll ? (totalDiff / totalAll) * 100 : 0).toFixed(1)}% of total</span>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Average Per Settlement</span>
          <div className="num font-light text-2xl text-emerald-600 dark:text-emerald-400">
            ${(totalAll / period).toFixed(2)}
          </div>
          <span className="text-xs text-slate-500">Per 16:00 Dubai payout</span>
        </div>
      </div>

      {/* Stacked Bars Visual Chart */}
      <div className="card p-6 space-y-4 rounded-2xl border border-slate-300 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="kick text-xs">Settlement Stacked Volume</span>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-400" />
              <span className="text-slate-600 dark:text-slate-300">Base Matrix</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-sky-500" />
              <span className="text-slate-600 dark:text-slate-300">Breakage Diff</span>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-2 h-44 pt-6 pb-2 border-b border-slate-200 dark:border-slate-800">
          {days.map((d) => {
            const hBase = type === 'diff' ? 0 : (d.base / maxBar) * 100;
            const hDiff = type === 'base' ? 0 : (d.diff / maxBar) * 100;
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
                {/* Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap z-20">
                  {d.date}: ${d.total.toFixed(2)} (Base: ${d.base}, Diff: ${d.diff})
                </div>

                <div className="w-full flex flex-col justify-end h-full">
                  {hDiff > 0 && (
                    <div
                      style={{ height: `${hDiff}%` }}
                      className="w-full bg-sky-500 rounded-t-sm transition-all"
                    />
                  )}
                  {hBase > 0 && (
                    <div
                      style={{ height: `${hBase}%` }}
                      className={`w-full bg-amber-400 transition-all ${
                        hDiff > 0 ? '' : 'rounded-t-sm'
                      }`}
                    />
                  )}
                  {d.total === 0 && (
                    <div className="w-full h-1 bg-rose-400 rounded-sm opacity-50" />
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-mono rotate-45 sm:rotate-0 mt-1">
                  {d.date.slice(8)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Report Modal */}
      {showFullModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="card bg-white dark:bg-slate-900 max-w-3xl w-full p-6 space-y-4 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Full Settlement Report ({period} Settlements)
                </h3>
                <span className="text-xs text-slate-500">Complete audit log of Base & Differential calculations</span>
              </div>
              <button
                onClick={() => setShowFullModal(false)}
                className="b3 sm !min-h-0 !h-8 !w-8 !p-0"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <table className="tbl w-full text-left">
                <thead>
                  <tr>
                    <th>Settlement Date</th>
                    <th>Yield %</th>
                    <th className="r">Base Matrix</th>
                    <th className="r">Breakage Differential</th>
                    <th className="r">Total Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {days.slice().reverse().map((d) => (
                    <tr key={d.date} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="font-mono text-xs">{d.date}</td>
                      <td>{(d.p * 100).toFixed(2)}%</td>
                      <td className="r font-mono text-amber-600 dark:text-amber-400">${d.base.toFixed(2)}</td>
                      <td className="r font-mono text-sky-600 dark:text-sky-400">${d.diff.toFixed(2)}</td>
                      <td className="r font-mono font-bold text-slate-900 dark:text-white">${d.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={downloadFullCSV}
                className="b3 gold sm text-xs inline-flex items-center gap-1.5"
              >
                <Download size={14} /> Download Report CSV
              </button>
              <button onClick={() => setShowFullModal(false)} className="b3 sm text-xs px-4">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


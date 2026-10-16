import React, { useState } from 'react';
import { ACTIVITY_DATA } from '../../data/mockData';
import { Download, ExternalLink, Filter } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function Activity() {
  const [filter, setFilter] = useState('all');
  const [tab, setTab] = useState('tx');

  const filtered = ACTIVITY_DATA.filter((row) => {
    if (tab !== 'all' && row.tab !== tab) return false;
    if (filter !== 'all' && row.k !== filter) return false;
    return true;
  });

  const downloadCSV = () => {
    sfx.play('cash');
    const headers = ['Event,Timestamp UTC,Proof Hash,Amount USDT'];
    const rows = filtered.map((r) => `"${r.event}","${r.time}","${r.proof}","${r.amount}"`);
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `delta-one-activity-${tab}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 sm:space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick">Audit Trail</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Activity Log
          </h1>
          <p className="lbl mt-1">
            Verifiable on-chain records of rewards, rebuys, and wallet operations.
          </p>
        </div>

        <button
          onClick={downloadCSV}
          className="b3 gold sm text-xs inline-flex items-center gap-1.5 shadow"
        >
          <Download size={14} /> Download CSV
        </button>
      </div>

      {/* 5 Operational Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/70 p-1 rounded-2xl w-fit">
        {[
          { id: 'tx', label: 'Transactions' },
          { id: 'rew', label: 'Daily Rewards (Accruals)' },
          { id: 'rebuy', label: 'Auto-Rebuy' },
          { id: 'ops', label: 'Operations' },
          { id: 'wal', label: 'Wallets' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              sfx.play('pop');
              setTab(t.id);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              tab === t.id
                ? 'b3 gold sm text-xs !min-h-0 !h-7 !py-0'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filter by Type */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-medium">Filter by type:</span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All' },
            { id: 'added', label: 'USDT Added' },
            { id: 'withdraw', label: 'Withdrawal' },
            { id: 'module', label: 'Module Rewards' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                sfx.play('pop');
                setFilter(f.id);
              }}
              className={`chip text-[11px] cursor-pointer transition-all ${
                filter === f.id
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-500'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Table */}
      <div className="card p-0 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-md">
        <div className="overflow-x-auto">
          <table className="tbl w-full text-left">
            <thead>
              <tr>
                <th>Event</th>
                <th>Time (UTC)</th>
                <th>Proof (BSCScan)</th>
                <th className="r">Amount (USDT)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="font-medium text-slate-900 dark:text-white">
                    {item.event}
                  </td>
                  <td className="text-xs text-slate-500 font-mono">
                    {item.time}
                  </td>
                  <td>
                    <a
                      href={`https://bscscan.com/tx/${item.proof}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-600 dark:text-amber-400 font-mono text-xs hover:underline inline-flex items-center gap-1"
                    >
                      {item.proof} <ExternalLink size={11} />
                    </a>
                  </td>
                  <td
                    className={`r font-mono font-semibold ${
                      item.amount.startsWith('+')
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {item.amount}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-slate-400 text-xs">
                    No matching activity events found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


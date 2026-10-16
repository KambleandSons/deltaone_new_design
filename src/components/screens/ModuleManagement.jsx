import React, { useState } from 'react';
import { calcModule } from '../../data/mockData';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function ModuleManagement({
  modules = [],
  avg7 = 0.0084,
  avg30 = 0.0051
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const calculated = modules.map((m) => calcModule(m, avg7, avg30));

  const totalOrig = calculated.reduce((s, m) => s + m._price, 0);
  const totalUsed = calculated.reduce((s, m) => s + (m._del / 2), 0);
  const totalRem = calculated.reduce((s, m) => s + m._rem, 0);
  const totalDel = calculated.reduce((s, m) => s + m._del, 0);

  const filtered = calculated.filter((m) => {
    if (statusFilter === 'active' && m.done) return false;
    if (statusFilter === 'completed' && !m.done) return false;
    if (searchTerm && !m.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick">Inventory Ledger</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Module Management
          </h1>
          <span className="text-xs text-rose-500 font-mono">replaces legacy AUM screen</span>
          <p className="lbl mt-1">
            Audit every credit, reward delivery, and days remaining across all purchased Modules.
          </p>
        </div>
      </div>

      {/* KPI Totals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Total Original Credits</span>
          <div className="num font-light text-2xl text-slate-900 dark:text-white">
            ${totalOrig.toLocaleString()}
          </div>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Total Credits Used</span>
          <div className="num font-light text-2xl text-slate-600 dark:text-slate-400">
            ${totalUsed.toFixed(2)}
          </div>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Module Credits Remaining</span>
          <div className="num font-light text-2xl text-sky-600 dark:text-sky-400">
            ${totalRem.toFixed(2)}
          </div>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">AI Module Rewards (Delivered)</span>
          <div className="num font-light text-2xl text-amber-600 dark:text-amber-400">
            ${totalDel.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 w-full sm:w-72">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Module ID..."
            className="bg-transparent border-none text-xs sm:text-sm text-slate-800 dark:text-slate-200 outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/70 p-1 rounded-xl">
          {[
            { id: 'all', label: 'All' },
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sfx.play('pop');
                setStatusFilter(tab.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === tab.id
                  ? 'b3 gold sm text-xs !min-h-0 !h-7 !py-0'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <div className="card p-0 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-md">
        <div className="overflow-x-auto">
          <table className="tbl w-full text-left">
            <thead>
              <tr>
                <th>Module</th>
                <th className="r">Original Credits</th>
                <th className="r">Credits Used</th>
                <th className="r">Credits Remaining</th>
                <th className="r">% Remaining</th>
                <th className="r">AI Rewards</th>
                <th className="r">% of 2×</th>
                <th className="r">Days (7d Avg)</th>
                <th className="r">Days (30d Avg)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="font-semibold text-slate-900 dark:text-white">
                    {m.id}
                  </td>
                  <td className="r">{m.priceTxt}</td>
                  <td className="r text-slate-500">{m.usedTxt}</td>
                  <td className="r font-medium text-sky-600 dark:text-sky-400">{m.remainTxt}</td>
                  <td className="r text-sky-600 dark:text-sky-400 font-semibold">{m.remainPct}</td>
                  <td className="r font-medium text-amber-600 dark:text-amber-400">{m.rewardTxt}</td>
                  <td className="r text-amber-600 dark:text-amber-400 font-semibold">{m.rewardPct}</td>
                  <td className="r font-mono">{m.e7.days}</td>
                  <td className="r font-mono">{m.e30.days}</td>
                  <td>
                    <span
                      className={`chip text-[10px] font-bold ${
                        m.done
                          ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {m.status}
                    </span>
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


import React from 'react';
import { Wallet, ArrowUpRight, PlusCircle, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function Balances({
  wallets = { purchase: 0, rewards: 312.4, matrix: 2098.12 },
  modules = [],
  onNavigate,
  onAddFunds
}) {
  const activeModulesCredits = modules
    .filter((m) => !m.done)
    .reduce((sum, m) => sum + (m._rem || m.price), 0);

  const buckets = [
    {
      title: 'Purchase Wallet',
      legacy: 'was Deposit',
      desc: 'Used to purchase new Modules or top-ups. Funds cannot be withdrawn.',
      amount: wallets.purchase,
      color: 'text-slate-900 dark:text-white',
      badge: 'Non-withdrawable',
      action: () => onAddFunds('purchase')
    },
    {
      title: 'Rewards Wallet',
      legacy: 'was Earnings',
      desc: 'Daily AI Module Rewards delivered from active Modules. Available for payout.',
      amount: wallets.rewards,
      color: 'text-amber-600 dark:text-amber-400',
      badge: 'Available to withdraw',
      action: () => onNavigate('withdraw')
    },
    {
      title: 'Matrix Rewards',
      legacy: 'was Matrix earnings',
      desc: 'Commissions and breakage differential bonuses earned from your sales organisation.',
      amount: wallets.matrix,
      color: 'text-purple-600 dark:text-purple-400',
      badge: 'Available to withdraw',
      action: () => onNavigate('awd')
    },
    {
      title: 'Active Modules',
      legacy: 'was AUM credits',
      desc: 'Total Module Credits Remaining across all climbing Modules. Used over time.',
      amount: activeModulesCredits,
      color: 'text-sky-600 dark:text-sky-400',
      badge: 'Climbing capacity',
      action: () => onNavigate('mine')
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick">Capital Structure</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Balances
          </h1>
          <p className="lbl mt-1">
            Four distinct buckets that never merge. Rewards and purchases are strictly segregated.
          </p>
        </div>

        <button
          onClick={() => {
            sfx.play('cash');
            onAddFunds('purchase', 1000);
          }}
          className="b3 gold sm text-xs inline-flex items-center gap-1.5 shadow"
        >
          <PlusCircle size={15} /> Add $1,000 USDT to Purchase Wallet
        </button>
      </div>

      {/* 4 Buckets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {buckets.map((b) => (
          <div key={b.title} className="card p-6 space-y-4 rounded-2xl border border-slate-300/80 dark:border-slate-700/80 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="chip text-[10px] font-semibold uppercase tracking-wider mb-1">
                  {b.badge}
                </span>
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mt-1">
                  {b.title}
                </h3>
                <span className="text-xs text-rose-500 font-mono">
                  {b.legacy}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <Wallet size={20} />
              </div>
            </div>

            <div className="text-3xl font-light tracking-tight">
              <span className={b.color}>
                ${b.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">
              {b.desc}
            </p>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => {
                  sfx.play('pop');
                  b.action();
                }}
                className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline inline-flex items-center gap-1"
              >
                Manage {b.title} <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="tint p-4 rounded-xl flex items-center gap-3 text-xs text-slate-500">
        <ShieldCheck size={18} className="text-amber-500 flex-none" />
        <p className="leading-relaxed">
          Segregation of funds guarantees that deposit principal is dedicated to credit generation, while daily rewards accumulate into your Rewards Wallet independently.
        </p>
      </div>
    </div>
  );
}


import React from 'react';
import { FOUNDER_SEATS } from '../../data/mockData';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function FounderSeats({ onClaimSeat }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick">Limited Registry</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Founder Seats
          </h1>
          <p className="lbl mt-1">
            260 numbered Founder Seats across six tiers, reading directly from the immutable seat register.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="chip text-xs bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-800">
            Live Register Active
          </span>
        </div>
      </div>

      {/* Founder Seats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FOUNDER_SEATS.map((seat) => {
          const isSoldOut = seat.left === 0;
          const pctLeft = Math.round((seat.left / seat.total) * 100);

          return (
            <div
              key={seat.tier}
              className={`card p-6 space-y-5 rounded-2xl border transition-all ${
                isSoldOut
                  ? 'opacity-70 border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30'
                  : 'border-slate-300/80 dark:border-slate-700/80 hover:shadow-xl'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="kick text-[10px] text-amber-600 dark:text-amber-400">
                    Tier {seat.share} Share
                  </span>
                  <h3 className="text-2xl font-light text-slate-900 dark:text-white mt-0.5">
                    {seat.tier}
                  </h3>
                </div>
                <div className="mark w-10 h-10 rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold text-sm shadow">
                  <Award size={20} />
                </div>
              </div>

              {/* Price & Share */}
              <div className="tint p-3 rounded-xl space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="lbl text-xs">Seat Price:</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    ${seat.price.toLocaleString()} <span className="text-xs text-slate-400 font-normal">USDT</span>
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Turnover Allocation:</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">{seat.share} permanent</span>
                </div>
              </div>

              {/* Seats remaining bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Seats Remaining:</span>
                  <span className={isSoldOut ? 'text-rose-500 font-bold' : 'text-slate-800 dark:text-slate-200'}>
                    {isSoldOut ? 'Sold Out' : `${seat.left} of ${seat.total} left (${pctLeft}%)`}
                  </span>
                </div>
                <div className="well bar h-2.5 rounded-full overflow-hidden p-0.5">
                  <div
                    style={{ width: `${100 - pctLeft}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                  />
                </div>
              </div>

              <button
                disabled={isSoldOut}
                onClick={() => {
                  sfx.play('cash');
                  onClaimSeat(seat);
                }}
                className={`b3 full lg font-bold text-xs justify-center ${
                  isSoldOut ? 'opacity-40 cursor-not-allowed' : 'gold'
                }`}
              >
                {isSoldOut ? 'Tier Fully Claimed' : `Purchase a ${seat.tier} Seat`}
              </button>
            </div>
          );
        })}
      </div>

      <div className="tint p-4 rounded-xl flex items-center gap-3 text-xs text-slate-500">
        <ShieldCheck size={18} className="text-amber-500 flex-none" />
        <p className="leading-relaxed">
          Founder seats receive a perpetual allocation of ecosystem revenue. Seat numbers are assigned sequentially upon transaction confirmation on the BNB Smart Chain ledger.
        </p>
      </div>
    </div>
  );
}


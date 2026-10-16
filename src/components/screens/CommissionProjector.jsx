import React, { useState, useMemo } from 'react';
import { generateDownline } from '../../data/mockData';
import { Sliders, PieChart, TrendingUp, Info, Users } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function CommissionProjector() {
  const [rateBp, setRateBp] = useState(50); // 0.50% default (10 - 100 bp)
  const [zeroPct, setZeroPct] = useState(0); // 0% - 40% no-profit days
  const [horizon, setHorizon] = useState(400); // 90, 180, 400 days
  const [whatIfPct, setWhatIfPct] = useState(0); // 0% - 100% conversion
  const [filterMode, setFilterMode] = useState('all');

  const downline = useMemo(() => generateDownline(), []);

  // Compute projection model
  const proj = useMemo(() => {
    const ENT = { 'No rank yet': 0, Fuji: 6, Kilimanjaro: 12, Matterhorn: 18, Denali: 24, Rainier: 30, 'K-2': 36, Everest: 42 };
    const lineMax = {};
    downline.all.forEach((m) => {
      lineMax[m.line] = Math.max(lineMax[m.line] || 0, ENT[m.rank]);
    });

    const hash = (n, k) => {
      let x = Math.imul(n + 1, 0x9e3779b1) ^ Math.imul(k + 7, 0x85ebca6b);
      x ^= x >>> 15;
      x = Math.imul(x, 0xc2b2ae35);
      x ^= x >>> 13;
      x = Math.imul(x, 0x27d4eb2f);
      x ^= x >>> 16;
      return (x >>> 0) % 100;
    };

    const r = (rateBp / 10000) * (1 - zeroPct / 100);
    const months = Math.ceil(horizon / 30);
    const monthlyOrig = new Array(months).fill(0);
    const monthlyReb = new Array(months).fill(0);

    const sim = (m, rebuy, capMult, age, share) => {
      const P = m.pv;
      let Do = Math.min(age * P * 0.005, capMult * P);
      let Pp = 0;
      let Dp = 0;
      let cO = 0;
      let cR = 0;
      let left = null;

      if (Do >= capMult * P) left = 0;

      for (let t = 1; t <= horizon; t++) {
        let ro = 0;
        if (Do < capMult * P) {
          ro = Math.min(P * r, capMult * P - Do);
          Do += ro;
          if (Do >= capMult * P - 1e-9 && left === null) left = t;
        }
        let rp = 0;
        if (Pp > 0 && Dp < capMult * Pp) {
          rp = Math.min(Pp * r, capMult * Pp - Dp);
          Dp += rp;
        }

        if (rebuy || age + t <= 10) Pp += ro + rp;
        cO += ro * share;
        cR += rp * share;

        const b = Math.floor((t - 1) / 30);
        if (b < months) {
          monthlyOrig[b] += ro * share;
          monthlyReb[b] += rp * share;
        }
      }
      return { cO, cR, left };
    };

    const people = [];
    let tot = 0;
    let totNo = 0;
    let nAr = 0;
    let nBel = 0;
    let nAct = 0;

    downline.all.forEach((m) => {
      if (!m.pv) return;
      nAct++;
      const ar = hash(m.id, 1) < 38;
      const bel = ar && hash(m.id, 2) < 55;
      const extra = !ar && hash(m.id, 3) < whatIfPct;
      if (ar) nAr++;
      if (bel) nBel++;

      const age = hash(m.id, 4) < 6 ? (m.id % 9) + 1 : 11 + ((m.id * 53) % 150);
      const capMult = bel ? 2.2 : 2.0;
      const share = Math.min(0.42, 0.02 + (42 - (lineMax[m.line] || 0)) / 100);

      const a = sim(m, ar || extra, capMult, age, share);
      const b = sim(m, false, capMult, age, share);

      tot += a.cO + a.cR;
      totNo += b.cO + b.cR;

      people.push({
        m,
        ar,
        bel,
        extra,
        age,
        k: capMult,
        left: a.left,
        comm: a.cO + a.cR
      });
    });

    people.sort((x, y) => y.comm - x.comm);

    return {
      people,
      monthlyOrig,
      monthlyReb,
      tot,
      totNo,
      diff: tot - totNo,
      nAr,
      nBel,
      nAct
    };
  }, [downline, rateBp, zeroPct, horizon, whatIfPct]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick text-purple-600 dark:text-purple-400">Forecasting Engine</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Commission Projector
          </h1>
          <p className="lbl mt-1">
            Interactive mathematical model of commissions as active Modules climb towards 2× (2.2× Believer).
          </p>
        </div>

        {/* Horizon selector */}
        <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/70 p-1 rounded-xl">
          {[
            { id: 90, label: '90 Days' },
            { id: 180, label: '180 Days' },
            { id: 400, label: '400 Days (Full Cycle)' }
          ].map((h) => (
            <button
              key={h.id}
              onClick={() => {
                sfx.play('pop');
                setHorizon(h.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                horizon === h.id
                  ? 'b3 gold sm text-xs !min-h-0 !h-7 !py-0'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projection Headline KPI Card */}
      <div className="card p-6 sm:p-8 rounded-3xl border border-purple-300 dark:border-purple-800 bg-gradient-to-br from-purple-500/10 via-amber-500/5 to-transparent space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="lbl text-xs uppercase tracking-wider font-semibold">
              Projected Commission to You ({horizon} Days):
            </span>
            <div className="text-4xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white mt-1">
              ${proj.tot.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              If nobody rebuys: ${proj.totNo.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · Auto-Rebuy adds{' '}
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                +${proj.diff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Donut Stats breakdown */}
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="tint p-3.5 rounded-2xl text-center">
              <span className="lbl text-[10px]">Believers (2.2×)</span>
              <div className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                {proj.nBel} <span className="text-xs text-slate-400">({Math.round((proj.nBel / proj.nAct) * 100)}%)</span>
              </div>
            </div>
            <div className="tint p-3.5 rounded-2xl text-center">
              <span className="lbl text-[10px]">Auto-Rebuy ON</span>
              <div className="text-lg font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                {proj.nAr} <span className="text-xs text-slate-400">({Math.round((proj.nAr / proj.nAct) * 100)}%)</span>
              </div>
            </div>
            <div className="tint p-3.5 rounded-2xl text-center">
              <span className="lbl text-[10px]">Auto-Rebuy OFF</span>
              <div className="text-lg font-bold text-slate-600 dark:text-slate-400 mt-0.5">
                {proj.nAct - proj.nAr} <span className="text-xs text-slate-400">({Math.round(((proj.nAct - proj.nAr) / proj.nAct) * 100)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sliders: Daily Rate, No Profit Days, What-If Conversion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="lbl font-semibold">Assumed Daily Average:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                {(rateBp / 100).toFixed(2)}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={rateBp}
              onChange={(e) => setRateBp(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block">Plan uses standard 0.50%</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="lbl font-semibold">Share of No-Profit Days:</span>
              <span className="font-bold text-rose-500 font-mono">
                {zeroPct}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={zeroPct}
              onChange={(e) => setZeroPct(parseInt(e.target.value, 10))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block">Simulate trading drawdowns</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="lbl font-semibold">What-If: Turn Rebuy ON for:</span>
              <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">
                {whatIfPct}% of OFF
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={whatIfPct}
              onChange={(e) => setWhatIfPct(parseInt(e.target.value, 10))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block">Test team behavioral shift</span>
          </div>
        </div>
      </div>

      {/* Projection Disclaimer */}
      <div className="tint p-4 rounded-xl flex items-start gap-3 text-xs text-slate-500">
        <Info size={18} className="text-amber-500 flex-none mt-0.5" />
        <p className="leading-relaxed">
          This projector is an educational illustration based on mathematical models, not a promise or financial forecast.
          Actual performance fluctuates based on daily arbitrage execution and network line balance.
        </p>
      </div>
    </div>
  );
}


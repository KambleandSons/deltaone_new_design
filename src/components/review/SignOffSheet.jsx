import React, { useState } from 'react';
import { DECISIONS_LIST } from '../../data/mockData';
import { Check, X, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function SignOffSheet() {
  const [decisions, setDecisions] = useState(DECISIONS_LIST);
  const [releaseChecks, setReleaseChecks] = useState({
    terminology: true,
    safariIPhone: true,
    serverBooster: false,
    clockReveal: true,
    lineBalance: true
  });

  const handleVote = (id, newStatus) => {
    sfx.play('pop');
    setDecisions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  const toggleCheck = (k) => {
    sfx.play('pop');
    setReleaseChecks((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const approvedCount = decisions.filter((d) => d.status === 'approved').length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick text-amber-600 dark:text-amber-400">Governance & Approval</span>
          <h1 className="h1 text-3xl sm:text-5xl font-light tracking-tight mt-1">
            Partner Sign-Off Sheet
          </h1>
          <p className="lbl mt-1 max-w-2xl">
            Ten open architectural and compliance decisions, followed by production release checks.
          </p>
        </div>

        <div className="tint px-4 py-2 rounded-2xl flex items-center gap-3">
          <div>
            <span className="text-xs text-slate-500 block">Approval Progress</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {approvedCount} / {decisions.length} Decisions Approved
            </span>
          </div>
        </div>
      </div>

      {/* 10 Decisions Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-light text-slate-900 dark:text-white">
          Decisions for Sign-Off
        </h2>

        <div className="space-y-3">
          {decisions.map((d) => {
            const isApproved = d.status === 'approved';
            const isDeclined = d.status === 'change';

            return (
              <div
                key={d.id}
                className="card p-5 sm:p-6 rounded-2xl border border-slate-300 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:shadow-md transition-all"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">
                      #{d.id}
                    </span>
                    <h3 className="font-semibold text-base text-slate-900 dark:text-white">
                      {d.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {d.body}
                  </p>
                </div>

                {/* Vote buttons */}
                <div className="flex items-center gap-2 flex-none">
                  <button
                    onClick={() => handleVote(d.id, 'approved')}
                    className={`b3 sm text-xs !min-h-0 !h-9 px-4 gap-1.5 ${
                      isApproved
                        ? 'gold font-bold shadow-md'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    onClick={() => handleVote(d.id, 'change')}
                    className={`b3 sm text-xs !min-h-0 !h-9 px-4 gap-1.5 ${
                      isDeclined
                        ? 'bg-rose-500 text-white font-bold border-rose-600 shadow-md'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <X size={14} /> Change
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Release Checklist */}
      <div className="card p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-xl font-light text-slate-900 dark:text-white">
            Pre-Launch Release Verification Checks
          </h2>
          <span className="text-xs text-slate-500">Tech Team Checklist</span>
        </div>

        <div className="space-y-3">
          {[
            { key: 'terminology', title: 'Terminology Cleanliness', desc: 'Zero instances of Contract, Yield, AUM, Principal or Deposit on any customer or Ambassador screen.' },
            { key: 'safariIPhone', title: 'Real iPhone Safari Testing', desc: 'Tested on physical iPhone Safari in both light and dark mode with safe-area viewport insets.' },
            { key: 'serverBooster', title: 'Server-Side Random Generation', desc: 'Module Booster spins run exclusively on server with commit-and-reveal hashes, never in browser.' },
            { key: 'clockReveal', title: '16:00 Dubai Reveal Guarantee', desc: 'Today’s exact daily amount, rate per second, and closed percentage remain hidden until 12:00 UTC.' },
            { key: 'lineBalance', title: 'Line Balance 21-Line Rule', desc: 'Line balance caps strictly applied to the largest lines for Fuji to Everest qualification.' }
          ].map((chk) => (
            <div
              key={chk.key}
              onClick={() => toggleCheck(chk.key)}
              className="tint p-3.5 rounded-xl flex items-center justify-between cursor-pointer hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-all text-xs"
            >
              <div className="space-y-0.5">
                <span className="font-semibold text-slate-900 dark:text-white block text-sm">
                  {chk.title}
                </span>
                <span className="text-slate-500">{chk.desc}</span>
              </div>
              <div
                className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-none ${
                  releaseChecks[chk.key]
                    ? 'bg-amber-400 border-amber-500 text-slate-950 font-bold shadow'
                    : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                {releaseChecks[chk.key] && <Check size={14} strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


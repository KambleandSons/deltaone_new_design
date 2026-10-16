import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Clock, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { sfx } from '../../utils/sfx';

const REEL_SYMBOLS = ['?', 'Δ', '★', '⚡', '✦'];

export default function ModuleBooster({
  modules = [],
  boosts = { 'ΔM-0001': 3, 'ΔM-0002': 1 },
  boostCap = 5,
  offer = null,
  onSpin,
  onAcceptOffer,
  onDropOffer
}) {
  const [selectedModule, setSelectedModule] = useState(modules[0]?.id || 'ΔM-0001');
  const [spinning, setSpinning] = useState(false);
  const [currentSymbol, setCurrentSymbol] = useState('?');
  const [topUpAmount, setTopUpAmount] = useState('500');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const usedSpins = boosts[selectedModule] || 0;
  const remainingSpins = Math.max(0, 10 - usedSpins);

  // Expiry countdown timer for active booster offer
  useEffect(() => {
    if (!offer) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((offer.exp - now) / 1000));
      setTimeLeft(diff);
      if (diff === 0) {
        onDropOffer();
        sfx.play('sad');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [offer, onDropOffer]);

  const handleSpin = () => {
    if (spinning || offer || remainingSpins <= 0) return;
    setSpinning(true);
    sfx.play('pop');

    let count = 0;
    const spinInterval = setInterval(() => {
      count++;
      setCurrentSymbol(REEL_SYMBOLS[count % REEL_SYMBOLS.length]);
      sfx.play('tick');
      if (count > 25) {
        clearInterval(spinInterval);
        // Roll random percentage (0.1% to cap, power law towards smaller percentages)
        const pct = Math.max(0.1, Math.round(boostCap * Math.pow(Math.random(), 2.2) * 10) / 10);
        const isJackpot = pct >= boostCap * 0.8;

        if (isJackpot) {
          sfx.play('jackpot');
          try {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          } catch {}
        } else {
          sfx.play('win');
        }

        setSpinning(false);
        onSpin(selectedModule, pct, isJackpot);
      }
    }, 80);
  };

  const parsedTopUp = parseFloat(topUpAmount) || 0;
  const bonusCredits = offer ? (parsedTopUp * offer.pct) / 100 : 0;
  const totalCreditsDelivered = parsedTopUp + bonusCredits;

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div>
        <span className="kick text-amber-600 dark:text-amber-400">Limited Bonus Spin</span>
        <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
          Module Booster Machine
        </h1>
        <p className="lbl mt-1">
          Top up an active Module with a random bonus percentage. 10 boosters per Module lifetime.
        </p>
      </div>

      {/* Main Booster Machine Card */}
      <div className="card p-6 sm:p-8 rounded-3xl border border-amber-300/40 dark:border-amber-800/40 bg-gradient-to-b from-amber-500/5 to-transparent space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          {/* Target Module Picker */}
          <div>
            <label className="lbl text-xs font-semibold uppercase tracking-wider block mb-1">
              Select Module to Boost:
            </label>
            <div className="flex flex-wrap gap-2">
              {modules.filter((m) => !m.done).map((mod) => (
                <button
                  key={mod.id}
                  disabled={!!offer}
                  onClick={() => {
                    sfx.play('pop');
                    setSelectedModule(mod.id);
                  }}
                  className={`b3 sm text-xs ${
                    selectedModule === mod.id ? 'gold' : ''
                  }`}
                >
                  Module {mod.id}
                </button>
              ))}
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Boosters Remaining</span>
            <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {remainingSpins} <span className="text-xs text-slate-400 font-normal">/ 10 spins</span>
            </span>
          </div>
        </div>

        {/* Spinning Slot Reel Display */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="w-48 h-36 rounded-3xl bg-slate-900 border-4 border-amber-400 flex items-center justify-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
            <span
              className={`text-6xl font-black text-amber-400 transition-all ${
                spinning ? 'scale-125 animate-pulse' : 'scale-100'
              }`}
            >
              {offer ? `+${offer.pct.toFixed(1)}%` : currentSymbol}
            </span>
          </div>

          {!offer ? (
            <button
              disabled={spinning || remainingSpins <= 0}
              onClick={handleSpin}
              className="b3 boost lg px-10 text-base font-bold shadow-2xl uppercase tracking-wider transition-all"
            >
              <Sparkles size={20} className={spinning ? 'animate-spin' : ''} />
              {spinning ? 'Spinning...' : 'BOOST THIS MODULE'}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm">
              <Clock size={16} /> Offer expires in: {formatSeconds(timeLeft)}
            </div>
          )}
        </div>

        {/* Active Booster Offer Panel */}
        {offer && (
          <div className="tint p-6 rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-500/10 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="kick text-xs">Booster Offer Landed!</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  +{offer.pct.toFixed(1)}% Bonus Credits on Module {offer.id}
                </h3>
              </div>
              {offer.jackpot && (
                <span className="chip bg-amber-400 text-slate-950 font-bold border-none px-3 py-1 text-xs">
                  ★ JACKPOT ★
                </span>
              )}
            </div>

            {/* Top-up amount options */}
            <div className="space-y-2">
              <label className="lbl text-xs">Choose Top-Up Amount:</label>
              <div className="flex flex-wrap gap-2">
                {[100, 500, 1000, 2500].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      sfx.play('pop');
                      setTopUpAmount(String(val));
                    }}
                    className={`b3 sm text-xs ${
                      parsedTopUp === val ? 'gold' : ''
                    }`}
                  >
                    ${val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Breakdown calculations */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs pt-2">
              <div className="well p-3 rounded-xl bg-white/70 dark:bg-slate-900/70">
                <span className="lbl text-[11px]">Top-Up Payment</span>
                <div className="font-semibold text-slate-900 dark:text-white mt-1">
                  ${parsedTopUp.toFixed(2)}
                </div>
              </div>
              <div className="well p-3 rounded-xl bg-amber-500/20 border border-amber-300 dark:border-amber-700">
                <span className="lbl text-[11px] text-amber-700 dark:text-amber-400 font-bold">
                  Bonus Credits (+{offer.pct}%)
                </span>
                <div className="font-bold text-amber-600 dark:text-amber-300 mt-1">
                  +${bonusCredits.toFixed(2)}
                </div>
              </div>
              <div className="well p-3 rounded-xl bg-emerald-500/10 border border-emerald-300 dark:border-emerald-800">
                <span className="lbl text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                  Total New Credits
                </span>
                <div className="font-bold text-emerald-600 dark:text-emerald-300 mt-1">
                  ${totalCreditsDelivered.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
              <button
                onClick={onDropOffer}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline font-medium"
              >
                Let this booster go
              </button>

              <button
                onClick={() => {
                  sfx.play('cash');
                  onAcceptOffer(offer.id, parsedTopUp, bonusCredits);
                }}
                className="b3 gold lg font-bold text-sm shadow-xl px-6"
              >
                <CheckCircle2 size={18} /> Boost and Purchase Now
              </button>
            </div>
          </div>
        )}

        {/* Legal & Regulatory Notice */}
        <div className="flex items-start gap-2.5 text-xs text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
          <ShieldCheck size={16} className="text-amber-500 flex-none mt-0.5" />
          <p className="leading-relaxed">
            Booster spins are paid from the DAO Treasury profit reserve, never from members' results or commissions.
            Draft for legal and compliance review before mainnet launch.
          </p>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { Check, AlertCircle, ShoppingBag, Wallet, Info } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function PurchaseModule({
  wallets = { purchase: 0, rewards: 312.4, matrix: 2098.12 },
  onPurchaseSuccess,
  onNavigate
}) {
  const [amount, setAmount] = useState('1000');
  const [usePurchase, setUsePurchase] = useState(true);
  const [useRewards, setUseRewards] = useState(false);
  const [useMatrix, setUseMatrix] = useState(false);

  const parsedAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  const isMinimumMet = parsedAmount >= 1000;

  // Calculate wallet deductions
  let remainingToPay = parsedAmount;
  const takeFrom = (enabled, balance) => {
    if (!enabled) return 0;
    const taken = Math.min(balance, remainingToPay);
    remainingToPay -= taken;
    return taken;
  };

  const fromPurchase = takeFrom(usePurchase, wallets.purchase);
  const fromRewards = takeFrom(useRewards, wallets.rewards);
  const fromMatrix = takeFrom(useMatrix, wallets.matrix);
  const totalFromWallets = fromPurchase + fromRewards + fromMatrix;
  const usdtRequired = Math.max(0, parsedAmount - totalFromWallets);

  const handleConfirm = () => {
    if (!isMinimumMet) return;
    sfx.play('cash');
    onPurchaseSuccess({
      price: parsedAmount,
      fromPurchase,
      fromRewards,
      fromMatrix
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div>
        <span className="kick">New Acquisition</span>
        <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
          Purchase a Module
        </h1>
        <p className="lbl mt-1">
          Each Module holds Module Credits that deliver AI Module Rewards over time. Smallest Module is $1,000.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Credits Amount */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                Module Credits
              </h2>
            </div>

            <div className="inpwrap rounded-2xl well border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50">
              <span className="text-2xl text-slate-400 font-light">$</span>
              <input
                type="number"
                min="1000"
                step="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1,000"
                className="inp font-medium text-3xl"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {[1000, 5000, 10000, 25000].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    sfx.play('pop');
                    setAmount(String(val));
                  }}
                  className={`b3 sm text-xs ${
                    parsedAmount === val ? 'gold' : ''
                  }`}
                >
                  ${val.toLocaleString()}
                </button>
              ))}
            </div>

            {!isMinimumMet && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">
                <AlertCircle size={14} /> The smallest Module is $1,000.
              </div>
            )}
          </div>

          {/* Step 2: Pay From Wallets */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                Pay From
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Select which wallets to pay from first. Any remaining balance is paid in USDT (BEP-20).
            </p>

            <div className="space-y-2.5">
              {[
                { key: 'purchase', label: 'Purchase Wallet', bal: wallets.purchase, active: usePurchase, toggle: () => setUsePurchase(!usePurchase) },
                { key: 'rewards', label: 'Rewards Wallet', bal: wallets.rewards, active: useRewards, toggle: () => setUseRewards(!useRewards) },
                { key: 'matrix', label: 'Matrix Rewards', bal: wallets.matrix, active: useMatrix, toggle: () => setUseMatrix(!useMatrix) }
              ].map((row) => (
                <button
                  key={row.key}
                  onClick={() => {
                    sfx.play('pop');
                    row.toggle();
                  }}
                  className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                    row.active
                      ? 'bg-amber-500/10 border-amber-400 dark:border-amber-600'
                      : 'bg-slate-100/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs ${
                        row.active
                          ? 'bg-amber-400 border-amber-500 text-slate-950 font-bold'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {row.active && <Check size={12} strokeWidth={3} />}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
                        {row.label}
                      </span>
                      <span className="text-xs text-slate-500">
                        Available: ${row.bal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Summary & Confirmation (5 cols) */}
        <div className="lg:col-span-5 card p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">
              Order Summary
            </h2>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="lbl">Module Credits:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ${parsedAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="lbl">Paid from Wallets:</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                -${totalFromWallets.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
              <span className="lbl">To pay in USDT (BEP-20):</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 text-base">
                ${usdtRequired.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Delivery projections */}
          <div className="tint p-4 rounded-xl space-y-2 text-xs">
            <span className="kick text-[10px]">What it delivers</span>
            <div className="flex justify-between">
              <span className="lbl">Standard Cap (2.0×):</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                ${(parsedAmount * 2).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="lbl">Believer Cap (2.2×):</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                ${(parsedAmount * 2.2).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="lbl">About per day (at 0.50% avg):</span>
              <span className="font-medium text-slate-600 dark:text-slate-400">
                ~${(parsedAmount * 0.005).toFixed(2)} / day
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed italic">
            Illustration at the engine's 0.50% average daily result, not a promise. The purchase price is not refundable.
          </p>

          <button
            disabled={!isMinimumMet}
            onClick={handleConfirm}
            className="b3 gold lg full shadow-xl justify-center font-bold text-sm"
          >
            <ShoppingBag size={18} /> Confirm & Purchase Module
          </button>
        </div>
      </div>
    </div>
  );
}


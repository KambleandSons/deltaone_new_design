import React, { useState } from 'react';
import { ArrowUpRight, ShoppingBag, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function WithdrawMatrix({
  matrixBalance = 2098.12,
  payoutAddress = '0x8A14b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7',
  onWithdrawSuccess,
  onNavigate
}) {
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);

  const parsedAmount = Math.max(0, Math.min(parseFloat(amount) || 0, matrixBalance));
  const isMinimumMet = parsedAmount >= 5;
  const remainingAfter = Math.max(0, matrixBalance - parsedAmount);

  const handleChip = (fraction) => {
    sfx.play('pop');
    const val = (Math.floor(matrixBalance * fraction * 100) / 100).toFixed(2);
    setAmount(val);
  };

  const handleWithdraw = () => {
    if (!isMinimumMet) return;
    sfx.play('cash');
    setSuccess(true);
    onWithdrawSuccess(parsedAmount);
    setTimeout(() => {
      setSuccess(false);
      setAmount('');
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div>
        <span className="kick text-purple-600 dark:text-purple-400">Ambassador Payout</span>
        <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
          Withdraw Matrix Rewards
        </h1>
        <p className="lbl mt-1">
          Withdraw earned matrix bonuses and breakage differential to your payout address, or use them to purchase a new Module.
        </p>
      </div>

      <div className="card p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-700 space-y-6">
        {/* Available Matrix Balance */}
        <div className="tint p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="lbl text-xs">Available Matrix Rewards:</span>
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-0.5">
              ${matrixBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs text-slate-500 font-normal">USDT</span>
            </div>
          </div>
          <span className="chip text-xs">Ambassador commission wallet</span>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="lbl text-xs font-semibold">Withdrawal Amount:</label>
          <div className="inpwrap rounded-2xl well border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50">
            <span className="text-2xl text-slate-400 font-light">$</span>
            <input
              type="number"
              min="5"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="inp text-2xl sm:text-3xl font-medium"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { label: '25%', frac: 0.25 },
              { label: '50%', frac: 0.50 },
              { label: '75%', frac: 0.75 },
              { label: 'Max', frac: 1.0 }
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleChip(chip.frac)}
                className="b3 sm text-xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {amount && !isMinimumMet && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium pt-1">
              <AlertCircle size={14} /> Minimum withdrawal is 5 USDT.
            </div>
          )}
        </div>

        {/* Payout Destination */}
        <div className="space-y-1 text-xs">
          <span className="lbl font-semibold">Recipient Payout Address (BEP-20):</span>
          <div className="tint p-3 rounded-xl font-mono text-slate-700 dark:text-slate-300 break-all select-all">
            {payoutAddress}
          </div>
        </div>

        {/* Calculations */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex justify-between py-1">
            <span className="lbl">You will receive:</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              ${parsedAmount.toFixed(2)} USDT
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="lbl">Matrix Rewards remaining after:</span>
            <span className="font-medium text-slate-600 dark:text-slate-400">
              ${remainingAfter.toFixed(2)} USDT
            </span>
          </div>
        </div>

        {success ? (
          <div className="tint p-4 rounded-xl bg-emerald-500/10 border border-emerald-400 text-emerald-700 dark:text-emerald-300 flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 size={16} /> Withdrawal of ${parsedAmount.toFixed(2)} USDT successfully queued for payout!
          </div>
        ) : (
          <button
            disabled={!isMinimumMet || parsedAmount > matrixBalance}
            onClick={handleWithdraw}
            className="b3 gold lg full shadow-xl justify-center font-bold text-sm"
          >
            <ArrowUpRight size={18} /> Confirm Matrix Withdrawal
          </button>
        )}

        {/* Option to purchase a Module */}
        <div className="tint p-4 rounded-2xl flex items-center justify-between gap-4 border border-purple-200 dark:border-purple-800/60">
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
              Reinvest into a new Module?
            </h4>
            <p className="text-xs text-slate-500">
              Use your Matrix Rewards directly towards purchasing new Module Credits.
            </p>
          </div>
          <button
            onClick={() => onNavigate('purchase')}
            className="b3 sm text-xs inline-flex items-center gap-1.5 flex-none"
          >
            <ShoppingBag size={14} /> Purchase Module
          </button>
        </div>
      </div>
    </div>
  );
}


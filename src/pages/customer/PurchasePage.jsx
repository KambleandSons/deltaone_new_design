import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function PurchasePage() {
  const navigate = useNavigate();
  const { wallets, purchaseModule, fmt, usd } = useBackOffice();

  const [amount, setAmount] = useState('1000');
  const [payP, setPayP] = useState(true);
  const [payR, setPayR] = useState(false);
  const [payM, setPayM] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  const isAmountLow = numAmount < 1000;

  // Calculation of wallet splits
  let left = numAmount;
  const take = (on, bal) => {
    if (!on) return 0;
    const t = Math.min(bal, left);
    left -= t;
    return t;
  };
  const fromP = take(payP, wallets.purchase);
  const fromR = take(payR, wallets.rewards);
  const fromM = take(payM, wallets.matrix);
  const totalFromWallets = fromP + fromR + fromM;
  const paidInUsdt = Math.max(0, numAmount - totalFromWallets);

  const handlePurchase = async () => {
    if (isAmountLow || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await purchaseModule({ amount: numAmount, payP, payR, payM });
      navigate('/my-modules');
    } finally {
      setIsSubmitting(false);
    }
  };

  const amountChips = [1000, 2500, 5000, 10000, 25000];

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Purchase a Module</h1>
        <div className="lbl">Your wallets pay first. Anything they don't cover is paid in USDT (BEP-20).</div>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button className="b3 sm on gold">1 · Module Credits</button>
        <button className="b3 sm">2 · Pay from</button>
        <button className="b3 sm">3 · Confirm</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        {/* Left Input Configuration Card */}
        <div className="card" style={{ flex: '3 1 340px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <label htmlFor="amt" className="kick">
            How many Module Credits?
          </label>
          <div className="well inpwrap">
            <span className="num" aria-hidden="true">$</span>
            <input
              id="amt"
              className="inp"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span className="small">USDT</span>
          </div>

          {isAmountLow && (
            <div className="warn" style={{ fontSize: '13px' }}>
              The smallest Module is $1,000.
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {amountChips.map((chip) => (
              <button
                key={chip}
                className={`b3 sm ${numAmount === chip ? 'on gold' : ''}`}
                onClick={() => {
                  sfx.play('pop');
                  setAmount(String(chip));
                }}
              >
                ${chip.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="kick" style={{ marginTop: '6px' }}>Pay from</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              className={`b3 full ${payP ? 'on gold' : ''}`}
              onClick={() => { sfx.play('pop'); setPayP(!payP); }}
              style={{ justifyContent: 'space-between' }}
              aria-pressed={payP}
            >
              <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="well" style={{ width: '20px', height: '20px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>
                  {payP ? '✓' : ''}
                </span>
                Purchase Wallet
              </span>
              <span style={{ fontWeight: 400 }}>{fmt(wallets.purchase)} USDT</span>
            </button>

            <button
              className={`b3 full ${payR ? 'on gold' : ''}`}
              onClick={() => { sfx.play('pop'); setPayR(!payR); }}
              style={{ justifyContent: 'space-between' }}
              aria-pressed={payR}
            >
              <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="well" style={{ width: '20px', height: '20px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>
                  {payR ? '✓' : ''}
                </span>
                Rewards Wallet
              </span>
              <span style={{ fontWeight: 400 }}>{fmt(wallets.rewards)} USDT</span>
            </button>

            <button
              className={`b3 full ${payM ? 'on gold' : ''}`}
              onClick={() => { sfx.play('pop'); setPayM(!payM); }}
              style={{ justifyContent: 'space-between' }}
              aria-pressed={payM}
            >
              <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="well" style={{ width: '20px', height: '20px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>
                  {payM ? '✓' : ''}
                </span>
                Matrix Rewards
              </span>
              <span style={{ fontWeight: 400 }}>{fmt(wallets.matrix)} USDT</span>
            </button>
          </div>

          <div className="tint" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
            <span className="lbl">Paid in USDT (BEP-20)</span>
            <b style={{ fontWeight: 500 }}>{fmt(paidInUsdt)} USDT</b>
          </div>
        </div>

        {/* Right Summary Card */}
        <div className="card" style={{ flex: '2 1 280px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="kick">Your Module</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">Module Credits</span>
            <b style={{ fontWeight: 500 }}>{usd(numAmount)}</b>
          </div>
          <div className="well bar">
            <div className="fill-cr" style={{ width: '100%' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">From your wallets</span>
            <span>{usd(totalFromWallets)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">Paid in USDT</span>
            <span>{usd(paidInUsdt)}</span>
          </div>
          <div style={{ height: '1px', background: 'var(--line)' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">Most it can deliver, 2×</span>
            <b style={{ fontWeight: 500 }}>{usd(numAmount * 2)}</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">Believer, Auto-Rebuy on for life</span>
            <span>Included</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">AI Module Rewards, on average</span>
            <span>about {usd(numAmount * 0.005)} a day</span>
          </div>
          <div className="small">
            Illustration at the engine's 0.50% average daily result, not a promise. Days vary from zero to several percent; a no-profit day pays nothing. The purchase price is not refundable.
          </div>
          <button
            className="b3 gold lg"
            onClick={handlePurchase}
            disabled={isAmountLow || isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Purchase Module'}
          </button>
        </div>
      </div>
    </section>
  );
}

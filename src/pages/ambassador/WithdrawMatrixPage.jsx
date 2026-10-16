import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { ambassadorApi } from '../../services/api';
import { sfx } from '../../utils/sfx';

export default function WithdrawMatrixPage() {
  const { wallets, setWallets, fmt, setEventText } = useBackOffice();

  const [amount, setAmount] = useState('0');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const matrixBal = wallets.matrix;
  const canWithdraw = numAmount >= 5 && numAmount <= matrixBal && address.trim().length > 0;

  const handleSetShare = (pct) => {
    sfx.play('pop');
    setAmount((matrixBal * pct).toFixed(2));
  };

  const handleWithdraw = async () => {
    if (!canWithdraw || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await ambassadorApi.requestMatrixWithdrawal({ amount: numAmount, address });
      setWallets((prev) => ({ ...prev, matrix: prev.matrix - numAmount }));
      sfx.play('cash');
      setEventText(`Matrix withdrawal of $${fmt(numAmount)} USDT submitted to blockchain queue.`);
      setAmount('0');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Withdraw Matrix Rewards</h1>
        <div className="lbl">Base matrix and breakage differential rewards sent to your payout address.</div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        <div className="card" style={{ flex: '3 1 340px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="kick">Matrix Rewards Wallet</div>
          <div className="numxl">{fmt(matrixBal)} <span className="small">USDT</span></div>
          <div className="small">
            Minimum 5 USDT · processed on BNB Smart Chain (BEP-20) · arrives in approximately 15 minutes.
          </div>

          <label htmlFor="mamt" className="kick" style={{ marginTop: '6px' }}>Amount</label>
          <div className="well inpwrap">
            <input
              id="mamt"
              className="inp"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span className="small">USDT</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="b3 sm" onClick={() => handleSetShare(0.25)}>25%</button>
            <button className="b3 sm" onClick={() => handleSetShare(0.50)}>50%</button>
            <button className="b3 sm" onClick={() => handleSetShare(0.75)}>75%</button>
            <button className="b3 sm" onClick={() => handleSetShare(1.00)}>Max</button>
          </div>

          <label className="kick" style={{ marginTop: '8px' }}>Payout address (BEP-20)</label>
          <div className="well inpwrap" style={{ padding: '10px 14px' }}>
            <input
              className="inp"
              style={{ fontSize: '15px' }}
              placeholder="0x..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">You'll receive</span>
            <b style={{ fontWeight: 500 }}>{fmt(numAmount)} USDT</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">Matrix Rewards remaining after</span>
            <span>{fmt(Math.max(0, matrixBal - numAmount))} USDT</span>
          </div>

          <button
            className="b3 gold lg"
            onClick={handleWithdraw}
            disabled={!canWithdraw || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : `Withdraw Matrix Rewards (${fmt(numAmount)} USDT)`}
          </button>
        </div>

        <div className="card" style={{ flex: '2 1 260px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="kick">Security & Blockchain Rules</div>
          <div className="small">
            Matrix Rewards are earned from trading yield within your personal organization lines. Only withdraw to a wallet where you control the private key (e.g. MetaMask, Trust Wallet). Do not withdraw directly to exchange addresses that require memo tags.
          </div>
        </div>
      </div>
    </section>
  );
}

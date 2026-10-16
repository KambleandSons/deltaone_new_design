import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function WithdrawPage() {
  const { wallets, withdrawRewards, fmt } = useBackOffice();

  const [wAmount, setWAmount] = useState('0');
  const [address, setAddress] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [recentRequests, setRecentRequests] = useState([]);

  const numAmount = parseFloat(wAmount) || 0;
  const rewardsBal = wallets.rewards;
  const receiveAmount = Math.max(0, numAmount);
  const remainingAfter = Math.max(0, rewardsBal - numAmount);
  const canWithdraw = numAmount >= 5 && numAmount <= rewardsBal && address.trim().length > 0;

  const handleSetShare = (pct) => {
    sfx.play('pop');
    const val = (rewardsBal * pct).toFixed(2);
    setWAmount(val);
  };

  const handleWithdraw = async () => {
    if (!canWithdraw) return;
    const ok = await withdrawRewards(numAmount, address);
    if (ok) {
      setRecentRequests((prev) => [
        {
          id: Date.now(),
          amount: numAmount,
          time: 'Just now',
          status: 'Processing',
          address: `${address.slice(0, 6)}…${address.slice(-4)}`
        },
        ...prev
      ]);
      setWAmount('0');
    }
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Withdraw</h1>
        <div className="lbl">Module Rewards to your payout address.</div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        {/* Left Form Card */}
        <div className="card" style={{ flex: '3 1 340px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="kick">Rewards Wallet</div>
          <div className="lbl">Matrix Rewards are withdrawn in the Ambassador app.</div>
          <div className="numxl">{fmt(rewardsBal)} <span className="small">USDT</span></div>
          <div className="small">
            No daily limit · Minimum 5 USDT · one request per day (UTC) · Withdrawals arrive in approximately 15 minutes.
          </div>

          <label htmlFor="wamt" className="kick" style={{ marginTop: '6px' }}>Amount</label>
          <div className="well inpwrap">
            <input
              id="wamt"
              className="inp"
              inputMode="decimal"
              value={wAmount}
              onChange={(e) => setWAmount(e.target.value)}
            />
            <span className="small">USDT</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="b3 sm" onClick={() => handleSetShare(0.25)}>25%</button>
            <button className="b3 sm" onClick={() => handleSetShare(0.50)}>50%</button>
            <button className="b3 sm" onClick={() => handleSetShare(0.75)}>75%</button>
            <button className="b3 sm" onClick={() => handleSetShare(1.00)}>Max</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">You'll receive</span>
            <b style={{ fontWeight: 500 }}>{fmt(receiveAmount)} USDT</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">Rewards remaining after</span>
            <span>{fmt(remainingAfter)} USDT</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <span className="lbl">To</span>
            <span>{address ? `${address.slice(0, 8)}…${address.slice(-6)}` : 'Not set'}</span>
          </div>

          {!address ? (
            <button
              className="b3 gold lg"
              onClick={() => setShowAddAddress(!showAddAddress)}
            >
              {showAddAddress ? 'Hide address form' : 'Add a payout address'}
            </button>
          ) : (
            <button
              className="b3 gold lg"
              onClick={handleWithdraw}
              disabled={!canWithdraw}
            >
              Withdraw {fmt(numAmount)} USDT
            </button>
          )}

          {showAddAddress && !address && (
            <div className="well" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label className="lbl">Enter USDT (BEP-20 / BNB Chain) Address:</label>
              <input
                type="text"
                className="inp"
                style={{ fontSize: '15px' }}
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                className="b3 sm gold"
                onClick={() => {
                  sfx.play('pop');
                  setShowAddAddress(false);
                }}
              >
                Save Payout Address
              </button>
            </div>
          )}
        </div>

        {/* Right Info Cards */}
        <div style={{ flex: '2 1 260px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <span className="kick">Payout address</span>
              <button
                className="b3 sm"
                onClick={() => setShowAddAddress(true)}
              >
                {address ? 'Edit' : 'Add'}
              </button>
            </div>
            <div className="lbl">
              {address ? address : 'No payout address yet. Withdrawals are sent only to this address.'}
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="kick">Recent requests</div>
            {recentRequests.length === 0 ? (
              <div className="lbl">No withdrawal requests yet.</div>
            ) : (
              recentRequests.map((req) => (
                <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  <div>
                    <b>{fmt(req.amount)} USDT</b>
                    <div className="small">{req.time} · {req.address}</div>
                  </div>
                  <span className="chip"><span className="good">{req.status}</span></span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

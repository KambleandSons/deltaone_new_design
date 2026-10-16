import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function BalancesPage() {
  const navigate = useNavigate();
  const { wallets, setWallets, totals, fmt, setEventText } = useBackOffice();

  const handleAddUsdt = () => {
    sfx.play('cash');
    setWallets((prev) => ({ ...prev, purchase: prev.purchase + 1000 }));
    setEventText('+1,000 USDT added to Purchase Wallet.');
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Balances</h1>
        <div className="lbl">Four separate buckets. They never mix.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '18px' }}>
        {/* Purchase Wallet */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="kick">Purchase Wallet</div>
          <div className="numxl">{fmt(wallets.purchase)} <span className="small">USDT</span></div>
          <div className="lbl">USDT you have added. Use it to purchase a Module or a Founder Seat.</div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
            <button className="b3 gold" onClick={() => { sfx.play('pop'); navigate('/purchase'); }}>
              Purchase a Module
            </button>
            <button className="b3" onClick={handleAddUsdt}>
              Add USDT
            </button>
          </div>
        </div>

        {/* Rewards Wallet */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="kick">Rewards Wallet</div>
          <div className="numxl">{fmt(wallets.rewards)} <span className="small">USDT</span></div>
          <div className="lbl">
            AI Module Rewards ready to use. Withdraw from 5 USDT, once a day (UTC), or use them to purchase a Module.
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
            <button className="b3 gold" onClick={() => { sfx.play('pop'); navigate('/withdraw'); }}>
              Withdraw
            </button>
            <button className="b3" onClick={() => { sfx.play('pop'); navigate('/purchase'); }}>
              Purchase a Module
            </button>
          </div>
        </div>

        {/* Matrix Rewards */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="kick">Matrix Rewards</div>
          <div className="numxl">{fmt(wallets.matrix)} <span className="small">USDT</span></div>
          <div className="lbl">
            Matrix Rewards from your network. Withdraw them in the Ambassador app, or use them to purchase a Module.
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
            <button className="b3 gold" onClick={() => { sfx.play('pop'); navigate('/purchase'); }}>
              Purchase a Module
            </button>
            <button className="b3" onClick={() => { sfx.play('pop'); navigate('/ambassador/dashboard'); }}>
              Open Ambassador
            </button>
          </div>
        </div>

        {/* Active Modules */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="kick">Active Modules</div>
          <div className="numxl">{totals.remaining}</div>
          <div className="lbl">
            Module Credits Remaining in {totals.count} active Modules. Credits are used as the AI Module delivers rewards; they cannot be withdrawn.
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
            <button className="b3 gold" onClick={() => { sfx.play('pop'); navigate('/my-modules'); }}>
              View my Modules
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

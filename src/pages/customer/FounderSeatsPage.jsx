import React from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function FounderSeatsPage() {
  const { setEventText, setBoltMood, setBoltMsg } = useBackOffice();

  const tiers = [
    { tier: 'Tier 1', total: 5, left: 1, price: 100000, revenueShare: '0.50% pool' },
    { tier: 'Tier 2', total: 10, left: 2, price: 50000, revenueShare: '0.25% pool' },
    { tier: 'Tier 3', total: 20, left: 5, price: 25000, revenueShare: '0.125% pool' },
    { tier: 'Tier 4', total: 50, left: 12, price: 10000, revenueShare: '0.05% pool' },
    { tier: 'Tier 5', total: 75, left: 18, price: 5000, revenueShare: '0.025% pool' },
    { tier: 'Tier 6', total: 100, left: 34, price: 2500, revenueShare: '0.0125% pool' }
  ];

  const handleClaim = (t) => {
    sfx.play('cheer');
    setEventText(`Founder Seat claimed: ${t.tier} allocation confirmed on registry.`);
    setBoltMood('love');
    setBoltMsg(`Congratulations on securing a permanent ${t.tier} Founder Seat!`);
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Founder Seats</h1>
        <div className="lbl">
          The 260 numbered Founder Seats in six tiers, with seats left straight from the seat register.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '18px' }}>
        {tiers.map((t) => (
          <div key={t.tier} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="kick">{t.tier}</span>
              <span className="chip">{t.left} of {t.total} seats left</span>
            </div>
            <div className="numxl" style={{ fontWeight: 400 }}>
              ${t.price.toLocaleString()} <span className="small">USDT</span>
            </div>
            <div className="lbl">Permanent revenue allocation: {t.revenueShare}</div>
            <div className="small">Seats are numbered in the order they are secured.</div>
            <button
              className="b3 gold full"
              style={{ marginTop: 'auto' }}
              onClick={() => handleClaim(t)}
            >
              Purchase a {t.tier} Seat
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

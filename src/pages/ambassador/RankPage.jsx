import React, { useState } from 'react';
import { sfx } from '../../utils/sfx';

export default function RankPage() {
  const [selectedRank, setSelectedRank] = useState('Everest');

  const rankData = {
    'No rank yet': { pv: 0, enrollees: 0, tv: 0, cap: '100%', diff: '0%', levels: '—' },
    Fuji: { pv: 1000, enrollees: 2, tv: 2000, cap: '50% ($1,000)', diff: '6%', levels: 'Levels 1–3' },
    Kilimanjaro: { pv: 2500, enrollees: 3, tv: 5000, cap: '50% ($2,500)', diff: '12%', levels: 'Levels 1–6' },
    Matterhorn: { pv: 6000, enrollees: 4, tv: 12000, cap: '33.3% ($4,000)', diff: '18%', levels: 'Levels 1–9' },
    Denali: { pv: 12000, enrollees: 5, tv: 25000, cap: '33.3% ($8,333)', diff: '24%', levels: 'Levels 1–12' },
    Rainier: { pv: 25000, enrollees: 7, tv: 75000, cap: '25% ($18,750)', diff: '30%', levels: 'Levels 1–15' },
    'K-2': { pv: 50000, enrollees: 12, tv: 250000, cap: '20% ($50,000)', diff: '36%', levels: 'Levels 1–18' },
    Everest: { pv: 200000, enrollees: 21, tv: 1000000, cap: '20% ($200,000)', diff: '42%', levels: 'Levels 1–21' }
  };

  const ranks = ['Fuji', 'Kilimanjaro', 'Matterhorn', 'Denali', 'Rainier', 'K-2', 'Everest'];
  const cur = rankData[selectedRank] || rankData.Everest;

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Rank & Summits</h1>
        <div className="lbl">The 7 Summits progression: own Modules, personal enrollees, volume and line balance.</div>
      </div>

      {/* Ladder Rungs */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="kick">The 7 Summits Ladder</div>
        <div className="ladder" role="tablist">
          {ranks.map((r, i) => {
            const isSelected = selectedRank === r;
            const h = 70 + i * 16;
            return (
              <button
                key={r}
                className={`rung ${isSelected ? 'on' : ''}`}
                style={{ '--h': `${h}px` }}
                onClick={() => {
                  sfx.play('pop');
                  setSelectedRank(r);
                }}
                role="tab"
                aria-selected={isSelected}
              >
                <div className="rbot" style={{ width: '32px', height: '36px' }}>
                  <svg viewBox="0 0 40 46" aria-hidden="true" focusable="false">
                    <use href="#mbolt"></use>
                    {r === 'Everest' && <use href="#mcrown"></use>}
                  </svg>
                </div>
                <div className="rname">{r}</div>
                <div className="rlev">L{3 * (i + 1)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Rank Requirements Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '2px solid #F4B61C' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="kick">Requirements for {selectedRank}</div>
            <h2 className="h2">{selectedRank} Summit Qualification</h2>
          </div>
          <span className="chip"><b className="good">Differential: {cur.diff}</b></span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '14px' }}>
          <div className="well" style={{ padding: '14px' }}>
            <div className="lbl">Own active Modules (PV)</div>
            <div className="num" style={{ fontSize: '24px' }}>${cur.pv.toLocaleString()}</div>
          </div>
          <div className="well" style={{ padding: '14px' }}>
            <div className="lbl">Personal Enrollees</div>
            <div className="num" style={{ fontSize: '24px' }}>{cur.enrollees}</div>
          </div>
          <div className="well" style={{ padding: '14px' }}>
            <div className="lbl">Qualifying Team Volume</div>
            <div className="num" style={{ fontSize: '24px' }}>${cur.tv.toLocaleString()}</div>
          </div>
          <div className="well" style={{ padding: '14px' }}>
            <div className="lbl">Max single leg cap</div>
            <div className="num" style={{ fontSize: '24px' }}>{cur.cap}</div>
          </div>
        </div>

        <div className="small">
          <b>Line Balance Rule:</b> Volume from each personal enrollment line counts toward the summit up to the leg cap. This ensures leaders build broad, resilient sales teams rather than relying on a single deep leg.
        </div>
      </div>
    </section>
  );
}

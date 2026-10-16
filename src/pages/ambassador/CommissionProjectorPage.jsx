import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function CommissionProjectorPage() {
  const { fmt } = useBackOffice();

  const [horizonDays, setHorizonDays] = useState(180); // 90 | 180 | 400
  const [filter, setFilter] = useState('all'); // 'all' | 'believers' | 'rebuy'
  const [rateBp, setRateBp] = useState(50); // 0.50% daily

  const projectedPeople = [
    { id: 1, name: 'Ambassador 001', line: 1, rank: 'K-2', pv: 50000, rebuy: true, believer: true, age: 42, projected: 14200.00 },
    { id: 2, name: 'Ambassador 002', line: 2, rank: 'Rainier', pv: 25000, rebuy: true, believer: false, age: 28, projected: 8400.00 },
    { id: 3, name: 'Ambassador 003', line: 1, rank: 'Rainier', pv: 25000, rebuy: true, believer: true, age: 95, projected: 7800.00 },
    { id: 4, name: 'Ambassador 004', line: 2, rank: 'Denali', pv: 12000, rebuy: false, believer: false, age: 110, projected: 3100.00 },
    { id: 5, name: 'Ambassador 005', line: 3, rank: 'Matterhorn', pv: 6000, rebuy: true, believer: true, age: 14, projected: 2200.00 }
  ];

  const filteredPeople = projectedPeople.filter((p) => {
    if (filter === 'believers') return p.believer;
    if (filter === 'rebuy') return p.rebuy;
    return true;
  });

  const totalProjected = filteredPeople.reduce((sum, p) => sum + p.projected, 0);
  const fromOriginal = totalProjected * 0.42;
  const fromRebuys = totalProjected * 0.58;

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Commission Projector</h1>
        <div className="lbl">
          Shows who in your organisation is on Auto-Rebuy or a Believer, and projects what their Modules could pay you over the rest of their life cycle.
        </div>
      </div>

      {/* Projection Settings Card */}
      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className={`b3 sm ${horizonDays === 90 ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setHorizonDays(90); }}
          >
            Next 90 days
          </button>
          <button
            className={`b3 sm ${horizonDays === 180 ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setHorizonDays(180); }}
          >
            Next 180 days
          </button>
          <button
            className={`b3 sm ${horizonDays === 400 ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setHorizonDays(400); }}
          >
            Full cycle (400 days)
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className={`b3 sm ${filter === 'all' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setFilter('all'); }}
          >
            Everyone
          </button>
          <button
            className={`b3 sm ${filter === 'believers' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setFilter('believers'); }}
          >
            Believers only
          </button>
          <button
            className={`b3 sm ${filter === 'rebuy' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setFilter('rebuy'); }}
          >
            Auto-Rebuy on
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Projected Total</div>
          <div className="numxl" style={{ color: 'var(--goldink)' }}>${fmt(totalProjected)}</div>
          <div className="small">Over next {horizonDays} days at {(rateBp / 100).toFixed(2)}%</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">From Original Modules</div>
          <div className="num">${fmt(fromOriginal)}</div>
          <div className="small">Existing capital climbing</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">From Auto-Rebuys</div>
          <div className="num" style={{ color: 'var(--good)' }}>${fmt(fromRebuys)}</div>
          <div className="small">Compounding rebuy modules</div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Ambassador</th>
                <th>Rank</th>
                <th>Line</th>
                <th>Active PV</th>
                <th>Settings</th>
                <th className="r">Projected Differential</th>
              </tr>
            </thead>
            <tbody>
              {filteredPeople.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td><span className="chip">{p.rank}</span></td>
                  <td>Line {p.line}</td>
                  <td>${p.pv.toLocaleString()}</td>
                  <td>
                    <span style={{ display: 'flex', gap: '6px' }}>
                      {p.believer && <span className="chip good">Believer 2.2×</span>}
                      {p.rebuy && <span className="chip">Auto-Rebuy</span>}
                    </span>
                  </td>
                  <td className="r" style={{ fontWeight: 600, color: 'var(--good)' }}>
                    ${fmt(p.projected)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="small">
        Illustrative projection at a constant 0.50% daily average. Trading results fluctuate daily and a no-profit day delivers zero commission.
      </div>
    </section>
  );
}

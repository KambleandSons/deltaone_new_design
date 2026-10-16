import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function AmbassadorDashboardPage() {
  const navigate = useNavigate();
  const { wallets, fmt } = useBackOffice();

  const lines = [
    { line: 1, leader: 'Ambassador 001', rank: 'K-2', vol: 259722.84, members: 69, barPct: 100 },
    { line: 2, leader: 'Ambassador 002', rank: 'Rainier', vol: 205000.00, members: 54, barPct: 78 },
    { line: 3, leader: 'Ambassador 003', rank: 'Rainier', vol: 160000.00, members: 42, barPct: 61 },
    { line: 4, leader: 'Ambassador 004', rank: 'Denali', vol: 120000.00, members: 33, barPct: 46 },
    { line: 5, leader: 'Ambassador 005', rank: 'Matterhorn', vol: 95000.00, members: 27, barPct: 36 }
  ];

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 className="h1">Ambassador Dashboard</h1>
          <div className="lbl">Your network, rank progress and breakage differential commissions.</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="b3" onClick={() => { sfx.play('pop'); navigate('/ambassador/tree'); }}>
            Network Tree
          </button>
          <button className="b3" onClick={() => { sfx.play('pop'); navigate('/ambassador/downline'); }}>
            Downline
          </button>
          <button className="b3 gold" onClick={() => { sfx.play('pop'); navigate('/ambassador/projector'); }}>
            Commission Projector
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Current Rank</div>
          <div className="num" style={{ color: '#8E4EC6', fontWeight: 600 }}>Everest</div>
          <div className="small">Top summit · 42% differential</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Personal Volume</div>
          <div className="num">$200,000</div>
          <div className="small">Own active Module Credits</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Team Volume</div>
          <div className="num">$1,240,000</div>
          <div className="small">Across 21 enrolled lines</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Matrix Rewards</div>
          <div className="num">${fmt(wallets.matrix)}</div>
          <div style={{ marginTop: '6px' }}>
            <button className="b3 sm gold" onClick={() => { sfx.play('pop'); navigate('/ambassador/withdraw'); }}>
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Rank Ladder Summit Highlight */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div className="kick">Summit Advancement</div>
            <h2 className="h2">Everest · Level 21 Summit</h2>
          </div>
          <button className="b3 sm" onClick={() => { sfx.play('pop'); navigate('/ambassador/rank'); }}>
            View Rank Requirements
          </button>
        </div>

        <div className="well" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="lbl">Qualifying Volume Requirement: $1,000,000</span>
            <b className="good">100% Met</b>
          </div>
          <div className="bar" style={{ height: '16px', background: 'rgba(0,0,0,.15)', borderRadius: '8px', overflow: 'hidden' }}>
            <div className="fill-gd" style={{ width: '100%' }}></div>
          </div>
          <div className="small">
            40% line balance rule checked: no single leg contributes more than $200,000 toward summit qualification.
          </div>
        </div>
      </div>

      {/* Top Organization Lines */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="kick">Your Lines</div>
            <h2 className="h2">Top performing enrollment legs</h2>
          </div>
          <button className="b3 sm" onClick={() => { sfx.play('pop'); navigate('/ambassador/team'); }}>
            View all 21 lines
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Line</th>
                <th>Leader</th>
                <th>Leader Rank</th>
                <th className="r">Line Volume</th>
                <th className="r">Members</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.line}>
                  <td style={{ fontWeight: 600 }}>Line {l.line}</td>
                  <td>{l.leader}</td>
                  <td>
                    <span className="chip">{l.rank}</span>
                  </td>
                  <td className="r" style={{ fontWeight: 600 }}>${l.vol.toLocaleString()}</td>
                  <td className="r">{l.members}</td>
                  <td style={{ width: '120px' }}>
                    <div style={{ width: '100%', height: '8px', background: 'var(--well)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div className="fill-cr" style={{ width: `${l.barPct}%` }}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

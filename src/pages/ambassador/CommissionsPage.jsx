import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function CommissionsPage() {
  const navigate = useNavigate();
  const { fmt } = useBackOffice();

  const dailyCommissions = [
    { date: '14 Oct 2026', base: 142.50, diff: 320.10, total: 462.60 },
    { date: '13 Oct 2026', base: 138.20, diff: 305.40, total: 443.60 },
    { date: '12 Oct 2026', base: 0.00, diff: 0.00, total: 0.00 }, // no-profit day
    { date: '11 Oct 2026', base: 155.00, diff: 342.80, total: 497.80 },
    { date: '10 Oct 2026', base: 140.10, diff: 310.00, total: 450.10 },
    { date: '09 Oct 2026', base: 162.40, diff: 368.50, total: 530.90 },
    { date: '08 Oct 2026', base: 148.00, diff: 325.20, total: 473.20 }
  ];

  const totalBase = dailyCommissions.reduce((acc, c) => acc + c.base, 0);
  const totalDiff = dailyCommissions.reduce((acc, c) => acc + c.diff, 0);
  const grandTotal = totalBase + totalDiff;

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 className="h1">Commissions</h1>
          <div className="lbl">Your base matrix and breakage differential commissions, day by day.</div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="b3" onClick={() => { sfx.play('pop'); navigate('/ambassador/reports'); }}>
            Commission reports
          </button>
          <button className="b3 gold" onClick={() => { sfx.play('pop'); navigate('/ambassador/projector'); }}>
            Commission projector
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Base Matrix</div>
          <div className="num">${fmt(totalBase)}</div>
          <div className="small">Last 7 settlements</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Breakage Differential</div>
          <div className="num">${fmt(totalDiff)}</div>
          <div className="small">Across all personal lines</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Total Commissions</div>
          <div className="num" style={{ color: 'var(--goldink)' }}>${fmt(grandTotal)}</div>
          <div className="small">Credited to Matrix Rewards</div>
        </div>
      </div>

      {/* Stacked Chart & Daily Records */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="kick">Daily Breakdown</div>
            <h2 className="h2">Commissions per settlement</h2>
          </div>
          <div>
            <span className="key kb"></span> <span className="small">Base matrix</span>
            <span className="key kd"></span> <span className="small">Differential</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Settlement Date</th>
                <th className="r">Base Matrix</th>
                <th className="r">Breakage Differential</th>
                <th className="r">Total Credited</th>
              </tr>
            </thead>
            <tbody>
              {dailyCommissions.map((row) => (
                <tr key={row.date}>
                  <td style={{ fontWeight: 500 }}>{row.date}</td>
                  <td className="r">${fmt(row.base)}</td>
                  <td className="r">${fmt(row.diff)}</td>
                  <td className="r" style={{ fontWeight: 600, color: row.total > 0 ? 'var(--good)' : 'var(--muted)' }}>
                    ${fmt(row.total)}
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

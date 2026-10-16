import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function CommissionReportsPage() {
  const { fmt, setEventText } = useBackOffice();

  const [period, setPeriod] = useState(7); // 7 | 14 | 30
  const [reportType, setReportType] = useState('all'); // 'all' | 'base' | 'diff'
  const [showFullReport, setShowFullReport] = useState(false);

  const reportItems = [
    { id: 1, line: 1, leader: 'Ambassador 001', rank: 'K-2', base: 142.50, diff: 320.10, total: 462.60 },
    { id: 2, line: 2, leader: 'Ambassador 002', rank: 'Rainier', base: 120.00, diff: 280.40, total: 400.40 },
    { id: 3, line: 3, leader: 'Ambassador 003', rank: 'Rainier', base: 95.20, diff: 210.80, total: 306.00 },
    { id: 4, line: 4, leader: 'Ambassador 004', rank: 'Denali', base: 74.00, diff: 185.00, total: 259.00 },
    { id: 5, line: 5, leader: 'Ambassador 005', rank: 'Matterhorn', base: 58.50, diff: 142.20, total: 200.70 }
  ];

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 className="h1">Commission Reports</h1>
          <div className="lbl">Every settlement, both kinds of commission, by day, by level and by line.</div>
        </div>
        <button
          className="b3 gold"
          onClick={() => {
            sfx.play('chirp');
            setShowFullReport(true);
          }}
        >
          Pull full report
        </button>
      </div>

      {/* Filter Controls */}
      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className={`b3 sm ${period === 7 ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setPeriod(7); }}
          >
            Last 7 settlements
          </button>
          <button
            className={`b3 sm ${period === 14 ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setPeriod(14); }}
          >
            Last 14 settlements
          </button>
          <button
            className={`b3 sm ${period === 30 ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setPeriod(30); }}
          >
            Last 30 settlements
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className={`b3 sm ${reportType === 'all' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setReportType('all'); }}
          >
            All commissions
          </button>
          <button
            className={`b3 sm ${reportType === 'base' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setReportType('base'); }}
          >
            Base matrix
          </button>
          <button
            className={`b3 sm ${reportType === 'diff' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setReportType('diff'); }}
          >
            Breakage differential
          </button>
        </div>
      </div>

      {/* Report Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Line</th>
                <th>Leader</th>
                <th>Rank</th>
                <th className="r">Base Matrix</th>
                <th className="r">Differential</th>
                <th className="r">Total for Period</th>
              </tr>
            </thead>
            <tbody>
              {reportItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>Line {item.line}</td>
                  <td>{item.leader}</td>
                  <td><span className="chip">{item.rank}</span></td>
                  <td className="r">${fmt(item.base)}</td>
                  <td className="r">${fmt(item.diff)}</td>
                  <td className="r" style={{ fontWeight: 600 }}>${fmt(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Report Modal Sheet */}
      {showFullReport && (
        <div className="sheet" role="dialog" aria-modal="true">
          <div className="sheetin">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="kick">Full Commission Report</span>
                <h2 className="h2" style={{ margin: 0 }}>Settlement Ledger Details</h2>
              </div>
              <button
                className="b3 sm"
                onClick={() => {
                  sfx.play('pop');
                  setShowFullReport(false);
                }}
              >
                Close report
              </button>
            </div>

            <div className="lbl">
              Report generated for {period} settlements. All commission lines verifiable on BNB Smart Chain.
            </div>

            <div style={{ overflowX: 'auto', maxHeight: '460px' }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Line</th>
                    <th>Leader</th>
                    <th>Rank</th>
                    <th className="r">Base Matrix</th>
                    <th className="r">Differential</th>
                    <th className="r">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {reportItems.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600 }}>Line {item.line}</td>
                      <td>{item.leader}</td>
                      <td><span className="chip">{item.rank}</span></td>
                      <td className="r">${fmt(item.base)}</td>
                      <td className="r">${fmt(item.diff)}</td>
                      <td className="r" style={{ fontWeight: 600 }}>${fmt(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button
                className="b3 gold"
                onClick={() => {
                  sfx.play('chirp');
                  setEventText('Commission report exported to CSV.');
                  setShowFullReport(false);
                }}
              >
                Download CSV
              </button>
              <button className="b3" onClick={() => setShowFullReport(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

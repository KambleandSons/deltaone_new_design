import React, { useState, useEffect } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { customerApi } from '../../services/api';
import { sfx } from '../../utils/sfx';

export default function ActivityPage() {
  const { setEventText } = useBackOffice();

  const [filter, setFilter] = useState('all');
  const [tab, setTab] = useState('tx');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    customerApi.getActivity(filter, tab).then((data) => {
      setRows(data);
    });
  }, [filter, tab]);

  const handleDownloadCsv = () => {
    sfx.play('chirp');
    setEventText('Exporting activity ledger to CSV...');
  };

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'added', label: 'USDT added' },
    { id: 'withdraw', label: 'Withdrawal' },
    { id: 'module', label: 'Module' }
  ];

  const tabOptions = [
    { id: 'tx', label: 'Transactions' },
    { id: 'rew', label: 'Daily rewards' },
    { id: 'rebuy', label: 'Auto-Rebuy' },
    { id: 'ops', label: 'Operations' },
    { id: 'wal', label: 'Wallets' }
  ];

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 className="h1">Activity</h1>
          <div className="lbl">Full on-chain record. Every row verifiable.</div>
        </div>
        <button className="b3" onClick={handleDownloadCsv}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ strokeWidth: 1.6 }} aria-hidden="true">
            <path d="M12 4v11M7 10l5 5 5-5M5 20h14"></path>
          </svg>
          Download CSV
        </button>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {filterOptions.map((f) => (
            <button
              key={f.id}
              className={`b3 sm ${filter === f.id ? 'on gold' : ''}`}
              onClick={() => { sfx.play('pop'); setFilter(f.id); }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {tabOptions.map((t) => (
            <button
              key={t.id}
              className={`b3 sm ${tab === t.id ? 'on gold' : ''}`}
              onClick={() => { sfx.play('pop'); setTab(t.id); }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Ledger Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Event</th>
                <th>Time (UTC)</th>
                <th>Proof</th>
                <th className="r">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 500 }}>{r.event}</td>
                  <td className="lbl">{r.time}</td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--goldink)' }}>
                      {r.proof}
                    </span>
                  </td>
                  <td className={`r ${r.amount.startsWith('+') ? 'good' : ''}`} style={{ fontWeight: 600 }}>
                    {r.amount}
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

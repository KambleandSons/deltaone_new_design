import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function MyModulesPage() {
  const { allCalculatedModules } = useBackOffice();
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  const filteredModules = allCalculatedModules.filter((m) => {
    if (filter === 'active') return !m.done;
    if (filter === 'completed') return m.done;
    return true;
  });

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 className="h1">My Modules</h1>
          <div className="lbl">Each Module counts down and climbs on its own.</div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className={`b3 sm ${filter === 'all' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setFilter('all'); }}
          >
            All
          </button>
          <button
            className={`b3 sm ${filter === 'active' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setFilter('active'); }}
          >
            Active
          </button>
          <button
            className={`b3 sm ${filter === 'completed' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setFilter('completed'); }}
          >
            Completed
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '18px' }}>
        {filteredModules.map((m) => (
          <article key={m.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, fontSize: '16px' }}>Module {m.id}</span>
              <span className="chip"><span className={m.statusCls}>{m.status}</span></span>
            </div>

            <div className="lbl">Purchased {m.priceTxt} · day {m.dayTxt}</div>

            <div className="lbl">
              Module Credits Remaining <span aria-hidden="true">↓</span>{' '}
              <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{m.remainTxt}</b> · {m.remainPct}%
            </div>
            <div className="well bar">
              <div className="fill-cr" style={{ width: `${m.remainPct}%` }}></div>
            </div>

            <div className="lbl">
              AI Module Rewards <span aria-hidden="true">↑</span>{' '}
              <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{m.rewardTxt}</b> · {m.rewardPct}% of 2×
            </div>
            <div className="well bar">
              <div className="fill-gd" style={{ width: `${m.rewardPct}%` }}></div>
            </div>

            <div className="small">
              {m.done
                ? 'Module completed at 2× summit.'
                : `Estimated finish: about ${m.e7Days} days at last week's average, ${m.e30Days} at last month's.`}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function ModuleManagementPage() {
  const navigate = useNavigate();
  const { allCalculatedModules, totals } = useBackOffice();

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 className="h1">Module Management</h1>
          <div className="lbl">Every Module, its credits and its rewards, in one place.</div>
        </div>
        <button className="b3" onClick={() => { sfx.play('pop'); navigate('/withdraw'); }}>
          Withdraw
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Active Modules</div>
          <div className="num">{totals.count}</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Active Module Credits</div>
          <div className="num">{totals.original}</div>
          <div className="small">Original credits, active Modules</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Module Credits Remaining</div>
          <div className="num">{totals.remaining}</div>
          <div className="small">{totals.remainPct}% remaining</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">AI Module Rewards</div>
          <div className="num">{totals.rewards}</div>
          <div className="small">Delivered by active Modules</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Module</th>
                <th className="r">Original credits</th>
                <th className="r">Credits used</th>
                <th className="r">Credits remaining</th>
                <th className="r">% remaining</th>
                <th className="r">AI Module Rewards</th>
                <th className="r">% of 2×</th>
                <th className="r">Days left, last week avg</th>
                <th className="r">Days left, last month avg</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allCalculatedModules.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600 }}>{m.id}</td>
                  <td className="r">{m.priceTxt}</td>
                  <td className="r">{m.usedTxt}</td>
                  <td className="r">{m.remainTxt}</td>
                  <td className="r">{m.remainPct}%</td>
                  <td className="r">{m.rewardTxt}</td>
                  <td className="r">{m.rewardPct}%</td>
                  <td className="r">{m.e7Days}</td>
                  <td className="r">{m.e30Days}</td>
                  <td><span className={m.statusCls}>{m.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="small">
        Module Credits are used as the AI Module delivers rewards and cannot be withdrawn. Each Module runs until it has delivered 2× its purchase price, then shows Completed.
      </div>
    </section>
  );
}

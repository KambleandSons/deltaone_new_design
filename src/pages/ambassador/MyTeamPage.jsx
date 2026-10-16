import React, { useState } from 'react';
import { sfx } from '../../utils/sfx';

export default function MyTeamPage() {
  const [sort, setSort] = useState('vol'); // 'vol' | 'rank' | 'members'

  const lines = [
    { line: 1, name: 'Ambassador 001', rank: 'K-2', pv: 50000, tv: 259722.84, members: 69, date: '12 Sep 2026' },
    { line: 2, name: 'Ambassador 002', rank: 'Rainier', pv: 25000, tv: 205000.00, members: 54, date: '15 Sep 2026' },
    { line: 3, name: 'Ambassador 003', rank: 'Rainier', pv: 25000, tv: 160000.00, members: 42, date: '18 Sep 2026' },
    { line: 4, name: 'Ambassador 004', rank: 'Denali', pv: 12000, tv: 120000.00, members: 33, date: '21 Sep 2026' },
    { line: 5, name: 'Ambassador 005', rank: 'Matterhorn', pv: 6000, tv: 95000.00, members: 27, date: '24 Sep 2026' },
    { line: 6, name: 'Ambassador 006', rank: 'Denali', pv: 12000, tv: 70000.00, members: 23, date: '27 Sep 2026' },
    { line: 7, name: 'Ambassador 007', rank: 'Matterhorn', pv: 6000, tv: 48000.00, members: 19, date: '01 Oct 2026' },
    { line: 8, name: 'Ambassador 008', rank: 'Kilimanjaro', pv: 2500, tv: 30000.00, members: 15, date: '04 Oct 2026' },
    { line: 9, name: 'Ambassador 009', rank: 'Kilimanjaro', pv: 2500, tv: 22000.00, members: 12, date: '06 Oct 2026' },
    { line: 10, name: 'Ambassador 010', rank: 'Fuji', pv: 1000, tv: 15000.00, members: 10, date: '08 Oct 2026' }
  ];

  const sortedLines = [...lines].sort((a, b) => {
    if (sort === 'members') return b.members - a.members;
    return b.tv - a.tv;
  });

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 className="h1">My Team</h1>
          <div className="lbl">The people you enrolled yourself, and how each line is growing.</div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className={`b3 sm ${sort === 'vol' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setSort('vol'); }}
          >
            Highest volume
          </button>
          <button
            className={`b3 sm ${sort === 'members' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setSort('members'); }}
          >
            Most members
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Line</th>
                <th>Personal Enrollee</th>
                <th>Rank</th>
                <th>Enrolled Date</th>
                <th className="r">Own Volume</th>
                <th className="r">Line Volume</th>
                <th className="r">Members</th>
              </tr>
            </thead>
            <tbody>
              {sortedLines.map((l) => (
                <tr key={l.line}>
                  <td style={{ fontWeight: 600 }}>Line {l.line}</td>
                  <td style={{ fontWeight: 500 }}>{l.name}</td>
                  <td><span className="chip">{l.rank}</span></td>
                  <td className="lbl">{l.date}</td>
                  <td className="r">${l.pv.toLocaleString()}</td>
                  <td className="r" style={{ fontWeight: 600 }}>${l.tv.toLocaleString()}</td>
                  <td className="r">{l.members}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

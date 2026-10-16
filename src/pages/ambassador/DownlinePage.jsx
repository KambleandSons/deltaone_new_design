import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function DownlinePage() {
  const { setEventText } = useBackOffice();

  const [search, setSearch] = useState('');
  const [rankFilter, setRankFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);

  const mockDownline = [
    { id: 1, name: 'Ambassador 001', rank: 'K-2', level: 1, line: 1, sponsor: 'Ricky Lundell', pv: 50000, tv: 259722.84, active: true },
    { id: 2, name: 'Ambassador 002', rank: 'Rainier', level: 1, line: 2, sponsor: 'Ricky Lundell', pv: 25000, tv: 205000.00, active: true },
    { id: 3, name: 'Ambassador 003', rank: 'Rainier', level: 2, line: 1, sponsor: 'Ambassador 001', pv: 25000, tv: 160000.00, active: true },
    { id: 4, name: 'Ambassador 004', rank: 'Denali', level: 2, line: 2, sponsor: 'Ambassador 002', pv: 12000, tv: 120000.00, active: true },
    { id: 5, name: 'Ambassador 005', rank: 'Matterhorn', level: 1, line: 3, sponsor: 'Ricky Lundell', pv: 6000, tv: 95000.00, active: true },
    { id: 6, name: 'Ambassador 006', rank: 'Denali', level: 3, line: 1, sponsor: 'Ambassador 003', pv: 12000, tv: 70000.00, active: true },
    { id: 7, name: 'Ambassador 007', rank: 'Kilimanjaro', level: 2, line: 3, sponsor: 'Ambassador 005', pv: 2500, tv: 48000.00, active: true },
    { id: 8, name: 'Ambassador 008', rank: 'Fuji', level: 3, line: 2, sponsor: 'Ambassador 004', pv: 1000, tv: 30000.00, active: true },
    { id: 9, name: 'Ambassador 009', rank: 'Fuji', level: 4, line: 1, sponsor: 'Ambassador 006', pv: 1000, tv: 22000.00, active: true },
    { id: 10, name: 'Ambassador 010', rank: 'No rank yet', level: 2, line: 4, sponsor: 'Ricky Lundell', pv: 1000, tv: 5000.00, active: true }
  ];

  const filteredMembers = mockDownline.filter((m) => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (rankFilter === 'leaders' && !['Matterhorn', 'Denali', 'Rainier', 'K-2', 'Everest'].includes(m.rank)) return false;
    if (levelFilter === 'l1' && m.level !== 1) return false;
    if (levelFilter === 'l2' && m.level !== 2) return false;
    if (levelFilter === 'l3' && m.level !== 3) return false;
    return true;
  });

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 className="h1">Downline</h1>
          <div className="lbl">Search your whole sales organisation: filter by rank, level, line or status.</div>
        </div>
        <button className="b3" onClick={() => sfx.play('chirp')}>
          Export Organization CSV
        </button>
      </div>

      {/* Search & Filters */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="well inpwrap">
          <input
            className="inp"
            style={{ fontSize: '18px' }}
            placeholder="Search by Ambassador name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className={`b3 sm ${rankFilter === 'all' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setRankFilter('all'); }}
          >
            All ranks
          </button>
          <button
            className={`b3 sm ${rankFilter === 'leaders' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setRankFilter('leaders'); }}
          >
            Leaders: Matterhorn & up
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className={`b3 sm ${levelFilter === 'all' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setLevelFilter('all'); }}
          >
            All levels
          </button>
          <button
            className={`b3 sm ${levelFilter === 'l1' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setLevelFilter('l1'); }}
          >
            Level 1
          </button>
          <button
            className={`b3 sm ${levelFilter === 'l2' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setLevelFilter('l2'); }}
          >
            Level 2
          </button>
          <button
            className={`b3 sm ${levelFilter === 'l3' ? 'on gold' : ''}`}
            onClick={() => { sfx.play('pop'); setLevelFilter('l3'); }}
          >
            Level 3
          </button>
        </div>
      </div>

      {/* Selected Member Detail Box */}
      {selectedMember && (
        <div className="card dlcard" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kick">Ambassador Details</span>
            <button className="b3 sm" onClick={() => setSelectedMember(null)}>Close</button>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 600 }}>{selectedMember.name}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            <div><span className="lbl">Rank:</span> <b>{selectedMember.rank}</b></div>
            <div><span className="lbl">Level:</span> <b>Level {selectedMember.level}</b></div>
            <div><span className="lbl">Line:</span> <b>Line {selectedMember.line}</b></div>
            <div><span className="lbl">Sponsor:</span> <b>{selectedMember.sponsor}</b></div>
            <div><span className="lbl">Personal Vol:</span> <b>${selectedMember.pv.toLocaleString()}</b></div>
            <div><span className="lbl">Team Vol:</span> <b>${selectedMember.tv.toLocaleString()}</b></div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              className="b3 sm gold"
              onClick={() => {
                sfx.play('cheer');
                setEventText(`Congratulated ${selectedMember.name}!`);
              }}
            >
              Congratulate
            </button>
          </div>
        </div>
      )}

      {/* Downline Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Ambassador</th>
                <th>Rank</th>
                <th>Level</th>
                <th>Line</th>
                <th>Sponsor</th>
                <th className="r">Personal Vol</th>
                <th className="r">Team Vol</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m) => (
                <tr
                  key={m.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    sfx.play('pop');
                    setSelectedMember(m);
                  }}
                >
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td><span className="chip">{m.rank}</span></td>
                  <td>Level {m.level}</td>
                  <td>Line {m.line}</td>
                  <td className="lbl">{m.sponsor}</td>
                  <td className="r">${m.pv.toLocaleString()}</td>
                  <td className="r" style={{ fontWeight: 600 }}>${m.tv.toLocaleString()}</td>
                  <td>
                    <button className="b3 sm" style={{ padding: '0 8px', minHeight: '32px' }}>
                      Details
                    </button>
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

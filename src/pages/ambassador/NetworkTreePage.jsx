import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function NetworkTreePage() {
  const { user } = useBackOffice();

  const [selectedNode, setSelectedNode] = useState({
    id: 'root',
    name: 'Ricky Lundell (you)',
    rank: 'Everest',
    level: 0,
    enrollees: 24,
    sponsor: 'Delta 1',
    differential: '42%'
  });

  const matrixLevels = [
    {
      level: 'Level 1',
      fill: '2 / 2 filled',
      nodes: [
        { id: 'L1-0', name: 'Ambassador 001', rank: 'K-2', color: '#5B5BD6', differential: '36%', sponsor: 'Ricky Lundell' },
        { id: 'L1-1', name: 'Ambassador 002', rank: 'Rainier', color: '#2E8FE6', differential: '30%', sponsor: 'Ricky Lundell' }
      ]
    },
    {
      level: 'Level 2',
      fill: '4 / 4 filled',
      nodes: [
        { id: 'L2-0', name: 'Ambassador 003', rank: 'Denali', color: '#30A46C', differential: '24%', sponsor: 'Ambassador 001' },
        { id: 'L2-1', name: 'Ambassador 004', rank: 'Rainier', color: '#2E8FE6', differential: '30%', sponsor: 'Ambassador 001' },
        { id: 'L2-2', name: 'Ambassador 005', rank: 'Matterhorn', color: '#EBB520', differential: '18%', sponsor: 'Ambassador 002' },
        { id: 'L2-3', name: 'Ambassador 006', rank: 'Denali', color: '#30A46C', differential: '24%', sponsor: 'Ambassador 002' }
      ]
    },
    {
      level: 'Level 3',
      fill: '8 / 8 filled',
      nodes: [
        { id: 'L3-0', name: 'Ambassador 007', rank: 'Kilimanjaro', color: '#F5841F', differential: '12%', sponsor: 'Ambassador 003' },
        { id: 'L3-1', name: 'Ambassador 008', rank: 'Fuji', color: '#E5484D', differential: '6%', sponsor: 'Ambassador 003' },
        { id: 'L3-2', name: 'Ambassador 009', rank: 'Matterhorn', color: '#EBB520', differential: '18%', sponsor: 'Ambassador 004' },
        { id: 'L3-3', name: 'Ambassador 010', rank: 'Denali', color: '#30A46C', differential: '24%', sponsor: 'Ambassador 004' },
        { id: 'L3-4', name: 'Ambassador 011', rank: 'Fuji', color: '#E5484D', differential: '6%', sponsor: 'Ambassador 005' },
        { id: 'L3-5', name: 'Ambassador 012', rank: 'Kilimanjaro', color: '#F5841F', differential: '12%', sponsor: 'Ambassador 005' },
        { id: 'L3-6', name: 'Ambassador 013', rank: 'Fuji', color: '#E5484D', differential: '6%', sponsor: 'Ambassador 006' },
        { id: 'L3-7', name: 'Ambassador 014', rank: 'Fuji', color: '#E5484D', differential: '6%', sponsor: 'Ambassador 006' }
      ]
    }
  ];

  const handleSelect = (node) => {
    sfx.play('pop');
    setSelectedNode(node);
  };

  const handleResetToSelf = () => {
    sfx.play('pop');
    setSelectedNode({
      id: 'root',
      name: 'Ricky Lundell (you)',
      rank: 'Everest',
      level: 0,
      enrollees: 24,
      sponsor: 'Delta 1',
      differential: '42%'
    });
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 className="h1">Network Tree</h1>
          <div className="lbl">Your matrix, level by level. Tap any Ambassador to view details.</div>
        </div>
        <button className="b3" onClick={handleResetToSelf}>
          Back to my position
        </button>
      </div>

      {/* Selected Member Detail Card */}
      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between', border: '2px solid #F4B61C' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="rbot" style={{ width: '54px', height: '62px' }}>
            <svg viewBox="0 0 40 46" aria-hidden="true" focusable="false">
              <use href="#mbolt" style={{ color: selectedNode.color || '#8E4EC6' }}></use>
              {selectedNode.rank === 'Everest' && <use href="#mcrown"></use>}
            </svg>
          </div>
          <div>
            <div className="kick">{selectedNode.rank} Summit</div>
            <div style={{ fontSize: '22px', fontWeight: 600 }}>{selectedNode.name}</div>
            <div className="lbl">Sponsor: {selectedNode.sponsor} · Differential: {selectedNode.differential}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="b3 sm gold" onClick={() => sfx.play('pop')}>
            Show their downline
          </button>
        </div>
      </div>

      {/* Matrix Tree Levels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {matrixLevels.map((lvl) => (
          <div key={lvl.level} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="kick">{lvl.level}</span>
              <span className="small">{lvl.fill}</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {lvl.nodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    className={`b3 ${isSelected ? 'on gold' : ''}`}
                    onClick={() => handleSelect(node)}
                    style={{ gap: '10px', minWidth: '170px', justifyContent: 'flex-start' }}
                  >
                    <span className="sq" style={{ background: node.color }}></span>
                    <span style={{ textAlign: 'left' }}>
                      <b style={{ display: 'block', fontSize: '13px' }}>{node.name}</b>
                      <span className="small">{node.rank}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

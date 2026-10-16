import React, { useState } from 'react';
import { RANKS, ORDERED_RANKS } from '../../data/mockData';
import { Users, RotateCcw, Award, Check } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function NetworkTree() {
  const [selectedKey, setSelectedKey] = useState('ricky');

  // Matrix layout: L1 (2 seats), L2 (4), L3 (8), L4 (16)
  const MATRIX_ROWS = [
    ['K-2', 'Rainier'],
    ['Denali', 'Rainier', 'Matterhorn', 'Denali'],
    ['Kilimanjaro', 'Fuji', 'Matterhorn', 'Denali', 'Fuji', 'Kilimanjaro', 'No rank yet', 'Fuji'],
    [
      'No rank yet', 'Fuji', 'Fuji', 'Kilimanjaro', 'No rank yet', 'No rank yet', 'Fuji', 'Matterhorn',
      'Kilimanjaro', 'No rank yet', 'Fuji', 'No rank yet', 'Fuji', 'No rank yet', null, null
    ]
  ];

  const SEAT_NAMES = {
    'L2-0': 'Ambassador A',
    'L3-0': 'Ambassador B',
    'L3-1': 'Ambassador C',
    'L3-6': 'Ambassador D'
  };

  const getSeatInfo = (key) => {
    if (key === 'ricky') {
      return {
        name: 'Ricky Lundell (You)',
        rank: 'Everest',
        sponsor: 'Delta One System',
        levels: '1–21',
        ent: '42%',
        cap: '$7,000'
      };
    }
    const match = /^L(\d+)-(\d+)$/.exec(key);
    if (!match) return null;
    const L = parseInt(match[1], 10);
    const i = parseInt(match[2], 10);
    const rk = MATRIX_ROWS[L - 1]?.[i];
    if (!rk) return null;

    const rankMeta = RANKS[rk] || RANKS['No rank yet'];
    const name = SEAT_NAMES[key] || `Level ${L} · Seat ${i + 1}`;
    const sponsor = L === 1 ? 'Ricky Lundell' : SEAT_NAMES[`L${L - 1}-${Math.floor(i / 2)}`] || `Level ${L - 1} Leader`;

    return {
      name,
      rank: rk,
      sponsor,
      levels: rankMeta.levels,
      ent: rankMeta.ent,
      cap: rankMeta.cap
    };
  };

  const activeInfo = getSeatInfo(selectedKey) || getSeatInfo('ricky');

  // Count ranks in the matrix
  const rankCounts = {};
  MATRIX_ROWS.forEach((row) => {
    row.forEach((rk) => {
      if (rk) rankCounts[rk] = (rankCounts[rk] || 0) + 1;
    });
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick text-purple-600 dark:text-purple-400">Mountain Matrix</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Network Tree
          </h1>
          <p className="lbl mt-1">
            Every Ambassador position is drawn as a 3-D Bolt in its rank's colour. Selecting a seat binds its rank and rules.
          </p>
        </div>

        {selectedKey !== 'ricky' && (
          <button
            onClick={() => {
              sfx.play('pop');
              setSelectedKey('ricky');
            }}
            className="b3 gold sm text-xs inline-flex items-center gap-1.5 shadow"
          >
            <RotateCcw size={14} /> Back to My Position
          </button>
        )}
      </div>

      {/* Selected Ambassador Rank & Entitlement Card */}
      <div className="card p-6 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <svg
              className="w-10 h-12 overflow-visible"
              style={{ color: RANKS[activeInfo.rank]?.color || '#9AA6B2' }}
            >
              <use href="#mbolt" />
              {activeInfo.rank === 'Everest' && <use href="#mcrown" />}
            </svg>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeInfo.name}
                </h3>
                <span
                  style={{ backgroundColor: `${RANKS[activeInfo.rank]?.color}20`, color: RANKS[activeInfo.rank]?.color }}
                  className="chip text-[11px] font-bold border-none px-2.5 py-0.5"
                >
                  {activeInfo.rank}
                </span>
              </div>
              <span className="text-xs text-slate-500">
                Sponsor: {activeInfo.sponsor}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <div className="tint px-3 py-2 rounded-xl text-center">
              <span className="lbl text-[10px]">Paid Levels</span>
              <div className="font-bold text-slate-900 dark:text-white mt-0.5">{activeInfo.levels}</div>
            </div>
            <div className="tint px-3 py-2 rounded-xl text-center">
              <span className="lbl text-[10px]">Entitlement</span>
              <div className="font-bold text-purple-600 dark:text-purple-400 mt-0.5">{activeInfo.ent}</div>
            </div>
            <div className="tint px-3 py-2 rounded-xl text-center">
              <span className="lbl text-[10px]">Daily Cap</span>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{activeInfo.cap}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Quick Selection:</span>
          {[
            { key: 'ricky', label: 'You (Ricky Lundell)' },
            { key: 'L2-0', label: 'Ambassador A (L2)' },
            { key: 'L3-0', label: 'Ambassador B (L3)' },
            { key: 'L3-1', label: 'Ambassador C (L3)' },
            { key: 'L3-6', label: 'Ambassador D (L3)' }
          ].map((quick) => (
            <button
              key={quick.key}
              onClick={() => {
                sfx.play('pop');
                setSelectedKey(quick.key);
              }}
              className={`b3 sm text-[11px] !min-h-0 !h-7 px-2.5 ${
                selectedKey === quick.key ? 'gold' : ''
              }`}
            >
              {quick.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rank Colors Legend */}
      <div className="card p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="lbl text-xs font-semibold">Rank Legend (Matrix First 4 Levels):</span>
        <div className="flex flex-wrap gap-3">
          {ORDERED_RANKS.map((rk) => (
            <div key={rk} className="flex items-center gap-1.5 text-xs">
              <span
                style={{ backgroundColor: RANKS[rk].color }}
                className="w-3 h-3 rounded-full shadow-sm"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {rk}: <span className="font-bold">{rankCounts[rk] || 0}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Mountain Ledges Visual Matrix */}
      <div className="card p-8 rounded-3xl border border-slate-300 dark:border-slate-800 space-y-8 flex flex-col items-center bg-gradient-to-b from-sky-100/50 via-slate-100/40 to-slate-200/60 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-950/80 shadow-inner">
        {/* Summit: Ricky Lundell */}
        <div className="flex flex-col items-center space-y-2">
          <span className="kick text-[11px]">Summit (You)</span>
          <button
            onClick={() => {
              sfx.play('cheer');
              setSelectedKey('ricky');
            }}
            className={`p-2 rounded-2xl transition-all cursor-pointer ${
              selectedKey === 'ricky'
                ? 'ring-4 ring-amber-400 scale-110 shadow-2xl bg-amber-500/10'
                : 'hover:scale-105'
            }`}
            title="Ricky Lundell, Everest"
          >
            <svg className="w-14 h-16 overflow-visible" style={{ color: RANKS['Everest'].color }}>
              <use href="#mbolt" />
              <use href="#mcrown" />
            </svg>
          </button>
        </div>

        {/* Ledges L1, L2, L3, L4 */}
        <div className="w-full space-y-8 max-w-4xl">
          {MATRIX_ROWS.map((row, levelIdx) => {
            const levelNum = levelIdx + 1;
            return (
              <div key={levelNum} className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
                  <span>Level {levelNum} ({row.filter(Boolean).length} / {row.length} seats)</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-3 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm">
                  {row.map((rk, i) => {
                    const key = `L${levelNum}-${i}`;
                    const isSelected = selectedKey === key;
                    if (!rk) {
                      return (
                        <div
                          key={key}
                          className="w-10 h-12 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center opacity-40 text-[10px] text-slate-400"
                        >
                          Empty
                        </div>
                      );
                    }

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          sfx.play('pop');
                          setSelectedKey(key);
                        }}
                        className={`p-1.5 rounded-xl transition-all ${
                          isSelected
                            ? 'ring-4 ring-amber-400 scale-110 bg-amber-500/10 shadow-lg'
                            : 'hover:scale-110'
                        }`}
                        title={`${SEAT_NAMES[key] || `Level ${levelNum} Seat ${i + 1}`} (${rk})`}
                      >
                        <svg className="w-9 h-11 overflow-visible" style={{ color: RANKS[rk]?.color || '#9AA6B2' }}>
                          <use href="#mbolt" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


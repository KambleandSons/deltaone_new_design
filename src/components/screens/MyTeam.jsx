import React, { useState, useMemo } from 'react';
import { generateDownline, RANKS, ORDERED_RANKS } from '../../data/mockData';
import { Copy, Check, Users, TrendingUp, Share2 } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function MyTeam() {
  const downline = useMemo(() => generateDownline(), []);
  const [copied, setCopied] = useState(false);
  const [sortBy, setSortBy] = useState('vol');
  const [showAll, setShowAll] = useState(false);

  // 21 Line Leaders
  const lines = useMemo(() => {
    const list = [];
    for (let i = 1; i <= 21; i++) {
      const lineMembers = downline.all.filter((m) => m.line === i);
      const leader = lineMembers.find((m) => m.level === 1) || lineMembers[0];
      const vol = downline.LV[i - 1] || 0;
      const count = downline.LM[i - 1] || lineMembers.length;
      list.push({
        line: i,
        leaderName: leader ? leader.name : `Leader Line ${i}`,
        rank: leader ? leader.rank : 'Fuji',
        vol,
        count
      });
    }

    if (sortBy === 'vol') {
      list.sort((a, b) => b.vol - a.vol);
    } else if (sortBy === 'rank') {
      list.sort((a, b) => ORDERED_RANKS.indexOf(b.rank) - ORDERED_RANKS.indexOf(a.rank));
    } else if (sortBy === 'count') {
      list.sort((a, b) => b.count - a.count);
    }
    return list;
  }, [downline, sortBy]);

  const displayedLines = showAll ? lines : lines.slice(0, 8);
  const inviteLink = 'https://customer.deltaoneai.com/join?ref=ricky';

  const copyLink = () => {
    sfx.play('pop');
    navigator.clipboard?.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick text-purple-600 dark:text-purple-400">Direct Organization</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            My Team
          </h1>
          <p className="lbl mt-1">
            Your 21 personally sponsored lines of sponsorship and organization leaders.
          </p>
        </div>

        {/* Invite link card */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-3 py-2 rounded-2xl shadow-sm">
          <span className="text-xs font-mono text-slate-500 truncate max-w-[200px]">
            {inviteLink}
          </span>
          <button
            onClick={copyLink}
            className="b3 gold sm text-xs !min-h-0 !h-7 px-2.5 inline-flex items-center gap-1"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* KPI Totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Personal Direct Enrollees</span>
          <div className="num font-light text-3xl text-purple-600 dark:text-purple-400">
            21 Lines
          </div>
          <span className="text-xs text-slate-500">All 21 levels fully unlocked</span>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Total Sales Network</span>
          <div className="num font-light text-3xl text-slate-900 dark:text-white">
            {downline.all.length} Members
          </div>
          <span className="text-xs text-emerald-600 font-medium">92% Active</span>
        </div>
        <div className="card p-5 space-y-1">
          <span className="lbl text-xs">Total Group Volume</span>
          <div className="num font-light text-3xl text-slate-900 dark:text-white">
            $1,061,922.84
          </div>
          <span className="text-xs text-slate-500">Across all generations</span>
        </div>
      </div>

      {/* Sort options */}
      <div className="flex items-center justify-between">
        <span className="lbl text-xs font-semibold">21 Sponsorship Lines:</span>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 mr-1">Sort by:</span>
          {[
            { id: 'vol', label: 'Biggest Line' },
            { id: 'rank', label: 'Highest Rank' },
            { id: 'count', label: 'Most Members' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => {
                sfx.play('pop');
                setSortBy(s.id);
              }}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                sortBy === s.id
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedLines.map((line) => (
          <div
            key={line.line}
            className="card p-5 space-y-3 rounded-2xl border border-slate-300 dark:border-slate-800 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Line {line.line}
              </span>
              <span
                style={{ color: RANKS[line.rank]?.color }}
                className="chip text-[10px] font-bold border-none"
              >
                {line.rank}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <svg className="w-8 h-9 overflow-visible flex-none" style={{ color: RANKS[line.rank]?.color }}>
                <use href="#mbolt" />
              </svg>
              <div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                  {line.leaderName}
                </h4>
                <span className="text-xs text-slate-500">
                  {line.count} members in line
                </span>
              </div>
            </div>

            <div className="tint p-2.5 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-500">Line Volume:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                ${line.vol.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Show all button */}
      {!showAll && lines.length > 8 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => {
              sfx.play('pop');
              setShowAll(true);
            }}
            className="b3 sm text-xs px-6"
          >
            Show All 21 Lines
          </button>
        </div>
      )}
    </div>
  );
}


import React, { useState, useMemo } from 'react';
import { generateDownline, RANKS, ORDERED_RANKS, RANK_REQ } from '../../data/mockData';
import { Search, Download, Filter, ChevronRight, X, Check, AlertCircle } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function Downline() {
  const downlineData = useMemo(() => generateDownline(), []);
  const allMembers = downlineData.all;

  const [query, setQuery] = useState('');
  const [selectedRanks, setSelectedRanks] = useState([]);
  const [selectedBand, setSelectedBand] = useState('all');
  const [selectedLine, setSelectedLine] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('rank');
  const [pageSize, setPageSize] = useState(25);
  const [selectedMember, setSelectedMember] = useState(null);

  // Rank counts
  const rankCounts = useMemo(() => {
    const counts = {};
    allMembers.forEach((m) => {
      counts[m.rank] = (counts[m.rank] || 0) + 1;
    });
    return counts;
  }, [allMembers]);

  // Filtering
  const filtered = useMemo(() => {
    return allMembers.filter((m) => {
      if (selectedRanks.length > 0 && !selectedRanks.includes(m.rank)) return false;

      if (selectedBand === '1' && m.level !== 1) return false;
      if (selectedBand === '2' && m.level !== 2) return false;
      if (selectedBand === '3' && m.level !== 3) return false;
      if (selectedBand === '4' && (m.level < 4 || m.level > 6)) return false;
      if (selectedBand === '7' && (m.level < 7 || m.level > 9)) return false;
      if (selectedBand === '10' && m.level < 10) return false;

      if (selectedLine !== 'all' && String(m.line) !== String(selectedLine)) return false;
      if (selectedStatus === 'active' && !m.active) return false;
      if (selectedStatus === 'inactive' && m.active) return false;

      if (query) {
        const q = query.toLowerCase();
        const matchName = m.name.toLowerCase().includes(q);
        const matchRank = m.rank.toLowerCase().includes(q);
        const matchSponsor = m.sponsor.toLowerCase().includes(q);
        if (!matchName && !matchRank && !matchSponsor) return false;
      }

      return true;
    });
  }, [allMembers, selectedRanks, selectedBand, selectedLine, selectedStatus, query]);

  // Sorting
  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sortBy === 'rank') {
      list.sort((a, b) => ORDERED_RANKS.indexOf(b.rank) - ORDERED_RANKS.indexOf(a.rank));
    } else if (sortBy === 'level') {
      list.sort((a, b) => a.level - b.level);
    } else if (sortBy === 'team') {
      list.sort((a, b) => b.tv - a.tv);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filtered, sortBy]);

  const pagedMembers = sorted.slice(0, pageSize);

  const toggleRank = (rk) => {
    sfx.play('pop');
    setSelectedRanks((prev) =>
      prev.includes(rk) ? prev.filter((r) => r !== rk) : [...prev, rk]
    );
  };

  const selectLeaders = () => {
    sfx.play('pop');
    setSelectedRanks(['Matterhorn', 'Denali', 'Rainier', 'K-2', 'Everest']);
    setSortBy('rank');
  };

  const downloadCSV = () => {
    sfx.play('cash');
    const headers = ['Ambassador,Rank,Level,Line,Sponsor,Own active Modules (USDT),Team volume (USDT),Personal enrollees,Status'];
    const rows = sorted.map(
      (m) =>
        `"${m.name}","${m.rank}",${m.level},${m.line},"${m.sponsor}",${m.pv.toFixed(2)},${m.tv.toFixed(2)},${m.enr},"${m.active ? 'Active' : 'Inactive'}"`
    );
    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'delta-one-downline.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 sm:space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick text-purple-600 dark:text-purple-400">Sales Organisation</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Downline Directory
          </h1>
          <p className="lbl mt-1">
            Explore all {allMembers.length} ambassadors in your downline across all 21 lines.
          </p>
        </div>

        <button
          onClick={downloadCSV}
          className="b3 gold sm text-xs inline-flex items-center gap-1.5 shadow"
        >
          <Download size={14} /> Download Downline CSV ({sorted.length})
        </button>
      </div>

      {/* Rank Filters with Head Counts */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="lbl text-xs font-semibold">Filter by Rank:</span>
          <button
            onClick={selectLeaders}
            className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline"
          >
            Leaders: Matterhorn & up
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {ORDERED_RANKS.slice().reverse().map((rk) => {
            const isSelected = selectedRanks.includes(rk);
            const count = rankCounts[rk] || 0;
            return (
              <button
                key={rk}
                onClick={() => toggleRank(rk)}
                className={`b3 sm text-xs !min-h-0 !h-8 px-3 gap-1.5 ${
                  isSelected ? 'gold' : ''
                }`}
              >
                <span
                  style={{ backgroundColor: RANKS[rk].color }}
                  className="w-2.5 h-2.5 rounded-full inline-block"
                />
                <span>{rk}</span>
                <span className="text-[10px] text-slate-500 font-bold ml-0.5">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Bands, Line Picker, and Sort Toolbar */}
      <div className="card p-4 rounded-2xl border border-slate-300 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search box */}
          <div className="md:col-span-5 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ambassador name, rank, or sponsor..."
              className="bg-transparent border-none text-xs sm:text-sm text-slate-800 dark:text-slate-200 outline-none w-full"
            />
          </div>

          {/* Line picker */}
          <div className="md:col-span-3">
            <select
              value={selectedLine}
              onChange={(e) => setSelectedLine(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 outline-none text-slate-800 dark:text-slate-200"
            >
              <option value="all">All 21 Lines</option>
              {Array.from({ length: 21 }, (_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  Line {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Sort picker */}
          <div className="md:col-span-4 flex items-center justify-end gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">Sort:</span>
            {[
              { id: 'rank', label: 'Highest Rank' },
              { id: 'level', label: 'Level' },
              { id: 'team', label: 'Team Vol' },
              { id: 'name', label: 'A–Z' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSortBy(s.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
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

        {/* Level Band Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-500 font-medium mr-1">Level:</span>
          {[
            { id: 'all', label: 'All Levels' },
            { id: '1', label: 'L1' },
            { id: '2', label: 'L2' },
            { id: '3', label: 'L3' },
            { id: '4', label: 'L4–6' },
            { id: '7', label: 'L7–9' },
            { id: '10', label: 'L10+' }
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBand(b.id)}
              className={`chip text-[11px] cursor-pointer ${
                selectedBand === b.id
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-500'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Downline Table */}
      <div className="card p-0 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-md">
        <div className="overflow-x-auto">
          <table className="tbl w-full text-left">
            <thead>
              <tr>
                <th>Ambassador</th>
                <th>Rank</th>
                <th>Level</th>
                <th>Line</th>
                <th>Sponsor</th>
                <th className="r">Own Modules (USDT)</th>
                <th className="r">Team Volume (USDT)</th>
                <th className="r">Enrollees</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pagedMembers.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => {
                    sfx.play('pop');
                    setSelectedMember(m);
                  }}
                  className="hover:bg-amber-500/10 dark:hover:bg-amber-500/5 cursor-pointer transition-colors"
                >
                  <td className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <svg className="w-5 h-6 overflow-visible flex-none" style={{ color: RANKS[m.rank]?.color }}>
                      <use href="#mbolt" />
                    </svg>
                    <span>{m.name}</span>
                  </td>
                  <td>
                    <span
                      style={{ color: RANKS[m.rank]?.color }}
                      className="font-bold text-xs"
                    >
                      {m.rank}
                    </span>
                  </td>
                  <td className="font-mono text-xs text-slate-500">L{m.level}</td>
                  <td className="font-mono text-xs text-slate-500">Line {m.line}</td>
                  <td className="text-xs text-slate-600 dark:text-slate-400">{m.sponsor}</td>
                  <td className="r font-mono">${m.pv.toLocaleString()}</td>
                  <td className="r font-mono font-medium">${m.tv.toLocaleString()}</td>
                  <td className="r font-mono">{m.enr}</td>
                  <td>
                    <span
                      className={`chip text-[10px] font-bold ${
                        m.active
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {m.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {Math.min(pageSize, sorted.length)} of {sorted.length} ambassadors
          </span>
          {pageSize < sorted.length && (
            <button
              onClick={() => {
                sfx.play('pop');
                setPageSize((prev) => prev + 25);
              }}
              className="b3 sm text-xs"
            >
              Show 25 More
            </button>
          )}
        </div>
      </div>

      {/* Selected Member Detail Modal / Slide-out */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="card bg-white dark:bg-slate-900 max-w-xl w-full p-6 space-y-5 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-10 h-12 overflow-visible" style={{ color: RANKS[selectedMember.rank]?.color }}>
                  <use href="#mbolt" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedMember.name}
                  </h3>
                  <span
                    style={{ color: RANKS[selectedMember.rank]?.color }}
                    className="font-bold text-xs"
                  >
                    {selectedMember.rank} · Line {selectedMember.line} (Level {selectedMember.level})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="b3 sm !min-h-0 !h-8 !w-8 !p-0"
              >
                ✕
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="tint p-3 rounded-xl">
                <span className="lbl text-[10px]">Own Active Modules</span>
                <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                  ${selectedMember.pv.toLocaleString()}
                </div>
              </div>
              <div className="tint p-3 rounded-xl">
                <span className="lbl text-[10px]">Team Volume</span>
                <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                  ${selectedMember.tv.toLocaleString()}
                </div>
              </div>
              <div className="tint p-3 rounded-xl">
                <span className="lbl text-[10px]">Direct Enrollees</span>
                <div className="font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                  {selectedMember.enr}
                </div>
              </div>
            </div>

            {/* Next Summit Requirements Checklist */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="kick text-xs">What their next summit takes:</span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-700 dark:text-slate-300">Own Active Modules Qualified</span>
                  <Check size={16} className="text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-700 dark:text-slate-300">Direct Personal Enrollees Met</span>
                  <Check size={16} className="text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-700 dark:text-slate-300">Line Balance Cap Compliant</span>
                  <Check size={16} className="text-emerald-500" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedMember(null)}
                className="b3 sm px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


import React, { useState } from 'react';
import { FAQS } from '../../data/mockData';
import { Search, ChevronDown, ChevronUp, MessageCircle, HelpCircle, ShieldAlert } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function HelpSupport() {
  const [search, setSearch] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const filtered = FAQS.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (idx) => {
    sfx.play('pop');
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick">Knowledge Base</span>
          <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
            Help & Support
          </h1>
          <p className="lbl mt-1">
            Understand how Modules operate, daily settlements, commissions, and risk parameters.
          </p>
        </div>

        <button
          onClick={() => sfx.play('cheer')}
          className="b3 gold sm text-xs inline-flex items-center gap-1.5 shadow"
        >
          <MessageCircle size={15} /> Talk to Live Support
        </button>
      </div>

      {/* Instant Search Bar */}
      <div className="card p-3 rounded-2xl flex items-center gap-3 border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 shadow-sm">
        <Search size={18} className="text-slate-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter questions as you type..."
          className="bg-transparent border-none text-sm text-slate-800 dark:text-slate-200 outline-none w-full"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-xs text-slate-400 hover:text-slate-600 mr-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Accordion FAQ items */}
      <div className="space-y-3">
        {filtered.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={faq.q}
              className="card p-0 rounded-2xl border border-slate-300/80 dark:border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                  {faq.q}
                </span>
                <span className="text-slate-400 flex-none">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            No matching questions found for "{search}".
          </div>
        )}
      </div>

      {/* Risk disclosure */}
      <div className="tint p-4 rounded-xl flex items-start gap-3 text-xs text-slate-500">
        <ShieldAlert size={18} className="text-amber-500 flex-none mt-0.5" />
        <p className="leading-relaxed">
          Rewards and commissions are not guaranteed. Most members earn no commission at all.
          Only purchase with money you can afford to lose.
        </p>
      </div>
    </div>
  );
}


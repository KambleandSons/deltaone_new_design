import React from 'react';
import { Sun, Moon, Volume2, VolumeX, Mic, MicOff, Play, ShieldAlert, User, Zap } from 'lucide-react';
import { RANKS } from '../data/mockData';

export default function Header({
  appView,
  setAppView,
  side,
  setSide,
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled,
  voiceEnabled,
  setVoiceEnabled,
  onRunDay,
  onRunNoProfitDay,
  eventText,
  onClearEvent
}) {
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-[#0A1426]/85 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top Prototype Companion Views Bar */}
      <div className="bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] mr-1">Handoff Views:</span>
          {[
            { id: 'backoffice', label: 'New Back Office' },
            { id: 'review', label: 'Review UX UI' },
            { id: 'before-after', label: 'Before & After' },
            { id: 'sign-off', label: 'Sign-Off Sheet' },
            { id: 'edit-desk', label: "Bolt's Edit Desk" },
            { id: 'bolt-demo', label: 'Bolt Demo' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setAppView(item.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                appView === item.id
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Interactive Simulation Controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:inline">Simulate Settlement:</span>
          <button
            onClick={() => onRunDay(false)}
            className="b3 sm text-xs py-1 px-2.5 h-7 inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
            title="Simulate 1 day payout at current daily average"
          >
            <Play size={11} fill="currentColor" /> Run One Day
          </button>
          <button
            onClick={() => onRunDay(true)}
            className="b3 sm text-xs py-1 px-2.5 h-7 inline-flex items-center gap-1 bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800"
            title="Simulate a no-profit day where clock stands still"
          >
            <ShieldAlert size={12} /> No-Profit Day
          </button>
        </div>
      </div>

      {/* Main Back Office Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Mark */}
        <div className="flex items-center gap-3">
          <div className="mark w-10 h-10 rounded-xl bg-gradient-to-b from-[#14284A] to-[#0A1426] flex items-center justify-center shadow-md">
            <img src="/graphics/delta-one-mark-256.png" alt="Delta One" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.25em] text-slate-800 dark:text-slate-200 uppercase">
              Delta One
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              Back Office v1.4
            </span>
          </div>

          {/* Customer / Ambassador Side Switcher */}
          <div className="ml-4 hidden sm:flex items-center bg-slate-200/80 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-300/80 dark:border-slate-700">
            <button
              onClick={() => setSide('customer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                side === 'customer'
                  ? 'b3 gold sm text-xs !min-h-0 !h-7 !py-0'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setSide('ambassador')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                side === 'ambassador'
                  ? 'b3 gold sm text-xs !min-h-0 !h-7 !py-0'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Ambassador
            </button>
          </div>
        </div>

        {/* Right Tools & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio SFX Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`b3 sm !min-h-0 !h-9 !w-9 !p-0 rounded-xl ${
              soundEnabled ? 'gold' : ''
            }`}
            title={soundEnabled ? 'Sound FX On' : 'Sound FX Off'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Voice Toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`b3 sm !min-h-0 !h-9 !w-9 !p-0 rounded-xl ${
              voiceEnabled ? 'gold' : ''
            }`}
            title={voiceEnabled ? 'Bolt Voice On' : 'Bolt Voice Off'}
          >
            {voiceEnabled ? <Mic size={16} /> : <MicOff size={16} />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="b3 sm !min-h-0 !h-9 !w-9 !p-0 rounded-xl"
            title={isDark ? 'Switch to 7 Summits Light Mode' : 'Switch to Night Mode'}
          >
            {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-700" />}
          </button>

          {/* User Profile Chip */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-300 dark:border-slate-800">
            <div className="relative">
              <svg className="w-8 h-9 overflow-visible" style={{ color: RANKS['Everest'].color }}>
                <use href="#mbolt" />
                <use href="#mcrown" />
              </svg>
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                Ricky Lundell
              </span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">
                Everest · President
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic event notification pill */}
      {eventText && (
        <div className="bg-amber-100 dark:bg-amber-950/60 border-t border-amber-300 dark:border-amber-800/80 px-4 py-1.5 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <Zap size={13} className="text-amber-600 dark:text-amber-400 flex-none" />
            <span className="truncate">{eventText}</span>
          </div>
          <button
            onClick={onClearEvent}
            className="text-[11px] underline hover:no-underline font-semibold ml-3"
          >
            Dismiss
          </button>
        </div>
      )}
    </header>
  );
}


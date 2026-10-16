import React, { useState } from 'react';
import { User, Shield, Bell, Moon, Sun, Volume2, Mic, Laptop, Smartphone, Check, Copy } from 'lucide-react';
import { RANKS } from '../../data/mockData';
import { sfx } from '../../utils/sfx';

export default function Account({
  theme = 'light',
  setTheme,
  soundEnabled = true,
  setSoundEnabled,
  voiceEnabled = false,
  setVoiceEnabled
}) {
  const [copied, setCopied] = useState(false);
  const [notifs, setNotifs] = useState({
    settle: true,
    booster: true,
    team: true,
    news: false
  });

  const payoutAddr = '0x8A14b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7';

  const copyAddress = () => {
    sfx.play('pop');
    navigator.clipboard?.writeText(payoutAddr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleNotif = (key) => {
    sfx.play('pop');
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      <div>
        <span className="kick">Preferences & Security</span>
        <h1 className="h1 text-3xl sm:text-4xl font-light tracking-tight mt-1">
          Account Settings
        </h1>
        <p className="lbl mt-1">
          Manage your credentials, designated payout address, Bolt settings, and active sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Profile Card */}
        <div className="card p-6 space-y-5 rounded-2xl border border-slate-300 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="w-12 h-14 overflow-visible" style={{ color: RANKS['Everest'].color }}>
                <use href="#mbolt" />
                <use href="#mcrown" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Ricky Lundell
              </h2>
              <span className="chip text-[10px] bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 border-purple-300 dark:border-purple-800 font-bold uppercase tracking-wider">
                Everest · President
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs border-t border-slate-200 dark:border-slate-800 pt-3">
            <div className="flex justify-between py-1">
              <span className="lbl">Email:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">r****@deltaoneai.com</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="lbl">Country:</span>
              <span className="text-slate-800 dark:text-slate-200">United States</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="lbl">Member Since:</span>
              <span className="text-slate-800 dark:text-slate-200">October 2026</span>
            </div>
          </div>
        </div>

        {/* 2. Display & Bolt Assistant */}
        <div className="card p-6 space-y-5 rounded-2xl border border-slate-300 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Display & Bolt Guide
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between tint p-3 rounded-xl">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Theme Palette
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    sfx.play('pop');
                    setTheme('light');
                  }}
                  className={`b3 sm text-xs !min-h-0 !h-7 px-3 ${
                    theme === 'light' ? 'gold' : ''
                  }`}
                >
                  <Sun size={13} className="mr-1 inline" /> 7 Summits
                </button>
                <button
                  onClick={() => {
                    sfx.play('pop');
                    setTheme('dark');
                  }}
                  className={`b3 sm text-xs !min-h-0 !h-7 px-3 ${
                    theme === 'dark' ? 'gold' : ''
                  }`}
                >
                  <Moon size={13} className="mr-1 inline" /> Night Blue
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between tint p-3 rounded-xl">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Bolt Sound Effects
              </span>
              <button
                onClick={() => {
                  sfx.play('pop');
                  setSoundEnabled(!soundEnabled);
                }}
                className={`b3 sm text-xs !min-h-0 !h-7 px-3 ${
                  soundEnabled ? 'gold' : ''
                }`}
              >
                {soundEnabled ? 'Enabled' : 'Muted'}
              </button>
            </div>

            <div className="flex items-center justify-between tint p-3 rounded-xl">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Bolt Voice Speech
              </span>
              <button
                onClick={() => {
                  sfx.play('pop');
                  setVoiceEnabled(!voiceEnabled);
                }}
                className={`b3 sm text-xs !min-h-0 !h-7 px-3 ${
                  voiceEnabled ? 'gold' : ''
                }`}
              >
                {voiceEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Payout Destination */}
        <div className="card p-6 space-y-4 rounded-2xl border border-slate-300 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Designated Payout Address
          </h2>
          <p className="text-xs text-slate-500">
            Shared between Customer Withdrawals and Ambassador Matrix Rewards.
          </p>

          <div className="tint p-3 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all flex items-center justify-between gap-2">
            <span>{payoutAddr}</span>
            <button
              onClick={copyAddress}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex-none"
              title="Copy address"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* 4. Notifications */}
        <div className="card p-6 space-y-4 rounded-2xl border border-slate-300 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Notification Alerts
          </h2>

          <div className="space-y-2.5">
            {[
              { key: 'settle', label: 'Daily 16:00 Dubai Settlement Result' },
              { key: 'booster', label: 'New Module Booster Available' },
              { key: 'team', label: 'New Downline Member Enrolled' },
              { key: 'news', label: 'Founders’ Updates & Video Calls' }
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-700 dark:text-slate-300">{n.label}</span>
                <button
                  onClick={() => toggleNotif(n.key)}
                  className={`b3 sm text-[11px] !min-h-0 !h-6 px-2.5 ${
                    notifs[n.key] ? 'gold' : ''
                  }`}
                >
                  {notifs[n.key] ? 'On' : 'Off'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Active Sessions & Security */}
        <div className="md:col-span-2 card p-6 space-y-4 rounded-2xl border border-slate-300 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Security & Active Devices
            </h2>
            <button
              onClick={() => sfx.play('pop')}
              className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline"
            >
              Sign out of all other devices
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between tint p-3.5 rounded-xl text-xs">
              <div className="flex items-center gap-3">
                <Laptop size={18} className="text-slate-500" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Windows PC · Chrome 130 · Dubai, UAE
                  </span>
                  <span className="text-emerald-600 font-medium">Active now (this device)</span>
                </div>
              </div>
              <span className="chip text-[10px]">Current Session</span>
            </div>

            <div className="flex items-center justify-between tint p-3.5 rounded-xl text-xs">
              <div className="flex items-center gap-3">
                <Smartphone size={18} className="text-slate-500" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    iPhone 16 Pro · Safari 18 · Los Angeles, USA
                  </span>
                  <span className="text-slate-400">Last active 2 hours ago</span>
                </div>
              </div>
              <button
                onClick={() => sfx.play('pop')}
                className="text-slate-500 hover:text-rose-600 underline text-xs"
              >
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


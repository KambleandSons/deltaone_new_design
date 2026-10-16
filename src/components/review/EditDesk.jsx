import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, MessageSquare, Check, X, Clock, Award, Sparkles } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function EditDesk() {
  const [screen, setScreen] = useState('Customer Dashboard');
  const [feedback, setFeedback] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);

  const [edits, setEdits] = useState([
    {
      id: 1,
      author: 'James Pack, Founder',
      screen: 'Module Booster',
      text: 'Ensure the 10-minute timer makes it very clear that the spin expires permanently if let go.',
      status: 'approved',
      time: '1 hour ago'
    },
    {
      id: 2,
      author: 'Ricky Lundell, President',
      screen: 'Live Rewards Clock',
      text: 'Verify the gold micro-decimals continue smoothly even when the browser tab is hidden.',
      status: 'done',
      time: '3 hours ago'
    },
    {
      id: 3,
      author: 'Compliance Lead',
      screen: 'Founder Seats',
      text: 'Confirm seat purchase wording states "revenue allocation" rather than guaranteed yield.',
      status: 'approved',
      time: 'Yesterday'
    }
  ]);

  // Voice recording simulation
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordDuration(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      sfx.play('pop');
      setIsRecording(true);
    } else {
      sfx.play('chirp');
      setIsRecording(false);
      setFeedback((prev) => prev + (prev ? ' ' : '') + '[Voice note: 0:' + String(recordDuration).padStart(2, '0') + ' attached]');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback) return;
    sfx.play('cheer');
    const newEdit = {
      id: Date.now(),
      author: 'Ricky Lundell (You)',
      screen,
      text: feedback,
      status: 'new',
      time: 'Just now'
    };
    setEdits([newEdit, ...edits]);
    setFeedback('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 animate-fade-in">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="kick text-amber-600 dark:text-amber-400">Collaborative Review</span>
          <h1 className="h1 text-3xl sm:text-5xl font-light tracking-tight mt-1">
            Bolt's Edit Desk
          </h1>
          <p className="lbl mt-1 max-w-2xl">
            Propose copy or UX refinements. Leave text or voice notes; Bolt forwards them to the Architect for sign-off.
          </p>
        </div>

        <div className="tint px-4 py-3 rounded-2xl flex items-center gap-3">
          <Clock size={20} className="text-amber-500" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Review Window</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">Active for Founders</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Proposal Submission Form (7 cols) */}
        <div className="lg:col-span-7 card p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-amber-500" />
            <h2 className="text-xl font-medium text-slate-900 dark:text-white">
              Submit an Edit Request
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="lbl text-xs font-semibold uppercase tracking-wider block mb-1">
                Target Screen:
              </label>
              <select
                value={screen}
                onChange={(e) => setScreen(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 outline-none text-slate-800 dark:text-slate-200"
              >
                <option value="Customer Dashboard">Customer Dashboard</option>
                <option value="Purchase a Module">Purchase a Module</option>
                <option value="Module Booster">Module Booster</option>
                <option value="My Modules">My Modules</option>
                <option value="Founder Seats">Founder Seats</option>
                <option value="Balances">Balances</option>
                <option value="Module Management">Module Management</option>
                <option value="Withdraw">Withdraw</option>
                <option value="Network Tree">Network Tree</option>
                <option value="Downline Directory">Downline Directory</option>
                <option value="Commissions">Commissions</option>
                <option value="Commission Reports">Commission Reports</option>
                <option value="Commission Projector">Commission Projector</option>
                <option value="Rank Qualifications">Rank Qualifications</option>
              </select>
            </div>

            <div>
              <label className="lbl text-xs font-semibold uppercase tracking-wider block mb-1">
                Your Feedback or Proposed Change:
              </label>
              <textarea
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What should change? Describe text modifications, button behavior, or layout tweaks..."
                className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl p-3 outline-none text-slate-800 dark:text-slate-200 resize-none"
              />
            </div>

            {/* Voice Recording Control */}
            <div className="flex items-center justify-between tint p-3 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`b3 sm text-xs !min-h-0 !h-8 px-3 gap-1.5 ${
                    isRecording ? 'bg-rose-500 text-white font-bold' : ''
                  }`}
                >
                  {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                  {isRecording ? `Recording (${recordDuration}s)... Stop` : 'Record Voice Note'}
                </button>
                {isRecording && (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                )}
              </div>
              <span className="text-slate-400">Microphone input supported</span>
            </div>

            <button
              type="submit"
              disabled={!feedback}
              className="b3 gold lg full justify-center font-bold text-sm shadow-xl"
            >
              <Send size={16} /> Submit Edit to Architect
            </button>
          </form>
        </div>

        {/* Live Feedback Feed & Leaderboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card p-6 rounded-3xl border border-slate-300 dark:border-slate-800 space-y-4">
            <h3 className="font-semibold text-base text-slate-900 dark:text-white flex items-center justify-between">
              Recent Review Requests ({edits.length})
            </h3>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {edits.map((item) => (
                <div key={item.id} className="tint p-3.5 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{item.author}</span>
                    <span
                      className={`chip text-[10px] font-bold ${
                        item.status === 'approved' || item.status === 'done'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                    Screen: {item.screen} · {item.time}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


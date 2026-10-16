import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, MessageSquare, FileText, ExternalLink } from 'lucide-react';
import { sfx } from '../../utils/sfx';

export default function ReviewUXUI({ onSwitchView }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 animate-fade-in">
      {/* Hero with Bolt */}
      <div className="card p-8 sm:p-12 rounded-3xl border border-slate-300 dark:border-slate-800 bg-gradient-to-br from-amber-500/10 via-sky-500/5 to-transparent relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="flex-none">
            <svg className="w-36 h-40 overflow-visible bolt face-cheer">
              <use href="#mbolt" />
              <use href="#mcrown" />
            </svg>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <span className="kick text-xs text-amber-600 dark:text-amber-400">
              Partner & Founder Review
            </span>
            <h1 className="h1 text-3xl sm:text-5xl font-light tracking-tight">
              Delta One Back Office UX / UI
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              The complete overhaul for the Delta One customer and Ambassador back office.
              Built on the 7 Summits design system, compliant terminology, real-time anticipation live clock,
              and Bolt, our animated AI guide.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  sfx.play('cheer');
                  onSwitchView('backoffice');
                }}
                className="b3 gold lg font-bold text-sm shadow-xl inline-flex items-center gap-2"
              >
                Launch New Back Office <ArrowRight size={16} />
              </button>
              <button
                onClick={() => {
                  sfx.play('pop');
                  onSwitchView('before-after');
                }}
                className="b3 lg text-sm inline-flex items-center gap-2"
              >
                Before & After Comparison
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of the Transformation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 space-y-3 rounded-2xl border border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Compliant Terminology
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Every legacy term (Contract, Yield, AUM, Principal, Deposit, Earnings, ROI) has been completely replaced with compliant phrasing:
            Module Credits, AI Module Rewards, Purchase Wallet, and Rewards Wallet.
          </p>
        </div>

        <div className="card p-6 space-y-3 rounded-2xl border border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-400 text-slate-950 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              7 Summits Design System
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Soft eye-comfort daytime sky gradient, tactile 3-D beveled buttons with pressed states, frosted glass cards, and a seamless toggle into night blue mode.
          </p>
        </div>

        <div className="card p-6 space-y-3 rounded-2xl border border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-400 text-slate-950 font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Anticipation Live Clock
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Smooth 60 FPS odometer ticker moving dollars, cents, and 4 micro-decimals in gold, paired with a speed gauge comparing velocity against yesterday's result.
          </p>
        </div>

        <div className="card p-6 space-y-3 rounded-2xl border border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-400 text-slate-950 font-bold flex items-center justify-center text-sm">
              4
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Bolt Interactive Guide
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            8 animated SVG facial expressions, synthesized retro audio effects, Web Speech voice synthesis, and context-aware button explanations across the entire suite.
          </p>
        </div>
      </div>

      {/* Review Links Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-light text-slate-900 dark:text-white">
          Review Navigation & Sign-off Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'backoffice', title: 'New Back Office', desc: 'Light & Dark interactive app' },
            { id: 'before-after', title: 'Before & After', desc: '8 marked screenshots & tables' },
            { id: 'sign-off', title: 'Sign-Off Sheet', desc: '10 decisions & release checks' },
            { id: 'edit-desk', title: "Bolt's Edit Desk", desc: 'Propose and approve changes' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sfx.play('pop');
                onSwitchView(item.id);
              }}
              className="card p-5 text-left rounded-2xl border border-slate-300 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all group"
            >
              <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between">
                {item.title} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="tint p-4 rounded-xl flex items-center gap-3 text-xs text-slate-500">
        <ShieldCheck size={18} className="text-amber-500 flex-none" />
        <p className="leading-relaxed">
          Version 1.4 · 16 October 2026 · Partner and tech team only · Draft for legal and compliance review.
        </p>
      </div>
    </div>
  );
}


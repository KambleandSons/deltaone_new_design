import React from 'react';
import confetti from 'canvas-confetti';
import { sfx } from '../../utils/sfx';
import { Sparkles, Terminal, Volume2, Smile, Heart, ThumbsUp } from 'lucide-react';

export default function BoltDemo({ onTriggerBoltMood, onTriggerBoltMsg }) {
  const triggerCelebration = (isJackpot, pct) => {
    sfx.play(isJackpot ? 'jackpot' : 'win');
    if (isJackpot) {
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch {}
      onTriggerBoltMood('love');
      onTriggerBoltMsg(`JACKPOT! +${pct}%! Heart eyes unlocked!`);
    } else {
      onTriggerBoltMood('cheer');
      onTriggerBoltMsg(`You landed +${pct}%! Choose your top-up and boost now.`);
    }
  };

  const explainButton = (text) => {
    sfx.play('chirp');
    onTriggerBoltMood('talk');
    onTriggerBoltMsg(text);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fade-in">
      <div>
        <span className="kick text-amber-600 dark:text-amber-400">Drop-in Integration</span>
        <h1 className="h1 text-3xl sm:text-5xl font-light tracking-tight mt-1">
          Bolt Guide Drop-In Demo
        </h1>
        <p className="lbl mt-1">
          Bolt functions as an autonomous companion. Test button explanations or call his programmatic JavaScript API directly.
        </p>
      </div>

      {/* Button explanations playground */}
      <div className="card p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-medium text-slate-900 dark:text-white">
          Contextual Button Explanations
        </h2>
        <p className="text-xs text-slate-500">
          Click any button below: Bolt flies over, plays an audio chirp, and delivers an explanation bubble.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => explainButton('Your home base: the totals, the settlement countdown, and every active Module.')}
            className="b3 sm"
          >
            Dashboard
          </button>
          <button
            onClick={() => explainButton('Starts a new Module. You choose Module Credits from $1,000, and your wallets pay first.')}
            className="b3 sm"
          >
            Purchase a Module
          </button>
          <button
            onClick={() => explainButton('Withdraws settled AI Module Rewards directly in USDT BEP-20 to your payout address.')}
            className="b3 sm"
          >
            Withdraw
          </button>
          <button
            onClick={() => explainButton('A random bonus spin on a top-up, 10 per Module lifetime. Reels symbols only!')}
            className="b3 boost sm text-xs"
          >
            Module Booster
          </button>
          <button
            onClick={() => explainButton('Interactive mountain matrix visualization where ranks follow selected Ambassadors.')}
            className="b3 sm"
          >
            Network Tree
          </button>
          <button
            onClick={() => explainButton('This custom button demonstrates custom explanations attached via metadata.')}
            className="b3 gold sm"
          >
            Custom Button
          </button>
        </div>
      </div>

      {/* Programmatic API Calls */}
      <div className="card p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-amber-500" />
          <h2 className="text-xl font-medium text-slate-900 dark:text-white">
            Programmatic JavaScript API
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Trigger custom animations, sound effects, facial expressions, and speech synthesis directly:
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => triggerCelebration(false, '2.7')}
            className="b3 sm text-xs gap-1.5"
          >
            <Sparkles size={14} className="text-amber-500" /> Bolt.celebrate({'{'} title: '+2.7%' {'}'})
          </button>
          <button
            onClick={() => triggerCelebration(true, '4.6')}
            className="b3 gold sm text-xs gap-1.5 shadow"
          >
            <Heart size={14} className="text-rose-600" /> Bolt.celebrate({'{'} jackpot: true {'}'})
          </button>
          <button
            onClick={() => {
              sfx.play('sad');
              onTriggerBoltMood('sad');
              onTriggerBoltMsg('Aww, that booster timer ran out. Tomorrow brings new opportunities!');
            }}
            className="b3 sm text-xs"
          >
            Bolt.face('sad', 2000)
          </button>
          <button
            onClick={() => {
              sfx.play('pop');
              onTriggerBoltMood('think');
              onTriggerBoltMsg('Hmm... evaluating optimal line balance for Rainier rank...');
            }}
            className="b3 sm text-xs"
          >
            Bolt.face('think', 2000)
          </button>
          <button
            onClick={() => {
              sfx.play('chirp');
              onTriggerBoltMood('talk');
              onTriggerBoltMsg('Settlement is every day at 16:00 Dubai time (12:00 UTC).');
              sfx.say('Settlement is every day at 16:00 Dubai time.');
            }}
            className="b3 sm text-xs"
          >
            Bolt.say('Dubai Settlement...')
          </button>
          <button
            onClick={() => {
              sfx.play('cash');
              onTriggerBoltMood('cheer');
              onTriggerBoltMsg('Cha-ching! 2 USDT gas fee executed successfully on BSC.');
            }}
            className="b3 sm text-xs"
          >
            Bolt.sfx('cash')
          </button>
        </div>
      </div>
    </div>
  );
}


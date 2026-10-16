import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { sfx } from '../utils/sfx';
import { customerApi, ambassadorApi } from '../services/api';

const BackOfficeContext = createContext(null);

export const INITIAL_MODULES = [
  { id: 'ΔM-0001', price: 1000, day: 137, rebuy: true },
  { id: 'ΔM-0002', price: 5000, day: 42, rebuy: false },
  { id: 'ΔM-0003', price: 1000, day: 6, rebuy: true },
  { id: 'ΔM-0000', price: 1000, day: 400, rebuy: false }
];

export const INITIAL_WALLETS = {
  purchase: 0.00,
  rewards: 312.40,
  matrix: 2098.12
};

export function BackOfficeProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('delta_theme') || 'light');
  useEffect(() => {
    localStorage.setItem('delta_theme', theme);
  }, [theme]);

  // Audio & Voice state
  const [sound, setSound] = useState(true);
  const [voice, setVoice] = useState(false);
  useEffect(() => {
    sfx.enabled = sound;
    sfx.voiceEnabled = voice;
  }, [sound, voice]);

  // User & Portfolio State
  const [user, setUser] = useState({
    name: 'Ricky Lundell',
    username: 'rickylundell',
    sponsor: 'Delta 1',
    rank: 'Everest',
    payoutAddress: ''
  });

  const [modules, setModules] = useState(INITIAL_MODULES);
  const [nextModId, setNextModId] = useState(4);
  const [wallets, setWallets] = useState(INITIAL_WALLETS);

  // Performance simulation metrics
  const [avg7, setAvg7] = useState(0.0084);
  const [avg30, setAvg30] = useState(0.0051);
  const [yday, setYday] = useState(0.0050);
  const [prevDay, setPrevDay] = useState(0.0096);
  const [hist, setHist] = useState([0.0071, 0.0093, 0, 0.0112, 0.0089, 0.0127, 0.0096]);
  const [simRate, setSimRate] = useState('plan'); // 'week' | 'month' | 'plan'

  // Booster state
  const [boosts, setBoosts] = useState({ 'ΔM-0001': 3, 'ΔM-0002': 1 });
  const [boostCap] = useState(5.0);
  const [boosterOffer, setBoosterOffer] = useState(null);

  // Status event banner
  const [eventText, setEventText] = useState('');

  // Bolt Assistant state
  const [boltMood, setBoltMood] = useState('happy');
  const [boltTitle, setBoltTitle] = useState('Bolt · your edit assistant');
  const [boltMsg, setBoltMsg] = useState(
    "Hey, team! I'm Bolt, your review and edit assistant. It's review time! Press any button and I'll explain it."
  );
  const [gOpen, setGOpen] = useState(false);
  const [gDocked, setGDocked] = useState(true);
  const [gPos, setGPos] = useState({ x: 0, y: 0 });

  // Countdown to next 16:00 Dubai (12:00 UTC) settlement
  const [cd, setCd] = useState({ h: '00', m: '00', s: '00', fracDay: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextSettle = new Date(now);
      nextSettle.setUTCHours(12, 0, 0, 0);
      if (nextSettle.getTime() <= now.getTime()) {
        nextSettle.setUTCDate(nextSettle.getUTCDate() + 1);
      }
      const lastSettle = new Date(nextSettle);
      lastSettle.setUTCDate(lastSettle.getUTCDate() - 1);

      let diffSec = Math.max(0, Math.floor((nextSettle.getTime() - now.getTime()) / 1000));
      const h = String(Math.floor(diffSec / 3600)).padStart(2, '0');
      diffSec %= 3600;
      const m = String(Math.floor(diffSec / 60)).padStart(2, '0');
      const s = String(diffSec % 60).padStart(2, '0');

      const fracDay = Math.min(1, Math.max(0, (now.getTime() - lastSettle.getTime()) / 86400000));
      setCd({ h, m, s, fracDay });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Formatters
  const fmt = useCallback((n) => {
    return Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, []);

  const usd = useCallback((n) => `$${fmt(n)}`, [fmt]);

  const pct = useCallback((n) => (Math.round((n || 0) * 100) / 100).toString(), []);

  // Module Calculator (matching prototype math exactly)
  const calcModule = useCallback((m) => {
    const daily = m.price * 0.005;
    const cap = 2 * m.price;
    const delivered = Math.min((m.base || 0) + (m.day - (m.bday || 0)) * daily, cap);
    const used = delivered / 2;
    const remain = m.price - used;
    const done = delivered >= cap;
    const rp = cap > 0 ? (delivered / cap) * 100 : 0;
    const remP = m.price > 0 ? (remain / m.price) * 100 : 0;
    const cx = 8 + (rp / 100) * 238;
    const cy = 88 - (rp / 100) * 80;
    const left = cap - delivered;

    const est = (rate) => {
      if (done) return { days: '—', date: 'Completed' };
      if (!rate || rate <= 0) return { days: '—', date: '—' };
      const d = Math.ceil(left / (m.price * rate));
      const dt = new Date(Date.now() + d * 86400000);
      return {
        days: String(d),
        date: dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      };
    };

    const currentWeekAvg = hist.length ? hist.reduce((a, b) => a + b, 0) / hist.length : avg7;
    const e7 = est(currentWeekAvg);
    const e30 = est(avg30);
    const ep = est(0.005);

    return {
      ...m,
      dayTxt: String(Math.floor(m.day)),
      priceTxt: usd(m.price),
      capTxt: usd(cap),
      dailyTxt: usd(daily),
      remainTxt: usd(remain),
      usedTxt: usd(used),
      rewardTxt: usd(delivered),
      remainPct: pct(remP),
      usedPct: pct(100 - remP),
      rewardPct: pct(rp),
      status: done ? 'Completed' : 'Active',
      statusCls: done ? '' : 'good',
      done,
      phase:
        m.day < 10
          ? 'Days 1–10: each day’s rewards auto-rebuy into a small rebuy Module'
          : 'From day 11 the Auto-Rebuy switch decides where rewards go',
      cx,
      cy,
      trail: `8,88 ${cx},${cy}`,
      e7Days: e7.days,
      e7Date: e7.date,
      e30Days: e30.days,
      e30Date: e30.date,
      epDays: ep.days,
      epDate: ep.date,
      active: !done,
      _rem: remain,
      _del: delivered,
      _price: m.price
    };
  }, [avg7, avg30, hist, usd, pct]);

  // Aggregated totals
  const allCalculatedModules = useMemo(() => modules.map(calcModule), [modules, calcModule]);
  const activeModules = useMemo(() => allCalculatedModules.filter((m) => !m.done), [allCalculatedModules]);

  const totals = useMemo(() => {
    const orig = activeModules.reduce((sum, m) => sum + m._price, 0);
    const rem = activeModules.reduce((sum, m) => sum + m._rem, 0);
    const del = activeModules.reduce((sum, m) => sum + m._del, 0);
    return {
      count: String(activeModules.length),
      original: usd(orig),
      remaining: usd(rem),
      rewards: usd(del),
      remainPct: orig > 0 ? pct((rem / orig) * 100) : '0',
      _orig: orig,
      _rem: rem,
      _del: del
    };
  }, [activeModules, usd, pct]);

  // Rate calculator
  const currentSimRateValue = useMemo(() => {
    if (simRate === 'week') return hist.reduce((a, b) => a + b, 0) / hist.length;
    if (simRate === 'month') return avg30;
    return 0.005;
  }, [simRate, hist, avg30]);

  // Run Day simulation action
  const runDay = useCallback((isZero = false) => {
    if (isZero) {
      sfx.play('sad');
      setPrevDay(yday);
      setYday(0);
      setHist((prev) => [...prev.slice(1), 0]);
      setEventText('No-profit day: no profit, no payout. Module Credits and AI Module Rewards stay where they are.');
      setBoltMood('sad');
      setBoltTitle('No-profit day');
      setBoltMsg('No profit today, so no payout. That’s how it works: your credits and rewards wait right where they are. Tomorrow is a new day.');
      return;
    }

    const rt = currentSimRateValue;
    let toWallet = 0;
    let rebuy = 0;

    setModules((prevMods) =>
      prevMods.map((m) => {
        const c = calcModule(m);
        if (c.done) return m;
        const d = Math.min(m.price * rt, 2 * m.price - c._del);
        const nd = m.day + rt / 0.005;
        if (m.day < 10 || m.rebuy) {
          rebuy += d;
        } else {
          toWallet += d;
        }
        return { ...m, day: nd };
      })
    );

    setWallets((prev) => ({
      ...prev,
      rewards: prev.rewards + toWallet
    }));

    setPrevDay(yday);
    setYday(rt);
    setHist((prev) => [...prev.slice(1), rt]);

    sfx.play('cheer');
    const rateName = simRate === 'week' ? "last week's average" : simRate === 'month' ? "last month's average" : 'the 0.50% plan average';
    setEventText(
      `One day at ${rateName} (${(rt * 100).toFixed(2)}%): ${usd(toWallet)} of AI Module Rewards to your Rewards Wallet${
        rebuy > 0 ? `, ${usd(rebuy)} auto-rebuys` : ''
      }. Module Credits counted down on every active Module.`
    );
    setBoltMood('cheer');
    setBoltTitle('Run one day');
    setBoltMsg('Another day climbed! Blue went down a little, gold went up a little. That’s your Modules at work.');
  }, [currentSimRateValue, calcModule, simRate, yday, usd]);

  // Reset simulation sample
  const resetSample = useCallback(() => {
    sfx.play('pop');
    setModules(INITIAL_MODULES);
    setWallets(INITIAL_WALLETS);
    setYday(0.005);
    setPrevDay(0.0096);
    setHist([0.0071, 0.0093, 0, 0.0112, 0.0089, 0.0127, 0.0096]);
    setBoosts({ 'ΔM-0001': 3, 'ΔM-0002': 1 });
    setBoosterOffer(null);
    setEventText('Sample reset to original initial state.');
    setBoltMood('happy');
    setBoltTitle('Sample Reset');
    setBoltMsg('All sample figures are back to where they started. Ready for another run!');
  }, []);

  // Purchase Module Action
  const purchaseModule = useCallback(async ({ amount, payP, payR, payM }) => {
    const amt = parseFloat(amount) || 1000;
    let left = amt;
    const take = (on, bal) => {
      if (!on) return 0;
      const t = Math.min(bal, left);
      left -= t;
      return t;
    };
    const fromP = take(payP, wallets.purchase);
    const fromR = take(payR, wallets.rewards);
    const fromM = take(payM, wallets.matrix);
    const fromUsdt = left;

    // Call API service
    await customerApi.purchaseModule({ amount: amt, payPurchase: fromP, payRewards: fromR, payMatrix: fromM });

    // Deduct balances
    setWallets((prev) => ({
      purchase: prev.purchase - fromP,
      rewards: prev.rewards - fromR,
      matrix: prev.matrix - fromM
    }));

    const newId = `ΔM-000${nextModId}`;
    setNextModId((id) => id + 1);
    setModules((prev) => [{ id: newId, price: amt, day: 0, rebuy: true }, ...prev]);

    sfx.play('cheer');
    setEventText(`Module ${newId} purchased: ${usd(amt)} added to your active Modules.`);
    setBoltMood('cheer');
    setBoltTitle('New Module Active');
    setBoltMsg(`Module ${newId} has arrived! It starts at the foot of its own mountain. Welcome to the climb!`);
    return newId;
  }, [wallets, nextModId, usd]);

  // Booster Actions
  const spinBooster = useCallback(async (modId) => {
    sfx.play('tick');
    const res = await customerApi.spinBooster(modId);
    setBoosts((prev) => ({ ...prev, [modId]: (prev[modId] || 0) + 1 }));
    setBoosterOffer(res);

    if (res.isJackpot) {
      sfx.play('jackpot');
      setBoltMood('love');
      setBoltTitle('★ JACKPOT! ★');
      setBoltMsg(`JACKPOT! +${res.pct.toFixed(1)}% bonus credits on Module ${modId}! Choose your top-up before the timer ends!`);
    } else {
      sfx.play('win');
      setBoltMood('cheer');
      setBoltTitle(`+${res.pct.toFixed(1)}% Booster`);
      setBoltMsg(`You landed +${res.pct.toFixed(1)}%! Top up Module ${modId} now to secure your bonus credits.`);
    }
    return res;
  }, []);

  const acceptBooster = useCallback(async (modId, topUp, bonus) => {
    await customerApi.acceptBoosterOffer({ moduleId: modId, topUpAmount: topUp, bonusAmount: bonus });
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== modId) return m;
        return {
          ...m,
          price: m.price + topUp + bonus,
          base: (m.base || 0) + bonus,
          bday: m.day
        };
      })
    );
    setBoosterOffer(null);
    sfx.play('cash');
    setEventText(`Module ${modId} boosted: +${usd(topUp)} top-up with +${usd(bonus)} bonus credits.`);
    setBoltMood('cheer');
    setBoltTitle('Boost Applied!');
    setBoltMsg(`Congratulations! Your bonus credits of ${usd(bonus)} have been added to Module ${modId}.`);
  }, [usd]);

  const dropBooster = useCallback(() => {
    setBoosterOffer(null);
    sfx.play('sad');
    setEventText('Booster offer let go. The spin count remains logged.');
    setBoltMood('sad');
    setBoltTitle('Booster Departed');
    setBoltMsg('That booster has flown away. But your Module still has more spins waiting!');
  }, []);

  // Withdraw Action
  const withdrawRewards = useCallback(async (amount, address) => {
    const amt = parseFloat(amount) || 0;
    if (amt > wallets.rewards) return false;
    await customerApi.requestWithdrawal({ amount: amt, address });
    setWallets((prev) => ({ ...prev, rewards: prev.rewards - amt }));
    sfx.play('cash');
    setEventText(`Withdrawal of ${usd(amt)} USDT submitted to payout queue.`);
    setBoltMood('cheer');
    setBoltTitle('Withdrawal Submitted');
    setBoltMsg(`Your request for ${usd(amt)} USDT is on its way to your wallet.`);
    return true;
  }, [wallets.rewards, usd]);

  // Speech Helper
  const say = useCallback((text) => {
    if (!voice || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const vs = window.speechSynthesis.getVoices();
      const v = vs.find((x) => /^en/i.test(x.lang));
      if (v) u.voice = v;
      u.rate = 1.35;
      u.pitch = 1.8;
      window.speechSynthesis.speak(u);
    } catch {}
  }, [voice]);

  const toggleTheme = useCallback(() => {
    sfx.play('pop');
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({
    // Theme & Audio
    theme,
    setTheme,
    toggleTheme,
    sound,
    setSound,
    voice,
    setVoice,
    say,

    // User & Wallets
    user,
    setUser,
    wallets,
    setWallets,

    // Modules & Totals
    modules,
    setModules,
    allCalculatedModules,
    activeModules,
    totals,
    calcModule,

    // Simulation Rates & Handlers
    avg7,
    avg30,
    yday,
    prevDay,
    hist,
    simRate,
    setSimRate,
    currentSimRateValue,
    runDay,
    resetSample,

    // Booster
    boosts,
    boostCap,
    boosterOffer,
    spinBooster,
    acceptBooster,
    dropBooster,

    // Operations
    purchaseModule,
    withdrawRewards,

    // Live settlement countdown
    cd,

    // Alerts & Bolt
    eventText,
    setEventText,
    boltMood,
    setBoltMood,
    boltTitle,
    setBoltTitle,
    boltMsg,
    setBoltMsg,
    gOpen,
    setGOpen,
    gDocked,
    setGDocked,
    gPos,
    setGPos,

    // Utilities
    fmt,
    usd,
    pct
  }), [
    theme, toggleTheme, sound, voice, say,
    user, wallets, modules, allCalculatedModules, activeModules, totals, calcModule,
    avg7, avg30, yday, prevDay, hist, simRate, currentSimRateValue, runDay, resetSample,
    boosts, boostCap, boosterOffer, spinBooster, acceptBooster, dropBooster,
    purchaseModule, withdrawRewards, cd,
    eventText, boltMood, boltTitle, boltMsg, gOpen, gDocked, gPos,
    fmt, usd, pct
  ]);

  return (
    <BackOfficeContext.Provider value={value}>
      {children}
    </BackOfficeContext.Provider>
  );
}

export function useBackOffice() {
  const ctx = useContext(BackOfficeContext);
  if (!ctx) throw new Error('useBackOffice must be used within BackOfficeProvider');
  return ctx;
}

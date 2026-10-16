// Delta One Back Office Data & Deterministic Models

export const RANKS = {
  'No rank yet': { levels: '0', ent: '0%', cap: '$0', color: '#9AA6B2', crown: false },
  'Fuji': { levels: '1–3', ent: '6%', cap: '$1,000', color: '#E5484D', crown: false },
  'Kilimanjaro': { levels: '1–6', ent: '12%', cap: '$2,000', color: '#F5841F', crown: false },
  'Matterhorn': { levels: '1–9', ent: '18%', cap: '$3,000', color: '#EBB520', crown: false },
  'Denali': { levels: '1–12', ent: '24%', cap: '$4,000', color: '#30A46C', crown: false },
  'Rainier': { levels: '1–15', ent: '30%', cap: '$5,000', color: '#2E8FE6', crown: false },
  'K-2': { levels: '1–18', ent: '36%', cap: '$6,000', color: '#5B5BD6', crown: false },
  'Everest': { levels: '1–21', ent: '42%', cap: '$7,000', color: '#8E4EC6', crown: true }
};

export const RANK_REQ = {
  'No rank yet': { pv: 0, enr: 0, tv: 0, capPct: 1, levels: '0', ent: '0%', cap: '$0' },
  'Fuji': { pv: 1000, enr: 2, tv: 2000, capPct: 0.5, levels: '1–3', ent: '6%', cap: '$1,000' },
  'Kilimanjaro': { pv: 2500, enr: 3, tv: 5000, capPct: 0.5, levels: '1–6', ent: '12%', cap: '$2,000' },
  'Matterhorn': { pv: 6000, enr: 4, tv: 12000, capPct: 1 / 3, levels: '1–9', ent: '18%', cap: '$3,000' },
  'Denali': { pv: 12000, enr: 5, tv: 25000, capPct: 1 / 3, levels: '1–12', ent: '24%', cap: '$4,000' },
  'Rainier': { pv: 25000, enr: 7, tv: 75000, capPct: 0.25, levels: '1–15', ent: '30%', cap: '$5,000' },
  'K-2': { pv: 50000, enr: 12, tv: 250000, capPct: 0.2, levels: '1–18', ent: '36%', cap: '$6,000' },
  'Everest': { pv: 200000, enr: 21, tv: 1000000, capPct: 0.2, levels: '1–21', ent: '42%', cap: '$7,000' }
};

export const ORDERED_RANKS = ['No rank yet', 'Fuji', 'Kilimanjaro', 'Matterhorn', 'Denali', 'Rainier', 'K-2', 'Everest'];

export const FOUNDER_MESSAGES = [
  {
    id: 1,
    type: 'video',
    title: 'This week on the climb',
    from: 'James Pack, Founder',
    date: 'Friday 16 October',
    text: 'Thank you for climbing with us in our first week. A short word from me on what we built, what comes next, and why people come first at Delta One.',
    dur: '3:12',
    cta: 'Watch the message'
  },
  {
    id: 2,
    type: 'flyer',
    title: 'Founders’ call this Thursday',
    from: 'Ricky Lundell, President',
    date: 'Tuesday 13 October',
    text: 'Join James and me live on Thursday at 15:00 UTC. Bring one guest who should hear the Delta One story. Your local time shows in the invitation.',
    flyer: ['FOUNDERS’ CALL', 'Thursday', '15:00 UTC', 'James Pack · Ricky Lundell · live', 'Add to calendar'],
    cta: 'Add to calendar'
  },
  {
    id: 3,
    type: 'text',
    title: 'Welcome to the new back office',
    from: 'The founders',
    date: 'Monday 12 October',
    text: 'Everything in one place: your Modules, your rewards and your team, with Bolt to explain any button. Tell us what to improve; every idea is read.',
    quote: 'Built for you to see everything, every day.',
    cta: 'Ask Bolt for a tour'
  }
];

export const FOUNDER_SEATS = [
  { tier: 'Sherpa', seats: 10, total: 10, sold: 10, left: 0, price: 200000, share: '2.5%' },
  { tier: 'Mountaineer', seats: 11, total: 25, sold: 14, left: 11, price: 100000, share: '1.25%' },
  { tier: 'Trailblazer', seats: 16, total: 25, sold: 9, left: 16, price: 50000, share: '0.625%' },
  { tier: 'Pathfinder', seats: 34, total: 50, sold: 16, left: 34, price: 25000, share: '0.3125%' },
  { tier: 'Pioneer', seats: 41, total: 50, sold: 9, left: 41, price: 10000, share: '0.125%' },
  { tier: 'Guide', seats: 87, total: 100, sold: 13, left: 87, price: 5000, share: '0.0625%' }
];

export const INITIAL_MODULES = [
  { id: 'ΔM-0001', price: 1000, day: 137, rebuy: true },
  { id: 'ΔM-0002', price: 5000, day: 42, rebuy: true },
  { id: 'ΔM-0003', price: 1000, day: 6, rebuy: true },
  { id: 'ΔM-0000', price: 1000, day: 400, rebuy: false }
];

export const FAQS = [
  {
    q: 'What is a Module?',
    a: 'A Module is your membership unit in Delta One. When you purchase a Module, it holds Module Credits that are used over time as trading opportunities occur. Modules are not investment contracts, and rewards are derived from AI algorithmic arbitrage execution.'
  },
  {
    q: 'When are daily AI Module Rewards credited?',
    a: 'Settlement takes place every single day at 16:00 Dubai time (12:00 UTC). The live clock builds anticipation leading up to settlement. Once settlement completes, your AI Module Rewards are instantly added to your Rewards Wallet.'
  },
  {
    q: 'What is the difference between Module Credits and AI Module Rewards?',
    a: 'Module Credits represent the remaining capacity of your Module. Over time, as AI Module Rewards are delivered, credits are consumed until the Module finishes at 2× (or 2.2× for Believers). Rewards delivered can be withdrawn in USDT or used to top up.'
  },
  {
    q: 'How do withdrawals work?',
    a: 'Withdrawals are processed in USDT (BEP-20) to your designated payout address. The minimum withdrawal is 5 USDT, with a maximum of one request per day (UTC). Processing usually takes about 15 minutes.'
  },
  {
    q: 'What is Auto-Rebuy and the Believer benefit?',
    a: 'On days 1–10, every Module automatically rebuys daily rewards into new micro-volume. From day 11 onwards, you can toggle Auto-Rebuy on or off. A "Believer" is a member who keeps Auto-Rebuy active for the entire lifetime of the Module, increasing the completion cap from 2.0× to 2.2×!'
  },
  {
    q: 'What is the Module Booster?',
    a: 'Module Booster is a top-up celebration feature that gives each Module up to 10 lifetime booster spins. Each spin reels symbols (?, Δ, ★, ⚡, ✦) and awards a bonus percentage (from 0.1% up to the daily cap). You have 10 minutes to take the offer with a top-up purchase.'
  },
  {
    q: 'How are Ambassador commissions structured?',
    a: 'Commissions consist of two parts: (1) Base Matrix (2% of each Module’s daily result on all paid levels, capped daily by rank) and (2) Breakage Differential (the entitlement percentage gap between your rank and the highest rank in each line, uncapped). Most members earn no commission at all.'
  },
  {
    q: 'Is anything guaranteed?',
    a: 'No. Rewards and commissions are strictly variable and never guaranteed. Days can pay more, less, or nothing at all (no-profit days). Only purchase with funds you can afford to lose.'
  }
];

export const ACTIVITY_DATA = [
  { id: 'tx-1', tab: 'tx', k: 'added', event: 'USDT Added · BEP-20 deposit', time: '2026-10-15 14:22', proof: '0x3b91…e421', amount: '+5,000.00' },
  { id: 'tx-2', tab: 'rew', k: 'module', event: 'AI Module Rewards · Module ΔM-0002', time: '2026-10-14 12:00', proof: '0x8f3a…c21e', amount: '+25.00' },
  { id: 'tx-3', tab: 'rew', k: 'module', event: 'AI Module Rewards · Module ΔM-0001', time: '2026-10-14 12:00', proof: '0xa419…8201', amount: '+5.00' },
  { id: 'tx-4', tab: 'rebuy', k: 'module', event: 'Auto-Rebuy · Module ΔM-0003 day 6', time: '2026-10-14 12:00', proof: '0x7120…fa19', amount: '+5.00' },
  { id: 'tx-5', tab: 'tx', k: 'withdraw', event: 'Withdrawal to payout address', time: '2026-10-12 18:04', proof: '0x9921…10aa', amount: '-150.00' },
  { id: 'tx-6', tab: 'ops', k: 'module', event: 'Module ΔM-0003 purchased', time: '2026-10-08 09:15', proof: '0x2211…55bc', amount: '-1,000.00' },
  { id: 'tx-7', tab: 'wal', k: 'added', event: 'Wallet Transfer: Rewards to Purchase', time: '2026-10-07 11:30', proof: '0x1100…99ab', amount: '+400.00' }
];

export const DECISIONS_LIST = [
  {
    id: 1,
    title: 'How Module Credits count down',
    body: 'Proposed: 1 Module Credit is used for every 2 USDT of AI Module Rewards, so a $1,000 Module has $500 of credits left at about day 200 and reaches zero exactly when it completes at 2× (about day 400). The spec’s 1-for-1 example would empty credits at day 200 while rewards keep paying.',
    status: 'approved'
  },
  {
    id: 2,
    title: 'How progress % is shown on Module cards',
    body: 'Proposed: the card meter shows AI Module Rewards progress towards 2× (0% to 100%), alongside the Credits Remaining meter. The cards currently show % remaining and % completed.',
    status: 'approved'
  },
  {
    id: 3,
    title: 'Mountaineer seat count and share percentage',
    body: 'The requested 45% Mountaineer seats is not a whole number (11 seats = 44%, 12 seats = 48%). Proposed: 11 of 25 seats left (44%), matching the seat register.',
    status: 'approved'
  },
  {
    id: 4,
    title: 'Payout address: one address for Customer and Ambassador',
    body: 'Proposed: the customer Withdraw and Ambassador Withdraw share one payout address saved in Account, with an optional toggle to use separate addresses.',
    status: 'approved'
  },
  {
    id: 5,
    title: 'Founder Seats share of revenue vs share of net',
    body: 'Legal requires clarification whether Founder Seat percentages apply to gross turnover or net company results after member rewards.',
    status: 'pending'
  },
  {
    id: 6,
    title: 'Module Booster top-up payment priority',
    body: 'Proposed: Booster top-up uses Rewards Wallet first, then Purchase Wallet, then external USDT BEP-20.',
    status: 'approved'
  },
  {
    id: 7,
    title: 'Daily rewards speed gauge label threshold',
    body: 'Proposed: speed gauge marks "Same speed" when the closed result is within 0.005 points of yesterday, "Faster" when above, "Slower" when below, and "Standing still" on no-profit days.',
    status: 'approved'
  },
  {
    id: 8,
    title: 'Network tree rank following selected position',
    body: 'Confirmed: selecting any Ambassador position in the network tree dynamically updates the rank chip and requirements to that position rather than the viewer.',
    status: 'approved'
  },
  {
    id: 9,
    title: 'Live clock wording and anticipation rules',
    body: 'Agreed: today’s exact amount or rate per second is never revealed before 16:00 Dubai time. Members only see the moving odometer and the relative speed gauge.',
    status: 'approved'
  },
  {
    id: 10,
    title: 'Legal sign-off on Module Booster random mechanics',
    body: 'Counsel review required for random spin bonus compliance in key European and Asian jurisdictions before production deployment.',
    status: 'pending'
  }
];

export const BEFORE_AFTER_ROWS = [
  {
    ref: 'Reference 1',
    img: '/graphics/original-screens/1-customer-dashboard.jpg',
    alt: 'Current customer dashboard with legacy terms marked in red',
    where: 'Customer › Dashboard',
    title: 'Customer Dashboard',
    pairs: [
      { was: 'Open a contract', now: 'Purchase a Module' },
      { was: 'My contracts', now: 'My Modules' },
      { was: 'AUM (menu)', now: 'Module Management' },
      { was: 'AUM · Active contracts', now: 'Active Modules' },
      { was: 'Earnings wallet', now: 'Rewards Wallet' },
      { was: 'Total earnings', now: 'AI Module Rewards (delivered)' },
      { was: 'Deposit wallet', now: 'Purchase Wallet' },
      { was: 'Daily yield / ROI', now: 'Daily AI Module Reward' }
    ]
  },
  {
    ref: 'Reference 2',
    img: '/graphics/original-screens/2-purchase-flow.jpg',
    alt: 'Purchase flow with Contract terms replaced',
    where: 'Customer › Purchase a Module',
    title: 'Purchase a Module',
    pairs: [
      { was: 'Contract amount', now: 'Module Credits' },
      { was: 'Pay with Principal', now: 'Pay from Purchase Wallet' },
      { was: 'Contract yield cap 200%', now: 'Most it can deliver: 2× (2.2× Believer)' },
      { was: 'Auto-compound', now: 'Auto-Rebuy' },
      { was: 'Deposit now', now: 'Purchase Module' }
    ]
  },
  {
    ref: 'Reference 3',
    img: '/graphics/original-screens/3-balances.jpg',
    alt: 'Balances page with four buckets',
    where: 'Customer › Balances',
    title: 'Balances',
    pairs: [
      { was: 'Deposit balance', now: 'Purchase Wallet' },
      { was: 'Earnings balance', now: 'Rewards Wallet' },
      { was: 'Matrix balance', now: 'Matrix Rewards' },
      { was: 'Total balance', now: 'Four separate buckets that never merge' }
    ]
  },
  {
    ref: 'Reference 4',
    img: '/graphics/original-screens/4-aum-page.jpg',
    alt: 'AUM page renamed to Module Management',
    where: 'Customer › Module Management',
    title: 'Module Management (was AUM)',
    pairs: [
      { was: 'AUM Dashboard', now: 'Module Management' },
      { was: 'Contract ID', now: 'Module ID' },
      { was: 'Original deposit', now: 'Original credits' },
      { was: 'Yield earned', now: 'AI Module Rewards' },
      { was: 'Remaining ROI', now: 'Credits remaining / % of 2×' }
    ]
  },
  {
    ref: 'Reference 5',
    img: '/graphics/original-screens/5-withdraw.jpg',
    alt: 'Withdraw screen',
    where: 'Customer › Withdraw',
    title: 'Withdraw',
    pairs: [
      { was: 'Withdraw earnings', now: 'Withdraw from Rewards Wallet' },
      { was: 'Balance available', now: 'Available Rewards' },
      { was: 'Fee breakdown', now: 'USDT BEP-20 Network Gas' }
    ]
  },
  {
    ref: 'Reference 6',
    img: '/graphics/original-screens/6-withdraw-marked.jpg',
    alt: 'Marked withdraw screenshot',
    where: 'Customer › Withdraw (detail)',
    title: 'Withdrawal Terms & Limits',
    pairs: [
      { was: 'Instant withdrawal', now: 'Daily settlement window (16:00 Dubai)' },
      { was: 'Minimum $10', now: 'Minimum 5 USDT' },
      { was: 'Principal release', now: 'Module Credits are used over time and non-refundable' }
    ]
  },
  {
    ref: 'Reference 7',
    img: '/graphics/original-screens/7-activity.jpg',
    alt: 'Activity and transactions log',
    where: 'Customer › Activity',
    title: 'Activity',
    pairs: [
      { was: 'Accruals', now: 'Daily rewards' },
      { was: 'Auto-compound events', now: 'Auto-Rebuy' },
      { was: 'Yield distributions', now: 'AI Module Rewards' }
    ]
  },
  {
    ref: 'Reference 8',
    img: '/graphics/original-screens/8-network-tree.jpg',
    alt: 'Network tree matrix',
    where: 'Ambassador › Network Tree',
    title: 'Network Tree',
    pairs: [
      { was: 'Static viewer rank', now: 'Rank follows selected Ambassador position' },
      { was: 'Generic matrix pins', now: '3-D rank-colored Bolts with legend' },
      { was: 'Direct bonus', now: 'Base Matrix (2%) + Breakage Differential' }
    ]
  }
];

// Deterministic downline data generation
export function generateDownline() {
  let seed = 6;
  const rnd = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const ORDER = ['No rank yet', 'Fuji', 'Kilimanjaro', 'Matterhorn', 'Denali', 'Rainier', 'K-2', 'Everest'];
  const REQ = {
    'No rank yet': [0, 0, 0, 1],
    Fuji: [1000, 2, 2000, 0.5],
    Kilimanjaro: [2500, 3, 5000, 0.5],
    Matterhorn: [6000, 4, 12000, 1 / 3],
    Denali: [12000, 5, 25000, 1 / 3],
    Rainier: [25000, 7, 75000, 0.25],
    'K-2': [50000, 12, 250000, 0.2],
    Everest: [200000, 21, 1000000, 0.2]
  };
  const LV = [
    259722.84, 205000, 160000, 120000, 95000, 70000, 48000, 30000, 22000, 15000, 11000, 8500, 6200, 4800, 5000, 3000,
    2000, 2000, 1000, 1000, 1000
  ];
  const LR = [
    'K-2', 'Rainier', 'Rainier', 'Denali', 'Matterhorn', 'Denali', 'Matterhorn', 'Kilimanjaro', 'Kilimanjaro', 'Fuji',
    'Fuji', 'Fuji', 'Fuji', 'Fuji', 'No rank yet', 'No rank yet', 'No rank yet', 'No rank yet', 'No rank yet', 'No rank yet',
    'No rank yet'
  ];
  const LM = [69, 54, 42, 33, 27, 23, 19, 15, 12, 10, 9, 8, 7, 6, 5, 5, 4, 4, 3, 2, 2];
  const all = [];

  LM.forEach((size, li) => {
    const line = [];
    const leader = { line: li + 1, level: 1, rank: LR[li], parent: null, kids: [] };
    line.push(leader);
    for (let k = 1; k < size; k++) {
      const needy = line.find((m) => m.kids.length < REQ[m.rank][1] && m.level < 21);
      let par;
      if (needy && rnd() < 0.85) par = needy;
      else {
        const pool = line.filter((m) => m.level < 21);
        par = rnd() < 0.55 ? pool[Math.max(0, pool.length - 1 - Math.floor(rnd() * 3))] : pool[Math.floor(rnd() * pool.length)];
      }
      const pIdx = ORDER.indexOf(par.rank);
      const r = rnd();
      let idx = r < 0.5 ? 0 : r < 0.76 ? 1 : r < 0.88 ? 2 : r < 0.94 ? 3 : r < 0.975 ? 4 : r < 0.993 ? 5 : 6;
      idx = Math.min(idx, Math.max(0, pIdx - 1));
      const m = { line: li + 1, level: par.level + 1, rank: ORDER[idx], parent: par, kids: [] };
      par.kids.push(m);
      line.push(m);
    }

    line.forEach((m) => {
      m.active = !(m.rank === 'No rank yet' && m !== leader && rnd() < 0.14);
      m.pv = m.active ? Math.max(1000, REQ[m.rank][0]) : 0;
    });

    let base = line.reduce((a, m) => a + m.pv, 0);
    while (base > LV[li]) {
      const c = line.filter((m) => m.active && m.rank === 'No rank yet' && m !== leader);
      if (!c.length) break;
      const x = c[c.length - 1];
      x.active = false;
      base -= x.pv;
      x.pv = 0;
    }
    let rest = LV[li] - base;
    const act = line.filter((m) => m.active);
    const ws = act.map((m) => (1 + ORDER.indexOf(m.rank)) ** 2.4 * (0.4 + rnd()));
    const wsum = ws.reduce((a, b) => a + b, 0);
    act.forEach((m, i) => {
      const add = Math.floor((rest * ws[i]) / wsum / 100) * 100;
      m.pv += add;
    });
    const tot = line.reduce((a, m) => a + m.pv, 0);
    leader.pv = Math.round((leader.pv + LV[li] - tot) * 100) / 100;
    all.push(...line);
  });

  const tv = (m) => (m.tv = m.pv + m.kids.reduce((a, k) => a + tv(k), 0));
  all.filter((m) => !m.parent).forEach(tv);

  const ok = (m, rk) => {
    const q = REQ[rk];
    if (rk === 'No rank yet') return true;
    if (m.pv < q[0] || m.kids.length < q[1]) return false;
    const cap = q[2] * q[3];
    return m.kids.reduce((a, k) => a + Math.min(k.tv, cap), 0) >= q[2];
  };

  const fix = (m) => {
    m.kids.forEach(fix);
    let i = ORDER.indexOf(m.rank);
    while (i > 0 && !ok(m, ORDER[i])) i--;
    m.rank = ORDER[i];
  };
  all.filter((m) => !m.parent).forEach(fix);

  all.forEach((m, i) => {
    m.id = i;
    m.name = 'Ambassador ' + String(i + 1).padStart(3, '0');
  });
  all.forEach((m) => {
    m.sponsor = m.parent ? m.parent.name : 'You';
    m.enr = m.kids.length;
  });

  return { all, LV, LM };
}

// Module calculation helper
export function calcModule(m, avg7 = 0.0084, avg30 = 0.0051) {
  const daily = m.price * 0.005;
  const cap = 2 * m.price;
  const delivered = Math.min((m.base || 0) + (m.day - (m.bday || 0)) * daily, cap);
  const used = delivered / 2;
  const remain = m.price - used;
  const done = delivered >= cap;
  const rp = (delivered / cap) * 100;
  const remP = (remain / m.price) * 100;

  const left = cap - delivered;
  const est = (r) => {
    if (done) return { days: '—', date: 'Completed' };
    const d = Math.ceil(left / (m.price * r));
    const dt = new Date(Date.now() + d * 86400000);
    return {
      days: String(d),
      date: dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };
  };

  return {
    ...m,
    dayTxt: String(Math.floor(m.day)),
    priceTxt: '$' + m.price.toLocaleString(),
    capTxt: '$' + cap.toLocaleString(),
    dailyTxt: '$' + daily.toFixed(2),
    remainTxt: '$' + remain.toFixed(2),
    usedTxt: '$' + used.toFixed(2),
    rewardTxt: '$' + delivered.toFixed(2),
    remainPct: remP.toFixed(1) + '%',
    usedPct: (100 - remP).toFixed(1) + '%',
    rewardPct: rp.toFixed(1) + '%',
    status: done ? 'Completed' : 'Active',
    done,
    e7: est(avg7),
    e30: est(avg30),
    ePlan: est(0.005),
    _rem: remain,
    _del: delivered,
    _price: m.price
  };
}


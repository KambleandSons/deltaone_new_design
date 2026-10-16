import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    user,
    wallets,
    activeModules,
    totals,
    avg7,
    avg30,
    yday,
    prevDay,
    hist,
    cd,
    usd,
    fmt,
    boosts
  } = useBackOffice();

  // Founder message index
  const [fmIdx, setFmIdx] = useState(0);

  const founderMessages = [
    {
      type: 'video',
      title: 'Settlement update · Week 42',
      from: 'Ricky Lundell & James Pack',
      date: '14 Oct 2026',
      text: 'Every Module running smoothly across the 16:00 Dubai settlements. We reviewed the new breakage distribution rules with compliance and confirmed every figure matches the smart contract ledger.',
      dur: '3:45',
      note: 'Founders weekly video update',
      cta: 'View settlement log',
      to: '/activity'
    },
    {
      type: 'flyer',
      title: 'Dubai Leadership Summit',
      from: 'Delta One Foundation',
      date: '10 Oct 2026',
      text: 'Join founders, top ambassadors, and the engineering team live in Dubai. Reserve your accommodation and confirm your attendance through your sponsor.',
      kicker: 'SUMMIT 2026',
      cta: 'Learn more',
      to: '/help'
    }
  ];

  const currentFm = founderMessages[fmIdx];

  // Total spins left across active modules
  const totalSpinsLeft = activeModules.reduce((acc, m) => acc + Math.max(0, 10 - (boosts[m.id] || 0)), 0);

  // Speedometer calculation
  const speedRatio = avg30 > 0 ? yday / avg30 : 1;
  const needleAngle = Math.max(-80, Math.min(80, -80 + 80 * speedRatio));
  let speedLabel = 'normal';
  let speedArrow = '→';
  let speedCls = '';
  if (yday === 0) {
    speedLabel = 'standing still';
    speedArrow = '■';
    speedCls = 'warn';
  } else if (yday > prevDay + 0.0005) {
    speedLabel = 'faster';
    speedArrow = '↑';
    speedCls = 'good';
  } else if (yday < prevDay - 0.0005) {
    speedLabel = 'slower';
    speedArrow = '↓';
    speedCls = '';
  }

  // Dial progress dash
  const circ = 2 * Math.PI * 72;
  const dialDash = `${(circ * cd.fracDay).toFixed(1)} ${circ.toFixed(1)}`;

  // Ticking micro-decimals
  const [liveRewardDisplay, setLiveRewardDisplay] = useState({ main: totals.rewards, fast: '00' });
  useEffect(() => {
    let anim;
    const tick = () => {
      const dailyNow = activeModules.reduce(
        (sum, m) => sum + Math.min(m.price * yday, 2 * m.price - (m._del || 0)),
        0
      );
      const baseNow = totals._del || 0;
      const vNow = baseNow + dailyNow * cd.fracDay;
      const parts = vNow.toFixed(6).split('.');
      const mainPart = '$' + Number(parts[0]).toLocaleString('en-US') + '.' + (parts[1] ? parts[1].slice(0, 2) : '00');
      const fastPart = parts[1] ? parts[1].slice(2) : '0000';
      setLiveRewardDisplay({ main: mainPart, fast: fastPart });
      anim = requestAnimationFrame(tick);
    };
    anim = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(anim);
  }, [activeModules, totals, yday, cd.fracDay]);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* 1. Header greeting & Action buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 className="h1">Welcome back, {user.username}</h1>
          <div className="lbl">Every figure is verifiable on chain.</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="b3" onClick={() => { sfx.play('pop'); navigate('/balances'); }}>
            Add USDT
          </button>
          <button className="b3" onClick={() => { sfx.play('pop'); navigate('/withdraw'); }}>
            Withdraw
          </button>
          <button
            className="b3 lg boost"
            onClick={() => { sfx.play('pop'); navigate('/booster'); }}
          >
            <svg viewBox="0 0 24 24" fill="#FFF3C4" stroke="#2A0F00" style={{ strokeWidth: 1.4 }} aria-hidden="true">
              <path d="M13 2 4 14h7l-1 8 9-12h-7z"></path>
            </svg>
            Module Booster
            <span className="boostbadge">{totalSpinsLeft} spins</span>
          </button>
          <button
            className="b3 gold lg"
            onClick={() => { sfx.play('pop'); navigate('/purchase'); }}
          >
            Purchase a Module
          </button>
        </div>
      </div>

      {/* 2. Message from the Founders */}
      <section className="card fmcard" aria-label="Message from the founders">
        <div className="fmmedia">
          <div className="fmvideo h-full" style={{ position: 'relative', width: '100%', minHeight: '220px', overflow: 'hidden' }}>
            <svg viewBox="0 0 640 360" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="fmSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0A1426"></stop>
                  <stop offset="1" stopColor="#1E3354"></stop>
                </linearGradient>
              </defs>
              <rect width="640" height="360" fill="url(#fmSky)"></rect>
              <path d="M0 360 L0 250 L90 200 L170 240 L280 150 L370 220 L470 120 L560 200 L640 170 L640 360 Z" fill="#14284A"></path>
              <path d="M0 360 L0 300 L120 270 L230 300 L360 250 L480 290 L640 260 L640 360 Z" fill="#1E365A"></path>
              <path d="M470 120 L456 136 L466 133 L474 140 L484 131 Z" fill="#DCEEFF"></path>
            </svg>
            <button className="fmplay flex justify-center items-center  " onClick={() => sfx.play('chirp')} aria-label="Play video">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0!">
                <path d="M8 5v14l11-7z" fill="#1B2533"></path>
              </svg>
            </button>
            <div className="fmcap">
              <span className="chip" style={{ background: 'rgba(10,20,38,.6)', color: '#fff', borderColor: 'transparent' }}>
                {currentFm.dur || '3:45'}
              </span>
              <span className="small" style={{ color: '#DCE6F0' }}>{currentFm.note || 'Video update'}</span>
            </div>
          </div>
        </div>

        <div className="fmbody">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="kick">Message from the founders</span>
            <span className="fmnew">New</span>
          </div>
          <h2 className="h2" style={{ fontSize: '26px', lineHeight: '32px' }}>{currentFm.title}</h2>
          <div className="lbl">{currentFm.from} · {currentFm.date}</div>
          <p style={{ margin: 0, fontSize: '16px', lineHeight: '25px' }}>{currentFm.text}</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 'auto' }}>
            <button
              className="b3 gold"
              onClick={() => {
                sfx.play('pop');
                navigate(currentFm.to);
              }}
            >
              {currentFm.cta}
            </button>
            <button
              className="b3 sm"
              onClick={() => {
                sfx.play('pop');
                setFmIdx((prev) => (prev > 0 ? prev - 1 : founderMessages.length - 1));
              }}
            >
              ‹ Earlier
            </button>
            <button
              className="b3 sm"
              onClick={() => {
                sfx.play('pop');
                setFmIdx((prev) => (prev < founderMessages.length - 1 ? prev + 1 : 0));
              }}
            >
              Newer ›
            </button>
          </div>
          <div className="small">Message {fmIdx + 1} of {founderMessages.length} · new messages regularly</div>
        </div>
      </section>

      {/* 3. Top Metrics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: '16px' }}>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Active Modules</div>
          <div className="num">{totals.count}</div>
          <div className="small">Modules running now</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">AI Module Rewards</div>
          <div className="num">{totals.rewards}</div>
          <div className="small">Counts up, delivered to date</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Module Credits Remaining</div>
          <div className="num">{totals.remaining}</div>
          <div className="small">Counts down as Modules are used</div>
        </div>
        <div className="card" style={{ padding: '18px' }}>
          <div className="kick">Available Rewards</div>
          <div className="num">${fmt(wallets.rewards)}</div>
          <div className="small">In your Rewards Wallet, USDT</div>
        </div>
      </div>

      {/* 4. Trading Results Card */}
      <div className="card results" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <div className="kick">Results</div>
            <h2 className="h2">How trading has been going</h2>
          </div>
          <span className="small">Updated at every 16:00 Dubai settlement</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))', gap: '14px' }}>
          <div className="well" style={{ padding: '16px 18px', borderTop: '3px solid #F4B61C' }}>
            <div className="lbl">Yesterday's result</div>
            <div className="numxl" style={{ fontWeight: 400 }}>{(yday * 100).toFixed(2)}%</div>
            <div className="small">Settled daily yield</div>
          </div>
          <div className="well" style={{ padding: '16px 18px', borderTop: '3px solid #5BA4D9' }}>
            <div className="lbl">Last week's average</div>
            <div className="numxl" style={{ fontWeight: 400 }}>{(avg7 * 100).toFixed(2)}%</div>
            <div className="small">Last 7 settled days</div>
          </div>
          <div className="well" style={{ padding: '16px 18px', borderTop: '3px solid #8FBF9F' }}>
            <div className="lbl">Last month's average</div>
            <div className="numxl" style={{ fontWeight: 400 }}>{(avg30 * 100).toFixed(2)}%</div>
            <div className="small">Last 30 settled days</div>
          </div>
        </div>

        <div>
          <div className="lbl" style={{ marginBottom: '8px' }}>The last 7 settled days</div>
          <div className="resbars" role="img" aria-label="7 day history bars">
            {hist.map((val, idx) => {
              const heightPct = Math.min(100, (val / 0.015) * 100);
              const daysAgo = ['6d ago', '5d ago', '4d ago', '3d ago', '2d ago', 'Yesterday', 'Today'][idx] || `Day ${idx + 1}`;
              return (
                <div key={idx} className="resbar">
                  <span className="small resval">{(val * 100).toFixed(2)}%</span>
                  <div className="restrack">
                    <div
                      className={`resfill ${val === 0 ? 'zero' : ''}`}
                      style={{ height: `${heightPct}%` }}
                    ></div>
                  </div>
                  <span className="small">{daysAgo}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="small">
          Past results only. Each day can be more, less or nothing at all. Plan figures are illustrated at a 0.50% average, and the finish estimates on each Module use last week's and last month's averages.
        </div>
      </div>

      {/* 5. Live Accumulation Clock & Speedometer */}
      <div className="card clock">
        <svg className="dial" viewBox="0 0 170 170" role="img" aria-label="Settlement cycle countdown dial">
          <circle cx="85" cy="85" r="72" fill="none" stroke="var(--well)" style={{ strokeWidth: 16 }}></circle>
          <circle
            cx="85"
            cy="85"
            r="72"
            fill="none"
            stroke="#F4B61C"
            strokeDasharray={dialDash}
            transform="rotate(-90 85 85)"
            style={{ strokeWidth: 16, strokeLinecap: 'round' }}
          ></circle>
          <circle cx="85" cy="85" r="56" fill="var(--raised)" stroke="var(--line)" style={{ strokeWidth: 1 }}></circle>
          <text x="85" y="80" textAnchor="middle" fill="var(--muted)" style={{ font: '500 11px Inter, sans-serif' }}>
            to settlement
          </text>
          <text x="85" y="102" textAnchor="middle" fill="var(--ink)" style={{ font: '300 22px Inter, sans-serif' }}>
            {cd.h}:{cd.m}:{cd.s}
          </text>
        </svg>

        <div style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="kick">AI Module Rewards · today's payout, counting in</div>
          <div className="tick" aria-live="off">
            <span>{liveRewardDisplay.main}</span>
            <small>{liveRewardDisplay.fast}</small>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', margin: '4px 0' }}>
            <svg viewBox="0 0 132 78" style={{ width: '132px', height: '78px', flex: 'none' }} role="img" aria-label={`Clock speed: ${speedLabel}`}>
              <path d="M14 70 A52 52 0 0 1 118 70" fill="none" stroke="var(--well)" style={{ strokeWidth: 12, strokeLinecap: 'round' }}></path>
              <path d="M14 70 A52 52 0 0 1 40 25" fill="none" stroke="#9FC3E0" style={{ strokeWidth: 12, strokeLinecap: 'round' }}></path>
              <path d="M92 25 A52 52 0 0 1 118 70" fill="none" stroke="#F4B61C" style={{ strokeWidth: 12, strokeLinecap: 'round' }}></path>
              <line
                x1="66"
                y1="70"
                x2="66"
                y2="28"
                stroke="var(--ink)"
                transform={`rotate(${needleAngle} 66 70)`}
                style={{ strokeWidth: 3.5, strokeLinecap: 'round', transition: 'transform 700ms cubic-bezier(.3,1.4,.5,1)' }}
              ></line>
              <circle cx="66" cy="70" r="7" fill="var(--ink)"></circle>
              <text x="12" y="20" fill="var(--muted)" style={{ font: '500 10px Inter, sans-serif' }}>slower</text>
              <text x="120" y="20" textAnchor="end" fill="var(--muted)" style={{ font: '500 10px Inter, sans-serif' }}>faster</text>
            </svg>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 600 }} className={speedCls}>
                {speedArrow} {speedLabel}
              </div>
              <div className="small">vs 30-day average</div>
            </div>
          </div>
          <div className="small">
            Today's amount is revealed when it settles at 16:00 Dubai (12:00 UTC). Until then, watch the speed. If the clock stands still, nothing is counting in today.
          </div>
        </div>
      </div>

      {/* 6. Active Modules List */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <h2 className="h2">Your active Modules</h2>
        <button className="b3 sm" onClick={() => { sfx.play('pop'); navigate('/my-modules'); }}>
          See all my Modules
        </button>
      </div>

      {activeModules.map((m) => (
        <article key={m.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, fontSize: '16px' }}>Module {m.id}</span>
              <span className="chip"><span className={m.statusCls}>{m.status}</span></span>
              <span className="lbl">Purchased {m.priceTxt} · day {m.dayTxt}</span>
            </div>
            <span className="small">{m.phase}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '26px', alignItems: 'flex-start' }}>
            {/* Mountain Climbing Rewards Graphic */}
            <div style={{ flex: '3 1 320px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                <span className="lbl">AI Module Rewards <span aria-hidden="true">↑</span></span>
                <span className="small">{m.rewardPct}% of the 2× summit</span>
              </div>
              <div className="num">
                {m.rewardTxt} <span className="small">of {m.capTxt}</span>
              </div>

              <svg
                viewBox="0 -16 300 110"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label={`Rewards at ${m.rewardPct}%`}
                style={{ width: '100%', height: 'auto', minHeight: '150px', maxHeight: '230px', display: 'block' }}
              >
                <path d="M0 90 L60 62 L95 70 L160 34 L190 44 L246 8 L300 52 L300 90 Z" fill="var(--mtn)" stroke="var(--mtn-line)" style={{ strokeWidth: 1.4 }}></path>
                <path d="M246 8 L246 -12" stroke="var(--ink)" style={{ strokeWidth: 1.6 }}></path>
                <path d="M246 -12 L266 -5.5 L246 1 Z" fill="#ffc93c" stroke="#B5862A" style={{ strokeWidth: 0.6 }}></path>
                <path d="M236 18 L246 8 L256 18 L250 16 L246 20 L242 16 Z" fill="var(--snow)"></path>
                <path d="M150 44 L160 34 L170 44 L165 42 L160 46 L155 42 Z" fill="var(--snow)" opacity="0.9"></path>
                <polyline points={m.trail} fill="none" stroke="#f4b61c" style={{ strokeWidth: 4.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}></polyline>
                <circle cx={m.cx} cy={m.cy} r="7.5" fill="#ffc93c" stroke="#1B2533" style={{ strokeWidth: 1.8 }}></circle>
                <text x="236" y="-2" fill="var(--muted)" style={{ fontSize: '9px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }} textAnchor="end">
                  Summit 2×
                </text>
              </svg>
              <div className="small">About {m.dailyTxt} a day at the 0.50% plan average</div>
            </div>

            {/* Module Credits Remaining Progress Bar */}
            <div style={{ flex: '2 1 240px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                <span className="lbl">Module Credits Remaining <span aria-hidden="true">↓</span></span>
                <span className="small">{m.remainPct}% remaining</span>
              </div>
              <div className="num">
                {m.remainTxt} <span className="small">of {m.priceTxt}</span>
              </div>
              <div className="well bar" role="img" aria-label={`Module credits remaining ${m.remainPct}%`}>
                <div className="fill-cr" style={{ width: `${m.remainPct}%` }}></div>
              </div>
              <div className="small">{m.usedTxt} used · {m.usedPct}% used</div>
            </div>
          </div>

          {/* Finish Estimates Box */}
          <div className="tint" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="kick">Estimated finish at 2×</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: '12px' }}>
              <div>
                <div className="lbl">At last week's average</div>
                <div style={{ fontSize: '18px', fontWeight: 500 }}>about {m.e7Days} days</div>
                <div className="small">around {m.e7Date}</div>
              </div>
              <div>
                <div className="lbl">At last month's average</div>
                <div style={{ fontSize: '18px', fontWeight: 500 }}>about {m.e30Days} days</div>
                <div className="small">around {m.e30Date}</div>
              </div>
              <div>
                <div className="lbl">At the 0.50% plan average</div>
                <div style={{ fontSize: '18px', fontWeight: 500 }}>about {m.epDays} days</div>
                <div className="small">around {m.epDate}</div>
              </div>
            </div>
            <div className="small">An estimate from past averages, not a promise. It moves after every settlement.</div>
          </div>
        </article>
      ))}
    </section>
  );
}

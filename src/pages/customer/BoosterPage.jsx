import React, { useState, useEffect } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function BoosterPage() {
  const {
    activeModules,
    boosts,
    boostCap,
    boosterOffer,
    spinBooster,
    acceptBooster,
    dropBooster,
    usd,
    fmt
  } = useBackOffice();

  const [selectedModId, setSelectedModId] = useState(activeModules[0]?.id || 'ΔM-0001');
  const [isSpinning, setIsSpinning] = useState(false);
  const [reelText, setReelText] = useState('SPIN');
  const [topAmt, setTopAmt] = useState('500');
  const [timeLeft, setTimeLeft] = useState('');

  const numTopAmt = parseFloat(topAmt) || 0;
  const isTopLow = numTopAmt < 100;

  const spinsUsed = boosts[selectedModId] || 0;
  const spinsLeft = Math.max(0, 10 - spinsUsed);
  const canSpin = spinsLeft > 0 && !boosterOffer && !isSpinning;

  // Countdown timer for active offer
  useEffect(() => {
    if (!boosterOffer) return;
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((boosterOffer.expiresAt - Date.now()) / 1000));
      const m = String(Math.floor(diff / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setTimeLeft(`${m}:${s}`);
      if (diff <= 0) {
        dropBooster();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [boosterOffer, dropBooster]);

  const handleSpin = async () => {
    if (!canSpin) return;
    setIsSpinning(true);
    let count = 0;
    const ticker = setInterval(() => {
      count++;
      setReelText(`+${(Math.random() * boostCap).toFixed(1)}%`);
      sfx.play('tick');
      if (count > 16) {
        clearInterval(ticker);
        spinBooster(selectedModId).then((res) => {
          setIsSpinning(false);
          setReelText(res.isJackpot ? '★ JACKPOT! ★' : `+${res.pct.toFixed(1)}%`);
        });
      }
    }, 70);
  };

  const bonusAmount = boosterOffer ? (numTopAmt * boosterOffer.pct) / 100 : 0;
  const totalCreditsAdded = numTopAmt + bonusAmount;

  const topChips = [100, 500, 1000, 2500];

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Module Booster</h1>
        <div className="lbl">
          Spin for a surprise bonus on a one-time top-up. Each Module gets 10 boosters in its lifetime, and each booster shows only once.
        </div>
      </div>

      {/* Module Selector */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="kick">Pick a Module to boost</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {activeModules.map((m) => {
            const leftCount = Math.max(0, 10 - (boosts[m.id] || 0));
            const isSelected = selectedModId === m.id;
            return (
              <button
                key={m.id}
                className={`b3 ${isSelected ? 'on gold' : ''}`}
                onClick={() => {
                  sfx.play('pop');
                  setSelectedModId(m.id);
                }}
                aria-pressed={isSelected}
              >
                Module {m.id} <span style={{ fontWeight: 400, fontSize: '12px' }}>{leftCount} left</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="pips" role="img" aria-label={`${spinsLeft} of 10 boosters left`}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={`pip ${i < spinsUsed ? 'used' : ''}`}></span>
            ))}
          </div>
          <span className="small">
            {spinsLeft} of 10 boosters left on Module {selectedModId}
          </span>
        </div>
      </div>

      {/* Slot Machine & Offer Details Split View */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '22px', alignItems: 'stretch' }}>
        {/* Visual Slot Reel Machine */}
        <div className="machine" style={{ flex: '1 1 380px' }}>
          <div className="bulbs" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="bulb"></span>
            ))}
          </div>
          <div className="marquee">MODULE BOOSTER</div>
          <div className="reel" aria-live="polite">
            <span className="reelnum">{reelText}</span>
          </div>
          <button
            className="boostbtn"
            onClick={handleSpin}
            disabled={!canSpin}
          >
            {isSpinning ? 'SPINNING...' : 'BOOST'}
          </button>
          <div style={{ fontSize: '13px', color: '#C9D6E6', textAlign: 'center', maxWidth: '340px' }}>
            {boosterOffer
              ? 'Offer active! Review the bonus on the right before time runs out.'
              : spinsLeft > 0
              ? 'Press BOOST to roll for a surprise top-up bonus!'
              : 'All 10 boosters used for this Module.'}
          </div>
          <div className="bulbs" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="bulb"></span>
            ))}
          </div>
        </div>

        {/* Offer Details or Explanation Card */}
        <div className="card" style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {boosterOffer ? (
            <>
              <div className="kick">Your booster</div>
              <div className="numxl" style={{ fontWeight: 600 }}>
                +{boosterOffer.pct.toFixed(1)}% bonus credits
              </div>
              <div className="lbl">
                On one top-up of Module {boosterOffer.moduleId}, purchased right now in this same step. It applies to this purchase only.
              </div>

              <div className="well" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <span className="lbl">This booster disappears in</span>
                <b style={{ fontSize: '30px', fontWeight: 300 }}>{timeLeft || '10:00'}</b>
              </div>

              <label htmlFor="topamt" className="kick">Top-up amount</label>
              <div className="well inpwrap">
                <span className="num" aria-hidden="true">$</span>
                <input
                  id="topamt"
                  className="inp"
                  inputMode="decimal"
                  value={topAmt}
                  onChange={(e) => setTopAmt(e.target.value)}
                />
                <span className="small">USDT</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {topChips.map((chip) => (
                  <button
                    key={chip}
                    className={`b3 sm ${numTopAmt === chip ? 'on gold' : ''}`}
                    onClick={() => {
                      sfx.play('pop');
                      setTopAmt(String(chip));
                    }}
                  >
                    ${chip}
                  </button>
                ))}
              </div>

              {isTopLow && <div className="warn" style={{ fontSize: '13px' }}>The smallest top-up is $100.</div>}

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <span className="lbl">Top-up</span>
                <span>{usd(numTopAmt)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <span className="lbl">Booster bonus credits</span>
                <b style={{ fontWeight: 600 }} className="good">+{usd(bonusAmount)}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <span className="lbl">New Module Credits added</span>
                <b style={{ fontWeight: 500 }}>{usd(totalCreditsAdded)}</b>
              </div>

              <button
                className="b3 gold lg"
                onClick={() => acceptBooster(selectedModId, numTopAmt, bonusAmount)}
                disabled={isTopLow}
              >
                Boost and purchase now
              </button>
              <button className="b3" onClick={dropBooster}>
                Let this booster go
              </button>
            </>
          ) : (
            <>
              <div className="kick">How it works</div>
              <div className="lbl">
                Press BOOST and the reel lands on a surprise bonus: extra Module Credits on one top-up of this Module.
              </div>
              <div className="lbl">
                Take it in the same step: choose your top-up and press Boost and purchase now before the timer runs out.
              </div>
              <div className="lbl">
                Skip it or let the timer run out and that booster is gone for good. Every Module gets 10 in its lifetime.
              </div>
            </>
          )}

          <div className="small" style={{ marginTop: 'auto' }}>
            Bonus credits are paid from Delta One's share of the profit, never from other members' rewards or commissions. They follow the same rules as every Module Credit: the Module delivers at most 2× and then completes.
          </div>
        </div>
      </div>
    </section>
  );
}

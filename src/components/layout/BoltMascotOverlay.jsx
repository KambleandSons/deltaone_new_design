import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function BoltMascotOverlay() {
  const {
    boltMood,
    setBoltMood,
    boltTitle,
    boltMsg,
    sound,
    setSound,
    voice,
    setVoice,
    say,
    gOpen,
    setGOpen,
    gDocked,
    setGDocked
  } = useBackOffice();

  const [explainMode, setExplainMode] = useState(false);

  const handleNextTip = () => {
    sfx.play('chirp');
    setBoltMood('happy');
  };

  const handleDance = () => {
    sfx.play('cheer');
    setBoltMood('cheer');
  };

  return (
    <div
      data-guide="1"
      className={`guide ${boltMood}`}
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'flex-end',
        gap: '14px',
        pointerEvents: 'auto'
      }}
    >
      {/* Interactive Balloon */}
      {gOpen && (
        <div className="gbubble" role="status" aria-live="polite">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
            <span className="kick">{boltTitle}</span>
            {explainMode && <span className="chip">Explain mode</span>}
          </div>
          <div style={{ fontSize: '15px', lineHeight: '23px', margin: '6px 0 12px' }}>
            {boltMsg}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a className="b3 sm gold" href="/edit-desk">
              Bolt, help me make an edit
            </a>
            <button className="b3 sm" onClick={handleNextTip}>
              Next tip
            </button>
            <button className="b3 sm gold" onClick={handleDance}>
              Dance!
            </button>
            <button
              className={`b3 sm ${explainMode ? 'on gold' : ''}`}
              onClick={() => {
                sfx.play('pop');
                setExplainMode(!explainMode);
              }}
            >
              {explainMode ? 'Explain: on' : 'Explain: off'}
            </button>
            <button
              className={`b3 sm ${voice ? 'on gold' : ''}`}
              onClick={() => {
                sfx.play('pop');
                setVoice(!voice);
                if (!voice) say('Voice is now on! Hi there!');
              }}
            >
              {voice ? 'Voice: on' : 'Voice: off'}
            </button>
            <button
              className={`b3 sm ${sound ? 'on gold' : ''}`}
              onClick={() => {
                setSound(!sound);
                if (!sound) sfx.play('pop');
              }}
            >
              {sound ? 'Sound: on' : 'Sound: off'}
            </button>
            <button
              className="b3 sm"
              onClick={() => {
                sfx.play('pop');
                setGOpen(false);
                setGDocked(true);
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Docked chip when minimized */}
      {gDocked && !gOpen && (
        <button
          className="gchip"
          onClick={() => {
            sfx.play('pop');
            setGOpen(true);
            setGDocked(false);
          }}
        >
          Ask Bolt
        </button>
      )}

      {/* Robot Mascot Button */}
      <button
        className="guidebot"
        onClick={() => {
          sfx.play('pop');
          setGOpen(!gOpen);
          setGDocked(gOpen);
        }}
        aria-label="Bolt, your edit assistant"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          width: '74px',
          height: '86px'
        }}
      >
        <svg
          className={`bolt face-${boltMood}`}
          viewBox="-12 -14 194 206"
          style={{ width: '100%', height: '100%' }}
          role="img"
          aria-label={`Bolt looking ${boltMood}`}
        >
          <defs>
            <linearGradient id="mBody" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0" stopColor="#FFC94D"></stop>
              <stop offset=".45" stopColor="#FFAA1F"></stop>
              <stop offset="1" stopColor="#E37E06"></stop>
            </linearGradient>
            <radialGradient id="mShine" cx=".3" cy=".22" r=".55">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity=".75"></stop>
              <stop offset=".35" stopColor="#FFF3D6" stopOpacity=".28"></stop>
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0"></stop>
            </radialGradient>
            <radialGradient id="mScreen" cx=".45" cy=".35" r=".8">
              <stop offset="0" stopColor="#1D2433"></stop>
              <stop offset="1" stopColor="#04060A"></stop>
            </radialGradient>
            <radialGradient id="mBlack" cx=".35" cy=".3" r=".75">
              <stop offset="0" stopColor="#5A6272"></stop>
              <stop offset=".35" stopColor="#1E222B"></stop>
              <stop offset="1" stopColor="#05070A"></stop>
            </radialGradient>
            <radialGradient id="mOrb" cx=".38" cy=".32" r=".7">
              <stop offset="0" stopColor="#E8FBFF"></stop>
              <stop offset=".35" stopColor="#7FD9FF"></stop>
              <stop offset="1" stopColor="#1C82D4"></stop>
            </radialGradient>
            <radialGradient id="mArm" cx=".35" cy=".3" r=".8">
              <stop offset="0" stopColor="#FFD877"></stop>
              <stop offset=".55" stopColor="#FFAA1F"></stop>
              <stop offset="1" stopColor="#D97404"></stop>
            </radialGradient>
            <filter id="mGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.4" result="g"></feGaussianBlur>
              <feMerge>
                <feMergeNode in="g"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>
            <clipPath id="mClip">
              <rect x="38" y="52" width="94" height="62" rx="22"></rect>
            </clipPath>
          </defs>
          <ellipse className="shadow" cx="85" cy="181" rx="50" ry="6" fill="#0A1426" opacity=".18"></ellipse>
          <g className="whole">
            <circle cx="64" cy="162" r="17" fill="url(#mBlack)"></circle>
            <ellipse cx="58" cy="155" rx="6" ry="4" fill="#FFFFFF" opacity=".35"></ellipse>
            <circle cx="108" cy="162" r="17" fill="url(#mBlack)"></circle>
            <ellipse cx="102" cy="155" rx="6" ry="4" fill="#FFFFFF" opacity=".35"></ellipse>
            <g className="ant">
              <path d="M88 40 C88 30 80 26 76 18" fill="none" stroke="#12151C" style={{ strokeWidth: 5.5, strokeLinecap: 'round' }}></path>
              <circle className="oglow" cx="74" cy="13" r="16" fill="#5BC8F5" filter="url(#mGlow)"></circle>
              <circle cx="74" cy="13" r="10" fill="url(#mOrb)"></circle>
              <ellipse cx="70" cy="9" rx="3.5" ry="2.4" fill="#FFFFFF" opacity=".85"></ellipse>
            </g>
            <rect x="26" y="38" width="118" height="116" rx="42" fill="url(#mBody)" stroke="#B5620A" style={{ strokeWidth: 1.2 }}></rect>
            <rect x="26" y="38" width="118" height="116" rx="42" fill="url(#mShine)"></rect>
            <rect x="38" y="52" width="94" height="62" rx="22" fill="url(#mScreen)" stroke="#2A1A05" style={{ strokeWidth: 1.5 }}></rect>
            <g filter="url(#mGlow)">
              <path d="M53 80 Q61 68 69 80" fill="none" stroke="#7FD6FF" style={{ strokeWidth: 6, strokeLinecap: 'round' }}></path>
              <path d="M101 80 Q109 68 117 80" fill="none" stroke="#7FD6FF" style={{ strokeWidth: 6, strokeLinecap: 'round' }}></path>
              <path d="M72 92 Q85 104 98 92" fill="none" stroke="#7FD6FF" style={{ strokeWidth: 6, strokeLinecap: 'round' }}></path>
            </g>
            <text x="85" y="147" textAnchor="middle" fill="#14161B" style={{ font: '800 10px Inter, Arial, sans-serif', letterSpacing: '.5px' }}>
              DELTA 1
            </text>
          </g>
        </svg>
      </button>
    </div>
  );
}


import React from 'react';

export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="mbShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000000" stopOpacity="0" />
          <stop offset=".55" stopColor="#000000" stopOpacity=".06" />
          <stop offset="1" stopColor="#000000" stopOpacity=".38" />
        </linearGradient>
        <radialGradient id="mbShine" cx=".3" cy=".22" r=".6">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".8" />
          <stop offset=".4" stopColor="#FFFFFF" stopOpacity=".22" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mbBlack" cx=".35" cy=".3" r=".75">
          <stop offset="0" stopColor="#5A6272" />
          <stop offset=".4" stopColor="#1E222B" />
          <stop offset="1" stopColor="#05070A" />
        </radialGradient>
        <radialGradient id="mbOrb" cx=".38" cy=".32" r=".7">
          <stop offset="0" stopColor="#E8FBFF" />
          <stop offset=".4" stopColor="#7FD9FF" />
          <stop offset="1" stopColor="#1C82D4" />
        </radialGradient>
        <linearGradient id="mbGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF0B3" />
          <stop offset=".5" stopColor="#FFC93C" />
          <stop offset="1" stopColor="#C98A00" />
        </linearGradient>

        {/* 3-D Rank Colored Bolt symbol for Network Tree and Badges */}
        <symbol id="mbolt" viewBox="0 0 40 46">
          <ellipse cx="20" cy="44" rx="12" ry="2" fill="#0A1426" opacity=".2" />
          <circle cx="14.5" cy="38.6" r="4.7" fill="url(#mbBlack)" />
          <circle cx="25.5" cy="38.6" r="4.7" fill="url(#mbBlack)" />
          <ellipse cx="13" cy="36.8" rx="1.6" ry="1" fill="#FFFFFF" opacity=".35" />
          <ellipse cx="24" cy="36.8" rx="1.6" ry="1" fill="#FFFFFF" opacity=".35" />
          <path d="M21 9 C21 6 19.2 5 18.2 3.2" fill="none" stroke="#12151C" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="17.8" cy="2.8" r="2.6" fill="url(#mbOrb)" />
          <circle cx="17" cy="2" r=".8" fill="#FFFFFF" opacity=".9" />
          <circle cx="4.6" cy="23.5" r="3.4" fill="currentColor" />
          <circle cx="4.6" cy="23.5" r="3.4" fill="url(#mbShade)" />
          <circle cx="35.4" cy="23.5" r="3.4" fill="currentColor" />
          <circle cx="35.4" cy="23.5" r="3.4" fill="url(#mbShade)" />
          <rect x="5" y="8" width="30" height="29.5" rx="11" fill="currentColor" />
          <rect x="5" y="8" width="30" height="29.5" rx="11" fill="url(#mbShade)" />
          <rect x="5" y="8" width="30" height="29.5" rx="11" fill="url(#mbShine)" />
          <rect x="5" y="8" width="30" height="29.5" rx="11" fill="none" stroke="#000000" strokeOpacity=".25" strokeWidth=".8" />
          <rect x="9" y="12.4" width="22" height="13.4" rx="5.2" fill="#0B0F18" />
          <path d="M12 15.6 Q17 14 23 14.6" fill="none" stroke="#FFFFFF" strokeOpacity=".16" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M13.4 20.6 Q15.5 17.4 17.6 20.6" fill="none" stroke="#7FD6FF" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M22.4 20.6 Q24.5 17.4 26.6 20.6" fill="none" stroke="#7FD6FF" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M17.4 23 Q20 25.2 22.6 23" fill="none" stroke="#7FD6FF" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16.6 34.2 L20 29.4 L23.4 34.2 Z" fill="#14161B" opacity=".72" />
        </symbol>

        {/* Gold Crown for Everest rank */}
        <symbol id="mcrown" viewBox="0 0 40 46">
          <path d="M23.2 8.6 L24 2.6 L27.2 5.6 L28.8 0.8 L30.4 5.6 L33.6 2.6 L34.4 8.6 Z" fill="url(#mbGold)" stroke="#8A5E00" strokeWidth=".7" strokeLinejoin="round" />
          <circle cx="28.8" cy="0.9" r="1" fill="#FFF0B3" />
        </symbol>
      </defs>
    </svg>
  );
}


import React from 'react';

export default function HorizonFooter() {
  return (
    <>
      <svg className="horizon" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 120 L0 92 L120 70 L210 84 L330 52 L420 74 L540 40 L640 66 L760 30 L860 58 L980 22 L1080 54 L1200 14 L1300 48 L1440 30 L1440 120 Z"
          fill="var(--peak1)"
        ></path>
        <path
          d="M0 120 L0 100 L160 82 L260 96 L400 72 L520 92 L660 64 L780 88 L920 58 L1040 86 L1180 50 L1300 80 L1440 62 L1440 120 Z"
          fill="var(--peak2)"
        ></path>
        <path
          d="M0 120 L0 108 L200 96 L340 110 L500 92 L640 108 L820 88 L960 106 L1120 84 L1260 104 L1440 92 L1440 120 Z"
          fill="var(--peak3)"
        ></path>
        <path
          d="M1200 14 L1186 26 L1196 24 L1204 30 L1214 22 Z M980 22 L968 32 L978 30 L986 36 L994 30 Z M760 30 L748 40 L758 38 L766 44 L774 38 Z"
          fill="var(--snow)"
        ></path>
      </svg>
      <footer style={{ padding: '16px 24px 22px', background: 'var(--peak3)' }}>
        <div className="small" style={{ maxWidth: '1100px', color: 'var(--ink)' }}>
          Rewards and commissions are not guaranteed. A Module is a software purchase; its price is not refundable and can be lost. Every Module delivers at most 2× its purchase price, then completes. No-profit days pay nothing. Most members earn no commission at all. Only purchase with money you can afford to lose. Sample figures for review. Draft for legal and compliance review.
        </div>
      </footer>
    </>
  );
}


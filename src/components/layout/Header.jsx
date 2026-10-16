import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, cd } = useBackOffice();

  const isAmbassadorRoute = location.pathname.startsWith('/ambassador');
  const isDark = theme === 'dark';

  return (
    <header
      className="hdr"
      style={{
        background: 'var(--hdr)',
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
        color: 'var(--hdr-fg)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 24px',
        borderBottom: '1px solid var(--line)',
        boxShadow: '0 1px 0 rgba(232,184,58,.55)'
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 auto', cursor: 'pointer' }}
        onClick={() => {
          sfx.play('pop');
          navigate('/');
        }}
      >
        <span className="mark">
          <img
            src="/graphics/delta-one-mark-256.png"
            alt="Delta One"
            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
          />
        </span>
        <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.42em', color: 'var(--hdr-fg)' }}>
          DELTA ONE
        </span>
      </div>

      <nav aria-label="App" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `b3 sm ${!isAmbassadorRoute ? 'on gold' : ''}`}
          onClick={() => sfx.play('pop')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ strokeWidth: 1.6 }} aria-hidden="true">
            <path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6"></path>
          </svg>
          Customer
        </NavLink>
        <NavLink
          to="/ambassador/dashboard"
          className={({ isActive }) => `b3 sm ${isAmbassadorRoute ? 'on gold' : ''}`}
          onClick={() => sfx.play('pop')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ strokeWidth: 1.6 }} aria-hidden="true">
            <circle cx="9" cy="8" r="3"></circle>
            <circle cx="17" cy="9" r="2.4"></circle>
            <path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5M15 14.5c2.7 0 4.6 1.4 5.2 4.5"></path>
          </svg>
          Ambassador
        </NavLink>
      </nav>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12px', color: 'var(--hdr-muted)' }}>
          Next settlement <b style={{ color: 'var(--goldink)', fontWeight: 600 }}>{cd.h}:{cd.m}:{cd.s}</b>
        </span>
        <button
          className="b3 sm"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ strokeWidth: 1.6 }} aria-hidden="true">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"></path>
              </svg>
              Light
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ strokeWidth: 1.6 }} aria-hidden="true">
                <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"></path>
              </svg>
              Dark
            </>
          )}
        </button>
        <button
          className="b3 sm"
          onClick={() => {
            sfx.play('chirp');
            navigate('/help');
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ strokeWidth: 1.6 }} aria-hidden="true">
            <path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13h3v5H5a1 1 0 0 1-1-1zM20 13h-3v5h2a1 1 0 0 0 1-1z"></path>
          </svg>
          Live support
        </button>
        <button
          className="b3 sm"
          onClick={() => {
            sfx.play('pop');
            navigate('/signin');
          }}
        >
          Log out
        </button>
      </div>
    </header>
  );
}


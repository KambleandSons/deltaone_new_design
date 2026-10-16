import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function Sidebar() {
  const location = useLocation();
  const {
    runDay,
    resetSample,
    simRate,
    setSimRate
  } = useBackOffice();

  const isAmbassador = location.pathname.startsWith('/ambassador');

  const custNav = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/purchase', label: 'Purchase a Module' },
    { to: '/booster', label: 'Module Booster', isBoost: true },
    { to: '/my-modules', label: 'My Modules' },
    { to: '/founder-seats', label: 'Founder Seats' },
    { to: '/balances', label: 'Balances' },
    { to: '/module-management', label: 'Module Management' },
    { to: '/withdraw', label: 'Withdraw' },
    { to: '/account', label: 'Account' },
    { to: '/activity', label: 'Activity' },
    { to: '/help', label: 'Help & Support' }
  ];

  const ambNav = [
    { to: '/ambassador/dashboard', label: 'Dashboard' },
    { to: '/ambassador/tree', label: 'Network Tree' },
    { to: '/ambassador/downline', label: 'Downline' },
    { to: '/ambassador/team', label: 'My Team' },
    { to: '/ambassador/commissions', label: 'Commissions' },
    { to: '/ambassador/reports', label: 'Commission Reports' },
    { to: '/ambassador/projector', label: 'Commission Projector' },
    { to: '/ambassador/rank', label: 'Rank' },
    { to: '/ambassador/withdraw', label: 'Withdraw' },
    { to: '/ambassador/account', label: 'Account' }
  ];

  const currentNav = isAmbassador ? ambNav : custNav;

  return (
    <aside style={{ flex: '1 1 220px', maxWidth: '100%' }}>
      {/* Navigation Card */}
      <nav
        aria-label="Sections"
        className="card"
        style={{ padding: '14px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}
      >
        {currentNav.map((n) => {
          return (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={() => sfx.play('pop')}
              className={({ isActive }) =>
                `b3 full navb ${isActive ? 'on gold' : ''} ${n.isBoost ? 'boost' : ''}`
              }
              style={{ flex: '1 1 190px' }}
            >
              {n.isBoost && (
                <svg
                  viewBox="0 0 24 24"
                  fill="#FFF3C4"
                  stroke="#2A0F00"
                  style={{ strokeWidth: 1.4 }}
                  aria-hidden="true"
                >
                  <path d="M13 2 4 14h7l-1 8 9-12h-7z"></path>
                </svg>
              )}
              {n.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Review Controls Panel */}
      <div className="tint" style={{ marginTop: '16px' }}>
        <div className="kick" style={{ marginBottom: '6px' }}>
          Review controls
        </div>
        <div className="small" style={{ marginBottom: '12px' }}>
          For partner review only, not part of the live back office. Runs the sample Modules at the average you pick.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="b3 gold sm full" onClick={() => runDay(false)}>
            Run one day
          </button>
          <div className="small">Run it at:</div>

          <button
            className={`b3 sm full ${simRate === 'week' ? 'on gold' : ''}`}
            onClick={() => {
              sfx.play('pop');
              setSimRate('week');
            }}
            aria-pressed={simRate === 'week'}
          >
            Last week 0.84%
          </button>
          <button
            className={`b3 sm full ${simRate === 'month' ? 'on gold' : ''}`}
            onClick={() => {
              sfx.play('pop');
              setSimRate('month');
            }}
            aria-pressed={simRate === 'month'}
          >
            Last month 0.51%
          </button>
          <button
            className={`b3 sm full ${simRate === 'plan' ? 'on gold' : ''}`}
            onClick={() => {
              sfx.play('pop');
              setSimRate('plan');
            }}
            aria-pressed={simRate === 'plan'}
          >
            0.50% plan
          </button>

          <button className="b3 sm full" onClick={() => runDay(true)}>
            Run a no-profit day
          </button>
          <button className="b3 sm full" onClick={resetSample}>
            Reset the sample
          </button>
        </div>
      </div>
    </aside>
  );
}


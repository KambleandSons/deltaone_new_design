import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';
import SvgDefs from '../../components/layout/SvgDefs';
import BoltMascotOverlay from '../../components/layout/BoltMascotOverlay';

export default function SignInPage() {
  const navigate = useNavigate();
  const { theme, setEventText, setBoltMood, say } = useBackOffice();
  const [email, setEmail] = useState('');

  useEffect(() => {
    document.title = 'Sign In · Delta One';
  }, []);

  const handleSignedIn = () => {
    sfx.play('cheer');
    setEventText('Welcome back, rickylundell.');
    setBoltMood('cheer');
    say('Signed in', 'Welcome back! It’s review time!');
    navigate('/dashboard');
  };

  return (
    <div className={`bo ${theme === 'dark' ? 't-dark' : 't-light'}`} style={{ minHeight: '100vh', width: '100%' }}>
      <SvgDefs />

      <div className="signin" role="dialog" aria-label="Sign in">
        {/* Left Branding Panel */}
        <div className="sipanel">
          <svg
            className="horizon"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%' }}
          >
            <path
              d="M0 120 L0 70 L160 40 L280 66 L420 20 L560 58 L700 8 L840 52 L980 26 L1120 60 L1260 30 L1440 64 L1440 120 Z"
              fill="#14284A"
            />
            <path
              d="M0 120 L0 94 L200 72 L360 92 L540 62 L720 88 L900 56 L1080 86 L1260 66 L1440 84 L1440 120 Z"
              fill="#1E365A"
            />
            <path
              d="M700 8 L686 22 L696 20 L704 26 L714 18 Z M420 20 L408 32 L418 30 L426 36 L434 30 Z"
              fill="#DCEEFF"
            />
          </svg>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span className="mark" style={{ width: '64px', height: '64px' }}>
              <img
                src="/graphics/delta-one-mark-256.png"
                alt="Delta One"
                style={{ width: '58px', height: '58px', objectFit: 'contain' }}
              />
            </span>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.42em', color: '#DCE6F0' }}>
              DELTA ONE · CUSTOMER
            </div>
            <div
              style={{
                fontWeight: 300,
                fontSize: 'clamp(30px, 5vw, 46px)',
                lineHeight: 1.1,
                background: 'linear-gradient(180deg, #DCEEFF, #8FC2FF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              “Two prices. One asset.”
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="siform">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="kick">Welcome back</div>
            <h1 className="h1">Sign in</h1>
            <div className="lbl">
              Sign in with Google or a code sent to your email: no wallet, no seed phrase. A wallet signature also works.
            </div>
          </div>

          <button
            className="b3 lg full"
            onClick={handleSignedIn}
            style={{
              justifyContent: 'center',
              background: 'linear-gradient(180deg, #FFFFFF, #E9EEF4)',
              color: '#1B2533',
              gap: '10px'
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px', flex: 'none' }}>
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.2 14.6 2.2 12 2.2 6.6 2.2 2.2 6.6 2.2 12s4.4 9.8 9.8 9.8c5.7 0 9.4-4 9.4-9.6 0-.6-.1-1.1-.2-1.6H12z"
              />
              <path
                fill="#4285F4"
                d="M21.2 10.4H12v3.9h5.5c-.3 1.4-1.1 2.4-2.1 3.1l3.3 2.6c1.9-1.8 3-4.4 3-7.5 0-.7-.1-1.4-.2-2.1z"
                opacity=".9"
              />
              <path
                fill="#34A853"
                d="M12 21.8c2.7 0 4.9-.9 6.6-2.4l-3.3-2.6c-.9.6-2 1-3.3 1-2.6 0-4.7-1.7-5.5-4.1l-3.4 2.6c1.6 3.2 5 5.5 8.9 5.5z"
              />
              <path
                fill="#FBBC05"
                d="M6.5 13.7c-.2-.6-.3-1.1-.3-1.7s.1-1.2.3-1.7L3.1 7.7C2.5 9 2.2 10.4 2.2 12s.3 3 .9 4.3l3.4-2.6z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="sior">
            <span>or</span>
          </div>

          <label htmlFor="siemail" className="kick">
            Email
          </label>
          <div className="well inpwrap">
            <input
              id="siemail"
              className="inp"
              style={{ fontSize: '18px' }}
              inputMode="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSignedIn();
              }}
            />
          </div>

          <button
            className="b3 gold lg full"
            onClick={handleSignedIn}
            style={{ justifyContent: 'center' }}
          >
            Email me a code
          </button>

          <div className="sior">
            <span>or</span>
          </div>

          <button
            className="b3 lg full"
            onClick={handleSignedIn}
            style={{ justifyContent: 'center', flexDirection: 'column', gap: '2px' }}
          >
            <span>Connect wallet</span>
            <span className="small">WalletConnect v2 · BSC</span>
          </button>

          <div className="small" style={{ textAlign: 'center' }}>
            Prototype: every button signs you back in.
          </div>
        </div>
      </div>

      {/* Floating Bolt Mascot in bottom-right corner */}
      <BoltMascotOverlay />
    </div>
  );
}

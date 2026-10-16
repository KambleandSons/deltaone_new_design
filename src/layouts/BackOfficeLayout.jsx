import React from 'react';
import { Outlet } from 'react-router-dom';
import { useBackOffice } from '../context/BackOfficeContext';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import EventBanner from '../components/layout/EventBanner';
import HorizonFooter from '../components/layout/HorizonFooter';
import SvgDefs from '../components/layout/SvgDefs';
import BoltMascotOverlay from '../components/layout/BoltMascotOverlay';

export default function BackOfficeLayout() {
  const { theme } = useBackOffice();

  return (
    <div
      className={`bo ${theme === 'dark' ? 't-dark' : 't-light'}`}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* SVG Symbol Definitions */}
      <SvgDefs />

      {/* Top Application Header */}
      <Header />

      {/* Main Two-Column Shell */}
      <div
        className="shell"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '28px',
          padding: '28px 24px',
          alignItems: 'flex-start',
          maxWidth: '1440px',
          width: '100%',
          boxSizing: 'border-box',
          margin: '0 auto',
          flex: '1 1 auto'
        }}
      >
        {/* Navigation & Review Controls Sidebar */}
        <Sidebar />

        {/* Dynamic Screen View */}
        <main
          style={{
            flex: '999 1 560px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '22px'
          }}
        >
          <EventBanner />
          <Outlet />
        </main>
      </div>

      {/* Mountain Peaks & Legal Disclaimer */}
      <HorizonFooter />

      {/* Floating Animated Bolt Companion Mascot */}
      <BoltMascotOverlay />
    </div>
  );
}

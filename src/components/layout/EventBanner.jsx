import React from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';

export default function EventBanner() {
  const { eventText, setEventText } = useBackOffice();

  if (!eventText) return null;

  return (
    <div
      className="tint"
      role="status"
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        border: '1px solid var(--line)',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          style={{ strokeWidth: 1.6, width: '22px', height: '22px', flex: 'none' }}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M12 7v5l3 2"></path>
        </svg>
        <span>{eventText}</span>
      </div>
      <button
        onClick={() => setEventText('')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--muted)',
          fontSize: '16px',
          padding: '0 4px'
        }}
        aria-label="Dismiss banner"
      >
        ×
      </button>
    </div>
  );
}


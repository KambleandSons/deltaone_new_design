import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function AmbassadorAccountPage() {
  const { user, setUser, theme, toggleTheme, sound, setSound, voice, setVoice, setEventText } = useBackOffice();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);

  const handleSave = () => {
    setUser((prev) => ({ ...prev, name: nameInput }));
    setIsEditing(false);
    sfx.play('pop');
    setEventText('Ambassador profile updated.');
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Ambassador Account</h1>
        <div className="lbl">Manage your ambassador credentials, invite link and payout settings.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '20px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="kick">Ambassador Profile</div>
          <div>
            <div className="lbl">Name</div>
            {isEditing ? (
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <input
                  className="inp"
                  style={{ fontSize: '18px', background: 'var(--well)', padding: '6px 12px', borderRadius: '8px' }}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
                <button className="b3 sm gold" onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div style={{ fontSize: '20px', fontWeight: 600 }}>{user.name}</div>
            )}
          </div>

          <div>
            <div className="lbl">Highest Rank Achieved</div>
            <div style={{ fontSize: '18px', color: '#8E4EC6', fontWeight: 600 }}>Everest (Level 21)</div>
          </div>

          <div>
            <div className="lbl">Personal Sponsor</div>
            <div style={{ fontSize: '16px' }}>{user.sponsor}</div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
            <button className="b3 sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit profile'}
            </button>
            <button
              className="b3 sm gold"
              onClick={() => {
                sfx.play('pop');
                setEventText('Ambassador referral link copied: https://deltaone.ai/join/ricky');
              }}
            >
              Copy invite link
            </button>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="kick">Preferences</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Appearance</div>
              <div className="small">Day or night mode</div>
            </div>
            <button className="b3 sm" onClick={toggleTheme}>
              {theme === 'dark' ? 'Night mode: on' : 'Day mode: on'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Sound Effects</div>
              <div className="small">Auditory feedback on simulation and clicks</div>
            </div>
            <button
              className={`b3 sm ${sound ? 'on gold' : ''}`}
              onClick={() => {
                setSound(!sound);
                if (!sound) sfx.play('pop');
              }}
            >
              {sound ? 'Sound: on' : 'Sound: off'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Voice Assistant</div>
              <div className="small">Spoken explanations from Bolt</div>
            </div>
            <button
              className={`b3 sm ${voice ? 'on gold' : ''}`}
              onClick={() => {
                sfx.play('pop');
                setVoice(!voice);
              }}
            >
              {voice ? 'Voice: on' : 'Voice: off'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

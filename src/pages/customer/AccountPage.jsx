import React, { useState } from 'react';
import { useBackOffice } from '../../context/BackOfficeContext';
import { sfx } from '../../utils/sfx';

export default function AccountPage() {
  const {
    user,
    setUser,
    theme,
    toggleTheme,
    sound,
    setSound,
    voice,
    setVoice,
    setEventText
  } = useBackOffice();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [notifs, setNotifs] = useState({
    settle: true,
    booster: true,
    team: true,
    news: false
  });

  const handleSaveProfile = () => {
    setUser((prev) => ({ ...prev, name: nameInput }));
    setIsEditing(false);
    sfx.play('pop');
    setEventText('Profile details updated successfully.');
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <h1 className="h1">Account</h1>
        <div className="lbl">Your profile, sign-in and security settings.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '20px' }}>
        {/* Profile Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="kick">Profile</div>
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
                <button className="b3 sm gold" onClick={handleSaveProfile}>Save</button>
              </div>
            ) : (
              <div style={{ fontSize: '20px', fontWeight: 600 }}>{user.name}</div>
            )}
          </div>

          <div>
            <div className="lbl">Username</div>
            <div style={{ fontSize: '16px' }}>{user.username}</div>
          </div>

          <div>
            <div className="lbl">Sponsor</div>
            <div style={{ fontSize: '16px' }}>{user.sponsor}</div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
            <button className="b3 sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit profile'}
            </button>
            <button className="b3 sm" onClick={() => { sfx.play('pop'); setEventText('Invite link copied to clipboard.'); }}>
              Copy invite link
            </button>
          </div>
        </div>

        {/* Preferences & Sound/Voice */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="kick">Preferences</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Appearance</div>
              <div className="small">Switch between day and night mode</div>
            </div>
            <button className="b3 sm" onClick={toggleTheme}>
              {theme === 'dark' ? 'Night mode: on' : 'Day mode: on'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Sound Effects</div>
              <div className="small">Beeps, boings and celebratory fanfares</div>
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

        {/* Notifications */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="kick">Notifications</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <b>Settlement summary</b>
              <div className="small">Daily recap after 16:00 Dubai</div>
            </div>
            <button
              className={`b3 sm ${notifs.settle ? 'on gold' : ''}`}
              onClick={() => setNotifs({ ...notifs, settle: !notifs.settle })}
            >
              {notifs.settle ? 'On' : 'Off'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <b>Booster reminders</b>
              <div className="small">When available spins are ready</div>
            </div>
            <button
              className={`b3 sm ${notifs.booster ? 'on gold' : ''}`}
              onClick={() => setNotifs({ ...notifs, booster: !notifs.booster })}
            >
              {notifs.booster ? 'On' : 'Off'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <b>Team & rank events</b>
              <div className="small">New personal enrollees or advancements</div>
            </div>
            <button
              className={`b3 sm ${notifs.team ? 'on gold' : ''}`}
              onClick={() => setNotifs({ ...notifs, team: !notifs.team })}
            >
              {notifs.team ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

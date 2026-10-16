import React, { useState, useEffect, useRef } from 'react';
import { sfx } from '../utils/sfx';
import { Volume2, VolumeX, MessageSquare, Sparkles, X, ChevronUp, ChevronDown } from 'lucide-react';

export default function BoltMascot({
  mood = 'cheer',
  title = 'Bolt · your edit assistant',
  message = "Hey, team! I'm Bolt, your review and edit assistant. It's review time! Press any button and I'll explain it.",
  soundEnabled = true,
  voiceEnabled = false,
  onOpenEditDesk,
  onToggleSound,
  onToggleVoice,
  compact = false
}) {
  const [currentMood, setCurrentMood] = useState(mood);
  const [isDocked, setIsDocked] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [lookPos, setLookPos] = useState({ x: 0, y: 0 });
  const [dancing, setDancing] = useState('');
  const boltRef = useRef(null);

  // Sync mood prop
  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  // Voice speech trigger
  useEffect(() => {
    if (voiceEnabled && message) {
      sfx.say(message);
    }
  }, [message, voiceEnabled]);

  // Mouse eye tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!boltRef.current) return;
      const rect = boltRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.4;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, dist / 300);
      setLookPos({
        x: (dx / dist) * 4 * k,
        y: (dy / dist) * 2.5 * k
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Expressions and dance shortcuts
  const triggerDance = (type) => {
    setDancing(type);
    sfx.play('beat', 2400);
    setTimeout(() => setDancing(''), 2400);
  };

  const handleMascotClick = () => {
    sfx.play('chirp');
    const moods = ['cheer', 'wink', 'love', 'happy', 'talk', 'think'];
    const next = moods[Math.floor(Math.random() * moods.length)];
    setCurrentMood(next);
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isDocked
          ? 'bottom-4 right-4 sm:right-6'
          : 'bottom-20 right-4 sm:right-8 max-w-sm'
      }`}
    >
      <div className="relative flex flex-col items-end">
        {/* Bolt Mascot Character */}
        <div
          ref={boltRef}
          onClick={handleMascotClick}
          className={`cursor-pointer select-none transition-transform hover:scale-105 active:scale-95 ${
            dancing ? 'animate-bounce' : ''
          }`}
          title="Click Bolt to interact!"
        >
          <svg
            className={`w-28 h-32 sm:w-32 sm:h-36 overflow-visible bolt face-${currentMood}`}
            viewBox="0 0 170 190"
          >
            <g className="whole">
              {/* Shadow */}
              <ellipse cx="85" cy="182" rx="42" ry="7" fill="#0A1426" opacity="0.25" />

              {/* Legs */}
              <circle cx="68" cy="164" r="14" fill="#1C212B" />
              <circle cx="102" cy="164" r="14" fill="#1C212B" />
              <ellipse cx="64" cy="158" rx="5" ry="3" fill="#FFFFFF" opacity="0.4" />
              <ellipse cx="98" cy="158" rx="5" ry="3" fill="#FFFFFF" opacity="0.4" />

              {/* Antenna */}
              <g className="ant">
                <path
                  d="M88 40 C88 28 82 22 78 12"
                  fill="none"
                  stroke="#141822"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <circle cx="76" cy="10" r="9" fill="#1C82D4" className="oglow" />
                <circle cx="76" cy="10" r="7" fill="#7FD6FF" />
                <circle cx="74" cy="8" r="2.5" fill="#FFFFFF" opacity="0.9" />
              </g>

              {/* Ears */}
              <circle cx="28" cy="102" r="11" fill="#FFAA1F" />
              <circle cx="28" cy="102" r="11" fill="url(#mbShade)" />
              <circle cx="142" cy="102" r="11" fill="#FFAA1F" />
              <circle cx="142" cy="102" r="11" fill="url(#mbShade)" />

              {/* Body / Head Block */}
              <rect
                x="30"
                y="42"
                width="110"
                height="115"
                rx="38"
                fill="#FFAA1F"
                className="drop-shadow-lg"
              />
              <rect x="30" y="42" width="110" height="115" rx="38" fill="url(#mbShade)" />
              <rect x="30" y="42" width="110" height="115" rx="38" fill="url(#mbShine)" />
              <rect
                x="30"
                y="42"
                width="110"
                height="115"
                rx="38"
                fill="none"
                stroke="#B86E00"
                strokeWidth="1.5"
              />

              {/* Screen Face */}
              <rect x="44" y="58" width="82" height="56" rx="20" fill="#0A101C" />
              <path
                d="M54 68 Q85 64 116 66"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.14"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Eyes & Gaze */}
              <g
                style={{
                  transform: `translate(${lookPos.x.toFixed(1)}px, ${lookPos.y.toFixed(1)}px)`,
                  transition: 'transform 80ms ease-out'
                }}
              >
                {/* Standard Happy Eyes */}
                <g className="e-happy fx">
                  <path
                    d="M58 84 Q67 74 76 84"
                    fill="none"
                    stroke="#7FD6FF"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M94 84 Q103 74 112 84"
                    fill="none"
                    stroke="#7FD6FF"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </g>

                {/* Cheer Grin Eyes */}
                <g className="e-cheer fx">
                  <path
                    d="M56 82 Q67 70 78 82"
                    fill="none"
                    stroke="#FFD54F"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M92 82 Q103 70 114 82"
                    fill="none"
                    stroke="#FFD54F"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </g>

                {/* Love Eyes */}
                <g className="e-love fx">
                  <path
                    d="M60 84 C56 78 60 72 66 76 C72 72 76 78 72 84 L66 90 Z"
                    fill="#FF4B72"
                  />
                  <path
                    d="M98 84 C94 78 98 72 104 76 C110 72 114 78 110 84 L104 90 Z"
                    fill="#FF4B72"
                  />
                </g>

                {/* Sad Eyes */}
                <g className="e-sad fx">
                  <path
                    d="M58 80 Q67 88 76 80"
                    fill="none"
                    stroke="#7FD6FF"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M94 80 Q103 88 112 80"
                    fill="none"
                    stroke="#7FD6FF"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </g>

                {/* Surprise Eyes */}
                <g className="e-surprise fx">
                  <circle cx="67" cy="80" r="8" fill="#7FD6FF" />
                  <circle cx="103" cy="80" r="8" fill="#7FD6FF" />
                  <circle cx="67" cy="80" r="3" fill="#0A101C" />
                  <circle cx="103" cy="80" r="3" fill="#0A101C" />
                </g>

                {/* Wink Eyes */}
                <g className="e-wink fx">
                  <path
                    d="M58 82 Q67 72 76 82"
                    fill="none"
                    stroke="#7FD6FF"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="94"
                    y1="82"
                    x2="112"
                    y2="82"
                    stroke="#7FD6FF"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>

                {/* Think Eyes */}
                <g className="e-think fx">
                  <circle cx="67" cy="76" r="6" fill="#7FD6FF" />
                  <circle cx="103" cy="76" r="6" fill="#7FD6FF" />
                </g>
              </g>

              {/* Mouth expressions */}
              <g>
                <path
                  className="m-smile fx"
                  d="M74 98 Q85 106 96 98"
                  fill="none"
                  stroke="#7FD6FF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <ellipse className="m-grin fx" cx="85" cy="99" rx="14" ry="7" fill="#7FD6FF" />
                <ellipse className="m-o fx" cx="85" cy="98" rx="8" ry="9" fill="#7FD6FF" />
                <path
                  className="m-frown fx"
                  d="M74 104 Q85 96 96 104"
                  fill="none"
                  stroke="#7FD6FF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <ellipse className="m-talk fx" cx="85" cy="99" rx="11" ry="6" fill="#7FD6FF" />
              </g>

              {/* Cheeks */}
              <ellipse className="cheek fx" cx="54" cy="93" rx="5" ry="3" fill="#FF8442" opacity="0.6" />
              <ellipse className="cheek fx" cx="116" cy="93" rx="5" ry="3" fill="#FF8442" opacity="0.6" />

              {/* Delta symbol badge on chest */}
              <polygon points="85,126 77,140 93,140" fill="#141822" opacity="0.8" />
            </g>
          </svg>
        </div>

        {/* Speech Bubble / Dialog Card */}
        {isOpen && (
          <div className="mt-2 w-80 sm:w-96 card bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-2xl rounded-2xl p-4 transition-all">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <b className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {title}
                </b>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={onToggleSound}
                  className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
                >
                  {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              {message}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <button
                onClick={onOpenEditDesk}
                className="b3 gold sm text-xs py-1 px-3 inline-flex items-center gap-1.5"
              >
                <MessageSquare size={13} />
                Bolt, help me make an edit
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => triggerDance('twist')}
                  className="p-1.5 text-xs text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 font-medium"
                  title="Make Bolt dance!"
                >
                  <Sparkles size={14} className="inline mr-1" />
                  Dance
                </button>
              </div>
            </div>
          </div>
        )}

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="mt-1 b3 gold sm text-xs py-1 px-2.5 shadow-md flex items-center gap-1"
          >
            <ChevronUp size={14} /> Talk to Bolt
          </button>
        )}
      </div>
    </div>
  );
}


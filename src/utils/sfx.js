// Web Audio API retro synthesizer + Web Speech API for Bolt
class SoundFX {
  constructor() {
    this.ac = null;
    this.master = null;
    this.enabled = true;
    this.voiceEnabled = false;
  }

  init() {
    if (this.ac) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ac = new AC();
      this.master = this.ac.createGain();
      this.master.gain.value = 0.22;
      this.master.connect(this.ac.destination);
    } catch {
      // Audio not permitted or unsupported
    }
  }

  play(name, dur) {
    if (!this.enabled) return;
    this.init();
    if (!this.ac) return;
    try {
      const ac = this.ac;
      if (ac.state === 'suspended') ac.resume();
      const t0 = ac.currentTime + 0.01;

      const tone = (f, at, d, type, vol, to) => {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(f, t0 + at);
        if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + at + d);
        g.gain.setValueAtTime(0.0001, t0 + at);
        g.gain.exponentialRampToValueAtTime(vol || 0.3, t0 + at + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + d);
        o.connect(g);
        g.connect(this.master);
        o.start(t0 + at);
        o.stop(t0 + at + d + 0.05);
      };

      const noise = (at, d, f1, f2, vol) => {
        const n = Math.floor(ac.sampleRate * d);
        const buf = ac.createBuffer(1, n, ac.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < n; i++) data[i] = Math.random() * 2 - 1;
        const src = ac.createBufferSource();
        src.buffer = buf;
        const bp = ac.createBiquadFilter();
        bp.type = 'bandpass';
        bp.Q.value = 1.2;
        bp.frequency.setValueAtTime(f1, t0 + at);
        bp.frequency.exponentialRampToValueAtTime(f2, t0 + at + d);
        const g = ac.createGain();
        g.gain.setValueAtTime(0.0001, t0 + at);
        g.gain.exponentialRampToValueAtTime(vol || 0.25, t0 + at + d * 0.3);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + d);
        src.connect(bp);
        bp.connect(g);
        g.connect(this.master);
        src.start(t0 + at);
        src.stop(t0 + at + d + 0.05);
      };

      const S = {
        pop: () => {
          tone(880, 0, 0.07, 'square', 0.12);
          tone(1320, 0.06, 0.08, 'square', 0.1);
        },
        whoosh: () => noise(0, 0.38, 350, 2400, 0.3),
        land: () => tone(140, 0, 0.16, 'sine', 0.45, 55),
        boing: () => tone(220, 0, 0.32, 'triangle', 0.3, 700),
        chirp: () => {
          [0, 0.07, 0.14, 0.21].forEach((at) => tone(600 + Math.random() * 900, at, 0.06, 'sine', 0.2));
        },
        cheer: () => {
          [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.08, 0.16, 'triangle', 0.28));
        },
        sad: () => {
          tone(392, 0, 0.3, 'sawtooth', 0.08, 370);
          tone(330, 0.32, 0.3, 'sawtooth', 0.08, 311);
          tone(262, 0.64, 0.6, 'sawtooth', 0.08, 233);
        },
        tick: () => tone(1900, 0, 0.025, 'square', 0.06),
        win: () => {
          [523, 659, 784].forEach((f, i) => tone(f, i * 0.09, 0.14, 'triangle', 0.28));
          [523, 659, 784, 1046].forEach((f) => tone(f, 0.3, 0.55, 'triangle', 0.14));
        },
        jackpot: () => {
          [523, 659, 784, 1046, 1318, 1568, 2093].forEach((f, i) => tone(f, i * 0.06, 0.14, 'square', 0.12));
          for (let i = 0; i < 10; i++) tone(i % 2 ? 2637 : 3136, 0.45 + i * 0.05, 0.05, 'sine', 0.12);
          [523, 784, 1046, 1568].forEach((f) => tone(f, 0.95, 0.9, 'triangle', 0.12));
        },
        cash: () => {
          tone(1568, 0, 0.35, 'sine', 0.3);
          tone(2093, 0.12, 0.5, 'sine', 0.28);
          noise(0, 0.08, 3000, 5000, 0.12);
        },
        flip: () => {
          noise(0, 0.5, 300, 3000, 0.28);
          tone(300, 0, 0.45, 'triangle', 0.18, 1200);
        },
        idle: () => {
          [0, 0.08, 0.16].forEach((at) => tone(700 + Math.random() * 700, at, 0.06, 'sine', 0.2));
          tone(420, 0.3, 0.35, 'sine', 0.25, 760);
        },
        beat: (d) => {
          const n = Math.max(4, Math.floor((d || 2400) / 300));
          const P = [523, 659, 784, 880, 1046, 880, 784, 659];
          for (let i = 0; i < n; i++) {
            const at = i * 0.3;
            tone(150, at, 0.12, 'sine', 0.5, 50);
            noise(at + 0.15, 0.05, 6000, 8000, 0.08);
            if (i % 2 === 0) tone(P[(i / 2) % P.length], at, 0.12, 'triangle', 0.12);
          }
        },
        giggle: () => {
          [0, 0.09, 0.18, 0.3, 0.39, 0.48].forEach((at, i) =>
            tone(i < 3 ? 950 + i * 120 : 1250 - (i - 3) * 120, at, 0.07, 'sine', 0.22, i < 3 ? 1200 + i * 120 : 1000 - (i - 3) * 80)
          );
        },
        laugh: () => {
          for (let i = 0; i < 8; i++) {
            tone(420 + (i % 2) * 90, i * 0.13, 0.1, 'square', 0.1, 360 + (i % 2) * 70);
          }
        },
        dizzy: () => {
          tone(900, 0, 0.9, 'sine', 0.2, 180);
          [0.2, 0.45, 0.7].forEach((at) => tone(1800, at, 0.08, 'triangle', 0.1));
        },
        hooray: () => {
          [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, i * 0.1, 0.18, 'triangle', 0.25));
        }
      };

      if (S[name]) S[name](dur);
    } catch {
      // Audio playback failed
    }
  }

  say(text) {
    if (!this.voiceEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.05;
      u.pitch = 1.25;
      window.speechSynthesis.speak(u);
    } catch {
      // Speech synthesis unsupported
    }
  }
}

export const sfx = new SoundFX();


/**
 * Fun Kid-Friendly Web Audio Synthesizer & Chiptune BGM Engine
 * Zero external MP3 files, zero network lag, 100% reliable in any browser.
 */

class SpaceAudioEngine {
  constructor() {
    this.ctx = null;
    this.isSfxMuted = false;
    this.isBgmMuted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.bgmGainNode = null;
    this.stepIndex = 0;

    // Upbeat, catchy 16-step cosmic melody in C Major pentatonic
    // Melody notes: C5, G4, A4, C5, E5, D5, C5, G4, A4, C5, D5, E5, G5, E5, D5, C5
    this.melody = [
      523.25, 392.00, 440.00, 523.25,
      659.25, 587.33, 523.25, 392.00,
      440.00, 523.25, 587.33, 659.25,
      783.99, 659.25, 587.33, 523.25
    ];

    // Bouncy walking bassline
    this.bassline = [
      130.81, 130.81, 164.81, 196.00,
      174.61, 174.61, 220.00, 196.00,
      146.83, 146.83, 174.61, 220.00,
      196.00, 196.00, 246.94, 261.63
    ];
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.bgmGainNode = this.ctx.createGain();
        // Generous, clearly audible master music volume (0.35)
        this.bgmGainNode.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.bgmGainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- BGM (Background Music) Controls ---

  toggleBgm() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.bgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  startBgm() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.bgmPlaying) return;
    this.bgmPlaying = true;
    this.stepIndex = 0;

    // Immediately play the first note
    this.playBgmStep();

    const stepDuration = 180; // ~166 BPM joyful bouncy tempo
    this.bgmTimer = setInterval(() => {
      if (!this.bgmPlaying || this.isBgmMuted || !this.ctx) return;
      this.stepIndex = (this.stepIndex + 1) % this.melody.length;
      this.playBgmStep();
    }, stepDuration);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  playBgmStep() {
    if (!this.ctx || this.isBgmMuted || !this.bgmGainNode) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;

    // 1. Playful Synth Melody Note (clear, friendly triangle wave)
    const melodyFreq = this.melody[this.stepIndex];
    if (melodyFreq) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(melodyFreq, now);

      // Clearly audible melody gain: 0.16
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.17);

      osc.connect(gain);
      gain.connect(this.bgmGainNode);

      osc.start(now);
      osc.stop(now + 0.17);
    }

    // 2. Groovy Bouncy Bass Note (deep warm sine)
    const bassFreq = this.bassline[this.stepIndex];
    if (bassFreq && (this.stepIndex % 2 === 0)) {
      const bOsc = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();

      bOsc.type = 'sine';
      bOsc.frequency.setValueAtTime(bassFreq, now);

      // Warm bass gain: 0.22
      bGain.gain.setValueAtTime(0.22, now);
      bGain.gain.exponentialRampToValueAtTime(0.008, now + 0.32);

      bOsc.connect(bGain);
      bGain.connect(this.bgmGainNode);

      bOsc.start(now);
      bOsc.stop(now + 0.32);
    }

    // 3. Crisp Cartoon Percussion Tap (Hi-hat / woodblock) on beats 1, 5, 9, 13
    if (this.stepIndex % 4 === 2) {
      const pOsc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();

      pOsc.type = 'square';
      pOsc.frequency.setValueAtTime(900, now);
      pOsc.frequency.exponentialRampToValueAtTime(100, now + 0.04);

      pGain.gain.setValueAtTime(0.06, now);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      pOsc.connect(pGain);
      gainNode: pGain.connect(this.bgmGainNode);

      pOsc.start(now);
      pOsc.stop(now + 0.04);
    }
  }

  // --- Sound FX Controls ---

  toggleSfx() {
    this.isSfxMuted = !this.isSfxMuted;
    return !this.isSfxMuted;
  }

  // Cute cartoon wooden block / bubble tap
  playClick() {
    if (this.isSfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Fun cartoon "Boing!" sound for dragging/dropping cards onto the base
  playBoing() {
    if (this.isSfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(now + 0.25);
  }

  // Cute bubble pop sound when hovering or tapping cards
  playPop() {
    if (this.isSfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const now = this.ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Punchy arcade activation
  playActivate() {
    this.playBoing();
  }

  // Upbeat Power-Up Chime (ascending sparkles!)
  playPowerUp() {
    if (this.isSfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startTime = this.ctx.currentTime + (idx * 0.06);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.005, startTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });
  }

  // Laser zap / Pew-pew!
  playLaser() {
    if (this.isSfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const now = this.ctx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Cartoon funny warning / uh-oh
  playWarning() {
    if (this.isSfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const now = this.ctx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.setValueAtTime(260, now + 0.1);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Radio beep / transmission
  playTransmission() {
    if (this.isSfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const now = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.1);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Glorious 8-bit fanfare chime (celebratory win!)
  playSuccess() {
    if (this.isSfxMuted) return;
    this.init();
    if (!this.ctx) return;

    const fanfareNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    fanfareNotes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startTime = this.ctx.currentTime + (idx * 0.08);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.16, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }
}

export const spaceAudio = new SpaceAudioEngine();

// Convenience helper exports for components
export const playClick = () => spaceAudio.playClick();
export const playPop = () => spaceAudio.playPop();
export const playBoing = () => spaceAudio.playBoing();
export const playActivate = () => spaceAudio.playActivate();
export const playPowerUp = () => spaceAudio.playPowerUp();
export const playLaser = () => spaceAudio.playLaser();
export const playWarning = () => spaceAudio.playWarning();
export const playSuccess = () => spaceAudio.playSuccess();
export const playTransmission = () => spaceAudio.playTransmission();


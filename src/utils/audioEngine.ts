/**
 * Procedural Cinematic Ambient Instrumental Music Engine
 * Built with Web Audio API.
 * 100% royalty-free, original, copyright-safe, zero network reliance.
 */

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;
  private noteStep: number = 0;
  private volume: number = 0.55;

  // Chord progression: Em9 -> Cmaj7 -> G -> D/F# (Warm, emotional, cinematic)
  private readonly chords: number[][] = [
    // Em9 (E3, G3, B3, D4, F#4)
    [164.81, 196.00, 246.94, 293.66, 369.99],
    // Cmaj7 (C3, E3, G3, B3, E4)
    [130.81, 164.81, 196.00, 246.94, 329.63],
    // G (G2, D3, G3, B3, D4)
    [98.00, 146.83, 196.00, 246.94, 293.66],
    // D/F# (F#2, D3, A3, D4, F#4)
    [92.50, 146.83, 220.00, 293.66, 369.99],
  ];

  // High sparkle melody notes
  private readonly sparkleNotes: number[] = [
    587.33, 659.25, 739.99, 880.00, 987.77, 1174.66
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a warm soft piano/pad tone
  private playVoice(freq: number, startTime: number, duration: number, gainLevel: number = 0.12, isBell = false) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm tone filtering
      filter.type = isBell ? 'bandpass' : 'lowpass';
      filter.frequency.setValueAtTime(isBell ? freq * 1.5 : 900, startTime);
      filter.Q.setValueAtTime(isBell ? 3 : 1, startTime);

      osc.type = isBell ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Attack & decay envelope
      const attack = isBell ? 0.05 : 0.8;
      const decay = duration * 0.8;

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel, startTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + attack + decay);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + attack + decay + 0.1);
    } catch {
      // Graceful catch if audio state changes
    }
  }

  private step() {
    if (!this.ctx || !this.isPlaying) return;

    const currentChordIndex = Math.floor(this.noteStep / 4) % this.chords.length;
    const chord = this.chords[currentChordIndex];
    const subBeat = this.noteStep % 4;

    const now = this.ctx.currentTime;

    // Pad root note on chord change
    if (subBeat === 0) {
      this.playVoice(chord[0], now, 5.5, 0.18, false); // Bass root
      this.playVoice(chord[1], now + 0.1, 4.5, 0.12, false); // Harmonic third
      this.playVoice(chord[2], now + 0.2, 4.0, 0.10, false); // Fifth
    }

    // Gentle arpeggiated piano notes
    const noteToPlay = chord[(subBeat + 1) % chord.length];
    this.playVoice(noteToPlay, now, 2.2, 0.11, false);

    // Occasional gentle sparkle bell
    if (Math.random() > 0.45) {
      const sparkle = this.sparkleNotes[Math.floor(Math.random() * this.sparkleNotes.length)];
      this.playVoice(sparkle, now + 0.35, 1.8, 0.04, true);
    }

    this.noteStep++;
  }

  public async start() {
    this.initContext();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.step();

    // Loop steps every 1.25 seconds (slow, warm tempo)
    this.intervalId = window.setInterval(() => {
      this.step();
    }, 1250);
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    };
  }
}

export const audioEngine = new CinematicAudioEngine();

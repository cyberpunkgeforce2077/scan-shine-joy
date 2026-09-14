/**
 * OmniSuite Audio Synthesis Engine
 * Renders polyphonic, multi-track audio offline or in-browser using Web Audio API and OfflineAudioContext.
 * Exports standard 16-bit PCM Stereo WAV blobs.
 */

export interface TrackComposition {
  title: string;
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  durationSeconds: number;
  lyrics?: string;
  description?: string;
  chords: string[][];
  melody: { note: string; beat: number; duration: number; velocity?: number }[];
  bassline: { note: string; beat: number; duration: number }[];
  drums: {
    kick: number[]; // beat positions (e.g. [0, 2, 4, ...])
    snare: number[];
    hihat: number[];
  };
}

// Frequency map for standard scientific pitch notation (C1 to B6)
const NOTE_FREQS: Record<string, number> = {
  C1: 32.7,
  "C#1": 34.65,
  Db1: 34.65,
  D1: 36.71,
  "D#1": 38.89,
  Eb1: 38.89,
  E1: 41.2,
  F1: 43.65,
  "F#1": 46.25,
  Gb1: 46.25,
  G1: 49.0,
  "G#1": 51.91,
  Ab1: 51.91,
  A1: 55.0,
  "A#1": 58.27,
  Bb1: 58.27,
  B1: 61.74,
  C2: 65.41,
  "C#2": 69.3,
  Db2: 69.3,
  D2: 73.42,
  "D#2": 77.78,
  Eb2: 77.78,
  E2: 82.41,
  F2: 87.31,
  "F#2": 92.5,
  Gb2: 92.5,
  G2: 98.0,
  "G#2": 103.83,
  Ab2: 103.83,
  A2: 110.0,
  "A#2": 116.54,
  Bb2: 116.54,
  B2: 123.47,
  C3: 130.81,
  "C#3": 138.59,
  Db3: 138.59,
  D3: 146.83,
  "D#3": 155.56,
  Eb3: 155.56,
  E3: 164.81,
  F3: 174.61,
  "F#3": 185.0,
  Gb3: 185.0,
  G3: 196.0,
  "G#3": 207.65,
  Ab3: 207.65,
  A3: 220.0,
  "A#3": 233.08,
  Bb3: 233.08,
  B3: 246.94,
  C4: 261.63,
  "C#4": 277.18,
  Db4: 277.18,
  D4: 293.66,
  "D#4": 311.13,
  Eb4: 311.13,
  E4: 329.63,
  F4: 349.23,
  "F#4": 369.99,
  Gb4: 369.99,
  G4: 392.0,
  "G#4": 415.3,
  Ab4: 415.3,
  A4: 440.0,
  "A#4": 466.16,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  "C#5": 554.37,
  Db5: 554.37,
  D5: 587.33,
  "D#5": 622.25,
  Eb5: 622.25,
  E5: 659.25,
  F5: 698.46,
  "F#5": 739.99,
  Gb5: 739.99,
  G5: 783.99,
  "G#5": 830.61,
  Ab5: 830.61,
  A5: 880.0,
  "A#5": 932.33,
  Bb5: 932.33,
  B5: 987.77,
  C6: 1046.5,
  "C#6": 1108.73,
  D6: 1174.66,
  "D#6": 1244.51,
  E6: 1318.51,
  F6: 1396.91,
  G6: 1567.98,
  A6: 1760.0,
  B6: 1975.53,
};

function noteToFreq(note: string): number {
  return NOTE_FREQS[note] || 440;
}

/**
 * Encodes an AudioBuffer into standard 16-bit PCM WAV format.
 */
export function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;

  const numSamples = buffer.length * numChannels;
  const dataByteCount = numSamples * bytesPerSample;
  const headerByteCount = 44;
  const totalByteCount = headerByteCount + dataByteCount;

  const arrayBuffer = new ArrayBuffer(totalByteCount);
  const view = new DataView(arrayBuffer);

  // RIFF identifier
  writeString(view, 0, "RIFF");
  // File length minus RIFF identifier & file length (total - 8)
  view.setUint32(4, 36 + dataByteCount, true);
  // RIFF type
  writeString(view, 8, "WAVE");
  // format chunk identifier
  writeString(view, 12, "fmt ");
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (1 = PCM)
  view.setUint16(20, format, true);
  // channel count
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sampleRate * blockAlign)
  view.setUint32(28, sampleRate * blockAlign, true);
  // block align
  view.setUint16(32, blockAlign, true);
  // bits per sample
  view.setUint16(34, bitDepth, true);
  // data chunk identifier
  writeString(view, 36, "data");
  // data chunk length
  view.setUint32(40, dataByteCount, true);

  // Interleave channels and write 16-bit PCM samples
  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(buffer.getChannelData(c));
  }

  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let c = 0; c < numChannels; c++) {
      let sample = channels[c][i];
      // Soft-clip to prevent digital wrap-around distortion
      sample = Math.max(-1, Math.min(1, sample));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([view], { type: "audio/wav" });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

/**
 * Synthesizes a multi-track song from a TrackComposition object.
 */
export async function renderCompositionToAudioBuffer(
  composition: TrackComposition,
): Promise<AudioBuffer> {
  const sampleRate = 44100;
  const duration = Math.min(Math.max(composition.durationSeconds || 30, 10), 120);
  const offlineCtx = new (
    window.OfflineAudioContext ||
    (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext })
      .webkitOfflineAudioContext
  )(2, sampleRate * duration, sampleRate);

  const secondsPerBeat = 60 / (composition.bpm || 100);
  const totalBeats = Math.floor(duration / secondsPerBeat);

  // Master Gain and Reverb Simulation
  const masterGain = offlineCtx.createGain();
  masterGain.gain.setValueAtTime(0.85, 0);
  masterGain.gain.setValueAtTime(0.85, duration - 2.5);
  masterGain.gain.linearRampToValueAtTime(0.001, duration); // Clean fade out at end
  masterGain.connect(offlineCtx.destination);

  // Simple algorithmic convolution / delay bus for stereo warmth
  const delayNode = offlineCtx.createDelay(1.0);
  delayNode.delayTime.setValueAtTime(secondsPerBeat * 0.75, 0); // dotted eighth note delay
  const delayFeedback = offlineCtx.createGain();
  delayFeedback.gain.setValueAtTime(0.25, 0);
  delayNode.connect(delayFeedback);
  delayFeedback.connect(delayNode);
  delayFeedback.connect(masterGain);

  // 1. CHORD PADS & TEXTURES
  const chords =
    composition.chords && composition.chords.length > 0
      ? composition.chords
      : [
          ["C3", "E3", "G3", "B3"],
          ["A2", "C3", "E3", "G3"],
          ["F2", "A2", "C3", "E3"],
          ["G2", "B2", "D3", "F3"],
        ];

  const chordDurationBeats = 4; // 1 measure per chord
  const numChordChanges = Math.ceil(totalBeats / chordDurationBeats);

  for (let i = 0; i < numChordChanges; i++) {
    const chord = chords[i % chords.length];
    const startTime = i * chordDurationBeats * secondsPerBeat;
    const chordDurationSeconds = chordDurationBeats * secondsPerBeat;

    chord.forEach((noteName) => {
      const freq = noteToFreq(noteName);
      if (!freq) return;

      const osc = offlineCtx.createOscillator();
      const osc2 = offlineCtx.createOscillator();
      const padGain = offlineCtx.createGain();
      const padFilter = offlineCtx.createBiquadFilter();

      osc.type = composition.genre.toLowerCase().includes("chiptune") ? "square" : "sawtooth";
      osc.frequency.setValueAtTime(freq, startTime);
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 1.002, startTime); // Subtle stereo detune

      padFilter.type = "lowpass";
      padFilter.frequency.setValueAtTime(450, startTime);
      padFilter.frequency.exponentialRampToValueAtTime(
        1400,
        startTime + chordDurationSeconds * 0.4,
      );
      padFilter.frequency.exponentialRampToValueAtTime(600, startTime + chordDurationSeconds);

      padGain.gain.setValueAtTime(0.0001, startTime);
      padGain.gain.linearRampToValueAtTime(0.09, startTime + 0.3);
      padGain.gain.setValueAtTime(0.09, startTime + chordDurationSeconds - 0.4);
      padGain.gain.linearRampToValueAtTime(0.0001, startTime + chordDurationSeconds);

      osc.connect(padFilter);
      osc2.connect(padFilter);
      padFilter.connect(padGain);
      padGain.connect(masterGain);
      padGain.connect(delayNode);

      osc.start(startTime);
      osc2.start(startTime);
      osc.stop(startTime + chordDurationSeconds);
      osc2.stop(startTime + chordDurationSeconds);
    });
  }

  // 2. BASSLINE
  const bassNotes =
    composition.bassline && composition.bassline.length > 0
      ? composition.bassline
      : [
          { note: "C2", beat: 0, duration: 1.5 },
          { note: "C2", beat: 2, duration: 1.5 },
          { note: "A1", beat: 4, duration: 1.5 },
          { note: "A1", beat: 6, duration: 1.5 },
          { note: "F1", beat: 8, duration: 1.5 },
          { note: "F1", beat: 10, duration: 1.5 },
          { note: "G1", beat: 12, duration: 1.5 },
          { note: "G1", beat: 14, duration: 1.5 },
        ];

  const bassLoopLength = 16;
  for (let loop = 0; loop < Math.ceil(totalBeats / bassLoopLength); loop++) {
    bassNotes.forEach((b) => {
      const beat = loop * bassLoopLength + b.beat;
      if (beat >= totalBeats) return;
      const startTime = beat * secondsPerBeat;
      const dur = b.duration * secondsPerBeat;
      const freq = noteToFreq(b.note);

      const osc = offlineCtx.createOscillator();
      const subOsc = offlineCtx.createOscillator();
      const bassGain = offlineCtx.createGain();
      const bassFilter = offlineCtx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(freq / 2, startTime); // sub-octave rumble

      bassFilter.type = "lowpass";
      bassFilter.frequency.setValueAtTime(320, startTime);

      bassGain.gain.setValueAtTime(0.001, startTime);
      bassGain.gain.linearRampToValueAtTime(0.32, startTime + 0.03);
      bassGain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

      osc.connect(bassFilter);
      subOsc.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(masterGain);

      osc.start(startTime);
      subOsc.start(startTime);
      osc.stop(startTime + dur);
      subOsc.stop(startTime + dur);
    });
  }

  // 3. MELODIC LEAD / ARPEGGIO
  const melody =
    composition.melody && composition.melody.length > 0
      ? composition.melody
      : [
          { note: "G4", beat: 0, duration: 0.5 },
          { note: "A4", beat: 1, duration: 0.5 },
          { note: "C5", beat: 2, duration: 1.0 },
          { note: "D5", beat: 3.5, duration: 0.5 },
          { note: "E5", beat: 4, duration: 1.5 },
          { note: "G5", beat: 6, duration: 1.0 },
          { note: "E5", beat: 8, duration: 0.5 },
          { note: "D5", beat: 9, duration: 0.5 },
          { note: "C5", beat: 10, duration: 1.5 },
          { note: "B4", beat: 12, duration: 1.0 },
          { note: "A4", beat: 14, duration: 1.5 },
        ];

  const melodyLoopLength = 16;
  for (let loop = 0; loop < Math.ceil(totalBeats / melodyLoopLength); loop++) {
    melody.forEach((m) => {
      const beat = loop * melodyLoopLength + m.beat;
      if (beat >= totalBeats) return;
      const startTime = beat * secondsPerBeat;
      const dur = m.duration * secondsPerBeat;
      const freq = noteToFreq(m.note);
      const velocity = m.velocity ?? 0.8;

      const osc = offlineCtx.createOscillator();
      const gain = offlineCtx.createGain();
      const filter = offlineCtx.createBiquadFilter();

      osc.type = composition.genre.toLowerCase().includes("synthwave") ? "sawtooth" : "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq * 1.5, startTime);
      filter.Q.setValueAtTime(2.0, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.18 * velocity, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      gain.connect(delayNode);

      osc.start(startTime);
      osc.stop(startTime + dur);
    });
  }

  // 4. DRUMS (Kick, Snare, Hi-Hat)
  // Synthesized Kick
  const kickBeats = composition.drums?.kick || [0, 2, 4, 6, 8, 10, 12, 14];
  const snareBeats = composition.drums?.snare || [2, 6, 10, 14];
  const hihatBeats = composition.drums?.hihat || [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ];

  const drumLoop = 16;
  for (let loop = 0; loop < Math.ceil(totalBeats / drumLoop); loop++) {
    // Kicks
    kickBeats.forEach((b) => {
      const beat = loop * drumLoop + b;
      if (beat >= totalBeats) return;
      const time = beat * secondsPerBeat;

      const osc = offlineCtx.createOscillator();
      const gain = offlineCtx.createGain();

      osc.frequency.setValueAtTime(140, time);
      osc.frequency.exponentialRampToValueAtTime(36, time + 0.09);

      gain.gain.setValueAtTime(0.55, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(time);
      osc.stop(time + 0.3);
    });

    // Snares
    snareBeats.forEach((b) => {
      const beat = loop * drumLoop + b;
      if (beat >= totalBeats) return;
      const time = beat * secondsPerBeat;

      // Noise component
      const noiseBuffer = offlineCtx.createBuffer(1, sampleRate * 0.2, sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let s = 0; s < noiseBuffer.length; s++) {
        output[s] = Math.random() * 2 - 1;
      }
      const noise = offlineCtx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = offlineCtx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(950, time);

      const gain = offlineCtx.createGain();
      gain.gain.setValueAtTime(0.35, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      noise.start(time);
      noise.stop(time + 0.2);
    });

    // Hi-Hats
    hihatBeats.forEach((b) => {
      const beat = loop * drumLoop + b;
      if (beat >= totalBeats) return;
      const time = beat * secondsPerBeat;

      const noiseBuffer = offlineCtx.createBuffer(1, sampleRate * 0.05, sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let s = 0; s < noiseBuffer.length; s++) {
        output[s] = Math.random() * 2 - 1;
      }
      const noise = offlineCtx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = offlineCtx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(6500, time);

      const gain = offlineCtx.createGain();
      const isAccent = b % 2 === 0;
      gain.gain.setValueAtTime(isAccent ? 0.12 : 0.06, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + (isAccent ? 0.04 : 0.025));

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      noise.start(time);
      noise.stop(time + 0.05);
    });
  }

  return await offlineCtx.startRendering();
}

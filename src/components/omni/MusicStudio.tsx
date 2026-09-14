import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Download,
  Sparkles,
  Music,
  Sliders,
  Volume2,
  VolumeX,
  RotateCcw,
  Clock,
  Radio,
  Disc,
  ListMusic,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { generateMusicTrack, generateLyrics, type GeneratedMusicResult } from "@/lib/music.functions";
import { renderCompositionToAudioBuffer, audioBufferToWav } from "@/lib/audioSynthesizer";

const PRESETS = [
  {
    label: "Rainy Window Lo-Fi",
    prompt:
      "Warm nostalgic lo-fi hip hop with gentle vinyl crackle, electric piano, and mellow acoustic drums",
    genre: "Lo-Fi",
    mood: "Relaxing",
    tempo: 84,
  },
  {
    label: "Cyberpunk Synthwave",
    prompt:
      "High-octane retro synthwave with pulsing bass arpeggios, gated reverb drums, and glowing neon leads",
    genre: "Synthwave",
    mood: "Energetic",
    tempo: 124,
  },
  {
    label: "Space Odyssey",
    prompt:
      "Cinematic orchestral ambient journey with lush harmonic pads, deep sub bass, and celestial bells",
    genre: "Cinematic",
    mood: "Dreamy",
    tempo: 75,
  },
  {
    label: "Golden Hour Jazz",
    prompt:
      "Smooth neo-soul jazz chords with rich Rhodes keyboard, walking upright bass, and crisp brush drums",
    genre: "Jazz",
    mood: "Chill",
    tempo: 92,
  },
  {
    label: "8-Bit Hero Quest",
    prompt:
      "Nostalgic chiptune arcade adventure with fast square-wave lead melody, pulse bass, and energetic arps",
    genre: "8-Bit",
    mood: "Uplifting",
    tempo: 135,
  },
  {
    label: "Zen Meditation",
    prompt:
      "Ultra-calm floating ambient frequency bowls, sustained harmonic drone, and slow breathing swells",
    genre: "Ambient",
    mood: "Relaxing",
    tempo: 68,
  },
];

const GENRES = ["Lo-Fi", "Synthwave", "Cinematic", "Ambient", "Jazz", "8-Bit", "EDM"];
const MOODS = ["Relaxing", "Energetic", "Dreamy", "Uplifting", "Melancholic", "Mysterious"];

interface StoredTrack {
  id: string;
  title: string;
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  description: string;
  date: string;
  audioBlobUrl: string;
  durationSeconds: number;
  lyrics?: string;
}

export function MusicStudio() {
  const [prompt, setPrompt] = useState(
    "Lo-fi sunset beats with warm Rhodes chords, gentle bass, and chill vinyl crackle",
  );
  const [lyrics, setLyrics] = useState("");
  const [genre, setGenre] = useState("Lo-Fi");
  const [mood, setMood] = useState("Relaxing");
  const [tempo, setTempo] = useState(88);
  const [duration, setDuration] = useState(30);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingLyrics, setIsGeneratingLyrics] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Active track state
  const [activeTrack, setActiveTrack] = useState<StoredTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  // Saved track history
  const [history, setHistory] = useState<StoredTrack[]>([]);

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("omni-music-history");
      if (stored) {
        const parsed = JSON.parse(stored) as StoredTrack[];
        setHistory(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Update canvas visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      if (isPlaying) {
        phase += 0.08;
        const numBars = 48;
        const barWidth = width / numBars - 2;

        for (let i = 0; i < numBars; i++) {
          const x = i * (barWidth + 2);
          // Waveform simulation with frequency modulation
          const sinVal = Math.sin(phase + i * 0.25);
          const cosVal = Math.cos(phase * 0.8 + i * 0.15);
          const normalized = (Math.abs(sinVal * 0.7 + cosVal * 0.5) + 0.15) * 0.8;
          const barHeight = Math.max(6, normalized * (height * 0.85));
          const y = height / 2 - barHeight / 2;

          // Gradient color: Amber / Rose / Blue transition
          const hue = 220 + (i / numBars) * 60;
          ctx.fillStyle = `hsl(${hue}, 85%, 65%)`;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 3);
          ctx.fill();
        }
      } else {
        // Idle calm wave
        const numBars = 48;
        const barWidth = width / numBars - 2;
        for (let i = 0; i < numBars; i++) {
          const x = i * (barWidth + 2);
          const barHeight = 4 + Math.sin(i * 0.3) * 3;
          const y = height / 2 - barHeight / 2;
          ctx.fillStyle = "rgba(138, 180, 248, 0.25)";
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 2);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const handleSelectPreset = (p: (typeof PRESETS)[0]) => {
    setPrompt(p.prompt);
    setGenre(p.genre);
    setMood(p.mood);
    setTempo(p.tempo);
  };

  const handleGenerateLyrics = async () => {
    if (!prompt.trim()) {
      setError("Please describe your track first to generate lyrics.");
      return;
    }
    setIsGeneratingLyrics(true);
    setError(null);
    try {
      const generated = await generateLyrics({
        data: {
          prompt: prompt.trim(),
          genre,
          mood,
        },
      });
      setLyrics(generated);
    } catch (err: any) {
      setError("Failed to generate lyrics. Please try again.");
    } finally {
      setIsGeneratingLyrics(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setGenerationStep("Harmonizing chords & sound architecture...");

    try {
      // 1. Call server function
      const result: GeneratedMusicResult = await generateMusicTrack({
        data: {
          prompt: prompt.trim(),
          lyrics: lyrics.trim() || undefined,
          genre,
          mood,
          tempo,
          durationSeconds: duration,
        },
      });

      setGenerationStep("Rendering stereo audio synthesis...");

      let blobUrl = "";

      if (result.audioBase64) {
        // Lyria generated audio directly
        const byteChars = atob(result.audioBase64);
        const byteNumbers = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteNumbers[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const audioBlob = new Blob([byteArray], { type: result.mimeType || "audio/wav" });
        blobUrl = URL.createObjectURL(audioBlob);
      } else {
        // Web Audio synthesized multi-track rendering
        const audioBuffer = await renderCompositionToAudioBuffer(result.composition);
        const wavBlob = audioBufferToWav(audioBuffer);
        blobUrl = URL.createObjectURL(wavBlob);
      }

      const newTrack: StoredTrack = {
        id: "track-" + Date.now(),
        title: result.title,
        genre: result.genre,
        mood: result.mood,
        bpm: result.bpm,
        key: result.key,
        description: result.description,
        date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        audioBlobUrl: blobUrl,
        durationSeconds: duration,
      };

      setActiveTrack(newTrack);
      setHistory((prev) => {
        const updated = [newTrack, ...prev.slice(0, 7)];
        try {
          // Persist metadata without full blob URL
          localStorage.setItem(
            "omni-music-history",
            JSON.stringify(
              updated.map(({ audioBlobUrl, ...rest }) => ({ ...rest, audioBlobUrl: "" })),
            ),
          );
        } catch {
          /* ignore */
        }
        return updated;
      });

      // Automatically play new track
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }, 150);
    } catch (err: unknown) {
      console.error("[Music Studio] Generation error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to synthesize music track. Please try again.",
      );
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !activeTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else if (isMuted) setIsMuted(false);
    }
  };

  const downloadActiveTrack = () => {
    if (!activeTrack) return;
    const a = document.createElement("a");
    a.href = activeTrack.audioBlobUrl;
    a.download = `${activeTrack.title.replace(/[^a-zA-Z0-9]/g, "_")}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      {/* Hidden Audio Player Element */}
      {activeTrack?.audioBlobUrl && (
        <audio
          ref={audioRef}
          src={activeTrack.audioBlobUrl}
          onTimeUpdate={() => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) setAudioDuration(audioRef.current.duration);
          }}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Main Studio Card */}
      <div className="rounded-[28px] border border-black/10 dark:border-white/10 bg-card p-6 sm:p-8 shadow-sm">
        {/* Preset Chips */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Instant Inspirations
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className="rounded-full border border-black/10 dark:border-white/10 bg-surface-1 px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Prompt Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Describe the music or sound you want to create
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Dreamy lo-fi hip hop with gentle electric piano, warm vinyl texture, and melodic bassline..."
              className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-surface-1 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
            />
          </div>
        </div>

        {/* Lyrics Input */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-foreground">
              Lyrics (Optional)
            </label>
            <button
              type="button"
              onClick={handleGenerateLyrics}
              disabled={isGeneratingLyrics || !prompt.trim()}
              className="text-xs font-bold text-primary hover:text-primary/80 transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-3 w-3" />
              {isGeneratingLyrics ? "Writing..." : "Auto-write"}
            </button>
          </div>
          <div className="relative">
            <textarea
              rows={3}
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Write your own lyrics here, or click Auto-write to generate them from your prompt..."
              className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-surface-1 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
            />
          </div>
        </div>

        {/* Controls Grid: Genre, Mood, Tempo, Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Genre */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-surface-1 p-3.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full rounded-xl bg-background border border-black/10 dark:border-white/10 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-medium"
            >
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Mood */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-surface-1 p-3.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full rounded-xl bg-background border border-black/10 dark:border-white/10 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-medium"
            >
              {MOODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Tempo BPM */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-surface-1 p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tempo
              </label>
              <span className="text-xs font-mono font-bold text-primary">{tempo} BPM</span>
            </div>
            <input
              type="range"
              min={60}
              max={160}
              step={2}
              value={tempo}
              onChange={(e) => setTempo(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg bg-background accent-primary cursor-pointer mt-2"
            />
          </div>

          {/* Duration */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-surface-1 p-3.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Duration
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[15, 30, 60].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`rounded-xl py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    duration === d
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button & Progress */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            disabled={isGenerating || !prompt.trim()}
            onClick={handleGenerate}
            className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-all duration-200 hover:brightness-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Disc className="h-4 w-4 animate-spin" />
                <span>Synthesizing Audio...</span>
              </>
            ) : (
              <>
                <Music className="h-4 w-4" />
                <span>Generate Music Track</span>
              </>
            )}
          </button>

          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-xs text-muted-foreground font-medium"
            >
              <Radio className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span>{generationStep}</span>
            </motion.div>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-2xl bg-destructive/10 border border-destructive/20 p-4 text-xs text-destructive font-medium">
            {error}
          </div>
        )}
      </div>

      {/* Interactive Music Player Section */}
      {activeTrack && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-black/10 dark:border-white/10 bg-card p-6 sm:p-8 shadow-md"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/5 dark:border-white/5">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                  {activeTrack.genre}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {activeTrack.bpm} BPM • {activeTrack.key}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
                {activeTrack.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {activeTrack.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={downloadActiveTrack}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-surface-1 px-4 py-2.5 text-xs font-bold text-foreground hover:bg-surface-2 transition-all cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .WAV</span>
              </button>
            </div>
          </div>

          {/* Waveform Canvas */}
          <div className="mt-6 rounded-2xl bg-surface-1 p-4 border border-black/5 dark:border-white/5">
            <canvas ref={canvasRef} width={800} height={90} className="w-full h-20 rounded-xl" />
          </div>

          {/* Seekbar and Timeline */}
          <div className="mt-4">
            <input
              type="range"
              min={0}
              max={audioDuration || activeTrack.durationSeconds}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 rounded-lg bg-surface-2 accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-muted-foreground mt-1.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(audioDuration || activeTrack.durationSeconds)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 translate-x-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    setCurrentTime(0);
                  }
                }}
                className="grid h-9 w-9 place-items-center rounded-full bg-surface-1 text-foreground hover:bg-surface-2 transition-all cursor-pointer shrink-0"
                title="Restart track"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                className="text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1.5 rounded-lg bg-surface-2 accent-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Lyrics Display */}
          {activeTrack.lyrics && (
            <div className="mt-8 p-6 rounded-2xl bg-surface-1/50 border border-black/5 dark:border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <Music className="h-3.5 w-3.5" />
                Lyrics
              </h4>
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {activeTrack.lyrics}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Library of Generated Tracks */}
      {history.length > 0 && (
        <div className="rounded-[28px] border border-black/10 dark:border-white/10 bg-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ListMusic className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Recent Creations
              </h4>
            </div>
            <button
              type="button"
              onClick={() => {
                setHistory([]);
                localStorage.removeItem("omni-music-history");
              }}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
            >
              Clear History
            </button>
          </div>

          <div className="divide-y divide-black/5 dark:divide-white/5">
            {history.map((t) => (
              <div
                key={t.id}
                className="py-3 flex items-center justify-between gap-4 group hover:bg-surface-1/50 rounded-xl px-2 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-1 text-primary">
                    <Music className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{t.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {t.genre} • {t.mood} • {t.bpm} BPM
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {t.audioBlobUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTrack(t);
                        setTimeout(() => {
                          if (audioRef.current) {
                            audioRef.current.currentTime = 0;
                            audioRef.current.play().catch(() => {});
                            setIsPlaying(true);
                          }
                        }, 100);
                      }}
                      className="rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground p-2 transition-colors cursor-pointer"
                      title="Play"
                    >
                      <Play className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

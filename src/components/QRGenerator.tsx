import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  Check,
  Copy,
  Download,
  Image as ImageIcon,
  Link2,
  Mail,
  Palette,
  Sparkles,
  Trash2,
  Type,
  Wifi,
} from "lucide-react";
import { CelebrationModal } from "./CelebrationModal";
import { PRESET_ICONS } from "@/lib/qr-icons";

const DOT_STYLES = ["square", "rounded", "dots", "extra-rounded", "classy", "classy-rounded"] as const;
const CORNER_SQUARE = ["square", "extra-rounded", "dot"] as const;
const CORNER_DOT = ["square", "dot"] as const;
const LOGO_SHAPES = [
  { id: "square", label: "Square", r: 0 },
  { id: "rounded", label: "Rounded", r: 0.22 },
  { id: "circle", label: "Circle", r: 0.5 },
] as const;

type ContentType = "url" | "text" | "wifi" | "email";

type Design = {
  name: string;
  fg: string;
  fg2: string;
  bg: string;
  corner: string;
  gradient: boolean;
  dots: (typeof DOT_STYLES)[number];
  cornersSquare: (typeof CORNER_SQUARE)[number];
};

const DESIGNS: Design[] = [
  { name: "Neon Dark", fg: "#8b5cf6", fg2: "#22d3ee", bg: "#0b0b12", corner: "#22d3ee", gradient: true, dots: "rounded", cornersSquare: "extra-rounded" },
  { name: "Minimal Pure", fg: "#111827", fg2: "#111827", bg: "#ffffff", corner: "#111827", gradient: false, dots: "square", cornersSquare: "square" },
  { name: "Corporate Navy", fg: "#1e3a8a", fg2: "#1e3a8a", bg: "#f8fafc", corner: "#0ea5e9", gradient: false, dots: "classy-rounded", cornersSquare: "extra-rounded" },
  { name: "Sunset Gradient", fg: "#f97316", fg2: "#db2777", bg: "#fff7ed", corner: "#db2777", gradient: true, dots: "extra-rounded", cornersSquare: "dot" },
  { name: "Forest Mint", fg: "#065f46", fg2: "#34d399", bg: "#ecfdf5", corner: "#065f46", gradient: true, dots: "dots", cornersSquare: "dot" },
];

const D0 = DESIGNS[0]!;

const CONTENT_TABS: { id: ContentType; label: string; icon: typeof Link2 }[] = [
  { id: "url", label: "URL", icon: Link2 },
  { id: "text", label: "Text", icon: Type },
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "email", label: "Email", icon: Mail },
];

async function roundImage(src: string, radiusRatio: number): Promise<string> {
  if (radiusRatio === 0) return src;
  const img = new Image();
  img.crossOrigin = "anonymous";
  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error("load"));
    img.src = src;
  });
  const size = Math.max(img.width, img.height, 128);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return src;
  const r = size * radiusRatio;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.arcTo(size, 0, size, size, r);
  ctx.arcTo(size, size, 0, size, r);
  ctx.arcTo(0, size, 0, 0, r);
  ctx.arcTo(0, 0, size, 0, r);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  ctx.drawImage(img, 0, 0, size, size);
  return canvas.toDataURL("image/png");
}

export function QRGenerator() {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const qr = useRef<any>(null);

  const [type, setType] = useState<ContentType>("url");
  const [url, setUrl] = useState("https://lovable.dev");
  const [text, setText] = useState("Hello from QR Master");
  const [wifi, setWifi] = useState({ ssid: "", password: "", encryption: "WPA" });
  const [email, setEmail] = useState({ to: "", subject: "", body: "" });

  const [fg, setFg] = useState(D0.fg);
  const [fg2, setFg2] = useState(D0.fg2);
  const [bg, setBg] = useState(D0.bg);
  const [corner, setCorner] = useState(D0.corner);
  const [gradient, setGradient] = useState(true);
  const [dots, setDots] = useState<(typeof DOT_STYLES)[number]>("rounded");
  const [cornersSquare, setCornersSquare] = useState<(typeof CORNER_SQUARE)[number]>("extra-rounded");
  const [cornersDot, setCornersDot] = useState<(typeof CORNER_DOT)[number]>("dot");

  const [logo, setLogo] = useState<string | null>(null);
  const [logoShape, setLogoShape] = useState<(typeof LOGO_SHAPES)[number]["id"]>("rounded");
  const [logoScale, setLogoScale] = useState(0.2);
  const [logoMargin, setLogoMargin] = useState(6);
  const [processedLogo, setProcessedLogo] = useState<string | undefined>(undefined);

  const [copied, setCopied] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const data = useMemo(() => {
    if (type === "url") return url || " ";
    if (type === "text") return text || " ";
    if (type === "wifi")
      return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;` || " ";
    return `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
  }, [type, url, text, wifi, email]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!logo) {
        setProcessedLogo(undefined);
        return;
      }
      const shape = LOGO_SHAPES.find((s) => s.id === logoShape)!;
      try {
        const out = await roundImage(logo, shape.r);
        if (!cancelled) setProcessedLogo(out);
      } catch {
        if (!cancelled) setProcessedLogo(logo);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [logo, logoShape]);

  const options = useMemo(
    () => ({
      width: 300,
      height: 300,
      type: "canvas" as const,
      data,
      margin: 12,
      qrOptions: { errorCorrectionLevel: "H" as const },
      image: processedLogo ?? "",
      imageOptions: {
        crossOrigin: "anonymous" as const,
        imageSize: logoScale * 2,
        margin: logoMargin,
        hideBackgroundDots: true,
      },
      dotsOptions: gradient
        ? {
            type: dots,
            gradient: {
              type: "linear" as const,
              rotation: Math.PI / 4,
              colorStops: [
                { offset: 0, color: fg },
                { offset: 1, color: fg2 },
              ],
            },
          }
        : { type: dots, color: fg },
      backgroundOptions: { color: bg },
      cornersSquareOptions: { type: cornersSquare, color: corner },
      cornersDotOptions: { type: cornersDot, color: corner },
    }),
    [data, processedLogo, logoScale, logoMargin, gradient, dots, fg, fg2, bg, cornersSquare, cornersDot, corner],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: QRCodeStyling } = await import("qr-code-styling");
      if (cancelled) return;
      if (!qr.current) {
        qr.current = new QRCodeStyling(options);
        if (ref.current) {
          ref.current.innerHTML = "";
          qr.current.append(ref.current);
        }
      } else {
        qr.current.update(options);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [options]);

  const celebrateOnce = useCallback(() => {
    if (localStorage.getItem("qrm-created")) return;
    localStorage.setItem("qrm-created", "1");
    confetti({ particleCount: 160, spread: 90, origin: { y: 0.7 } });
    setCelebrate(true);
  }, []);

  const download = async (extension: "png" | "svg") => {
    if (!qr.current) return;
    qr.current.update({ width: 1024, height: 1024, type: extension === "svg" ? "svg" : "canvas" });
    await qr.current.download({ name: "qr-master", extension });
    qr.current.update({ ...options });
    if (ref.current) {
      ref.current.innerHTML = "";
      qr.current.append(ref.current);
    }
    celebrateOnce();
  };

  const copyImage = async () => {
    if (!qr.current) return;
    try {
      const blob: Blob = await qr.current.getRawData("png");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      celebrateOnce();
    } catch {
      await navigator.clipboard.writeText(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const applyDesign = (d: Design) => {
    setFg(d.fg);
    setFg2(d.fg2);
    setBg(d.bg);
    setCorner(d.corner);
    setGradient(d.gradient);
    setDots(d.dots);
    setCornersSquare(d.cornersSquare);
  };

  const onUpload = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      {/* Controls */}
      <div className="space-y-5">
        <Card title="Content" icon={<Type className="h-4 w-4" />}>
          <div className="grid grid-cols-4 gap-1 rounded-xl border border-border bg-secondary/60 p-1">
            {CONTENT_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold transition ${
                  type === t.id
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {type === "url" && (
              <Field label="Website URL">
                <Input value={url} onChange={setUrl} placeholder="https://example.com" />
              </Field>
            )}
            {type === "text" && (
              <Field label="Plain text">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-input bg-secondary/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                />
              </Field>
            )}
            {type === "wifi" && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Network name (SSID)">
                  <Input value={wifi.ssid} onChange={(v) => setWifi({ ...wifi, ssid: v })} placeholder="MyNetwork" />
                </Field>
                <Field label="Password">
                  <Input value={wifi.password} onChange={(v) => setWifi({ ...wifi, password: v })} placeholder="••••••" />
                </Field>
                <Field label="Encryption">
                  <Select
                    value={wifi.encryption}
                    onChange={(v) => setWifi({ ...wifi, encryption: v })}
                    options={["WPA", "WEP", "nopass"]}
                  />
                </Field>
              </div>
            )}
            {type === "email" && (
              <div className="space-y-3">
                <Field label="To">
                  <Input value={email.to} onChange={(v) => setEmail({ ...email, to: v })} placeholder="hi@example.com" />
                </Field>
                <Field label="Subject">
                  <Input value={email.subject} onChange={(v) => setEmail({ ...email, subject: v })} placeholder="Hello" />
                </Field>
                <Field label="Message">
                  <Input value={email.body} onChange={(v) => setEmail({ ...email, body: v })} placeholder="Message body" />
                </Field>
              </div>
            )}
          </div>
        </Card>

        <Card title="Design presets" icon={<Sparkles className="h-4 w-4" />}>
          <div className="flex flex-wrap gap-2">
            {DESIGNS.map((d) => (
              <button
                key={d.name}
                onClick={() => applyDesign(d)}
                className="group flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary hover:shadow-md active:scale-95"
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-border"
                  style={{ background: `linear-gradient(135deg, ${d.fg}, ${d.fg2})` }}
                />
                {d.name}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Shapes & colors" icon={<Palette className="h-4 w-4" />}>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Dot style">
              <Select value={dots} onChange={(v) => setDots(v as typeof dots)} options={[...DOT_STYLES]} />
            </Field>
            <Field label="Corner frame">
              <Select
                value={cornersSquare}
                onChange={(v) => setCornersSquare(v as typeof cornersSquare)}
                options={[...CORNER_SQUARE]}
              />
            </Field>
            <Field label="Corner eye">
              <Select value={cornersDot} onChange={(v) => setCornersDot(v as typeof cornersDot)} options={[...CORNER_DOT]} />
            </Field>
          </div>

          <label className="mt-4 flex items-center justify-between rounded-xl border border-border bg-secondary/60 px-4 py-3">
            <span className="text-sm font-medium text-foreground">Gradient foreground</span>
            <input
              type="checkbox"
              checked={gradient}
              onChange={(e) => setGradient(e.target.checked)}
              className="h-4 w-8 cursor-pointer appearance-none rounded-full bg-muted transition checked:bg-primary"
            />
          </label>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ColorField label={gradient ? "Gradient start" : "Foreground"} value={fg} onChange={setFg} />
            {gradient && <ColorField label="Gradient end" value={fg2} onChange={setFg2} />}
            <ColorField label="Background" value={bg} onChange={setBg} />
            <ColorField label="Corner accent" value={corner} onChange={setCorner} />
          </div>
        </Card>

        <Card title="Center logo" icon={<ImageIcon className="h-4 w-4" />}>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_ICONS.map((i) => (
              <button
                key={i.id}
                onClick={() => setLogo(i.src)}
                title={i.label}
                className={`grid h-11 w-11 place-items-center rounded-xl border bg-secondary/60 transition hover:border-primary active:scale-95 ${
                  logo === i.src ? "border-primary ring-2 ring-primary/40" : "border-border"
                }`}
              >
                <img src={i.src} alt={i.label} className="h-6 w-6 rounded" />
              </button>
            ))}
            <label className="cursor-pointer rounded-xl border border-dashed border-border bg-secondary/60 px-4 py-3 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-foreground">
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onUpload(e.target.files?.[0])}
              />
            </label>
            {logo && (
              <button
                onClick={() => setLogo(null)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-secondary/60 text-muted-foreground transition hover:border-destructive hover:text-destructive"
                title="Remove logo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label={`Logo size — ${Math.round(logoScale * 100)}%`}>
              <input
                type="range"
                min={10}
                max={30}
                value={Math.round(logoScale * 100)}
                onChange={(e) => setLogoScale(Number(e.target.value) / 100)}
                className="w-full accent-[var(--primary)]"
              />
            </Field>
            <Field label={`Logo padding — ${logoMargin}px`}>
              <input
                type="range"
                min={0}
                max={20}
                value={logoMargin}
                onChange={(e) => setLogoMargin(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </Field>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl border border-border bg-secondary/60 p-1">
            {LOGO_SHAPES.map((s) => (
              <button
                key={s.id}
                onClick={() => setLogoShape(s.id)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  logoShape === s.id
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Preview */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-xl backdrop-blur-xl">
          <div className="flex justify-center">
            <div ref={ref} className="overflow-hidden rounded-2xl" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => download("png")}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_var(--primary)] transition hover:brightness-110 active:scale-[0.98]"
            >
              <Download className="h-4 w-4" /> PNG
            </button>
            <button
              onClick={() => download("svg")}
              className="flex items-center justify-center gap-2 rounded-2xl border border-input bg-secondary/70 px-4 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary active:scale-[0.98]"
            >
              <Download className="h-4 w-4" /> SVG
            </button>
          </div>
          <button
            onClick={copyImage}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-input bg-secondary/70 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary active:scale-[0.98]"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
          <p className="mt-3 break-all text-center text-xs text-muted-foreground">{data}</p>
        </div>
      </div>

      <CelebrationModal open={celebrate} onClose={() => setCelebrate(false)} title="First Code Created!" />
    </div>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card/70 p-5 shadow-lg backdrop-blur-xl transition">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 space-y-2">
      <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-input bg-secondary/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-input bg-secondary/60 px-4 py-3 text-sm capitalize text-foreground outline-none transition focus:border-primary"
    >
      {options.map((o) => (
        <option key={o} value={o} className="capitalize">
          {o.replace(/-/g, " ")}
        </option>
      ))}
    </select>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2 rounded-xl border border-input bg-secondary/60 px-3 py-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded-md border-0 bg-transparent p-0"
        />
        <span className="truncate text-xs text-muted-foreground">{value.toUpperCase()}</span>
      </div>
    </Field>
  );
}

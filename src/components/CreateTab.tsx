import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { CelebrationModal } from "./CelebrationModal";

const DOT_STYLES = ["rounded", "dots", "classy", "classy-rounded", "square", "extra-rounded"] as const;

export function CreateTab() {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const qr = useRef<any>(null);
  const [data, setData] = useState("https://lovable.dev");
  const [fg, setFg] = useState("#7c5cff");
  const [bg, setBg] = useState("#12121a");
  const [dots, setDots] = useState<string>("rounded");
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: QRCodeStyling } = await import("qr-code-styling");
      if (cancelled) return;
      if (!qr.current) {
        qr.current = new QRCodeStyling({
          width: 260,
          height: 260,
          type: "canvas",
          data: data || " ",
          dotsOptions: { color: fg, type: dots as "rounded" },
          backgroundOptions: { color: bg },
          cornersSquareOptions: { color: fg },
        });
        if (ref.current) {
          ref.current.innerHTML = "";
          qr.current.append(ref.current);
        }
      } else {
        qr.current.update({
          data: data || " ",
          dotsOptions: { color: fg, type: dots as "rounded" },
          backgroundOptions: { color: bg },
          cornersSquareOptions: { color: fg },
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [data, fg, bg, dots]);

  const download = async () => {
    if (!qr.current) return;
    qr.current.update({ width: 1024, height: 1024 });
    await qr.current.download({ name: "qr-master", extension: "png" });
    qr.current.update({ width: 260, height: 260 });
    if (!localStorage.getItem("qrm-created")) {
      localStorage.setItem("qrm-created", "1");
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.7 } });
      setCelebrate(true);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-lg">
        <div className="flex justify-center">
          <div ref={ref} className="overflow-hidden rounded-2xl" />
        </div>
      </div>

      <div className="space-y-4 rounded-3xl border border-border bg-card p-5">
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Text or URL
          </label>
          <input
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-xl border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ColorField label="Foreground" value={fg} onChange={setFg} />
          <ColorField label="Background" value={bg} onChange={setBg} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Dot style
          </label>
          <select
            value={dots}
            onChange={(e) => setDots(e.target.value)}
            className="w-full rounded-xl border border-input bg-secondary px-4 py-3 text-sm capitalize text-foreground outline-none focus:border-primary"
          >
            {DOT_STYLES.map((d) => (
              <option key={d} value={d} className="capitalize">
                {d.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={download}
        className="w-full rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_var(--primary)] transition active:scale-[0.98]"
      >
        Download High-Res PNG
      </button>

      <CelebrationModal
        open={celebrate}
        onClose={() => setCelebrate(false)}
        title="First Code Created!"
      />
    </div>
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
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-input bg-secondary px-3 py-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded-md border-0 bg-transparent p-0"
        />
        <span className="text-xs text-muted-foreground">{value.toUpperCase()}</span>
      </div>
    </div>
  );
}

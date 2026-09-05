import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Search, SearchX, X } from "lucide-react";
import { guides, searchGuides } from "@/data/guides";
import { PlushCard, SectionHeading } from "@/components/omni/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Tech Guides — Fix Everyday Computer Problems" },
      {
        name: "description",
        content:
          "Short, practical guides for slow PCs, overheating laptops, Wi-Fi trouble, backups and staying safe online — plain language, no jargon.",
      },
      { property: "og:title", content: "Tech Guides — Fix Everyday Computer Problems" },
      {
        property: "og:description",
        content: "Practical, jargon-free guides for the computer problems people actually hit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidesPage,
});

const CATEGORIES = ["All", ...Array.from(new Set(guides.map((g) => g.category)))];

function GuidesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const results = useMemo(() => {
    const matched = searchGuides(query);
    return category === "All" ? matched : matched.filter((g) => g.category === category);
  }, [query, category]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-28 sm:px-6 sm:pt-32">
      <SectionHeading
        eyebrow="Guides"
        title="Fix it yourself, confidently"
        description="Short, practical walkthroughs for everyday computer problems — no jargon, no fluff."
      />

      <div className="mt-6 max-w-xl">
        <div className="plush flex items-center gap-3 rounded-full px-5 py-3">
          <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides — try Wi-Fi, backup, slow…"
            aria-label="Search guides"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[13px] font-semibold transition-all duration-200 active:scale-95",
              category === c
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-plush)]"
                : "bg-surface-2/80 text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {results.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((guide, i) => (
            <PlushCard key={guide.slug} delay={Math.min(i, 8) * 0.06}>
              <Link
                to="/guides/$slug"
                params={{ slug: guide.slug }}
                className="flex h-full flex-col"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground">
                  <guide.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold leading-snug">{guide.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{guide.excerpt}</p>
                <span className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted-foreground">
                  <span className="rounded-full bg-surface-2 px-2.5 py-1">{guide.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {guide.minutes} min read
                  </span>
                </span>
              </Link>
            </PlushCard>
          ))}
        </div>
      ) : (
        <div className="plush mx-auto mt-12 max-w-md p-10 text-center">
          <SearchX className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-bold">No guides match “{query}”</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a broader word — or ask the assistant for a personal answer.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-plush)] transition active:scale-95"
          >
            Show all guides
          </button>
        </div>
      )}
    </main>
  );
}

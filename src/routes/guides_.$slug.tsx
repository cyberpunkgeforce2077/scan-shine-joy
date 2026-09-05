import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Lightbulb } from "lucide-react";
import { getGuide, guides, type Guide } from "@/data/guides";

export const Route = createFileRoute("/guides_/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return guide;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — OmniSuite Guides` : "Guide — OmniSuite" },
      {
        name: "description",
        content: loaderData?.excerpt ?? "A practical, jargon-free tech guide from OmniSuite.",
      },
      {
        property: "og:title",
        content: loaderData ? `${loaderData.title} — OmniSuite Guides` : "Guide — OmniSuite",
      },
      {
        property: "og:description",
        content: loaderData?.excerpt ?? "A practical, jargon-free tech guide from OmniSuite.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  const guide = Route.useLoaderData() as Guide;
  const Icon = guide.icon;
  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-32 pt-28 sm:px-6 sm:pt-32">
      <Link
        to="/guides"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All guides
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground">
            <Icon className="h-6 w-6" />
          </span>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
            <span className="rounded-full bg-surface-2 px-3 py-1.5">{guide.category}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5">
              <Clock className="h-3.5 w-3.5" />
              {guide.minutes} min read
            </span>
          </div>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-3 text-base text-muted-foreground">{guide.excerpt}</p>
      </header>

      <div className="plush mt-8 space-y-8 p-6 sm:p-9">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold tracking-tight">{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            {section.tips && (
              <ul className="mt-4 space-y-2 rounded-2xl bg-surface-2/70 p-4">
                {section.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-foreground">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <h2 className="mt-14 text-lg font-bold">Keep reading</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {related.map((g) => (
          <Link
            key={g.slug}
            to="/guides/$slug"
            params={{ slug: g.slug }}
            className="plush flex flex-col p-5 transition hover:-translate-y-1"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-container text-primary-container-foreground">
              <g.icon className="h-4.5 w-4.5" />
            </span>
            <h3 className="mt-3 text-sm font-bold leading-snug">{g.title}</h3>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              Read <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { MediaDownloader } from "@/components/omni/MediaDownloader";
import { PageShell } from "@/components/omni/primitives";

export const Route = createFileRoute("/downloader")({
  head: () => ({
    meta: [
      { title: "Media Downloader — YouTube, Instagram & TikTok" },
      {
        name: "description",
        content:
          "Paste a YouTube, Instagram or TikTok link, pick 480p, 720p or 1080p and download the video for free.",
      },
      { property: "og:title", content: "Media Downloader — YouTube, Instagram & TikTok" },
      {
        property: "og:description",
        content: "Free link downloader with 480p, 720p and 1080p quality options.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DownloaderPage,
});

function DownloaderPage() {
  return (
    <PageShell
      eyebrow="Downloader"
      title="Grab any video from a link"
      description="Paste a YouTube, Instagram or TikTok link, choose your quality and download it free."
    >
      <MediaDownloader />
    </PageShell>
  );
}

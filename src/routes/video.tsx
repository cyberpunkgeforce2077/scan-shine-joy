import { createFileRoute } from "@tanstack/react-router";
import { VideoStudio } from "@/components/omni/VideoStudio";

export const Route = createFileRoute("/video")({
  component: VideoStudio,
});

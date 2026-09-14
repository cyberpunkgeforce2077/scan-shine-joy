import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateVideo } from "@/lib/video.functions";
import { toast } from "sonner";
import { Loader2, Video, Download, Sparkles } from "lucide-react";
import { OnlineRequiredBanner } from "./OnlineRequiredBanner";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export function VideoStudio() {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [duration, setDuration] = useState<"5s" | "10s">("5s");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const isOnline = useNetworkStatus();

  async function handleGenerate() {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first.");
      return;
    }
    setIsGenerating(true);
    setVideoUrl(null);
    try {
      const result = await generateVideo({ data: { prompt, aspectRatio, duration } });
      const url = `data:${result.mimeType};base64,${result.videoBase64}`;
      setVideoUrl(url);
      toast.success("Video generated successfully!");
    } catch (e: any) {
      console.error("Video generation failed:", e);
      toast.error(e.message || "Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleDownload() {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `generated-video-${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="flex flex-col h-full bg-background relative z-0">
      <OnlineRequiredBanner />
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight">Text to Video</h1>
              <p className="text-muted-foreground mt-1">Generate high-quality videos using Gemini Omni Flash.</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={aspectRatio} onValueChange={(val: any) => setAspectRatio(val)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Aspect Ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                  <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={duration} onValueChange={(val: any) => setDuration(val)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5s">5 Seconds</SelectItem>
                  <SelectItem value="10s">10 Seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            <div className="space-y-4">
              <div className="relative">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the video you want to generate (e.g., 'A hyper-realistic close-up of a panda eating bamboo in a lush forest')"
                  className="min-h-[200px] text-base resize-none focus-visible:ring-1 bg-muted/30"
                  disabled={isGenerating}
                />
                <div className="absolute bottom-4 right-4">
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating || !prompt.trim() || !isOnline}
                    className="gap-2"
                  >
                    {isGenerating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    {isGenerating ? "Generating..." : "Generate Video"}
                  </Button>
                </div>
              </div>

              {isGenerating && (
                <div className="rounded-xl border bg-card p-8 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Synthesizing Video...</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                      This process can take up to a minute depending on the duration and complexity of your prompt.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div 
                className={`rounded-xl overflow-hidden border bg-black/5 flex items-center justify-center relative shadow-sm ${aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16] max-h-[600px] mx-auto'}`}
              >
                {videoUrl ? (
                  <video 
                    src={videoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <div className="text-center p-6 text-muted-foreground/60 flex flex-col items-center gap-2">
                    <Video className="h-10 w-10 mb-2 opacity-50" />
                    <p className="font-medium">No Video Generated</p>
                    <p className="text-sm">Your video will appear here.</p>
                  </div>
                )}
              </div>

              {videoUrl && (
                <div className="flex justify-end animate-in fade-in">
                  <Button variant="outline" className="gap-2" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                    Save Video
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

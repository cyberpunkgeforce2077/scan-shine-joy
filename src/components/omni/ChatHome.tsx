import { useEffect, useRef, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { Check, Copy, Mic, MicOff, Plus, ChevronDown, SendHorizonal, Bot } from "lucide-react";
import { toast } from "sonner";
import { askAssistant, askTitle } from "@/lib/ask.functions";
import { FormattedText } from "@/components/omni/FormattedText";
import { ConversationSearchModal } from "@/components/omni/ConversationSearchModal";
import { OnlineRequiredBanner } from "@/components/omni/OnlineRequiredBanner";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import {
  getConversation,
  saveConversation,
  deleteConversation,
  createNewConversation,
  getActiveConversationId,
  setActiveConversationId,
  syncConversationsWithSupabase,
  type Conversation,
  type Msg,
} from "@/lib/conversationStore";
import { cn } from "@/lib/utils";

export function ChatHome({ resetKey = 0 }: { resetKey?: number }) {
  const { isOnline, checkConnection } = useNetworkStatus();
  const ask = useServerFn(askAssistant);
  const getTitle = useServerFn(askTitle);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const recognitionRef = useRef<unknown>(null);

  useEffect(() => {
    // Fire and forget sync
    syncConversationsWithSupabase();

    const activeId = getActiveConversationId();
    if (activeId) {
      const found = getConversation(activeId);
      if (found) {
        setActiveConvId(found.id);
        setMessages(found.messages);
      }
    }
  }, []);

  useEffect(() => {
    const handleConvChanged = (e: Event) => {
      const custom = e as CustomEvent<{ id: string | null }>;
      const targetId = custom.detail?.id;
      if (targetId) {
        const found = getConversation(targetId);
        if (found) {
          setActiveConvId(found.id);
          setMessages(found.messages);
        }
      } else {
        setActiveConvId(null);
        setMessages([]);
      }
    };
    const handleOpenSearch = () => setSearchOpen(true);
    const handleNewChat = () => {
      setActiveConvId(null);
      setMessages([]);
      setActiveConversationId(null);
      inputRef.current?.focus({ preventScroll: true });
    };

    window.addEventListener("omni-conversation-changed", handleConvChanged);
    window.addEventListener("omni-open-search", handleOpenSearch);
    window.addEventListener("omni-new-chat", handleNewChat);

    return () => {
      window.removeEventListener("omni-conversation-changed", handleConvChanged);
      window.removeEventListener("omni-open-search", handleOpenSearch);
      window.removeEventListener("omni-new-chat", handleNewChat);
    };
  }, []);

  useEffect(() => {
    if (resetKey === 0) return;
    setActiveConvId(null);
    setMessages([]);
    setActiveConversationId(null);
    inputRef.current?.focus({ preventScroll: true });
  }, [resetKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectConversation = (conv: Conversation) => {
    setActiveConvId(conv.id);
    setMessages(conv.messages);
    setActiveConversationId(conv.id);
    setSearchOpen(false);
  };

  const toggleVoice = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const win = window as unknown as {
      SpeechRecognition?: new () => Record<string, unknown>;
      webkitSpeechRecognition?: new () => Record<string, unknown>;
    };
    const Ctor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
    if (!Ctor) {
      toast.error("Voice input isn't supported in this browser.");
      return;
    }
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    const finalText = input;
    rec.onresult = (e: {
      resultIndex: number;
      results: { [key: number]: [{ transcript: string }] }[] & { length: number };
    }) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        interim += e.results[i]?.[0]?.transcript ?? "";
      }
      setInput(finalText + interim);
    };
    rec.onerror = () => {
      setListening(false);
    };
    rec.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    recognitionRef.current = rec;
    setListening(true);
    (rec.start as () => void)();
  }, [listening, input]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    if (!isOnline) {
      toast.error(
        "Vlad Bot requires an active internet connection. Please check your network or use offline tools.",
      );
      return;
    }

    const userMsg: Msg = {
      role: "user",
      content: question,
      timestamp: Date.now(),
    };

    let targetConvId = activeConvId;
    let baseMessages = messages;

    if (!targetConvId) {
      const newConv = createNewConversation(question);
      targetConvId = newConv.id;
      setActiveConvId(targetConvId);
      setActiveConversationId(targetConvId);
      baseMessages = [];
    }

    const next = [...baseMessages, userMsg];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const { reply } = await ask({
        data: {
          messages: next.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
      });

      const assistantMsg: Msg = {
        role: "assistant",
        content: reply,
        timestamp: Date.now(),
      };
      const finalMessages = [...next, assistantMsg];
      setMessages(finalMessages);

      const existingConv = getConversation(targetConvId);
      if (existingConv) {
        const titleToSave = existingConv.title;

        // If it's the first message we ever sent in this chat, generate a title in the background
        if (baseMessages.length === 0) {
          getTitle({ data: { prompt: question } })
            .then((res) => {
              const conv = getConversation(targetConvId!);
              if (conv) {
                saveConversation({ ...conv, title: res.title });
              }
            })
            .catch(() => {});
        }

        saveConversation({
          ...existingConv,
          messages: finalMessages,
          title: titleToSave,
        });
      }
    } catch (err) {
      toast.error("Error generating response.");
      setMessages(next);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  const empty = messages.length === 0;

  return (
    <main className="flex min-h-screen w-full flex-col pt-12 pb-32">
      {!isOnline && (
        <div className="mx-auto w-full max-w-2xl px-4 pt-2 pb-4">
          <OnlineRequiredBanner
            featureName="Vlad Bot"
            offlineAlternative="Your offline chat history is still available, and you can freely use on-device tools (QR Code Studio, Document Scanner, Local OCR)."
            onRetry={() => void checkConnection()}
          />
        </div>
      )}

      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center -mt-20">
          {/* Main Greeting */}
          <div className="flex flex-col items-center gap-2 mb-10">
            <h1 className="text-center text-4xl sm:text-5xl font-medium tracking-tight text-[#e3e3e3]">
              What can I help with today?
            </h1>
            <span className="text-[#8ab4f8] font-medium text-lg tracking-wide">Vlad Bot</span>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-4xl px-4 flex-1 space-y-8 pb-32 pt-8">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}
            >
              {m.role === "user" ? (
                <div className="max-w-[85%] rounded-3xl rounded-tr-md bg-[#282a2c] px-5 py-3.5 text-[15px] leading-relaxed text-[#e3e3e3]">
                  {m.content}
                </div>
              ) : (
                <div className="w-full text-[15px] leading-relaxed text-[#e3e3e3]">
                  <div className="flex items-start gap-4">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-[#1e1f20] text-[#8e8e8e] shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex-1 overflow-x-hidden min-w-0">
                      <FormattedText content={m.content} />
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => {
                            void navigator.clipboard?.writeText(m.content);
                            setCopiedIndex(i);
                            window.setTimeout(() => setCopiedIndex(null), 1600);
                          }}
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-[#282a2c] text-[#c4c7c5] transition"
                        >
                          {copiedIndex === i ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {busy && (
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#D7A2F6] to-[#8FA2ED] animate-spin shrink-0" />
              <div className="h-4 w-32 mt-2 rounded bg-[#282a2c] animate-pulse" />
            </div>
          )}
          <div ref={endRef} />
        </div>
      )}

      {/* Floating Input for chat (Always at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#000000] via-[#000000] to-transparent pb-6 pt-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="mx-auto w-full max-w-[800px] px-6"
        >
          <div className="flex min-h-[56px] w-full items-end gap-3 rounded-[28px] bg-[#1e1f20] p-2 shadow-[0_0_20px_rgba(215,162,246,0.15)] ring-1 ring-white/10 transition-all duration-300 focus-within:bg-[#282a2c] focus-within:shadow-[0_0_30px_rgba(215,162,246,0.25)] focus-within:ring-[#D7A2F6]/50">
            <label className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-[#c4c7c5] hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-[0.97] mb-0.5">
              <input type="file" className="hidden" multiple accept="*/*" />
              <Plus className="h-6 w-6" />
            </label>

            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              rows={1}
              placeholder="Ask anything..."
              className="flex-1 max-h-32 resize-none bg-transparent py-3.5 text-[#e3e3e3] placeholder-[#c4c7c5] outline-none text-[17px] leading-tight"
            />

            <div className="flex items-center gap-1 shrink-0 mb-0.5">
              {input.trim() ? (
                <button
                  type="submit"
                  disabled={busy}
                  aria-label="Send query"
                  className="grid h-12 w-12 place-items-center rounded-full bg-[#1e1f20] hover:bg-white/10 text-[#c4c7c5] transition-all duration-200 cursor-pointer active:scale-[0.97]"
                >
                  <SendHorizonal className="h-6 w-6" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={toggleVoice}
                  className="grid h-12 w-12 place-items-center rounded-full text-[#c4c7c5] hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-[0.97]"
                >
                  {listening ? (
                    <MicOff className="h-6 w-6 text-red-400" />
                  ) : (
                    <Mic className="h-6 w-6" />
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <ConversationSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectConversation={handleSelectConversation}
        onNewChat={() => {
          setActiveConvId(null);
          setMessages([]);
          setActiveConversationId(null);
          setSearchOpen(false);
        }}
      />
    </main>
  );
}

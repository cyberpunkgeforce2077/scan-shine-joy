import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, MessageSquare, Plus, Search, Trash2, X, Sparkles, ArrowRight } from "lucide-react";
import {
  listConversations,
  searchConversations,
  deleteConversation,
  setActiveConversationId,
  createNewConversation,
  type Conversation,
  type SearchResult,
} from "@/lib/conversationStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectConversation?: (conversation: Conversation) => void;
  onNewChat?: () => void;
}

export function ConversationSearchModal({ open, onClose, onSelectConversation, onNewChat }: Props) {
  const [query, setQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const refreshList = () => {
    setConversations(listConversations());
  };

  useEffect(() => {
    if (open) {
      refreshList();
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    const handleUpdate = () => refreshList();
    window.addEventListener("omni-conversations-updated", handleUpdate);
    return () => window.removeEventListener("omni-conversations-updated", handleUpdate);
  }, []);

  const searchResults: SearchResult[] = useMemo(() => {
    return searchConversations(query, conversations);
  }, [query, conversations]);

  const handleSelect = (conv: Conversation) => {
    setActiveConversationId(conv.id);
    onSelectConversation?.(conv);
    onClose();
  };

  const handleDelete = (e: React.MouseEvent, convId: string) => {
    e.stopPropagation();
    deleteConversation(convId);
    toast.success("Conversation deleted");
    refreshList();
  };

  const handleCreateNew = () => {
    const newConv = createNewConversation();
    onNewChat?.();
    onSelectConversation?.(newConv);
    onClose();
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-conversations-title"
      className="fixed inset-0 z-[70] flex items-start justify-center p-3 pt-16 sm:p-6 sm:pt-20"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative flex max-h-[80vh] w-full max-w-2xl flex-col rounded-3xl border border-border/90 bg-card/95 shadow-[var(--shadow-plush-lg)] backdrop-blur-2xl">
        {/* Header with Search Input */}
        <div className="flex items-center gap-3 border-b border-border/70 p-3 sm:p-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-container text-primary shadow-xs">
            <Search className="h-4 w-4" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "Enter" && searchResults[0]) {
                handleSelect(searchResults[0].conversation);
              }
            }}
            placeholder="Search past AI conversations, topics, or code…"
            className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-xl text-muted-foreground hover:bg-surface-2 hover:text-foreground active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-surface-1/50 px-4 py-2 text-xs">
          <span className="font-semibold text-muted-foreground">
            {query
              ? `${searchResults.length} match${searchResults.length === 1 ? "" : "es"}`
              : `${conversations.length} saved conversation${conversations.length === 1 ? "" : "s"}`}
          </span>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 rounded-lg font-bold text-primary hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Topic</span>
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 sm:p-3">
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-2 text-muted-foreground">
                <MessageSquare className="h-6 w-6" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">
                {query ? "No matching conversations found" : "No past conversations yet"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                {query
                  ? "Try searching for a different keyword or prompt."
                  : "Start chatting to save your consultations automatically."}
              </p>
              <button
                onClick={handleCreateNew}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:brightness-105"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Start fresh conversation</span>
              </button>
            </div>
          ) : (
            searchResults.map(({ conversation: conv, matchedSnippet }) => (
              <div
                key={conv.id}
                onClick={() => handleSelect(conv)}
                className="group flex cursor-pointer items-start justify-between gap-3 rounded-2xl border border-transparent p-3 transition hover:border-primary/30 hover:bg-surface-1"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-surface-2 text-muted-foreground group-hover:bg-primary-container group-hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs font-bold text-foreground sm:text-sm">
                        {conv.title}
                      </span>
                      <span className="shrink-0 rounded-md bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {conv.messages.length} msg{conv.messages.length === 1 ? "" : "s"}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {matchedSnippet}
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(conv.updatedAt)}
                      </span>
                      <span className="text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                        Open <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Delete conversation"
                  onClick={(e) => handleDelete(e, conv.id)}
                  title="Delete conversation"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground opacity-60 hover:bg-destructive/10 hover:text-destructive hover:opacity-100 transition active:scale-95"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer Tip */}
        <div className="flex items-center justify-between border-t border-border/70 px-4 py-2.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber" />
            <span>Encrypted in-browser storage</span>
          </span>
          <span className="font-mono text-[10px]">ESC to close</span>
        </div>
      </div>
    </div>
  );
}

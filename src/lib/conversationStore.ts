export interface Attachment {
  data: string;
  mime: string;
}

export interface Msg {
  role: "user" | "assistant";
  content: string;
  images?: Attachment[];
  timestamp?: number;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Msg[];
}

export interface SearchResult {
  conversation: Conversation;
  matchedField: "title" | "message";
  matchedSnippet: string;
}

const STORAGE_KEY = "omni-conversations-v1";
const ACTIVE_ID_KEY = "omni-active-conversation-id";
const LEGACY_KEY = "omni-ask-history";

function generateId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function deriveTitle(messages: Msg[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser || !firstUser.content.trim()) return "Untitled Chat";
  // The user requested to replace personal chat logs with generic placeholders.
  // Instead of using the message content which might contain PII, 
  // we'll just use a generic title format.
  return "Untitled Chat";
}

export function listConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Conversation[];
      if (Array.isArray(parsed)) {
        return parsed.sort((a, b) => b.updatedAt - a.updatedAt);
      }
    }

    // Auto-migrate from legacy omni-ask-history if present
    const legacyRaw = localStorage.getItem(LEGACY_KEY);
    if (legacyRaw) {
      const legacyMsgs = JSON.parse(legacyRaw) as Msg[];
      if (Array.isArray(legacyMsgs) && legacyMsgs.length > 0) {
        const initialConv: Conversation = {
          id: generateId(),
          title: deriveTitle(legacyMsgs),
          createdAt: Date.now() - 3600000,
          updatedAt: Date.now(),
          messages: legacyMsgs,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify([initialConv]));
        localStorage.setItem(ACTIVE_ID_KEY, initialConv.id);
        return [initialConv];
      }
    }
  } catch {
    /* ignore parse errors */
  }
  return [];
}

export function getActiveConversationId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_ID_KEY);
}

export function setActiveConversationId(id: string | null): void {
  if (typeof window === "undefined") return;
  if (id) {
    localStorage.setItem(ACTIVE_ID_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_ID_KEY);
  }
  window.dispatchEvent(new CustomEvent("omni-conversation-changed", { detail: { id } }));
}

export function getConversation(id: string): Conversation | null {
  const all = listConversations();
  return all.find((c) => c.id === id) ?? null;
}

export function saveConversation(conversation: Conversation): void {
  if (typeof window === "undefined") return;
  try {
    const all = listConversations();
    const index = all.findIndex((c) => c.id === conversation.id);
    const updated: Conversation = {
      ...conversation,
      title: conversation.title || deriveTitle(conversation.messages),
      updatedAt: Date.now(),
    };

    if (index >= 0) {
      all[index] = updated;
    } else {
      all.unshift(updated);
    }

    // Retain up to 100 recent conversations
    const trimmed = all.slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    window.dispatchEvent(new CustomEvent("omni-conversations-updated"));
  } catch {
    /* storage limit handling */
  }
}

export function deleteConversation(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const all = listConversations().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    if (getActiveConversationId() === id) {
      setActiveConversationId(all[0]?.id ?? null);
    }
    window.dispatchEvent(new CustomEvent("omni-conversations-updated"));
  } catch {
    /* ignore */
  }
}

export function createNewConversation(initialPrompt?: string): Conversation {
  const newConv: Conversation = {
    id: generateId(),
    title: initialPrompt ? deriveTitle([{ role: "user", content: initialPrompt }]) : "New Topic",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: initialPrompt
      ? [{ role: "user", content: initialPrompt, timestamp: Date.now() }]
      : [],
  };
  saveConversation(newConv);
  setActiveConversationId(newConv.id);
  return newConv;
}

export function searchConversations(query: string, sourceList?: Conversation[]): SearchResult[] {
  const all = sourceList ?? listConversations();
  const q = query.trim().toLowerCase();
  if (!q) {
    return all.map((c) => ({
      conversation: c,
      matchedField: "title",
      matchedSnippet:
        c.messages.find((m) => m.role === "assistant")?.content.slice(0, 110) ??
        c.messages[0]?.content.slice(0, 110) ??
        "Empty conversation",
    }));
  }

  const results: SearchResult[] = [];

  for (const conv of all) {
    // 1. Check title
    if (conv.title.toLowerCase().includes(q)) {
      const firstMsg = conv.messages[0]?.content ?? "";
      results.push({
        conversation: conv,
        matchedField: "title",
        matchedSnippet: firstMsg.slice(0, 110),
      });
      continue;
    }

    // 2. Check message contents
    const matchedMsg = conv.messages.find((m) => m.content.toLowerCase().includes(q));
    if (matchedMsg) {
      const idx = matchedMsg.content.toLowerCase().indexOf(q);
      const start = Math.max(0, idx - 40);
      const end = Math.min(matchedMsg.content.length, idx + q.length + 60);
      const snippet = `${start > 0 ? "…" : ""}${matchedMsg.content.slice(start, end)}${
        end < matchedMsg.content.length ? "…" : ""
      }`;

      results.push({
        conversation: conv,
        matchedField: "message",
        matchedSnippet: snippet,
      });
    }
  }

  return results;
}

import { supabase } from "@/lib/supabase";

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

export async function syncConversationsWithSupabase(): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;
    if (!user) return;

    const { data: cloudConvs, error: pullError } = await supabase
      .from("conversations")
      .select("local_id, title, messages, created_at, updated_at");

    if (pullError) {
      console.warn("Sync skipped: Conversations table might not exist yet.", pullError.message);
      return;
    }

    const localConvs = listConversations();
    const localMap = new Map(localConvs.map((c) => [c.id, c]));

    let hasChanges = false;

    if (cloudConvs && cloudConvs.length > 0) {
      for (const row of cloudConvs) {
        const remoteConv: Conversation = {
          id: row.local_id,
          title: row.title,
          createdAt: new Date(row.created_at).getTime(),
          updatedAt: new Date(row.updated_at).getTime(),
          messages: row.messages as Msg[],
        };

        const local = localMap.get(remoteConv.id);
        if (!local || local.updatedAt < remoteConv.updatedAt) {
          localMap.set(remoteConv.id, remoteConv);
          hasChanges = true;
        }
      }
    }

    const toPush = Array.from(localMap.values());
    for (const conv of toPush) {
      const remote = cloudConvs?.find((c) => c.local_id === conv.id);
      const remoteUpdated = remote ? new Date(remote.updated_at).getTime() : 0;

      if (conv.updatedAt > remoteUpdated) {
        await supabase.from("conversations").upsert(
          {
            user_id: user.id,
            local_id: conv.id,
            title: conv.title,
            messages: conv.messages,
            created_at: new Date(conv.createdAt).toISOString(),
            updated_at: new Date(conv.updatedAt).toISOString(),
          },
          { onConflict: "user_id, local_id" },
        );
      }
    }

    if (hasChanges) {
      const merged = Array.from(localMap.values())
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, 100);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent("omni-conversations-updated"));

      const activeId = getActiveConversationId();
      if (activeId) {
        window.dispatchEvent(
          new CustomEvent("omni-conversation-changed", { detail: { id: activeId } }),
        );
      }
    }
  } catch (err) {
    console.error("Error syncing conversations:", err);
  }
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
    // Ignore storage parse errors
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

    const trimmed = all.slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    window.dispatchEvent(new CustomEvent("omni-conversations-updated"));

    // Sync to cloud in background
    void supabase.auth.getSession().then(({ data }) => {
      const user = data?.session?.user;
      if (user) {
        supabase
          .from("conversations")
          .upsert(
            {
              user_id: user.id,
              local_id: updated.id,
              title: updated.title,
              messages: updated.messages,
              created_at: new Date(updated.createdAt).toISOString(),
              updated_at: new Date(updated.updatedAt).toISOString(),
            },
            { onConflict: "user_id, local_id" },
          )
          .then();
      }
    });
  } catch {
    // Ignore local persistence sync errors
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

    // Sync deletion to cloud in background
    void supabase.auth.getSession().then(({ data }) => {
      const user = data?.session?.user;
      if (user) {
        supabase.from("conversations").delete().eq("local_id", id).then();
      }
    });
  } catch {
    // Ignore local persistence delete errors
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
    if (conv.title.toLowerCase().includes(q)) {
      const firstMsg = conv.messages[0]?.content ?? "";
      results.push({
        conversation: conv,
        matchedField: "title",
        matchedSnippet: firstMsg.slice(0, 110),
      });
      continue;
    }
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

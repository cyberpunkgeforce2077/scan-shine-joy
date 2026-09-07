import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Attachment = { data: string; mime: string };
export type ChatMessage = { role: "user" | "assistant"; content: string; images?: Attachment[] };
export type ChatSession = { id: string; title: string; timestamp: number; messages: ChatMessage[] };
export type WorkspaceTool = "chat" | "background" | "silhouette" | "mesh";

type WorkspaceValue = {
  sessions: ChatSession[];
  activeSessionId: string;
  activeTool: WorkspaceTool;
  collapsed: boolean;
  createNewChat: () => void;
  selectSession: (id: string) => void;
  updateMessages: (messages: ChatMessage[]) => void;
  setActiveTool: (tool: WorkspaceTool) => void;
  setCollapsed: (value: boolean) => void;
};

const STORAGE_KEY = "omni-chat-sessions";
const LEGACY_KEY = "omni-ask-history";

function newSession(messages: ChatMessage[] = []): ChatSession {
  return { id: crypto.randomUUID(), title: "New conversation", timestamp: Date.now(), messages };
}

function loadSessions(): ChatSession[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ChatSession[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const messages = JSON.parse(legacy) as ChatMessage[];
      if (Array.isArray(messages) && messages.length > 0) return [newSession(messages)];
    }
  } catch {
    /* ignore malformed local history */
  }
  return [newSession()];
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>(loadSessions);
  const [activeSessionId, setActiveSessionId] = useState("");
  const [activeTool, setActiveTool] = useState<WorkspaceTool>("chat");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!activeSessionId && sessions[0]) setActiveSessionId(sessions[0].id);
  }, [activeSessionId, sessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const value = useMemo<WorkspaceValue>(() => ({
    sessions,
    activeSessionId,
    activeTool,
    collapsed,
    createNewChat: () => {
      const session = newSession();
      setSessions((current) => [session, ...current]);
      setActiveSessionId(session.id);
      setActiveTool("chat");
    },
    selectSession: (id) => {
      setActiveSessionId(id);
      setActiveTool("chat");
    },
    updateMessages: (messages) => {
      setSessions((current) => current.map((session) => {
        if (session.id !== activeSessionId) return session;
        const firstUser = messages.find((message) => message.role === "user");
        const title = firstUser?.content.replace(/\s+/g, " ").trim().slice(0, 42) || session.title;
        return { ...session, messages, title, timestamp: Date.now() };
      }));
    },
    setActiveTool,
    setCollapsed,
  }), [sessions, activeSessionId, activeTool, collapsed]);

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return context;
}

export function getSessionMessages(sessions: ChatSession[], id: string) {
  return sessions.find((session) => session.id === id)?.messages ?? [];
}

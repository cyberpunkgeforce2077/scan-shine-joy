const brand = (background: string, content: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="${background}"/>${content}</svg>`,
  )}`;

export const PRESET_ICONS: { id: string; label: string; src: string }[] = [
  {
    id: "youtube",
    label: "YouTube",
    src: brand(
      "#ff0033",
      '<path d="M13 10.4 21 16l-8 5.6z" fill="#fff"/><rect x="6" y="7" width="20" height="18" rx="5" fill="none" stroke="#fff" stroke-width="2.2"/>',
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    src: brand(
      "#d62976",
      '<rect x="7" y="7" width="18" height="18" rx="5" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="16" cy="16" r="4" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="21.3" cy="10.7" r="1.2" fill="#fff"/>',
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    src: brand(
      "#111827",
      '<path d="M17.5 7v11.2a4.8 4.8 0 1 1-4-4.7v3.1a1.8 1.8 0 1 0 1.8 1.8V7h2.2a5.8 5.8 0 0 0 4 2v3a8.6 8.6 0 0 1-4-1.3z" fill="#fff"/>',
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    src: brand(
      "#1877f2",
      '<path d="M18.4 17.8 19.1 13h-3.5V9.9c0-1.3.6-2.2 2.4-2.2h1.3V4.5c-.7-.1-1.6-.2-2.6-.2-3.2 0-5.4 1.9-5.4 5.5V13H8v4.8h3.3V28h4.3V17.8z" fill="#fff"/>',
    ),
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    src: brand(
      "#0f766e",
      '<path d="M6 12.5a15.5 15.5 0 0 1 20 0M9.5 16.5a10 10 0 0 1 13 0M13 20.5a4.6 4.6 0 0 1 6 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="16" cy="24.5" r="1.4" fill="#fff"/>',
    ),
  },
  {
    id: "mail",
    label: "Mail",
    src: brand(
      "#2563eb",
      '<rect x="6" y="9" width="20" height="14" rx="2.5" fill="none" stroke="#fff" stroke-width="2.2"/><path d="m7 10 9 7 9-7" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
  },
];

const svg = (path: string, color = "#111827") =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="24" height="24" fill="white" rx="4"/>${path}</svg>`,
  )}`;

export const PRESET_ICONS: { id: string; label: string; src: string }[] = [
  {
    id: "wifi",
    label: "Wi-Fi",
    src: svg(
      '<path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M8.5 16.05a6 6 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    src: svg(
      '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    src: svg(
      '<rect x="2.5" y="6" width="19" height="12" rx="4"/><polygon points="10.5,9.5 15.5,12 10.5,14.5" fill="currentColor" stroke="none"/>',
    ),
  },
  {
    id: "globe",
    label: "Globe",
    src: svg(
      '<circle cx="12" cy="12" r="8.5"/><line x1="3.5" y1="12" x2="20.5" y2="12"/><path d="M12 3.5a13 13 0 0 1 0 17 13 13 0 0 1 0-17z"/>',
    ),
  },
  {
    id: "mail",
    label: "Mail",
    src: svg('<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><polyline points="3.5,7 12,13 20.5,7"/>'),
  },
];

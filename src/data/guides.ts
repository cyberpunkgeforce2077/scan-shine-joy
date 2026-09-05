import type { LucideIcon } from "lucide-react";
import {
  Gauge,
  Thermometer,
  MemoryStick,
  ShieldCheck,
  Laptop,
  DatabaseBackup,
  Wifi,
  BatteryCharging,
  Fish,
} from "lucide-react";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  tips?: string[];
};

export type GuideChip = "cyan" | "pink" | "amber" | "violet" | "mint" | "blue";

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  minutes: number;
  icon: LucideIcon;
  chip: GuideChip;
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "speed-up-slow-pc",
    title: "Why Is My PC So Slow? 7 Fixes That Actually Work",
    excerpt:
      "Diagnose the real bottleneck first, then fix startup clutter, disk pressure, and background junk in the right order.",
    category: "Performance",
    minutes: 6,
    icon: Gauge,
    chip: "cyan",
    sections: [
      {
        heading: "Find the real bottleneck before changing anything",
        paragraphs: [
          "Slow is a symptom, not a diagnosis. Open Task Manager (Ctrl+Shift+Esc on Windows) or Activity Monitor (macOS) and watch it for a minute while the machine feels sluggish. The column sitting near 100% — CPU, Memory, or Disk — is your culprit.",
          "A maxed-out disk on an old hard drive feels completely different from maxed-out memory, and the fixes don't overlap. Two minutes of observation saves you hours of random tweaking.",
        ],
        tips: [
          "Sort by the suspicious column so the worst offender floats to the top.",
          "If Disk sits at 100% on a hard drive (HDD), an SSD upgrade is the single biggest fix — see our RAM vs SSD guide.",
        ],
      },
      {
        heading: "Kill startup clutter",
        paragraphs: [
          "Every app that launches at boot steals seconds from startup and keeps a slice of RAM forever. Most of them — updaters, game launchers, chat apps, printer helpers — don't need to run until you open them.",
          "On Windows: Task Manager → Startup apps, disable everything you don't recognize as essential. On macOS: System Settings → General → Login Items. This alone often halves boot time.",
        ],
        tips: [
          "Disabling a startup item doesn't uninstall it — the app still works when you open it manually.",
          "Keep antivirus, cloud sync, and touchpad/audio drivers enabled.",
        ],
      },
      {
        heading: "Free up disk breathing room",
        paragraphs: [
          "Operating systems need working space for updates, caches, and virtual memory. When a drive drops below roughly 15% free space, everything from booting to opening a browser tab slows down.",
          "Empty the recycle bin, run the built-in Disk Cleanup (Windows) or About This Mac → Storage → Recommendations (macOS), and move large media libraries to an external drive or cloud storage.",
        ],
      },
      {
        heading: "Scan for malware and junkware",
        paragraphs: [
          "Adware, cryptominers, and 'free PC optimizer' tools are classic silent resource hogs. Run a full scan with Windows Security (built in and genuinely good) or Malwarebytes' free scanner.",
          "While you're there, uninstall programs you don't use — especially anything you don't remember installing. Browser extensions count too: keep fewer than ten, and remove any you don't recognize.",
        ],
      },
      {
        heading: "Update the OS and drivers — then restart properly",
        paragraphs: [
          "Pending updates leave systems in a half-patched state that causes stutter and strange slowdowns. Install OS updates, then do a full Restart (not Shut Down — Windows Fast Startup makes shutdown a partial hibernate).",
          "If it's been months since your last real restart, this step alone can feel like a new machine.",
        ],
      },
      {
        heading: "When hardware is the honest answer",
        paragraphs: [
          "If Task Manager shows memory pegged above 90% during normal use, more RAM will help. If the disk is a spinning HDD, an SSD transforms everything. If the CPU is old and constantly maxed, no software tweak will save it.",
          "Check our RAM vs SSD guide before spending money — the right $60 upgrade beats the wrong $600 one.",
        ],
      },
    ],
  },
  {
    slug: "laptop-overheating",
    title: "Laptop Overheating? How to Cool It Down Safely",
    excerpt:
      "Why laptops run hot, how to clear dust without opening anything, and the habits that keep temperatures down.",
    category: "Hardware",
    minutes: 5,
    icon: Thermometer,
    chip: "amber",
    sections: [
      {
        heading: "Why laptops overheat",
        paragraphs: [
          "Heat comes from the CPU and GPU working hard; it leaves through tiny fans and vents the width of a pencil. Anything that blocks that exit — dust, blankets, a dead fan — turns the chassis into an oven.",
          "Some warmth under load is normal. Trouble signs: fans roaring at idle, the palm rest too hot to touch, sudden shutdowns, or heavy throttling (the machine getting slow exactly when it gets hot).",
        ],
      },
      {
        heading: "Clear the vents the safe way",
        paragraphs: [
          "Power off and unplug. Find the intake grilles (usually underneath) and exhaust vents (sides or hinge). Use short bursts of compressed air at an angle — never a vacuum, which builds static, and never long blasts that over-spin the fan.",
          "Hold the fan blades still through the grille with a toothpick if you can, so compressed air doesn't spin the bearing faster than it was designed for.",
        ],
        tips: [
          "Do this outside or over a sink — the dust cloud is real.",
          "Repeat every 3–6 months if you have pets or carpet.",
        ],
      },
      {
        heading: "Fix your surface and airflow habits",
        paragraphs: [
          "Beds, couches, and laps smother the intake vents. A hard flat surface restores airflow instantly; even propping the back edge up an inch measurably drops temperatures.",
          "A $20 cooling stand helps, but a $0 hardcover book under the rear edge does half the job.",
        ],
      },
      {
        heading: "Find what's burning CPU for no reason",
        paragraphs: [
          "Open Task Manager or Activity Monitor and sort by CPU. A browser tab gone rogue, an updater stuck in a loop, or malware can pin a core at 100% and cook the machine while you do nothing.",
          "Closing the offender is an instant fix. If the same app keeps doing it, update or reinstall it.",
        ],
      },
      {
        heading: "When it's time for thermal paste or a repair",
        paragraphs: [
          "After 3–5 years, the thermal paste between the CPU and its heatsink dries out and stops conducting heat. A repaste is cheap at a repair shop and can drop temperatures 10–15°C on an aging machine.",
          "If a fan has died (grinding noise, or silence plus heat), replace it promptly — running fanless cooks the motherboard.",
        ],
        tips: [
          "Free tools like HWMonitor (Windows) or Macs Fan Control (macOS) show exact temperatures. Sustained CPU temps above 95°C need attention.",
        ],
      },
    ],
  },
  {
    slug: "ram-vs-ssd",
    title: "RAM vs SSD: Which Upgrade Actually Speeds Things Up?",
    excerpt:
      "They fix different problems. Here's how to tell which one your machine is starving for before you spend anything.",
    category: "Upgrades",
    minutes: 5,
    icon: MemoryStick,
    chip: "violet",
    sections: [
      {
        heading: "What each one actually does",
        paragraphs: [
          "RAM is your desk: the space where open apps and tabs live while you use them. Too little, and the system constantly shuffles things on and off the desk — that's the stutter you feel when switching apps.",
          "An SSD is how fast things get to the desk. It affects boot time, app launches, file opens, and game loading. It does almost nothing once everything is already loaded.",
        ],
      },
      {
        heading: "Match the symptom to the upgrade",
        paragraphs: [
          "Slow boot, apps take forever to open, disk at 100% in Task Manager, the whole machine freezes in long pauses → that's storage. If you still have a spinning hard drive, an SSD is the single best upgrade money can buy.",
          "Fine when you first open things, but chokes when you have many tabs or apps open, memory above 90% in Task Manager, heavy 'paging' or 'swap' activity → that's RAM.",
        ],
        tips: [
          "One tab of Task Manager (the Performance view) answers this question definitively. Look while the machine feels slow.",
        ],
      },
      {
        heading: "How much is enough in 2026",
        paragraphs: [
          "RAM: 8 GB is the floor for light use, 16 GB is the sweet spot for almost everyone, 32 GB for heavy multitasking, VMs, or serious creative work. If a laptop's RAM is soldered (most thin ones), buy enough the first time — you can't add more later.",
          "Storage: 512 GB SSD is comfortable for most people; 256 GB only if you live in the cloud. For upgrades, any known-brand NVMe or SATA SSD (Samsung, Crucial, WD, Kingston) is fine.",
        ],
      },
      {
        heading: "Cost and difficulty reality check",
        paragraphs: [
          "RAM: $30–80, and on many desktops and thicker laptops it's a 10-minute job with a screwdriver. On thin ultrabooks it's often impossible — check your exact model before buying anything.",
          "SSD: $40–90 for 1 TB. Installing means either cloning your old drive (free software, one evening) or a fresh OS install. Many shops will do the whole thing for a modest fee.",
        ],
      },
      {
        heading: "The verdict",
        paragraphs: [
          "Still on a hard drive? SSD first, no contest — it's the difference between a machine you dread and one you don't think about.",
          "Already on an SSD but it stutters with your workload? RAM. And if both look fine in Task Manager, the bottleneck is the CPU, and no upgrade short of a new machine fixes that.",
        ],
      },
    ],
  },
  {
    slug: "stay-safe-online",
    title: "Staying Safe Online: The 20-Minute Security Setup",
    excerpt:
      "Four changes that block the vast majority of account takeovers and scams — no paranoia required.",
    category: "Security",
    minutes: 6,
    icon: ShieldCheck,
    chip: "pink",
    sections: [
      {
        heading: "Turn on two-factor authentication for the accounts that matter",
        paragraphs: [
          "Email first — it's the master key that resets every other password. Then banking, cloud storage, and social accounts. An authenticator app (or built-in passkeys) beats SMS codes, but SMS beats nothing.",
          "2FA is the single highest-value security move that exists. It stops password thieves cold even when your password leaks.",
        ],
        tips: [
          "Save the backup codes somewhere offline — a note in a drawer works.",
        ],
      },
      {
        heading: "Use a password manager (yes, really)",
        paragraphs: [
          "Reused passwords are how one random site's data breach becomes your email getting hijacked. A password manager generates a unique strong password per site and types them for you, so there's nothing to remember.",
          "Your browser's built-in manager (Chrome, Safari, Firefox all have one) is a perfectly good start. Dedicated apps like Bitwarden or 1Password add cross-device sync and sharing.",
        ],
      },
      {
        heading: "Updates are seatbelts, not chores",
        paragraphs: [
          "Almost every major hack in the news exploited a hole that was already patched — on machines that hadn't installed the patch. Turn on automatic updates for your OS, browser, and phone, and let them run.",
          "The 'remind me tomorrow' button is how machines stay vulnerable for years. Restart tonight instead.",
        ],
      },
      {
        heading: "Learn the three phishing red flags",
        paragraphs: [
          "Urgency ('act now or lose access'), a sender address that almost matches a real one, and links whose hover-preview doesn't match the text. Any one of these means stop and verify through the official app or website — never through the message itself.",
          "Our phishing guide has a 10-second checklist with real examples.",
        ],
      },
      {
        heading: "Backups are a security tool too",
        paragraphs: [
          "Ransomware, theft, spills, and disk death all end the same way if you have a current backup: as an inconvenience instead of a catastrophe. The 3-2-1 rule takes one evening to set up — see our backup guide.",
        ],
      },
    ],
  },
  {
    slug: "choosing-a-laptop",
    title: "How to Choose a Laptop in 2026 (Without Overspending)",
    excerpt:
      "The specs that matter, the marketing you can ignore, and realistic budgets for every kind of user.",
    category: "Buying",
    minutes: 7,
    icon: Laptop,
    chip: "blue",
    sections: [
      {
        heading: "Start with what you'll actually do",
        paragraphs: [
          "Browsing, documents, and streaming? Almost any modern laptop is overpowered for you. Photo/video editing, software development, or gaming? Now the specs matter and cheap machines will frustrate you daily.",
          "Write down your three most demanding tasks. Buy for those, not for an imaginary future workload.",
        ],
      },
      {
        heading: "The specs that actually matter",
        paragraphs: [
          "RAM: 16 GB is the 2026 sweet spot — 8 GB only for genuinely light use, and remember many thin laptops can't be upgraded later. Storage: 512 GB SSD. Screen: IPS or OLED, 300+ nits brightness, and 1080p minimum — you stare at it for years.",
          "CPU: any current-generation mid-range chip (Core 5/Ultra 5, Ryzen 5, Apple M-series) handles normal work effortlessly. Only step up for video work, development, or gaming.",
        ],
        tips: [
          "A better screen improves every single second of ownership. A faster CPU improves minutes per week for most people.",
        ],
      },
      {
        heading: "Marketing you can safely ignore",
        paragraphs: [
          "Dedicated 'AI' stickers, huge GHz numbers on budget chips, 'gaming-grade' on anything without a real GPU, and resolution above 1440p on a 13-inch screen. None of these change your daily experience.",
          "Touchscreens and 2-in-1 hinges are nice only if you'll genuinely use them — they add cost, weight, and glare.",
        ],
      },
      {
        heading: "Battery and weight are lifestyle specs",
        paragraphs: [
          "If the laptop lives on a desk, ignore both and get more machine per dollar. If it travels daily, every 200 grams and every hour of battery matters more than any benchmark.",
          "Manufacturer battery claims are fantasy — check independent reviews for real-world numbers, and expect roughly 70% of the best estimate you find.",
        ],
      },
      {
        heading: "Realistic budget tiers",
        paragraphs: [
          "Under $500: fine for browsing and documents; expect compromises in screen and build. $700–1,100: the sweet spot — great screens, 16 GB RAM, all-day battery. $1,300+: premium build, creative work, or gaming.",
          "Last year's mid-range model on sale routinely beats this year's budget model at the same price.",
        ],
      },
      {
        heading: "Before you buy",
        paragraphs: [
          "Try the keyboard and trackpad in person if you can — you'll touch them more than any spec. Count the ports you need. Check the warranty and whether RAM/storage are upgradeable.",
          "And read one long-term review, not five unboxings.",
        ],
      },
    ],
  },
  {
    slug: "backup-basics",
    title: "Backups for Humans: The 3-2-1 Rule Made Simple",
    excerpt:
      "One evening of setup that makes theft, spills, ransomware, and dead drives a shrug instead of a disaster.",
    category: "Essentials",
    minutes: 5,
    icon: DatabaseBackup,
    chip: "mint",
    sections: [
      {
        heading: "The 3-2-1 rule in one sentence",
        paragraphs: [
          "Keep 3 copies of anything that matters, on 2 different kinds of storage, with 1 copy somewhere else. Your laptop plus an external drive plus a cloud service satisfies this completely.",
          "It sounds like overkill until the day your laptop and its backup drive are stolen from the same bag, or a power surge kills both. 'Somewhere else' is the part everyone skips and everyone needs.",
        ],
      },
      {
        heading: "Copy 1 & 2: automatic local backup",
        paragraphs: [
          "Windows: plug in an external drive and turn on File History (Settings → Accounts → Windows backup, or Control Panel). macOS: plug in a drive and say yes when Time Machine offers to use it.",
          "That's it. Both run quietly forever, keeping hourly versions so you can resurrect a file you deleted or mangled last Tuesday.",
        ],
        tips: [
          "The drive must stay plugged in (or be reconnected weekly) — an unplugged backup is a historical document.",
          "A 1–2 TB external drive costs about the same as a nice dinner.",
        ],
      },
      {
        heading: "Copy 3: the off-site cloud copy",
        paragraphs: [
          "iCloud, OneDrive, and Google Drive sync your important folders automatically and count as your off-site copy for documents and photos. For full-computer protection, dedicated services like Backblaze run silently in the background for a few dollars a month.",
          "Sync is not quite backup — deletions sync too — but every major service keeps version history and a recycle window, which covers the realistic accidents.",
        ],
      },
      {
        heading: "What actually needs backing up",
        paragraphs: [
          "Documents, photos, and anything you'd cry about losing. Skip applications and the OS itself — those are reinstallable. The Downloads folder you keep meaning to clean is, statistically, 90% disposable.",
          "If you're not sure whether something matters, it does. Storage is cheap; regret is expensive.",
        ],
      },
      {
        heading: "Test it once, then trust it",
        paragraphs: [
          "Backups fail silently more often than you'd think. Once a quarter, restore one random file — from the local drive and from the cloud — to prove both actually work.",
          "A backup you've never restored from is a hypothesis, not a backup.",
        ],
      },
    ],
  },
  {
    slug: "fix-wifi",
    title: "Wi-Fi Keeps Dropping? A Room-by-Room Fix Guide",
    excerpt:
      "Work through the causes in order of likelihood — from the 60-second fixes to the router physics nobody mentions.",
    category: "Network",
    minutes: 6,
    icon: Wifi,
    chip: "cyan",
    sections: [
      {
        heading: "The 60-second fixes (do these first)",
        paragraphs: [
          "Restart the router and modem: unplug both for 30 seconds, plug the modem in, wait for its lights to settle, then the router. This clears memory leaks and stale connections and fixes a surprising share of problems.",
          "On your device: toggle Wi-Fi off and on, then 'forget' the network and rejoin it. If only one device struggles while others are fine, the problem is that device — update its OS and drivers.",
        ],
      },
      {
        heading: "Router placement is physics, not decoration",
        paragraphs: [
          "Wi-Fi hates walls (especially brick and concrete), metal, water (including fish tanks and people), and floors. A router in a corner cabinet behind the TV is broadcasting most of its signal into your neighbor's wall.",
          "Move it central, high, and in the open. This single free change outperforms most hardware upgrades.",
        ],
        tips: [
          "Antennas vertical covers a floor horizontally; tilt one horizontal for better floor-to-floor reach.",
        ],
      },
      {
        heading: "Choose the right band",
        paragraphs: [
          "2.4 GHz travels far but is slow and crowded (every gadget, microwave, and baby monitor lives there). 5 GHz and 6 GHz are much faster but fade through walls.",
          "Sit near the router? Use the 5/6 GHz network. Two rooms away or a smart plug in the garage? 2.4 GHz. Many routers merge them into one name and guess wrong — splitting them into separate names lets you choose deliberately.",
        ],
      },
      {
        heading: "Crowded channels and interference",
        paragraphs: [
          "In apartments, dozens of networks fight over the same airwaves. A free analyzer app (WiFi Analyzer on Android, or your router's own app) shows which channels are congested; switching to an empty one — or just enabling 'auto channel' — can end evening slowdowns.",
          "Microwaves, old cordless phones, and cheap USB 3 hubs also jam 2.4 GHz. If drops coincide with popcorn, now you know.",
        ],
      },
      {
        heading: "When it's actually the internet, not the Wi-Fi",
        paragraphs: [
          "Plug a laptop directly into the router with an Ethernet cable and run a speed test. Slow there too? The problem is your ISP line or plan — call them with those numbers in hand.",
          "Fast on Ethernet but bad on Wi-Fi in the same room? The router itself is dying or ancient. Anything older than Wi-Fi 5 (802.11ac) deserves retirement.",
        ],
      },
      {
        heading: "Big home? Mesh beats extenders",
        paragraphs: [
          "Cheap repeaters halve your speed and create confusing separate networks. A mesh system (two or three units) blankets a large or multi-floor home in one seamless network and is the correct fix for dead zones.",
          "One well-placed $150 router often beats a $400 mesh in a small apartment — don't buy coverage you don't need.",
        ],
      },
    ],
  },
  {
    slug: "battery-care",
    title: "Phone & Laptop Battery Care: What's True, What's Myth",
    excerpt:
      "Lithium batteries age by heat and charge level, not by magic. The habits that actually extend their life.",
    category: "Hardware",
    minutes: 4,
    icon: BatteryCharging,
    chip: "amber",
    sections: [
      {
        heading: "How lithium batteries actually age",
        paragraphs: [
          "Every lithium-ion battery chemically degrades from day one. Two things accelerate it dramatically: heat, and time spent at very high or very low charge. Cycles matter less than people think — conditions matter more.",
          "A battery is a consumable, like tires. Good habits buy you years, not immortality.",
        ],
      },
      {
        heading: "The 20–80 habit: mostly true, slightly overrated",
        paragraphs: [
          "Keeping charge between roughly 20% and 80% genuinely reduces wear. But modern devices already manage this — iPhones and most laptops learn your routine and pause at 80% overnight.",
          "Turn on the built-in optimized/adaptive charging and battery limit features, then stop obsessing. Occasional full charges and deep discharges are fine.",
        ],
        tips: [
          "Many laptops offer a 'maximum 80%' charge limit in their settings or manufacturer app — ideal if it lives plugged in at a desk.",
        ],
      },
      {
        heading: "Heat is the real killer",
        paragraphs: [
          "Fast-charging in a hot car, gaming on a bed with blocked vents, sun on the dashboard — these age batteries faster than any charging habit. A battery stored at 100% in heat can lose a fifth of its capacity in a year.",
          "If the device is hot to the touch while charging, remove the case, move it off soft surfaces, and let it breathe.",
        ],
      },
      {
        heading: "Charging overnight: fine",
        paragraphs: [
          "Devices stopped 'overcharging' a decade ago — they cut current at full and sip power to stay topped up. With optimized charging enabled, overnight charging is a non-issue.",
          "The one genuinely bad combo is cheap no-name chargers and cables. Stick to certified brands; a fire-risk bargain is no bargain.",
        ],
      },
      {
        heading: "Storing a device long-term",
        paragraphs: [
          "Leaving a battery at 0% for months can kill it permanently. For storage, charge to about 50%, power off, and keep it cool and dry. Top it back to 50% every few months.",
        ],
      },
      {
        heading: "When to replace",
        paragraphs: [
          "Below about 80% of original capacity (shown in battery health settings on phones and many laptops), runtime gets annoying and replacement is worth it. A battery swap on a good device is far cheaper than a new device — and keeps it out of landfill.",
        ],
      },
    ],
  },
  {
    slug: "spot-phishing",
    title: "How to Spot a Phishing Email in 10 Seconds",
    excerpt:
      "The three checks that catch almost every scam, and exactly what to do if you already clicked.",
    category: "Security",
    minutes: 4,
    icon: Fish,
    chip: "pink",
    sections: [
      {
        heading: "Check 1: Who is it really from?",
        paragraphs: [
          "Display names lie — anyone can call themselves 'Amazon Support'. Tap or hover the sender's name to reveal the actual address. 'amazon-security@amaz0n-help.ru' is not Amazon, no matter how nice the logo looks.",
          "Watch for near-miss domains: micros0ft, paypa1, apple-id-support.com. Real companies email from their own simple domains.",
        ],
      },
      {
        heading: "Check 2: Is it manufacturing panic?",
        paragraphs: [
          "'Your account will be closed in 24 hours.' 'Unusual sign-in detected.' 'Payment failed — act now.' Urgency plus a threat is the signature move of every phishing campaign, because panic bypasses judgment.",
          "Real companies almost never demand immediate action by email. The panic is the tell — the moment you feel it, slow down on purpose.",
        ],
      },
      {
        heading: "Check 3: Where does the link actually go?",
        paragraphs: [
          "Hover (desktop) or long-press (mobile) any link before clicking and read the real destination. The text can say 'paypal.com' while the link goes anywhere.",
          "The safest habit of all: don't use the link at all. Open the official app or type the site's address yourself. If the problem is real, it will be waiting there too.",
        ],
        tips: [
          "Unexpected attachments — especially .zip, .html, or 'invoices' — get the same treatment. Verify with the sender through a separate channel first.",
        ],
      },
      {
        heading: "What real companies never ask for",
        paragraphs: [
          "Passwords, full card numbers, one-time codes, or remote access to your computer — by email, text, or phone. Microsoft does not call you about viruses. Your bank does not need you to 'verify' your password.",
          "Anyone asking for a code that was texted to you is trying to hijack your account in real time. Those codes are keys; never read them aloud.",
        ],
      },
      {
        heading: "If you already clicked or entered details",
        paragraphs: [
          "Don't panic — damage is fixable if you're fast. Change the password on the real site immediately (and anywhere you reused it). Turn on 2FA if it wasn't. If you entered card details, call the bank's number on the back of the card.",
          "If you ran an attachment, disconnect from the internet and run a full antivirus scan. Then report the phish — your email provider's 'report phishing' button genuinely trains the filters.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function searchGuides(query: string): Guide[] {
  const q = query.trim().toLowerCase();
  if (!q) return guides;
  return guides.filter((g) => {
    const haystack = [
      g.title,
      g.excerpt,
      g.category,
      ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.tips ?? [])]),
    ]
      .join(" ")
      .toLowerCase();
    return q.split(/\s+/).every((word) => haystack.includes(word));
  });
}

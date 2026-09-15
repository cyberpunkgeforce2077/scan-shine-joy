import { r as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { G as require_react, V as redirect, W as notFound, _ as createFileRoute, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRouteWithContext, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { A as LoaderCircle, D as MemoryStick, E as Menu, F as Gauge, I as Fish, K as BookOpen, N as Laptop, O as Mail, P as Image, R as Download, S as Moon, T as MessageSquare, U as Check, W as Camera, _ as Scan, a as UserRound, b as Plus, f as ShieldCheck, h as Search, i as WandSparkles, l as Thermometer, n as Wifi, o as Upload, p as Settings, q as BatteryCharging, r as WifiOff, t as X, u as Sun, y as QrCode, z as DatabaseBackup } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-DwP9H4Ik.js
var env = {
	"BASE_URL": "/",
	"DEV": true,
	"MODE": "production",
	"PROD": false,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZHJ6aHpkc21yY3hlbGR2Y3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzcwMjYsImV4cCI6MjEwMTY1MzAyNn0.rynOc47tD4xuLY7gE8SHyQlS2IyFkQjg6gMMMumUqJw",
	"VITE_SUPABASE_URL": "https://hadrzhzdsmrcxeldvcpf.supabase.co"
};
var url = env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "https://hadrzhzdsmrcxeldvcpf.supabase.co";
var anonKey = env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZHJ6aHpkc21yY3hlbGR2Y3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzcwMjYsImV4cCI6MjEwMTY1MzAyNn0.rynOc47tD4xuLY7gE8SHyQlS2IyFkQjg6gMMMumUqJw";
var supabase = createClient(url, anonKey, { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true
} });
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/guides-D-52WIIl.js
var guides = [
	{
		slug: "speed-up-slow-pc",
		title: "Why Is My PC So Slow? 7 Fixes That Actually Work",
		excerpt: "Diagnose the real bottleneck first, then fix startup clutter, disk pressure, and background junk in the right order.",
		category: "Performance",
		minutes: 6,
		icon: Gauge,
		chip: "cyan",
		sections: [
			{
				heading: "Find the real bottleneck before changing anything",
				paragraphs: ["Slow is a symptom, not a diagnosis. Open Task Manager (Ctrl+Shift+Esc on Windows) or Activity Monitor (macOS) and watch it for a minute while the machine feels sluggish. The column sitting near 100% — CPU, Memory, or Disk — is your culprit.", "A maxed-out disk on an old hard drive feels completely different from maxed-out memory, and the fixes don't overlap. Two minutes of observation saves you hours of random tweaking."],
				tips: ["Sort by the suspicious column so the worst offender floats to the top.", "If Disk sits at 100% on a hard drive (HDD), an SSD upgrade is the single biggest fix — see our RAM vs SSD guide."]
			},
			{
				heading: "Kill startup clutter",
				paragraphs: ["Every app that launches at boot steals seconds from startup and keeps a slice of RAM forever. Most of them — updaters, game launchers, chat apps, printer helpers — don't need to run until you open them.", "On Windows: Task Manager → Startup apps, disable everything you don't recognize as essential. On macOS: System Settings → General → Login Items. This alone often halves boot time."],
				tips: ["Disabling a startup item doesn't uninstall it — the app still works when you open it manually.", "Keep antivirus, cloud sync, and touchpad/audio drivers enabled."]
			},
			{
				heading: "Free up disk breathing room",
				paragraphs: ["Operating systems need working space for updates, caches, and virtual memory. When a drive drops below roughly 15% free space, everything from booting to opening a browser tab slows down.", "Empty the recycle bin, run the built-in Disk Cleanup (Windows) or About This Mac → Storage → Recommendations (macOS), and move large media libraries to an external drive or cloud storage."]
			},
			{
				heading: "Scan for malware and junkware",
				paragraphs: ["Adware, cryptominers, and 'free PC optimizer' tools are classic silent resource hogs. Run a full scan with Windows Security (built in and genuinely good) or Malwarebytes' free scanner.", "While you're there, uninstall programs you don't use — especially anything you don't remember installing. Browser extensions count too: keep fewer than ten, and remove any you don't recognize."]
			},
			{
				heading: "Update the OS and drivers — then restart properly",
				paragraphs: ["Pending updates leave systems in a half-patched state that causes stutter and strange slowdowns. Install OS updates, then do a full Restart (not Shut Down — Windows Fast Startup makes shutdown a partial hibernate).", "If it's been months since your last real restart, this step alone can feel like a new machine."]
			},
			{
				heading: "When hardware is the honest answer",
				paragraphs: ["If Task Manager shows memory pegged above 90% during normal use, more RAM will help. If the disk is a spinning HDD, an SSD transforms everything. If the CPU is old and constantly maxed, no software tweak will save it.", "Check our RAM vs SSD guide before spending money — the right $60 upgrade beats the wrong $600 one."]
			}
		]
	},
	{
		slug: "laptop-overheating",
		title: "Laptop Overheating? How to Cool It Down Safely",
		excerpt: "Why laptops run hot, how to clear dust without opening anything, and the habits that keep temperatures down.",
		category: "Hardware",
		minutes: 5,
		icon: Thermometer,
		chip: "amber",
		sections: [
			{
				heading: "Why laptops overheat",
				paragraphs: ["Heat comes from the CPU and GPU working hard; it leaves through tiny fans and vents the width of a pencil. Anything that blocks that exit — dust, blankets, a dead fan — turns the chassis into an oven.", "Some warmth under load is normal. Trouble signs: fans roaring at idle, the palm rest too hot to touch, sudden shutdowns, or heavy throttling (the machine getting slow exactly when it gets hot)."]
			},
			{
				heading: "Clear the vents the safe way",
				paragraphs: ["Power off and unplug. Find the intake grilles (usually underneath) and exhaust vents (sides or hinge). Use short bursts of compressed air at an angle — never a vacuum, which builds static, and never long blasts that over-spin the fan.", "Hold the fan blades still through the grille with a toothpick if you can, so compressed air doesn't spin the bearing faster than it was designed for."],
				tips: ["Do this outside or over a sink — the dust cloud is real.", "Repeat every 3–6 months if you have pets or carpet."]
			},
			{
				heading: "Fix your surface and airflow habits",
				paragraphs: ["Beds, couches, and laps smother the intake vents. A hard flat surface restores airflow instantly; even propping the back edge up an inch measurably drops temperatures.", "A $20 cooling stand helps, but a $0 hardcover book under the rear edge does half the job."]
			},
			{
				heading: "Find what's burning CPU for no reason",
				paragraphs: ["Open Task Manager or Activity Monitor and sort by CPU. A browser tab gone rogue, an updater stuck in a loop, or malware can pin a core at 100% and cook the machine while you do nothing.", "Closing the offender is an instant fix. If the same app keeps doing it, update or reinstall it."]
			},
			{
				heading: "When it's time for thermal paste or a repair",
				paragraphs: ["After 3–5 years, the thermal paste between the CPU and its heatsink dries out and stops conducting heat. A repaste is cheap at a repair shop and can drop temperatures 10–15°C on an aging machine.", "If a fan has died (grinding noise, or silence plus heat), replace it promptly — running fanless cooks the motherboard."],
				tips: ["Free tools like HWMonitor (Windows) or Macs Fan Control (macOS) show exact temperatures. Sustained CPU temps above 95°C need attention."]
			}
		]
	},
	{
		slug: "ram-vs-ssd",
		title: "RAM vs SSD: Which Upgrade Actually Speeds Things Up?",
		excerpt: "They fix different problems. Here's how to tell which one your machine is starving for before you spend anything.",
		category: "Upgrades",
		minutes: 5,
		icon: MemoryStick,
		chip: "violet",
		sections: [
			{
				heading: "What each one actually does",
				paragraphs: ["RAM is your desk: the space where open apps and tabs live while you use them. Too little, and the system constantly shuffles things on and off the desk — that's the stutter you feel when switching apps.", "An SSD is how fast things get to the desk. It affects boot time, app launches, file opens, and game loading. It does almost nothing once everything is already loaded."]
			},
			{
				heading: "Match the symptom to the upgrade",
				paragraphs: ["Slow boot, apps take forever to open, disk at 100% in Task Manager, the whole machine freezes in long pauses → that's storage. If you still have a spinning hard drive, an SSD is the single best upgrade money can buy.", "Fine when you first open things, but chokes when you have many tabs or apps open, memory above 90% in Task Manager, heavy 'paging' or 'swap' activity → that's RAM."],
				tips: ["One tab of Task Manager (the Performance view) answers this question definitively. Look while the machine feels slow."]
			},
			{
				heading: "How much is enough in 2026",
				paragraphs: ["RAM: 8 GB is the floor for light use, 16 GB is the sweet spot for almost everyone, 32 GB for heavy multitasking, VMs, or serious creative work. If a laptop's RAM is soldered (most thin ones), buy enough the first time — you can't add more later.", "Storage: 512 GB SSD is comfortable for most people; 256 GB only if you live in the cloud. For upgrades, any known-brand NVMe or SATA SSD (Samsung, Crucial, WD, Kingston) is fine."]
			},
			{
				heading: "Cost and difficulty reality check",
				paragraphs: ["RAM: $30–80, and on many desktops and thicker laptops it's a 10-minute job with a screwdriver. On thin ultrabooks it's often impossible — check your exact model before buying anything.", "SSD: $40–90 for 1 TB. Installing means either cloning your old drive (free software, one evening) or a fresh OS install. Many shops will do the whole thing for a modest fee."]
			},
			{
				heading: "The verdict",
				paragraphs: ["Still on a hard drive? SSD first, no contest — it's the difference between a machine you dread and one you don't think about.", "Already on an SSD but it stutters with your workload? RAM. And if both look fine in Task Manager, the bottleneck is the CPU, and no upgrade short of a new machine fixes that."]
			}
		]
	},
	{
		slug: "stay-safe-online",
		title: "Staying Safe Online: The 20-Minute Security Setup",
		excerpt: "Four changes that block the vast majority of account takeovers and scams — no paranoia required.",
		category: "Security",
		minutes: 6,
		icon: ShieldCheck,
		chip: "pink",
		sections: [
			{
				heading: "Turn on two-factor authentication for the accounts that matter",
				paragraphs: ["Email first — it's the master key that resets every other password. Then banking, cloud storage, and social accounts. An authenticator app (or built-in passkeys) beats SMS codes, but SMS beats nothing.", "2FA is the single highest-value security move that exists. It stops password thieves cold even when your password leaks."],
				tips: ["Save the backup codes somewhere offline — a note in a drawer works."]
			},
			{
				heading: "Use a password manager (yes, really)",
				paragraphs: ["Reused passwords are how one random site's data breach becomes your email getting hijacked. A password manager generates a unique strong password per site and types them for you, so there's nothing to remember.", "Your browser's built-in manager (Chrome, Safari, Firefox all have one) is a perfectly good start. Dedicated apps like Bitwarden or 1Password add cross-device sync and sharing."]
			},
			{
				heading: "Updates are seatbelts, not chores",
				paragraphs: ["Almost every major hack in the news exploited a hole that was already patched — on machines that hadn't installed the patch. Turn on automatic updates for your OS, browser, and phone, and let them run.", "The 'remind me tomorrow' button is how machines stay vulnerable for years. Restart tonight instead."]
			},
			{
				heading: "Learn the three phishing red flags",
				paragraphs: ["Urgency ('act now or lose access'), a sender address that almost matches a real one, and links whose hover-preview doesn't match the text. Any one of these means stop and verify through the official app or website — never through the message itself.", "Our phishing guide has a 10-second checklist with real examples."]
			},
			{
				heading: "Backups are a security tool too",
				paragraphs: ["Ransomware, theft, spills, and disk death all end the same way if you have a current backup: as an inconvenience instead of a catastrophe. The 3-2-1 rule takes one evening to set up — see our backup guide."]
			}
		]
	},
	{
		slug: "choosing-a-laptop",
		title: "How to Choose a Laptop in 2026 (Without Overspending)",
		excerpt: "The specs that matter, the marketing you can ignore, and realistic budgets for every kind of user.",
		category: "Buying",
		minutes: 7,
		icon: Laptop,
		chip: "blue",
		sections: [
			{
				heading: "Start with what you'll actually do",
				paragraphs: ["Browsing, documents, and streaming? Almost any modern laptop is overpowered for you. Photo/video editing, software development, or gaming? Now the specs matter and cheap machines will frustrate you daily.", "Write down your three most demanding tasks. Buy for those, not for an imaginary future workload."]
			},
			{
				heading: "The specs that actually matter",
				paragraphs: ["RAM: 16 GB is the 2026 sweet spot — 8 GB only for genuinely light use, and remember many thin laptops can't be upgraded later. Storage: 512 GB SSD. Screen: IPS or OLED, 300+ nits brightness, and 1080p minimum — you stare at it for years.", "CPU: any current-generation mid-range chip (Core 5/Ultra 5, Ryzen 5, Apple M-series) handles normal work effortlessly. Only step up for video work, development, or gaming."],
				tips: ["A better screen improves every single second of ownership. A faster CPU improves minutes per week for most people."]
			},
			{
				heading: "Marketing you can safely ignore",
				paragraphs: ["Dedicated 'AI' stickers, huge GHz numbers on budget chips, 'gaming-grade' on anything without a real GPU, and resolution above 1440p on a 13-inch screen. None of these change your daily experience.", "Touchscreens and 2-in-1 hinges are nice only if you'll genuinely use them — they add cost, weight, and glare."]
			},
			{
				heading: "Battery and weight are lifestyle specs",
				paragraphs: ["If the laptop lives on a desk, ignore both and get more machine per dollar. If it travels daily, every 200 grams and every hour of battery matters more than any benchmark.", "Manufacturer battery claims are fantasy — check independent reviews for real-world numbers, and expect roughly 70% of the best estimate you find."]
			},
			{
				heading: "Realistic budget tiers",
				paragraphs: ["Under $500: fine for browsing and documents; expect compromises in screen and build. $700–1,100: the sweet spot — great screens, 16 GB RAM, all-day battery. $1,300+: premium build, creative work, or gaming.", "Last year's mid-range model on sale routinely beats this year's budget model at the same price."]
			},
			{
				heading: "Before you buy",
				paragraphs: ["Try the keyboard and trackpad in person if you can — you'll touch them more than any spec. Count the ports you need. Check the warranty and whether RAM/storage are upgradeable.", "And read one long-term review, not five unboxings."]
			}
		]
	},
	{
		slug: "backup-basics",
		title: "Backups for Humans: The 3-2-1 Rule Made Simple",
		excerpt: "One evening of setup that makes theft, spills, ransomware, and dead drives a shrug instead of a disaster.",
		category: "Essentials",
		minutes: 5,
		icon: DatabaseBackup,
		chip: "mint",
		sections: [
			{
				heading: "The 3-2-1 rule in one sentence",
				paragraphs: ["Keep 3 copies of anything that matters, on 2 different kinds of storage, with 1 copy somewhere else. Your laptop plus an external drive plus a cloud service satisfies this completely.", "It sounds like overkill until the day your laptop and its backup drive are stolen from the same bag, or a power surge kills both. 'Somewhere else' is the part everyone skips and everyone needs."]
			},
			{
				heading: "Copy 1 & 2: automatic local backup",
				paragraphs: ["Windows: plug in an external drive and turn on File History (Settings → Accounts → Windows backup, or Control Panel). macOS: plug in a drive and say yes when Time Machine offers to use it.", "That's it. Both run quietly forever, keeping hourly versions so you can resurrect a file you deleted or mangled last Tuesday."],
				tips: ["The drive must stay plugged in (or be reconnected weekly) — an unplugged backup is a historical document.", "A 1–2 TB external drive costs about the same as a nice dinner."]
			},
			{
				heading: "Copy 3: the off-site cloud copy",
				paragraphs: ["iCloud, OneDrive, and Google Drive sync your important folders automatically and count as your off-site copy for documents and photos. For full-computer protection, dedicated services like Backblaze run silently in the background for a few dollars a month.", "Sync is not quite backup — deletions sync too — but every major service keeps version history and a recycle window, which covers the realistic accidents."]
			},
			{
				heading: "What actually needs backing up",
				paragraphs: ["Documents, photos, and anything you'd cry about losing. Skip applications and the OS itself — those are reinstallable. The Downloads folder you keep meaning to clean is, statistically, 90% disposable.", "If you're not sure whether something matters, it does. Storage is cheap; regret is expensive."]
			},
			{
				heading: "Test it once, then trust it",
				paragraphs: ["Backups fail silently more often than you'd think. Once a quarter, restore one random file — from the local drive and from the cloud — to prove both actually work.", "A backup you've never restored from is a hypothesis, not a backup."]
			}
		]
	},
	{
		slug: "fix-wifi",
		title: "Wi-Fi Keeps Dropping? A Room-by-Room Fix Guide",
		excerpt: "Work through the causes in order of likelihood — from the 60-second fixes to the router physics nobody mentions.",
		category: "Network",
		minutes: 6,
		icon: Wifi,
		chip: "cyan",
		sections: [
			{
				heading: "The 60-second fixes (do these first)",
				paragraphs: ["Restart the router and modem: unplug both for 30 seconds, plug the modem in, wait for its lights to settle, then the router. This clears memory leaks and stale connections and fixes a surprising share of problems.", "On your device: toggle Wi-Fi off and on, then 'forget' the network and rejoin it. If only one device struggles while others are fine, the problem is that device — update its OS and drivers."]
			},
			{
				heading: "Router placement is physics, not decoration",
				paragraphs: ["Wi-Fi hates walls (especially brick and concrete), metal, water (including fish tanks and people), and floors. A router in a corner cabinet behind the TV is broadcasting most of its signal into your neighbor's wall.", "Move it central, high, and in the open. This single free change outperforms most hardware upgrades."],
				tips: ["Antennas vertical covers a floor horizontally; tilt one horizontal for better floor-to-floor reach."]
			},
			{
				heading: "Choose the right band",
				paragraphs: ["2.4 GHz travels far but is slow and crowded (every gadget, microwave, and baby monitor lives there). 5 GHz and 6 GHz are much faster but fade through walls.", "Sit near the router? Use the 5/6 GHz network. Two rooms away or a smart plug in the garage? 2.4 GHz. Many routers merge them into one name and guess wrong — splitting them into separate names lets you choose deliberately."]
			},
			{
				heading: "Crowded channels and interference",
				paragraphs: ["In apartments, dozens of networks fight over the same airwaves. A free analyzer app (WiFi Analyzer on Android, or your router's own app) shows which channels are congested; switching to an empty one — or just enabling 'auto channel' — can end evening slowdowns.", "Microwaves, old cordless phones, and cheap USB 3 hubs also jam 2.4 GHz. If drops coincide with popcorn, now you know."]
			},
			{
				heading: "When it's actually the internet, not the Wi-Fi",
				paragraphs: ["Plug a laptop directly into the router with an Ethernet cable and run a speed test. Slow there too? The problem is your ISP line or plan — call them with those numbers in hand.", "Fast on Ethernet but bad on Wi-Fi in the same room? The router itself is dying or ancient. Anything older than Wi-Fi 5 (802.11ac) deserves retirement."]
			},
			{
				heading: "Big home? Mesh beats extenders",
				paragraphs: ["Cheap repeaters halve your speed and create confusing separate networks. A mesh system (two or three units) blankets a large or multi-floor home in one seamless network and is the correct fix for dead zones.", "One well-placed $150 router often beats a $400 mesh in a small apartment — don't buy coverage you don't need."]
			}
		]
	},
	{
		slug: "battery-care",
		title: "Phone & Laptop Battery Care: What's True, What's Myth",
		excerpt: "Lithium batteries age by heat and charge level, not by magic. The habits that actually extend their life.",
		category: "Hardware",
		minutes: 4,
		icon: BatteryCharging,
		chip: "amber",
		sections: [
			{
				heading: "How lithium batteries actually age",
				paragraphs: ["Every lithium-ion battery chemically degrades from day one. Two things accelerate it dramatically: heat, and time spent at very high or very low charge. Cycles matter less than people think — conditions matter more.", "A battery is a consumable, like tires. Good habits buy you years, not immortality."]
			},
			{
				heading: "The 20–80 habit: mostly true, slightly overrated",
				paragraphs: ["Keeping charge between roughly 20% and 80% genuinely reduces wear. But modern devices already manage this — iPhones and most laptops learn your routine and pause at 80% overnight.", "Turn on the built-in optimized/adaptive charging and battery limit features, then stop obsessing. Occasional full charges and deep discharges are fine."],
				tips: ["Many laptops offer a 'maximum 80%' charge limit in their settings or manufacturer app — ideal if it lives plugged in at a desk."]
			},
			{
				heading: "Heat is the real killer",
				paragraphs: ["Fast-charging in a hot car, gaming on a bed with blocked vents, sun on the dashboard — these age batteries faster than any charging habit. A battery stored at 100% in heat can lose a fifth of its capacity in a year.", "If the device is hot to the touch while charging, remove the case, move it off soft surfaces, and let it breathe."]
			},
			{
				heading: "Charging overnight: fine",
				paragraphs: ["Devices stopped 'overcharging' a decade ago — they cut current at full and sip power to stay topped up. With optimized charging enabled, overnight charging is a non-issue.", "The one genuinely bad combo is cheap no-name chargers and cables. Stick to certified brands; a fire-risk bargain is no bargain."]
			},
			{
				heading: "Storing a device long-term",
				paragraphs: ["Leaving a battery at 0% for months can kill it permanently. For storage, charge to about 50%, power off, and keep it cool and dry. Top it back to 50% every few months."]
			},
			{
				heading: "When to replace",
				paragraphs: ["Below about 80% of original capacity (shown in battery health settings on phones and many laptops), runtime gets annoying and replacement is worth it. A battery swap on a good device is far cheaper than a new device — and keeps it out of landfill."]
			}
		]
	},
	{
		slug: "spot-phishing",
		title: "How to Spot a Phishing Email in 10 Seconds",
		excerpt: "The three checks that catch almost every scam, and exactly what to do if you already clicked.",
		category: "Security",
		minutes: 4,
		icon: Fish,
		chip: "pink",
		sections: [
			{
				heading: "Check 1: Who is it really from?",
				paragraphs: ["Display names lie — anyone can call themselves 'Amazon Support'. Tap or hover the sender's name to reveal the actual address. 'amazon-security@amaz0n-help.ru' is not Amazon, no matter how nice the logo looks.", "Watch for near-miss domains: micros0ft, paypa1, apple-id-support.com. Real companies email from their own simple domains."]
			},
			{
				heading: "Check 2: Is it manufacturing panic?",
				paragraphs: ["'Your account will be closed in 24 hours.' 'Unusual sign-in detected.' 'Payment failed — act now.' Urgency plus a threat is the signature move of every phishing campaign, because panic bypasses judgment.", "Real companies almost never demand immediate action by email. The panic is the tell — the moment you feel it, slow down on purpose."]
			},
			{
				heading: "Check 3: Where does the link actually go?",
				paragraphs: ["Hover (desktop) or long-press (mobile) any link before clicking and read the real destination. The text can say 'paypal.com' while the link goes anywhere.", "The safest habit of all: don't use the link at all. Open the official app or type the site's address yourself. If the problem is real, it will be waiting there too."],
				tips: ["Unexpected attachments — especially .zip, .html, or 'invoices' — get the same treatment. Verify with the sender through a separate channel first."]
			},
			{
				heading: "What real companies never ask for",
				paragraphs: ["Passwords, full card numbers, one-time codes, or remote access to your computer — by email, text, or phone. Microsoft does not call you about viruses. Your bank does not need you to 'verify' your password.", "Anyone asking for a code that was texted to you is trying to hijack your account in real time. Those codes are keys; never read them aloud."]
			},
			{
				heading: "If you already clicked or entered details",
				paragraphs: ["Don't panic — damage is fixable if you're fast. Change the password on the real site immediately (and anywhere you reused it). Turn on 2FA if it wasn't. If you entered card details, call the bank's number on the back of the card.", "If you ran an attachment, disconnect from the internet and run a full antivirus scan. Then report the phish — your email provider's 'report phishing' button genuinely trains the filters."]
			}
		]
	}
];
function getGuide(slug) {
	return guides.find((g) => g.slug === slug);
}
function searchGuides(query) {
	const q = query.trim().toLowerCase();
	if (!q) return guides;
	return guides.filter((g) => {
		const haystack = [
			g.title,
			g.excerpt,
			g.category,
			...g.sections.flatMap((s) => [
				s.heading,
				...s.paragraphs,
				...s.tips ?? []
			])
		].join(" ").toLowerCase();
		return q.split(/\s+/).every((word) => haystack.includes(word));
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-fuhFPXz5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var STORAGE_KEY = "omni-conversations-v1";
var ACTIVE_ID_KEY = "omni-active-conversation-id";
var LEGACY_KEY = "omni-ask-history";
function generateId() {
	return `conv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
function deriveTitle(messages) {
	const firstUser = messages.find((m) => m.role === "user");
	if (!firstUser || !firstUser.content.trim()) return "Untitled Chat";
	return "Untitled Chat";
}
async function syncConversationsWithSupabase() {
	if (typeof window === "undefined") return;
	try {
		const { data: sessionData } = await supabase.auth.getSession();
		const user = sessionData?.session?.user;
		if (!user) return;
		const { data: cloudConvs, error: pullError } = await supabase.from("conversations").select("local_id, title, messages, created_at, updated_at");
		if (pullError) {
			console.warn("Sync skipped: Conversations table might not exist yet.", pullError.message);
			return;
		}
		const localConvs = listConversations();
		const localMap = new Map(localConvs.map((c) => [c.id, c]));
		let hasChanges = false;
		if (cloudConvs && cloudConvs.length > 0) for (const row of cloudConvs) {
			const remoteConv = {
				id: row.local_id,
				title: row.title,
				createdAt: new Date(row.created_at).getTime(),
				updatedAt: new Date(row.updated_at).getTime(),
				messages: row.messages
			};
			const local = localMap.get(remoteConv.id);
			if (!local || local.updatedAt < remoteConv.updatedAt) {
				localMap.set(remoteConv.id, remoteConv);
				hasChanges = true;
			}
		}
		const toPush = Array.from(localMap.values());
		for (const conv of toPush) {
			const remote = cloudConvs?.find((c) => c.local_id === conv.id);
			const remoteUpdated = remote ? new Date(remote.updated_at).getTime() : 0;
			if (conv.updatedAt > remoteUpdated) await supabase.from("conversations").upsert({
				user_id: user.id,
				local_id: conv.id,
				title: conv.title,
				messages: conv.messages,
				created_at: new Date(conv.createdAt).toISOString(),
				updated_at: new Date(conv.updatedAt).toISOString()
			}, { onConflict: "user_id, local_id" });
		}
		if (hasChanges) {
			const merged = Array.from(localMap.values()).sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 100);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
			window.dispatchEvent(new CustomEvent("omni-conversations-updated"));
			const activeId = getActiveConversationId();
			if (activeId) window.dispatchEvent(new CustomEvent("omni-conversation-changed", { detail: { id: activeId } }));
		}
	} catch (err) {
		console.error("Error syncing conversations:", err);
	}
}
function listConversations() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) return parsed.sort((a, b) => b.updatedAt - a.updatedAt);
		}
		const legacyRaw = localStorage.getItem(LEGACY_KEY);
		if (legacyRaw) {
			const legacyMsgs = JSON.parse(legacyRaw);
			if (Array.isArray(legacyMsgs) && legacyMsgs.length > 0) {
				const initialConv = {
					id: generateId(),
					title: deriveTitle(legacyMsgs),
					createdAt: Date.now() - 36e5,
					updatedAt: Date.now(),
					messages: legacyMsgs
				};
				localStorage.setItem(STORAGE_KEY, JSON.stringify([initialConv]));
				localStorage.setItem(ACTIVE_ID_KEY, initialConv.id);
				return [initialConv];
			}
		}
	} catch {}
	return [];
}
function getActiveConversationId() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(ACTIVE_ID_KEY);
}
function setActiveConversationId(id) {
	if (typeof window === "undefined") return;
	if (id) localStorage.setItem(ACTIVE_ID_KEY, id);
	else localStorage.removeItem(ACTIVE_ID_KEY);
	window.dispatchEvent(new CustomEvent("omni-conversation-changed", { detail: { id } }));
}
function getConversation(id) {
	return listConversations().find((c) => c.id === id) ?? null;
}
function saveConversation(conversation) {
	if (typeof window === "undefined") return;
	try {
		const all = listConversations();
		const index = all.findIndex((c) => c.id === conversation.id);
		const updated = {
			...conversation,
			title: conversation.title || deriveTitle(conversation.messages),
			updatedAt: Date.now()
		};
		if (index >= 0) all[index] = updated;
		else all.unshift(updated);
		const trimmed = all.slice(0, 100);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
		window.dispatchEvent(new CustomEvent("omni-conversations-updated"));
		supabase.auth.getSession().then(({ data }) => {
			const user = data?.session?.user;
			if (user) supabase.from("conversations").upsert({
				user_id: user.id,
				local_id: updated.id,
				title: updated.title,
				messages: updated.messages,
				created_at: new Date(updated.createdAt).toISOString(),
				updated_at: new Date(updated.updatedAt).toISOString()
			}, { onConflict: "user_id, local_id" }).then();
		});
	} catch {}
}
function deleteConversation(id) {
	if (typeof window === "undefined") return;
	try {
		const all = listConversations().filter((c) => c.id !== id);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
		if (getActiveConversationId() === id) setActiveConversationId(all[0]?.id ?? null);
		window.dispatchEvent(new CustomEvent("omni-conversations-updated"));
		supabase.auth.getSession().then(({ data }) => {
			if (data?.session?.user) supabase.from("conversations").delete().eq("local_id", id).then();
		});
	} catch {}
}
function createNewConversation(initialPrompt) {
	const newConv = {
		id: generateId(),
		title: initialPrompt ? deriveTitle([{
			role: "user",
			content: initialPrompt
		}]) : "New Topic",
		createdAt: Date.now(),
		updatedAt: Date.now(),
		messages: initialPrompt ? [{
			role: "user",
			content: initialPrompt,
			timestamp: Date.now()
		}] : []
	};
	saveConversation(newConv);
	setActiveConversationId(newConv.id);
	return newConv;
}
function searchConversations(query, sourceList) {
	const all = sourceList ?? listConversations();
	const q = query.trim().toLowerCase();
	if (!q) return all.map((c) => ({
		conversation: c,
		matchedField: "title",
		matchedSnippet: c.messages.find((m) => m.role === "assistant")?.content.slice(0, 110) ?? c.messages[0]?.content.slice(0, 110) ?? "Empty conversation"
	}));
	const results = [];
	for (const conv of all) {
		if (conv.title.toLowerCase().includes(q)) {
			const firstMsg = conv.messages[0]?.content ?? "";
			results.push({
				conversation: conv,
				matchedField: "title",
				matchedSnippet: firstMsg.slice(0, 110)
			});
			continue;
		}
		const matchedMsg = conv.messages.find((m) => m.content.toLowerCase().includes(q));
		if (matchedMsg) {
			const idx = matchedMsg.content.toLowerCase().indexOf(q);
			const start = Math.max(0, idx - 40);
			const end = Math.min(matchedMsg.content.length, idx + q.length + 60);
			const snippet = `${start > 0 ? "…" : ""}${matchedMsg.content.slice(start, end)}${end < matchedMsg.content.length ? "…" : ""}`;
			results.push({
				conversation: conv,
				matchedField: "message",
				matchedSnippet: snippet
			});
		}
	}
	return results;
}
var _jsxFileName$7 = "/app/applet/src/components/ui/sonner.tsx";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 7,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName$6 = "/app/applet/src/components/omni/ThemeProvider.tsx";
var KEY = "omni-theme";
var ThemeCtx = (0, import_react.createContext)({
	theme: "light",
	setTheme: () => {},
	toggle: () => {}
});
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		let initial = "light";
		try {
			const stored = localStorage.getItem(KEY);
			if (stored === "light" || stored === "dark") initial = stored;
			else initial = "light";
		} catch {}
		setTheme(initial);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		try {
			localStorage.setItem(KEY, theme);
		} catch {}
	}, [theme]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeCtx.Provider, {
		value: {
			theme,
			setTheme,
			toggle: () => setTheme(theme === "dark" ? "light" : "dark")
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 38,
		columnNumber: 5
	}, this);
}
var useThemeMode = () => (0, import_react.useContext)(ThemeCtx);
var _jsxFileName$5 = "/app/applet/src/components/omni/ThemeToggle.tsx";
function ThemeToggle({ variant = "icon", className = "" }) {
	const { theme, toggle } = useThemeMode();
	const isDark = theme === "dark";
	if (variant === "switch") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		id: "theme-toggle-switch",
		type: "button",
		onClick: toggle,
		role: "switch",
		"aria-checked": isDark,
		"aria-label": `Switch to ${isDark ? "light" : "dark"} mode`,
		title: `Switch to ${isDark ? "light" : "dark"} mode`,
		className: `relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isDark ? "bg-surface-2" : "bg-neutral-200"} ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			layout: true,
			transition: {
				type: "spring",
				stiffness: 500,
				damping: 30
			},
			className: `flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-background shadow-sm transform ${isDark ? "translate-x-7 text-amber-300" : "translate-x-1 text-amber-500"}`,
			children: isDark ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { className: "h-3.5 w-3.5" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 35,
				columnNumber: 21
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { className: "h-3.5 w-3.5" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 35,
				columnNumber: 56
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 28,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 16,
		columnNumber: 7
	}, this);
	if (variant === "labeled") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		id: "theme-toggle-labeled",
		type: "button",
		onClick: toggle,
		"aria-label": `Switch to ${isDark ? "light" : "dark"} mode`,
		className: `flex items-center justify-between w-full px-4 py-2.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-sm font-medium ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-foreground",
				children: isDark ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { className: "h-4 w-4 text-amber-300" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 53,
					columnNumber: 15
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { className: "h-4 w-4 text-amber-500" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 55,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 51,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-foreground",
				children: isDark ? "Dark theme" : "Light theme"
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 58,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 50,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-xs text-muted-foreground capitalize",
			children: isDark ? "Switch to Light" : "Switch to Dark"
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 60,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 43,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		id: "theme-toggle-btn",
		type: "button",
		onClick: toggle,
		"aria-label": `Switch to ${isDark ? "light" : "dark"} mode`,
		title: `Switch to ${isDark ? "light" : "dark"} mode`,
		className: `relative grid h-9 w-9 place-items-center rounded-full border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-surface-1 text-neutral-700 dark:text-foreground hover:bg-neutral-200 dark:hover:bg-surface-2 transition-all duration-200 cursor-pointer active:scale-95 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			initial: {
				rotate: -45,
				scale: .7,
				opacity: 0
			},
			animate: {
				rotate: 0,
				scale: 1,
				opacity: 1
			},
			exit: {
				rotate: 45,
				scale: .7,
				opacity: 0
			},
			transition: { duration: .2 },
			className: "flex items-center justify-center",
			children: isDark ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { className: "h-4 w-4 text-amber-300 hover:text-amber-200 transition-colors" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 85,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { className: "h-4 w-4 text-neutral-800 hover:text-black transition-colors" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 87,
				columnNumber: 11
			}, this)
		}, theme, false, {
			fileName: _jsxFileName$5,
			lineNumber: 76,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 68,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/omni/AuthContext.tsx";
var GUEST_KEY = "omni-guest-profile";
var AuthContext = (0, import_react.createContext)(null);
function readGuestProfile() {
	try {
		const raw = localStorage.getItem(GUEST_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (parsed && parsed.username) return parsed;
	} catch {}
	return null;
}
function writeGuestProfile(profile) {
	try {
		if (profile) localStorage.setItem(GUEST_KEY, JSON.stringify(profile));
		else localStorage.removeItem(GUEST_KEY);
	} catch {}
}
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [authMode, setAuthMode] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const fetchProfile = (0, import_react.useCallback)(async (userId) => {
		const { data, error } = await supabase.from("profiles").select("id, email, username, avatar_url, onboarded").eq("id", userId).maybeSingle();
		if (error) return null;
		return data;
	}, []);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setSession(data.session);
			if (data.session) {
				setAuthMode("google");
				fetchProfile(data.session.user.id).then((p) => {
					if (!mounted) return;
					setProfile(p);
					setLoading(false);
				}).catch(() => {
					if (!mounted) return;
					setLoading(false);
				});
			} else {
				const guest = readGuestProfile();
				if (guest) {
					setAuthMode("guest");
					setProfile(guest);
				}
				setLoading(false);
			}
		}).catch(() => {
			if (!mounted) return;
			setLoading(false);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
			if (!mounted) return;
			setSession(newSession);
			if (newSession) {
				setAuthMode("google");
				setLoading(true);
				(async () => {
					try {
						const p = await fetchProfile(newSession.user.id);
						if (!mounted) return;
						setProfile(p);
						import("./conversationStore-D21NGJ6I.mjs").then((m) => m.syncConversationsWithSupabase());
					} finally {
						if (mounted) setLoading(false);
					}
				})();
			} else {
				setProfile(null);
				setAuthMode(null);
				setLoading(false);
			}
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, [fetchProfile]);
	const signInWithGoogle = (0, import_react.useCallback)(async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
				skipBrowserRedirect: true
			}
		});
		if (error) throw error;
		if (data?.url) {
			if (!window.open(data.url, "oauth_popup", "width=600,height=700")) toast.error("Please allow popups to sign in with Google");
		}
	}, []);
	const signInWithEmail = (0, import_react.useCallback)(async (email) => {
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: { redirectTo: window.location.origin }
		});
		if (error) return { error: error.message };
		return { error: null };
	}, []);
	const signInAsGuest = (0, import_react.useCallback)(() => {
		setAuthMode("guest");
		setProfile(null);
		setLoading(false);
	}, []);
	const completeOnboarding = (0, import_react.useCallback)(async (username, avatarUrl) => {
		if (authMode === "guest") {
			const guestProfile = {
				id: "guest",
				email: null,
				username,
				avatar_url: avatarUrl,
				onboarded: true
			};
			writeGuestProfile(guestProfile);
			setProfile(guestProfile);
			return;
		}
		if (!session) return;
		const { data, error } = await supabase.from("profiles").upsert({
			id: session.user.id,
			email: session.user.email ?? null,
			username,
			avatar_url: avatarUrl,
			onboarded: true,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).select("id, email, username, avatar_url, onboarded").single();
		if (error) throw error;
		setProfile(data);
	}, [session, authMode]);
	const updateProfile = (0, import_react.useCallback)(async (updates) => {
		if (authMode === "guest") {
			if (!profile) return;
			const updated = {
				...profile,
				...updates
			};
			writeGuestProfile(updated);
			setProfile(updated);
			return;
		}
		if (!session) return;
		const { data, error } = await supabase.from("profiles").update({
			...updates,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", session.user.id).select("id, email, username, avatar_url, onboarded").single();
		if (error) throw error;
		setProfile(data);
	}, [
		session,
		authMode,
		profile
	]);
	const signOut = (0, import_react.useCallback)(async () => {
		if (authMode === "guest") {
			writeGuestProfile(null);
			setProfile(null);
			setAuthMode(null);
			return;
		}
		await supabase.auth.signOut();
		setProfile(null);
		setSession(null);
		setAuthMode(null);
	}, [authMode]);
	const isGuest = authMode === "guest";
	const needsOnboarding = authMode === "guest" && !profile?.onboarded || !!session && (!profile || !profile.onboarded);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthContext.Provider, {
		value: {
			session,
			user: session?.user ?? null,
			profile,
			loading,
			needsOnboarding,
			isGuest,
			signInWithGoogle,
			signInWithEmail,
			signInAsGuest,
			completeOnboarding,
			updateProfile,
			signOut
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 237,
		columnNumber: 5
	}, this);
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
var _jsxFileName$3 = "/app/applet/src/components/omni/Sparkle.tsx";
function GeminiStar({ className = "h-5 w-5" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
			id: "gemini-star-grad",
			x1: "0%",
			y1: "0%",
			x2: "100%",
			y2: "100%",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
					offset: "0%",
					stopColor: "#4285F4"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 6,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
					offset: "50%",
					stopColor: "#9B72CB"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 7,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
					offset: "100%",
					stopColor: "#D96570"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 8,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 5,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 4,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
			d: "M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z",
			fill: "url(#gemini-star-grad)"
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 11,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 3,
		columnNumber: 5
	}, this);
}
function StudioMark({ className = "h-5 w-5" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GeminiStar, { className }, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 39,
		columnNumber: 10
	}, this);
}
function useNetworkStatus() {
	const [isOnline, setIsOnline] = (0, import_react.useState)(() => {
		if (typeof navigator !== "undefined") return navigator.onLine;
		return true;
	});
	const [isChecking, setIsChecking] = (0, import_react.useState)(false);
	const [lastChecked, setLastChecked] = (0, import_react.useState)(null);
	const checkConnection = (0, import_react.useCallback)(async () => {
		if (typeof window === "undefined") return true;
		if (!navigator.onLine) {
			setIsOnline(false);
			setLastChecked(Date.now());
			return false;
		}
		setIsChecking(true);
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 3500);
		try {
			const response = await fetch(`/robots.txt?_t=${Date.now()}`, {
				method: "HEAD",
				cache: "no-store",
				signal: controller.signal
			});
			clearTimeout(timeoutId);
			const online = response.ok || response.status === 304 || response.status === 200;
			setIsOnline(online);
			setLastChecked(Date.now());
			window.dispatchEvent(new CustomEvent("omni-network-status", { detail: { isOnline: online } }));
			return online;
		} catch {
			clearTimeout(timeoutId);
			const fallback = navigator.onLine;
			setIsOnline(fallback);
			setLastChecked(Date.now());
			return fallback;
		} finally {
			setIsChecking(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const handleOnline = () => {
			setIsOnline(true);
			checkConnection();
		};
		const handleOffline = () => {
			setIsOnline(false);
			setLastChecked(Date.now());
		};
		const handleCustomStatus = (e) => {
			const custom = e;
			if (typeof custom.detail?.isOnline === "boolean") setIsOnline(custom.detail.isOnline);
		};
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);
		window.addEventListener("omni-network-status", handleCustomStatus);
		const interval = setInterval(() => {
			if (document.visibilityState === "visible") checkConnection();
		}, 3e4);
		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
			window.removeEventListener("omni-network-status", handleCustomStatus);
			clearInterval(interval);
		};
	}, [checkConnection]);
	return {
		isOnline,
		isChecking,
		checkConnection,
		lastChecked
	};
}
var _jsxFileName$2 = "/app/applet/src/components/omni/AuthScreen.tsx";
function GoogleIcon({ className = "h-5 w-5" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		className,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				fill: "#4285F4",
				d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 12,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				fill: "#34A853",
				d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 16,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				fill: "#FBBC05",
				d: "M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 20,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				fill: "#EA4335",
				d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 24,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 11,
		columnNumber: 5
	}, this);
}
function AuthScreen() {
	const { signInWithGoogle, signInWithEmail, signInAsGuest } = useAuth();
	const { isOnline } = useNetworkStatus();
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [emailMode, setEmailMode] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	async function handleGoogle() {
		if (!isOnline) {
			toast.error("Internet connection required for Google sign-in. Use Continue as Guest to use offline tools.");
			return;
		}
		setBusy("google");
		try {
			await signInWithGoogle();
		} catch {
			toast.error("Google sign-in failed. Please try again.");
			setBusy(null);
		}
	}
	async function handleEmail(e) {
		e.preventDefault();
		if (!isOnline) {
			toast.error("Internet connection required for Email sign-in. Use Continue as Guest to use offline tools.");
			return;
		}
		if (!email.trim()) return;
		setBusy("email");
		const { error } = await signInWithEmail(email.trim());
		if (error) {
			toast.error(error);
			setBusy(null);
		} else {
			toast.success("Check your inbox for a sign-in link.");
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			"aria-hidden": true,
			className: "warm-canvas-backdrop pointer-events-none fixed inset-0 z-0"
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 77,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .5,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "relative z-10 w-full max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-bar rounded-3xl px-7 py-10 sm:px-10 sm:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "relative grid h-[68px] w-[68px] place-items-center rounded-2xl border border-primary/20 bg-primary-container text-primary shadow-[var(--shadow-plush)]",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StudioMark, { className: "relative h-9 w-9" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 88,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 87,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl",
								children: "Welcome to OmniSuite"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 90,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 max-w-xs text-sm leading-6 text-muted-foreground",
								children: "Your private assistant for exploring, creating, and getting things done."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 93,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 86,
						columnNumber: 11
					}, this),
					!isOnline && /* @__PURE__ */ (void 0)("div", {
						className: "mt-6 flex items-start gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200",
						children: [/* @__PURE__ */ (void 0)(WifiOff, { className: "h-4 w-4 shrink-0 text-amber-400 mt-0.5" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 100,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("strong", {
							className: "font-semibold text-amber-300",
							children: "Offline Mode Active:"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 102,
							columnNumber: 17
						}, this), " You can continue as a guest to use on-device tools (QR Studio, Doc Scanner, Local OCR, and Field Guides) without internet."] }, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 101,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 99,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-7 space-y-3",
						children: [
							!isOnline ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: signInAsGuest,
								disabled: busy !== null,
								className: "flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-400 px-5 py-3.5 text-sm font-bold text-background shadow-md transition hover:bg-amber-300 active:scale-[0.98]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 116,
									columnNumber: 17
								}, this), "Continue in Offline Mode (Guest)"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 111,
								columnNumber: 15
							}, this) : null,
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: handleGoogle,
								disabled: busy !== null || !isOnline,
								className: `flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 text-sm font-bold text-foreground shadow-sm transition hover:bg-surface-2 hover:shadow-[var(--shadow-plush)] active:scale-[0.98] ${!isOnline ? "opacity-50 cursor-not-allowed" : ""}`,
								children: [
									busy === "google" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-5 w-5 animate-spin" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 128,
										columnNumber: 36
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GoogleIcon, {}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 128,
										columnNumber: 83
									}, this),
									"Continue with Google ",
									!isOnline && "(Online only)"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 121,
								columnNumber: 13
							}, this),
							emailMode ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
								onSubmit: handleEmail,
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "email",
									required: true,
									value: email,
									disabled: !isOnline,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "you@example.com",
									className: "w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground disabled:opacity-50"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 134,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "submit",
									disabled: busy !== null || !isOnline,
									className: "flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50",
									children: [busy === "email" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-5 w-5 animate-spin" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 149,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 151,
										columnNumber: 21
									}, this), "Send sign-in link"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 143,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 133,
								columnNumber: 15
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setEmailMode(true),
								disabled: busy !== null || !isOnline,
								className: `flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-transparent px-5 py-3.5 text-sm font-bold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground active:scale-[0.98] ${!isOnline ? "opacity-50 cursor-not-allowed" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 164,
										columnNumber: 17
									}, this),
									"Continue with email ",
									!isOnline && "(Online only)"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 157,
								columnNumber: 15
							}, this),
							isOnline && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
								className: "relative pt-1",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "absolute inset-0 flex items-center",
									children: /* @__PURE__ */ (void 0)("span", { className: "w-full border-t border-border" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 173,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 172,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "relative flex justify-center",
									children: /* @__PURE__ */ (void 0)("span", {
										className: "bg-card px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: "or"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 176,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 175,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 171,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: signInAsGuest,
								disabled: busy !== null,
								className: "flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-transparent px-5 py-3.5 text-sm font-bold text-muted-foreground transition hover:bg-surface-2 hover:text-foreground active:scale-[0.98] disabled:opacity-50",
								children: [/* @__PURE__ */ (void 0)(UserRound, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 187,
									columnNumber: 19
								}, this), "Continue as guest"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 182,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 170,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 109,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-7 flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-3.5 w-3.5 shrink-0" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 195,
							columnNumber: 13
						}, this), "Your account helps us personalize your OmniSuite experience."]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 194,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 85,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 79,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 76,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/omni/OnboardingScreen.tsx";
function initialsFrom(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "U";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function readFileAsDataURL(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read file."));
		reader.readAsDataURL(file);
	});
}
function OnboardingScreen() {
	const { session, isGuest, completeOnboarding } = useAuth();
	const [username, setUsername] = (0, import_react.useState)("");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	async function handleUpload(file) {
		if (!file.type.startsWith("image/")) {
			toast.error("Please upload an image file.");
			return;
		}
		if (file.size > 2097152) {
			toast.error("Avatar must be under 2 MB.");
			return;
		}
		setBusy(true);
		try {
			if (isGuest || !session) {
				const dataUrl = await readFileAsDataURL(file);
				setAvatarUrl(dataUrl);
				toast.success("Avatar selected.");
			} else {
				const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
				const path = `${session.user.id}/avatar.${ext}`;
				const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
				if (upErr) throw upErr;
				const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
				setAvatarUrl(urlData.publicUrl);
				toast.success("Avatar uploaded.");
			}
		} catch {
			toast.error("Could not upload avatar. You can skip this step.");
		} finally {
			setBusy(false);
		}
	}
	async function handleContinue(skipAvatar) {
		const name = username.trim();
		if (!name) {
			toast.error("Please enter a username to continue.");
			return;
		}
		setBusy(true);
		try {
			await completeOnboarding(name, skipAvatar ? null : avatarUrl);
		} catch {
			toast.error("Could not save your profile. Please try again.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			"aria-hidden": true,
			className: "warm-canvas-backdrop pointer-events-none fixed inset-0 z-0 opacity-70"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 81,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .5,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "relative z-10 w-full max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-bar rounded-3xl px-7 py-10 sm:px-10 sm:py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] font-bold uppercase tracking-[0.18em] text-primary",
								children: "1 of 1"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 94,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl",
								children: "Let’s personalize OmniSuite"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 95,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-sm leading-6 text-muted-foreground",
								children: "Tell us a little about yourself so we can make your experience feel more personal."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 98,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 93,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-9",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "block text-sm font-bold text-foreground",
							children: "What should we call you?"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 104,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleContinue(false),
							placeholder: "Enter your username",
							maxLength: 30,
							className: "mt-2 w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 107,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 103,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-sm font-bold text-foreground",
								children: "Choose an avatar"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 119,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Optional — upload an image or use your initials."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 120,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex items-center gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "relative shrink-0",
										children: [avatarUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: avatarUrl,
											alt: "Avatar preview",
											className: "h-20 w-20 rounded-2xl border border-border object-cover"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 127,
											columnNumber: 19
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "grid h-20 w-20 place-items-center rounded-2xl border border-border bg-primary-container text-xl font-extrabold text-primary-container-foreground",
											children: initialsFrom(username || "U")
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 133,
											columnNumber: 19
										}, this), avatarUrl && /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setAvatarUrl(null),
											"aria-label": "Remove avatar",
											className: "absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-foreground text-background shadow",
											children: /* @__PURE__ */ (void 0)(X, { className: "h-3 w-3" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 144,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 138,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 125,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex flex-col gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											onClick: () => fileRef.current?.click(),
											disabled: busy,
											className: "inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground transition hover:bg-surface-2 active:scale-95 disabled:opacity-50",
											children: [busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-4 w-4 animate-spin" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 156,
												columnNumber: 21
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "h-4 w-4" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 158,
												columnNumber: 21
											}, this), "Upload image"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 149,
											columnNumber: 17
										}, this), !avatarUrl && /* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center gap-1.5 text-[11px] text-muted-foreground",
											children: [/* @__PURE__ */ (void 0)(Camera, { className: "h-3 w-3" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 164,
												columnNumber: 21
											}, this), " Or continue with initials"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 163,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 148,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										ref: fileRef,
										type: "file",
										accept: "image/*",
										className: "hidden",
										onChange: (e) => {
											const file = e.target.files?.[0];
											if (file) handleUpload(file);
											e.target.value = "";
										}
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 168,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 124,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 118,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-9 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => handleContinue(false),
							disabled: busy,
							className: "flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50",
							children: [busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-5 w-5 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 189,
								columnNumber: 23
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 189,
								columnNumber: 70
							}, this), "Continue to OmniSuite"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 183,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => handleContinue(true),
							disabled: busy,
							className: "w-full rounded-2xl px-5 py-3 text-sm font-bold text-muted-foreground transition hover:text-foreground active:scale-[0.98] disabled:opacity-50",
							children: "Skip avatar"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 192,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 182,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 92,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 86,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 80,
		columnNumber: 5
	}, this);
}
var styles_default = "/assets/styles-Ce1zr4N9.css";
var _jsxFileName = "/app/applet/src/routes/__root.tsx";
function MobileTopBar({ toggleDrawer }) {
	const { profile } = useAuth();
	const [chatTitle, setChatTitle] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		function updateTitle() {
			const id = getActiveConversationId();
			if (id) {
				const conv = getConversation(id);
				if (conv && conv.messages.length > 0) {
					setChatTitle(conv.title !== "Untitled Chat" ? conv.title : conv.messages[0].content.slice(0, 30) + (conv.messages[0].content.length > 30 ? "..." : ""));
					return;
				}
			}
			setChatTitle(null);
		}
		updateTitle();
		window.addEventListener("omni-conversation-changed", updateTitle);
		window.addEventListener("omni-conversations-updated", updateTitle);
		return () => {
			window.removeEventListener("omni-conversation-changed", updateTitle);
			window.removeEventListener("omni-conversations-updated", updateTitle);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between px-4 bg-background/95 backdrop-blur-md border-b border-black/10 dark:border-white/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				onClick: toggleDrawer,
				className: "p-2 -ml-2 text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-200 cursor-pointer active:scale-[0.97]",
				"aria-label": "Toggle navigation drawer",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "h-6 w-6" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 px-3 truncate text-center",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-base font-semibold text-foreground truncate",
					children: chatTitle || "OmniSuite"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeToggle, { variant: "icon" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/settings",
					title: "User Profile",
					className: "grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-[0.97]",
					children: profile?.username?.charAt(0).toUpperCase() || "U"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 86,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 71,
		columnNumber: 5
	}, this);
}
function MobileDrawer({ isOpen, closeDrawer }) {
	const { profile } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (void 0)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: closeDrawer,
		className: "fixed inset-0 bg-black/60 z-50 sm:hidden"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 108,
		columnNumber: 11
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 106,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `fixed top-0 bottom-0 left-0 w-[300px] bg-card border-r border-black/10 dark:border-white/10 z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between p-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					onClick: closeDrawer,
					className: "text-xl font-bold text-foreground hover:text-primary transition-colors",
					children: "OmniSuite"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: closeDrawer,
					className: "p-2 text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-6 w-6" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 122,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 overflow-y-auto px-3 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/chat",
						onClick: closeDrawer,
						className: "w-full flex items-center gap-3 px-4 py-3 bg-surface-1 hover:bg-surface-2 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97] mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-5 w-5 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 13
						}, this), "New chat"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 139,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							window.dispatchEvent(new CustomEvent("omni-open-search"));
							closeDrawer();
						},
						className: "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-muted-foreground hover:text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97] mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 13
						}, this), "Search chats"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 148,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/chat",
								onClick: closeDrawer,
								className: "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "h-5 w-5 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Vlad Bot" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 167,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/downloader",
								onClick: closeDrawer,
								className: "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "h-5 w-5 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 174,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Media Downloader" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 175,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/scanner",
								onClick: closeDrawer,
								className: "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scan, { className: "h-5 w-5 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 182,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Doc Scanner" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 183,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/qr",
								onClick: closeDrawer,
								className: "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, { className: "h-5 w-5 text-pink-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 190,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "QR Code Studio" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 191,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 185,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/ocr",
								onClick: closeDrawer,
								className: "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { className: "h-5 w-5 text-cyan-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Local OCR" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 199,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/dakphraser",
								onClick: closeDrawer,
								className: "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "h-5 w-5 text-purple-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 206,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "DakPhraser" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/guides",
								onClick: closeDrawer,
								className: "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl text-foreground font-medium transition-all duration-200 cursor-pointer active:scale-[0.97]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "h-5 w-5 text-orange-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Field Guides" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 215,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 160,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 138,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-3 border-t border-black/10 dark:border-white/10 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeToggle, { variant: "labeled" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 222,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/settings",
					onClick: closeDrawer,
					title: "User Profile",
					className: "flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-2xl transition-all duration-200 cursor-pointer active:scale-[0.97]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-semibold text-lg",
							children: profile?.username?.charAt(0).toUpperCase() || "U"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1 text-foreground font-medium truncate",
							children: profile?.username || "Settings"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 232,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "h-5 w-5 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 223,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 221,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 119,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 104,
		columnNumber: 5
	}, this);
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center px-6 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md p-10 text-center text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-4xl font-extrabold",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 247,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-muted-foreground",
					children: "This page doesn't exist yet."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 248,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "mt-6 inline-block rounded-full bg-card hover:bg-surface-3 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors",
					children: "Back to Home"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 249,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 246,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 245,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center px-6 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md p-10 text-center text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl font-extrabold",
					children: "Something broke"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 264,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 break-words text-sm text-muted-foreground",
					children: error.message
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 265,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "mt-6 inline-block rounded-full bg-card hover:bg-surface-3 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors",
					children: "Back to Home"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 266,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 263,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 262,
		columnNumber: 5
	}, this);
}
function AuthGate({ children }) {
	const { loading, session, isGuest, needsOnboarding } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 283,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 282,
		columnNumber: 7
	}, this);
	if (!(!!session || isGuest)) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthScreen, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 289,
		columnNumber: 30
	}, this);
	if (needsOnboarding) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OnboardingScreen, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 290,
		columnNumber: 31
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 291,
		columnNumber: 10
	}, this);
}
function Shell() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined" && "serviceWorker" in navigator) window.addEventListener("load", () => {
			navigator.serviceWorker.register("/sw.js").then((reg) => {
				console.log("[OmniSuite] ServiceWorker registered with scope:", reg.scope);
			}).catch((err) => {
				console.warn("[OmniSuite] ServiceWorker registration skipped/failed:", err);
			});
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthGate, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative min-h-screen overflow-x-hidden bg-background text-foreground font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			"aria-hidden": "true",
			className: "pointer-events-none fixed inset-0 z-0 overflow-hidden select-none",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "absolute inset-0 dark:opacity-100 opacity-60 transition-opacity duration-300",
				style: { background: `linear-gradient(to bottom, var(--background) 60%, var(--surface-2) 100%)` }
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 324,
				columnNumber: 15
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 320,
			columnNumber: 13
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative z-10 flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTopBar, { toggleDrawer: () => setDrawerOpen(true) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 333,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileDrawer, {
					isOpen: drawerOpen,
					closeDrawer: () => setDrawerOpen(false)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 334,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 relative mt-16",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							initial: {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -6
							},
							transition: {
								duration: .28,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "h-full",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 346,
								columnNumber: 21
							}, this)
						}, path, false, {
							fileName: _jsxFileName,
							lineNumber: 338,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 337,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 336,
					columnNumber: 15
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 332,
			columnNumber: 13
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 319,
		columnNumber: 11
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.a, {
		drag: true,
		dragMomentum: false,
		href: "https://wa.me/233208723497",
		target: "_blank",
		rel: "noopener noreferrer",
		className: "fixed bottom-[calc(1.5rem+2in)] right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform",
		title: "Contact on WhatsApp",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			viewBox: "0 0 24 24",
			fill: "currentColor",
			className: "h-7 w-7",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 363,
				columnNumber: 15
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 362,
			columnNumber: 13
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 353,
		columnNumber: 11
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 318,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 317,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, { position: "top-center" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 368,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 316,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 377,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 376,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shell, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 380,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 381,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 379,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 375,
		columnNumber: 5
	}, this);
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no"
			},
			{ title: "OmniSuite" },
			{
				name: "description",
				content: "AI tech navigator and private in-browser offline tools for QR codes, document scanning, OCR, and media downloading."
			},
			{
				property: "og:title",
				content: "OmniSuite"
			},
			{
				property: "og:description",
				content: "AI tech navigator and private in-browser offline tools for QR codes, document scanning, OCR, and media downloading."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "theme-color",
				content: "#000000"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "manifest",
				href: "/manifest.json"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/icon.svg"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
var $$splitComponentImporter$10 = () => import("./routes-CiPhwFwK.mjs");
var Route$11 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./chat-D6YLR2ff.mjs");
var Route$10 = createFileRoute("/chat")({
	head: () => ({ meta: [
		{ title: "Assistant" },
		{
			name: "description",
			content: "Chat with an AI tech navigator and jump into QR, document scanning, OCR and downloader tools — all in one dark, private workspace."
		},
		{
			property: "og:title",
			content: "Assistant"
		},
		{
			property: "og:description",
			content: "AI chat plus private in-browser tools for QR codes, documents, OCR and media."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./dakphraser-CZEibtp2.mjs");
var Route$9 = createFileRoute("/dakphraser")({
	head: () => ({ meta: [
		{ title: "DakPhraser — AI Paraphraser & Rewriter" },
		{
			name: "description",
			content: "Rewrite any text with DakPhraser: formal, casual, concise, academic or creative tones, multiple variants and one-tap copy."
		},
		{
			property: "og:title",
			content: "DakPhraser — AI Paraphraser & Rewriter"
		},
		{
			property: "og:description",
			content: "AI rewriting in seven tones with side-by-side variants and instant copy."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./downloader-DicaNKOS.mjs");
var Route$8 = createFileRoute("/downloader")({
	head: () => ({ meta: [
		{ title: "Media Downloader — YouTube, Instagram & TikTok" },
		{
			name: "description",
			content: "Paste a YouTube, Instagram or TikTok link, pick 480p, 720p or 1080p and download the video for free."
		},
		{
			property: "og:title",
			content: "Media Downloader — YouTube, Instagram & TikTok"
		},
		{
			property: "og:description",
			content: "Free link downloader with 480p, 720p and 1080p quality options."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./guides-BpFdqjYS.mjs");
var Route$7 = createFileRoute("/guides")({
	head: () => ({ meta: [
		{ title: "Tech Guides — Fix Everyday Computer Problems" },
		{
			name: "description",
			content: "Short, practical guides for slow PCs, overheating laptops, Wi-Fi trouble, backups and staying safe online — plain language, no jargon."
		},
		{
			property: "og:title",
			content: "Tech Guides — Fix Everyday Computer Problems"
		},
		{
			property: "og:description",
			content: "Practical, jargon-free guides for the computer problems people actually hit."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var Route$6 = createFileRoute("/hub")({ beforeLoad: () => {
	throw redirect({ to: "/" });
} });
var $$splitComponentImporter$5 = () => import("./ocr-DJCAu3bj.mjs");
var Route$5 = createFileRoute("/ocr")({
	head: () => ({ meta: [
		{ title: "OCR Text Extractor — OmniSuite" },
		{
			name: "description",
			content: "Upload or photograph a document and pull out editable text instantly, with copy and .txt download — processed on your device."
		},
		{
			property: "og:title",
			content: "OCR Text Extractor — OmniSuite"
		},
		{
			property: "og:description",
			content: "Extract editable text from photos of documents, receipts and books."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./qr-DXc38wON.mjs");
var Route$4 = createFileRoute("/qr")({
	head: () => ({ meta: [
		{ title: "QR Studio — OmniSuite" },
		{
			name: "description",
			content: "Design styled QR codes with gradients, logos and custom shapes, or scan codes with your camera or an uploaded image."
		},
		{
			property: "og:title",
			content: "QR Studio — OmniSuite"
		},
		{
			property: "og:description",
			content: "Create and scan QR codes entirely in your browser."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./scanner-Cqu0266J.mjs");
var Route$3 = createFileRoute("/scanner")({
	head: () => ({ meta: [
		{ title: "Document Scanner — OmniSuite" },
		{
			name: "description",
			content: "Turn photos of pages into clean black-and-white scans, reorder them and export a combined PDF — entirely in your browser."
		},
		{
			property: "og:title",
			content: "Document Scanner — OmniSuite"
		},
		{
			property: "og:description",
			content: "Photo to document: scan filters, page ordering and one-tap PDF export."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-0xi8-Kte.mjs");
var Route$2 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./auth.callback-DP4yW6w0.mjs");
var Route$1 = createFileRoute("/auth/callback")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./guides_._slug-DVTa-3Vl.mjs");
var Route = createFileRoute("/guides_/$slug")({
	loader: ({ params }) => {
		const guide = getGuide(params.slug);
		if (!guide) throw notFound();
		return guide;
	},
	head: ({ loaderData }) => ({ meta: [
		{ title: loaderData ? `${loaderData.title} — OmniSuite Guides` : "Guide — OmniSuite" },
		{
			name: "description",
			content: loaderData?.excerpt ?? "A practical, jargon-free tech guide from OmniSuite."
		},
		{
			property: "og:title",
			content: loaderData ? `${loaderData.title} — OmniSuite Guides` : "Guide — OmniSuite"
		},
		{
			property: "og:description",
			content: loaderData?.excerpt ?? "A practical, jargon-free tech guide from OmniSuite."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$11.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$12
	}),
	ChatRoute: Route$10.update({
		id: "/chat",
		path: "/chat",
		getParentRoute: () => Route$12
	}),
	DakphraserRoute: Route$9.update({
		id: "/dakphraser",
		path: "/dakphraser",
		getParentRoute: () => Route$12
	}),
	DownloaderRoute: Route$8.update({
		id: "/downloader",
		path: "/downloader",
		getParentRoute: () => Route$12
	}),
	GuidesRoute: Route$7.update({
		id: "/guides",
		path: "/guides",
		getParentRoute: () => Route$12
	}),
	HubRoute: Route$6.update({
		id: "/hub",
		path: "/hub",
		getParentRoute: () => Route$12
	}),
	OcrRoute: Route$5.update({
		id: "/ocr",
		path: "/ocr",
		getParentRoute: () => Route$12
	}),
	QrRoute: Route$4.update({
		id: "/qr",
		path: "/qr",
		getParentRoute: () => Route$12
	}),
	ScannerRoute: Route$3.update({
		id: "/scanner",
		path: "/scanner",
		getParentRoute: () => Route$12
	}),
	SettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$12
	}),
	AuthCallbackRoute: Route$1.update({
		id: "/auth/callback",
		path: "/auth/callback",
		getParentRoute: () => Route$12
	}),
	GuidesSlugRoute: Route.update({
		id: "/guides_/$slug",
		path: "/guides/$slug",
		getParentRoute: () => Route$12
	})
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { createNewConversation as a, getConversation as c, searchConversations as d, setActiveConversationId as f, supabase as g, searchGuides as h, useAuth as i, listConversations as l, guides as m, Route as n, deleteConversation as o, syncConversationsWithSupabase as p, useNetworkStatus as r, getActiveConversationId as s, router_exports as t, saveConversation as u };

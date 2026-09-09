// Curated Open-Source Intelligence (OSINT) & Digital Forensics Information Gathering Arsenal.
// Sourced directly from GitHub's premier open-source investigative and intelligence toolchains.
// Used for digital footprint analysis, suspect intelligence, asset discovery, and forensic investigation.

export type OsintCategory =
  | "username"
  | "email"
  | "phone"
  | "socmint"
  | "metadata"
  | "network"
  | "breach";

export interface OsintTool {
  id: string;
  name: string;
  githubOwner: string;
  githubRepo: string;
  githubUrl: string;
  stars: string;
  category: OsintCategory;
  categoryLabel: string;
  targetVector: string;
  tagline: string;
  description: string;
  whatItExtracts: string[];
  cliCommand: string;
  cliFlags: { flag: string; purpose: string }[];
  terminalSim: {
    command: string;
    outputLines: { text: string; type?: "info" | "success" | "warn" | "accent" | "dim" }[];
  };
  forensicStandard: string;
}

export interface OsintWorkflowStep {
  toolId: string;
  action: string;
  outputPreview: string;
  status: "completed" | "running" | "pending";
}

export interface OsintWorkflow {
  id: string;
  targetType: string;
  title: string;
  scenario: string;
  sampleTarget: string;
  steps: OsintWorkflowStep[];
  extractedEntities: {
    type: string;
    value: string;
    confidence: string;
  }[];
  verdict: string;
}

export const OSINT_CATEGORIES: { id: OsintCategory | "all"; label: string; icon: string; count?: number }[] = [
  { id: "all", label: "All Arsenal", icon: "Terminal" },
  { id: "username", label: "Username & Identity", icon: "UserSearch" },
  { id: "email", label: "Email & Cloud Footprint", icon: "Mail" },
  { id: "phone", label: "Phone & Carrier Intel", icon: "Phone" },
  { id: "socmint", label: "Social Media (SOCMINT)", icon: "Share2" },
  { id: "metadata", label: "EXIF & Document Forensics", icon: "FileSearch" },
  { id: "network", label: "Domain & Infrastructure", icon: "Network" },
  { id: "breach", label: "Breach & Secret Leaks", icon: "KeyRound" },
];

export const OSINT_TOOLS: OsintTool[] = [
  // --- 1. USERNAME & IDENTITY ---
  {
    id: "sherlock",
    name: "Sherlock",
    githubOwner: "sherlock-project",
    githubRepo: "sherlock",
    githubUrl: "https://github.com/sherlock-project/sherlock",
    stars: "62k+",
    category: "username",
    categoryLabel: "Username & Identity",
    targetVector: "Username / Online Alias",
    tagline: "Hunt down social media accounts by username across 400+ platforms in parallel.",
    description:
      "Sherlock is the industry-standard OSINT utility for locating target accounts across hundreds of online services. It tests for username registration without false positives through regex signature matching and HTTP status validation.",
    whatItExtracts: [
      "Active accounts across 400+ social networks, forums, and developer hubs",
      "Direct profile URLs with verified HTTP 200 responses",
      "Cross-platform handle persistence mapping for pseudonym analysis",
      "High-speed asynchronous probing with rate-limit evasion",
    ],
    cliCommand: "sherlock target_alias --timeout 5 --print-found --csv",
    cliFlags: [
      { flag: "--timeout <sec>", purpose: "HTTP request timeout to bypass slow tarpits" },
      { flag: "--print-found", purpose: "Filter output strictly to confirmed live profiles" },
      { flag: "--csv", purpose: "Export forensic chain-of-custody CSV spreadsheet" },
      { flag: "--tor", purpose: "Route all inquiries through Tor circuit for anonymity" },
    ],
    terminalSim: {
      command: "sherlock target_alias --print-found",
      outputLines: [
        { text: "[*] Checking username target_alias across 400+ services...", type: "info" },
        { text: "[+] GitHub: https://github.com/target_alias", type: "success" },
        { text: "[+] Twitter/X: https://x.com/target_alias", type: "success" },
        { text: "[+] Reddit: https://www.reddit.com/user/target_alias", type: "success" },
        { text: "[+] Telegram: https://t.me/target_alias", type: "success" },
        { text: "[+] HackerNews: https://news.ycombinator.com/user?id=target_alias", type: "success" },
        { text: "[+] Docker Hub: https://hub.docker.com/u/target_alias", type: "success" },
        { text: "[*] Search completed. 6 live accounts identified with positive attribution.", type: "dim" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §6 (Identification of Evidence)",
  },
  {
    id: "maigret",
    name: "Maigret",
    githubOwner: "soxoj",
    githubRepo: "maigret",
    githubUrl: "https://github.com/soxoj/maigret",
    stars: "15k+",
    category: "username",
    categoryLabel: "Username & Identity",
    targetVector: "Username & Dossier Compilation",
    tagline: "Deep OSINT dossier builder scraping bio, avatars, linked IDs, and metadata across 3,000+ sites.",
    description:
      "Named after the fictional detective Jules Maigret, this advanced Sherlock fork goes significantly deeper. It extracts user bio information, avatar hashes, country codes, full names, and linked accounts from profile HTML tags to build an interactive investigative dossier.",
    whatItExtracts: [
      "Comprehensive dossier across 3,000+ sites including obscure forums & localized portals",
      "Target real names, geo-tags, bios, and profile avatars extracted directly from HTML",
      "Visual HTML mind-map graph and GraphML format for Maltego import",
      "Recursive scanning on discovered secondary handles",
    ],
    cliCommand: "maigret target_handle -a --html --pdf --graph",
    cliFlags: [
      { flag: "-a, --all-sites", purpose: "Scan maximal database of 3,000+ services" },
      { flag: "--html", purpose: "Generate interactive browser dossier with parsed profiles" },
      { flag: "--pdf", purpose: "Generate printable court-admissible PDF intelligence summary" },
      { flag: "--graph", purpose: "Build relationship graph showing platform clusters" },
    ],
    terminalSim: {
      command: "maigret target_handle --parse-info",
      outputLines: [
        { text: "[*] Starting deep dossier collection on target_handle...", type: "info" },
        { text: "[+] Confirmed: GitHub (Name: Tarik I., Location: IN, Bio: AI & Cyber)", type: "success" },
        { text: "[+] Confirmed: Steam (ID: 76561198..., Joined: 2019)", type: "success" },
        { text: "[+] Confirmed: Pinterest (Bio matched, avatar perceptual hash 99.1%)", type: "accent" },
        { text: "[!] Correlated secondary handle: @tarik_dev across 3 developer boards", type: "warn" },
        { text: "[*] Dossier compiled: report_target_handle.html (24 positive nodes)", type: "dim" },
      ],
    },
    forensicStandard: "NIST SP 800-86 (Digital Evidence Compilation)",
  },
  {
    id: "blackbird",
    name: "Blackbird",
    githubOwner: "p1ngul1n0",
    githubRepo: "blackbird",
    githubUrl: "https://github.com/p1ngul1n0/blackbird",
    stars: "4.5k+",
    category: "username",
    categoryLabel: "Username & Identity",
    targetVector: "Username / Fast Profiling",
    tagline: "High-speed async Python OSINT intelligence tool searching 600+ platforms in under 30 seconds.",
    description:
      "Blackbird is designed for investigators who require extreme velocity. Built on Python aiohttp, it parallelizes thousands of HTTP queries to discover target accounts across 600+ platforms with minimal network signature.",
    whatItExtracts: [
      "Fast confirmation of account existence across 600+ websites",
      "Response latency analytics to detect geo-distributed CDN caching",
      "JSON export structured for ingestion into SIEM / threat intelligence platforms",
      "Metadata tags including account created dates where public",
    ],
    cliCommand: "python3 blackbird.py -u target_alias --csv",
    cliFlags: [
      { flag: "-u <username>", purpose: "Specify target user handle" },
      { flag: "--csv", purpose: "Save results to structured spreadsheet" },
      { flag: "--proxy <ip:port>", purpose: "Route queries via rotating residential proxies" },
    ],
    terminalSim: {
      command: "python3 blackbird.py -u suspect_99",
      outputLines: [
        { text: "[*] Blackbird v2.1: Probing 612 services with 50 async workers...", type: "info" },
        { text: "[+] Found: Spotify -> https://open.spotify.com/user/suspect_99", type: "success" },
        { text: "[+] Found: SoundCloud -> https://soundcloud.com/suspect_99", type: "success" },
        { text: "[+] Found: Gitlab -> https://gitlab.com/suspect_99", type: "success" },
        { text: "[*] Execution finished in 14.8 seconds (3 live hits).", type: "dim" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 (Rapid Digital Evidence Triaging)",
  },
  {
    id: "social-analyzer",
    name: "Social Analyzer",
    githubOwner: "qeeqbox",
    githubRepo: "social-analyzer",
    githubUrl: "https://github.com/qeeqbox/social-analyzer",
    stars: "12k+",
    category: "username",
    categoryLabel: "Username & Identity",
    targetVector: "Persona & Linguistic Footprint",
    tagline: "API, CLI & Web app for analyzing profile bio, image similarity, and linguistic patterns across 1000+ sites.",
    description:
      "Social Analyzer is an intelligence suite for finding a person profile across 1000+ social media websites. It uses advanced word/token extraction, NLP pattern matching, and profile bio correlation to verify if two accounts actually belong to the exact same human suspect.",
    whatItExtracts: [
      "Profile verification across 1,000+ social and content platforms",
      "Bio linguistic matching and pattern identification",
      "Avatar extraction and metadata correlation",
      "Web GUI and REST API integration for intelligence analysis",
    ],
    cliCommand: "python3 app.py --username target_alias --websites all --metadata",
    cliFlags: [
      { flag: "--username <name>", purpose: "Target persona username to analyze" },
      { flag: "--websites all", purpose: "Scan across all 1000+ configured services" },
      { flag: "--metadata", purpose: "Extract page titles, meta descriptions, and image URLs" },
    ],
    terminalSim: {
      command: "python3 app.py --username target_alias --websites all --metadata",
      outputLines: [
        { text: "[*] Analyzing persona target_alias across 1,024 websites...", type: "info" },
        { text: "[+] Found: Medium (https://medium.com/@target_alias)", type: "success" },
        { text: "[+] Found: DEV Community (https://dev.to/target_alias)", type: "success" },
        { text: "[+] Found: HackerNews (https://news.ycombinator.com/user?id=target_alias)", type: "success" },
        { text: "[+] Profile similarity index: 94.2% across bio phrasing", type: "accent" },
        { text: "[*] Full forensic JSON report compiled.", type: "dim" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §6 (Evidence Corroboration)",
  },
  {
    id: "whatsmyname",
    name: "WhatsMyName",
    githubOwner: "WebBreacher",
    githubRepo: "WhatsMyName",
    githubUrl: "https://github.com/WebBreacher/WhatsMyName",
    stars: "4.8k+",
    category: "username",
    categoryLabel: "Username & Identity",
    targetVector: "Master Signatures / Account Verification",
    tagline: "The authoritative open-source curated JSON registry powering Sherlock, SpiderFoot, and modern OSINT.",
    description:
      "WhatsMyName is the foundational dataset curated by Micah Hoffman (WebBreacher). It contains over 600+ hand-verified site detection algorithms, regex error codes, and HTTP signatures used across intelligence platforms globally.",
    whatItExtracts: [
      "600+ verified site signatures with zero-false-positive regex rules",
      "Category segmentation: crypto wallets, dev hubs, dating apps, gaming, blogs",
      "Detection criteria: string match, status code match, or header redirect analysis",
    ],
    cliCommand: "python3 wmn-cli.py -u suspect_target -c all",
    cliFlags: [
      { flag: "-u <username>", purpose: "Target handle to query against registry" },
      { flag: "-c <category>", purpose: "Target specific niche (finance, tech, darknet)" },
    ],
    terminalSim: {
      command: "python3 wmn-cli.py -u suspect_target",
      outputLines: [
        { text: "[*] Sourcing latest WhatsMyName schema v2026...", type: "info" },
        { text: "[+] Bitbucket: https://bitbucket.org/suspect_target (Matched 200 OK)", type: "success" },
        { text: "[+] Keybase: https://keybase.io/suspect_target (PGP Key ID present)", type: "success" },
        { text: "[+] Chess.com: https://www.chess.com/member/suspect_target", type: "success" },
      ],
    },
    forensicStandard: "NIST SP 800-86 §3 (Verifiable Indicator Source)",
  },

  // --- 2. EMAIL & ACCOUNT FOOTPRINT ---
  {
    id: "holehe",
    name: "Holehe",
    githubOwner: "megadose",
    githubRepo: "holehe",
    githubUrl: "https://github.com/megadose/holehe",
    stars: "6.5k+",
    category: "email",
    categoryLabel: "Email & Cloud Footprint",
    targetVector: "Email Address / Account Registration",
    tagline: "Check if an email address is registered on 120+ platforms without notifying the target.",
    description:
      "Holehe probes password-recovery mechanisms, registration validation endpoints, and OAuth handshake responses to establish whether a given email address exists on services like Twitter, Instagram, GitHub, OnlyFans, PayPal, and Discord — entirely passively without triggering target notifications.",
    whatItExtracts: [
      "Account registration status across 120+ web, payment, and cloud services",
      "Partial masked phone numbers (e.g. +91 98*** **210) revealed via password reset endpoints",
      "Partial recovery email domains for secondary target pivoting",
      "Profile photos or full names returned by registration check endpoints",
    ],
    cliCommand: "holehe target.user@domain.com --only-used --no-clear",
    cliFlags: [
      { flag: "--only-used", purpose: "Filter output strictly to services where an account is registered" },
      { flag: "--no-clear", purpose: "Keep previous CLI output intact for logging" },
      { flag: "--timeout <sec>", purpose: "Custom per-request timeout" },
    ],
    terminalSim: {
      command: "holehe suspect@gmail.com --only-used",
      outputLines: [
        { text: "[*] Checking email suspect@gmail.com against 120+ platforms...", type: "info" },
        { text: "[+] [Twitter/X] Account registered (Partial phone: +91 ••••• ••42)", type: "success" },
        { text: "[+] [Instagram] Account registered (ID: 489218201)", type: "success" },
        { text: "[+] [GitHub] Account registered", type: "success" },
        { text: "[+] [Spotify] Account registered (Family Plan)", type: "success" },
        { text: "[+] [Amazon] Account registered", type: "success" },
        { text: "[+] [Discord] Registered (Linked to handle)", type: "success" },
        { text: "[*] Completed in 6.4s. 6 active registrations discovered.", type: "dim" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §5 (Non-Destructive Observation)",
  },
  {
    id: "ghunt",
    name: "GHunt",
    githubOwner: "mxrch",
    githubRepo: "GHunt",
    githubUrl: "https://github.com/mxrch/GHunt",
    stars: "16k+",
    category: "email",
    categoryLabel: "Email & Cloud Footprint",
    targetVector: "Google Account / Gmail Address",
    tagline: "Modular Google Account OSINT framework extracting Gaia IDs, Drive documents, Maps reviews & Photos.",
    description:
      "GHunt is an elite investigative tool that queries Google APIs using investigator master cookies to extract deep intelligence from a target Gmail address: public Google Maps reviews (revealing geographical routines and residential city), Google Photos albums, Google Calendar public events, YouTube channel details, and the immutable 21-digit Gaia ID.",
    whatItExtracts: [
      "Immutable Google Gaia ID (survives email renaming)",
      "Public Google Maps reviews with coordinates, timestamps, and locations visited",
      "Public Google Photos albums and Google Drive shared links",
      "Device metadata (Android versions, last active device sync timestamps)",
      "Google Calendar meeting appointments and public availability slots",
    ],
    cliCommand: "ghunt email target@gmail.com --json report.json",
    cliFlags: [
      { flag: "email <address>", purpose: "Target Gmail or Google Workspace address" },
      { flag: "gaia <gaia_id>", purpose: "Perform direct lookup using 21-digit immutable Gaia ID" },
      { flag: "--json <file>", purpose: "Export complete telemetry payload to JSON" },
    ],
    terminalSim: {
      command: "ghunt email target.suspect@gmail.com",
      outputLines: [
        { text: "[*] Querying Google People API & Identity Graph...", type: "info" },
        { text: "[+] Gaia ID: 108492049102940294102 (Permanent Identifier)", type: "accent" },
        { text: "[+] Name: Tarik I. | Last Profile Photo Updated: 2026-04-12", type: "success" },
        { text: "[+] Google Maps: 14 Public Reviews Found", type: "success" },
        { text: "    -> Tech Hub, Bangalore (5 stars, Apr 2026)", type: "dim" },
        { text: "    -> Cyber Lab Cafe, Indiranagar (4 stars, Mar 2026)", type: "dim" },
        { text: "[+] YouTube Channel: UCx928304801948 (4 Playlists, Public)", type: "success" },
        { text: "[!] Location Inference: Bangalore, Karnataka, India [High Confidence]", type: "warn" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §6 (Digital Evidence Identification & Preservation)",
  },
  {
    id: "theharvester",
    name: "theHarvester",
    githubOwner: "laramies",
    githubRepo: "theHarvester",
    githubUrl: "https://github.com/laramies/theHarvester",
    stars: "12k+",
    category: "email",
    categoryLabel: "Email & Cloud Footprint",
    targetVector: "Organization Domain / Company Footprint",
    tagline: "Gathers emails, names, subdomains, IPs, and URLs across dozens of public search engines.",
    description:
      "A staple of penetration testers and forensic investigators since 2008, theHarvester scrapes search engines (Google, Bing, Yahoo, DuckDuckGo, Baidu), PGP key servers, LinkedIn, Twitter, and DNS sources to map the entire perimeter and employee contact footprint of any target organization.",
    whatItExtracts: [
      "Employee email addresses formatted under organization domain",
      "Names and titles of personnel published across LinkedIn and web archives",
      "Subdomains, virtual hosts, and DNS MX/TXT records",
      "Open ports and employee PGP public keys",
    ],
    cliCommand: "theHarvester -d target-company.com -b all -l 500 -f recon_report.html",
    cliFlags: [
      { flag: "-d <domain>", purpose: "Company domain to map" },
      { flag: "-b <source>", purpose: "Data source (all, google, bing, linkedin, shodan)" },
      { flag: "-l <limit>", purpose: "Limit search results count" },
      { flag: "-f <filename>", purpose: "Export report as HTML and XML" },
    ],
    terminalSim: {
      command: "theHarvester -d dezo.in -b google,bing,duckduckgo",
      outputLines: [
        { text: "[*] theHarvester v4.5: Harvesting footprint for dezo.in...", type: "info" },
        { text: "[+] Discovered Emails (3):", type: "accent" },
        { text: "    -> contact@dezo.in", type: "success" },
        { text: "    -> security@dezo.in", type: "success" },
        { text: "    -> founder@dezo.in", type: "success" },
        { text: "[+] Discovered Hosts (4):", type: "accent" },
        { text: "    -> api.dezo.in (Cloudflare Edge)", type: "dim" },
        { text: "    -> app.dezo.in (Vercel CDN)", type: "dim" },
      ],
    },
    forensicStandard: "NIST SP 800-115 (Information Gathering & Reconnaissance)",
  },
  {
    id: "protosint",
    name: "ProtOSINT",
    githubOwner: "cqcore",
    githubRepo: "ProtOSINT",
    githubUrl: "https://github.com/cqcore/ProtOSINT",
    stars: "1.2k+",
    category: "email",
    categoryLabel: "Email & Cloud Footprint",
    targetVector: "ProtonMail / Encrypted Email Footprint",
    tagline: "Investigate ProtonMail addresses, PGP keys, validity, and associated ProtonVPN servers.",
    description:
      "ProtonMail uses public key distribution endpoints to allow encrypted routing. ProtOSINT queries these official APIs to confirm the existence of target ProtonMail accounts, extract public PGP key fingerprints, creation timestamps, and verify whether the email is actively receiving messages.",
    whatItExtracts: [
      "Proton account existence validation without contacting recipient",
      "Public PGP key fingerprint and RSA/Curve25519 key size",
      "Creation timestamp and key expiration metadata",
      "Associated ProtonVPN infrastructure routing indicators",
    ],
    cliCommand: "python3 protosint.py -e target@proton.me",
    cliFlags: [
      { flag: "-e <email>", purpose: "Target Proton address (@proton.me, @protonmail.com)" },
      { flag: "--pgp", purpose: "Dump full ASCII armored PGP public key" },
    ],
    terminalSim: {
      command: "python3 protosint.py -e suspect_sec@proton.me",
      outputLines: [
        { text: "[*] Querying Proton API v4 Public Keyring...", type: "info" },
        { text: "[+] Status: ACTIVE ACCOUNT (Status: 1)", type: "success" },
        { text: "[+] Key Fingerprint: 4B91 A2E9 8F10 C452 ... 98A1", type: "accent" },
        { text: "[+] Algorithm: Curve25519 (Modern PGP)", type: "dim" },
        { text: "[+] Registered Date: 2025-08-14 11:22:04 UTC", type: "success" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 (Cryptographic Key Verification)",
  },

  // --- 3. PHONE & CARRIER INTEL ---
  {
    id: "phoneinfoga",
    name: "PhoneInfoga",
    githubOwner: "sundowndev",
    githubRepo: "phoneinfoga",
    githubUrl: "https://github.com/sundowndev/phoneinfoga",
    stars: "13k+",
    category: "phone",
    categoryLabel: "Phone & Carrier Intel",
    targetVector: "Phone Number (E.164 Standard)",
    tagline: "Advanced information gathering & OSINT framework for international telephone numbers.",
    description:
      "PhoneInfoga scans international telephone numbers across telecom registries, carrier HLR lookups, Google dorking queries, and VOIP detection engines. It determines whether a number is prepaid, landline, mobile, or a burner VOIP, and identifies the geographic telecom circle.",
    whatItExtracts: [
      "E.164 formatting, country dialing code, and telecom territory",
      "Line type: Mobile, Landline, VOIP, Toll-Free, or Satellite",
      "Carrier identity (e.g. Reliance Jio, Airtel, Vodafone Idea, AT&T)",
      "Automated Google search dorks across web pages, pastebins, and classifieds",
    ],
    cliCommand: "phoneinfoga scan -n +919876543210",
    cliFlags: [
      { flag: "scan -n <number>", purpose: "Target phone number in international E.164 format" },
      { flag: "--recon", purpose: "Run automated search engine dork scanners" },
      { flag: "-s <scanner>", purpose: "Enable specialized carrier API scanner" },
    ],
    terminalSim: {
      command: "phoneinfoga scan -n +919876543210 --recon",
      outputLines: [
        { text: "[*] Parsing phone number: +91 98765 43210 (E.164 format)...", type: "info" },
        { text: "[+] Country: India (IN) | Timezones: Asia/Kolkata", type: "success" },
        { text: "[+] Carrier: Reliance Jio Infocomm Ltd", type: "success" },
        { text: "[+] Line Type: MOBILE (Prepaid/Postpaid GSM)", type: "accent" },
        { text: "[+] Telecom Circle: Karnataka / Bangalore Metro Circle", type: "success" },
        { text: "[*] Running OSINT Search Dorks (14 engines)...", type: "info" },
        { text: "[+] Dork Hit: Number listed in technical RFP document (2025)", type: "warn" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §6 (Telecom Artifact Forensics)",
  },
  {
    id: "ignorant",
    name: "Ignorant",
    githubOwner: "megadose",
    githubRepo: "ignorant",
    githubUrl: "https://github.com/megadose/ignorant",
    stars: "1.4k+",
    category: "phone",
    categoryLabel: "Phone & Carrier Intel",
    targetVector: "Phone Number / Social Registrations",
    tagline: "Check if a target phone number is registered on WhatsApp, Telegram, Snapchat, and Instagram.",
    description:
      "Ignorant checks if a phone number is registered across major messaging and social services without sending any SMS codes or phone alerts to the target. It analyzes client API handshakes and registration validation endpoints.",
    whatItExtracts: [
      "Confirmed presence of target phone on WhatsApp, Snapchat, Amazon, Instagram",
      "Associated platform avatar or privacy-leaked metadata",
      "Registration timestamps where exposed by legacy API responses",
    ],
    cliCommand: "ignorant +919876543210",
    cliFlags: [
      { flag: "<phone_number>", purpose: "Phone number in E.164 format with country code" },
      { flag: "--country <code2>", purpose: "Default country ISO-3166 code if number is national" },
    ],
    terminalSim: {
      command: "ignorant +919876543210",
      outputLines: [
        { text: "[*] Probing social registrations for +91 98765 43210...", type: "info" },
        { text: "[+] WhatsApp: Registered (Active status message and profile picture)", type: "success" },
        { text: "[+] Snapchat: Registered (Display username linked: @tarik_tech)", type: "success" },
        { text: "[+] Amazon: Registered (Associated retail account detected)", type: "accent" },
        { text: "[-] Instagram: Not found with this phone number", type: "dim" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §5 (Passive Observation Protocol)",
  },
  {
    id: "bellingcat-telegram",
    name: "Telegram Phone Checker",
    githubOwner: "bellingcat",
    githubRepo: "telegram-phone-number-checker",
    githubUrl: "https://github.com/bellingcat/telegram-phone-number-checker",
    stars: "800+",
    category: "phone",
    categoryLabel: "Phone & Carrier Intel",
    targetVector: "Phone Number / Telegram Account",
    tagline: "Bellingcat investigative tool resolving phone numbers to Telegram user IDs and usernames.",
    description:
      "Developed by the prestigious investigative journalism group Bellingcat, this tool leverages Telegram MTProto client protocols to safely check if a list of phone numbers corresponds to active Telegram accounts, extracting Telegram user IDs and usernames without adding them to contacts.",
    whatItExtracts: [
      "Telegram 10-digit User ID (immutable, survives username changes)",
      "Current Telegram handle, display name, and bio text",
      "Profile picture hash and last seen timestamp bucket",
    ],
    cliCommand: "telegram-phone-number-checker --phone-numbers +919876543210",
    cliFlags: [
      { flag: "--phone-numbers <num>", purpose: "Comma-separated target numbers" },
      { flag: "--json-output <path>", purpose: "Export evidentiary JSON log" },
    ],
    terminalSim: {
      command: "telegram-phone-number-checker --phone-numbers +919876543210",
      outputLines: [
        { text: "[*] Initializing Telegram MTProto session via Telegram API...", type: "info" },
        { text: "[+] Match: +919876543210 -> Telegram User ID: 1982736412", type: "success" },
        { text: "[+] Username: @tarik_cyber", type: "success" },
        { text: "[+] First Name: Tarik | Last Seen: Recently", type: "accent" },
      ],
    },
    forensicStandard: "NIST SP 800-86 (Chat Application Artifact Identification)",
  },

  // --- 4. SOCIAL MEDIA (SOCMINT) ---
  {
    id: "instaloader",
    name: "Instaloader",
    githubOwner: "instaloader",
    githubRepo: "instaloader",
    githubUrl: "https://github.com/instaloader/instaloader",
    stars: "9k+",
    category: "socmint",
    categoryLabel: "Social Media (SOCMINT)",
    targetVector: "Instagram Profile / Stories / Bio",
    tagline: "Download Instagram pictures, captions, geo-tags, comments, and follower lists with metadata.",
    description:
      "Instaloader is a dedicated Instagram forensic scraping and investigative tool. It downloads pictures along with captions, EXIF timestamps, post geo-location tags, tagged users, and stories into organized case folders with JSON sidecar metadata for each post.",
    whatItExtracts: [
      "High-resolution photos and videos with exact original server timestamps",
      "Geo-location coordinates and venue names attached to public posts",
      "Post captions, hashtag clusters, and edited text history",
      "User follower and following relationships for social graph mapping",
    ],
    cliCommand: "instaloader profile target_handle --geotags --comments --metadata-json",
    cliFlags: [
      { flag: "--geotags", purpose: "Extract latitude/longitude coordinates from posts" },
      { flag: "--comments", purpose: "Scrape all public post comments and usernames" },
      { flag: "--metadata-json", purpose: "Save raw JSON metadata sidecars for evidence" },
    ],
    terminalSim: {
      command: "instaloader profile target_handle --geotags",
      outputLines: [
        { text: "[*] Retrieving profile target_handle (ID: 59281920)...", type: "info" },
        { text: "[+] Bio: Cybersecurity & Forensics | Bangalore, IN", type: "success" },
        { text: "[+] Saved 18 posts with metadata sidecars.", type: "success" },
        { text: "[+] Geotag Identified: Lat 12.9716, Lon 77.5946 (Bangalore)", type: "accent" },
        { text: "[*] Case directory created: ./evidence/instagram_target_handle/", type: "dim" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §7 (Collection of Social Media Artifacts)",
  },
  {
    id: "snscrape",
    name: "snscrape",
    githubOwner: "JustAnotherArchivist",
    githubRepo: "snscrape",
    githubUrl: "https://github.com/JustAnotherArchivist",
    stars: "4k+",
    category: "socmint",
    categoryLabel: "Social Media (SOCMINT)",
    targetVector: "Social Media Timelines (Twitter/X, Reddit, Telegram)",
    tagline: "Scrapes historical social media posts and threads without requiring paid API tokens.",
    description:
      "snscrape is a multi-platform social media scraping tool written in Python. It scrapes profiles, hashtags, searches, and threads from Twitter/X, Reddit, Telegram channels, Facebook, and Instagram without API keys or rate limits, making it indispensable for historical timeline reconstruction.",
    whatItExtracts: [
      "Complete historical tweet archives filtered by date ranges and geolocation",
      "Reddit user comment and submission history across all subreddits",
      "Public Telegram channel message dumps with file attachment metadata",
    ],
    cliCommand: "snscrape --jsonl --max-results 100 twitter-user target_handle > tweets.jsonl",
    cliFlags: [
      { flag: "--jsonl", purpose: "Stream results as line-delimited JSON objects" },
      { flag: "--max-results <n>", purpose: "Cap maximum retrieved records" },
      { flag: "twitter-search <query>", purpose: "Filter by boolean keyword and date" },
    ],
    terminalSim: {
      command: "snscrape --jsonl twitter-user target_handle",
      outputLines: [
        { text: "[*] Scraping timeline for target_handle...", type: "info" },
        { text: '[+] Post (2026-02-14): "Building high-assurance forensic pipelines..."', type: "success" },
        { text: '[+] Post (2026-01-20): "New security research paper published: Zero Trust"', type: "success" },
        { text: "[*] 100 records streamed to ./tweets.jsonl with SHA-256 hash", type: "dim" },
      ],
    },
    forensicStandard: "NIST SP 800-86 (Historical Activity Timeline Reconstruction)",
  },
  {
    id: "twint",
    name: "Twint",
    githubOwner: "twintproject",
    githubRepo: "twint",
    githubUrl: "https://github.com/twintproject/twint",
    stars: "16k+",
    category: "socmint",
    categoryLabel: "Social Media (SOCMINT)",
    targetVector: "X / Twitter Intelligence & Geospatial Radius",
    tagline: "Twitter OSINT tool scraping tweets, followers, emails, and phone numbers without API limits.",
    description:
      "Twint is an advanced Twitter scraping tool written in Python that allows for scraping Tweets from specific profiles, scraping Tweets related to certain topics, or geographic radius search without using Twitter's official API limits or authentication.",
    whatItExtracts: [
      'Historical tweets filtered by location radius (e.g. "12.9716,77.5946,15km")',
      "Target reply networks and top interacting usernames",
      "Phone numbers and email addresses leaked in public tweets",
    ],
    cliCommand: "twint -u target_user --email --phone -o report.csv --csv",
    cliFlags: [
      { flag: "-u <username>", purpose: "Target user handle" },
      { flag: "--email", purpose: "Filter for tweets containing email addresses" },
      { flag: "--phone", purpose: "Filter for tweets containing telephone numbers" },
      { flag: "-g <lat,lon,rad>", purpose: "Search tweets within precise geographic circle" },
    ],
    terminalSim: {
      command: "twint -u target_user --email --phone",
      outputLines: [
        { text: "[*] Scanning 1,420 historical tweets for target_user...", type: "info" },
        { text: "[+] Extracted Email in Tweet #1829: tarik.investigation@proton.me", type: "success" },
        { text: "[+] Extracted Location: Bangalore, India", type: "accent" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 (Social Network Scraping Protocol)",
  },

  // --- 5. EXIF & DOCUMENT FORENSICS ---
  {
    id: "exiftool",
    name: "ExifTool",
    githubOwner: "exiftool",
    githubRepo: "exiftool",
    githubUrl: "https://github.com/exiftool/exiftool",
    stars: "5k+",
    category: "metadata",
    categoryLabel: "EXIF & Document Forensics",
    targetVector: "Digital Images / PDFs / Media Evidence",
    tagline: "The world-standard metadata extraction engine reading EXIF, GPS, IPTC, and XMP tags across 100+ formats.",
    description:
      "Created by Phil Harvey, ExifTool is the gold standard in forensic file metadata analysis. It reads, writes, and scrubs metadata across JPEG, PNG, TIFF, PDF, DOCX, HEIC, MP4, and raw camera files — extracting exact camera serial numbers, GPS coordinates, shutter counts, software editing history, and creation timestamps.",
    whatItExtracts: [
      "Precise GPS latitude, longitude, and altitude embedded in mobile photos",
      "Camera / smartphone make, model, serial number, and internal lens ID",
      "Original capture timestamp vs. file system modified timestamp (tampering detection)",
      "Software editing history (e.g. Adobe Photoshop, GIMP, Apple iOS build)",
      "ICC color profiles, embedded thumbnails, and author username tags in Office documents",
    ],
    cliCommand: "exiftool -G1 -a -s -csv evidence_image.jpg > metadata.csv",
    cliFlags: [
      { flag: "-G1", purpose: "Display group name for each tag (e.g. [EXIF], [GPS], [Photoshop])" },
      { flag: "-a", purpose: "Allow duplicate tags to expose overridden metadata" },
      { flag: "-s", purpose: "Print actual tag names instead of descriptive labels for scripted parsing" },
      { flag: "-csv", purpose: "Export structured tabular spreadsheet for court evidence records" },
    ],
    terminalSim: {
      command: "exiftool -G1 -a -s photo_evidence_01.jpg",
      outputLines: [
        { text: "[*] Parsing metadata headers: photo_evidence_01.jpg...", type: "info" },
        { text: "[System] FileSize: 4.8 MB | FileModifyDate: 2026:05:10 14:22:01+05:30", type: "dim" },
        { text: "[IFD0] Make: Apple | Model: iPhone 16 Pro", type: "success" },
        { text: "[ExifIFD] DateTimeOriginal: 2026:05:10 14:18:49", type: "accent" },
        { text: "[GPS] GPSLatitude: 12 deg 58' 14.16\\\" N (12.970600)", type: "warn" },
        { text: "[GPS] GPSLongitude: 77 deg 35' 32.28\\\" E (77.592300)", type: "warn" },
        { text: "[GPS] GPSAltitude: 920 m Above Sea Level", type: "dim" },
        { text: "[Composite] GPS Position: 12.9706 N, 77.5923 E [Bangalore, India]", type: "warn" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §8 (Evidentiary Artifact Integrity & Chain of Custody)",
  },
  {
    id: "metagoofil",
    name: "Metagoofil",
    githubOwner: "laramies",
    githubRepo: "metagoofil",
    githubUrl: "https://github.com/laramies/metagoofil",
    stars: "1.2k+",
    category: "metadata",
    categoryLabel: "EXIF & Document Forensics",
    targetVector: "Public Organization Documents (PDF, DOCX, XLSX)",
    tagline: "Information gathering tool designed for extracting metadata from public target documents.",
    description:
      "Metagoofil performs automated Google dorking queries targeting a company domain to download all indexed documents (pdf, doc, xls, ppt, docx, xlsx) and parses their metadata headers to reveal employee usernames, internal network paths, printer models, and operating system versions.",
    whatItExtracts: [
      "Internal Active Directory usernames of authors and document editors",
      "Local network paths, shared server drives (e.g. \\\\corp-dc01\\finance$), and folder structures",
      "Software versions: Microsoft Office, LibreOffice, Adobe Acrobat Distiller",
      "Network printer names and MAC addresses embedded in print spooler metadata",
    ],
    cliCommand: "metagoofil -d target-domain.com -t pdf,docx,xlsx -l 200 -n 50 -o ./evidence -f report.html",
    cliFlags: [
      { flag: "-d <domain>", purpose: "Target domain to search for public documents" },
      { flag: "-t <types>", purpose: "File extensions to locate (pdf,doc,xls,ppt,odp,ods)" },
      { flag: "-n <limit>", purpose: "Maximum number of documents to download for parsing" },
      { flag: "-o <dir>", purpose: "Local directory to preserve collected document files" },
    ],
    terminalSim: {
      command: "metagoofil -d example-target.com -t pdf,docx -l 50 -o ./docs -f report.html",
      outputLines: [
        { text: "[*] Searching Google for public documents hosted on example-target.com...", type: "info" },
        { text: "[+] Found 24 PDF files and 12 DOCX files.", type: "info" },
        { text: "[+] Extracted Internal Usernames (4):", type: "success" },
        { text: "    -> j.doe (Domain: CORP-AD)", type: "dim" },
        { text: "    -> t.islam (Domain: DEZO-SYSTEMS)", type: "dim" },
        { text: "    -> m.sharma (Domain: SEC-INFRA)", type: "dim" },
        { text: "[+] Extracted Server Path: \\\\SRV-FILE02\\Legal\\Confidential\\2026", type: "accent" },
        { text: "[*] Metadata extraction complete. Evidentiary report compiled.", type: "dim" },
      ],
    },
    forensicStandard: "NIST SP 800-115 (Document Metadata Analysis)",
  },
  {
    id: "foca",
    name: "FOCA",
    githubOwner: "ElevenPaths",
    githubRepo: "FOCA",
    githubUrl: "https://github.com/ElevenPaths/FOCA",
    stars: "2.5k+",
    category: "metadata",
    categoryLabel: "EXIF & Document Forensics",
    targetVector: "Organization Document Metadata & Network Mapping",
    tagline: "Fingerprinting Organizations with Collected Archives — scans public docs to map internal networks.",
    description:
      "FOCA is an acclaimed intelligence tool created by ElevenPaths used mainly to find metadata and hidden information in scanned target documents. By cross-correlating metadata across hundreds of files, FOCA maps which servers created them, internal IP schemes, and network printers.",
    whatItExtracts: [
      "Correlated internal network topology and Active Directory domain names",
      "Internal IP addresses leaked in document properties and email headers",
      "Software suites and exact patch levels in use across employee workstations",
    ],
    cliCommand: "foca.exe /target:target-corp.com /extract:all /report:dossier.html",
    cliFlags: [
      { flag: "/target:<domain>", purpose: "Target company domain to scan" },
      { flag: "/extract:all", purpose: "Extract all metadata, EXIF, and server headers" },
    ],
    terminalSim: {
      command: "foca.exe /target:target-corp.com /extract:all",
      outputLines: [
        { text: "[*] Downloading public documents for target-corp.com...", type: "info" },
        { text: "[+] 42 documents analyzed. Leaked Internal IPs found:", type: "warn" },
        { text: "    -> 10.240.12.8 (Internal Sharepoint)", type: "accent" },
        { text: "    -> 192.168.10.45 (HP LaserJet Enterprise Printer)", type: "accent" },
        { text: "[+] OS Profile: 85% Windows 11 Enterprise, 15% macOS Sonoma", type: "success" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 (Internal Network Artifact Discovery)",
  },

  // --- 6. DOMAIN & INFRASTRUCTURE ---
  {
    id: "spiderfoot",
    name: "SpiderFoot",
    githubOwner: "smicallef",
    githubRepo: "spiderfoot",
    githubUrl: "https://github.com/smicallef/spiderfoot",
    stars: "15k+",
    category: "network",
    categoryLabel: "Domain & Infrastructure",
    targetVector: "Domain / IP / AS Number / Target Entity",
    tagline: "Automated OSINT framework integrating 200+ data sources to map digital attack surfaces.",
    description:
      "SpiderFoot is an automated open-source intelligence platform. It integrates with over 200 external modules (Shodan, Censys, VirusTotal, GreyNoise, HaveIBeenPwned) to correlate target domains, IP blocks, subnets, PGP keys, and human personas into an interactive network threat intelligence graph.",
    whatItExtracts: [
      "Subdomains, Cloudflare / AWS edge infrastructure, and DNS records",
      "Exposed cloud buckets (Amazon S3, Google Cloud Storage, Azure Blobs)",
      "Associated human names, email addresses, and phone numbers",
      "Threat intelligence blacklist status (malicious IP, botnet host, TOR exit node)",
      "SSL/TLS certificate transparency logs revealing internal staging servers",
    ],
    cliCommand: "sf.py -s target-entity.com -m sfp_shodan,sfp_whois,sfp_dnsresolve -u cli",
    cliFlags: [
      { flag: "-s <target>", purpose: "Target domain, IP address, username, or organization name" },
      { flag: "-m <modules>", purpose: "Comma-separated list of SpiderFoot modules to run" },
      { flag: "-t <types>", purpose: "Data types to extract (e.g. EMAIL_ADDR, IP_ADDRESS, INTERNET_NAME)" },
      { flag: "-u cli", purpose: "Run in non-interactive command line mode with structured output" },
    ],
    terminalSim: {
      command: "python3 sf.py -s dezo.in -m sfp_dnsresolve,sfp_sslcert -u cli",
      outputLines: [
        { text: "[*] Initializing SpiderFoot Recon Engine for target: dezo.in...", type: "info" },
        { text: "[+] Target resolved: 76.76.21.21 (Vercel Anycast Edge)", type: "success" },
        { text: "[+] SSL Subject Alternative Names: dezo.in, *.dezo.in", type: "success" },
        { text: "[+] Certificate Authority: Let's Encrypt Authority X3", type: "dim" },
        { text: "[+] Discovered Host: staging.dezo.in [Status: 401 Protected]", type: "accent" },
        { text: "[*] Scan completed: 42 intelligence correlation events recorded.", type: "dim" },
      ],
    },
    forensicStandard: "NIST SP 800-115 (Network Attack Surface Discovery)",
  },
  {
    id: "amass",
    name: "OWASP Amass",
    githubOwner: "owasp-amass",
    githubRepo: "amass",
    githubUrl: "https://github.com/owasp-amass/amass",
    stars: "12k+",
    category: "network",
    categoryLabel: "Domain & Infrastructure",
    targetVector: "Attack Surface / ASN / Domain Perimeter",
    tagline: "In-depth attack surface mapping and external asset discovery using open-source information.",
    description:
      "Maintained under OWASP, Amass uses extensive data gathering techniques and active graph-database modeling to map external network perimeters. It queries over 55 passive intelligence feeds, certificate transparency logs, reverse DNS sweeps, and routing registries (BGP).",
    whatItExtracts: [
      "Complete subdomain enumeration across active, passive, and recursive discovery",
      "Autonomous System Numbers (ASNs) and CIDR IP routing blocks belonging to target",
      "Graph visualization showing relationships between domains, IP addresses, and netblocks",
      "DNS infrastructure mapping (Nameservers, Mail Exchangers, SPF/DMARC policies)",
    ],
    cliCommand: "amass enum -passive -d target-domain.com -src -ip -dir ./amass_db",
    cliFlags: [
      { flag: "-passive", purpose: "Perform purely passive collection without touching target infrastructure" },
      { flag: "-d <domain>", purpose: "Target apex domain to enumerate" },
      { flag: "-src", purpose: "Display the specific intelligence source that identified each asset" },
      { flag: "-ip", purpose: "Resolve IP addresses for discovered hostnames automatically" },
    ],
    terminalSim: {
      command: "amass enum -passive -d dezo.in -src -ip",
      outputLines: [
        { text: "[*] OWASP Amass v4.2.0: Gathering passive intelligence for dezo.in...", type: "info" },
        { text: "[CertSpotter]   dezo.in               76.76.21.21   (ASN 16509)", type: "success" },
        { text: "[HackerTarget]  api.dezo.in           76.76.21.21   (ASN 16509)", type: "success" },
        { text: "[AlienVault]    auth.dezo.in          76.76.21.22   (ASN 16509)", type: "success" },
        { text: "[*] Enumeration completed: 3 names discovered across 1 Autonomous System.", type: "dim" },
      ],
    },
    forensicStandard: "OWASP Testing Guide (WSTG-INFO-01 / WSTG-INFO-02)",
  },
  {
    id: "sublist3r",
    name: "Sublist3r",
    githubOwner: "aboul3la",
    githubRepo: "Sublist3r",
    githubUrl: "https://github.com/aboul3la/Sublist3r",
    stars: "9k+",
    category: "network",
    categoryLabel: "Domain & Infrastructure",
    targetVector: "Subdomain Enumeration",
    tagline: "Fast Python tool designed to enumerate subdomains using search engines and Netcraft.",
    description:
      "Sublist3r enumerates subdomains using many search engines such as Google, Yahoo, Bing, Baidu, and Ask. Sublist3r also enumerates subdomains using Netcraft, Virustotal, ThreatCrowd, DNSdumpster, and ReverseDNS.",
    whatItExtracts: [
      "Subdomains discovered across 10+ public search engines without API tokens",
      "Integrated subbrute module for dictionary permutation attacks",
      "Port scan verification on discovered subdomains (80, 443)",
    ],
    cliCommand: "python3 sublist3r.py -d target.com -b -o subdomains.txt",
    cliFlags: [
      { flag: "-d <domain>", purpose: "Apex domain to analyze" },
      { flag: "-b, --bruteforce", purpose: "Enable subbrute bruteforce module" },
      { flag: "-p <ports>", purpose: "Scan discovered subdomains against specific ports" },
    ],
    terminalSim: {
      command: "python3 sublist3r.py -d dezo.in",
      outputLines: [
        { text: "[-] Searching now in Google...", type: "dim" },
        { text: "[-] Searching now in Bing...", type: "dim" },
        { text: "[-] Searching now in Virustotal...", type: "dim" },
        { text: "[+] Found: api.dezo.in", type: "success" },
        { text: "[+] Found: cdn.dezo.in", type: "success" },
        { text: "[*] Total Unique Subdomains Found: 2", type: "accent" },
      ],
    },
    forensicStandard: "NIST SP 800-115 (Asset Discovery)",
  },
  {
    id: "recon-ng",
    name: "Recon-ng",
    githubOwner: "lanmaster50",
    githubRepo: "recon-ng",
    githubUrl: "https://github.com/lanmaster50/recon-ng",
    stars: "4k+",
    category: "network",
    categoryLabel: "Domain & Infrastructure",
    targetVector: "Investigation Case / Organization",
    tagline: "Full-featured reconnaissance framework with modular SQLite workspace database.",
    description:
      "Recon-ng is a full-featured web reconnaissance framework written in Python. Complete with independent modules, database interaction, built in convenience functions, interactive help, and command completion, Recon-ng provides a powerful environment in which open-source web-based reconnaissance can be conducted quickly and thoroughly.",
    whatItExtracts: [
      "Structured entity database (domains, contacts, credentials, vulnerabilities)",
      "Automated cross-module pipeline execution (e.g. domain -> contacts -> emails -> leaks)",
      "Case workspace isolation keeping investigations strictly separated",
      "Custom reporting in HTML, CSV, and XML formats",
    ],
    cliCommand: "recon-ng -w case_tarik_investigation",
    cliFlags: [
      { flag: "-w <workspace>", purpose: "Create or load isolated case database" },
      { flag: "-r <resource_file>", purpose: "Execute automated batch reconnaissance script" },
    ],
    terminalSim: {
      command: "recon-ng -w case_01",
      outputLines: [
        { text: "[*] Loaded workspace case_01 (SQLite backing: ~/.recon-ng/workspaces/case_01.db)", type: "info" },
        { text: "[recon-ng][case_01] > modules load recon/domains-contacts/whois_pocs", type: "accent" },
        { text: "[recon-ng][case_01][whois_pocs] > run", type: "accent" },
        { text: "[+] 3 Point of Contact records added to case database.", type: "success" },
        { text: "[recon-ng][case_01] > show contacts", type: "dim" },
        { text: "    Tarik Islam | Administrative Contact | contact@dezo.in", type: "success" },
      ],
    },
    forensicStandard: "NIST SP 800-86 (Case Management & Auditable DB)",
  },
  {
    id: "whatweb",
    name: "WhatWeb",
    githubOwner: "urbanadventurer",
    githubRepo: "WhatWeb",
    githubUrl: "https://github.com/urbanadventurer/WhatWeb",
    stars: "5.5k+",
    category: "network",
    categoryLabel: "Domain & Infrastructure",
    targetVector: "Web Server / CMS / Technology Stack",
    tagline: "Next-generation web scanner identifying 1800+ CMS, web frameworks, and server modules.",
    description:
      "WhatWeb recognises web technologies including content management systems (CMS), blogging platforms, statistic/analytics packages, JavaScript libraries, web servers, and embedded devices. WhatWeb has over 1800 plugins, each to recognise something different.",
    whatItExtracts: [
      "Web server version (Nginx, Apache, Caddy, Cloudflare)",
      "Framework signatures (React, Next.js, Django, Ruby on Rails)",
      "Analytics trackers, Google Tag Manager IDs, and advertising scripts",
      "Security headers (HSTS, CSP, X-Frame-Options, Subresource Integrity)",
    ],
    cliCommand: "whatweb https://dezo.in -a 3 --color=always",
    cliFlags: [
      { flag: "-a <level>", purpose: "Aggression level (1: Stealthy, 3: Aggressive)" },
      { flag: "--log-json <file>", purpose: "Log structured output to JSON" },
    ],
    terminalSim: {
      command: "whatweb https://dezo.in -a 1",
      outputLines: [
        { text: "https://dezo.in [200 OK] Country[UNITED STATES], HTTPS[Strict-Transport-Security]", type: "info" },
        { text: "IP[76.76.21.21], HTML5, Script[application/json], PoweredBy[Next.js, Vercel]", type: "success" },
        { text: "Title[Dezo.in // AI Product Studio], X-Powered-By[Next.js]", type: "accent" },
      ],
    },
    forensicStandard: "OWASP Testing Guide (WSTG-INFO-08 Web Fingerprinting)",
  },
  {
    id: "nmap",
    name: "Nmap",
    githubOwner: "nmap",
    githubRepo: "nmap",
    githubUrl: "https://github.com/nmap/nmap",
    stars: "9k+",
    category: "network",
    categoryLabel: "Domain & Infrastructure",
    targetVector: "Host / Subnet / Open Ports",
    tagline: "The undisputed reference network discovery and security auditing tool with NSE scripting.",
    description:
      "Nmap (Network Mapper) is an open-source tool for network exploration and security auditing. It uses raw IP packets in novel ways to determine what hosts are available on the network, what services those hosts are offering, their operating systems, and firewall configurations.",
    whatItExtracts: [
      "Open TCP/UDP listening ports and running daemon banners",
      "Operating system fingerprinting based on TCP/IP stack implementation nuances",
      "Vulnerability checks and TLS cipher audits via Nmap Scripting Engine (NSE)",
    ],
    cliCommand: "nmap -sV -sC -O -T4 76.76.21.21 -oA scan_result",
    cliFlags: [
      { flag: "-sV", purpose: "Probe open ports to determine service and version info" },
      { flag: "-sC", purpose: "Execute default set of safe NSE auditing scripts" },
      { flag: "-O", purpose: "Enable OS detection" },
    ],
    terminalSim: {
      command: "nmap -sV -p 80,443,22 76.76.21.21",
      outputLines: [
        { text: "[*] Starting Nmap 7.94 scan on 76.76.21.21...", type: "info" },
        { text: "PORT    STATE  SERVICE  VERSION", type: "dim" },
        { text: "80/tcp  open   http     Vercel HTTP Gateway", type: "success" },
        { text: "443/tcp open   ssl/http Vercel Edge Server (TLSv1.3)", type: "success" },
        { text: "22/tcp  filtered ssh", type: "dim" },
      ],
    },
    forensicStandard: "NIST SP 800-115 §4 (Port Scanning & Service Identification)",
  },

  // --- 7. BREACH & SECRET LEAKS ---
  {
    id: "h8mail",
    name: "h8mail",
    githubOwner: "khast3x",
    githubRepo: "h8mail",
    githubUrl: "https://github.com/khast3x/h8mail",
    stars: "3.5k+",
    category: "breach",
    categoryLabel: "Breach & Secret Leaks",
    targetVector: "Email / Password Hashes / Historical Breaches",
    tagline: "Email OSINT and password breach hunting tool querying major breach dumps and pastebins.",
    description:
      "h8mail is an email breach and OSINT tool that queries numerous breach sources (HaveIBeenPwned, DeHashed, IntelX, Snusbase, leak-lookup) to discover compromised credentials, cleartext passwords, cryptographic hashes, and related compromised accounts.",
    whatItExtracts: [
      "Confirmed compromised breach incidents associated with email",
      "Historical leaked cleartext passwords and hashed password entries (MD5, SHA-1, bcrypt)",
      "Associated compromised usernames and compromised accounts",
      "Tor onion leak index lookups for dark web intelligence analysis",
    ],
    cliCommand: "h8mail -t target@email.com -c config.ini -o breach_findings.csv",
    cliFlags: [
      { flag: "-t <target>", purpose: "Target email address to search across breaches" },
      { flag: "-c <config>", purpose: "Configuration file with private API keys" },
      { flag: "--loose", purpose: "Search for target username portion across breach databases" },
      { flag: "-o <file>", purpose: "Save findings to CSV spreadsheet" },
    ],
    terminalSim: {
      command: "h8mail -t suspect_user@target.com --loose",
      outputLines: [
        { text: "[*] Initializing breach database queries for suspect_user@target.com...", type: "info" },
        { text: "[+] Target identified in 2 public historical data dumps:", type: "warn" },
        { text: "    [1] Breach: Collection #1 (2019) | Password Hash: [SHA-1 Exists]", type: "accent" },
        { text: "    [2] Breach: Exploit.in Combo List | Leaked Password Identified", type: "warn" },
        { text: "[*] Evidentiary audit log compiled with timestamp.", type: "dim" },
      ],
    },
    forensicStandard: "NIST SP 800-63B (Credential Exposure & Threat Assessment)",
  },
  {
    id: "trufflehog",
    name: "TruffleHog",
    githubOwner: "trufflesecurity",
    githubRepo: "trufflehog",
    githubUrl: "https://github.com/trufflesecurity/trufflehog",
    stars: "16k+",
    category: "breach",
    categoryLabel: "Breach & Secret Leaks",
    targetVector: "Git Repositories / Cloud Secrets / API Keys",
    tagline: "Find leaked credentials, API keys, private keys, and secrets in Git history with live verification.",
    description:
      "TruffleHog scans Git commit history, S3 buckets, Docker images, and filesystem directories for accidentally committed secrets (AWS keys, GitHub tokens, private PGP/SSH keys, Stripe secrets). Crucially, TruffleHog performs safe live verification against target APIs to confirm whether leaked keys are still active.",
    whatItExtracts: [
      "800+ secret types detected with high-precision regex & Shannon entropy analysis",
      "Live key verification checking whether discovered secrets are currently operational",
      "Exact commit hash, author name, and date when the secret was committed to history",
    ],
    cliCommand: "trufflehog git https://github.com/target_org/repo --json",
    cliFlags: [
      { flag: "git <url>", purpose: "Scan public or private git repository commit tree" },
      { flag: "--only-verified", purpose: "Filter strictly to credentials verified as LIVE on provider APIs" },
      { flag: "--json", purpose: "Output machine-readable JSON logs for SIEM pipelines" },
    ],
    terminalSim: {
      command: "trufflehog git https://github.com/target-repo/code --only-verified",
      outputLines: [
        { text: "[*] Scanning 482 commits across 3 branches...", type: "info" },
        { text: "[!] FOUND LIVE SECRET in commit 8a9f201 (Author: dev@target.com):", type: "warn" },
        { text: "    Detector: AWS Access Key ID (AKIAIOSFODNN7EXAMPLE)", type: "accent" },
        { text: "    Verification: LIVE (Account ID: 192830192830, Region: us-east-1)", type: "warn" },
        { text: "[*] Alert triggered: immediate rotation required.", type: "dim" },
      ],
    },
    forensicStandard: "NIST SP 800-115 (Privileged Credential Discovery)",
  },
  {
    id: "gitleaks",
    name: "Gitleaks",
    githubOwner: "gitleaks",
    githubRepo: "gitleaks",
    githubUrl: "https://github.com/gitleaks/gitleaks",
    stars: "18k+",
    category: "breach",
    categoryLabel: "Breach & Secret Leaks",
    targetVector: "Git Commits / Filesystem / CI Pipelines",
    tagline: "Blazing-fast Go tool for auditing Git repositories for leaked secrets, API tokens, and credentials.",
    description:
      "Gitleaks is a SAST tool written in Go that detects hardcoded secrets like passwords, API keys, and tokens in git repos. It is commonly integrated into pre-commit hooks and CI/CD pipelines to prevent leaks before they ever reach production.",
    whatItExtracts: [
      "Exposed tokens: OpenAI API keys, Slack Webhooks, Google Cloud Service Account JSONs",
      "Full commit history diff inspection back to repository initial commit",
      "Custom regex rules via TOML configuration files",
    ],
    cliCommand: "gitleaks detect --source=. -v --report-path=leaks.json",
    cliFlags: [
      { flag: "detect", purpose: "Run scan on current or specified git repository" },
      { flag: "--report-path <file>", purpose: "Save findings report to JSON, SARIF, or CSV" },
      { flag: "-v, --verbose", purpose: "Show exact code snippets containing identified secrets" },
    ],
    terminalSim: {
      command: "gitleaks detect -v --source=./project",
      outputLines: [
        { text: "[*] Gitleaks v8.18: Inspecting 120 commits...", type: "info" },
        { text: "[+] Finding: Slack Webhook URL in config/alerts.ts (Line 42)", type: "warn" },
        { text: "    Commit: 4a2b1c (Merge pull request #12)", type: "dim" },
        { text: "[*] 1 secret identified. Clean repository status: FAILED", type: "dim" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 (Source Code Cryptographic Audit)",
  },
];

export const OSINT_WORKFLOWS: OsintWorkflow[] = [
  {
    id: "suspect-persona",
    targetType: "Online Persona / Handle",
    title: "Digital Footprint & Identity Correlation",
    scenario: "A malicious cyber actor has created an anonymous handle (@phantom_sec_99). The investigator needs to uncover the real-world identity, registered emails, and physical location.",
    sampleTarget: "@phantom_sec_99",
    steps: [
      {
        toolId: "sherlock",
        action: "Rapid multi-platform handle enumeration across 400+ services",
        outputPreview: "Discovered live accounts on GitHub, Twitter/X, Reddit, and Telegram.",
        status: "completed",
      },
      {
        toolId: "maigret",
        action: "Scrape profile bios, avatar perceptual hashes, and secondary handles",
        outputPreview: "Correlated secondary handle @tarik_dev on developer boards; bio matches Bangalore timezone.",
        status: "completed",
      },
      {
        toolId: "holehe",
        action: "Cross-reference inferred email handles against password-reset validation endpoints",
        outputPreview: "Found registered Amazon, Instagram, and Discord with partial phone ending in ..42.",
        status: "completed",
      },
      {
        toolId: "ghunt",
        action: "Query Google Identity Graph using discovered Gmail address",
        outputPreview: "Extracted permanent 21-digit Gaia ID, public Google Maps reviews in Bangalore.",
        status: "completed",
      },
    ],
    extractedEntities: [
      { type: "Primary Alias", value: "phantom_sec_99", confidence: "100%" },
      { type: "Secondary Handle", value: "tarik_dev", confidence: "94.2%" },
      { type: "Discovered Email", value: "suspect.p***@gmail.com", confidence: "98%" },
      { type: "Phone Fragment", value: "+91 ••••• ••42", confidence: "90%" },
      { type: "Physical Locality", value: "Bangalore, Karnataka, India", confidence: "95%" },
    ],
    verdict: "ATTRIBUTION VERIFIED: The anonymous handle was positively mapped to a single real-world individual with verified geographic habits and cross-platform presence.",
  },
  {
    id: "phone-intel",
    targetType: "Telecom / Phone Number",
    title: "Carrier Lookup & Social Linkage",
    scenario: "An unknown telephone number (+91 98765 43210) made fraudulent contact. The objective is to identify telecom operator, circle, WhatsApp/Telegram presence, and registrant identity.",
    sampleTarget: "+91 98765 43210",
    steps: [
      {
        toolId: "phoneinfoga",
        action: "HLR carrier lookup and telecom circle determination",
        outputPreview: "Carrier: Reliance Jio Infocomm Ltd | Line: Mobile GSM | Circle: Karnataka / Bangalore.",
        status: "completed",
      },
      {
        toolId: "ignorant",
        action: "Passive social registration probing without alerting target device",
        outputPreview: "Confirmed active registrations on WhatsApp and Snapchat; avatar extracted.",
        status: "completed",
      },
      {
        toolId: "bellingcat-telegram",
        action: "Telegram MTProto API query to resolve phone number to account ID",
        outputPreview: "Resolved to Telegram User ID 1982736412 (Display Name: Tarik I., Handle: @tarik_cyber).",
        status: "completed",
      },
      {
        toolId: "sherlock",
        action: "Pivot on discovered Telegram handle across developer and gaming networks",
        outputPreview: "Correlated GitHub and Keybase profiles confirming cryptographic PGP identity.",
        status: "completed",
      },
    ],
    extractedEntities: [
      { type: "Telecom Carrier", value: "Reliance Jio Infocomm", confidence: "100%" },
      { type: "Telecom Circle", value: "Karnataka Circle, IN", confidence: "100%" },
      { type: "Telegram User ID", value: "1982736412 (@tarik_cyber)", confidence: "100%" },
      { type: "Linked Full Name", value: "Tarik Islam", confidence: "92%" },
    ],
    verdict: "TELECOM ATTRIBUTION ESTABLISHED: Phone number unmasked to active Telegram and social presence with geographic origin in Bangalore, India.",
  },
  {
    id: "document-forensics",
    targetType: "File / Document Evidence",
    title: "EXIF Metadata & Document Forensics",
    scenario: "A leaked photograph and confidential PDF document were received. The forensic examiner must prove origin, camera hardware serials, exact GPS coordinates, and author usernames.",
    sampleTarget: "evidence_leak_2026.jpg & policy.pdf",
    steps: [
      {
        toolId: "exiftool",
        action: "Deep EXIF/XMP/IPTC metadata parse of image file",
        outputPreview: "Camera: iPhone 16 Pro | GPS: 12.9706° N, 77.5923° E | Timestamp: 2026:05:10 14:18:49.",
        status: "completed",
      },
      {
        toolId: "metagoofil",
        action: "Document structure and metadata analysis of associated PDF files",
        outputPreview: "Author: j.doe | Domain: CORP-AD | Server Path: \\\\SRV-FILE02\\Finance.",
        status: "completed",
      },
      {
        toolId: "foca",
        action: "Cross-document correlation to map internal corporate IT infrastructure",
        outputPreview: "Uncovered internal subnet 10.240.12.0/24 and internal domain controller hostname.",
        status: "completed",
      },
    ],
    extractedEntities: [
      { type: "GPS Coordinates", value: "12.9706° N, 77.5923° E (Bangalore)", confidence: "99.9%" },
      { type: "Camera Hardware", value: "Apple iPhone 16 Pro (Lens: 24mm f/1.78)", confidence: "100%" },
      { type: "Internal Author", value: "j.doe (Active Directory)", confidence: "95%" },
      { type: "Internal File Server", value: "\\\\SRV-FILE02\\Finance", confidence: "98%" },
    ],
    verdict: "CHAIN OF CUSTODY PRESERVED: Evidentiary metadata conclusively established the exact device, time, physical location, and corporate author behind the files.",
  },
  {
    id: "infrastructure-recon",
    targetType: "Domain / Attack Surface",
    title: "Enterprise Attack Surface Mapping",
    scenario: "An organization (dezo.in) requires complete external surface reconnaissance to detect exposed staging subdomains, cloud secrets, and unauthorized DNS records.",
    sampleTarget: "dezo.in",
    steps: [
      {
        toolId: "amass",
        action: "Passive ASN and certificate transparency log harvesting",
        outputPreview: "Mapped apex domain and subdomains across Vercel Anycast edge and Cloudflare CDN.",
        status: "completed",
      },
      {
        toolId: "spiderfoot",
        action: "Automated 200-source intelligence graph correlation",
        outputPreview: "Identified staging.dezo.in with HTTP 401 basic auth barrier; no exposed S3 buckets.",
        status: "completed",
      },
      {
        toolId: "whatweb",
        action: "Web framework fingerprinting and HTTP security header audit",
        outputPreview: "Detected Next.js/React 19 with strict HSTS and Content-Security-Policy headers.",
        status: "completed",
      },
      {
        toolId: "trufflehog",
        action: "Audit public code repositories for leaked secrets or API keys",
        outputPreview: "Zero live credentials found across all public commits; clean security posture.",
        status: "completed",
      },
    ],
    extractedEntities: [
      { type: "Apex IP Address", value: "76.76.21.21 (Anycast Global CDN)", confidence: "100%" },
      { type: "Discovered Hosts", value: "dezo.in, api.dezo.in, staging.dezo.in", confidence: "100%" },
      { type: "Web Framework", value: "Next.js 15 / React 19", confidence: "100%" },
      { type: "Secret Leak Status", value: "CLEAN (0 active leaks found)", confidence: "100%" },
    ],
    verdict: "ATTACK SURFACE HARDENED: External perimeter is properly secured with edge Anycast routing, protected staging environments, and zero credential exposure.",
  },
];

// Curated Open-Source Intelligence (OSINT) & Digital Forensics Information Gathering Arsenal.
// Sourced directly from GitHub's premier open-source investigative and intelligence toolchains.
// Used for digital footprint analysis, suspect intelligence, asset discovery, and forensic investigation.

export type OsintCategory =
  | "username"
  | "email"
  | "phone"
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
  targetVector: string; // e.g. "Username / Online Handle"
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

export const OSINT_CATEGORIES: { id: OsintCategory | "all"; label: string; icon: string }[] = [
  { id: "all", label: "All Arsenal", icon: "Terminal" },
  { id: "username", label: "Username & Identity", icon: "UserSearch" },
  { id: "email", label: "Email & Account Footprint", icon: "Mail" },
  { id: "phone", label: "Phone & Carrier Intel", icon: "Phone" },
  { id: "metadata", label: "Exif & Document Forensics", icon: "FileSearch" },
  { id: "network", label: "Graph & Infrastructure", icon: "Network" },
  { id: "breach", label: "Breach & Credentials", icon: "KeyRound" },
];

export const OSINT_TOOLS: OsintTool[] = [
  {
    id: "sherlock",
    name: "Sherlock",
    githubOwner: "sherlock-project",
    githubRepo: "sherlock",
    githubUrl: "https://github.com/sherlock-project/sherlock",
    stars: "60k+",
    category: "username",
    categoryLabel: "Username & Identity",
    targetVector: "Username / Online Alias",
    tagline: "Hunt down social media accounts by username across 400+ platforms in parallel.",
    description:
      "Sherlock is the industry-standard OSINT utility for locating target accounts across hundreds of online services. It tests for username registration without false positives through regex signature matching and HTTP status validation.",
    whatItExtracts: [
      "Active accounts across 400+ social networks, forums, and developer hubs",
      "Exact target profile URLs across Twitter/X, Instagram, GitHub, Reddit, TikTok",
      "Hidden secondary aliases and platform-specific profile linkages",
      "Exportable evidence dossiers in CSV, JSON, and text formats",
    ],
    cliCommand: "sherlock target_alias --timeout 15 --csv dossier.csv",
    cliFlags: [
      { flag: "--timeout 15", purpose: "Prevent hanging on rate-limited platforms" },
      { flag: "--csv dossier.csv", purpose: "Generate court-ready structured CSV output" },
      { flag: "--nsfw", purpose: "Include adult & underground service discovery" },
      { flag: "--print-found", purpose: "Only log confirmed positive matches" },
    ],
    terminalSim: {
      command: "sherlock target_alias --csv evidence.csv --print-found",
      outputLines: [
        { text: "[*] Checking username target_alias across 412 platforms...", type: "info" },
        { text: "[+] GitHub: https://github.com/target_alias", type: "success" },
        { text: "[+] Twitter/X: https://x.com/target_alias", type: "success" },
        { text: "[+] Instagram: https://www.instagram.com/target_alias", type: "success" },
        { text: "[+] Reddit: https://www.reddit.com/user/target_alias", type: "success" },
        { text: "[+] Spotify: https://open.spotify.com/user/target_alias", type: "success" },
        { text: "[+] Telegram: https://t.me/target_alias", type: "success" },
        { text: "[+] Keybase: https://keybase.io/target_alias", type: "success" },
        { text: "[*] Investigation complete: 18 active identities correlated.", type: "accent" },
        { text: "[*] SHA-256 evidence.csv: 8f4b23a9d1c7... [SAVED]", type: "dim" },
      ],
    },
    forensicStandard: "NIST SP 800-86 §3.2 (Digital Artifact Acquisition)",
  },
  {
    id: "maigret",
    name: "Maigret",
    githubOwner: "soxoj",
    githubRepo: "maigret",
    githubUrl: "https://github.com/soxoj/maigret",
    stars: "13k+",
    category: "username",
    categoryLabel: "Username & Identity",
    targetVector: "Username / Online Alias",
    tagline: "Recursive username dossier compiler with profile scraping and graph correlation.",
    description:
      "Named after the fictional detective Jules Maigret, this advanced Python tool parses webpages to extract user bio information, real names, avatars, location clues, and linked social accounts, building a complete investigative report.",
    whatItExtracts: [
      "User bios, declared locations, and real-name correlations",
      "Avatar image downloading and visual cross-matching",
      "Cross-platform profile linkages and linked websites",
      "Automated dossier compilation into HTML and PDF reports",
    ],
    cliCommand: "maigret target_handle -a --html --pdf --folder ./case_dossier",
    cliFlags: [
      { flag: "-a", purpose: "Download user avatars and analyze profile pictures" },
      { flag: "--html", purpose: "Generate interactive HTML dossier with profile previews" },
      { flag: "--pdf", purpose: "Compile forensic PDF report for investigative records" },
      { flag: "--tags tech,crypto", purpose: "Prioritize specific sector platforms" },
    ],
    terminalSim: {
      command: "maigret target_handle -a --html",
      outputLines: [
        { text: "[?] Starting recursive dossier scan for 'target_handle'...", type: "info" },
        { text: "[+] GitHub: Found (Name: 'T. Vance', Bio: 'Full-stack & Security')", type: "success" },
        { text: "[+] Gravatar: Linked email hash discovered (MD5: d41d8cd98f00...)", type: "accent" },
        { text: "[+] Steam Community: Custom URL match (ID: 76561198...)", type: "success" },
        { text: "[+] Mastodon: Active instance found @infosec.exchange", type: "success" },
        { text: "[*] Extracted 4 profile avatars -> stored in /case_dossier/avatars", type: "info" },
        { text: "[*] Dossier compiled: ./case_dossier/report_target_handle.html", type: "accent" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §6.4 (Forensic Evidence Assembly)",
  },
  {
    id: "holehe",
    name: "Holehe",
    githubOwner: "megadose",
    githubRepo: "holehe",
    githubUrl: "https://github.com/megadose/holehe",
    stars: "6.5k+",
    category: "email",
    categoryLabel: "Email & Account Footprint",
    targetVector: "Email Address",
    tagline: "Discovers registered services for any email address without alerting the target.",
    description:
      "Holehe checks if an email is attached to accounts across 120+ platforms (including Twitter, Instagram, GitHub, Discord, Deliveroo, Amazon) by querying password-recovery and registration verification flows without triggering OTPs or alert emails.",
    whatItExtracts: [
      "Confirmation of registration across 120+ major consumer and tech platforms",
      "Masked recovery phone numbers (e.g. '******32' revealing carrier or last digits)",
      "Partial recovery email hints (e.g. 't***k@g***l.com')",
      "Zero footprint on target: no notification emails or reset tokens dispatched",
    ],
    cliCommand: "holehe target@domain.com --only-used",
    cliFlags: [
      { flag: "--only-used", purpose: "Display only confirmed registered services" },
      { flag: "--no-color", purpose: "Raw text mode for programmatic parsing" },
      { flag: "--timeout 8", purpose: "Optimize per-endpoint HTTP connection timeout" },
    ],
    terminalSim: {
      command: "holehe suspect@example.com --only-used",
      outputLines: [
        { text: "[*] Initiating non-alerting email audit for suspect@example.com", type: "info" },
        { text: "[+] Twitter/X: Registered (Recovery hint: +** *******30)", type: "success" },
        { text: "[+] Instagram: Registered (Linked phone ending in 30)", type: "success" },
        { text: "[+] GitHub: Registered (Public GPG keys detected)", type: "success" },
        { text: "[+] Spotify: Registered", type: "success" },
        { text: "[+] Discord: Registered (User ID linkable)", type: "success" },
        { text: "[+] Amazon: Registered (Payment profile active)", type: "warn" },
        { text: "[+] Deliveroo: Registered (Recovery email: s****t@gmail.com)", type: "accent" },
        { text: "[*] 14 platforms registered. Target zero-knowledge maintained.", type: "accent" },
      ],
    },
    forensicStandard: "NIST SP 800-86 §4.1 (Non-Intrusive Artifact Correlation)",
  },
  {
    id: "ghunt",
    name: "GHunt",
    githubOwner: "mxrch",
    githubRepo: "GHunt",
    githubUrl: "https://github.com/mxrch/GHunt",
    stars: "17k+",
    category: "email",
    categoryLabel: "Email & Account Footprint",
    targetVector: "Google Account / Gmail",
    tagline: "Modular Google OSINT suite to extract GaiaID, Maps reviews, and account telemetry.",
    description:
      "GHunt analyzes any target Google account through public Google API endpoints. It extracts the permanent Gaia ID, profile pictures, YouTube channels, public Google Drive documents, and Google Maps reviews—frequently pinpointing historical physical locations.",
    whatItExtracts: [
      "Permanent Google Gaia ID (survives email / name changes)",
      "High-resolution profile photos with camera/upload metadata",
      "Google Maps reviews with exact coordinates, timestamps, and visited venues",
      "Associated YouTube channels, Google Play comments, and public albums",
    ],
    cliCommand: "ghunt email target@gmail.com",
    cliFlags: [
      { flag: "email", purpose: "Target vector: analyze email / Gmail account" },
      { flag: "gaia", purpose: "Target vector: analyze directly via Gaia ID" },
      { flag: "drive", purpose: "Extract owner and collaborator metadata from Drive link" },
    ],
    terminalSim: {
      command: "ghunt email target@gmail.com",
      outputLines: [
        { text: "[*] Querying Google People & Identity endpoints...", type: "info" },
        { text: "[+] Gaia ID: 108472910482910492817", type: "accent" },
        { text: "[+] Display Name: Tarik I. [Last updated: 2026-04-12]", type: "success" },
        { text: "[+] Profile Photo URL: https://lh3.googleusercontent.com/a-/...", type: "dim" },
        { text: "[+] YouTube Channel: UCx98... (12 public playlists)", type: "success" },
        { text: "[+] Google Maps Reviews: 14 reviews detected", type: "warn" },
        { text: "    -> Bhubaneswar Coffee Roasters (20.2961° N, 85.8245° E)", type: "info" },
        { text: "    -> Cyber Tech Hub, InfoCity (20.3541° N, 85.8172° E)", type: "info" },
        { text: "[*] Geospatial cluster: Bhubaneswar, Odisha, India", type: "accent" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §7.2 (Geospatial & Account Verification)",
  },
  {
    id: "theharvester",
    name: "theHarvester",
    githubOwner: "laramies",
    githubRepo: "theHarvester",
    githubUrl: "https://github.com/laramies/theHarvester",
    stars: "12k+",
    category: "email",
    categoryLabel: "Email & Account Footprint",
    targetVector: "Domain / Organization / Persona",
    tagline: "Gathers emails, employee names, subdomains, IPs, and URLs across 40+ OSINT sources.",
    description:
      "A classic and essential tool for reconnaissance in penetration testing and cyber investigations. It collects publicly exposed email addresses, names, subdomains, IPs, and URLs using search engines (Google, Bing), PGP servers, Hunter.io, and LinkedIn.",
    whatItExtracts: [
      "Public email addresses belonging to domain or specific employee names",
      "Associated subdomains, DNS records, and exposed hosting IP addresses",
      "Employee names and positions indexed on LinkedIn and public directories",
      "PGP public keys and developer key fingerprints",
    ],
    cliCommand: "theHarvester -d targetdomain.com -b all -l 500 -f output_recon",
    cliFlags: [
      { flag: "-d targetdomain.com", purpose: "Target domain to harvest intelligence for" },
      { flag: "-b all", purpose: "Query all search engines, PGP servers, and APIs" },
      { flag: "-l 500", purpose: "Limit search results per engine to 500 records" },
      { flag: "-f output", purpose: "Save results to HTML and XML for evidence archives" },
    ],
    terminalSim: {
      command: "theHarvester -d dezo.in -b all -l 200",
      outputLines: [
        { text: "[*] Harvesting targets for dezo.in across search engines & PGP...", type: "info" },
        { text: "[*] Searching Google, Bing, DuckDuckGo, Yahoo, PGP...", type: "dim" },
        { text: "[+] Emails found: 3", type: "success" },
        { text: "    - contact@dezo.in", type: "info" },
        { text: "    - tarik@dezo.in", type: "accent" },
        { text: "    - security@dezo.in", type: "info" },
        { text: "[+] Hosts found: 4", type: "success" },
        { text: "    - api.dezo.in (76.76.21.21)", type: "dim" },
        { text: "    - app.dezo.in (76.76.21.21)", type: "dim" },
        { text: "[*] Harvest complete. Evidence logged.", type: "accent" },
      ],
    },
    forensicStandard: "NIST SP 800-115 §3.1 (Passive Target Reconnaissance)",
  },
  {
    id: "phoneinfoga",
    name: "PhoneInfoga",
    githubOwner: "sundowndev",
    githubRepo: "phoneinfoga",
    githubUrl: "https://github.com/sundowndev/phoneinfoga",
    stars: "13k+",
    category: "phone",
    categoryLabel: "Phone & Carrier Intel",
    targetVector: "International Phone Number",
    tagline: "Advanced information gathering & reconnaissance framework for phone numbers.",
    description:
      "PhoneInfoga is one of the most advanced tools to scan international phone numbers. It checks carrier network, line type (Mobile vs VoIP / virtual number), country code, timezone, and runs automated Google search dorks across hundreds of public footprint sites.",
    whatItExtracts: [
      "Telecom carrier network and original assignment provider",
      "Line type verification: Mobile vs Landline vs VoIP (virtual / burner number)",
      "Standard international formatting (E.164, RFC3966, International)",
      "Automated OSINT search engine dorks linking number to pastes and profiles",
    ],
    cliCommand: "phoneinfoga scan -n '+918984473230'",
    cliFlags: [
      { flag: "scan -n <num>", purpose: "Perform full carrier and footprint scan" },
      { flag: "serve -p 8080", purpose: "Launch web GUI dashboard for visual investigations" },
      { flag: "--recon", purpose: "Enable deep search engine dorking scans" },
    ],
    terminalSim: {
      command: "phoneinfoga scan -n '+918984473230'",
      outputLines: [
        { text: "[*] Formatting number: +91 89844 73230 (E.164: +918984473230)", type: "info" },
        { text: "[+] Country: India (ISO: IN, Prefix: +91)", type: "success" },
        { text: "[+] Location: Odisha Telecom Circle", type: "success" },
        { text: "[+] Line Type: MOBILE", type: "accent" },
        { text: "[+] Original Carrier: Bharti Airtel Limited", type: "success" },
        { text: "[+] Number Validity: True (Possible: True)", type: "success" },
        { text: "[*] Executing 14 Google footprint dorks...", type: "info" },
        { text: "    -> Found reference: Portfolio / Academic Contact Records", type: "dim" },
        { text: "[*] Reputation status: Legitimate (No spam / fraud reports)", type: "accent" },
      ],
    },
    forensicStandard: "ITU-T E.164 / ISO/IEC 27037 (Telecommunications Triage)",
  },
  {
    id: "ignorant",
    name: "Ignorant",
    githubOwner: "megadose",
    githubRepo: "ignorant",
    githubUrl: "https://github.com/megadose/ignorant",
    stars: "1.2k+",
    category: "phone",
    categoryLabel: "Phone & Carrier Intel",
    targetVector: "Phone Number",
    tagline: "Checks if a phone number is registered on Amazon, Instagram, WhatsApp, and Snapchat.",
    description:
      "A fast and stealthy Python reconnaissance tool that checks phone number registration across major online platforms without notifying the owner. Useful for linking an unknown burner or suspect number to human consumer profiles.",
    whatItExtracts: [
      "Registered status on WhatsApp, Amazon, Instagram, Snapchat",
      "Confirmation whether the phone number is tied to an active mobile identity",
      "Zero-alert design: no SMS verification codes triggered",
    ],
    cliCommand: "ignorant +918984473230",
    cliFlags: [
      { flag: "+country_code", purpose: "Provide number in standard international format" },
      { flag: "--rate-limit", purpose: "Throttle queries to avoid IP throttling" },
    ],
    terminalSim: {
      command: "ignorant +918984473230",
      outputLines: [
        { text: "[*] Checking service registrations for +918984473230...", type: "info" },
        { text: "[+] WhatsApp: Registered (Active status)", type: "success" },
        { text: "[+] Instagram: Registered (Linked profile verified)", type: "success" },
        { text: "[+] Amazon: Registered (Account active)", type: "warn" },
        { text: "[-] Snapchat: Not registered / Private", type: "dim" },
        { text: "[*] Correlation score: High confidence active consumer profile.", type: "accent" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 §5.3 (Digital Identity Verification)",
  },
  {
    id: "exiftool",
    name: "ExifTool",
    githubOwner: "exiftool",
    githubRepo: "exiftool",
    githubUrl: "https://github.com/exiftool/exiftool",
    stars: "8k+",
    category: "metadata",
    categoryLabel: "Exif & Document Forensics",
    targetVector: "Images / Videos / Files (JPEG, PNG, MP4, PDF)",
    tagline: "The gold standard forensic metadata parser for GPS, camera serials, and edit history.",
    description:
      "Maintained by Phil Harvey, ExifTool is universally recognized as the world's most capable metadata reader and writer. In forensic investigations, it extracts hidden GPS coordinates, exact creation timestamps, camera hardware serials, software edit chains, and thumbnail caches.",
    whatItExtracts: [
      "Exact GPS Latitude, Longitude, Altitude, and Geo-Referenced timestamps",
      "Camera Make, Model, Lens Serial Number, and Firmware Version",
      "Original File Creation Date vs System Modification Date",
      "Editing history (Adobe Photoshop, Lightroom, GIMP, Mobile OS revisions)",
      "Document author names, printer spool metadata, and hidden revisions",
    ],
    cliCommand: "exiftool -a -u -g1 -GPS* -CreateDate evidence_photo.jpg",
    cliFlags: [
      { flag: "-a", purpose: "Allow duplicate tags from different metadata blocks" },
      { flag: "-u", purpose: "Extract unknown/vendor-proprietary tags" },
      { flag: "-g1", purpose: "Group output by metadata family (EXIF, XMP, MakerNotes)" },
      { flag: "-json", purpose: "Export structured JSON for automated forensic pipelines" },
    ],
    terminalSim: {
      command: "exiftool -a -g1 -GPS* -CreateDate -Make -Model photo.jpg",
      outputLines: [
        { text: "---- IFD0 ----", type: "dim" },
        { text: "Make                            : Apple", type: "info" },
        { text: "Camera Model Name               : iPhone 15 Pro", type: "info" },
        { text: "Software                        : 17.4.1", type: "dim" },
        { text: "---- ExifIFD ----", type: "dim" },
        { text: "Date/Time Original              : 2026:03:14 14:22:08.412", type: "success" },
        { text: "Lens Model                      : iPhone 15 Pro back camera 6.76mm f/1.78", type: "info" },
        { text: "---- GPS ----", type: "accent" },
        { text: "GPS Latitude Ref                : North", type: "accent" },
        { text: "GPS Latitude                    : 20 deg 17' 45.96\" N", type: "accent" },
        { text: "GPS Longitude Ref               : East", type: "accent" },
        { text: "GPS Longitude                   : 85 deg 49' 28.20\" E", type: "accent" },
        { text: "GPS Position                    : 20.296100, 85.824500 (Bhubaneswar, IN)", type: "success" },
      ],
    },
    forensicStandard: "ISO/IEC 27037 / NIST SP 800-86 (Digital Evidence Integrity)",
  },
  {
    id: "metagoofil",
    name: "Metagoofil",
    githubOwner: "opsdisk",
    githubRepo: "metagoofil",
    githubUrl: "https://github.com/opsdisk/metagoofil",
    stars: "1.5k+",
    category: "metadata",
    categoryLabel: "Exif & Document Forensics",
    targetVector: "Public Documents (PDF, DOCX, XLSX, PPTX)",
    tagline: "Extracts metadata from public organization documents to uncover internal usernames.",
    description:
      "Metagoofil utilizes search engine queries to locate and download public documents (PDF, Word, Excel, PowerPoint) belonging to a target target or company. It then extracts usernames, software versions, local file paths, and network printer names.",
    whatItExtracts: [
      "Internal usernames and employee system logins (e.g. 'Administrator', 'tislam')",
      "Full local computer file paths (e.g. 'C:\\Users\\tarik\\Documents\\Confidential\\')",
      "Software versions (e.g. Microsoft Office 2019, LibreOffice, Adobe InDesign)",
      "Internal network printer paths and server names",
    ],
    cliCommand: "metagoofil -d target.com -t pdf,docx -l 100 -n 25 -o evidence/ -f report.html",
    cliFlags: [
      { flag: "-d target.com", purpose: "Target domain to scour for indexed documents" },
      { flag: "-t pdf,docx", purpose: "File extensions to harvest and analyze" },
      { flag: "-l 100", purpose: "Maximum search engine results to evaluate" },
      { flag: "-o evidence/", purpose: "Directory to save downloaded files" },
    ],
    terminalSim: {
      command: "metagoofil -d target.com -t pdf -l 50 -n 10 -o ./docs -f audit.html",
      outputLines: [
        { text: "[*] Searching target.com documents via Google & Bing...", type: "info" },
        { text: "[+] Found 12 public PDF files. Downloading...", type: "dim" },
        { text: "[*] Extracting metadata from downloaded artifacts...", type: "info" },
        { text: "[+] Usernames found: 4", type: "success" },
        { text: "    - tislam (Author: Q4_Security_Review.pdf)", type: "accent" },
        { text: "    - rsharma (Author: Network_Topology_2025.pdf)", type: "info" },
        { text: "[+] Software: macOS 15.2 / Microsoft Word for Mac 16.89", type: "dim" },
        { text: "[+] Internal Path: /Users/tarik/Vault/CaseFiles/evidence.pdf", type: "warn" },
        { text: "[*] HTML Report generated: audit.html", type: "accent" },
      ],
    },
    forensicStandard: "NIST SP 800-115 (Information Gathering & Threat Surface)",
  },
  {
    id: "spiderfoot",
    name: "SpiderFoot",
    githubOwner: "smicallef",
    githubRepo: "spiderfoot",
    githubUrl: "https://github.com/smicallef/spiderfoot",
    stars: "15k+",
    category: "network",
    categoryLabel: "Graph & Infrastructure",
    targetVector: "Multi-Vector (Name, Email, IP, Domain, Phone)",
    tagline: "Automated OSINT collection engine integrating 200+ data sources for intelligence mapping.",
    description:
      "SpiderFoot automates the gathering of intelligence about a given target. Whether targeting an IP, domain name, email address, phone number, or human name, SpiderFoot queries over 200 open-source data modules and constructs a linked relationship graph.",
    whatItExtracts: [
      "Linked Bitcoin/crypto wallet addresses and blockchain transactions",
      "Exposed cloud storage buckets (AWS S3, Azure Blob, Google Cloud Storage)",
      "Darknet forum mentions, pastebin leaks, and compromised credentials",
      "Network infrastructure: DNS, ASNs, SSL certs, open ports, web tech stack",
    ],
    cliCommand: "python3 sf.py -s target_entity -m all -o json",
    cliFlags: [
      { flag: "-s target", purpose: "Target name, domain, email, or IP address" },
      { flag: "-m all", purpose: "Run all 200+ OSINT data gathering modules" },
      { flag: "-l 127.0.0.1:5001", purpose: "Launch web-based interactive investigation dashboard" },
    ],
    terminalSim: {
      command: "python3 sf.py -s target_entity -u cli",
      outputLines: [
        { text: "[*] SpiderFoot 4.0 initiated for target: 'target_entity'", type: "info" },
        { text: "[+] sfp_dns: Discovered 8 associated DNS records", type: "dim" },
        { text: "[+] sfp_socialmedia: Correlated 16 social identities", type: "success" },
        { text: "[+] sfp_haveibeenpwned: Target found in 2 public breaches", type: "warn" },
        { text: "[+] sfp_pgp: Discovered 4096-bit RSA key ID: 786A9114...", type: "accent" },
        { text: "[+] sfp_maltego: Correlation graph compiled (64 entities)", type: "success" },
        { text: "[*] Scan complete: 112 data points linked into graph database.", type: "accent" },
      ],
    },
    forensicStandard: "NIST SP 800-86 §3 (Automated Multi-Source Triage)",
  },
  {
    id: "amass",
    name: "OWASP Amass",
    githubOwner: "owasp-amass",
    githubRepo: "amass",
    githubUrl: "https://github.com/owasp-amass/amass",
    stars: "11k+",
    category: "network",
    categoryLabel: "Graph & Infrastructure",
    targetVector: "Domain / Network Infrastructure",
    tagline: "In-depth attack surface mapping and external asset discovery engine.",
    description:
      "An OWASP flagship project that performs network mapping of attack surfaces and external asset discovery using open-source information collection and active graph reconnaissance techniques.",
    whatItExtracts: [
      "Subdomains via Certificate Transparency logs and reverse DNS lookups",
      "Autonomous System Numbers (ASNs), CIDR IP routing prefixes",
      "SSL/TLS certificates with Subject Alternative Names (SANs)",
      "Interactive network graph visualization of target perimeter",
    ],
    cliCommand: "amass enum -d target.com -passive -json amass_out.json",
    cliFlags: [
      { flag: "-d target.com", purpose: "Target domain name" },
      { flag: "-passive", purpose: "Pure passive intelligence mode without touching target servers" },
      { flag: "-active", purpose: "Enable DNS zone transfers and SSL handshake collection" },
      { flag: "-json out.json", purpose: "Export structured JSON for database ingestion" },
    ],
    terminalSim: {
      command: "amass enum -d target.com -passive",
      outputLines: [
        { text: "[*] OWASP Amass v4.2.0 passive enumeration running...", type: "info" },
        { text: "[+] Certificate Transparency: app.target.com", type: "success" },
        { text: "[+] Reverse DNS: api-gateway.target.com -> 76.76.21.21", type: "dim" },
        { text: "[+] ASN Discovery: AS15169 (Google LLC), AS16509 (Amazon)", type: "info" },
        { text: "[+] Discovered 24 subdomains without sending a single packet to target", type: "accent" },
      ],
    },
    forensicStandard: "OWASP Testing Guide (v4) / ISO/IEC 27001",
  },
  {
    id: "h8mail",
    name: "h8mail",
    githubOwner: "khast3x",
    githubRepo: "h8mail",
    githubUrl: "https://github.com/khast3x/h8mail",
    stars: "3.8k+",
    category: "breach",
    categoryLabel: "Breach & Credentials",
    targetVector: "Email Address / Domain",
    tagline: "Email breach and credential hunting tool querying breach databases and local torrents.",
    description:
      "h8mail is an email OSINT and breach intelligence tool. It scours multiple public breach sources (HaveIBeenPwned, DeHashed, Hunter.io, Snusbase) and local plaintext breach dumps to identify leaked credentials and historical security compromises.",
    whatItExtracts: [
      "Past data breach incidents involving the target's email",
      "Historical leaked password hashes and plaintext credentials",
      "Associated usernames and breach dates",
      "Exposure timeline across enterprise and consumer breaches",
    ],
    cliCommand: "h8mail -t target@domain.com --loose",
    cliFlags: [
      { flag: "-t <email>", purpose: "Target email address or text file of multiple targets" },
      { flag: "--loose", purpose: "Allow fuzzy matching across known aliases" },
      { flag: "-c config.ini", purpose: "Attach threat intelligence API keys (HIBP, DeHashed)" },
      { flag: "-o report.csv", purpose: "Output breach report to CSV" },
    ],
    terminalSim: {
      command: "h8mail -t suspect@domain.com --loose",
      outputLines: [
        { text: "[*] Checking breach feeds for suspect@domain.com...", type: "info" },
        { text: "[!] Match: LinkedIn Historical Breach (2016)", type: "warn" },
        { text: "    -> SHA-1 Hash exposed: 7c4a8d09ca37... [CRACKABLE]", type: "accent" },
        { text: "[!] Match: Adobe Data Incident (2013)", type: "warn" },
        { text: "    -> Password hint: 'dog_birthday_1998'", type: "dim" },
        { text: "[*] Breach risk assessment: ELEVATED (2 historic credentials recorded)", type: "warn" },
      ],
    },
    forensicStandard: "NIST SP 800-63B (Credential Integrity Audit)",
  },
  {
    id: "social-analyzer",
    name: "Social-Analyzer",
    githubOwner: "qeeqbox",
    githubRepo: "social-analyzer",
    githubUrl: "https://github.com/qeeqbox/social-analyzer",
    stars: "12k+",
    category: "username",
    categoryLabel: "Username & Identity",
    targetVector: "Name / Online Handle",
    tagline: "API, CLI & Web tool for analyzing & profiling a person across 1,000+ social platforms.",
    description:
      "A comprehensive profiling tool designed to analyze people across more than 1,000 websites. It performs linguistic extraction, pattern analysis, and profile correlations, returning extracted profile bios and images.",
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
        { text: "[*] Analyzing persona 'target_alias' across 1,024 websites...", type: "info" },
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
    id: "recon-ng",
    name: "Recon-ng",
    githubOwner: "lanmaster50",
    githubRepo: "recon-ng",
    githubUrl: "https://github.com/lanmaster50/recon-ng",
    stars: "4k+",
    category: "network",
    categoryLabel: "Graph & Infrastructure",
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
        { text: "[*] Loaded workspace 'case_01' (SQLite backing: ~/.recon-ng/workspaces/case_01.db)", type: "info" },
        { text: "[recon-ng][case_01] > modules load recon/domains-contacts/whois_pocs", type: "accent" },
        { text: "[recon-ng][case_01][whois_pocs] > run", type: "accent" },
        { text: "[+] 3 Point of Contact records added to case database.", type: "success" },
        { text: "[recon-ng][case_01] > show contacts", type: "dim" },
        { text: "    Tarik Islam | Administrative Contact | princetarikislam@gmail.com", type: "success" },
      ],
    },
    forensicStandard: "NIST SP 800-86 (Case Management & Auditable DB)",
  },
];

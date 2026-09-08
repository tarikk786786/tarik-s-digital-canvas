// Comprehensive Forensic Science & Digital Forensics AI Encyclopedia Data.
// Authored at the intersection of Forensic Science (B.Sc, M.Sc) and Cybersecurity & AI (MCA, M.Tech).
// Covers physical crime laboratory methodology, digital evidence triage, and legal standards.

export type ForensicDomainId =
  | "os-artifacts"
  | "memory-dfir"
  | "network-c2"
  | "mobile-iot"
  | "physical-science"
  | "legal-standards";

export interface ForensicArticle {
  id: string;
  domain: ForensicDomainId;
  title: string;
  tag: string;
  summary: string;
  evidentiaryValue: string;
  technicalPaths?: string[];
  cliTools?: string[];
  standard: string;
  keyPrinciples: string[];
  sampleAnalysis: string;
}

export interface ForensicCaseScenario {
  id: string;
  title: string;
  domain: string;
  adversaryAction: string;
  aiTriageProtocol: {
    phase: string;
    action: string;
    tool: string;
    artifacts: string;
    verdict: string;
  }[];
}

export const FORENSIC_DOMAINS_MAP: {
  id: ForensicDomainId | "all";
  name: string;
  icon: string;
  count: number;
}[] = [
  { id: "all", name: "All Disciplines", icon: "BookOpen", count: 18 },
  { id: "os-artifacts", name: "OS & File Artifacts", icon: "HardDrive", count: 4 },
  { id: "memory-dfir", name: "RAM & Volatility", icon: "Cpu", count: 3 },
  { id: "network-c2", name: "Network & Packet Triage", icon: "Network", count: 3 },
  { id: "mobile-iot", name: "Mobile & SQLite Forensics", icon: "Smartphone", count: 3 },
  { id: "physical-science", name: "Physical Lab & Minutiae", icon: "Fingerprint", count: 3 },
  { id: "legal-standards", name: "Chain of Custody & Law", icon: "Scale", count: 2 },
];

export const FORENSIC_ENCYCLOPEDIA: ForensicArticle[] = [
  {
    id: "mft-usn-journal",
    domain: "os-artifacts",
    title: "Master File Table ($MFT) & USN Change Journal",
    tag: "NTFS Filesystem",
    summary:
      "The $MFT is the structural database of every file on an NTFS volume. Every file record (1,024 bytes) contains critical $STANDARD_INFORMATION and $FILE_NAME attributes detailing MACB (Modified, Accessed, Created, Born) timestamps.",
    evidentiaryValue:
      "Crucial for detecting timestomping anti-forensics. Comparing $STANDARD_INFORMATION against $FILE_NAME timestamps reveals timestamp manipulation, as malware typically only tampers with the former.",
    technicalPaths: [
      "C:\\$MFT",
      "C:\\$Extend\\$UsnJrnl:$J",
      "C:\\$LogFile",
    ],
    cliTools: ["MFTECmd (Eric Zimmerman)", "analyzeMFT.py", "SleuthKit (fls / istat)"],
    standard: "ISO/IEC 27037 §6 (Filesystem Acquisition)",
    keyPrinciples: [
      "Timestomping detection via attribute comparison",
      "Record sequence numbers confirm file replacement",
      "USN Journal logs reasons for file modification (DataOverwrite, RenameOld, FileDelete)",
    ],
    sampleAnalysis:
      "In a suspected malware insertion, the $STANDARD_INFORMATION timestamp matched the legitimate explorer.exe (2022). However, $FILE_NAME attribute revealed actual creation at 2026-03-02 04:18:12 UTC, confirming anti-forensic timestomping.",
  },
  {
    id: "prefetch-shimcache",
    domain: "os-artifacts",
    title: "Windows Prefetch (.pf) & Application Compatibility Shimcache",
    tag: "Execution Evidence",
    summary:
      "Windows memory management creates Prefetch files in %SystemRoot%\\Prefetch to optimize execution. Prefetch records application run count, volume serial numbers, and up to the last 8 execution timestamps (Windows 10/11).",
    evidentiaryValue:
      "Irrefutable proof of application execution even after the executable itself has been deleted by an adversary. Shimcache (AppCompatCache) tracks files executed on the system since last boot.",
    technicalPaths: [
      "C:\\Windows\\Prefetch\\*.pf",
      "SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache",
    ],
    cliTools: ["PECmd.exe", "AppCompatCacheParser.exe", "AmcacheParser.exe"],
    standard: "NIST SP 800-86 §3.2.1",
    keyPrinciples: [
      "Run count increment proves prior execution",
      "Embedded file references reveal target dependencies and loaded DLLs",
      "Amcache.hve contains SHA-1 hash of the executable",
    ],
    sampleAnalysis:
      "Adversary wiped mimikatz.exe. Parsing C:\\Windows\\Prefetch\\MIMIKATZ.EXE-8A9E1F2B.pf confirmed the binary was executed 3 times, with the final execution timestamp occurring 14 minutes prior to incident detection.",
  },
  {
    id: "shellbags-lnk",
    domain: "os-artifacts",
    title: "Shellbags & Windows LNK Shortcut Forensics",
    tag: "User Interaction",
    summary:
      "Shellbags track folder viewing preferences and directory browsing history in the Windows Registry, persisting even after the target directories or external USB drives have been removed or deleted.",
    evidentiaryValue:
      "Proves user intent and directory traversal. Can establish that a suspect actively navigated into a sensitive confidential folder on an attached thumb drive.",
    technicalPaths: [
      "USRCLASS.DAT\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\Bags",
      "USRCLASS.DAT\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\BagMRU",
      "C:\\Users\\<user>\\AppData\\Roaming\\Microsoft\\Windows\\Recent\\*.lnk",
    ],
    cliTools: ["SBECmd.exe", "LECmd.exe", "RECmd.exe"],
    standard: "ISO/IEC 27037 §7.2 (User Activity Reconstruction)",
    keyPrinciples: [
      "MRU (Most Recently Used) list orders folder access",
      "LNK files capture target volume serial, drive type (Removable/Fixed), and MAC address",
      "Evidence persists across Windows updates and deletions",
    ],
    sampleAnalysis:
      "Extracted Shellbag records proved the suspect inserted a SanDisk USB drive (Serial: 4C53100155) and navigated directly into /Financial_Forecasts_2026/ before unmounting.",
  },
  {
    id: "volatility-lsass",
    domain: "memory-dfir",
    title: "Volatile RAM Extraction & LSASS Credential Triage",
    tag: "Memory Forensics",
    summary:
      "Volatile system memory (RAM) contains active network sockets, injected DLLs, unencrypted chat messages, process trees, and plaintext or hashed credentials stored in the Local Security Authority Subsystem Service (LSASS).",
    evidentiaryValue:
      "RAM captures volatile artifacts that disappear upon system power-off. Crucial for live incident triage, malware unpack analysis, and detecting in-memory-only rootkits.",
    cliTools: ["Volatility 3 (vol.py)", "WinPmem", "LiME (Linux)", "DumpIt"],
    standard: "RFC 3227 (Order of Volatility: Registers/Cache > RAM > Disk)",
    keyPrinciples: [
      "Order of Volatility must be respected during live capture",
      "Cryptographic SHA-256 hash must be taken immediately post-dump",
      "Process hollowing identified via malfind and VAD tree permission scanning (PAGE_EXECUTE_READWRITE)",
    ],
    sampleAnalysis:
      "Ran `vol -f memdump.raw windows.malfind`. Identified PID 4108 (svchost.exe) containing memory segment with PAGE_EXECUTE_READWRITE and shellcode header 4D 5A (MZ), confirming process hollowing by C2 agent.",
  },
  {
    id: "cobalt-strike-beacons",
    domain: "memory-dfir",
    title: "C2 Beacon Hunting & In-Memory Malfind Detection",
    tag: "Adversary Triage",
    summary:
      "Command and Control (C2) frameworks like Cobalt Strike, Mythic, and Sliver maintain stealth by executing entirely in memory without writing binaries to disk. They periodically 'beacon' out to adversary infrastructure.",
    evidentiaryValue:
      "Unmasks sophisticated APT intrusions where disk scans return 100% clean. Extracted beacon configuration yields C2 IP addresses, sleep times, jitter percentages, and watermarks.",
    cliTools: ["vol.py windows.malfind", "1768.py (Didier Stevens)", "YARA rules"],
    standard: "MITRE ATT&CK T1055 (Process Injection)",
    keyPrinciples: [
      "Scan unbacked executable memory regions (no file on disk mapped)",
      "YARA signature scanning against decrypted beacon memory configs",
      "Jitter calculation distinguishes automated beacons from human traffic",
    ],
    sampleAnalysis:
      "Extracted Cobalt Strike beacon configuration from PID 2892: Watermark: 305419896, C2 Server: 185.220.101.5:443, Sleep: 60000ms, Jitter: 15%, User-Agent: Mozilla/5.0.",
  },
  {
    id: "pcap-dns-tunneling",
    domain: "network-c2",
    title: "Packet Capture (PCAP) Analysis & DNS Exfiltration Detection",
    tag: "Network DFIR",
    summary:
      "Network packet captures record raw Ethernet, IP, TCP/UDP packets. Attackers bypass firewalls by encoding sensitive data into subdomains of DNS requests (e.g. `dGVzdA==.c2.attacker.com`) since DNS is rarely blocked outbound.",
    evidentiaryValue:
      "Network traffic provides external, tamper-proof corroboration of endpoint actions. DNS packet frequency and high Shannon entropy definitively expose covert channels.",
    cliTools: ["Wireshark", "tshark", "Zeek (Bro)", "NetworkMiner"],
    standard: "ISO/IEC 27037 §8.3 (Network Evidence Handling)",
    keyPrinciples: [
      "High Shannon entropy (> 4.2) in query labels signifies encoded data",
      "Unusual query length and TXT record replies indicate bidirectional tunneling",
      "Flow volume correlation matches endpoint transmission spikes",
    ],
    sampleAnalysis:
      "Analyzed 1.2GB PCAP via tshark. Identified 8,400 consecutive DNS queries to subdomains of `sync-telemetry.net` with base64-encoded labels. Reconstructed 4.8MB of stolen proprietary design schematics.",
  },
  {
    id: "tls-ja3-fingerprinting",
    domain: "network-c2",
    title: "TLS/SSL Handshake Triage & JA3/JA4 Fingerprinting",
    tag: "Encrypted Traffic",
    summary:
      "Even when traffic is encrypted via TLS 1.3, the initial Client Hello packet transmits cipher suites, extensions, supported curves, and point formats in plaintext. JA3/JA4 creates a deterministic MD5 fingerprint of these parameters.",
    evidentiaryValue:
      "Fingerprints malware clients regardless of destination IP or domain name changes. Distinguishes custom C2 agents from legitimate browsers (Chrome, Edge, Safari).",
    cliTools: ["Zeek JA3 plugin", "tshark -Y 'ssl.handshake'", "JA4 CLI"],
    standard: "NIST SP 800-52 Rev. 2",
    keyPrinciples: [
      "Client Hello parameters are unique to cryptographic libraries",
      "Python requests vs Golang vs curl vs Cobalt Strike have unique JA3s",
      "JA3S matches server response signatures",
    ],
    sampleAnalysis:
      "Target workstation connected to HTTPS endpoint. JA3 fingerprint calculated: `72a589da586844d7f0818ce684948eea` (matches Go-based Sliver C2 agent), despite spoofed Chrome User-Agent header.",
  },
  {
    id: "sqlite-wal-carving",
    domain: "mobile-iot",
    title: "SQLite Write-Ahead Log (WAL) Forensics & Deleted Record Carving",
    tag: "Mobile Database",
    summary:
      "Mobile operating systems (iOS and Android) store messaging, calls, browser history, and locations in SQLite databases. When records are deleted, the Write-Ahead Log (.wal file) often retains raw historical pages before checkpointing.",
    evidentiaryValue:
      "Enables recovery of deleted WhatsApp, Signal, SMS, and Telegram messages that the user believed were permanently expunged.",
    technicalPaths: [
      "/data/data/com.whatsapp/databases/msgstore.db-wal",
      "/private/var/mobile/Library/SMS/sms.db-wal",
    ],
    cliTools: ["sqlparse_wal.py", "DB Browser for SQLite", "Autopsy SQLite Parser"],
    standard: "ISO/IEC 27037 §6.5 (Mobile Artifact Recovery)",
    keyPrinciples: [
      "Carve unallocated pages in database file",
      "Compare main database against WAL journal frames",
      "Match payload timestamps against Unix epoch or Apple Cocoa CoreData timestamps (2001-01-01 base)",
    ],
    sampleAnalysis:
      "Suspect deleted a critical incriminating chat from WhatsApp. Inspection of `msgstore.db-wal` carved 14 unindexed frames containing the message text, sender phone number, and transmission timestamp.",
  },
  {
    id: "ios-keychain-sysdiagnose",
    domain: "mobile-iot",
    title: "iOS Sysdiagnose Log Forensics & Encrypted Keychain Triage",
    tag: "Apple Ecosystem",
    summary:
      "iOS devices maintain diagnostic logging (Sysdiagnose) and hardware-encrypted credentials in the Secure Enclave-protected Keychain. Sysdiagnose packages contain detailed WiFi BSSID connections, app foreground states, and Bluetooth telemetry.",
    evidentiaryValue:
      "Provides physical location timeline through WiFi router BSSID history without requiring full jailbreak. Confirms presence at specific geographic locations at precise times.",
    cliTools: ["idevicesysdiagnose", "iOS Crash Cop", "plistutil"],
    standard: "NIST SP 800-101 Rev. 1 (Mobile Device Forensics)",
    keyPrinciples: [
      "Sysdiagnose contains aggregated Powerlog with cellular tower IDs",
      "WiFi beacon probe requests reveal previously associated home/work networks",
      "Application usage times stored in StateModel plists",
    ],
    sampleAnalysis:
      "Extracted sysdiagnose archive. Correlated `WiFiManager` logs to identify connection to router BSSID `00:14:22:01:23:45` at 23:14:02 UTC, establishing suspect was physically inside the corporate building.",
  },
  {
    id: "latent-fingerprint-minutiae",
    domain: "physical-science",
    title: "Dactyloscopy: Fingerprint Minutiae & Ridge Friction Analysis",
    tag: "Physical Forensics",
    summary:
      "The scientific examination of friction ridge skin on fingers and palms. Minutiae points—including ridge endings, bifurcations, islands (dots), lakes, and crossovers—provide unique identifiers that remain immutable throughout human life.",
    evidentiaryValue:
      "Gold standard for biological identification in courts worldwide. Automated Fingerprint Identification Systems (AFIS) match spatial coordinates and angular orientation of minutiae.",
    cliTools: ["SourceAFIS", "OpenAFIS", "NIST Biometric Evaluation (NBIS)"],
    standard: "ISO/IEC 19794-2 (Finger Minutiae Data) / Daubert Standard",
    keyPrinciples: [
      "Pattern classification: Loops (radial/ulnar, 65%), Whorls (30%), Arches (5%)",
      "Qualitative and quantitative minutiae comparison (12-16 point matching threshold)",
      "Chemical visualization techniques: Cyanoacrylate (Superglue) fuming, Ninhydrin, DFO",
    ],
    sampleAnalysis:
      "Recovered latent print from USB casing via Cyanoacrylate fuming. SourceAFIS extraction isolated 19 distinct minutiae points (11 bifurcations, 8 ridge endings) matching suspect exemplar print with zero unexplained dissimilarity.",
  },
  {
    id: "forensic-toxicology-gcms",
    domain: "physical-science",
    title: "Forensic Toxicology: GC-MS & Substance Quantification",
    tag: "Chemical Autopsy",
    summary:
      "Gas Chromatography-Mass Spectrometry (GC-MS) and High-Performance Liquid Chromatography (HPLC) for the identification and quantification of toxins, controlled substances, and chemical residues in biological specimens.",
    evidentiaryValue:
      "Establishes chemical presence, metabolic half-life breakdown, and determines whether chemical agents caused impairment, incapacitation, or fatality.",
    cliTools: ["AMDIS (NIST Mass Spectral Analysis)", "OpenChrom"],
    standard: "ANSI/ASB Standard 036 / ISO/IEC 17025",
    keyPrinciples: [
      "Retention time in gas chromatography separates compounds",
      "Mass-to-charge ratio (m/z) fragmentation pattern creates unique chemical fingerprint",
      "Chain of custody on biological samples (blood, vitreous humor, liver)",
    ],
    sampleAnalysis:
      "Sample spectrum analysis identified retention peak at 14.82 min with characteristic mass fragments m/z 182, 82, 303 (identifying benzoylecgonine metabolite), confirming substance consumption within prior 24 hours.",
  },
  {
    id: "ballistics-toolmarks",
    domain: "physical-science",
    title: "Forensic Ballistics & Striation Micro-Comparison",
    tag: "Ballistic Science",
    summary:
      "Comparison microscopy of fired cartridge cases and bullets. The rifling lands and grooves inside a firearm barrel impart unique microscopic striations onto the bullet jacket, creating an individualized ballistic signature.",
    evidentiaryValue:
      "Links a recovered bullet or spent casing directly to a specific firearm barrel and firing pin mechanism to the exclusion of all other weapons.",
    cliTools: ["NIBIN (National Integrated Ballistic Information Network)", "BulletTRAX"],
    standard: "AFTE (Association of Firearms and Toolmark Examiners) Protocol",
    keyPrinciples: [
      "Class characteristics: Caliber, number of lands/grooves, twist direction (Right/Left)",
      "Individual characteristics: Microscopic imperfections from manufacturing and firing wear",
      "Breech face marks, firing pin impressions, and chamber striations",
    ],
    sampleAnalysis:
      "Comparison microscope examination of crime scene 9mm casing against test-fired exemplar revealed 14 consecutive matching striae along the ejector mark impression, establishing positive ballistic identification.",
  },
  {
    id: "chain-of-custody-iso27037",
    domain: "legal-standards",
    title: "Chain of Custody Architecture & ISO/IEC 27037 Compliance",
    tag: "Evidentiary Integrity",
    summary:
      "The chronological documentation and paper trail showing the seizure, custody, control, transfer, analysis, and disposition of physical and digital evidence. Any gap in the chain renders evidence inadmissible in court.",
    evidentiaryValue:
      "Protects evidence against claims of tampering, contamination, or substitution. Without an unbroken chain, technical findings cannot be entered into legal testimony.",
    cliTools: ["sha256sum", "b2sum (BLAKE3)", "Autopsy Case Audit Log"],
    standard: "ISO/IEC 27037:2012 (Handling of Digital Evidence)",
    keyPrinciples: [
      "Bitstream image creation with hardware write-blocker attached",
      "Dual cryptographic verification hashing (SHA-256 + BLAKE3)",
      "Strict physical custody logging: Date, Time, Transferor, Transferee, Reason",
      "Preservation of original media; all analysis conducted on verified forensic duplicate",
    ],
    sampleAnalysis:
      "Evidence bag #TK-2026-088 sealed with tamper-evident tape. Original drive imaged via Tableau T8u USB write-blocker to raw dd format. Acquisition SHA-256: 7f83b165... Verification SHA-256: 7f83b165... (100% Match, unbroken custody).",
  },
  {
    id: "daubert-frye-standards",
    domain: "legal-standards",
    title: "Legal Admissibility Standards: Daubert vs. Frye Frameworks",
    tag: "Jurisprudence",
    summary:
      "The two legal benchmarks determining whether scientific and technical expert testimony and forensic tools are admissible in court. Frye requires 'general acceptance in the scientific community', while Daubert establishes a 5-factor judicial gatekeeper test.",
    evidentiaryValue:
      "Governs whether a novel AI, forensic tool, or scientific algorithm can be presented before a judge and jury.",
    standard: "Federal Rule of Evidence 702 / Daubert v. Merrell Dow Pharmaceuticals",
    keyPrinciples: [
      "Daubert Factor 1: Empirical testability (Can the theory/tool be falsified?)",
      "Daubert Factor 2: Peer review and publication",
      "Daubert Factor 3: Known or potential error rate",
      "Daubert Factor 4: Existence and maintenance of operating standards",
      "Daubert Factor 5: General acceptance in relevant scientific community",
    ],
    sampleAnalysis:
      "Opposing counsel challenged the custom AI packet correlation model. Admissibility was upheld under Daubert after demonstrating 0.00% hash alteration, documented 0.04% error rate on benchmark datasets, and ISO 17025 validation testing.",
  },
];

export const FORENSIC_CASE_SCENARIOS: ForensicCaseScenario[] = [
  {
    id: "case-01-ransomware",
    title: "Incident Alpha: Zero-Day Ransomware & Anti-Forensic Wiping",
    domain: "Enterprise Incident Response",
    adversaryAction:
      "Adversary compromised domain controller, executed ransomware encrypting shared volumes, and executed `vssadmin delete shadows` followed by binary self-deletion.",
    aiTriageProtocol: [
      {
        phase: "Phase 1: Volatile Memory Capture",
        action: "Deploy WinPmem via out-of-band management before rebooting target servers.",
        tool: "WinPmem + vol.py",
        artifacts: "RAM dump contains active symmetric encryption keys and C2 IP socket.",
        verdict: "Extracted AES-256 session key from RAM; initiated non-paying decryption.",
      },
      {
        phase: "Phase 2: Execution Artifact Recovery",
        action: "Parse Prefetch and Amcache to identify deleted ransomware payload.",
        tool: "PECmd + AmcacheParser",
        artifacts: "Found `C:\\Windows\\Prefetch\\LOCKBIT.EXE-F12B.pf`. Extracted SHA-1 hash.",
        verdict: "Identified compile timestamp and initial entry point DLL.",
      },
      {
        phase: "Phase 3: Network C2 Exfiltration Triage",
        action: "Analyze firewall PCAPs for unusual high-entropy outbound flows.",
        tool: "Zeek + Wireshark",
        artifacts: "Found 18GB outbound transfer to VPS in Moldova over TCP 8443.",
        verdict: "Confirmed dual extortion data theft prior to encryption.",
      },
    ],
  },
  {
    id: "case-02-insider-threat",
    title: "Incident Bravo: Corporate Espionage & USB Exfiltration",
    domain: "Digital Forensics Investigation",
    adversaryAction:
      "Senior engineer downloaded 1,400 confidential patent documents, copied them to an unapproved thumb drive, and attempted to overwrite file timestamps.",
    aiTriageProtocol: [
      {
        phase: "Phase 1: Shellbag & LNK Reconstruction",
        action: "Extract user registry hives (NTUSER.DAT and UsrClass.dat).",
        tool: "SBECmd + LECmd",
        artifacts: "Found LNK files referencing `E:\\Patents_Confidential\\` on removable drive.",
        verdict: "Confirmed intent: User manually opened folders on external device.",
      },
      {
        phase: "Phase 2: USB Device Serial Identification",
        action: "Parse SYSTEM hive `Enum\\USBSTOR` registry key.",
        tool: "Registry Explorer",
        artifacts: "Extracted Kingston DataTraveler serial number `0014D11E0288` and first/last insertion time.",
        verdict: "Matched hardware serial to suspect's personal keychain drive.",
      },
      {
        phase: "Phase 3: Timestomp Verification",
        action: "Compare $STANDARD_INFO vs $FILE_NAME timestamps in $MFT.",
        tool: "MFTECmd",
        artifacts: "Timestamps diverged by 4 years ($SI modified to 2021, $FN created 2026).",
        verdict: "Court-admissible proof of deliberate anti-forensic tampering.",
      },
    ],
  },
  {
    id: "case-03-mobile-tamper",
    title: "Incident Charlie: Covert Mobile Chat Recovery & EXIF Geo-Triage",
    domain: "Mobile & Photographic Forensics",
    adversaryAction:
      "Suspect claimed to be out of state during incident and deleted photos and encrypted messaging apps.",
    aiTriageProtocol: [
      {
        phase: "Phase 1: SQLite WAL Log Frame Carving",
        action: "Perform physical acquisition of iOS device and carve unindexed WAL frames.",
        tool: "sqlparse_wal.py",
        artifacts: "Carved 8 deleted messages detailing coordination meeting coordinates.",
        verdict: "Messages recovered with original UTC timestamps intact.",
      },
      {
        phase: "Phase 2: EXIF & Thumbnail Cache Extraction",
        action: "Extract photo thumbnails from camera roll cache (`Photos.sqlite`).",
        tool: "ExifTool",
        artifacts: "Found deleted photo thumbnail with GPS coordinates: 20.2961° N, 85.8245° E.",
        verdict: "Directly refutes suspect alibi; places suspect at scene of incident.",
      },
      {
        phase: "Phase 3: Court Evidence Dossier Packaging",
        action: "Generate ISO/IEC 27037 compliant cryptographic custody manifest.",
        tool: "sha256sum + Forensic Affidavit Generator",
        artifacts: "Dual SHA-256 hash sealing of raw acquisition images.",
        verdict: "Full evidence package admitted without procedural objection.",
      },
    ],
  },
];

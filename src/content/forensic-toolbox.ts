/**
 * OPEN-SOURCE DFIR & FORENSIC TOOLBOX REGISTRY
 *
 * Grounded in verified reality and open-source DFIR engineering standards.
 * Categorically separates tools Tarik actively uses from tools familiar with,
 * actively researching, or available in the broader open-source DFIR ecosystem.
 *
 * Strict Compliance:
 * - ISO/IEC 27037 (Digital evidence handling)
 * - NIST SP 800-86 (Guide to Integrating Forensic Techniques into Incident Response)
 * - RFC 3227 (Guidelines for Evidence Collection and Archiving / Order of Volatility)
 */

export type ToolUsageStatus =
  | "Used" // Actively used in lab workflows / investigations
  | "Familiar" // Tested, evaluated, and understood in practice
  | "Researching" // Under active evaluation, lab testing, or research benchmarking
  | "Ecosystem"; // Standard open-source DFIR tool catalogued in the ecosystem

export type ToolCategory =
  | "Disk & File Systems"
  | "Memory Forensics"
  | "Timeline & Reconstruction"
  | "Network & Telemetry"
  | "Endpoint & Triage"
  | "Metadata & Carving"
  | "Reverse Engineering & Malware"
  | "Data Manipulation & Decoding";

export interface DfirTool {
  id: string;
  name: string;
  category: ToolCategory;
  status: ToolUsageStatus;
  license: string;
  officialRepo: string;
  documentationUrl?: string;
  summary: string;
  forensicRole: string;
  keyCapabilities: string[];
  evidentiaryStandard: string;
  pipelineStage:
    | "Acquire"
    | "Preserve"
    | "Verify"
    | "Extract"
    | "Analyse"
    | "Correlate"
    | "Interpret"
    | "Report";
  executionEnvironment:
    "Browser (WebAssembly / Client)" | "Isolated Sandbox Worker" | "CLI / Dedicated Workstation";
  integrationState: "LIVE_IN_BROWSER" | "WORKER_READY" | "WORKER_PENDING" | "REFERENCE_BENCHMARK";
}

export const DFIR_TOOLBOX: DfirTool[] = [
  {
    id: "autopsy",
    name: "Autopsy",
    category: "Disk & File Systems",
    status: "Used",
    license: "Apache 2.0",
    officialRepo: "https://github.com/sleuthkit/autopsy",
    documentationUrl: "https://www.autopsy.com/documentation/",
    summary:
      "Premier open-source digital forensics platform used by law enforcement, military, and corporate examiners worldwide.",
    forensicRole:
      "Automated disk image triage, artifact extraction, web history parsing, and case asset management.",
    keyCapabilities: [
      "Multi-core ingest pipeline for raw DD, E01, and VMDK disk images",
      "Automated web browser history, cache, cookie, and download recovery",
      "File system analysis across NTFS, FAT, exFAT, Ext2/3/4, HFS+, ISO9660",
      "Keyword indexing with Apache Solr and multi-tag evidence flagging",
    ],
    evidentiaryStandard: "NIST CFTT verified, ISO/IEC 27037 case audit logging",
    pipelineStage: "Analyse",
    executionEnvironment: "CLI / Dedicated Workstation",
    integrationState: "WORKER_PENDING",
  },
  {
    id: "sleuthkit",
    name: "The Sleuth Kit (TSK)",
    category: "Disk & File Systems",
    status: "Used",
    license: "IPL / CPL / GPL",
    officialRepo: "https://github.com/sleuthkit/sleuthkit",
    documentationUrl: "http://www.sleuthkit.org/sleuthkit/man/",
    summary:
      "Foundational library and collection of command-line tools for forensic analysis of disk volumes and file systems.",
    forensicRole:
      "Low-level MFT inode inspection, unallocated block carving, and raw partition traversal without OS kernel intervention.",
    keyCapabilities: [
      "File metadata extraction (`istat`, `fls`, `ils`) directly from raw disk structures",
      "Partition table analysis (`mmls`) across MBR, GPT, Sun, and Mac partition schemes",
      "Raw data extraction (`icat`, `blkcat`) bypassing file system API limitations",
      "Timeline generation via bodyfile format output (`fls -m`)",
    ],
    evidentiaryStandard: "ISO/IEC 27037 write-protection verified",
    pipelineStage: "Extract",
    executionEnvironment: "CLI / Dedicated Workstation",
    integrationState: "WORKER_PENDING",
  },
  {
    id: "volatility3",
    name: "Volatility 3",
    category: "Memory Forensics",
    status: "Used",
    license: "Vapor License v1.0",
    officialRepo: "https://github.com/volatilityfoundation/volatility3",
    documentationUrl: "https://volatility3.readthedocs.io/",
    summary:
      "The definitive volatile memory extraction and triage framework for Windows, Linux, and macOS memory images.",
    forensicRole:
      "Physical RAM reconstruction, rootkit detection, unlinked process detection, and in-memory credential/C2 triage.",
    keyCapabilities: [
      "Process tree visualization and Double Linked List traversal (`windows.pstree`)",
      "Hidden process detection via unlinked EPROCESS structures (`windows.psscan`)",
      "Injected code and hollowed memory segment hunting (`windows.malfind`)",
      "Network connection reconstruction from kernel pool allocations (`windows.netscan`)",
    ],
    evidentiaryStandard: "RFC 3227 Order of Volatility #1 compliance",
    pipelineStage: "Analyse",
    executionEnvironment: "CLI / Dedicated Workstation",
    integrationState: "WORKER_PENDING",
  },
  {
    id: "plaso",
    name: "Plaso (log2timeline)",
    category: "Timeline & Reconstruction",
    status: "Familiar",
    license: "Apache 2.0",
    officialRepo: "https://github.com/log2timeline/plaso",
    documentationUrl: "https://plaso.readthedocs.io/",
    summary:
      "Python-based engine designed to extract timestamps from various files on forensic storage and construct super-timelines.",
    forensicRole:
      "Comprehensive multi-source temporal correlation across hundreds of artifact formats simultaneously.",
    keyCapabilities: [
      "Super-timeline construction correlating MFT, syslog, EVTX, browser logs, and cloud telemetry",
      "Deep extraction parsers for Windows Registry, Prefetch, Amcache, and LNK files",
      "Storage to SQLite, Timesketch, or Elasticsearch backend indices",
      "Microsecond-level timestamp normalization to UTC",
    ],
    evidentiaryStandard: "NIST SP 800-86 multi-source correlation standard",
    pipelineStage: "Correlate",
    executionEnvironment: "CLI / Dedicated Workstation",
    integrationState: "WORKER_PENDING",
  },
  {
    id: "timesketch",
    name: "Timesketch",
    category: "Timeline & Reconstruction",
    status: "Researching",
    license: "Apache 2.0",
    officialRepo: "https://github.com/google/timesketch",
    documentationUrl: "https://timesketch.org/",
    summary:
      "Google's open-source collaborative forensic timeline analysis tool built on Elasticsearch and OpenSearch.",
    forensicRole:
      "Collaborative event exploration, narrative construction, and ML-assisted anomalous timeline spike detection.",
    keyCapabilities: [
      "Collaborative timeline search and annotation across distributed investigator teams",
      "Context-aware event clustering and timeline anomaly detection",
      "Interactive graph views connecting entities to timestamped actions",
      "Jupyter Notebook API integration via `timesketch-api-client`",
    ],
    evidentiaryStandard: "Chain of inquiry preservation with immutable audit logs",
    pipelineStage: "Interpret",
    executionEnvironment: "Isolated Sandbox Worker",
    integrationState: "REFERENCE_BENCHMARK",
  },
  {
    id: "wireshark",
    name: "Wireshark / TShark",
    category: "Network & Telemetry",
    status: "Used",
    license: "GPL v2",
    officialRepo: "https://gitlab.com/wireshark/wireshark",
    documentationUrl: "https://www.wireshark.org/docs/",
    summary: "The world's foremost network protocol analyser and deep packet inspection suite.",
    forensicRole:
      "Packet disassembly, protocol compliance verification, C2 beaconing analysis, and stream reassembly.",
    keyCapabilities: [
      "Deep packet dissection across thousands of networking and application protocols",
      "TCP stream reassembly and unencrypted payload extraction",
      "TLS handshake inspection and SNI (Server Name Indication) correlation",
      "Display filter queries for rapid anomaly isolation (`tcp.flags.reset == 1`)",
    ],
    evidentiaryStandard: "RFC 1761 Snoop / PCAP standard formatting",
    pipelineStage: "Analyse",
    executionEnvironment: "CLI / Dedicated Workstation",
    integrationState: "WORKER_PENDING",
  },
  {
    id: "zeek",
    name: "Zeek (formerly Bro)",
    category: "Network & Telemetry",
    status: "Familiar",
    license: "BSD 3-Clause",
    officialRepo: "https://github.com/zeek/zeek",
    documentationUrl: "https://docs.zeek.org/",
    summary:
      "Network security monitoring platform that translates raw packet flow into structured, transaction-level activity logs.",
    forensicRole:
      "Structured network event logging (conn.log, dns.log, http.log, ssl.log) without storing petabytes of raw PCAP.",
    keyCapabilities: [
      "Stateful connection tracking and protocol anomaly profiling",
      "Automatic file extraction from network streams (MIME-type detection)",
      "High-level domain resolution and DNS transaction history indexing",
      "Turing-complete scripting language for domain-specific intrusion heuristics",
    ],
    evidentiaryStandard: "NIST SP 800-92 Computer Security Log Management",
    pipelineStage: "Extract",
    executionEnvironment: "CLI / Dedicated Workstation",
    integrationState: "WORKER_PENDING",
  },
  {
    id: "yara",
    name: "YARA / YARA-X",
    category: "Reverse Engineering & Malware",
    status: "Used",
    license: "BSD 3-Clause / Apache 2.0",
    officialRepo: "https://github.com/VirusTotal/yara-x",
    documentationUrl: "https://yara-x.readthedocs.io/",
    summary:
      "Pattern matching Swiss knife for malware researchers to identify and classify suspicious binary samples.",
    forensicRole:
      "Rule-based textual and binary pattern evaluation across raw disk blocks, memory buffers, and incoming files.",
    keyCapabilities: [
      "Byte sequence, regular expression, and wildcard hex string matching",
      "PE/ELF header dissection and export/import table inspection via modules",
      "Memory buffer scanning with zero modification of examined bytes",
      "Integration with automated triage and sandbox ingest queues",
    ],
    evidentiaryStandard: "Immutable hash and rule signature verification",
    pipelineStage: "Analyse",
    executionEnvironment: "Isolated Sandbox Worker",
    integrationState: "WORKER_READY",
  },
  {
    id: "velociraptor",
    name: "Velociraptor",
    category: "Endpoint & Triage",
    status: "Familiar",
    license: "AGPL v3",
    officialRepo: "https://github.com/Velocidex/velociraptor",
    documentationUrl: "https://docs.velociraptor.app/",
    summary:
      "Advanced endpoint visibility, digital forensics, and threat hunting platform utilizing Velociraptor Query Language (VQL).",
    forensicRole:
      "Targeted remote endpoint evidence collection, live registry querying, and MFT rapid triage across endpoints.",
    keyCapabilities: [
      "Expressive Velociraptor Query Language (VQL) for bespoke forensic queries",
      "Raw NTFS parsing (MFT, USN Journal) directly on live running systems",
      "Process memory scanning and YARA pattern hunting on live endpoints",
      "Automated evidence zip packaging with client-side SHA-256 integrity hashing",
    ],
    evidentiaryStandard: "ISO/IEC 27037 authorized acquisition boundaries",
    pipelineStage: "Acquire",
    executionEnvironment: "Isolated Sandbox Worker",
    integrationState: "WORKER_PENDING",
  },
  {
    id: "exiftool",
    name: "ExifTool",
    category: "Metadata & Carving",
    status: "Used",
    license: "GPL v1 or later",
    officialRepo: "https://github.com/exiftool/exiftool",
    documentationUrl: "https://exiftool.org/",
    summary:
      "Platform-independent command-line application for reading, writing, and editing meta information in a vast array of files.",
    forensicRole:
      "Authentic metadata extraction: camera serials, lens parameters, GPS coordinates, timestamps, and edit history.",
    keyCapabilities: [
      "Parsing of EXIF, IPTC, XMP, MakerNotes, and ICC profile tags across 500+ formats",
      "GPS coordinate extraction and elevation geolocation mapping",
      "Timestamp tampering detection via embedded creation vs filesystem dates",
      "Thumbnail and preview extraction embedded inside RAW images",
    ],
    evidentiaryStandard: "Scientific metadata preservation without byte mutation",
    pipelineStage: "Extract",
    executionEnvironment: "Browser (WebAssembly / Client)",
    integrationState: "LIVE_IN_BROWSER",
  },
  {
    id: "cyberchef",
    name: "CyberChef",
    category: "Data Manipulation & Decoding",
    status: "Used",
    license: "Apache 2.0",
    officialRepo: "https://github.com/gchq/CyberChef",
    documentationUrl: "https://gchq.github.io/CyberChef/",
    summary:
      "The Cyber Swiss Army Knife — a web app for encryption, encoding, compression, and data analysis by GCHQ.",
    forensicRole:
      "Interactive payload deobfuscation, base64/hex decoding, XOR key bruteforcing, and timestamp conversion.",
    keyCapabilities: [
      "Chained modular operations running entirely client-side in the browser",
      "Deobfuscation of malicious scripts, Base64, Hex, URL-encoding, and ROT13",
      "Entropy calculation and visualization to detect encrypted or packed payloads",
      "Date/timestamp normalization across Unix, Windows 64-bit FILETIME, and HFS",
    ],
    evidentiaryStandard: "Deterministic algorithmic transformation transparency",
    pipelineStage: "Verify",
    executionEnvironment: "Browser (WebAssembly / Client)",
    integrationState: "LIVE_IN_BROWSER",
  },
  {
    id: "binwalk",
    name: "Binwalk",
    category: "Reverse Engineering & Malware",
    status: "Familiar",
    license: "MIT",
    officialRepo: "https://github.com/ReFirmLabs/binwalk",
    documentationUrl: "https://github.com/ReFirmLabs/binwalk/wiki",
    summary:
      "Firmware analysis and extraction tool designed for identifying and carving embedded files and executable code inside raw binary images.",
    forensicRole:
      "IoT device firmware reverse engineering, embedded filesystem extraction (SquashFS, CramFS), and steganography detection.",
    keyCapabilities: [
      "Signature scanning for embedded files, compression streams, and bootloaders",
      "Recursive carving and decompression of nested archive structures",
      "Entropy plotting to identify compressed vs encrypted binary regions",
      "Disassembly opcode scanning to identify CPU architectures (ARM, MIPS, x86)",
    ],
    evidentiaryStandard: "Forensic bitstream verification and carving transparency",
    pipelineStage: "Extract",
    executionEnvironment: "CLI / Dedicated Workstation",
    integrationState: "WORKER_PENDING",
  },
  {
    id: "web-crypto-sha",
    name: "Web Crypto Subtitle Integrity Engine",
    category: "Data Manipulation & Decoding",
    status: "Used",
    license: "W3C / Web Standard",
    officialRepo: "https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto",
    documentationUrl: "https://w3c.github.io/webcrypto/",
    summary: "In-browser cryptographically secure SHA-256 / SHA-512 evidence hashing pipeline.",
    forensicRole:
      "Local working-copy hashing and digital custody verification without sending bytes over networks.",
    keyCapabilities: [
      "FIPS 180-4 compliant SHA-256 and SHA-512 cryptographic digests",
      "Deterministic byte hash calculation directly on client File and ArrayBuffer",
      "Zero network leakage: 100% offline client-side validation",
      "Verification against published case evidence seals",
    ],
    evidentiaryStandard: "ISO/IEC 27037 clause 6.3 Digital Evidence Seal",
    pipelineStage: "Verify",
    executionEnvironment: "Browser (WebAssembly / Client)",
    integrationState: "LIVE_IN_BROWSER",
  },
  {
    id: "hashcat",
    name: "Hashcat",
    category: "Reverse Engineering & Malware",
    status: "Ecosystem",
    license: "MIT",
    officialRepo: "https://github.com/hashcat/hashcat",
    documentationUrl: "https://hashcat.net/hashcat/",
    summary:
      "World's fastest password recovery utility supporting five unique modes of attack for over 300 hashing algorithms.",
    forensicRole:
      "Authorized credential decryption and forensic verification of recovered system hash stores.",
    keyCapabilities: [
      "GPU-accelerated kernel rules across CUDA, OpenCL, and Metal",
      "Support for NTLM, Kerberos, LUKS, BitLocker, and VeraCrypt header parsing",
      "Mask, combinator, and hybrid dictionary-rule attacks",
      "Detailed session checkpointing and restore functionality",
    ],
    evidentiaryStandard: "Authorized recovery protocols and audit-trail logging",
    pipelineStage: "Analyse",
    executionEnvironment: "CLI / Dedicated Workstation",
    integrationState: "REFERENCE_BENCHMARK",
  },
  {
    id: "ghidra",
    name: "Ghidra",
    category: "Reverse Engineering & Malware",
    status: "Researching",
    license: "Apache 2.0",
    officialRepo: "https://github.com/NationalSecurityAgency/ghidra",
    documentationUrl: "https://ghidra-sre.org/",
    summary:
      "Software reverse engineering (SRE) suite developed by NSA's Research Directorate including decompiler and multi-processor support.",
    forensicRole:
      "Static malware disassembly, decompilation, control flow graph inspection, and binary vulnerability analysis.",
    keyCapabilities: [
      "High-fidelity decompiler translating machine code into readable C pseudo-code",
      "Broad processor instruction set support (x86, x64, ARM, AArch64, MIPS, PowerPC, RISC-V)",
      "Interactive graph views of function call trees and cross-references",
      "Extensive Java and Python scripting APIs for automated analysis",
    ],
    evidentiaryStandard: "Deterministic SRE methodology and repeatable CFG generation",
    pipelineStage: "Analyse",
    executionEnvironment: "CLI / Dedicated Workstation",
    integrationState: "REFERENCE_BENCHMARK",
  },
];

export const TOOL_STATUS_COUNTS: Record<ToolUsageStatus, number> = {
  Used: DFIR_TOOLBOX.filter((t) => t.status === "Used").length,
  Familiar: DFIR_TOOLBOX.filter((t) => t.status === "Familiar").length,
  Researching: DFIR_TOOLBOX.filter((t) => t.status === "Researching").length,
  Ecosystem: DFIR_TOOLBOX.filter((t) => t.status === "Ecosystem").length,
};

export const DFIR_PIPELINE_STAGES = [
  {
    id: "Acquire",
    name: "1. ACQUIRE",
    summary: "Physical or bitstream bit-for-bit acquisition using certified write-blockers.",
    standard: "ISO/IEC 27037 §6.2",
    tools: ["Tableau Write-Blockers", "Velociraptor", "dd / dcfldd"],
  },
  {
    id: "Preserve",
    name: "2. PRESERVE",
    summary: "Secure evidence locker storage, tamper-evident seals, and working-copy duplication.",
    standard: "NIST SP 800-86 §3.1",
    tools: ["Faraday enclosures", "Write-blocked storage", "Read-only image mounts"],
  },
  {
    id: "Verify",
    name: "3. VERIFY",
    summary: "Cryptographic hash generation (SHA-256) verifying original equals duplicate.",
    standard: "ISO/IEC 27037 §6.3",
    tools: ["Web Crypto API", "sha256sum", "b2sum", "CyberChef"],
  },
  {
    id: "Extract",
    name: "4. EXTRACT",
    summary: "Carving, metadata recovery, and file system artifact parsing from working copies.",
    standard: "NIST SP 800-86 §3.2",
    tools: ["The Sleuth Kit", "ExifTool", "Binwalk", "Zeek"],
  },
  {
    id: "Analyse",
    name: "5. ANALYSE",
    summary: "Deep forensic analysis of volatile memory, execution traces, and binary logic.",
    standard: "ISO/IEC 27037 §6.4",
    tools: ["Volatility 3", "Autopsy", "Wireshark", "YARA-X", "Ghidra"],
  },
  {
    id: "Correlate",
    name: "6. CORRELATE",
    summary: "Multi-source super-timeline reconstruction across endpoints and network streams.",
    standard: "RFC 3227 & NIST SP 800-92",
    tools: ["Plaso (log2timeline)", "Timesketch", "Elasticsearch"],
  },
  {
    id: "Interpret",
    name: "7. INTERPRET",
    summary: "Scientific hypothesis testing, context attribution, and falsification analysis.",
    standard: "Daubert Standard / Frye Reliability",
    tools: ["Investigative Reasoning", "Context Attribution", "Timesketch Narrative"],
  },
  {
    id: "Report",
    name: "8. REPORT",
    summary: "Court-admissible, reproducible documentation with unbroken chain of custody.",
    standard: "ISO 17025 Laboratory Testing",
    tools: ["Formal Forensic Dossiers", "Audit Ledgers", "Cryptographic Manifests"],
  },
] as const;

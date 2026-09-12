/**
 * FIND DETAILS — master inventory of open-source information-gathering tools.
 * These are hidden engines behind the portfolio, not the visitor-facing product.
 * Sources: user shortlist + awesome-osint-repos / jivoi/awesome-osint catalogues.
 * A GitHub repo being open-source does not mean its APIs or live feeds are free.
 */

export type ToolFamily =
  | "framework"
  | "identity"
  | "email"
  | "phone"
  | "domain"
  | "web"
  | "search"
  | "archive"
  | "social"
  | "organization"
  | "document"
  | "entity"
  | "graph"
  | "index"
  | "vector"
  | "threat"
  | "network"
  | "geo"
  | "live"
  | "news"
  | "media"
  | "indic"
  | "ai"
  | "runtime"
  | "forensic"
  | "catalogue"
  | "india";

export interface IntelligenceTool {
  id: string;
  name: string;
  githubUrl?: string;
  sourceUrl?: string;
  family: ToolFamily;
  purpose: string;
  shortlist: boolean;
  constraint?: string;
  kind?: "engine" | "india-source" | "reference";
}

export const TOOL_FAMILIES: { id: ToolFamily | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "india", label: "India sources" },
  { id: "framework", label: "Frameworks" },
  { id: "identity", label: "Identity" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "domain", label: "Domain / DNS" },
  { id: "web", label: "Web crawl" },
  { id: "search", label: "Search" },
  { id: "archive", label: "Archives" },
  { id: "organization", label: "Organizations" },
  { id: "document", label: "Documents" },
  { id: "entity", label: "Entities" },
  { id: "graph", label: "Graph" },
  { id: "live", label: "Live world" },
  { id: "geo", label: "Geo" },
  { id: "threat", label: "Threat intel" },
  { id: "indic", label: "Indic languages" },
  { id: "forensic", label: "Forensics" },
  { id: "ai", label: "AI / retrieval" },
  { id: "runtime", label: "Runtime" },
];

export const INTELLIGENCE_TOOLS: IntelligenceTool[] = [
  // Frameworks
  { id: "spiderfoot", name: "SpiderFoot", githubUrl: "https://github.com/smicallef/spiderfoot", family: "framework", purpose: "Automated OSINT collection across many public modules", shortlist: true },
  { id: "theharvester", name: "theHarvester", githubUrl: "https://github.com/laramies/theHarvester", family: "framework", purpose: "Emails, domains, hosts, and search-source collection", shortlist: true },
  { id: "recon-ng", name: "Recon-ng", githubUrl: "https://github.com/lanmaster53/recon-ng", family: "framework", purpose: "Modular reconnaissance framework", shortlist: true },
  { id: "sn0int", name: "sn0int", githubUrl: "https://github.com/kpcyrd/sn0int", family: "framework", purpose: "Semi-automated OSINT framework", shortlist: false },
  { id: "mrholmes", name: "Mr.Holmes", githubUrl: "https://github.com/Lucksi/Mr.Holmes", family: "framework", purpose: "Identity, domain, and phone OSINT modules", shortlist: false },
  { id: "argus", name: "Argus", githubUrl: "https://github.com/areyou1or0/Argus", family: "framework", purpose: "Multi-module information gathering", shortlist: false },
  { id: "osmedeus", name: "Osmedeus", githubUrl: "https://github.com/j3ssie/Osmedeus", family: "framework", purpose: "Automated reconnaissance workflows", shortlist: false, constraint: "Authorized targets only" },
  { id: "reconftw", name: "reconFTW", githubUrl: "https://github.com/six2dez/reconftw", family: "framework", purpose: "Automated domain reconnaissance", shortlist: false, constraint: "Authorized domains only" },
  { id: "photon", name: "Photon", githubUrl: "https://github.com/s0md3v/Photon", family: "web", purpose: "Fast web crawling and information extraction", shortlist: true },
  { id: "flowsint", name: "Flowsint", githubUrl: "https://github.com/flowsint/flowsint", family: "framework", purpose: "Entity investigation and graph analysis", shortlist: false },
  { id: "openosint", name: "OpenOSINT", githubUrl: "https://github.com/owasp-amass/openosint", family: "framework", purpose: "Agent-style OSINT workflows", shortlist: false },
  { id: "seekr", name: "Seekr", githubUrl: "https://github.com/seekr-osint/seekr", family: "framework", purpose: "Web-based OSINT toolkit", shortlist: false },

  // Identity
  { id: "sherlock", name: "Sherlock", githubUrl: "https://github.com/sherlock-project/sherlock", family: "identity", purpose: "Username presence checks across many public services", shortlist: true, constraint: "Candidates only — never merge on a name" },
  { id: "maigret", name: "Maigret", githubUrl: "https://github.com/soxoj/maigret", family: "identity", purpose: "Username and public-profile discovery", shortlist: true, constraint: "Public profiles only" },
  { id: "whatsmyname", name: "WhatsMyName", githubUrl: "https://github.com/WebBreacher/WhatsMyName", family: "identity", purpose: "Username discovery dataset", shortlist: true },
  { id: "ghunt", name: "GHunt", githubUrl: "https://github.com/mxrch/GHunt", family: "identity", purpose: "Public Google-account-related information", shortlist: false, constraint: "User-provided identifiers only" },
  { id: "blackbird", name: "Blackbird", githubUrl: "https://github.com/p1ngul1n0/blackbird", family: "identity", purpose: "Username reconnaissance", shortlist: false },
  { id: "socialscan", name: "socialscan", githubUrl: "https://github.com/iojw/socialscan", family: "identity", purpose: "Username and email presence checks", shortlist: false },

  // Email
  { id: "holehe", name: "Holehe", githubUrl: "https://github.com/megadose/holehe", family: "email", purpose: "Account-existence signals on supported public services", shortlist: true, constraint: "User-provided or public professional emails only" },
  { id: "h8mail", name: "h8mail", githubUrl: "https://github.com/khast3x/h8mail", family: "email", purpose: "Email OSINT and enrichment", shortlist: false, constraint: "Public/professional identifiers only" },
  { id: "ignorant", name: "Ignorant", githubUrl: "https://github.com/megadose/ignorant", family: "phone", purpose: "Phone and email OSINT on public signals", shortlist: false },

  // Phone
  { id: "phoneinfoga", name: "PhoneInfoga", githubUrl: "https://github.com/sundowndev/PhoneInfoga", family: "phone", purpose: "Public phone metadata: country, format, public references", shortlist: true, constraint: "No subscriber identity, live location, or intercept" },

  // Domain
  { id: "amass", name: "OWASP Amass", githubUrl: "https://github.com/owasp-amass/amass", family: "domain", purpose: "Passive DNS and asset mapping", shortlist: true, constraint: "Passive / non-invasive by default" },
  { id: "subfinder", name: "Subfinder", githubUrl: "https://github.com/projectdiscovery/subfinder", family: "domain", purpose: "Passive subdomain discovery", shortlist: true },
  { id: "httpx", name: "httpx", githubUrl: "https://github.com/projectdiscovery/httpx", family: "domain", purpose: "HTTP probing and public metadata", shortlist: true },
  { id: "dnsx", name: "dnsx", githubUrl: "https://github.com/projectdiscovery/dnsx", family: "domain", purpose: "DNS querying", shortlist: true },
  { id: "findomain", name: "Findomain", githubUrl: "https://github.com/Findomain/Findomain", family: "domain", purpose: "Subdomain discovery", shortlist: false },
  { id: "assetfinder", name: "assetfinder", githubUrl: "https://github.com/tomnomnom/assetfinder", family: "domain", purpose: "Domains related to an organization", shortlist: false },
  { id: "naabu", name: "Naabu", githubUrl: "https://github.com/projectdiscovery/naabu", family: "network", purpose: "Port discovery", shortlist: false, constraint: "Authorized targets only" },

  // Web
  { id: "scrapy", name: "Scrapy", githubUrl: "https://github.com/scrapy/scrapy", family: "web", purpose: "Structured public-page extraction", shortlist: true },
  { id: "playwright", name: "Playwright", githubUrl: "https://github.com/microsoft/playwright", family: "web", purpose: "Authorized, rate-limited page render", shortlist: true },
  { id: "crawlee", name: "Crawlee", githubUrl: "https://github.com/apify/crawlee", family: "web", purpose: "Crawler orchestration", shortlist: true },
  { id: "crawl4ai", name: "Crawl4AI", githubUrl: "https://github.com/unclecode/crawl4ai", family: "web", purpose: "LLM-ready public web crawling", shortlist: true },
  { id: "firecrawl", name: "Firecrawl", githubUrl: "https://github.com/firecrawl/firecrawl", family: "web", purpose: "Search, crawl, and extract web content", shortlist: true },
  { id: "browser-use", name: "Browser Use", githubUrl: "https://github.com/browser-use/browser-use", family: "web", purpose: "AI browser interaction", shortlist: false },

  // Search
  { id: "searxng", name: "SearXNG", githubUrl: "https://github.com/searxng/searxng", family: "search", purpose: "Self-hosted metasearch — core FIND DETAILS search layer", shortlist: true },

  // Archive
  { id: "waybackpy", name: "waybackpy", githubUrl: "https://github.com/akamhy/waybackpy", family: "archive", purpose: "Wayback Machine API access", shortlist: false },
  { id: "gau", name: "gau", githubUrl: "https://github.com/lc/gau", family: "archive", purpose: "Historical public URLs", shortlist: false },
  { id: "waymore", name: "waymore", githubUrl: "https://github.com/xnl-h4ck3r/waymore", family: "archive", purpose: "Archived URL collection", shortlist: false },
  { id: "pywb", name: "pywb", githubUrl: "https://github.com/webrecorder/pywb", family: "archive", purpose: "Web archive replay and indexing", shortlist: false },

  // Social (public / authorized)
  { id: "ytdlp", name: "yt-dlp", githubUrl: "https://github.com/yt-dlp/yt-dlp", family: "social", purpose: "Public video metadata where permitted", shortlist: false, constraint: "Public or authorized media only" },
  { id: "gallery-dl", name: "gallery-dl", githubUrl: "https://github.com/mikf/gallery-dl", family: "social", purpose: "Media from supported public sites", shortlist: false },

  // Organization
  { id: "aleph", name: "Aleph", githubUrl: "https://github.com/alephdata/aleph", family: "organization", purpose: "Search people, companies, organizations, and documents together", shortlist: true },

  // Documents
  { id: "docling", name: "Docling", githubUrl: "https://github.com/docling-project/docling", family: "document", purpose: "PDF and document structure extraction", shortlist: true },
  { id: "markitdown", name: "MarkItDown", githubUrl: "https://github.com/microsoft/markitdown", family: "document", purpose: "Convert documents to Markdown", shortlist: false },
  { id: "pymupdf", name: "PyMuPDF", githubUrl: "https://github.com/pymupdf/PyMuPDF", family: "document", purpose: "PDF text and metadata", shortlist: true },
  { id: "ocrmypdf", name: "OCRmyPDF", githubUrl: "https://github.com/ocrmypdf/OCRmyPDF", family: "document", purpose: "OCR for scanned PDFs", shortlist: true },
  { id: "tesseract", name: "Tesseract", githubUrl: "https://github.com/tesseract-ocr/tesseract", family: "document", purpose: "OCR", shortlist: true },
  { id: "paddleocr", name: "PaddleOCR", githubUrl: "https://github.com/PaddlePaddle/PaddleOCR", family: "document", purpose: "Multilingual OCR", shortlist: true },
  { id: "tika", name: "Apache Tika", githubUrl: "https://github.com/apache/tika", family: "document", purpose: "File text and metadata extraction", shortlist: false },

  // Entity
  { id: "spacy", name: "spaCy", githubUrl: "https://github.com/explosion/spaCy", family: "entity", purpose: "NLP and named-entity extraction", shortlist: true },
  { id: "gliner", name: "GLiNER", githubUrl: "https://github.com/urchade/GLiNER", family: "entity", purpose: "Flexible entity extraction", shortlist: true },
  { id: "stanza", name: "Stanza", githubUrl: "https://github.com/stanfordnlp/stanza", family: "entity", purpose: "Multilingual NLP", shortlist: false },
  { id: "splink", name: "Splink", githubUrl: "https://github.com/moj-analytical-services/splink", family: "entity", purpose: "Probabilistic record linkage — same person or not", shortlist: true, constraint: "Never merge on name alone" },

  // Graph / search
  { id: "neo4j", name: "Neo4j", githubUrl: "https://github.com/neo4j/neo4j", family: "graph", purpose: "Relationship graph store", shortlist: true },
  { id: "networkx", name: "NetworkX", githubUrl: "https://github.com/networkx/networkx", family: "graph", purpose: "Graph analysis", shortlist: true },
  { id: "cytoscape", name: "Cytoscape.js", githubUrl: "https://github.com/cytoscape/cytoscape.js", family: "graph", purpose: "Interactive graph visualization", shortlist: true },
  { id: "opensearch", name: "OpenSearch", githubUrl: "https://github.com/opensearch-project/OpenSearch", family: "index", purpose: "Full-text source search", shortlist: true },
  { id: "qdrant", name: "Qdrant", githubUrl: "https://github.com/qdrant/qdrant", family: "vector", purpose: "Vector store for Ask About This", shortlist: true },

  // Threat
  { id: "opencti", name: "OpenCTI", githubUrl: "https://github.com/OpenCTI-Platform/opencti", family: "threat", purpose: "Threat-intelligence knowledge graph", shortlist: true },
  { id: "misp", name: "MISP", githubUrl: "https://github.com/MISP/MISP", family: "threat", purpose: "Threat intelligence sharing", shortlist: true },
  { id: "intelowl", name: "IntelOwl", githubUrl: "https://github.com/intelowlproject/IntelOwl", family: "threat", purpose: "Automated observable analysis", shortlist: true },

  // Network — authorized
  { id: "nmap", name: "Nmap", githubUrl: "https://github.com/nmap/nmap", family: "network", purpose: "Network discovery and audit", shortlist: false, constraint: "Authorized targets only. Passive default." },

  // Geo / live world
  { id: "cesium", name: "CesiumJS", githubUrl: "https://github.com/CesiumGS/cesium", family: "geo", purpose: "Time-dynamic 3D globe", shortlist: true },
  { id: "osm", name: "OpenStreetMap", githubUrl: "https://github.com/openstreetmap/openstreetmap-website", family: "geo", purpose: "Roads, places, public map objects", shortlist: true },
  { id: "overpass", name: "Overpass API", githubUrl: "https://github.com/drolbr/Overpass-API", family: "geo", purpose: "Query OSM objects", shortlist: true },
  { id: "geopandas", name: "GeoPandas", githubUrl: "https://github.com/geopandas/geopandas", family: "geo", purpose: "Geospatial analysis", shortlist: false },
  { id: "satellitejs", name: "satellite.js", githubUrl: "https://github.com/shashwatak/satellite-js", family: "live", purpose: "SGP4 orbital positions from TLEs", shortlist: true },
  { id: "opensky", name: "OpenSky API", githubUrl: "https://github.com/openskynetwork/opensky-api", family: "live", purpose: "Public ADS-B aircraft state vectors", shortlist: true },
  { id: "aisstream", name: "AISStream", githubUrl: "https://github.com/aisstream/aisstream-protobuf", family: "live", purpose: "Authorized AIS vessel streams", shortlist: true },
  { id: "opencellid", name: "OpenCellID", githubUrl: "https://github.com/opencellid/ocidb", family: "live", purpose: "Community cell-tower locations — infrastructure, not device tracking", shortlist: true, constraint: "Never present as live phone tracking" },
  { id: "worldview", name: "WORLDVIEW", githubUrl: "https://github.com/kevtoe/worldview", family: "live", purpose: "Reference architecture: flights, satellites, quakes, traffic, CCTV", shortlist: false, constraint: "Study only — do not iframe" },
  { id: "gods-eye", name: "God's Eye Worldview", githubUrl: "https://github.com/IdoCohen560/gods-eye-worldview", family: "live", purpose: "Reference live-globe implementation", shortlist: false, constraint: "Study only — do not iframe" },
  { id: "ai-world-tracker", name: "AI World Tracker", githubUrl: "https://github.com/CapSubham/ai-world-tracker", family: "live", purpose: "Reference satellite / aircraft / camera aggregation", shortlist: false, constraint: "Study only — do not iframe" },

  // News / media / speech
  { id: "exiftool", name: "ExifTool", githubUrl: "https://github.com/exiftool/exiftool", family: "media", purpose: "Image and file metadata", shortlist: false },
  { id: "opencv", name: "OpenCV", githubUrl: "https://github.com/opencv/opencv", family: "media", purpose: "Computer vision on uploaded media", shortlist: false },
  { id: "whisper", name: "Whisper", githubUrl: "https://github.com/openai/whisper", family: "media", purpose: "Speech-to-text for uploaded audio", shortlist: false },

  // Indic
  { id: "indiclid", name: "IndicLID", githubUrl: "https://github.com/AI4Bharat/IndicLID", family: "indic", purpose: "Indian-language identification", shortlist: true },
  { id: "indicxlit", name: "IndicXlit", githubUrl: "https://github.com/AI4Bharat/IndicXlit", family: "indic", purpose: "Romanized Indic → native script", shortlist: true },
  { id: "indictrans2", name: "IndicTrans2", githubUrl: "https://github.com/AI4Bharat/IndicTrans2", family: "indic", purpose: "Indian-language translation and query expansion", shortlist: true },

  // AI / runtime
  { id: "ollama", name: "Ollama", githubUrl: "https://github.com/ollama/ollama", family: "ai", purpose: "Local model serving — evidence only, never source of truth", shortlist: true },
  { id: "vllm", name: "vLLM", githubUrl: "https://github.com/vllm-project/vllm", family: "ai", purpose: "High-performance model serving", shortlist: true },
  { id: "llamacpp", name: "llama.cpp", githubUrl: "https://github.com/ggml-org/llama.cpp", family: "ai", purpose: "Efficient local inference", shortlist: true },
  { id: "redis", name: "Redis", githubUrl: "https://github.com/redis/redis", family: "runtime", purpose: "Queues, pub/sub, cache, rate limits", shortlist: true },
  { id: "bullmq", name: "BullMQ", githubUrl: "https://github.com/taskforcesh/bullmq", family: "runtime", purpose: "Background jobs", shortlist: true },
  { id: "postgres", name: "PostgreSQL", githubUrl: "https://github.com/postgres/postgres", family: "runtime", purpose: "Investigations, entities, evidence", shortlist: true },
  { id: "minio", name: "MinIO", githubUrl: "https://github.com/minio/minio", family: "runtime", purpose: "Uploaded documents and artifacts", shortlist: true },

  // Forensics — uploaded/authorized evidence
  { id: "autopsy", name: "Autopsy", githubUrl: "https://github.com/sleuthkit/autopsy", family: "forensic", purpose: "Digital forensics platform", shortlist: true, constraint: "Uploaded or authorized evidence only" },
  { id: "sleuthkit", name: "The Sleuth Kit", githubUrl: "https://github.com/sleuthkit/sleuthkit", family: "forensic", purpose: "Forensic disk and artifact analysis", shortlist: true, constraint: "Authorized evidence only" },
  { id: "plaso", name: "Plaso", githubUrl: "https://github.com/log2timeline/plaso", family: "forensic", purpose: "Timeline from forensic artifacts", shortlist: true },
  { id: "timesketch", name: "Timesketch", githubUrl: "https://github.com/google/timesketch", family: "forensic", purpose: "Collaborative timeline analysis", shortlist: true },

  // Catalogues
  { id: "awesome-osint-repos", name: "Awesome OSINT Repositories", githubUrl: "https://github.com/osint-shifu/awesome-osint-repos", family: "catalogue", purpose: "Living catalogue (~493 repos, 12 categories)", shortlist: false, kind: "reference" },
  { id: "awesome-osint", name: "jivoi/awesome-osint", githubUrl: "https://github.com/jivoi/awesome-osint", family: "catalogue", purpose: "Broad OSINT resource list", shortlist: false, kind: "reference" },
  { id: "osint-tools-india", name: "OSINT Tools India", githubUrl: "https://github.com/paulpogoda/OSINT-Tools-India", family: "catalogue", purpose: "India-focused OSINT resources and tools", shortlist: true, kind: "reference" },
  { id: "osint-in-india", name: "OSINT in India", githubUrl: "https://github.com/OSINT-for-countries/OSINT_in_India", family: "catalogue", purpose: "Methods and official sources for India investigations", shortlist: true, kind: "reference" },

  // India public-data adapters (not GitHub engines)
  { id: "mca21", name: "MCA / MCA21", sourceUrl: "https://www.mca.gov.in/", family: "india", purpose: "Company / LLP public corporate records (CIN, status, filings where public)", shortlist: true, kind: "india-source", constraint: "Public corporate data only" },
  { id: "data-gov-in", name: "data.gov.in", sourceUrl: "https://data.gov.in/", family: "india", purpose: "Open Government Data Platform — stats, districts, schemes, infrastructure", shortlist: true, kind: "india-source" },
  { id: "gst-portal", name: "GST taxpayer search", sourceUrl: "https://www.gst.gov.in/", family: "india", purpose: "Public GST business verification where permitted", shortlist: true, kind: "india-source" },
  { id: "fssai", name: "FSSAI", sourceUrl: "https://foscos.fssai.gov.in/", family: "india", purpose: "Food-business licence verification", shortlist: false, kind: "india-source" },
  { id: "sebi", name: "SEBI / NSE / BSE", sourceUrl: "https://www.sebi.gov.in/", family: "india", purpose: "Listed-company disclosures and securities regulation", shortlist: true, kind: "india-source" },
  { id: "ecourts", name: "eCourts / SC / HC", sourceUrl: "https://ecourts.gov.in/", family: "india", purpose: "Public judgments, cause lists, case status", shortlist: true, kind: "india-source", constraint: "No unsupported claims about individuals" },
  { id: "eci", name: "Election Commission of India", sourceUrl: "https://www.eci.gov.in/", family: "india", purpose: "Results, constituencies, candidate affidavits", shortlist: true, kind: "india-source", constraint: "Public-record research — not political profiling" },
  { id: "bhuvan", name: "Bhuvan (ISRO)", sourceUrl: "https://bhuvan.nrsc.gov.in/", family: "india", purpose: "Indian geospatial portal, satellite imagery, thematic maps", shortlist: true, kind: "india-source" },
  { id: "india-post", name: "India Post", sourceUrl: "https://www.indiapost.gov.in/", family: "india", purpose: "PIN code, post office, locality, address normalization", shortlist: true, kind: "india-source" },
  { id: "gem-cppp", name: "GeM / CPPP", sourceUrl: "https://gem.gov.in/", family: "india", purpose: "Public procurement tenders and vendor notices", shortlist: false, kind: "india-source" },
  { id: "startup-india", name: "Startup India", sourceUrl: "https://www.startupindia.gov.in/", family: "india", purpose: "Startup ecosystem public records", shortlist: false, kind: "india-source" },
  { id: "ibbi", name: "IBBI", sourceUrl: "https://ibbi.gov.in/", family: "india", purpose: "Insolvency public information", shortlist: false, kind: "india-source" },
];

export const SHORTLIST_TOOLS = INTELLIGENCE_TOOLS.filter((tool) => tool.shortlist);

export const INDIA_SOURCE_MATRIX: { domain: string; source: string }[] = [
  { domain: "Companies / LLPs", source: "MCA / MCA21" },
  { domain: "GST verification", source: "GST portal" },
  { domain: "Food businesses", source: "FSSAI" },
  { domain: "Listed companies", source: "NSE / BSE / SEBI" },
  { domain: "Insolvency", source: "IBBI" },
  { domain: "Courts", source: "eCourts / SC / HC" },
  { domain: "Elections", source: "ECI + affidavits" },
  { domain: "Government datasets", source: "data.gov.in" },
  { domain: "Geography", source: "Bhuvan / OSM / Overpass" },
  { domain: "Postal / PIN", source: "India Post" },
  { domain: "Procurement", source: "GeM / CPPP / state portals" },
  { domain: "Startups", source: "Startup India" },
  { domain: "Cell infrastructure", source: "OpenCellID (not device tracking)" },
  { domain: "Aircraft / ships", source: "OpenSky / AIS (public only)" },
  { domain: "Languages", source: "IndicLID / IndicXlit / IndicTrans2" },
];

export const ROUTER_LAYERS = [
  {
    id: "identity",
    label: "Identity",
    activates: ["Sherlock", "Maigret", "WhatsMyName", "Holehe", "PhoneInfoga", "IndicLID"],
  },
  {
    id: "web",
    label: "Web",
    activates: ["SearXNG", "SpiderFoot", "Scrapy", "Playwright", "Crawlee"],
  },
  {
    id: "company",
    label: "India company",
    activates: ["MCA", "GST", "SEBI", "data.gov.in"],
  },
  {
    id: "geo",
    label: "Geo / live",
    activates: ["CesiumJS", "Bhuvan", "OSM", "satellite.js", "OpenSky", "AISStream"],
  },
  {
    id: "document",
    label: "Document",
    activates: ["Docling", "PyMuPDF", "OCR", "PaddleOCR"],
  },
] as const;

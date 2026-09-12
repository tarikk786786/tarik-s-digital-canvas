import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { User, Building2, BookOpen, MapPin, Globe, Shield, ExternalLink } from "lucide-react";

// Custom Node for Person
function PersonNode({ data }: { data: any }) {
  return (
    <div className="rounded-xl border-2 border-[#62E6FF] bg-[#0A0D12] p-4 text-xs font-mono shadow-[0_0_24px_rgba(98,230,255,0.3)] min-w-[200px]">
      <Handle type="target" position={Position.Top} className="!bg-[#62E6FF]" />
      <div className="flex items-center gap-2.5">
        <div className="grid size-8 place-items-center rounded-lg bg-[#62E6FF]/20 text-[#62E6FF]">
          <User className="size-4" />
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#62E6FF] font-bold block">
            PERSON ENTITY
          </span>
          <span className="font-display font-bold text-sm text-foreground">{data.label}</span>
        </div>
      </div>
      <div className="mt-2 text-[10px] text-muted-foreground border-t border-white/10 pt-1.5">
        {data.role || "Primary Subject (94% Conf.)"}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-[#62E6FF]" />
    </div>
  );
}

// Custom Node for Organization
function OrgNode({ data }: { data: any }) {
  return (
    <div className="rounded-xl border border-[#9B8CFF]/50 bg-[#0E121A] p-3 text-xs font-mono shadow-[0_0_16px_rgba(155,140,255,0.2)] min-w-[180px]">
      <Handle type="target" position={Position.Top} className="!bg-[#9B8CFF]" />
      <div className="flex items-center gap-2">
        <div className="grid size-7 place-items-center rounded-md bg-[#9B8CFF]/20 text-[#9B8CFF]">
          <Building2 className="size-3.5" />
        </div>
        <div>
          <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#9B8CFF] font-bold block">
            {data.type || "ORGANIZATION"}
          </span>
          <span className="font-display font-semibold text-xs text-foreground">{data.label}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-[#9B8CFF]" />
    </div>
  );
}

// Custom Node for Document / Proof
function DocNode({ data }: { data: any }) {
  return (
    <div className="rounded-xl border border-[#6EE7B7]/40 bg-[#0E121A] p-3 text-xs font-mono shadow-[0_0_16px_rgba(110,231,183,0.15)] min-w-[170px]">
      <Handle type="target" position={Position.Top} className="!bg-[#6EE7B7]" />
      <div className="flex items-center gap-2">
        <div className="grid size-7 place-items-center rounded-md bg-[#6EE7B7]/20 text-[#6EE7B7]">
          <BookOpen className="size-3.5" />
        </div>
        <div>
          <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#6EE7B7] font-bold block">
            DOCUMENT / PAPER
          </span>
          <span className="font-display font-semibold text-xs text-foreground">{data.label}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-[#6EE7B7]" />
    </div>
  );
}

// Custom Node for Location
function LocationNode({ data }: { data: any }) {
  return (
    <div className="rounded-xl border border-amber-500/40 bg-[#0E121A] p-2.5 text-xs font-mono min-w-[150px]">
      <Handle type="target" position={Position.Top} className="!bg-amber-400" />
      <div className="flex items-center gap-2">
        <MapPin className="size-3.5 text-amber-400" />
        <div>
          <span className="font-mono text-[8.5px] uppercase text-amber-400 font-bold block">
            GEO ANCHOR
          </span>
          <span className="font-semibold text-xs text-foreground">{data.label}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-amber-400" />
    </div>
  );
}

const nodeTypes = {
  person: PersonNode,
  org: OrgNode,
  doc: DocNode,
  location: LocationNode,
};

const initialNodes: Node[] = [
  {
    id: "person-1",
    type: "person",
    position: { x: 300, y: 180 },
    data: { label: "Rahul Kumar", role: "Principal Architect & Founder" },
  },
  {
    id: "org-dezo",
    type: "org",
    position: { x: 80, y: 40 },
    data: { label: "Dezo Systems Pvt Ltd", type: "COMPANY (MCA U72900)" },
  },
  {
    id: "org-nitrkl",
    type: "org",
    position: { x: 540, y: 40 },
    data: { label: "NIT Rourkela", type: "ALMA MATER" },
  },
  {
    id: "doc-ieee",
    type: "doc",
    position: { x: 550, y: 340 },
    data: { label: "IEEE Memory Triage (2019)" },
  },
  {
    id: "loc-bhubaneswar",
    type: "location",
    position: { x: 60, y: 320 },
    data: { label: "Bhubaneswar, Odisha" },
  },
  {
    id: "loc-bangalore",
    type: "location",
    position: { x: 300, y: 360 },
    data: { label: "Bengaluru, Karnataka" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-p-dezo",
    source: "person-1",
    target: "org-dezo",
    label: "Co-Founder (2021)",
    animated: true,
    style: { stroke: "#62E6FF", strokeWidth: 2 },
    labelStyle: { fill: "#62E6FF", fontFamily: "monospace", fontSize: 10 },
  },
  {
    id: "e-p-nit",
    source: "person-1",
    target: "org-nitrkl",
    label: "Graduated (2019)",
    style: { stroke: "#9B8CFF", strokeWidth: 1.5 },
    labelStyle: { fill: "#9B8CFF", fontFamily: "monospace", fontSize: 10 },
  },
  {
    id: "e-p-ieee",
    source: "person-1",
    target: "doc-ieee",
    label: "Primary Author",
    animated: true,
    style: { stroke: "#6EE7B7", strokeWidth: 1.5 },
    labelStyle: { fill: "#6EE7B7", fontFamily: "monospace", fontSize: 10 },
  },
  {
    id: "e-dezo-loc",
    source: "org-dezo",
    target: "loc-bhubaneswar",
    label: "Registered HQ",
    style: { stroke: "#E8A838", strokeWidth: 1.5 },
    labelStyle: { fill: "#E8A838", fontFamily: "monospace", fontSize: 10 },
  },
  {
    id: "e-p-blr",
    source: "person-1",
    target: "loc-bangalore",
    label: "Engineering Hub",
    style: { stroke: "#E8A838", strokeWidth: 1 },
    labelStyle: { fill: "#E8A838", fontFamily: "monospace", fontSize: 10 },
  },
];

export function RelationshipGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedElement, setSelectedElement] = useState<string | null>("person-1");

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="relative h-[550px] w-full rounded-2xl border border-white/10 bg-[#050608]/90 overflow-hidden backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
      {/* Top HUD Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] text-[#62E6FF] border border-[#62E6FF]/30 backdrop-blur-md">
          INTERACTIVE KNOWLEDGE GRAPH (NEO4J / REACT FLOW)
        </span>
        <span className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md">
          Pan & Zoom to explore correlated entities
        </span>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="dark"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(255, 255, 255, 0.08)"
        />
        <Controls className="!bg-[#0A0D12] !border-white/10 !fill-white" />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "person") return "#62E6FF";
            if (n.type === "org") return "#9B8CFF";
            if (n.type === "doc") return "#6EE7B7";
            return "#E8A838";
          }}
          className="!bg-[#0A0D12] !border-white/10"
        />
      </ReactFlow>

      {/* Bottom Evidence Legend */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg border border-white/10 bg-[#0A0D12]/80 backdrop-blur-md font-mono text-[10px] text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#62E6FF]" /> Person
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#9B8CFF]" /> Organization
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#6EE7B7]" /> Document
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#E8A838]" /> Location
          </span>
        </div>
        <span className="text-muted-foreground/80">Every link backed by legal/academic proof</span>
      </div>
    </div>
  );
}

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CASE_0001 } from "@/content/forensic-case-0001";
import { TechnicalLabel } from "@/components/system";

export function ForensicEvidenceGraph() {
  const { nodes, edges } = useMemo(() => {
    const ns: Node[] = [
      {
        id: "case",
        position: { x: 220, y: 20 },
        data: { label: CASE_0001.id },
        style: {
          background: "#0A0D12",
          border: "1px solid rgba(98,230,255,0.5)",
          color: "#e8eef5",
          borderRadius: 12,
          fontSize: 11,
          padding: 10,
        },
      },
      ...CASE_0001.evidence.map((ex, i) => ({
        id: ex.id,
        position: { x: (i % 3) * 180, y: 140 + Math.floor(i / 3) * 100 },
        data: { label: ex.label },
        style: {
          background: "#0A0D12",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#e8eef5",
          borderRadius: 10,
          fontSize: 10,
          padding: 8,
          maxWidth: 160,
        },
      })),
    ];
    const es: Edge[] = CASE_0001.evidence.map((ex) => ({
      id: `e-${ex.id}`,
      source: "case",
      target: ex.id,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#62E6FF" },
      style: { stroke: "rgba(98,230,255,0.45)" },
    }));
    return { nodes: ns, edges: es };
  }, []);

  return (
    <div className="h-72 rounded-xl border border-white/10 overflow-hidden bg-black/40">
      <div className="px-3 py-2 border-b border-white/10">
        <TechnicalLabel className="text-[#62E6FF]">Evidence relationship graph</TechnicalLabel>
      </div>
      <ReactFlow nodes={nodes} edges={edges} fitView proOptions={{ hideAttribution: true }}>
        <Background color="#1a2030" gap={18} />
        <MiniMap
          style={{ background: "#0A0D12" }}
          nodeColor={() => "#62E6FF"}
          maskColor="rgba(5,6,8,0.7)"
        />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { GraphData, GraphNode } from "@/lib/types";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const NODE_COLORS: Record<string, string> = {
  developer: "#3b82f6",
  skill: "#22c55e",
  project: "#f59e0b",
  company: "#a855f7",
};

const LABEL_NAMES: Record<string, string> = {
  developer: "Developers",
  skill: "Skills",
  project: "Projects",
  company: "Companies",
};

export default function ExplorerPage() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);

  useEffect(() => {
    fetch("/api/graph")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: GraphData) => setGraphData(data))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force("charge").strength(-300);
      graphRef.current.d3Force("link").distance(120);
      graphRef.current.d3ReheatSimulation();
    }
  }, [graphData]);

  useEffect(() => {
    function updateSize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const nodeCanvasObject = useCallback(
    (node: Record<string, unknown>, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const graphNode = node as unknown as GraphNode & { x: number; y: number };
      const label = graphNode.name;
      const fontSize = 12 / globalScale;
      const nodeRadius = graphNode.label === "developer" ? 6 : 4;
      const color = NODE_COLORS[graphNode.label] || "#6b7280";

      // Node circle
      ctx.beginPath();
      ctx.arc(graphNode.x, graphNode.y, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      // Label
      ctx.font = `${fontSize}px Inter, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText(label, graphNode.x, graphNode.y + nodeRadius + 2);
    },
    []
  );

  const nodePointerAreaPaint = useCallback(
    (node: Record<string, unknown>, color: string, ctx: CanvasRenderingContext2D) => {
      const graphNode = node as unknown as GraphNode & { x: number; y: number };
      const nodeRadius = graphNode.label === "developer" ? 6 : 4;
      ctx.beginPath();
      ctx.arc(graphNode.x, graphNode.y, nodeRadius + 4, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    },
    []
  );

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-2">Connection Error</h1>
          <p className="text-gray-400">{error}</p>
          <p className="text-gray-500 text-sm mt-2">
            Make sure Gremlin Server is running and seeded.
          </p>
        </div>
      </div>
    );
  }

  if (!graphData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-r-transparent mb-4" />
          <p className="text-gray-400">Loading graph...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden" ref={containerRef}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pointer-events-none">
        <h1 className="text-2xl font-bold">
          Dev<span className="text-blue-400">Graph</span>
        </h1>
        <p className="text-sm text-gray-400">
          {graphData.nodes.length} nodes &middot; {graphData.links.length} edges
        </p>
      </div>

      {/* Legend + Nav */}
      <div className="absolute top-4 right-4 z-10 bg-gray-900/80 backdrop-blur rounded-lg p-3 text-sm">
        {Object.entries(LABEL_NAMES).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: NODE_COLORS[key] }}
            />
            <span className="text-gray-300">{label}</span>
          </div>
        ))}
        <div className="border-t border-gray-700 mt-2 pt-2 space-y-1">
          <Link
            href="/"
            className="block text-gray-400 hover:text-white transition-colors pointer-events-auto"
          >
            &larr; Home
          </Link>
          <Link
            href="/recommend"
            className="block text-blue-400 hover:text-blue-300 transition-colors pointer-events-auto"
          >
            Skill Recommender &rarr;
          </Link>
        </div>
      </div>

      {/* Hovered node info */}
      {hoveredNode && (
        <div className="absolute bottom-4 left-4 z-10 bg-gray-900/90 backdrop-blur rounded-lg p-4 max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: NODE_COLORS[hoveredNode.label] }}
            />
            <span className="font-semibold">{hoveredNode.name}</span>
          </div>
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {hoveredNode.label}
          </span>
          {Object.entries(hoveredNode.properties)
            .filter(([k]) => k !== "name")
            .map(([key, val]) => (
              <div key={key} className="text-sm text-gray-400 mt-1">
                {key}: <span className="text-gray-200">{val}</span>
              </div>
            ))}
        </div>
      )}

      {/* Graph */}
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        nodeId="id"
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={nodePointerAreaPaint}
        linkColor={() => "rgba(255,255,255,0.1)"}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={0.9}
        linkLabel="label"
        backgroundColor="transparent"
        onNodeHover={(node) => setHoveredNode(node as GraphNode | null)}
        cooldownTicks={200}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.2}
      />
    </div>
  );
}

"use client";

import React, { useCallback } from "react";
import { useTheme } from "next-themes"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "trigger-1",
    position: { x: 250, y: 100 },
    data: { label: "Start Workflow" },
    type: "input",
  },
  {
    id: "action-1",
    position: { x: 250, y: 200 },
    data: { label: "Execute Task" },
  },
];
const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "trigger-1",
    target: "action-1",
  },
];

export function FlowCanvas() {
  const { theme } = useTheme();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  return (
    <div className="h-full w-full border rounded-xl overflow-hidden bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        colorMode={theme === "dark" ? "dark" : "light"}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

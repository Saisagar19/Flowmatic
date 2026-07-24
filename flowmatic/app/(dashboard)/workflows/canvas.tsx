"use client";

import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { StandardNode } from '@/components/standard-node'
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
  Node,
  Panel,
  ReactFlowProvider,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { NodeSelector } from "@/components/node-selector";
import { Plus } from "lucide-react";
import { PlaceholderNode } from "@/components/placeholder-node";

const initialNodes: Node[] = [
  {
    id: "initial-trigger-node",
    position: { x: 250, y: 100 },
    data: {},
    type: "placeholder", // Using the PlaceholderNode type
    sourcePosition: "right" as any, // Type assertion to satisfy TypeScript
    targetPosition: "left" as any // Ensure this matches the handle ID in PlaceholderNode
  },
];
const initialEdges: Edge[] = [];

function FlowCanvasInner() {
  const { theme } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const [Mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      placeholder: (props) => (
        <PlaceholderNode {...props} onClick={() => setIsSelectorOpen(true)} />
      ),standardNode: StandardNode,
    }),
    [setIsSelectorOpen],
  );
  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={Mounted && theme === "dark" ? "dark" : "light"}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right" className="m-4">
          <Button variant="secondary" onClick={() => setIsSelectorOpen(true)} className="shadow-lg border">
            <Plus className="mr-2 h-4 w-" />
          </Button>
        </Panel>
      </ReactFlow>

      <NodeSelector open={isSelectorOpen} onOpenChange={setIsSelectorOpen} />
    </>
  );
}

export function FlowCanvas() {
  return (
    <div className="h-full w-full border rounded-xl overflow-hidden bg-background relative">
      <ReactFlowProvider>
        <FlowCanvasInner />
      </ReactFlowProvider>
    </div>
  );
}

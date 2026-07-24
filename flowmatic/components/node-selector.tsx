"use client"

import { useReactFlow } from "@xyflow/react"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet"
import { Mail, HardDrive, BrainCircuit, Play } from "lucide-react"

interface NodeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Define the available nodes
const availableNodes = [
  { type: "manualTrigger", label: "Manual Trigger", icon: Play, description: "Start workflow manually" },
  { type: "gmail", label: "Gmail Integration", icon: Mail, description: "Send or read emails" },
  { type: "drive", label: "Google Drive", icon: HardDrive, description: "Read or upload files" },
  { type: "springAi", label: "Spring AI Model", icon: BrainCircuit, description: "Execute AI prompt" },
]

export function NodeSelector({ open, onOpenChange }: NodeSelectorProps) {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow()

  const handleAddNode = (nodeData: typeof availableNodes[0]) => {
    const currentNodes = getNodes();
    const hasInitialPlaceholder = currentNodes.some((node) => node.id === 'initial-trigger-node');
    let position;
    
    if (hasInitialPlaceholder) {
      const placeholderNode = currentNodes.find((node) => node.id === 'initial-trigger-node');
      position = placeholderNode?.position || { x: 250, y: 150 };
    } else {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      position = screenToFlowPosition({
        x: centerX + (Math.random() - 0.5) * 200,
        y: centerY,
      });
    }
    const newNode = {
      id: `${nodeData.type}-${Date.now()}`, // Unique ID
      type: "standardNode",
      position: position,
      data: { label: nodeData.label, customType: nodeData.type },
    }

    if (hasInitialPlaceholder) {
      setNodes([newNode]);
    } else {
      setNodes((nds) => [...nds, newNode]);
    }
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add a Node</SheetTitle>
          <SheetDescription>
            Select a node to add it to your workflow canvas.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col gap-3">
          {availableNodes.map((node) => (
            <div
              key={node.type}
              onClick={() => handleAddNode(node)}
              className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent hover:border-primary transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <node.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">{node.label}</span>
                <span className="text-xs text-muted-foreground">{node.description}</span>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
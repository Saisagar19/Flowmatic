"use client"

import { FlowCanvas } from "../canvas"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function NewWorkflowPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push('/workflows')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>  
          <h1 className="font-semibold">Untitled Workflow</h1>
        </div>
        <Button>Save Workflow</Button>
      </div>
      <div className="flex-1 bg-muted/20">
        <FlowCanvas />
      </div>
    </div>
  )
}
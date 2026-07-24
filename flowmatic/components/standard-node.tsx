import React from 'react'
import { BaseNode } from './base-node'
import { NodeProps } from '@xyflow/react'
import { Play, Mail, HardDrive, BrainCircuit, LucideIcon } from 'lucide-react'

// A simple dictionary to map the string 'type' from our sidebar to a real Lucide Icon component
const iconMap: Record<string, LucideIcon> = {
  manualTrigger: Play,
  gmail: Mail,
  drive: HardDrive,
  springAi: BrainCircuit,
}

export function StandardNode({ data }: NodeProps) {
  // Extract the label and customType we passed in from the sidebar
  const label = data.label as string
  const customType = data.customType as string
  
  // Find the matching icon, fallback to a default if not found
  const IconComponent = iconMap[customType] || Play

  return (
    // We use the BaseNode to guarantee it has the size-24 curved square shape!
    <BaseNode>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50">
        <IconComponent className="h-5 w-5 text-primary" />
      </div>
      <span className="text-[10px] font-medium leading-tight">{label}</span>
    </BaseNode>
  )
}
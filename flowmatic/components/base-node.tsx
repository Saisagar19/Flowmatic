import React, { forwardRef } from "react"
import { Handle, Position } from "@xyflow/react"
import { cn } from "@/lib/utils"

export interface BaseNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  // Optional flag to hide the top/bottom dots if a node only needs one
  hideSource?: boolean 
  hideTarget?: boolean
}

export const BaseNode = forwardRef<HTMLDivElement, BaseNodeProps>(
  ({ className, children, hideSource = false, hideTarget = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex size-20 flex-col items-center justify-center rounded-xl border bg-card text-card-foreground shadow-sm transition-colors hover:border-primary",
          className
        )}
        {...props}
      >
        {/* 2. TARGET HANDLE: The dot on the TOP where lines come IN */}
        {!hideTarget && (
          <Handle
            type="target"
            position={Position.Left}
            className="h-3 w-3 border-2 border-background bg-primary"
            style={{ left: "-4px" }}
          />
        )}

        {/* 3. The actual content of the node (e.g., an icon and a short label) */}
        <div className="flex flex-col items-center justify-center gap-2 p-2 text-center">
            {children}
        </div>

        {/* 4. SOURCE HANDLE: The dot on the BOTTOM where lines go OUT */}
        {!hideSource && (
          <Handle
            type="source"
            position={Position.Right}
            className="h-3 w-3 border-2 border-background bg-primary"
            style={{ right: "-4px" }}
          />
        )}
      </div>
    )
  }
)
BaseNode.displayName = "BaseNode"
import React, { forwardRef } from "react";
import { Plus } from "lucide-react";
import { BaseNode } from "@/components/base-node";
import { cn } from "@/lib/utils";

export interface PlaceholderNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

export const PlaceholderNode = forwardRef<HTMLDivElement, PlaceholderNodeProps>(
  ({ className, onClick, ...props }, ref) => {
    return (
      <BaseNode
        ref={ref}
        onClick={onClick}
        className={cn(
          "flex size-20 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/50 bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-accent hover:text-primary cursor-pointer shadow-none",
          className,
        )}
        {...props}
      >
        <Plus className="size-8" />
      </BaseNode>
    );
  },
);
PlaceholderNode.displayName = "PlaceholderNode";

"use client"

import { Search, MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

// Dummy data to simulate previous workflows from the database
const dummyWorkflows = [
  {
    id: "1",
    name: "Dummy Workflow 1",
    lastUpdated: "1 day ago",
    created: "20 July",
  },
  {
    id: "2",
    name: "Dummy Workflow 2",
    lastUpdated: "1 day ago",
    created: "20 July",
  },
]

export default function WorkflowsPage() {
  const router = useRouter();
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Personal</h2>
          <p className="text-sm text-muted-foreground">
            Workflows you have created will show here. You can also create new workflows from this page.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => router.push('/workflows/new')} className="bg-orange-600 hover:bg-orange-700 text-white" >
            Create workflow
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search" 
            className="pl-8 bg-background" 
          />
        </div>
      </div>

      <div className="grid gap-3">
        {dummyWorkflows.map((workflow) => (
          <Card 
            key={workflow.id} 
            className="flex flex-row justify-between p-4 hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-start text-left gap-1">
              <h3 className="font-semibold text-sm">{workflow.name}</h3>
              <p className="text-xs text-muted-foreground">
                Last updated {workflow.lastUpdated} | Created {workflow.created}
              </p>
            </div>
            
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Open menu</span>
            </Button>
          </Card>
        ))}

        {dummyWorkflows.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-background">
            <p className="text-muted-foreground mb-4">No workflows found.</p>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Create your first workflow
            </Button>
          </div>
        )}
      </div>

    </div>
  )
}
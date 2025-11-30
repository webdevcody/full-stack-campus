import { useState } from "react";
import { Plus, Briefcase, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { PortfolioItemCard } from "~/components/PortfolioItemCard";
import { PortfolioItemForm } from "~/components/PortfolioItemForm";
import { useMyPortfolio } from "~/hooks/usePortfolio";
import type { PortfolioItem } from "~/db/schema";

export function PortfolioSection() {
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  
  const { data: portfolioItems, isLoading } = useMyPortfolio();

  const handleEdit = (item: PortfolioItem) => {
    setEditItem(item);
    setFormOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setEditItem(null);
    }
  };

  return (
    <>
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Portfolio</CardTitle>
                <CardDescription>
                  Showcase projects you've built
                </CardDescription>
              </div>
            </div>
            <Button onClick={() => setFormOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Project
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : portfolioItems && portfolioItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.map((item) => (
                <PortfolioItemCard
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  isOwner={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-1">No projects yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your first project to showcase your work
              </p>
              <Button onClick={() => setFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <PortfolioItemForm
        open={formOpen}
        onOpenChange={handleOpenChange}
        editItem={editItem}
      />
    </>
  );
}

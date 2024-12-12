import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Sponsor } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface SponsorListProps {
  sponsors: Sponsor[];
  onUpdate: (sponsors: Sponsor[]) => Promise<void>;
}

export function SponsorList({ sponsors, onUpdate }: SponsorListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSponsorUpdate = async (newSponsors: Sponsor[]) => {
    setIsUpdating(true);
    try {
      await onUpdate(newSponsors);
      toast({
        title: "Success",
        description: "Sponsor list has been updated.",
      });
    } catch (error) {
      console.error('Failed to update sponsors:', error);
      toast({
        title: "Error",
        description: "Failed to update sponsors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const addSponsor = async () => {
    const newSponsors = [
      ...sponsors,
      { name: '', hierarchy: sponsors.length + 1, logoUrl: '', sponsorUrl: '' },
    ];
    await handleSponsorUpdate(newSponsors);
    setExpandedIndex(sponsors.length);
  };

  const updateSponsor = async (index: number, updatedSponsor: Partial<Sponsor>) => {
    const newSponsors = sponsors.map((sponsor, i) =>
      i === index ? { ...sponsor, ...updatedSponsor } : sponsor
    );
    await handleSponsorUpdate(newSponsors);
  };

  const removeSponsor = async (index: number) => {
    const newSponsors = sponsors.filter((_, i) => i !== index);
    await handleSponsorUpdate(newSponsors);
    setExpandedIndex(null);
  };

  const moveSponsor = async (fromIndex: number, toIndex: number) => {
    const newSponsors = [...sponsors];
    const [movedSponsor] = newSponsors.splice(fromIndex, 1);
    newSponsors.splice(toIndex, 0, movedSponsor!);
    const updatedSponsors = newSponsors.map((sponsor, index) => ({ 
      ...sponsor, 
      hierarchy: index + 1 
    }));
    await handleSponsorUpdate(updatedSponsors);
  };

  return (
    <div className="space-y-6">
      <Button
        type="button"
        onClick={addSponsor}
        disabled={isUpdating}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Sponsor
      </Button>
      <AnimatePresence>
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <SponsorRow
              index={index}
              sponsor={sponsor}
              onMove={moveSponsor}
              onUpdate={updateSponsor}
              onRemove={removeSponsor}
              isExpanded={expandedIndex === index}
              onToggleExpand={() => setExpandedIndex(expandedIndex === index ? null : index)}
              isUpdating={isUpdating}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface SponsorRowProps {
  index: number;
  sponsor: Sponsor;
  onMove: (fromIndex: number, toIndex: number) => Promise<void>;
  onUpdate: (index: number, updatedSponsor: Partial<Sponsor>) => Promise<void>;
  onRemove: (index: number) => Promise<void>;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isUpdating: boolean;
}

function SponsorRow({ 
  index, 
  sponsor, 
  onMove, 
  onUpdate, 
  onRemove, 
  isExpanded, 
  onToggleExpand,
  isUpdating 
}: SponsorRowProps) {
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: 'SPONSOR',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: 'SPONSOR',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        onMove(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Card
      ref={(node) => {
        dropRef(node);
        previewRef(node);
      }}
      className={`transition-all duration-200 bg-secondary ${
        isDragging ? 'opacity-50' : ''
      } ${isOver ? 'bg-primary/10' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div
            ref={(node) => {
              if (node) {
                dragRef(node);
              }
            }}
            className={`cursor-move ${isUpdating ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <GripVertical className="h-5 w-5 text-primary-foreground" />
          </div>

          <div className="flex-1">
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto font-normal hover:bg-transparent text-primary-foreground"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleExpand();
              }}
              disabled={isUpdating}
            >
              {sponsor.name || 'Unnamed Sponsor'}
            </Button>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => onRemove(index)}
            disabled={isUpdating}
            className="shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor={`sponsor-name-${index}`} className="text-primary-foreground">Name</Label>
                <Input
                  id={`sponsor-name-${index}`}
                  value={sponsor.name}
                  onChange={(e) => onUpdate(index, { name: e.target.value })}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Sponsor Name"
                  className="bg-secondary-foreground text-secondary"
                  disabled={isUpdating}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`sponsor-logo-${index}`} className="text-primary-foreground">Logo URL</Label>
                <Input
                  id={`sponsor-logo-${index}`}
                  value={sponsor.logoUrl}
                  onChange={(e) => onUpdate(index, { logoUrl: e.target.value })}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Logo URL"
                  className="bg-secondary-foreground text-secondary"
                  disabled={isUpdating}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`sponsor-url-${index}`} className="text-primary-foreground">Sponsor URL</Label>
                <Input
                  id={`sponsor-url-${index}`}
                  value={sponsor.sponsorUrl}
                  onChange={(e) => onUpdate(index, { sponsorUrl: e.target.value })}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Sponsor URL"
                  className="bg-secondary-foreground text-secondary"
                  disabled={isUpdating}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}


import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sponsor } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface SponsorListProps {
  sponsors: Sponsor[];
  onUpdate: (sponsors: Sponsor[]) => void;
}

export function SponsorList({ sponsors, onUpdate }: SponsorListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addSponsor = () => {
    onUpdate([
      ...sponsors,
      { name: '', hierarchy: sponsors.length + 1, logoUrl: '', sponsorUrl: '' },
    ]);
    setExpandedIndex(sponsors.length);
  };

  const updateSponsor = (index: number, updatedSponsor: Partial<Sponsor>) => {
    const newSponsors = sponsors.map((sponsor, i) =>
      i === index ? { ...sponsor, ...updatedSponsor } : sponsor
    );
    onUpdate(newSponsors);
  };

  const removeSponsor = (index: number) => {
    const newSponsors = sponsors.filter((_, i) => i !== index);
    onUpdate(newSponsors);
    setExpandedIndex(null);
  };

  const moveSponsor = (fromIndex: number, toIndex: number) => {
    const newSponsors = [...sponsors];
    const [movedSponsor] = newSponsors.splice(fromIndex, 1);
    newSponsors.splice(toIndex, 0, movedSponsor!); // Force assertion that movedSponsor is not undefined
    onUpdate(newSponsors.map((sponsor, index) => ({ ...sponsor, hierarchy: index + 1 })));
  };

  return (
    <div className="space-y-6">
      <Button
        type="button"
        onClick={addSponsor}
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
  onMove: (fromIndex: number, toIndex: number) => void;
  onUpdate: (index: number, updatedSponsor: Partial<Sponsor>) => void;
  onRemove: (index: number) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function SponsorRow({ index, sponsor, onMove, onUpdate, onRemove, isExpanded, onToggleExpand }: SponsorRowProps) {
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
      className={`transition-all duration-200 bg-secondary ${isDragging ? 'opacity-50' : ''
        } ${isOver ? 'bg-primary/10' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div
            ref={(node) => {
              if (node) {
                dragRef(node); // Attach the drag source ref
              }
            }}
            className="cursor-move"
          >
            <GripVertical className="h-5 w-5 text-primary-foreground" />
          </div>

          <div className="flex-1">
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto font-normal hover:bg-transparent text-primary-foreground"
              onClick={onToggleExpand}
            >
              {sponsor.name || 'Unnamed Sponsor'}
            </Button>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => onRemove(index)}
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
                  placeholder="Sponsor Name"
                  className="bg-secondary-foreground text-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`sponsor-logo-${index}`} className="text-primary-foreground">Logo URL</Label>
                <Input
                  id={`sponsor-logo-${index}`}
                  value={sponsor.logoUrl}
                  onChange={(e) => onUpdate(index, { logoUrl: e.target.value })}
                  placeholder="Logo URL"
                  className="bg-secondary-foreground text-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`sponsor-url-${index}`} className="text-primary-foreground">Sponsor URL</Label>
                <Input
                  id={`sponsor-url-${index}`}
                  value={sponsor.sponsorUrl}
                  onChange={(e) => onUpdate(index, { sponsorUrl: e.target.value })}
                  placeholder="Sponsor URL"
                  className="bg-secondary-foreground text-secondary"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}


'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { HeroData, Sponsor } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { AlignLeft, Loader2, Pencil, Save, Type, Video, X } from 'lucide-react';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SponsorList } from './SponsorList';

interface HeroEditorProps {
  initialData: HeroData;
  onSave: (data: HeroData) => Promise<void>;
  onClose: () => void;
}

export function HeroEditor({ initialData, onSave, onClose }: HeroEditorProps) {
  const [data, setData] = useState<HeroData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(data);
      toast({
        title: "Changes saved",
        description: "Your hero section has been updated successfully.",
      });
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSponsors = (newSponsors: Sponsor[]) => {
    setData((prev) => ({ ...prev, sponsors: newSponsors }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-5xl bg-primary/70 backdrop-blur-xl shadow-2xl  overflow-hidden border border-accent"
    >
      <div className="flex items-center justify-between p-6 border-b border-accent bg-primary/10">
        <h2 className="text-3xl font-bold font-h1 flex items-center text-primary-foreground">
          <Pencil className="mr-3 h-8 w-8 text-accent" />
          Edit Hero Section
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-primary-foreground hover:text-accent hover:bg-primary/20 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-1 bg-primary/10 rounded-lg mb-6">
            <TabsTrigger 
              value="content" 
              className="py-3 text-primary-foreground rounded-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all"
            >
              <Type className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger 
              value="media" 
              className="py-3 text-primary-foreground rounded-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all"
            >
              <Video className="mr-2 h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="sponsors" 
              className="py-3 rounded-md text-primary-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all"
            >
              <AlignLeft className="mr-2 h-4 w-4" />
              Sponsors
            </TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <TabsContent value="content" className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-8 md:grid-cols-2"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-primary-foreground">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={data.title}
                      onChange={handleChange}
                      placeholder="Enter hero title"
                      className="w-full bg-secondary-foreground text-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle" className="text-sm font-medium text-primary-foreground">Subtitle</Label>
                    <Textarea
                      id="subtitle"
                      name="subtitle"
                      value={data.subtitle}
                      onChange={handleChange}
                      placeholder="Enter hero subtitle"
                      className="w-full min-h-[100px] bg-secondary-foreground text-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ctaPrimary" className="text-sm font-medium text-primary-foreground">Primary CTA</Label>
                    <Input
                      id="ctaPrimary"
                      name="ctaPrimary"
                      value={data.ctaPrimary}
                      onChange={handleChange}
                      placeholder="Enter primary CTA text"
                      className="w-full bg-secondary-foreground text-secondary"
                    />
                  </div>
                </div>
                <div className="p-6 border border-accent rounded-xl bg-primary/10 space-y-4">
                  <h3 className="text-lg font-semibold mb-4 text-primary-foreground">Preview</h3>
                  <div className="space-y-4">
                    <p className="text-3xl font-bold text-primary-foreground">{data.title || 'Hero Title'}</p>
                    <p className="text-secondary-foreground">{data.subtitle || 'Hero Subtitle'}</p>
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      {data.ctaPrimary || 'Primary CTA'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="media" className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-8 md:grid-cols-2"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="homePageVideoUrl" className="text-sm font-medium text-primary-foreground">Video URL</Label>
                    <Input
                      id="homePageVideoUrl"
                      name="homePageVideoUrl"
                      value={data.homePageVideoUrl}
                      onChange={handleChange}
                      placeholder="Enter YouTube video URL"
                      className="w-full bg-secondary-foreground text-secondary"
                    />
                  </div>
                </div>
                {data.homePageVideoUrl && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-primary/10 shadow-inner">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(data.homePageVideoUrl)}`}
                      title="Hero video"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="sponsors" className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <DndProvider backend={HTML5Backend}>
                  <SponsorList
                    sponsors={data.sponsors}
                    onUpdate={updateSponsors}
                  />
                </DndProvider>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
        
        <div className="flex justify-end space-x-3 pt-6 border-t border-accent">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-accent text-primary-foreground hover:bg-primary/20 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }
  
  return null;
}

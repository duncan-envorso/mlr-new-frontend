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
import { useSession } from 'next-auth/react';
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
  const { data: session } = useSession();




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
      // Just pass the data to the parent component
      await onSave(data);

      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  const updateSponsors = async (newSponsors: Sponsor[]) => {
    setData((prev) => ({ ...prev, sponsors: newSponsors }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-5xl bg-black backdrop-blur-xl shadow-lg overflow-hidden border border-navy/10"
    >
      <div className="flex items-center justify-between p-6 border-b border-white bg-black">
        <h2 className="text-3xl font-industry-ultra uppercase text-white flex items-center">
          <Pencil className="mr-3 h-8 w-8 text-green" />
          Edit Home Carousel
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          className="text-white hover:text-green hover:bg-white/10 rounded-lg border-white/10"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 bg-navy/10 rounded-lg mb-6">
            <TabsTrigger
              value="content"
              className="font-industry-ultra uppercase py-3 text-white bg-navy/30 rounded-lg data-[state=active]:bg-green data-[state=active]:text-navy hover:bg-navy/40 transition-all"
            >
              <Type className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="font-industry-ultra uppercase py-3 text-white bg-navy/30 rounded-lg data-[state=active]:bg-green data-[state=active]:text-navy hover:bg-navy/40 transition-all"
            >
              <Video className="mr-2 h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger
              value="sponsors"
              className="font-industry-ultra uppercase py-3 text-white bg-navy/30 rounded-lg data-[state=active]:bg-green data-[state=active]:text-navy hover:bg-navy/40 transition-all"
            >
              <AlignLeft className="mr-2 h-4 w-4" />
              Home Carousel
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="content" className="space-y-6 ">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-8 md:grid-cols-2"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-industry-demi text-white">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={data.title}
                      onChange={handleChange}
                      placeholder="Enter hero title"
                      className="w-full bg-white/10 text-white border-navy/10 focus:border-green font-industry-book placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle" className="text-sm font-industry-demi text-white">Subtitle</Label>
                    <Textarea
                      id="subtitle"
                      name="subtitle"
                      value={data.subtitle}
                      onChange={handleChange}
                      placeholder="Enter hero subtitle"
                      className="w-full min-h-[100px] bg-white/10 text-white border-navy/10 focus:border-green font-industry-book placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ctaPrimary" className="text-sm font-industry-demi text-white">Primary CTA</Label>
                    <Input
                      id="ctaPrimary"
                      name="ctaPrimary"
                      value={data.ctaPrimary}
                      onChange={handleChange}
                      placeholder="Enter primary CTA text"
                      className="w-full bg-white/10 text-white border-navy/10 focus:border-green font-industry-book placeholder:text-white/50"
                    />
                  </div>
                </div>
                <div className="p-6 border border-navy/10 rounded-lg bg-navy/5 space-y-4">
                  <h3 className="text-lg font-industry-ultra uppercase mb-4 text-white">Preview</h3>
                  <div className="space-y-4">
                    <p className="text-3xl font-road-rage text-white">{data.title || 'Hero Title'}</p>
                    <p className="font-industry-book text-white/80">{data.subtitle || 'Hero Subtitle'}</p>
                    <Button
                      size="lg"
                      className="bg-green text-navy hover:bg-green/90 font-industry-ultra uppercase px-8 py-6"
                    >
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
                    <Label htmlFor="homePageVideoUrl" className="text-sm font-industry-demi text-white">Video URL</Label>
                    <Input
                      id="homePageVideoUrl"
                      name="homePageVideoUrl"
                      value={data.homePageVideoUrl}
                      onChange={handleChange}
                      placeholder="Enter YouTube video URL"
                      className="w-full bg-white/10 text-white border-navy/10 focus:border-green font-industry-book placeholder:text-white/50"
                    />
                  </div>
                </div>
                {data.homePageVideoUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-navy/10 shadow-inner">
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

        <div className="flex justify-end space-x-3 pt-6 border-t border-navy/10">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="font-industry-ultra uppercase border-white/10 text-white hover:bg-white/10 px-8 py-6"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="font-industry-ultra uppercase bg-green text-navy hover:bg-green/90 px-8 py-6"
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

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Shield, Trophy } from 'lucide-react'

const PlayerStatsCardLoading: React.FC = () => {
  return (
    <Card className="w-full max-w-4xl bg-white shadow-xl mx-auto overflow-hidden">
      <CardHeader className="relative p-0">
        <div className="absolute inset-0 bg-primary animate-pulse" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6 text-primary-foreground">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="text-center md:text-left">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 bg-gray-50">
        <Tabs defaultValue="attack" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="attack" className="flex items-center gap-2" disabled>
              <Trophy className="w-4 h-4" />
              Attack
            </TabsTrigger>
            <TabsTrigger value="defense" className="flex items-center gap-2" disabled>
              <Shield className="w-4 h-4" />
              Defense
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2" disabled>
              <Activity className="w-4 h-4" />
              General
            </TabsTrigger>
          </TabsList>
          {["attack", "defense", "general"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-2 w-full mb-1" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default PlayerStatsCardLoading
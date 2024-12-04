import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function StadiumView() {
    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#002855]"></div>
                    <span>Family</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#FFD700]"></div>
                    <span>Gold</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#C0C0C0]"></div>
                    <span>Platinum</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#008000]"></div>
                    <span>VIP</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#00BFFF]"></div>
                    <span>Club</span>
                </div>
            </div>

            {/* Club Level Indicator */}
            <div className="mb-8">
                <div className="flex flex-end justify-end">
                    <div className="w-1/3 bg-[#00BFFF] p-2 text-center font-bold mb-2">
                        Club Level
                    </div>
                </div>
                <div className="flex justify-end gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map(num => (
                        <div key={num} className="w-8 h-8 bg-[#00BFFF] flex items-center justify-center font-bold border border-white">
                            {num}
                        </div>
                    ))}
                    <div className="w-32 bg-[#00BFFF] flex items-center justify-center font-bold">
                        Seawolves Club
                    </div>
                </div>
            </div>
            {/* Top Sections */}
            <div className="flex justify-center gap-1 mb-4">
                <TooltipProvider>
                    {/* Sections 101-107 with updated sizes */}
                    {[
                        { num: "101", color: "#FFD700", width: "w-24" },
                        { num: "102", color: "#FFD700", width: "w-32" },
                        { num: "103", color: "#C0C0C0", width: "w-32" },
                        { num: "104", color: "#C0C0C0", width: "w-32" },
                        { num: "105", color: "#C0C0C0", width: "w-32" },
                        { num: "106", color: "#FFD700", width: "w-32" },
                        { num: "107", color: "#FFD700", width: "w-24" },
                    ].map((section) => (
                        <Tooltip key={section.num}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`h-16 border-2 ${section.width}`}
                                    style={{ backgroundColor: section.color }}
                                >
                                    {section.num}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Section {section.num}</TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </div>

            {/* VIP Sections */}
            <div className="flex justify-center gap-1 mb-4">
                <TooltipProvider>
                    {/* ADA Seating NW */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" className="border-2 border-[#002855]">
                                ADA Seating NW
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>ADA Accessible Seating</TooltipContent>
                    </Tooltip>
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <TooltipProvider key={num}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="border-2 border-[#008000] min-w-[60px]"
                                        style={{ backgroundColor: "#008000", color: "white" }}
                                    >
                                        VIP {num}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>VIP Section {num}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                    {/* ADA Seating NE */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" className="border-2 border-[#002855]">
                                ADA Seating NE
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>ADA Accessible Seating</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>


     <div className="relative">
    {/* Field Container */}
    <div className="relative w-full max-w-4xl mx-auto">
        {/* Standing Room Areas - Left */}
        <div className="absolute left-0 top-1/4 md:top-1/3 -translate-x-full -translate-y-1/2 -ml-4">
            <Button 
                variant="outline" 
                className="border-2 border-[#002855] rotate-[-90deg] whitespace-nowrap origin-right"
            >
                Standing Room Only
            </Button>
        </div>

        {/* Rugby Field */}
        <div className="w-full aspect-[2/1] bg-[#008000] mb-4 border-4 border-white rounded-lg overflow-hidden">
            {/* Main Field Lines */}
            <div className="absolute inset-0">
                {/* Try Lines */}
                <div className="absolute left-[5%] w-0.5 h-full bg-white" />
                <div className="absolute right-[5%] w-0.5 h-full bg-white" />
                
                {/* Goal Posts Indicators */}
                <div className="absolute left-[5%] top-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute right-[5%] top-1/2 w-4 h-4 bg-white rounded-full transform translate-x-1/2 -translate-y-1/2" />
                
                {/* 22m Lines */}
                <div className="absolute left-[22%] w-0.5 h-full bg-white" />
                <div className="absolute right-[22%] w-0.5 h-full bg-white" />
                
                {/* 10m Lines (dashed) */}
                <div className="absolute left-[35%] w-0.5 h-full bg-white opacity-50 border-dashed" />
                <div className="absolute right-[35%] w-0.5 h-full bg-white opacity-50 border-dashed" />
                
                {/* Halfway Line */}
                <div className="absolute left-1/2 w-0.5 h-full bg-white transform -translate-x-1/2" />
                
                {/* Horizontal Lines */}
                <div className="absolute top-0 w-full h-0.5 bg-white" />
                <div className="absolute bottom-0 w-full h-0.5 bg-white" />
            </div>

            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    SEAWOLVES RUGBY
                </div>
            </div>

            {/* Field Markings */}
            <div className="absolute inset-x-0 top-2 flex justify-between px-8 text-white font-bold">
                <div className="pl-4">Try Line</div>
                <div>22m</div>
                <div>10m</div>
                <div>Half</div>
                <div>10m</div>
                <div>22m</div>
                <div className="pr-4">Try Line</div>
            </div>

            {/* In-Goal Areas (shaded) */}
            <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-white/10" />
            <div className="absolute right-0 top-0 bottom-0 w-[5%] bg-white/10" />

            {/* 5m and 15m Hash Marks */}
            <div className="absolute inset-y-0 left-[10%] flex flex-col justify-between py-4">
                <div className="w-2 h-0.5 bg-white" />
                <div className="w-2 h-0.5 bg-white" />
            </div>
            <div className="absolute inset-y-0 right-[10%] flex flex-col justify-between py-4">
                <div className="w-2 h-0.5 bg-white" />
                <div className="w-2 h-0.5 bg-white" />
            </div>
        </div>

        {/* Standing Room Areas - Right */}
        <div className="absolute right-0 top-1/4 md:top-1/3 translate-x-full -translate-y-1/2 mr-[-12]">
            <Button 
                variant="outline" 
                className="border-2 border-[#002855] rotate-90 whitespace-nowrap origin-left"
            >
                Standing Room Only
            </Button>
        </div>
    </div>
</div>

            {/* Bottom Sections */}
            <div className="flex justify-center gap-1">
                <TooltipProvider>
                    {[207, 206, 205, 204, 203, 202, 201].map((num) => (
                        <Tooltip key={num}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-16 h-16 border-2 bg-[#002855] text-white"
                                >
                                    {num}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Family Section {num}</TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </div>
        </div>
    )
}
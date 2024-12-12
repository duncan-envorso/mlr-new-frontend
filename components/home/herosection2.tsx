'use client'

import { Button } from '@/components/ui/button'
import { currentTeamConfig } from '@/config/teamConfig'
import { toast } from '@/hooks/use-toast'
import { HeroData, Sponsor } from '@/lib/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Pencil, ShoppingBag, Ticket } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { HeroEditor } from './admin/HeroEditor'
import SponsorCarousel from './SponsorsCarousel'

interface Configuration {
    key: string;
    value: HeroData;
}



export default function HeroSectionTwo() {
    const [heroData, setHeroData] = useState<Configuration[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const sectionRef = useRef(null)
    const { data: session } = useSession()
    const [isUserSignedIn] = useState(false)

    // Fetch data from the API
    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch(
                    'https://api.seawolves.envorso.com/v1/panel/config/034db172-942f-48b8-bc91-a0b3eb3a025f',
                    {
                        headers: {
                            'accept': 'application/json',
                            'Authorization': `Bearer ${session?.user.accessToken}`,
                        },
                    }
                )
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setHeroData(data.configurations || [])
            } catch (error) {
                console.error('Failed to fetch hero data:', error)
                toast({
                    title: "Error",
                    description: "Failed to load hero data. Please refresh the page.",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        if (session?.user.accessToken) {
            fetchHeroData()
        }
    }, [session?.user.accessToken])

    // Extract the actual hero data from the configurations array
    const currentHeroData = heroData.find(config => config.key === 'heroData')?.value || {
        title: '',
        subtitle: '',
        ctaPrimary: '',
        ctaSecondary: '',
        homePageVideoUrl: '',
        sponsors: []
    }

    const handleSaveHeroData = async (updatedData: HeroData) => {
        try {
            // Create the proper payload structure
            const payload = {
                key: 'heroData',
                value: updatedData
            }

            const response = await fetch(
                'https://api.seawolves.envorso.com/v1/panel/config?teamId=034db172-942f-48b8-bc91-a0b3eb3a025f',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.user.accessToken}`,
                    },
                    body: JSON.stringify(payload)
                }
            )

            const responseData = await response.json()

            if (!response.ok) {
                throw new Error(responseData.error || `HTTP error! status: ${response.status}`)
            }

            // Update local state with new data
            setHeroData(prevData => {
                const newData = [...prevData]
                const index = newData.findIndex(config => config.key === 'heroData')
                if (index !== -1) {
                    newData[index] = { key: 'heroData', value: updatedData }
                } else {
                    newData.push({ key: 'heroData', value: updatedData })
                }
                return newData
            })

            toast({
                title: "Success",
                description: responseData.message || "Hero section updated successfully",
            })

            setIsEditing(false)
        } catch (error) {
            console.error('Failed to save hero data:', error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to save changes. Please try again.",
                variant: "destructive",
            })
            throw error
        }
    }

    const handleSponsorsUpdate = async (updatedSponsors: Sponsor[]) => {
        try {
            const updatedData = {
                ...currentHeroData,
                sponsors: updatedSponsors
            }
            await handleSaveHeroData(updatedData)
        } catch (error) {
            console.error('Failed to update sponsors:', error)
        }
    }

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    const getYouTubeEmbedUrl = () => {
        try {
            const url = currentHeroData.homePageVideoUrl
            if (!url) return ''

            let videoId = ''
            if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
            } else if (url.includes('v=')) {
                videoId = url.split('v=')[1]?.split('&')[0] || ''
            }

            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&playlist=${videoId}&playsinline=1&enablejsapi=1&vq=hd1080&origin=${window.location.origin}&widgetid=1`
        } catch {
            return ''
        }
    }

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                when: 'beforeChildren',
                staggerChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12" />
            </div>
        )
    }

    if (isEditing) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4 bg-black/50">
                <HeroEditor
                    initialData={currentHeroData}
                    onSave={handleSaveHeroData}
                    onClose={() => setIsEditing(false)}
                />
            </div>
        )
    }

    return (
        <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
            {!isUserSignedIn && (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsEditing(true)}
                    className="absolute top-20 right-4 z-10 bg-white/20 hover:bg-white/30"
                >
                    <Pencil className="h-5 w-5 text-white" />
                </Button>
            )}

            <div className="sticky h-screen">
                {currentHeroData.homePageVideoUrl && (
                    <iframe
                        className="absolute w-[100vw] h-[150vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[177.77vh] min-h-[80vw] -mt-[60px]"
                        src={getYouTubeEmbedUrl()}
                        title="Background video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        loading="lazy"
                        style={{
                            position: 'absolute',
                            pointerEvents: 'none',
                            border: 'none',
                            marginTop: '-60px',
                            height: '150vh',
                            objectFit: 'cover',
                            transform: 'translate(-50%, -50%) scale(1.2)'
                        }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
                <div className="absolute inset-0 bg-hero-pattern opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />

                <motion.div
                    className="relative flex h-full items-start lg:items-center justify-center pt-20 lg:pt-0"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ opacity, scale, y }}
                >
                    <div className="container mx-auto px-4 mt-40 md:mt-2 lg:mt-2">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start lg:items-center">
                            <div className="lg:hidden w-full mb-8">
                                <SponsorCarousel 
                                    sponsors={currentHeroData.sponsors}
                                    onSponsorsUpdate={handleSponsorsUpdate}
                                />
                            </div>

                            <div className="text-left lg:col-span-2 ml-4 lg:ml-20 mb-8 lg:mb-20">
                                <motion.h1
                                    className={`font-heading font-black mb-4 text-4xl lg:text-7xl uppercase text-white ${currentTeamConfig?.fonts.h1[0]}`}
                                    variants={itemVariants}
                                >
                                    {currentHeroData.title}
                                </motion.h1>

                                <motion.p
                                    className={`font-body mb-8 text-lg font-light text-white sm:text-xl md:text-2xl ${currentTeamConfig?.fonts.body[0]}`}
                                    variants={itemVariants}
                                >
                                    {currentHeroData.subtitle}
                                </motion.p>

                                <motion.div
                                    className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4"
                                    variants={itemVariants}
                                >
                                    <Button
                                        variant="default"
                                        size="lg"
                                        className={`font-body w-full sm:w-auto rounded-full px-8 py-6 text-lg font-semibold ${currentTeamConfig?.colors['primary-foreground']}`}
                                    >
                                        <Ticket className="mr-2 h-5 w-5" />
                                        {currentHeroData.ctaPrimary}
                                    </Button>
                                    <Link href={'/shop'}>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className={`font-body w-full rounded-full border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white sm:w-auto`}
                                        >
                                            <ShoppingBag className="mr-2 h-5 w-5" />
                                            Visit Shop
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="hidden lg:block">
                                <div className="flex flex-col items-center">
                                    <SponsorCarousel 
                                        sponsors={currentHeroData.sponsors}
                                        onSponsorsUpdate={handleSponsorsUpdate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <ChevronDown className="h-8 w-8 text-white animate-bounce" />
            </motion.div>
        </section>
    )
}
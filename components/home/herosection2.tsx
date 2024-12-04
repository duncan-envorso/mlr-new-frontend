'use client'

import { Button } from '@/components/ui/button'
import { currentTeamConfig } from '@/config/teamConfig'
import { HeroData } from '@/lib/types'
import { mockHeroData } from '@/mockdata'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Pencil, Ticket } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { HeroEditor } from './admin/HeroEditor'
import AppStoreButtons from './appStoreButtons'
import SponsorCarousel from './SponsorsCarousel'

interface APIResponse {
    configurations: Array<{
        key: string
        value: HeroData
    }>
}

export default function HeroSectionTwo() {
    const [heroData, setHeroData] = useState<HeroData>(mockHeroData)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const sectionRef = useRef(null)

    // Mock authentication - simulating a signed-in user
    const [isUserSignedIn, setIsUserSignedIn] = useState(false)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch(
                    `https://api.seawolves.envorso.com/v1/panel/config/${currentTeamConfig?.teamId}`,
                    {
                        headers: {
                            accept: 'application/json',
                        },
                    }
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch hero data')
                }

                const data: APIResponse = await response.json()
                const heroConfig = data.configurations.find(
                    (config) => config.key === 'heroData'
                )

                if (heroConfig) {
                    setHeroData({
                        ...heroConfig.value,
                        sponsors: Array.isArray(heroConfig.value.sponsors)
                            ? heroConfig.value.sponsors
                            : mockHeroData.sponsors
                    })
                } else {
                    setHeroData(mockHeroData)
                }
            } catch (error) {
                console.error('Error fetching hero data:', error)
                setHeroData(mockHeroData)
            } finally {
                setIsLoading(false)
            }
        }

        fetchHeroData()
    }, [])

    const handleSaveHeroData = async (updatedData: HeroData) => {
        try {
            setHeroData(updatedData)
            setIsEditing(false)
        } catch (error) {
            console.error('Failed to save hero data:', error)
        }
    }

    const getYouTubeEmbedUrl = () => {
        try {
            const url = heroData.homePageVideoUrl
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
                    initialData={heroData}
                    onSave={handleSaveHeroData}
                    onClose={() => setIsEditing(false)}
                />
            </div>
        )
    }

    return (
        <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden ">
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
                {heroData.homePageVideoUrl && (
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
                        {/* Move the SponsorCarousel above the text content for mobile */}
                        <div className="lg:hidden w-full mb-8">
                            <SponsorCarousel sponsors={heroData.sponsors} />
                        </div>

                        <div className="text-left lg:col-span-2 ml-4 lg:ml-20 mb-8 lg:mb-20">
                            <motion.h1
                                className={`font-heading font-black mb-4 text-4xl lg:text-7xl uppercase text-white ${currentTeamConfig?.fonts.h1[0]}`}
                                variants={itemVariants}
                            >
                                {heroData.title}
                            </motion.h1>

                            <motion.p
                                className={`font-body mb-8 text-lg font-light text-white sm:text-xl md:text-2xl ${currentTeamConfig?.fonts.body[0]}`}
                                variants={itemVariants}
                            >
                                {heroData.subtitle}
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
                                    {heroData.ctaPrimary}
                                </Button>
                                {currentTeamConfig && (
                                    <AppStoreButtons currentTeamConfig={currentTeamConfig} heroData={heroData} />
                                )}
                            </motion.div>
                        </div>

                        {/* Keep the SponsorCarousel in its original position for larger screens */}
                        <div className="hidden lg:block">
                            <SponsorCarousel sponsors={heroData.sponsors} />
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
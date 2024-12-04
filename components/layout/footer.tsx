import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { currentTeamConfig } from '@/config/teamConfig'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer
        className="relative text-white overflow-hidden bg-gradient-to-r from-primary/90 to-primary/70"
        style={{
          backgroundImage: `url(${currentTeamConfig?.footerBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
          <div className='flex flex-row justify-between items-center'>
            <div className="flex flex-col items-center justify-center">
              <Image
                src={currentTeamConfig?.logo as string}
                alt={currentTeamConfig?.name as string}
                width={150}
                height={150}
                className="w-auto h-auto max-h-24"
                priority
              />
              <div className="flex space-x-4 mt-4">
                <Link href={currentTeamConfig?.socialMedia.facebook || '#'} className="hover:text-primary-foreground transition-colors">
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link href={currentTeamConfig?.socialMedia.instagram || '#'} className="hover:text-primary-foreground transition-colors">
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link href={currentTeamConfig?.socialMedia.twitter || '#'} className="hover:text-primary-foreground transition-colors">
                  <Twitter className="w-6 h-6" />
                </Link>
                <Link href={currentTeamConfig?.socialMedia.youtube || '#'} className="hover:text-primary-foreground transition-colors">
                  <Youtube className="w-6 h-6" />
                </Link>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
              <p className="mb-6">Sign up for email alerts and be the first to know about league info.</p>
              <form className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Download App Section */}
        <div className="text-center py-6">
          <h3 className="text-lg font-semibold mb-4">Download Our App</h3>
          <div className="flex justify-center gap-4">
            <Link
              href={currentTeamConfig?.appStoreLinks.ios || '#'}
              className="hover:opacity-80 transition-opacity"
            >
              <Image alt='istore logo' height={100} width={100} src={'https://upload.wikimedia.org/wikipedia/commons/9/91/Download_on_the_App_Store_RGB_blk.svg'}></Image>
            </Link>
            <Link
              href={currentTeamConfig?.appStoreLinks.android || '#'}
              className="hover:opacity-80 transition-opacity"
            >
              <Image alt='istore logo' height={110} width={110} src={'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg'}></Image>
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm m-5">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/media-credentials" className="hover:underline">Media Credentials</Link>
          <Link href="https://www.teamworkonline.com/other-sports-jobs/major-league-rugby/seattle-seawolves-jobs" className="hover:underline">Careers</Link>
          <Link href="/contact-us" className="hover:underline">Contact Us</Link>
        </nav>

        {/* Copyright */}
        <div className="text-center text-sm text-white/80 max-w-4xl mx-auto pb-8">
          <p className="mb-2">© {new Date().getFullYear()} Major League Rugby. All rights reserved. Major League Rugby, MLR and the MLR shield design are registered trademarks of Major League Rugby.</p>
          <p>The team names, logos and designs are registered trademarks of the teams indicated.</p>
        </div>
      </footer>
    </>
  )
}
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { currentTeamConfig } from '@/config/teamConfig'
import { ShoppingBag, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SocialIcon } from "react-social-icons"
import MLRTeamsBar from '../TeamsBar'

export default function Footer() {
  const SocialLink = ({ href, network }: any) => (
    <div className="hover:text-primary-foreground transition-colors">
      <SocialIcon
        url={href}
        network={network}
        style={{ height: 35, width: 35 }}
        bgColor="transparent"
        fgColor="currentColor"
      />
    </div>
  )

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
                alt="Seattle Seawolves Rugby"
                width={150}
                height={150}
                className="w-auto h-auto max-h-24"
                priority
              />
              <div className="flex space-x-4 mt-4">
                <SocialLink href={currentTeamConfig?.socialMedia.facebook || '#'} network="facebook" />
                <SocialLink href={currentTeamConfig?.socialMedia.instagram || '#'} network="instagram" />
                <SocialLink href={currentTeamConfig?.socialMedia.twitter || '#'} network="x" />
                <SocialLink href={currentTeamConfig?.socialMedia.youtube || '#'} network="youtube" />
                <SocialLink href="https://www.tiktok.com/@seawolvesrugby" network="tiktok" />
              </div>
              <h3 className="text-lg font-semibold mt-4">Follow Us</h3>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
              <p className="mb-6 text-lg">Sign up for email alerts and be the first to know about league info.</p>
              <form className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-lg h-12"
                />
                <Button variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg h-12 px-6">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <MLRTeamsBar />

        <Separator className="bg-white/20" />

        <div className="flex justify-center items-center gap-8 py-6 px-4 flex-wrap">
          <div className="text-center">
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

          <div className="text-center">
            <Link href="/tickets" className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-md">
              <Ticket className="w-5 h-5" />
              <span>Buy Tickets Now</span>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/shop" className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-md">
              <ShoppingBag className="w-5 h-5" />
              <span>Shop Merchandise</span>
            </Link>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-8 text-base m-5">
          <Link href="/privacy-policy" className="hover:underline text-lg">Privacy Policy</Link>
          <Link href="/media-credentials" className="hover:underline text-lg">Media Credentials</Link>
          <Link href="https://www.teamworkonline.com/other-sports-jobs/major-league-rugby/seattle-seawolves-jobs" className="hover:underline text-lg">Careers</Link>
          <Link href="/contact-us" className="hover:underline text-lg">Contact Us</Link>
        </nav>

        <div className="text-center text-sm text-white/80 max-w-4xl mx-auto pb-8">
          <p className="mb-2">© {new Date().getFullYear()} Major League Rugby. All rights reserved. Major League Rugby, MLR and the MLR shield design are registered trademarks of Major League Rugby.</p>
          <p>The team names, logos and designs are registered trademarks of the teams indicated.</p>
        </div>
      </footer>
    </>
  )
}
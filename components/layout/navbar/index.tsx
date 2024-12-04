import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header({ isTransparent = false }) {
  const menuItems = [
    { name: 'TICKETS', url: '/tickets' },
    { name: 'SCHEDULE', url: '/schedule' },
    { name: 'NEWS', url: '/news' },
    { name: 'TEAM', url: '/team' },
    { name: 'SHOP', url: 'https://www.chicagohounds.com/shop/' },
    { name: 'CONTACT', url: '/contact' }
  ];

  const socialIcons = [
    {
      Icon: Facebook,
      url: 'https://web.facebook.com/ChicagoHoundsRugby',
      label: 'Facebook'
    },
    { Icon: Twitter, url: 'https://x.com/HoundsChicago', label: 'Twitter' },
    {
      Icon: Instagram,
      url: 'https://www.instagram.com/chicagohoundsrugby',
      label: 'Instagram'
    }
  ];

  return (
    <div className="mb-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://www.chicagohounds.com/wp-content/uploads/sites/18/2024/01/WebLogo.png"
              alt="Chicago Hounds Logo"
              width={60}
              height={60}
              className="rounded-full bg-white p-1"
            />
            <span className="hidden text-2xl font-bold tracking-tighter sm:inline text-primary-foreground">
              Chicago Hounds
            </span>
          </Link>
          <nav className="hidden items-center md:flex">
            <div className="flex space-x-1">
              {menuItems.map((item) => (
                <Link href={item.url} key={item.name}>
                  <Button
                    variant="ghost"
                    className="text-lg font-medium text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary"
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
            <Separator
              orientation="vertical"
              className="mx-4 h-6 bg-primary-foreground/20"
            />
            <div className="flex space-x-2">
              {socialIcons.map(({ Icon, url, label }) => (
                <Link
                  href={url}
                  key={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-accent/10 text-accent hover:bg-accent/20 hover:text-accent"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
          <div className="flex items-center space-x-4">
            {/* <div className="hidden md:block">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div> */}
            {/* <CartModal /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
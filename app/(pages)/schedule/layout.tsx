import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Match Schedule | Seawolves Rugby',
  description: 'View upcoming and past matches for the Seawolves Rugby team',
  openGraph: {
    title: 'Match Schedule | Seawolves Rugby',
    description: 'View upcoming and past matches for the Seawolves Rugby team',
    type: 'website',
    url: 'https://seawolves.com/schedule',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate this page every 60 seconds

interface ScheduleLayoutProps {
  children: React.ReactNode;
}

export default function ScheduleLayout({ children }: ScheduleLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-200">
      <div className="relative">
        {/* Decorative background pattern */}
        <div 
          className="absolute inset-0 bg-grid-white/10 bg-[size:40px_40px] opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgb(255 255 255 / 0.1) 1px, transparent 1px)`
          }}
          aria-hidden="true"
        />
        
        {/* Main Content */}
        <div className="relative">
          <div className="py-8 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col space-y-6">
                {/* Page Header */}
                <header className="flex flex-col space-y-3 text-center sm:text-left">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Match Schedule
                  </h1>
                  <p className="max-w-3xl text-lg text-foreground-muted ">
                    View upcoming matches and past results for the Seawolves Rugby team
                  </p>
                </header>

                {/* Page Content */}
                <div className="mt-4" >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
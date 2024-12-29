// app/tickets/layout.tsx
import { getNewsPosts } from '@/actions';
import NewsSidebar from '@/components/ArticleSideBar';

export default async function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const newsData = await getNewsPosts();

  return (
    <div className="min-h-screen my-40 ">
      <div className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-3">
            {children}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <NewsSidebar posts={newsData} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
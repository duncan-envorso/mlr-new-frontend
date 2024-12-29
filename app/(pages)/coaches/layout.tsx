import { getNewsPosts } from '@/actions';
import NewsSidebar from '@/components/ArticleSideBar';

export default async function TeamLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const newsData = await getNewsPosts();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto mt-20 flex-grow p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
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
      </main>
    </div>
  );
}
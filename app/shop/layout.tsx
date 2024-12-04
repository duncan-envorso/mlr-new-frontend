import { ProductProvider } from "@/components/product/product-context"

export default function ShopLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="pt-20 px-4 md:px-6 lg:px-8  mx-auto">
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav className="mb-6">
          {/* Add your navigation content here */}
        </nav>
        <main>
          <ProductProvider>
          {children}
          </ProductProvider>
        </main>
      </section>
    )
  }
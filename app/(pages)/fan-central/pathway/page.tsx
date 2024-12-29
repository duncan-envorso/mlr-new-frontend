// app/pathway/page.tsx
import Image from 'next/image';
import { PathwayContent } from './_components/PathwayContent';

export default function PathwayPage() {
  return (
    <div className="min-h-screen ">
      {/* Hero Image */}
      <div className="relative h-[70vh] mb-8">
        <Image
          src="/images/pathway/PathWayMain.jpeg"
          alt="Rugby Pathway Overview"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="">
        <PathwayContent />
      </div>
    </div>
  );
}
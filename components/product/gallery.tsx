'use client';

import { useProduct, useUpdateURL } from 'components/product/product-context';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    'absolute top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110';

  return (
    <div className="relative">
      <div className="aspect-square overflow-hidden rounded-3xl bg-gray-100">
        <AnimatePresence initial={false}>
          <motion.div
            key={imageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Image
              className="h-full w-full object-cover"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt={images[imageIndex]?.altText as string}
              src={images[imageIndex]?.src as string}
              priority={true}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={() => {
                const newState = updateImage(previousImageIndex.toString());
                updateURL(newState);
              }}
              aria-label="Previous product image"
              className={`${buttonClassName} left-4`}
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={() => {
                const newState = updateImage(nextImageIndex.toString());
                updateURL(newState);
              }}
              aria-label="Next product image"
              className={`${buttonClassName} right-4`}
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </>
        )}
      </div>

      {/* Gallery thumbnails */}
      <div className="mt-4 flex justify-center space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => {
              const newState = updateImage(index.toString());
              updateURL(newState);
            }}
            aria-label={`View product image ${index + 1}`}
            className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
              index === imageIndex ? 'ring-2 ring-black' : ''
            }`}
          >
            <Image
              src={image.src}
              alt={image.altText}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="mt-4 flex justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newState = updateImage(index.toString());
              updateURL(newState);
            }}
            aria-label={`View product image ${index + 1}`}
            className={`mx-1 h-2 w-2 rounded-full transition-all duration-200 ${
              index === imageIndex ? 'bg-gray-800 scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
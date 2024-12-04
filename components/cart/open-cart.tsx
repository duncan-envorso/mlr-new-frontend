import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-12 w-12 md:h-12 md:w-12 items-center justify-center rounded-full border border-neutral-200 text-black transition-colors bg-accent hover:bg-accent/90   dark:border-neutral-700 dark:text-white">
      <ShoppingCartIcon
        className={clsx('h-6 md:h-4 transition-all ease-in-out animate-bounce hover:scale-150 text-primary', className)} 
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}

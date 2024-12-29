'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { motion } from 'framer-motion';
import { ProductOption, ProductVariant } from 'lib/shopify/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();

  if (!options.length || (options.length === 1 && options[0]?.values.length === 1)) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id} className="mb-4">
          <h3 className="text-sm font-industry-demi text-navy mb-2">
            {option.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const optionNameLowerCase = option.name.toLowerCase();
              const optionParams = { ...state, [optionNameLowerCase]: value };
              const filtered = Object.entries(optionParams).filter(([key, value]) =>
                options.find(
                  (option) => option.name.toLowerCase() === key && option.values.includes(value)
                )
              );
              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, value]) => combination[key] === value && combination.availableForSale
                )
              );
              const isActive = state[optionNameLowerCase] === value;

              return (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const newState = updateOption(optionNameLowerCase, value);
                    updateURL(newState);
                  }}
                  key={value}
                  disabled={!isAvailableForSale}
                  title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                  className={clsx(
                    'px-3 py-2 text-sm font-industry-book rounded-lg transition-all duration-200',
                    {
                      'bg-green text-navy font-industry-demi': isActive,
                      'bg-navy/10 text-navy hover:bg-navy/20': !isActive && isAvailableForSale,
                      'bg-navy/5 text-navy/40 cursor-not-allowed': !isAvailableForSale
                    }
                  )}
                >
                  {value}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
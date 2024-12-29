import { cn } from "@/lib/utils";
import React from 'react';

interface PriceProps {
  amount: string | number;
  currencyCode?: string;
  className?: string;
  currencyCodeClassName?: string;
  as?: React.ElementType;
  locale?: string;
}

const Price: React.FC<PriceProps> = ({
  amount,
  currencyCode = 'USD',
  className,
  currencyCodeClassName,
  as: Component = 'span',
  locale = 'en-US'
}) => {
  const formattedAmount = React.useMemo(() => {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericAmount);
  }, [amount, currencyCode, locale]);

  return (
    <Component className={cn("inline-flex items-center font-industry-ultra", className)}>
      <span 
        aria-label={`Price: ${formattedAmount}`}
        className="text-navy"
      >
        {formattedAmount}
      </span>
      {/* Optional currency code display
      <span className={cn("ml-1 text-sm font-industry-book text-navy/60", currencyCodeClassName)}>
        {currencyCode}
      </span> 
      */}
    </Component>
  );
};

export default Price;
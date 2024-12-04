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
    <Component className={cn("inline-flex items-center", className)}>
      <span aria-label={`Price: ${formattedAmount}`}>
        {formattedAmount}
      </span>
      {/* <span className={cn("ml-1 text-sm", currencyCodeClassName)}>
        {currencyCode}
      </span> */}
    </Component>
  );
};

export default Price;
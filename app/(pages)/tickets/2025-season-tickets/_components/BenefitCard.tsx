// components/tickets/BenefitCard.tsx
interface BenefitCardProps {
    title: string;
    description: string;
  }
  
  export function BenefitCard({ title, description }: BenefitCardProps) {
    return (
      <div className="bg-navy/10 p-6 rounded-lg transition-all duration-300">
        <h5 className="font-industry-ultra uppercase text-lg mb-2 text-navy">{title}</h5>
        <p className="font-industry-book text-navy/80">{description}</p>
      </div>
    );
  }
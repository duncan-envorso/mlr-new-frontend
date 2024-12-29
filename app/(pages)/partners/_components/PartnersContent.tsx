// app/partners/_components/PartnersContent.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { sections } from './data';

export function PartnersContent() {
  return (
    <div>
     
      {sections.map((section, index) => (
        <div key={index} className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-2">
            {section.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {section.partners.map((partner, partnerIndex) => (
              <Card 
                key={partnerIndex} 
                className="hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <CardContent className="p-6">
                  <a 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="h-40 flex items-center justify-center mb-6 bg-white rounded-lg">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-h-32 w-auto object-contain"
                      />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {partner.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-4">
                      {partner.description}
                    </p>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-16">
        <a 
          href="https://www.majorleague.rugby/sponsors/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-secondary text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary/20 transition-colors duration-300"
        >
          View League Partners
        </a>
      </div>
    </div>
  );
}
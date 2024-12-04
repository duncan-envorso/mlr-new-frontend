// MockHeroEditor.tsx
'use client';


import { mockHeroData } from '@/mockdata';
import { useState } from 'react';
import { HeroEditor } from './HeroEditor';

export default function MockHeroEditor() {
  const [heroData, setHeroData] = useState(mockHeroData);

  const handleSave = async (updatedData: typeof mockHeroData) => {
    console.log('Saved Data:', updatedData); // Replace with actual save logic if needed
    setHeroData(updatedData); // Update the state with new data
  };

  return (
    <div className="p-6">
      <HeroEditor
        initialData={mockHeroData}
        onSave={handleSave}
        onClose={() => console.log('Editor closed')} // Optional
      />
    </div>
  );
}

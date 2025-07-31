'use client';
import dynamic from 'next/dynamic';
import HeroExample from '@/components/homePageComponents/HeroExample';

import StackedProjects from '@/components/homePageComponents/StackedProjects';

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-blue-950">
 
      <HeroExample />
      
      <StackedProjects />
    </div>
  );
}

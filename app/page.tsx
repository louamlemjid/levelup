'use client';
import dynamic from 'next/dynamic';
import HeroExample from '@/components/homePageComponents/HeroExample';

import StackedProjects from '@/components/homePageComponents/StackedProjects';

export default function Home() {
  return (
    <>
      <HeroExample />
      
      <StackedProjects />
    </>
  );
}

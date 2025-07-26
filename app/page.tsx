'use client';
import dynamic from 'next/dynamic';
import EllipticalLoopLine from '@/components/svgComponent';
import HeroExample from '@/components/homePageComponents/HeroExample';


export default function Home() {
  return (
    <>
      <HeroExample />
     <EllipticalLoopLine />
    </>
  );
}
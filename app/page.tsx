'use client';
import dynamic from 'next/dynamic';
import EllipticalLoopLine from '@/components/svgComponent';
import HeroExample from '@/components/homePageComponents/HeroExample';
import Websites from '@/components/websites';
const Robot3DModel = dynamic(() => import('@/components/homePageComponents/window3dModel'), {
  ssr: false,
  
});

export default function Home() {
  return (
    <>
      <HeroExample />
      <Robot3DModel />
      <Websites />
     <EllipticalLoopLine />
    </>
  );
}
'use client'
import dynamic from 'next/dynamic';
const Capoo3dModel = dynamic(() => import('@/components/homePageComponents/capoo3dModel'), {
  ssr: false,
});

export default function Test() {
  return (
    <>
      <Capoo3dModel />
    </>
  );
}

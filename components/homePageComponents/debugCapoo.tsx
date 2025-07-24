'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Simple debug model component
const DebugCapoo = () => {
  const group = useRef<THREE.Group>(null!);
  
  try {
    const { scene } = useGLTF('/capoo/scene.gltf');
    
    useFrame(({ clock }) => {
      if (group.current) {
        const t = clock.getElapsedTime();
        group.current.rotation.y = t * 0.5;
      }
    });

    console.log('Debug: GLTF loaded, scene:', scene);
    
    return (
      <group ref={group}>
        <primitive object={scene} scale={0.8} position={[0, -1, 0]} />
      </group>
    );
  } catch (error) {
    console.error('Debug: Failed to load GLTF:', error);
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }
};

// Simple debug version of the 3D component
const DebugCapoo3D = () => {
  return (
    <div className="w-full h-full bg-gray-900 border-2 border-blue-500">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 3, 5]} intensity={0.5} color="blue" />
        
        <Suspense fallback={
          <mesh>
            <sphereGeometry args={[0.5]} />
            <meshStandardMaterial color="yellow" />
          </mesh>
        }>
          <DebugCapoo />
        </Suspense>
        
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default DebugCapoo3D;

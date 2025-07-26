// Robot3DModel.tsx
'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const Laptop3dModel = () => {
  const group = useRef<THREE.Group>(null!);
  const [isLoaded, setIsLoaded] = useState(false);
  
  try {
    const gltf = useGLTF('/laptop/source/laptop.glb');
    const scene = gltf.scene;
    const animations = gltf.animations;
    
    // Clone the scene to avoid conflicts
    const clonedScene = scene.clone();
    
    const { actions } = useAnimations(animations, group);

    // Add floating animation
    useFrame(({ clock }) => {
      if (group.current && isLoaded) {
        const t = clock.getElapsedTime();
        group.current.position.y = Math.sin(t * 1.5) * 0.15;
      }
    });

    useEffect(() => {
      if (clonedScene) {
        // Ensure all materials are visible
        clonedScene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.needsUpdate = true;
            }
          }
        });
        
        setIsLoaded(true);
        console.log('Capoo model loaded and configured');
        
        // Play animations if available
        if (actions) {
          Object.values(actions).forEach((action) => {
            if (action && typeof action.play === 'function') {
              action.play();
            }
          });
        }
      }
    }, [clonedScene, actions]);

    if (!isLoaded || !clonedScene) {
      return <LoadingModel />;
    }

    return (
      <group ref={group}>
        <primitive 
          object={clonedScene} 
          scale={[0.2, 0.2, 0.2]}
          position={[-0.2, -0.2, 0]}
          rotation={[0.3, -0.9, 0.05]}
        />
      </group>
    );
  } catch (error) {
    console.error('Error loading Capoo model:', error);
    return <LoadingModel />;
  }
};

// Loading component for the 3D model
const LoadingModel = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial 
        color="#4A90E2" 
        emissive="#1E40AF"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const Robot3DModel = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ 
          position: [0, 0, 3], 
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        onCreated={({ gl, camera }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          camera.lookAt(0, 0, 0);
        }}
      >
        {/* Better lighting setup */}
        <ambientLight color="#ffffff" intensity={1} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          color="white"
          castShadow
        />
        <pointLight 
          position={[-5, 3, 5]} 
          intensity={1} 
          color="#22D3EE" 
        />
        <spotLight 
          color="#ffffff" 
          position={[0, 5, 0]} 
          intensity={0.8} 
          angle={0.5} 
          penumbra={1}
          castShadow
        />
        
        <Suspense fallback={<LoadingModel />}>
          <Laptop3dModel />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false} 
           
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

// Preload the GLTF model
useGLTF.preload('/laptop/source/laptop.glb');

export default Robot3DModel;

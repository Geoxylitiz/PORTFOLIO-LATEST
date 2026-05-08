import React, { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DataSea = () => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef(new THREE.Vector2(0, 0));
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotation.current.set(x, y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const geo1Ref = useRef<THREE.PlaneGeometry>(null);
  const geo2Ref = useRef<THREE.PlaneGeometry>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // The sea tilts slightly with mouse
      groupRef.current.rotation.z += (targetRotation.current.x * 0.2 - groupRef.current.rotation.z) * 0.05;
      // Base rotation is laying down flat-ish (Math.PI / 3), tweaked by Y mouse
      groupRef.current.rotation.x += (-Math.PI / 3 - targetRotation.current.y * 0.15 - groupRef.current.rotation.x) * 0.05;
    }

    const t = state.clock.elapsedTime * 0.6;
    [geo1Ref, geo2Ref].forEach((ref, idx) => {
      if (ref.current) {
        const positions = ref.current.attributes.position;
        const depth = idx === 0 ? 1 : 1.8;
        const phase = idx === 0 ? 0 : Math.PI;

        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          
          // Generate a topographical wave
          const z = Math.sin(x * 0.2 + t) * Math.cos(y * 0.2 + t * 0.8 + phase) * 2.5 * depth;
          positions.setZ(i, z);
        }
        positions.needsUpdate = true;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Primary stark black wireframe sea */}
      <mesh position={[0, 0, 1]}>
        <planeGeometry ref={geo1Ref} args={[50, 50, 40, 40]} />
        <meshBasicMaterial color="#0A0A0A" wireframe={true} />
      </mesh>
      
      {/* Secondary accent colored deeper wave */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry ref={geo2Ref} args={[50, 50, 20, 20]} />
        <meshBasicMaterial color="#FF4D00" wireframe={true} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

export const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 z-0 bg-grid-pattern pointer-events-none opacity-80" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 5, 20], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        <DataSea />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;

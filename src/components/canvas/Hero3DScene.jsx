import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random';

function StarField() {
  const ref = useRef();
  
  // Generate 5000 random points in a sphere with radius 1.5
  // maath/random expects Float32Array
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00D9FF"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function NeuralNodes() {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.08;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.15;
    }
  });

  // 12 nodes at defined positions, connected by LineSegments
  const nodePositions = [
    [0, 0, 0], [1.2, 0.8, -0.5], [-1.1, 0.6, 0.3],
    [0.5, -1.0, 0.8], [-0.8, -0.9, -0.4], [1.5, -0.3, 0.2],
    [-0.3, 1.4, 0.6], [0.9, 0.3, -1.2], [-1.3, 0.1, -0.8],
    [0.2, -0.5, 1.3], [-0.6, -1.3, 0.7], [1.1, 1.1, 0.4],
  ];

  return (
    <group ref={meshRef}>
      {nodePositions.map((pos, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh position={pos}>
            <sphereGeometry args={[0.04 + (i % 3) * 0.015, 16, 16]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#00D9FF' : i % 3 === 1 ? '#7B2FFF' : '#00FF9D'}
              emissive={i % 3 === 0 ? '#00D9FF' : i % 3 === 1 ? '#7B2FFF' : '#00FF9D'}
              emissiveIntensity={0.6}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fof: 60 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 2, 2]} intensity={1} color="#00D9FF" />
      <pointLight position={[-2, -2, -2]} intensity={0.5} color="#7B2FFF" />
      <Suspense fallback={null}>
        <StarField />
        <NeuralNodes />
      </Suspense>
    </Canvas>
  );
}

export default Hero3DScene;

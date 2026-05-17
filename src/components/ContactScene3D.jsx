import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function RotatingTorusKnot() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* <torusKnotGeometry args={[4.5, 1.2, 120, 16, 2, 3]} /> */}
      <torusKnotGeometry args={[8, 2.5, 120, 16]} />
      <meshStandardMaterial
        color="#00D9FF"
        wireframe={true}
        emissive="#7B2FFF"
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

export function ContactScene3D() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px]">
      <Canvas camera={{ position: [0, 0, 24] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[15, 15, 15]} intensity={2} color="#00D9FF" />
        <pointLight position={[-15, -15, -15]} intensity={1.5} color="#7B2FFF" />
        <RotatingTorusKnot />
        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
export default ContactScene3D;

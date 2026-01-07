import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

const NeuralSphere = (props) => {
  const ref = useRef();

  // Generate 5000 points on a sphere surface for a dense "Core" look
  const sphere = useMemo(() => {
    return random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 });
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotation
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;

      // "Breathing" / Pulsing effect could be added here by scaling
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time) * 0.05;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#915eff" // Electric Indigo
          size={0.005} // Smaller, denser points
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// A second layer of particles for "Orbiting Data"
const OrbitingData = () => {
  const ref = useRef();
  const sphere = useMemo(
    () =>
      random.inSphere(new Float32Array(1000 * 3), {
        radius: 2.5,
        minRadius: 1.5,
      }),
    []
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 15;
      ref.current.rotation.y += delta / 15;
    }
  });

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00b4d8" // Cyber Blue Secondary
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const AbstractCanvas = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <group scale={[1.8, 1.8, 1.8]}>
          {" "}
          {/* Scale up to fill screen */}
          <NeuralSphere />
          <OrbitingData />
        </group>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default AbstractCanvas;

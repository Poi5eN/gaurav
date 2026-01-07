import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";

const NetworkModel = ({ learningRate, complexity, noise }) => {
  const ref = useRef();

  // Dynamic complexity (Point count)
  // Note: changing buffer size is expensive, so we just hide points by setting size to 0 or transparency in a shader
  // For simplicity here, we'll generate max points and use scale to simulate "complexity"
  const maxPoints = 2000;
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(maxPoints * 3), { radius: 1.5 }),
    []
  );

  useFrame((state, delta) => {
    if (ref.current) {
      // Learning Rate -> Rotation Speed
      ref.current.rotation.x -= delta * (learningRate / 2);
      ref.current.rotation.y -= delta * (learningRate / 3);

      // Noise -> Jitter (simulated by scaling pulsing)
      const time = state.clock.getElapsedTime();
      const jitter = Math.sin(time * 10) * (noise * 0.05);
      const breathe = Math.sin(time * 2) * 0.1;
      const scale = 1 + breathe + jitter;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#915eff"
          size={0.02 * (complexity / 5)} // Complexity -> Point Size (mocking density)
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const NeuralSandbox = () => {
  // Hyperparameters
  const [learningRate, setLearningRate] = useState(0.5); // 0.1 - 2.0
  const [complexity, setComplexity] = useState(5); // 1 - 10
  const [noise, setNoise] = useState(0.1); // 0 - 1.0

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0 bg-transparent rounded-2xl overflow-hidden border border-white/5 bg-black/20 backdrop-blur-sm">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <NetworkModel
            learningRate={learningRate}
            complexity={complexity}
            noise={noise}
          />
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Control Panel Overlay */}
      <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-1">
          <h3 className="text-white font-bold font-mono text-sm">
            HYPERPARAMETERS
          </h3>
          <span className="text-[10px] text-accent animate-pulse">
            ● TRAINING
          </span>
        </div>

        {/* Learning Rate Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[10px] text-gray-400 font-mono">
            <span>LEARNING_RATE</span>
            <span>{learningRate.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        {/* Complexity Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[10px] text-gray-400 font-mono">
            <span>MODEL_COMPLEXITY</span>
            <span>{complexity}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={complexity}
            onChange={(e) => setComplexity(parseFloat(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        {/* Noise Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[10px] text-gray-400 font-mono">
            <span>NOISE_FACTOR</span>
            <span>{noise.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={noise}
            onChange={(e) => setNoise(parseFloat(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#ff0055]"
          />
        </div>
      </div>
    </div>
  );
};

export default NeuralSandbox;

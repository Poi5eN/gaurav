import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import * as random from "maath/random/dist/maath-random.esm";

// --- Background Components (Merged from Abstract.jsx) ---

const NeuralSphere = (props) => {
  const ref = useRef();
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 }),
    []
  );
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
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
          color="#915eff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

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
          color="#00b4d8"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// --- Foreground Component (The Architect Model) ---

const ArchitectPoints = ({ mode }) => {
  const ref = useRef();
  const count = 3000;
  const [positions, setPositions] = useState(new Float32Array(count * 3));

  const generateShape = (type) => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let x, y, z;
      if (type === "chaos") {
        x = (Math.random() - 0.5) * 6;
        y = (Math.random() - 0.5) * 6;
        z = (Math.random() - 0.5) * 6;
      } else if (type === "grid") {
        const step = 0.5;
        const dim = Math.cbrt(count);
        const ix = i % dim;
        const iy = Math.floor(i / dim) % dim;
        const iz = Math.floor(i / (dim * dim));
        x = (ix - dim / 2) * step;
        y = (iy - dim / 2) * step;
        z = (iz - dim / 2) * step;
      } else if (type === "helix") {
        const t = i * 0.1;
        x = Math.cos(t) * 1.5;
        z = Math.sin(t) * 1.5;
        y = i * 0.005 - 3;
      }
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    // Validation to prevent NaNs
    for (let i = 0; i < count * 3; i++) {
      if (isNaN(arr[i])) arr[i] = 0;
    }
    return arr;
  };

  const shapes = useMemo(
    () => ({
      chaos: generateShape("chaos"),
      grid: generateShape("grid"),
      helix: generateShape("helix"),
    }),
    []
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1;
      const currentPos = ref.current.geometry.attributes.position.array;
      const targetPos = shapes[mode];
      for (let i = 0; i < count * 3; i++) {
        currentPos[i] += (targetPos[i] - currentPos[i]) * 0.05;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#915eff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// --- EXPORT 1: The Unified Canvas ---

const ArchitectCanvas = ({ mode }) => {
  return (
    <div className="w-full h-full absolute inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={0.5} />
        {/* Background Layer */}
        <group scale={[1.8, 1.8, 1.8]} position={[0, 0, -2]}>
          <NeuralSphere />
          <OrbitingData />
        </group>

        {/* Foreground Layer - Positioned to the Right for Desktop */}
        <group position={[2, 0, 0]}>
          {" "}
          {/* Shifted right to match grid column */}
          <ArchitectPoints mode={mode} />
        </group>
        <Preload all />
      </Canvas>
    </div>
  );
};

// --- EXPORT 2: The UI Controls ---

const ArchitectUI = ({ mode, setMode }) => {
  // Internal state for text feedback
  const [title, setTitle] = useState("IDLE_STATE");
  const [desc, setDesc] = useState("Waiting for input...");

  // Sync text with mode
  useEffect(() => {
    if (mode === "chaos") {
      setTitle("GENERATIVE_SYNTHESIS");
      setDesc("Creating unique patterns from noise...");
    }
    if (mode === "grid") {
      setTitle("LOGIC_OPTIMIZATION");
      setDesc("Structuring unstructured data...");
    }
    if (mode === "helix") {
      setTitle("EVOLUTIONARY_ALGO");
      setDesc("Simulating genetic adaptation...");
    }
  }, [mode]);

  const modes = [
    { id: "chaos", label: "GENERATE", icon: "✨" },
    { id: "grid", label: "OPTIMIZE", icon: "📐" },
    { id: "helix", label: "EVOLVE", icon: "🧬" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-end pb-10">
      {/* Interface Overlay */}
      <div className="p-6 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex flex-col gap-4">
        {/* Status Display */}
        <div className="flex justify-between items-end border-b border-white/20 pb-2">
          <div>
            <h3 className="text-white font-bold font-mono text-lg tracking-wider transition-all">
              {title}
            </h3>
            <p className="text-accent font-mono text-xs">&gt; {desc}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 font-mono">
              SYS_LOAD
            </span>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-1 h-3 ${
                    Math.random() > 0.5 ? "bg-accent" : "bg-gray-800"
                  } rounded-sm`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Command Buttons */}
        <div className="flex gap-2 justify-center">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 py-3 px-2 rounded-lg border border-white/10 backdrop-blur-md transition-all duration-300 flex flex-col items-center gap-1 group
                        ${
                          mode === m.id
                            ? "bg-accent/20 border-accent"
                            : "bg-black/40 hover:bg-white/5 hover:border-white/30"
                        }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {m.icon}
              </span>
              <span
                className={`text-[10px] font-mono font-bold ${
                  mode === m.id ? "text-accent" : "text-gray-400"
                }`}
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ArchitectCanvas, ArchitectUI };
export default ArchitectCanvas;

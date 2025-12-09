import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

import { Html } from "@react-three/drei";

const Computers = ({ isMobile, onOpenTerminal }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
      <Html
        position={isMobile ? [0, 0, -1] : [0, 0, -1]}
        transform
        occlude
        distanceFactor={6}
      >
        <div
          onClick={onOpenTerminal}
          className="group cursor-pointer flex items-center justify-center transition-transform active:scale-95"
        >
          {/* Minimalist Glowing Dot / Icon */}
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-[#00ff88]/30 flex items-center justify-center group-hover:w-36 group-hover:bg-black/80 transition-all duration-500 overflow-hidden shadow-[0_0_10px_rgba(0,255,136,0.2)] hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]">
            <span className="text-[#00ff88] font-bold font-mono text-lg group-hover:hidden animate-pulse">
              &gt;
            </span>
            <span className="hidden group-hover:block text-[#00ff88] text-xs font-mono tracking-widest whitespace-nowrap px-2">
              OPEN TERMINAL
            </span>
          </div>
        </div>
      </Html>
    </mesh>
  );
};

const ComputersCanvas = ({ onOpenTerminal }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} onOpenTerminal={onOpenTerminal} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;

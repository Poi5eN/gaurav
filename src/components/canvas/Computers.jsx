import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

import { Html } from "@react-three/drei";

const Computers = ({ isMobile, onOpenTerminal, isTerminalOpen }) => {
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
      {!isTerminalOpen && (
        <Html
          position={isMobile ? [0, -0.5, -1] : [0, -0.5, -1]}
          center
          distanceFactor={6}
          style={{ pointerEvents: "auto" }}
        >
          <div
            onClick={onOpenTerminal}
            className="group cursor-pointer flex items-center justify-center transition-all duration-300 transform hover:scale-105"
          >
            {/* Enhanced Wide Button */}
            <div className="relative w-48 h-12 rounded-full border border-[#00ff88]/20 bg-black/20 backdrop-blur-[2px] flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(0,255,136,0.1)] group-hover:bg-black/80 group-hover:border-[#00ff88] group-hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] transition-all">
              <span className="text-[#00ff88] text-xl font-mono font-bold animate-pulse">
                &gt;_
              </span>
              <span className="text-[#00ff88] text-xs font-mono tracking-[0.2em] font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                TERMINAL
              </span>
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-[#00ff88]/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
};

const ComputersCanvas = ({ onOpenTerminal, isTerminalOpen }) => {
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
        <Computers
          isMobile={isMobile}
          onOpenTerminal={onOpenTerminal}
          isTerminalOpen={isTerminalOpen}
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;

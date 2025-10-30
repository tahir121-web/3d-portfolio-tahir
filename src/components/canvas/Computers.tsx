import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

const Computers: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
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
        position={isMobile ? [0, -3, -2.2] : [0, -4.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Get initial screen size
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Set mobile state based on more comprehensive criteria
    const isSmallScreen = window.innerWidth <= 768;
    const isLowPerformance = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Only show placeholder for very small screens or explicitly low-performance devices
    setIsMobile(isSmallScreen && (window.innerWidth <= 480 || isLowPerformance));

    // Add a listener for changes to the screen size
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
      // Update mobile state based on new screen size
      const isSmallScreen = window.innerWidth <= 768;
      const isLowPerformance = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Only show placeholder for very small screens or explicitly low-performance devices
      setIsMobile(isSmallScreen && (window.innerWidth <= 480 || isLowPerformance));
    };

    // Add the event listener
    window.addEventListener("resize", handleResize);

    // Remove the listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-center">
              <span className="text-white text-2xl sm:text-4xl font-bold">3D</span>
              <p className="text-white text-xs sm:text-sm mt-1 px-2">Model Loading...</p>
            </div>
          </div>
        </div>
      ) : (
        <Canvas
          frameloop="demand"
          shadows
          dpr={[1, 2]}
          camera={{ position: [20, 3, 5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
          className="w-full h-full"
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
            <Computers isMobile={screenSize.width <= 768} />
          </Suspense>
          <Preload all />
        </Canvas>
      )}
    </>
  );
};

export default ComputersCanvas;
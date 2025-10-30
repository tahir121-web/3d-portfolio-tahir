import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && 
                          /Mobile/.test(navigator.userAgent);
    
    // Only disable on very low-performance mobile devices
    setIsMobile(isMobileDevice && window.innerWidth <= 480);
  }, []);

  return isMobile ? (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
        <div className="text-center">
          <span className="text-white text-2xl sm:text-4xl font-bold">🌎</span>
          <p className="text-white text-xs sm:text-sm mt-2 px-2">3D Earth Model</p>
          <p className="text-white text-xs mt-1 px-2">Not supported on this device</p>
        </div>
      </div>
    </div>
  ) : (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
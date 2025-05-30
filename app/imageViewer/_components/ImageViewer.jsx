"use client"

import React, { useRef, useEffect, useState } from 'react'; // Added useState
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useViewer } from '@/app/context/ViewerContext';
import { EntitySpace } from './EntitySpace';
import ImagePlane from './ImagePlane'; // Assuming ImagePlane is in a separate file or defined above/below

// Default camera FOV, used for calculations
const CAMERA_FOV = 50;

export default function ImageViewer() {
  const { containerRef } = useViewer();
  const [actualPlaneHeight, setActualPlaneHeight] = useState(null);
  const [orbitControlsConfig, setOrbitControlsConfig] = useState({
    minDistance: 0.5, // Initial default minDistance
    maxDistance: 50,  // Initial default maxDistance
  });

  useEffect(() => {
    const fovRad = (CAMERA_FOV * Math.PI) / 180;
    const tanHalfFov = Math.tan(fovRad / 2);
    const DESIRED_MIN_VIEWPORT_FRACTION = 0.1; // Image should take at least 10% of viewport height when fully zoomed out
    const newMinDistance = 0.5; // How close the camera can get to the target

    let calculatedMaxDistance;

    if (actualPlaneHeight && actualPlaneHeight > 0) {
      // Calculate maxDistance so the planeHeight is at least DESIRED_MIN_VIEWPORT_FRACTION of the visible frustum height
      calculatedMaxDistance = actualPlaneHeight / (DESIRED_MIN_VIEWPORT_FRACTION * 2 * tanHalfFov);
    } else {
      // Default maxDistance if no image is sized (e.g., wider zoom allowed)
      calculatedMaxDistance = 50; // A sensible default if no image plane dimensions
    }

    setOrbitControlsConfig({
      minDistance: newMinDistance,
      // Ensure maxDistance is always greater than minDistance, and not excessively small or large
      maxDistance: Math.max(newMinDistance + 0.1, Math.min(calculatedMaxDistance, 1000)), // Cap maxDistance
    });
  }, [actualPlaneHeight]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        position: 'relative',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: CAMERA_FOV }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <ImagePlane onSized={setActualPlaneHeight} />
        <EntitySpace />

        <OrbitControls
          enableRotate={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={true}
          enablePan={true}
          minDistance={orbitControlsConfig.minDistance}
          maxDistance={orbitControlsConfig.maxDistance}
          // target={[0, 0, 0.01]} // Optionally target the plane's precise z for very exact zoom behavior
        />
      </Canvas>
    </div>
  );
}
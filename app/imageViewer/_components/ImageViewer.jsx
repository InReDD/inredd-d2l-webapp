"use client"

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useViewer } from '@/app/context/ViewerContext';
import { EntitySpace } from './EntitySpace';
import ImagePlane from './ImagePlane'; 
import { useControls, button, buttonGroup, folder } from 'leva';
const { DEG2RAD } = THREE.MathUtils;

// Default camera FOV and initial position
const CAMERA_FOV = 50;
const INITIAL_CAMERA_POSITION = [0, 0, 5];

// Leva Controls
function levaControls(cameraControlsRef, imagePlaneRef){
  useControls({
    "Camera Menu": folder({
      Actions: folder({
          fitToImage: button(() => {
            if (cameraControlsRef.current && imagePlaneRef.current) {
              cameraControlsRef.current.fitToBox(imagePlaneRef.current, true, {
                paddingTop: 0.1, paddingRight: 0.1, paddingBottom: 0.1, paddingLeft: 0.1
              });
            }
          }),
          resetView: button(() => {
            if (cameraControlsRef.current) {
              cameraControlsRef.current.reset(true); 
            }
          }),
      }, { collapsed: false }), 
      Settings: folder({
          enabled: { value: true, label: 'Controls Enabled' },
          dollyToCursor: { value: true, label: 'Dolly to Cursor' },
      }, { collapsed: true }),
    }, { collapsed: false }) 
  }, [cameraControlsRef, imagePlaneRef]); // Dependencies for leva
}

function handleCameraControls(planeDimensions, cameraControlsRef, imagePlaneRef, cameraControlsConfig, setCameraControlsConfig){
  const fovRad = (CAMERA_FOV * Math.PI) / 180;
    const tanHalfFov = Math.tan(fovRad / 2);
    const DESIRED_MIN_VIEWPORT_FRACTION = 0.1; 
    const newMinDistance = 0.1; 
    const PANNING_PADDING = 0.5; // How much extra space around the image for panning

    let calculatedMaxDistance = 100;
    let newBoundaryBox = cameraControlsConfig.boundaryBox; // Keep existing if no dimensions

    if (planeDimensions.height && planeDimensions.height > 0 && planeDimensions.width && planeDimensions.width > 0) {
      // Calculate Max Distance for Zoom
      calculatedMaxDistance = planeDimensions.height / (DESIRED_MIN_VIEWPORT_FRACTION * 2 * tanHalfFov);
      calculatedMaxDistance = Math.max(calculatedMaxDistance, newMinDistance + 0.1);

      // Calculate Panning Boundary
      const halfWidth = planeDimensions.width / 2;
      const halfHeight = planeDimensions.height / 2;
      newBoundaryBox = new THREE.Box3(
        new THREE.Vector3(-halfWidth - PANNING_PADDING, -halfHeight - PANNING_PADDING, -0.1),
        new THREE.Vector3(halfWidth + PANNING_PADDING, halfHeight + PANNING_PADDING, 0.1)
      );
      // The Z values for the boundary box should be minimal but non-zero to define a volume.
      // The camera target is what's restricted by this boundary.
    }

    setCameraControlsConfig({
      minDistance: newMinDistance,
      maxDistance: Math.min(calculatedMaxDistance, 1000), 
      boundaryBox: newBoundaryBox,
    });

    if (planeDimensions.height && planeDimensions.width && cameraControlsRef.current && imagePlaneRef.current) {
        setTimeout(() => {
            if (cameraControlsRef.current && imagePlaneRef.current) {
                 cameraControlsRef.current.fitToBox(imagePlaneRef.current, true, {
                    paddingTop: 0.1, paddingRight: 0.1, paddingBottom: 0.1, paddingLeft: 0.1
                });
            }
        }, 100);
    }
}

// Scene component with CameraControls
function Scene({}){
  const { containerRef } = useViewer();
  const [planeDimensions, setPlaneDimensions] = useState({ height: null, width: null });
  const [cameraControlsConfig, setCameraControlsConfig] = useState({
    minDistance: 0.1, 
    maxDistance: 100,  
    boundaryBox: new THREE.Box3(new THREE.Vector3(-1, -1, -0.1), new THREE.Vector3(1, 1, 0.1)), // Default small boundary
  });

  const cameraControlsRef = useRef(null);
  const imagePlaneRef = useRef(null); 

  const handleImageSized = (height, width) => {
    setPlaneDimensions({ height, width });
  };

  useEffect(() => {
    handleCameraControls(
      planeDimensions,
      cameraControlsRef, 
      imagePlaneRef, 
      cameraControlsConfig,
      setCameraControlsConfig)
    }, [planeDimensions]); 

  levaControls(cameraControlsRef, imagePlaneRef)

  return (
    <div
      ref={containerRef} 
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        backgroundColor: '#000', 
        overflow: 'hidden', 
      }}
    >
      <Canvas
        camera={{ position: INITIAL_CAMERA_POSITION, fov: CAMERA_FOV }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <ambientLight intensity={1.0} /> 
        <directionalLight position={[2, 5, 5]} intensity={1.5} /> 

        <ImagePlane ref={imagePlaneRef} onSized={handleImageSized} /> 
        
        <EntitySpace />

        <CameraControls
          ref={cameraControlsRef}
          enabled={levaControls.enabled} 
          dollyToCursor={levaControls.dollyToCursor} 
          
          minPolarAngle={Math.PI / 2} 
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={0} 
          maxAzimuthAngle={0}
          
          minDistance={cameraControlsConfig.minDistance}
          maxDistance={cameraControlsConfig.maxDistance}
          boundary={cameraControlsConfig.boundaryBox} // Apply the calculated boundary
          boundaryFriction={0.1} // Optional: adds a bit of "bounce" at the boundary
        />
      </Canvas>
    </div>
  );
}

// ErrorImage component
function ErrorImage({}){
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'}}>
      <p style={{ color: 'white', textAlign: 'center' }}>Error: Image not found or could not be loaded.</p>
    </div>
  );
}

export default function ImageViewer() {
  const { image } = useViewer(); 

  if (image){
    return <Scene />;
  } else {
    return <ErrorImage />;
  }
}
// ./_components/ImageViewer.js
"use client"

import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE
import { useViewer } from '@/app/context/ViewerContext'; // Adjust path if needed
import { EntitySpace } from './EntitySpace';

// ImagePlane component to display the image within the Three.js scene
function ImagePlane() {
  const { image, canvasState } = useViewer();
  const textureRef = useRef();
  const { gl } = useThree();

  useEffect(() => {
    if (image) {
      // Load the image as a texture
      const loader = new THREE.TextureLoader();
      loader.load(image, (texture) => {
        if (textureRef.current) { // Ensure ref is valid before accessing
          textureRef.current.map = texture;
          textureRef.current.needsUpdate = true;

          // Ensure aspect ratio is maintained
          // Adjust plane size based on image aspect ratio to fit within the view
          const aspectRatio = canvasState.imgWidth / canvasState.imgHeight;
          const maxDimension = 2; // Max dimension for the plane (e.g., 2 units in Three.js space)
          let planeWidth, planeHeight;

          if (aspectRatio > 1) { // Landscape image
            planeWidth = maxDimension;
            planeHeight = maxDimension / aspectRatio;
          } else { // Portrait or square image
            planeHeight = maxDimension;
            planeWidth = maxDimension * aspectRatio;
          }

          // Update geometry if textureRef.current.geometry exists and is a PlaneGeometry
          if (textureRef.current.geometry && textureRef.current.geometry.type === 'PlaneGeometry') {
            textureRef.current.geometry.dispose(); // Dispose old geometry
            textureRef.current.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
          } else {
            // If geometry doesn't exist or is not a PlaneGeometry, create a new one
            textureRef.current.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
          }

          gl.renderLists.dispose(); // Clear render lists to ensure proper re-render
        }
      },
      // Optional: onProgress callback
      undefined,
      // onError callback
      (err) => {
        console.error('An error occurred loading the texture:', err);
      });
    }
  }, [image, canvasState.imgWidth, canvasState.imgHeight, gl]);

  // Use a MeshStandardMaterial for better lighting interaction
  return (
    <mesh>
      {/* Initial geometry, will be updated when image loads */}
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial ref={textureRef} transparent />
    </mesh>
  );
}

export default function ImageViewer() {
  const { containerRef } = useViewer(); // Get containerRef from context

  return (
    <div
      ref={containerRef} // Attach the ref from context to the container div
      style={{
        width: '100%', // Added to fill parent width
        height: '100%', // Added to fill parent height
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Optional: subtle shadow
        position: 'relative', // Good practice for containers, ensures proper positioning of children like the canvas
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          width: '100%', // Canvas fills the containerRef div
          height: '100%',
          backgroundColor: '#000', // Ensure the canvas background is black
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Render the ImagePlane component which will display the loaded image */}
        <ImagePlane />
        <EntitySpace />

        {/* OrbitControls configured for 2D movement */}
        <OrbitControls
          enableRotate={false} // Disable 3D rotation
          minPolarAngle={Math.PI / 2} // Lock vertical rotation to 90 degrees (flat view)
          maxPolarAngle={Math.PI / 2} // Lock vertical rotation to 90 degrees (flat view)
          enableZoom={true} // Enable zooming
          enablePan={true} // Enable panning
        />
      </Canvas>
    </div>
  );
}
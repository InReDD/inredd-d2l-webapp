import * as THREE from "three";
import { useRef, useEffect } from "react"
import { useThree } from '@react-three/fiber';
import { useViewer } from '@/app/context/ViewerContext'; // Adjust path if needed

// ImagePlane component to display the image within the Three.js scene
export default function ImagePlane() {
  const { image, canvasState } = useViewer();
  const textureRef = useRef();
  const meshRef = useRef(); // Ref for the mesh
  const { gl, camera, size } = useThree(); // Get camera, canvas size, and WebGL renderer

  useEffect(() => {
    // Ensure all necessary data and refs are available
    // Also check for positive canvasState.imgHeight to prevent division by zero
    if (image && canvasState.imgWidth && canvasState.imgHeight > 0 && meshRef.current && size.width > 0 && size.height > 0) {
      const loader = new THREE.TextureLoader();
      loader.load(
        image,
        (texture) => { // onLoad callback
          // Ensure refs are still valid in this async callback
          if (textureRef.current && meshRef.current) {
            textureRef.current.map = texture;
            textureRef.current.needsUpdate = true;

            // Image aspect ratio from context (original image dimensions)
            const imageAspectRatio = canvasState.imgWidth / canvasState.imgHeight;

            // Z position of the plane (can be slightly offset to avoid z-fighting)
            const planeZ = meshRef.current.position.z;
            // Distance from camera to the plane
            const distance = camera.position.z - planeZ;

            // Prevent issues if camera is at or behind the plane's Z position
            if (distance <= 0) {
              // console.warn("Camera is at or behind the image plane. Scaling might be incorrect.");
              // Optionally hide the plane or set a default small size
              if (meshRef.current.geometry.type === 'PlaneGeometry') {
                meshRef.current.geometry.dispose();
                meshRef.current.geometry = new THREE.PlaneGeometry(0.01, 0.01); // Minimal size
              }
              return;
            }

            // Calculate visible dimensions of the camera frustum at the plane's distance
            const fovInRadians = (camera.fov * Math.PI) / 180;
            const visibleHeightAtDistance = 2 * Math.tan(fovInRadians / 2) * distance;
            const viewportAspectRatio = size.width / size.height; // Aspect ratio of the canvas itself
            const visibleWidthAtDistance = visibleHeightAtDistance * viewportAspectRatio;

            let planeWidth, planeHeight;

            // Determine plane size to "contain" the image within the visible frustum area
            if (imageAspectRatio > viewportAspectRatio) {
              // Image is wider (in aspect ratio) than the viewport; fit to viewport's calculated width
              planeWidth = visibleWidthAtDistance;
              planeHeight = planeWidth / imageAspectRatio;
            } else {
              // Image is taller or has the same aspect ratio as the viewport; fit to viewport's calculated height
              planeHeight = visibleHeightAtDistance;
              planeWidth = planeHeight * imageAspectRatio;
            }

            // Ensure calculated plane dimensions are positive
            if (planeWidth <= 0 || planeHeight <= 0) {
                // This case should ideally be caught by distance check, but as a safeguard:
                // console.warn("Calculated plane dimensions are zero or negative.");
                return; 
            }

            // Update plane geometry
            if (meshRef.current.geometry && meshRef.current.geometry.type === 'PlaneGeometry') {
              meshRef.current.geometry.dispose(); // Dispose old geometry to free GPU memory
              meshRef.current.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
            } else {
              // If no geometry or different type, create new
              meshRef.current.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
            }

            gl.renderLists.dispose(); // Recommended after geometry changes that might affect render state
          }
        },
        undefined, // onProgress callback
        (err) => { // onError callback
          console.error('An error occurred loading the texture:', err);
        }
      );
    }
  // Dependencies for the effect:
  // Re-run when image data, camera properties, or canvas size change.
  // `gl` is stable. `meshRef.current` changes are handled by React's lifecycle.
  // `camera` and `size` objects from `useThree` are reactive.
  }, [
    image,
    canvasState.imgWidth,
    canvasState.imgHeight,
    gl, // WebGL renderer context
    camera, // Camera object (includes fov, position)
    size // Canvas size object (includes width, height)
  ]);

  return (
    <mesh ref={meshRef} position={[0, 0, 0.01]}> {/* Slight Z offset to avoid z-fighting if other objects are at z=0 */}
      {/* Initial geometry is minimal, as useEffect will resize it. */}
      <planeGeometry args={[0.1, 0.1]} />
      <meshStandardMaterial ref={textureRef} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}
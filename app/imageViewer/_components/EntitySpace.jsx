import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // For camera controls

// --- Mock useViewer hook ---
// In your actual application, this would be your implemented hook.
const useViewer = () => {
  const [instances, setInstances] = useState([]);
  const [response, setResponse] = useState({}); // Simulates data fetched from an API or source
  const [canvasState, setCanvasState] = useState({
    zoom: 1,
    // ... other canvas-related states
  });

  // Simulate fetching or updating response data
  useEffect(() => {
    // Initial data load
    const initialData = {
      geometricShapes: [
        { type: 'cube', position: [-2, 0, 0], color: 'royalblue', size: [1, 1, 1] },
        { type: 'sphere', position: [2, 0, 0], color: 'firebrick', size: [0.8, 32, 32] },
      ],
    };
    setTimeout(() => setResponse(initialData), 1000); // Simulate API delay

    // Simulate an update or new data
    const updatedData = {
      geometricShapes: [
        { type: 'cube', position: [-2, 0, 0], color: 'royalblue', size: [1, 1, 1] },
        { type: 'sphere', position: [2, 0, 0], color: 'firebrick', size: [0.8, 32, 32] },
        { type: 'cone', position: [0, 2, 0], color: 'forestgreen', size: [0.7, 1.5, 32] }, // New cone
      ],
      pointCloud: [ // A new key in the response
        { color: 'yellow', count: 100, spread: 5 }
      ]
    };
    setTimeout(() => setResponse(updatedData), 5000); // Simulate update after 5 seconds

  }, []);

  return { instances, setInstances, response, canvasState, setCanvasState };
};

// --- Mock mapModels ---
// This object maps keys from your `response` data to functions
// that generate renderable 3D instances.
const mapModels = {
  geometricShapes: (data, canvasState, idStartIndex) => {
    if (!Array.isArray(data)) return [];
    return data.map((shape, index) => {
      let geometry;
      switch (shape.type) {
        case 'cube':
          geometry = <boxGeometry args={shape.size || [1, 1, 1]} />;
          break;
        case 'sphere':
          geometry = <sphereGeometry args={shape.size || [1, 32, 32]} />;
          break;
        case 'cone':
          geometry = <coneGeometry args={shape.size || [1, 2, 32]} />;
          break;
        default:
          geometry = <boxGeometry args={[0.5, 0.5, 0.5]} />; // Fallback
      }

      return {
        id: `shape-${idStartIndex + index}`,
        component: (
          <mesh position={shape.position || [0, 0, 0]}>
            {geometry}
            <meshStandardMaterial color={shape.color || 'gray'} />
          </mesh>
        ),
        configs: {
          visible: true,
          type: shape.type,
          originalData: shape, // Store original data if needed
        },
      };
    });
  },
  pointCloud: (data, canvasState, idStartIndex) => {
    if (!Array.isArray(data)) return [];
    return data.map((cloud, index) => {
        const points = useMemo(() => {
            const p = new Array(cloud.count).fill(0).map((v) => [(Math.random() - 0.5) * cloud.spread, (Math.random() - 0.5) * cloud.spread, (Math.random() - 0.5) * cloud.spread]);
            return p;
        }, [cloud.count, cloud.spread]);

        return {
            id: `cloud-${idStartIndex + index}`,
            // Primitive for more complex/direct three.js object usage
            component: (
                <points>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={points.length}
                            array={new Float32Array(points.flat())}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial size={0.1} color={cloud.color || 'white'} />
                </points>
            ),
            configs: {
                visible: true,
                type: 'pointCloud',
                originalData: cloud,
            }
        };
    });
  }
};

export function EntitySpace() { // Changed to named export for clarity in this example file
  const { setInstances, response, instances, canvasState } = useViewer();

  useEffect(() => {
    let newInstances = [];
    let idGenerator = 0; // Base for ID generation for instances from this response processing pass

    // console.log("Processing response:", response); // For debugging

    if (!response || Object.keys(response).length === 0) {
      // If response is empty, clear existing instances if they are not already empty
      if (instances.length > 0) {
        setInstances([]);
      }
      return;
    }

    Object.entries(response).forEach(([resultKey, dataFromResponse]) => {
      const handler = mapModels[resultKey];
      if (!handler) {
        // console.warn(`No handler found for resultKey: ${resultKey}`);
        return; // Skip if no handler is defined for this data key
      }

      try {
        // Call the model-specific handler to get an array of instances
        const resultInstances = handler(dataFromResponse, canvasState, idGenerator);

        if (Array.isArray(resultInstances)) {
          // Ensure IDs are unique across all generated instances in this pass
          resultInstances.forEach(instance => {
            // If the handler didn't assign an ID or to ensure uniqueness based on idGenerator
            if(instance.id === undefined || typeof instance.id === 'number') {
                 // console.warn("Handler for", resultKey, "produced instance without string ID or with numeric ID. Overwriting for safety:", instance);
                 // Simple overwrite for now, but handlers should ideally return string IDs starting with idGenerator for uniqueness.
            }
          });
          idGenerator += resultInstances.length; // Increment for next handler's unique ID base
          newInstances = [...newInstances, ...resultInstances];
        } else {
          console.error(`Handler for ${resultKey} did not return a valid array. Received:`, resultInstances);
        }
      } catch (error) {
        console.error(`Error in handler for ${resultKey}:`, error);
      }
    });

    // console.log("Generated new instances:", newInstances); // For debugging

    // Only call setInstances if the generated instances have actually changed.
    // This is a simple stringify comparison; for complex objects or performance-critical apps,
    // a more sophisticated deep comparison or immutable data structures might be better.
    if (JSON.stringify(instances) !== JSON.stringify(newInstances)) {
      setInstances(newInstances);
    }
  }, [canvasState, response, instances, setInstances]); // Added 'instances' for comparison, 'setInstances' is stable

  // console.log("Rendering instances:", instances); // For debugging

  if (!instances || instances.length === 0) {
    return null; // Nothing to render
  }

  return (
    <>
      {instances.map((instance, idx) => {
        // Validate the basic structure of an instance
        if (!instance || typeof instance !== 'object' || instance === null) {
          console.error("Invalid instance: not an object or null at index", idx, instance);
          return null;
        }

        const { id, component, configs } = instance;

        // Validate essential properties
        if (typeof id === 'undefined' || id === null) {
          console.error("Invalid instance: 'id' is missing at index", idx, instance);
          return null; // `key` is crucial for React's list rendering
        }
        if (!component) {
          console.error("Invalid instance: 'component' is missing for id", id, instance);
          return null;
        }
        if (!configs || typeof configs.visible !== 'boolean') {
          console.error("Invalid instance: 'configs' is missing or 'configs.visible' is not a boolean for id", id, instance);
          // Default to not rendering if configs are malformed, or handle as needed
          return null;
        }

        // Only render the component if it's marked as visible
        return configs.visible ? (
          <React.Fragment key={id}>
            {component}
          </React.Fragment>
        ) : null;
      })}
    </>
  );
}

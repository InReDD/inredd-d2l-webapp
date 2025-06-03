import React, { useState, useEffect, useMemo } from 'react';
import { useViewer } from '@/app/context/ViewerContext';
import mapModels from "./models/mapModels"

export function EntitySpace() {
  const { setInstances, response, instances, canvasState } = useViewer();

  useEffect(() => {
    let newInstances = [];
    let idGenerator = 0; 

    if (!response || Object.keys(response).length === 0) {
      if (instances.length > 0) {
        setInstances([]);
      }
      return;
    }

    Object.entries(response.outputs).forEach(([resultKey, dataFromResponse]) => {
      const handler = mapModels[resultKey];
      if (!handler) {
        return;
      }

      try {
        // Call the model-specific handler to get an array of instances
        const resultInstances = handler(dataFromResponse, canvasState, idGenerator);

        if (Array.isArray(resultInstances)) {
          // Ensure IDs are unique across all generated instances in this pass
          resultInstances.forEach(instance => {
            if(instance.id === undefined || typeof instance.id === 'number') {}
          });

          // Increment for next handler's unique ID
          idGenerator += resultInstances.length; ase
          newInstances = [...newInstances, ...resultInstances];
        } else {
          console.error(`Handler for ${resultKey} did not return a valid array. Received:`, resultInstances);
        }
      } catch (error) {
        console.error(`Error in handler for ${resultKey}:`, error);
      }
    });

    if (JSON.stringify(instances) !== JSON.stringify(newInstances)) {
      setInstances(newInstances);
      console.log(instances)
    }
  }, [canvasState, response, instances, setInstances]);


  if (!instances || instances.length === 0) {
    return null;
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

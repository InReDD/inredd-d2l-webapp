// Placeholder for actual rendering components or logic
const MouthDetectionVisual = ({ data, imageInfo, planeInfo, keyPrefix }) => {
  // This would use BoundingBoxAnnotationR3F or similar
  // based on data.mouth_detection.pred_boxes
  if (!data || !data.mouth_detection || !data.mouth_detection.pred_boxes) return null;
  
  // For demonstration, let's assume pred_boxes is flat [x1,y1,x2,y2]
  // and we create a simple mesh. In reality, you'd use BoundingBoxAnnotationR3F.
  // const [x1, y1, x2, y2] = data.mouth_detection.pred_boxes;
  // const width = Math.abs(x2 - x1) / imageInfo.originalImageWidth * planeInfo.planeWorldWidth;
  // const height = Math.abs(y2 - y1) / imageInfo.originalImageHeight * planeInfo.planeWorldHeight;
  // const centerX = ((x1 + x2) / 2 / imageInfo.originalImageWidth - 0.5) * planeInfo.planeWorldWidth;
  // const centerY = (0.5 - (y1 + y2) / 2 / imageInfo.originalImageHeight) * planeInfo.planeWorldHeight;


  // This is a placeholder. Replace with actual BoundingBoxAnnotationR3F logic
  // which includes coordinate transformation and label rendering.
  return (
    <mesh key={`${keyPrefix}-mouth`} position={[0, 0, 0.01] /* Calculate actual position */}>
      <boxGeometry args={[0.5, 0.2, 0.01] /* Calculate actual size */} />
      <meshStandardMaterial color="yellow" />
      {/* Add <Text> label if needed here or within BoundingBoxAnnotationR3F */}
    </mesh>
  );
  // Example using BoundingBoxAnnotationR3F (more realistic):
  // return (
  //   <BoundingBoxAnnotationR3F
  //     key={`${keyPrefix}-mouth`}
  //     predBox={data.mouth_detection.pred_boxes}
  //     originalImageWidth={imageInfo.originalImageWidth}
  //     originalImageHeight={imageInfo.originalImageHeight}
  //     planeWorldWidth={planeInfo.planeWorldWidth}
  //     planeWorldHeight={planeInfo.planeWorldHeight}
  //     label="Mouth"
  //     color={0xffd900}
  //   />
  // );
};

const TeethSegmentationVisual = ({ data, imageInfo, planeInfo, keyPrefix }) => {
  // This would map over data.teeth_segmentation.pred_boxes
  // and create multiple BoundingBoxAnnotationR3F instances.
  if (!data || !data.teeth_segmentation || !Array.isArray(data.teeth_segmentation.pred_boxes)) return null;

  // This is a placeholder. Replace with actual BoundingBoxAnnotationR3F logic.
  return data.teeth_segmentation.pred_boxes.map((box, index) => (
    <mesh key={`${keyPrefix}-tooth-${index}`} position={[index * 0.2 - 0.5, 0.3, 0.01] /* Calculate actual position */}>
      <boxGeometry args={[0.1, 0.15, 0.01] /* Calculate actual size */} />
      <meshStandardMaterial color="lightgreen" />
    </mesh>
  ));
  // Example using BoundingBoxAnnotationR3F (more realistic):
  // return data.teeth_segmentation.pred_boxes.map((predBox, index) => (
  //   <BoundingBoxAnnotationR3F
  //     key={`${keyPrefix}-tooth-${index}`}
  //     predBox={predBox}
  //     originalImageWidth={imageInfo.originalImageWidth}
  //     originalImageHeight={imageInfo.originalImageHeight}
  //     planeWorldWidth={planeInfo.planeWorldWidth}
  //     planeWorldHeight={planeInfo.planeWorldHeight}
  //     label={`Tooth ${index + 1}`}
  //     color={0x00ff00}
  //   />
  // ));
};


// Define specific handlers for each service type
const serviceHandlers = {
  MouthDetService: (serviceData, imageInfo, planeInfo, keyPrefix) => {
    // serviceData here is { mouth_detection: { pred_boxes: [...] } }
    return (
      <MouthDetectionVisual
        data={serviceData}
        imageInfo={imageInfo}
        planeInfo={planeInfo}
        keyPrefix={keyPrefix}
      />
    );
  },
  TeethSegService: (serviceData, imageInfo, planeInfo, keyPrefix) => {
    // serviceData here is { teeth_segmentation: { pred_boxes: [[...], [...]] } }
    return (
      <TeethSegmentationVisual
        data={serviceData}
        imageInfo={imageInfo}
        planeInfo={planeInfo}
        keyPrefix={keyPrefix}
      />
    );
  },
  TeethDecayService: (serviceData, imageInfo, planeInfo, keyPrefix) => {
    // console.log(`TeethDecayService data for ${keyPrefix}:`, serviceData);
    // Implement visualization for teeth decay if needed
    // This might involve different types of visuals or overlays on teeth segmentations
    if (!serviceData || !Array.isArray(serviceData.pred_classes) || serviceData.pred_classes.length === 0) return null;
    // Example: return serviceData.pred_classes.map((decay_info, index) => <DecayVisual key={...} ... />);
    return null; // Placeholder
  },
  TeethNumService: (serviceData, imageInfo, planeInfo, keyPrefix) => {
    // console.log(`TeethNumService data for ${keyPrefix}:`, serviceData);
    // Implement visualization for teeth numbering, perhaps labels on TeethSegService outputs
    if (!serviceData || !Array.isArray(serviceData.pred_classes) || serviceData.pred_classes.length === 0) return null;
    return null; // Placeholder
  },
  // Add handlers for other services as needed
};


/**
 * @param {object} outputs - The 'outputs' object from your AI model's response.
 * @param {object} imageInfo - Object containing originalImageWidth, originalImageHeight.
 * @param {object} planeInfo - Object containing planeWorldWidth, planeWorldHeight for 3D mapping.
 * @param {number} idStartIndex - An optional starting index for generating unique IDs (less relevant if using React keys directly).
 * @returns {Array<object|JSX.Element>} An array of objects containing component and configs, or directly JSX elements.
 */
const mapModels = (outputs, imageInfo, planeInfo, idStartIndex = 0) => {
  if (!outputs || typeof outputs !== 'object') return [];

  const components = [];
  let currentIndex = idStartIndex;

  // Iterate over the service names in the outputs object (e.g., "MouthDetService", "TeethSegService")
  for (const serviceName in outputs) {
      if (Object.hasOwnProperty.call(outputs, serviceName)) {
        const serviceData = outputs[serviceName]; // Data for the current service
        const handler = serviceHandlers[serviceName]; // Get the specific handler for this service

        if (handler) {
          const generatedComponent = handler(serviceData, imageInfo, planeInfo, `${serviceName}-${currentIndex}`);
          
          if (generatedComponent) {
            if (React.isValidElement(generatedComponent) || Array.isArray(generatedComponent)) {
              components.push(generatedComponent);
            }
          currentIndex++; // Increment index for unique key generation if needed elsewhere
        } else {
          console.warn(`No handler found for service: ${serviceName}`);
        }
      }
    }
  }

  // Flatten the array in case some handlers return arrays of components (like TeethSegService)
  return components.flat().filter(Boolean);
};

export default mapModels;
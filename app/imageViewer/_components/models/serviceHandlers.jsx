import MouthDetectionVisual from "./Drawlable/MouthDetectionVisual"
import TeethSegmentationVisual from "./Drawlable/TeethSegmentationVisual";

// Define specific handlers for each service type
const serviceHandlers  = {
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

export default serviceHandlers;
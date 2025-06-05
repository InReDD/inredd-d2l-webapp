import React from 'react';
import BoundingBoxAnnotationR3F from '../annotations/BoundingBoxAnnotationR3F';

const MouthDetectionVisual = ({ data, imageInfo, planeInfo, keyPrefix }) => {
  if (
    !data ||
    !data.mouth_detection ||
    !data.mouth_detection.pred_boxes ||
    !imageInfo ||
    !imageInfo.originalImageWidth ||
    !imageInfo.originalImageHeight ||
    !planeInfo ||
    !planeInfo.planeWorldWidth ||
    !planeInfo.planeWorldHeight
  ) {
    console.warn("MouthDetectionVisual: Missing required props data, imageInfo, or planeInfo.");
    return null; 
  }

  // The BoundingBoxAnnotationR3F component is responsible for:
  // 1. Taking the image-space prediction box (predBox).
  // 2. Using imageInfo and planeInfo to transform these coordinates
  //    into the 3D world space of the plane.
  // 3. Rendering the bounding box visuals (lines, planes).
  // 4. Rendering the label with appropriate styling.

  return (
    <BoundingBoxAnnotationR3F
      key={`${keyPrefix}-mouth`}
      predBox={data.mouth_detection.pred_boxes} // Expected format: [x1, y1, x2, y2] in image coordinates
      originalImageWidth={imageInfo.originalImageWidth}
      originalImageHeight={imageInfo.originalImageHeight}
      planeWorldWidth={planeInfo.planeWorldWidth}
      planeWorldHeight={planeInfo.planeWorldHeight}
      label="Mouth" // The text for the label
      color={0xffd900} // Color for the bounding box
      labelTextStyle={{ fontSize: 0.1, color: 'white', fontWeight: 'bold' }}
      labelBackgroundStyle={{ color: 'purple', padding: 0.05, borderRadius: 0.02, opacity: 0.8 }}
      labelPosition="above" // e.g., 'above', 'center'
    />
  );
};

export default MouthDetectionVisual;

import React from 'react';
import BoundingBoxAnnotationR3F from './BoundingBoxAnnotationR3F';

const TeethSegmentationVisual = ({ data, imageInfo, planeInfo, keyPrefix }) => {
  if (!data || !data.teeth_segmentation || !Array.isArray(data.teeth_segmentation.pred_boxes)) return null;

  return data.teeth_segmentation.pred_boxes.map((predBox, index) => (
    <BoundingBoxAnnotationR3F
      key={`${keyPrefix}-tooth-${index}`}
      predBox={predBox}
      originalImageWidth={imageInfo.originalImageWidth}
      originalImageHeight={imageInfo.originalImageHeight}
      planeWorldWidth={planeInfo.planeWorldWidth}
      planeWorldHeight={planeInfo.planeWorldHeight}
      label={`Tooth ${index + 1}`}
      color={0x00ff00}
    />
  ));
};

export default TeethSegmentationVisual;
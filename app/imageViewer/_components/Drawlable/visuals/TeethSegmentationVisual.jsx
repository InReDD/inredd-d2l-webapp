import React from 'react';
import BoundingBoxAnnotationR3F from '../annotations/BoundingBoxAnnotationR3F';

const TeethSegmentationVisual = ({predBox}) => {
    if (!predBox) {
    console.warn("Don't have any predBoxes data for drawing mouth detection")
    return null;
  }

  return (
    <BoundingBoxAnnotationR3F
      predBox={predBox}
      // label="Boca"
      color={0xffd900} // Amarelo para a detecção da boca
      labelTextStyle={{ fontSize: 0.12 }}
      labelBackgroundStyle={{ 
        color: '#A020F0' /* Roxo */,
        opacity: 0.9 }}
    />
  );
};

export default TeethSegmentationVisual;
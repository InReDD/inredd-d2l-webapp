import React from 'react';
import BoundingBoxAnnotationR3F from '../annotations/BoundingBoxAnnotationR3F';

/**
 * Componente de visualização específico para o serviço de Detecção de Boca.
 * Sua única responsabilidade é extrair os dados de predição (pred_boxes)
 * e passar para o componente de anotação genérico com um estilo pré-definido.
 *
 * @param {object} predBoxes - predBoxes provided by inredd-webservice
 */
const MouthDetectionVisual = ({ predBoxes }) => {
  if (!predBoxes) {
    console.warn("Don't have any predBoxes data for drawing mouth detection")
    return null;
  }

  return (
    <BoundingBoxAnnotationR3F
      
      predBox={predBoxes}
      
      // --- Props de Estilo Específicas para esta Visualização ---
      label="Boca"
      color={0xffd900} // Amarelo para a detecção da boca
      labelTextStyle={{ fontSize: 0.12 }}
      labelBackgroundStyle={{ 
        color: '#A020F0' /* Roxo */,
        opacity: 0.9 }}
    />
  );
};

export default MouthDetectionVisual;
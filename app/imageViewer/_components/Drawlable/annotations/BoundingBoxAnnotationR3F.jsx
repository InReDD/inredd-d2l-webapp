import React from 'react';
import { Text3D, Plane, Box, Edges } from '@react-three/drei';
import { useViewer } from '@/app/context/ViewerContext';
import { clamp } from './utils.js';

// --- Estilos Padrão (sem alterações) ---
const DEFAULT_LABEL_TEXT_STYLE = {
  fontPath: '/fonts/helvetiker_regular.typeface.json',
  fontSize: 0.1,
  color: 'white',
  anchorX: 'center',
  anchorY: 'middle',
};
const DEFAULT_LABEL_BACKGROUND_STYLE = {
  color: 'purple',
  padding: 0.03,
  opacity: 0.8,
};
const DEFAULT_BOX_STYLE = {
  depth: 0.01,
  edgeColor: null,
};

/**
 * Renderiza uma caixa delimitadora 3D e um rótulo estilizado em um plano na cena.
 */
const BoundingBoxAnnotationR3F = ({
  predBox,
  label,
  color = 0xffffff,
  labelTextStyle: customLabelTextStyle,
  labelBackgroundStyle: customLabelBackgroundStyle,
  boxStyle: customBoxStyle,
  labelOffsetZ = 0.005,
  elementsOffsetZ = 0.01,
}) => {
  const { canvasState } = useViewer();
  // Incluindo planeWidth e planeHeight na desestruturação para a verificação
  const { imgWidth, imgHeight, planeWidth, planeHeight } = canvasState;

  // ADICIONADO PARA DEPURAÇÃO: Verifique os valores recebidos na consola.
  console.log("BoundingBoxAnnotationR3F State:", { label, predBox, canvasState });

  // --- 1. GUARDA DE ENTRADA APRIMORADA ---
  // Verifica não apenas a existência, mas também se as dimensões são números válidos e maiores que zero.
  if (
    !predBox ||
    !(imgWidth > 0) ||
    !(imgHeight > 0) ||
    !(planeWidth > 0) ||
    !(planeHeight > 0)
  ) {
    return null;
  }

  // Mesclagem de Estilos...
  const labelTextStyle = { ...DEFAULT_LABEL_TEXT_STYLE, ...customLabelTextStyle };
  const labelBackgroundStyle = { ...DEFAULT_LABEL_BACKGROUND_STYLE, ...customLabelBackgroundStyle };
  const boxStyle = { ...DEFAULT_BOX_STYLE, ...customBoxStyle };
  const edgeDisplayColor = boxStyle.edgeColor || color;

  // --- Cálculo de coordenadas ---
  const [x1_img, y1_img, x2_img, y2_img] = predBox;

  // Verificação para garantir que os dados da API não são inválidos
  if ([x1_img, y1_img, x2_img, y2_img].some(coord => typeof coord !== 'number')) {
      console.warn("BoundingBoxAnnotationR3F: predBox contém valores não numéricos.", predBox);
      return null;
  }

  const clampedX1 = clamp(x1_img, 0, imgWidth);
  const clampedY1 = clamp(y1_img, 0, imgHeight);
  const clampedX2 = clamp(x2_img, 0, imgWidth);
  const clampedY2 = clamp(y2_img, 0, imgHeight);

  const normX1 = clampedX1 / imgWidth;
  const normY1 = clampedY1 / imgHeight;
  const normX2 = clampedX2 / imgWidth;
  const normY2 = clampedY2 / imgHeight;

  const worldX1 = (normX1 - 0.5) * planeWidth;
  const worldY1 = (0.5 - normY1) * planeHeight;
  const worldX2 = (normX2 - 0.5) * planeWidth;
  const worldY2 = (0.5 - normY2) * planeHeight;

  const boxWorldWidth = Math.abs(worldX2 - worldX1);
  const boxWorldHeight = Math.abs(worldY1 - worldY2);
  const boxWorldCenterX = (worldX1 + worldX2) / 2;
  const boxWorldCenterY = (worldY1 + worldY2) / 2;
  
  // --- 2. GUARDA DE SAÍDA (A MAIS IMPORTANTE) ---
  // Verifica se alguma das dimensões calculadas resultou em NaN.
  // A função isNaN() é a forma correta de verificar por "Not a Number".
  const finalDimensions = [boxWorldWidth, boxWorldHeight, boxStyle.depth];
  if (finalDimensions.some(isNaN)) {
    console.warn(
      "BoundingBoxAnnotationR3F: Cálculo resultou em dimensões NaN. Abortando renderização desta anotação.",
      { predBox, canvasState, finalDimensions }
    );
    return null; // Retorna nulo para evitar o erro do Three.js
  }

  // --- Lógica de Tamanho e Posição do Rótulo ---
  let estimatedTextWidth = 0, estimatedTextHeight = 0;
  if (label) {
    estimatedTextWidth = label.length * labelTextStyle.fontSize * 0.55;
    estimatedTextHeight = labelTextStyle.fontSize * 1.0;
  }
  const balloonWidth = estimatedTextWidth + 2 * labelBackgroundStyle.padding;
  const balloonHeight = estimatedTextHeight + 2 * labelBackgroundStyle.padding;
  
  if (isNaN(balloonWidth) || isNaN(balloonHeight)) {
      console.warn("BoundingBoxAnnotationR3F: Cálculo do balão resultou em NaN.");
      return null;
  }

  const labelRelativeX = 0;
  const labelRelativeY = (boxWorldHeight / 2) + (balloonHeight / 2) + (labelBackgroundStyle.padding * 0.5) + 0.05;

  return (
    <group position={[boxWorldCenterX, boxWorldCenterY, elementsOffsetZ]}>
      {/* Visual da Bounding Box */}
      <Box args={finalDimensions}>
        <meshStandardMaterial
          color={color}
          transparent={true}
          opacity={0.15}
        />
        <Edges scale={1} color={edgeDisplayColor} />
      </Box>

      {/* Rótulo (Balão + Texto) */}
      {label && (
        <group position={[labelRelativeX, labelRelativeY, labelOffsetZ]}>
          <Plane args={[balloonWidth, balloonHeight]}>
            <meshStandardMaterial
              color={labelBackgroundStyle.color}
              opacity={labelBackgroundStyle.opacity}
              transparent={labelBackgroundStyle.opacity < 1}
            />
          </Plane>
          <Text3D
            font={labelTextStyle.fontPath}
            size={labelTextStyle.fontSize}
            height={0.001}
            curveSegments={4}
            anchorX={labelTextStyle.anchorX}
            anchorY={labelTextStyle.anchorY}
            position-z={0.001}
          >
            {label}
            <meshStandardMaterial color={labelTextStyle.color} />
          </Text3D>
        </group>
      )}
    </group>
  );
};

export default BoundingBoxAnnotationR3F;
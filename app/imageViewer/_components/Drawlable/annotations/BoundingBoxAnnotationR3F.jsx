import React from 'react';
import { Text3D, Plane, Box, Edges } from '@react-three/drei';
import { useViewer } from '@/app/context/ViewerContext'; 

// --- Estilos Padrão (podem ser sobrescritos por props) ---

const DEFAULT_LABEL_TEXT_STYLE = {
  fontPath: '/fonts/helvetiker_regular.typeface.json',
  fontSize: 0.1,  color: 'white',
  anchorX: 'center',
  anchorY: 'middle',
};

const DEFAULT_LABEL_BACKGROUND_STYLE = {
  color: 'purple', // Cor de fundo do balão
  padding: 0.03,   // Preenchimento ao redor do texto
  opacity: 0.8,    // Opacidade do balão (0 a 1)
};

const DEFAULT_BOX_STYLE = {
  depth: 0.01,     // Profundidade visual da caixa 3D
  edgeColor: null, // Se nulo, usa a prop 'color'. Pode ser uma cor separada para as arestas.
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
  const { imgWidth, imgHeight } = canvasState;

  if (!predBox || !imgWidth || !imgHeight) {
    return null;
  }
  
  // --- Mesclagem de Estilos ---
  const labelTextStyle = { ...DEFAULT_LABEL_TEXT_STYLE, ...customLabelTextStyle };
  const labelBackgroundStyle = { ...DEFAULT_LABEL_BACKGROUND_STYLE, ...customLabelBackgroundStyle };
  const boxStyle = { ...DEFAULT_BOX_STYLE, ...customBoxStyle };
  const edgeDisplayColor = boxStyle.edgeColor || color;

  // 2. Lógica de cálculo de coordenadas (conforme fornecido)
  const planeWorldWidth = 10;
  const imageAspectRatio = imgWidth / imgHeight;
  const planeWorldHeight = planeWorldWidth / imageAspectRatio;

  const [x1_img, y1_img, x2_img, y2_img] = predBox;
  const normX1 = x1_img / imgWidth;
  const normY1 = y1_img / imgHeight;
  const normX2 = x2_img / imgWidth;
  const normY2 = y2_img / imgHeight;
  const worldX1 = (normX1 - 0.5) * planeWorldWidth;
  const worldY1 = (0.5 - normY1) * planeWorldHeight;
  const worldX2 = (normX2 - 0.5) * planeWorldWidth;
  const worldY2 = (0.5 - normY2) * planeWorldHeight;
  const boxWorldWidth = Math.abs(worldX2 - worldX1);
  const boxWorldHeight = Math.abs(worldY1 - worldY2);
  const boxWorldCenterX = (worldX1 + worldX2) / 2;
  const boxWorldCenterY = (worldY1 + worldY2) / 2;

  // --- Lógica de Tamanho e Posição do Rótulo ---
  let estimatedTextWidth = 0, estimatedTextHeight = 0;
  if (label) {
    // Estimativa heurística do tamanho do texto para dimensionar o balão
    estimatedTextWidth = label.length * labelTextStyle.fontSize * 0.55;
    estimatedTextHeight = labelTextStyle.fontSize * 1.0;
  }
  const balloonWidth = estimatedTextWidth + 2 * labelBackgroundStyle.padding;
  const balloonHeight = estimatedTextHeight + 2 * labelBackgroundStyle.padding;

  const labelRelativeX = 0; // Centralizado horizontalmente com a caixa
  const labelRelativeY = (boxWorldHeight / 2) + (balloonHeight / 2) + (labelBackgroundStyle.padding * 0.5); // Posicionado acima da borda superior

  return (
    <group position={[boxWorldCenterX, boxWorldCenterY, elementsOffsetZ]}>
      
      {/* --- Visual da Bounding Box --- */}
      <Box args={[boxWorldWidth, boxWorldHeight, boxStyle.depth]}>
        {/* Material semitransparente para as faces da caixa */}
        <meshStandardMaterial
            color={color}
            transparent={true}
            opacity={0.15}
        />
        {/* Componente <Edges> para desenhar o contorno da caixa */}
        <Edges scale={1} color={edgeDisplayColor} />
      </Box>

      {/* --- Rótulo (Balão + Texto) --- */}
      {/* Renderiza o rótulo somente se a prop 'label' for fornecida */}
      {label && (
        <group position={[labelRelativeX, labelRelativeY, labelOffsetZ]}>
          
          {/* Fundo do Rótulo (Balão) */}
          <Plane args={[balloonWidth, balloonHeight]}>
            <meshStandardMaterial
              color={labelBackgroundStyle.color}
              opacity={labelBackgroundStyle.opacity}
              transparent={labelBackgroundStyle.opacity < 1}
            />
          </Plane>
          
          {/* Texto do Rótulo */}
          <Text3D
            font={labelTextStyle.fontPath}
            size={labelTextStyle.fontSize}
            height={0.001} // Profundidade mínima para texto "plano"
            curveSegments={4}
            anchorX={labelTextStyle.anchorX}
            anchorY={labelTextStyle.anchorY}
            position-z={0.001} // Leve deslocamento para frente do balão
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
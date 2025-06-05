import React from 'react';
import { Text3D, Plane, Box, Edges } from '@react-three/drei';

// --- Default Styles (can be overridden by props) ---
const DEFAULT_LABEL_TEXT_STYLE = {
  // IMPORTANT: Replace this with the actual path to your typeface.json font file
  fontPath: '/fonts/helvetiker_regular.typeface.json',
  fontSize: 0.1, // Adjust based on your scene's scale and preferences
  color: 'white',
  anchorX: 'center', // Horizontal alignment of the text
  anchorY: 'middle', // Vertical alignment of the text
  letterSpacing: 0,
  lineHeight: 1,
  maxWidth: Infinity, // For text wrapping, if needed
};

const DEFAULT_LABEL_BACKGROUND_STYLE = {
  color: 'purple', // Background color of the balloon
  padding: 0.03,   // Padding around the text within the balloon
  opacity: 0.8,    // Opacity of the balloon (0 to 1)
  // borderRadius is not directly supported by <Plane>;
  // for rounded corners, you'd need custom shaders or a more complex mesh/texture.
};

const DEFAULT_BOX_STYLE = {
  depth: 0.01, // A very small depth for the 3D box visual
  edgeColor: null, // If null, uses the 'color' prop. Can be a separate color for edges.
};

/**
 * Renders a 3D bounding box and a styled label on a plane in a React Three Fiber scene.
 *
 * @param {object} props - The component's props.
 * @param {number[]} props.predBox - The prediction box [x1_img, y1_img, x2_img, y2_img] in original image pixel coordinates.
 * @param {number} props.originalImageWidth - The width of the original image in pixels.
 * @param {number} props.originalImageHeight - The height of the original image in pixels.
 * @param {number} props.planeWorldWidth - The width of the 3D plane in world units.
 * @param {number} props.planeWorldHeight - The height of the 3D plane in world units.
 * @param {string} [props.label] - The text to display as a label.
 * @param {string|number} [props.color=0xffffff] - The main color for the bounding box.
 * @param {object} [props.labelTextStyle] - Custom styles for the label text (merges with defaults).
 * @param {object} [props.labelBackgroundStyle] - Custom styles for the label background (merges with defaults).
 * @param {object} [props.boxStyle] - Custom styles for the 3D box visual (merges with defaults).
 * @param {number} [props.labelOffsetZ=0.005] - Small Z offset for the label group to avoid z-fighting with the box.
 * @param {number} [props.elementsOffsetZ=0.01] - Small Z offset for the entire annotation to avoid z-fighting with the main plane.
 */
const BoundingBoxAnnotationR3F = ({
  predBox,
  originalImageWidth,
  originalImageHeight,
  planeWorldWidth,
  planeWorldHeight,
  label,
  color = 0xffffff, // Default color for the box if not overridden
  labelTextStyle: customLabelTextStyle,
  labelBackgroundStyle: customLabelBackgroundStyle,
  boxStyle: customBoxStyle,
  labelOffsetZ = 0.005,
  elementsOffsetZ = 0.01,
}) => {
  // --- Input Validation ---
  if (!predBox || predBox.length !== 4) {
    console.error("BoundingBoxAnnotationR3F: 'predBox' is invalid or missing.");
    return null;
  }
  if (!originalImageWidth || !originalImageHeight || !planeWorldWidth || !planeWorldHeight) {
    console.error("BoundingBoxAnnotationR3F: Image or plane dimensions are missing.");
    return null;
  }

  // --- Style Merging ---
  const labelTextStyle = { ...DEFAULT_LABEL_TEXT_STYLE, ...customLabelTextStyle };
  const labelBackgroundStyle = { ...DEFAULT_LABEL_BACKGROUND_STYLE, ...customLabelBackgroundStyle };
  const boxStyle = { ...DEFAULT_BOX_STYLE, ...customBoxStyle };
  const edgeDisplayColor = boxStyle.edgeColor || color;

  // --- Coordinate Transformation ---
  const [x1_img, y1_img, x2_img, y2_img] = predBox;

  // 1. Normalize image coordinates (origin at top-left, range 0 to 1)
  const normX1 = x1_img / originalImageWidth;
  const normY1 = y1_img / originalImageHeight;
  const normX2 = x2_img / originalImageWidth;
  const normY2 = y2_img / originalImageHeight;

  // 2. Convert to world coordinates on the plane.
  //    Assumes plane's origin (0,0) is at its center.
  //    Assumes image Y=0 is top, world Y=0 is center & positive Y is up.
  const worldX1 = (normX1 - 0.5) * planeWorldWidth;
  const worldY1 = (0.5 - normY1) * planeWorldHeight; // Invert Y
  const worldX2 = (normX2 - 0.5) * planeWorldWidth;
  const worldY2 = (0.5 - normY2) * planeWorldHeight; // Invert Y

  const boxWorldWidth = Math.abs(worldX2 - worldX1);
  const boxWorldHeight = Math.abs(worldY1 - worldY2); // Y1 is top-edge, Y2 is bottom-edge

  const boxWorldCenterX = (worldX1 + worldX2) / 2;
  const boxWorldCenterY = (worldY1 + worldY2) / 2;

  // --- Text and Balloon Sizing (Heuristic) ---
  // NOTE: Accurately getting Text3D dimensions before rendering is non-trivial.
  // These are estimations. For precise sizing, you might need a more complex approach
  // (e.g., off-screen rendering or using a library that provides text metrics).
  let estimatedTextWidth = 0;
  let estimatedTextHeight = 0;
  if (label) {
    estimatedTextWidth = label.length * labelTextStyle.fontSize * 0.55; // Adjust multiplier as needed
    estimatedTextHeight = labelTextStyle.fontSize * 1.0; // Adjust multiplier as needed
  }

  const balloonWidth = estimatedTextWidth + 2 * labelBackgroundStyle.padding;
  const balloonHeight = estimatedTextHeight + 2 * labelBackgroundStyle.padding;

  // --- Label Positioning ---
  // Position the label group (balloon + text) relative to the center of the bounding box.
  // Example: Place it above the top edge of the box.
  const labelRelativeX = 0; // Centered horizontally with the box
  const labelRelativeY = (boxWorldHeight / 2) + (balloonHeight / 2) + (labelBackgroundStyle.padding * 0.5); // Position above top edge

  return (
    <group position={[boxWorldCenterX, boxWorldCenterY, elementsOffsetZ]}>
      {/* --- Bounding Box Visual --- */}
      <Box args={[boxWorldWidth, boxWorldHeight, boxStyle.depth]}>
        {/* Transparent material for the box faces */}
        <meshStandardMaterial
            color={color}
            transparent={true}
            opacity={0.15} // Make box faces slightly visible or fully transparent
        />
        {/* Edges for the box outline */}
        <Edges scale={1} color={edgeDisplayColor} />
      </Box>

      {/* --- Label (Balloon + Text) --- */}
      {label && (
        <group position={[labelRelativeX, labelRelativeY, labelOffsetZ]}>
          {/* Balloon Background */}
          <Plane args={[balloonWidth, balloonHeight]}>
            <meshStandardMaterial
              color={labelBackgroundStyle.color}
              opacity={labelBackgroundStyle.opacity}
              transparent={labelBackgroundStyle.opacity < 1}
              // depthTest={false} // Uncomment to make label always render on top (use with caution)
            />
          </Plane>

          {/* Text */}
          <Text3D
            font={labelTextStyle.fontPath}
            size={labelTextStyle.fontSize}
            height={0.001} // Minimal depth for "flat" text
            curveSegments={4} // Lower for better performance if high detail isn't needed
            anchorX={labelTextStyle.anchorX}
            anchorY={labelTextStyle.anchorY}
            letterSpacing={labelTextStyle.letterSpacing}
            lineHeight={labelTextStyle.lineHeight}
            maxWidth={labelTextStyle.maxWidth}
            position-z={0.001} // Slightly in front of its background balloon
          >
            {label}
            <meshStandardMaterial
                color={labelTextStyle.color}
                // depthTest={false} // Uncomment to make text always render on top
            />
          </Text3D>
        </group>
      )}
    </group>
  );
};

export default BoundingBoxAnnotationR3F;
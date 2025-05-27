/**
 * Clamps the given value `val` between `min` and `max`.
 */
function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
}

/**
 * Transforms a point (x, y) from the original image coordinate space
 * to the current canvas coordinate space, ensuring:
 *   - Image or canvas dimensions are not zero
 *   - The x/y coordinates are clamped to the valid image range
 * 
 * @param x - the original x coordinate (image-space)
 * @param y - the original y coordinate (image-space)
 * @param canvasState - an object containing image and canvas dimensions
 * @returns a 2-tuple [newX, newY], the transformed coordinates in canvas-space
 */
export default function transformCoordinates(
    x,
    y,
    canvasState
){
    const { imgWidth, imgHeight, canvasWidth, canvasHeight } = canvasState;

    // Guard clause: if any dimension is zero, return [0, 0]
    if (!imgWidth || !imgHeight || !canvasWidth || !canvasHeight) {
        return [0, 0];
    }

    // Clamp x and y to the valid image boundaries
    const clampedX = clamp(x, 0, imgWidth);
    const clampedY = clamp(y, 0, imgHeight);

    // Transform image-space coordinates to canvas-space
    const newX = (clampedX / imgWidth) * canvasWidth;
    const newY = (clampedY / imgHeight) * canvasHeight;

    return [newX, newY];
}
import { deteccaoDaBoca, segmentacaoDaBoca } from "./handlers/modelHandlers";

// Each entry in the map is a function that receives: (data, canvasState, startId)
export const mapModels = {
  mouth_detection: deteccaoDaBoca,
  teeth_segmentation: segmentacaoDaBoca,
};
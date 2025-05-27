import React from "react";
import DeteccaoDaBoca from "../Drawable/DeteccaoDaBoca";
import SegmentacaoDaBoca from "../Drawable/SegmentacaoDaBoca";

// If all instances share a config, define it once here
const initialConfig = {
    visible: true,
};

/**
 * Handler for mouth detection
 * Expects data like:
 * {
 *   pred_boxes: [
 *     x1, y1, x2, y2
 *   ]
 * }
 */
export function deteccaoDaBoca(
    data,
) {
    const instanced = [];

    if (!data || !Array.isArray(data.pred_boxes)) {
        return instance; // Return empty if the data is malformed
    }

    instance.push({
        id: "deteccao_da_boca",
        component: (
            <DeteccaoDaBoca
                initialState={data.pred_boxes}
            />
        ),
        configs: { ...initialConfig },
    });

    return instance;
};

/**
 * Handler for teeth segmentation
 * Expects data like:
 * {
 *   pred_boxes: [
 *     [ x1,y1, x2, y2],
 *     [ x1,y1, x2, y2],
 *     ...
 *   ]
 * }
 */
export function segmentacaoDaBoca(
    data,
    startId = 0,
) {
    let idCounter = startId;
    const instances = [];

    if (!data || !Array.isArray(data.pred_boxes)) {
        return instances; // Return empty if data is malformed
    }

    // For each sub-array in pred_boxes
    data.pred_boxes.forEach((box) => {
        instances.push({
            id: "segmentacao_do_dente_" + idCounter++,
            component: (
                <SegmentacaoDaBoca
                    initialState={box}
                />
            ),
            configs: { ...initialConfig },
        });
    });

    return instances;
}
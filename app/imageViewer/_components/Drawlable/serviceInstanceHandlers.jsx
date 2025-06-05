import React from 'react';

import DeteccaoDaBoca from "./visuals/MouthDetectionVisual";
import SegmentacaoDaDente from "./visuals/TeethSegmentationVisual";

// Esta configuração será aplicada a cada instância gerada.
const initialConfig = {
    visible: true,
};


// Cada handler agora aceita:
// - serviceData: Os dados brutos para aquele serviço.
// - idGeneratorState: Um objeto { current: number } para gerar IDs únicos
//   de forma consistente através de diferentes chamadas de handler.
const serviceInstanceHandlers = {
    /**
     * Handler para Detecção da Boca.
     * Gera uma única instância.
     */
    MouthDetService: (serviceData, idGeneratorState) => {
        // serviceData esperado: { mouth_detection: { pred_boxes: [x1, y1, x2, y2] } }
        if (!serviceData?.mouth_detection?.pred_boxes) {
            console.warn("MouthDetService: Dados inválidos ou ausentes.");
            return [];
        }

        const predBox = serviceData.mouth_detection.pred_boxes;

        // Retorna um array com um único objeto de instância
        return [{
            id: "deteccao_da_boca_0", // ID estático, pois geralmente há apenas uma
            component: <DeteccaoDaBoca initialState={predBox} />,
            configs: { ...initialConfig, label: "Detecção da Boca" },
        }];
    },

    /**
     * Handler para Segmentação de Dentes.
     * Gera uma instância para cada dente detectado.
     */
    TeethSegService: (serviceData, idGeneratorState) => {
        // serviceData esperado: { teeth_segmentation: { pred_boxes: [[...], [...]] } }
        if (!serviceData?.teeth_segmentation?.pred_boxes) {
            console.warn("TeethSegService: Dados inválidos ou ausentes.");
            return [];
        }

        const instances = [];
        const predBoxes = serviceData.teeth_segmentation.pred_boxes;

        predBoxes.forEach((box, index) => {
            const currentId = idGeneratorState.current + index;
            instances.push({
                id: `segmentacao_do_dente_${currentId}`,
                component: <SegmentacaoDaDente initialState={box} />,
                configs: { ...initialConfig, label: `Dente ${index + 1}` },
            });
        });

        // Atualiza o contador de ID global para o próximo handler usar
        idGeneratorState.current += predBoxes.length;
        return instances;
    },

    /**
     * Handler para Detecção de Cáries (Exemplo).
     * Gera uma instância apenas para os dentes marcados como "decay".
     */
    TeethDecayService: (serviceData, idGeneratorState) => {
        // serviceData esperado (exemplo): { pred_boxes: [[...], ...], pred_classes: ["healthy", "decay", ...] }
        if (!serviceData?.pred_boxes || !serviceData?.pred_classes) {
            console.warn("TeethDecayService: Dados inválidos ou ausentes.");
            return [];
        }

        const instances = [];
        let decayCount = 0;

        serviceData.pred_classes.forEach((className, index) => {
            if (className === 'decay') { // Verifique o nome exato da sua classe
                const box = serviceData.pred_boxes[index];
                const currentId = idGeneratorState.current + decayCount;
                instances.push({
                    id: `carie_no_dente_${currentId}`,
                    // Idealmente, você teria um componente <CarieDoDente>
                    // Usando SegmentacaoDaDente como placeholder visual.
                    component: <SegmentacaoDaDente initialState={box} color={0xff0000} />,
                    configs: { ...initialConfig, label: `Cárie Detectada ${decayCount + 1}`, type: 'decay', color: 0xff0000 },
                });
                decayCount++;
            }
        });

        idGeneratorState.current += decayCount;
        return instances;
    },

    /**
     * Handler para Numeração dos Dentes (Exemplo).
     * Gera uma instância para cada dente, usando o número do dente como label.
     */
    TeethNumService: (serviceData, idGeneratorState) => {
        // serviceData esperado (exemplo): { pred_boxes: [[...], ...], pred_classes: ["18", "17", ...] }
        if (!serviceData?.pred_boxes || !serviceData?.pred_classes) {
            console.warn("TeethNumService: Dados inválidos ou ausentes.");
            return [];
        }

        const instances = [];
        const predBoxes = serviceData.pred_boxes;

        predBoxes.forEach((box, index) => {
            const toothNumber = serviceData.pred_classes[index];
            const currentId = idGeneratorState.current + index;
            instances.push({
                id: `numeracao_do_dente_${currentId}`,
                // Idealmente, você teria um componente <NumeracaoDoDente>
                // que poderia exibir o número do dente.
                component: <SegmentacaoDaDente initialState={box} />,
                configs: { ...initialConfig, label: `Dente ${toothNumber}`, toothNumber: toothNumber },
            });
        });

        idGeneratorState.current += predBoxes.length;
        return instances;
    },

};

export default serviceInstanceHandlers;
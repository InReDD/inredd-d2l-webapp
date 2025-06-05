import React, { useState, useEffect } from 'react';
import serviceInstanceHandlers from './Drawlable/serviceInstanceHandlers';

// Função de mapeamento 
const mapOutputsToDrawableInstances = (outputs, initialIdStartIndex = 0) => {
    if (!outputs || typeof outputs !== 'object') return [];
    const idGeneratorState = { current: initialIdStartIndex };
    return Object.entries(outputs).flatMap(([serviceName, serviceOutputData]) => {
        const handler = serviceInstanceHandlers[serviceName];
        if (!handler) {
            console.warn(`Nenhum handler encontrado para: ${serviceName}`);
            return [];
        }
        try {
            return handler(serviceOutputData, idGeneratorState) || [];
        } catch (error) {
            console.error(`Erro no handler para ${serviceName}:`, error);
            return [];
        }
    });
};

/**
 * Um componente que recebe os outputs de um modelo de IA,
 * processa-os para criar instâncias de componentes visuais,
 * e os prepara para renderização.
 *
 * @param {object} outputs - O objeto de outputs do modelo de IA.
 */
const EntitySpace = ({ outputs }) => {
    const [drawableInstances, setDrawableInstances] = useState([]);

    useEffect(() => {
      console.log(outputs)
      const newInstances = mapOutputsToDrawableInstances(outputs);
      console.log(newInstances)
      setDrawableInstances(newInstances);
    }, [outputs])

    if (drawableInstances.length === 0) {
        return <div>Nenhuma análise visual para exibir. Aguardando dados...</div>;
    }

    return (
        <>
            {drawableInstances.map(instance => (
                <React.Fragment key={instance.id}>
                    {instance.component}
                </React.Fragment>
            ))}
        </>
    );
};

export default EntitySpace;

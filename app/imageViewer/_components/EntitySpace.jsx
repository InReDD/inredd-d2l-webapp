import React, { useState, useEffect } from 'react';
import serviceInstanceHandlers from './Drawlable/serviceInstanceHandlers';
import { useViewer } from '@/app/context/ViewerContext';

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

const EntitySpace = () => {
    const {response} = useViewer()
    const [drawableInstances, setDrawableInstances] = useState([]);

    useEffect(() => {
        const outputs = response?.outputs;

        if (outputs && typeof outputs === 'object') {
            const newInstances = mapOutputsToDrawableInstances(outputs);
            setDrawableInstances(newInstances);
        } else {
            console.log("Nenhum output para processar. Limpando instâncias.");
            setDrawableInstances([]);
        }
    }, [response])

    if (drawableInstances.length === 0) {
        return <></>;
    }

    return (
        <>
        {drawableInstances
            .filter(instance=> instance.component !== null && instance.component !== undefined) 
            .map(instance => (
                <React.Fragment key={instance.id}>
                    {instance.component}
                </React.Fragment>
            ))}
        </>
    );
};

export default EntitySpace;

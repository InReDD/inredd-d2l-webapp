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

const EntitySpace = ({response}) => {
    const [drawableInstances, setDrawableInstances] = useState([]);

    useEffect(() => {
        if (response !== undefined && response !== null) {
            if (Object.hasOwn(response, "outputs")){
              console.log(response)
              const newInstances = mapOutputsToDrawableInstances(response.outputs);
              console.log(newInstances)
              setDrawableInstances(newInstances);
        }
      }
    }, [response])

    if (drawableInstances.length === 0) {
        // return <div>Nenhuma análise visual para exibir. Aguardando dados...</div>;
        return
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

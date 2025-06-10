import React from 'react';
import { Plane, useTexture } from '@react-three/drei';
import { useViewer } from '@/app/context/ViewerContext'; // Ajuste o caminho se necessário

export default function ImagePlane() {
  // 1. Obtém a URL da imagem e o 'canvasState' do nosso contexto.
  //    O 'canvasState' é a nossa fonte única da verdade para as dimensões.
  const { image, canvasState } = useViewer();
  const { planeWidth, planeHeight } = canvasState;

  // 2. Usa o hook `useTexture` do drei. Ele lida com o carregamento,
  //    caching e estados de 'loading' (Suspense) de forma declarativa.
  const texture = useTexture(image || '/placeholder.png'); // Usa um placeholder se a imagem for nula

  // 3. Uma guarda para não renderizar nada se a imagem não estiver carregada
  //    ou se as dimensões do plano ainda não foram calculadas (são 0).
  if (!image || !planeWidth || !planeHeight) {
    return null;
  }

  // 4. Retorna o componente <Plane> de forma declarativa.
  //    As suas dimensões (args) vêm diretamente do nosso contexto, garantindo
  //    o alinhamento perfeito com as anotações.
  return (
    <Plane args={[planeWidth, planeHeight]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        map={texture} 
        // 'toneMapped={false}' é recomendado para imagens médicas/técnicas
        // para garantir que as cores e o brilho não sejam alterados pelo renderer.
        toneMapped={false} 
      />
    </Plane>
  );
}
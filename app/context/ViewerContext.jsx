"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { Vector2 } from 'three';

// --- Constantes ---
// Define a largura base do nosso plano no mundo 3D.
// Manter isto constante ajuda a estabilizar a cena.
const PLANE_BASE_WIDTH = 10;

// --- Hooks Auxiliares ---
function useContainerSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

function useImageSize(url) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!url) {
      setSize({ width: 0, height: 0 });
      return;
    }
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setSize({ width: img.width, height: img.height });
    };
  }, [url]);
  return size;
}

// --- Contexto ---
const ViewerContext = createContext(undefined);

// --- Componente Provider ---
const ViewerProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [instances, setInstances] = useState([]);
  const containerRef = useRef(null);

  const { width: containerWidth, height: containerHeight } = useContainerSize(containerRef);
  const { width: imgWidth, height: imgHeight } = useImageSize(image);

  // O cálculo agora acontece aqui, na nossa fonte da verdade.
  const canvasState = useMemo(() => {
    // Calcula a proporção da imagem. Evita divisão por zero.
    const imageAspectRatio = imgHeight > 0 ? imgWidth / imgHeight : 1;
    
    // Calcula as dimensões do plano 3D.
    // A altura é derivada da largura base e da proporção da imagem para evitar distorção.
    const planeHeight = PLANE_BASE_WIDTH / imageAspectRatio;

    return {
      // Dimensões da imagem original em pixels
      imgWidth,
      imgHeight,
      // Dimensões do elemento canvas HTML em pixels
      canvasWidth: containerWidth,
      canvasHeight: containerHeight,
      // Dimensões do plano no mundo 3D (para posicionamento e escala)
      planeWidth: PLANE_BASE_WIDTH,
      planeHeight: planeHeight,
    };
  }, [imgWidth, imgHeight, containerWidth, containerHeight]);

  const value = useMemo(() => ({
    image,
    response,
    instances,
    canvasState,
    containerRef,
    setImage,
    setResponse,
    setInstances,
  }), [image, response, instances, canvasState]);

  return (
    <ViewerContext.Provider value={value}>
      {children}
    </ViewerContext.Provider>
  );
};

// --- Hook Consumidor ---
const useViewer = () => {
  const context = useContext(ViewerContext);
  if (context === undefined) {
    throw new Error(
      "Erro: O hook 'useViewer' foi chamado por um componente que não está dentro do <ViewerProvider>."
    );
  }
  return context;
};

export { ViewerProvider, useViewer };
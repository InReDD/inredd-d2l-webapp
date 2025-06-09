"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { Vector2 } from 'three'; // Importar Vector2

// O valor padrão continua o mesmo
const defaultViewerValue = {
  image: null,
  response: null,
  instances: [],
  containerRef: { current: null },
  setInstances: () => {},
  setResponse: () => {},
  setImage: () => {},
  canvasState: {
    imgWidth: 0,
    imgHeight: 0,
    canvasWidth: 0,
    canvasHeight: 0,
  },
};

const ViewerContext = createContext(undefined);

const ViewerProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [instances, setInstances] = useState([]);
  const containerRef = useRef(null);

  const { width: containerWidth, height: containerHeight } = useContainerSize(containerRef);
  const { width: imgWidth, height: imgHeight } = useImageSize(image);

  const canvasState = useMemo(
    () => ({
      imgWidth,
      imgHeight,
      canvasWidth: containerWidth,
      canvasHeight: containerHeight,
    }),
    [imgWidth, imgHeight, containerWidth, containerHeight]
  );

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

const useViewer = () => {
  const context = useContext(ViewerContext);

  // Se o 'context' for 'undefined', significa que não há um Provider acima na árvore.
  if (context === undefined) {
    throw new Error(
      "Erro: O hook 'useViewer' foi chamado por um componente que não está dentro do <ViewerProvider>. Verifique a sua árvore de componentes."
    );
  }

  return context;
};

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
    if (!url) { setSize({ width: 0, height: 0 }); return; }
    const img = new Image();
    img.src = url;
    img.onload = () => { setSize({ width: img.width, height: img.height }); };
  }, [url]);
  return size;
}


export { ViewerProvider, useViewer };
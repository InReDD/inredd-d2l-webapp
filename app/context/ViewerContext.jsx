import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';

import { Vector2 } from 'three';

// Providing a default value can be useful, but note that if a component
// is rendered without the provider, these defaults will be used.
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

const ViewerContext = createContext(defaultViewerValue);

const ViewerProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [instances, setInstances] = useState([]);

  const containerRef = useRef(null);

  // Canvas Dynamic Adjust:
  // Track the size of the parent container.
  const { width: containerWidth, height: containerHeight } =
    useContainerSize(containerRef);

  // Track the loaded image dimensions.
  const { width: imgWidth, height: imgHeight } = useImageSize(image);

  // Memoize canvas state so it isn’t a new object every render.
  const canvasState = useMemo(
    () => ({
      imgWidth,
      imgHeight,
      canvasWidth: containerWidth,
      canvasHeight: containerHeight,
      resolution: new Vector2(containerWidth, containerHeight),
    }),
    [imgWidth, imgHeight, containerWidth, containerHeight]
  );

  return (
    <ViewerContext.Provider
      value={{
        image,
        response,
        instances,
        canvasState,
        containerRef,
        setImage,
        setResponse,
        setInstances,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
};

const useViewer = () => {
  return useContext(ViewerContext);
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

export { ViewerProvider, useViewer };
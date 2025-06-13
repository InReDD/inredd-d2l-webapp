import "./styles.scss";
import React, { useState, useRef, useEffect } from 'react';

// Using a simple chevron for icons.
const ArrowIcon = ({ direction }) => (
  <span style={{ transform: `scaleX(${direction === 'right' ? 1 : -1})` }}>›</span>
);

const mockImageData = [
  { id: '#123', src: './imageCuts/image1.png' }, 
  { id: '#814', src: './imageCuts/image2.png' },
  { id: '#105', src: './imageCuts/image3.png' }, 
];
const mockVisits = [
  { id: 'v1', date: '31/01/2025' }, { id: 'v2', date: '15/11/2024' }, { id: 'v3', date: '02/06/2024' },
];

const ImageCutsViewer = () => {
  // --- STATE MANAGEMENT ---
  const [selectedVisit, setSelectedVisit] = useState(mockVisits[0].id);
  const [images, setImages] = useState(mockImageData);
  // 1. `scrollPosition` tracks the current horizontal offset of the image list.
  const [scrollPosition, setScrollPosition] = useState(0);
  // 3. `maxScroll` will store the maximum possible scroll distance.
  const [maxScroll, setMaxScroll] = useState(0);

  // --- REFS TO MEASURE DOM ELEMENTS ---
  // 2. `listRef` points to the moving list, `wrapperRef` points to the visible container.
  const listRef = useRef(null);
  const wrapperRef = useRef(null);

  // 3. This effect calculates the maximum scroll distance.
  useEffect(() => {
    if (listRef.current && wrapperRef.current) {
      const scrollWidth = listRef.current.scrollWidth;
      const clientWidth = wrapperRef.current.clientWidth;
      setMaxScroll(scrollWidth - clientWidth);
    }
  }, [images]);

  const handleVisitChange = (e) => {
    setSelectedVisit(e.target.value);
    setScrollPosition(0); // Reset scroll on visit change
  };

  // 4. This function is called on arrow click to update the scroll position.
  const handleScroll = (direction) => {
    const scrollAmount = 250; // Pixels to move per click
    let newPosition;

    if (direction === 'left') {
      newPosition = Math.max(0, scrollPosition - scrollAmount);
    } else {
      newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    }
    setScrollPosition(newPosition);
  };

  return (
    <div className="image-cuts-viewer">
      <div className="viewer-toolbar">
        <label htmlFor="visit-select">Select visit:</label>
        <select id="visit-select" value={selectedVisit} onChange={handleVisitChange}>
          {mockVisits.map(visit => (<option key={visit.id} value={visit.id}>{visit.date}</option>))}
        </select>
        <span className="separator">|</span>
        <span className="title">Patient's image cuts</span>
      </div>

      <div className="carousel-container">
        {/* 5. The left arrow button calls `handleScroll` and is disabled at the start. */}
        <button className="nav-arrow left" onClick={() => handleScroll('left')} disabled={scrollPosition <= 0}>
          <ArrowIcon direction="left" />
        </button>

        <div className="image-list-wrapper" ref={wrapperRef}>
          {/* 6. The `transform` style moves the list based on the `scrollPosition` state. */}
          <div className="image-list" ref={listRef} style={{ transform: `translateX(-${scrollPosition}px)` }}>
            {images.map(image => (
              <div key={image.id} className="image-cut-item">
                <img src={image.src} alt={`Image cut ${image.id}`} />
                <span className="caption">{image.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. The right arrow button calls `handleScroll` and is disabled at the end. */}
        <button className="nav-arrow right" onClick={() => handleScroll('right')} disabled={scrollPosition >= maxScroll}>
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
};

export default ImageCutsViewer;
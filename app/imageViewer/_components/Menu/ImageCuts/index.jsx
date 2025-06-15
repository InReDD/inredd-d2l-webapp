import "./styles.scss";
import React, { useState, useRef, useEffect } from 'react';

// Using a simple chevron for icons.
const ArrowIcon = ({ direction }) => (
  <span style={{ transform: `scaleX(${direction === 'right' ? 1 : -1})` }}>›</span>
);

const mockImageData = [
  { id: '#123', src: './imageCuts/image1.png' }, 
  { id: '#578', src: './imageCuts/image2.png' },
  { id: '#814', src: './imageCuts/image3.png' },
  { id: '#105', src: './imageCuts/image1.png' },
  { id: '#221', src: './imageCuts/image2.png' },
];
const mockVisits = [
  { id: 'v1', date: '31/01/2025' },
  { id: 'v2', date: '15/11/2024' },
  { id: 'v3', date: '02/06/2024' },
];

const ImageCutsViewer = () => {
  const [selectedVisit, setSelectedVisit] = useState(mockVisits[0].id);
  const [images, setImages] = useState(mockImageData);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const listRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (listRef.current && wrapperRef.current) {
      const scrollWidth = listRef.current.scrollWidth;
      const clientWidth = wrapperRef.current.clientWidth;
      setMaxScroll(Math.max(0, scrollWidth - clientWidth));
    }
  }, [images]);

  const handleVisitChange = (e) => {
    setSelectedVisit(e.target.value);
    setScrollPosition(0);
  };

  const handleScroll = (direction) => {
    const scrollAmount = 250;
    let newPosition;

    if (direction === 'left') {
      newPosition = Math.max(0, scrollPosition - scrollAmount);
    } else {
      newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    }
    setScrollPosition(newPosition);
  };

  // Note the updated className attributes below
  return (
    <div className="image-cuts-viewer">
      <div className="image-cuts-viewer__toolbar">
        <label htmlFor="visit-select" className="image-cuts-viewer__toolbar-label">Select visit:</label>
        {/* The select element is now wrapped for better styling */}
        <div className="image-cuts-viewer__select-wrapper">
          <select id="visit-select" className="image-cuts-viewer__select" value={selectedVisit} onChange={handleVisitChange}>
            {mockVisits.map(visit => (<option className="text-black" key={visit.id} value={visit.id}>{visit.date}</option>))}
          </select>
        </div>
        <span className="image-cuts-viewer__toolbar-separator">|</span>
        <span className="image-cuts-viewer__toolbar-title">Patient's image cuts</span>
      </div>

      <div className="image-cuts-viewer__carousel-container">
        <button className="nav-arrow" onClick={() => handleScroll('left')} disabled={scrollPosition <= 0}>
          <ArrowIcon direction="left" />
        </button>

        <div className="image-cuts-viewer__image-list-wrapper" ref={wrapperRef}>
          <div className="image-cuts-viewer__image-list" ref={listRef} style={{ transform: `translateX(-${scrollPosition}px)` }}>
            {images.map(image => (
              <div key={image.id} className="image-cut-item">
                <img src={image.src} alt={`Image cut ${image.id}`} className="image-cut-item__img" />
                <span className="image-cut-item__caption">{image.id}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="nav-arrow" onClick={() => handleScroll('right')} disabled={scrollPosition >= maxScroll}>
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
};

export default ImageCutsViewer;
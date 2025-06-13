import "./styles.scss"

import React, { useState, useRef, useEffect } from 'react';

// Using a simple chevron for icons, but you can replace with an icon library
const ArrowIcon = ({ direction }) => (
  <span style={{ transform: `scaleX(${direction === 'right' ? 1 : -1})` }}>›</span>
);

// Mock data for demonstration purposes. In a real app, this would come from props or an API.
const mockImageData = [
  { id: '#123', src: 'https://i.imgur.com/gQJpC6j.png' }, // Placeholder image
  { id: '#578', src: 'https://i.imgur.com/O1zswc9.png' }, // Placeholder image
  { id: '#814', src: 'https://i.imgur.com/uABd32s.png' }, // Placeholder image
  { id: '#921', src: 'https://i.imgur.com/gQJpC6j.png' }, // More images for scrolling
  { id: '#105', src: 'https://i.imgur.com/O1zswc9.png' },
  { id: '#244', src: 'https://i.imgur.com/uABd32s.png' },
];

const mockVisits = [
  { id: 'v1', date: '31/01/2025' },
  { id: 'v2', date: '15/11/2024' },
  { id: 'v3', date: '02/06/2024' },
];

/**
 * A viewer component for Browse through a patient's image cuts from different visits.
 */
const ImageCutsViewer = () => {
  const [selectedVisit, setSelectedVisit] = useState(mockVisits[0].id);
  const [images, setImages] = useState(mockImageData);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const listRef = useRef(null);
  const wrapperRef = useRef(null);

  // Calculate the maximum scrollable distance
  useEffect(() => {
    if (listRef.current && wrapperRef.current) {
      const scrollWidth = listRef.current.scrollWidth;
      const clientWidth = wrapperRef.current.clientWidth;
      setMaxScroll(scrollWidth - clientWidth);
    }
  }, [images]);

  const handleVisitChange = (e) => {
    setSelectedVisit(e.target.value);
    // In a real app, you would fetch new images based on the selected visit
    // For now, we'll just reset the scroll position
    setScrollPosition(0);
  };

  const handleScroll = (direction) => {
    const scrollAmount = 250; // How many pixels to scroll with each click
    let newPosition = scrollPosition;

    if (direction === 'left') {
      newPosition = Math.max(0, scrollPosition - scrollAmount);
    } else {
      newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    }
    setScrollPosition(newPosition);
  };

  return (
    <div className="image-cuts-viewer">
      {/* Top toolbar for visit selection */}
      <div className="viewer-toolbar">
        <label htmlFor="visit-select">Select visit:</label>
        <select id="visit-select" value={selectedVisit} onChange={handleVisitChange}>
          {mockVisits.map(visit => (
            <option key={visit.id} value={visit.id}>{visit.date}</option>
          ))}
        </select>
        <span className="separator">|</span>
        <span className="title">Patient's image cuts</span>
      </div>

      {/* The main carousel for scrolling images */}
      <div className="carousel-container">
        <button
          className="nav-arrow left"
          onClick={() => handleScroll('left')}
          disabled={scrollPosition <= 0}
        >
          <ArrowIcon direction="left" />
        </button>

        <div className="image-list-wrapper" ref={wrapperRef}>
          <div
            className="image-list"
            ref={listRef}
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {images.map(image => (
              <div key={image.id} className="image-cut-item">
                <img src={image.src} alt={`Image cut ${image.id}`} />
                <span className="caption">{image.id}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="nav-arrow right"
          onClick={() => handleScroll('right')}
          disabled={scrollPosition >= maxScroll}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
};

export default ImageCutsViewer;
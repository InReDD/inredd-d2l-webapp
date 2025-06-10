"use client"

import React, { useState } from 'react';
import './styles.scss'; // Ensure this path is correct

// Import your actual components
import { ViewerProvider } from '../context/ViewerContext';
import ImageViewer from './_components/ImageViewer';
import Upload from './_components/Upload';
import DentalChart from './_components/Menu/dentalChart';

// Placeholder Icon components (replace with a real icon library like react-icons)
const PlaceholderIcon = ({ label, onClick }) => (
  <div className="placeholder-icon" title={label} onClick={onClick}>
    {label.substring(0, 3)}
  </div>
);


export default function D2LViewer() {
  // State to manage the visibility of the details sidebar
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);

  // This would be the state for your instances, passed to DentalChart
  const [instances, setInstances] = useState([]);

  return (
    <ViewerProvider>
      {/* The 'data-details-visible' attribute helps control the layout via CSS */}
      <div className="dental-viewer-grid-container" data-details-visible={isDetailsVisible}>

        {/* Header */}
        <header className="viewer-header">
          <div className="header-left-content">
            <button className="header-button">Go back</button>
            <div>
              <div className="patient-info">Patient: #43523 - Paciente 123</div>
              <div className="visit-date">Visit date: 20/01/2025</div>
            </div>
          </div>
          <div className="header-right-content">
            <Upload />
          </div>
        </header>

        {/* Main Viewer Pane */}
        <section className="viewer-pane">
          <div className="xray-display-area">
            <ImageViewer />
          </div>
          <div className="image-cuts-area">
            {/* You can map over image thumbnails here */}
            <p>Image Cuts / Thumbnails Area</p>
          </div>
        </section>

        {/* Vertical Icons Sidebar */}
        <aside className="icons-sidebar-vertical">
          <PlaceholderIcon label="Camera" />
          <PlaceholderIcon label="Tools" />
          {/* This button will toggle the detailed sidebar */}
          <PlaceholderIcon
            label={isDetailsVisible ? "Hide" : "Show"}
            onClick={() => setIsDetailsVisible(!isDetailsVisible)}
          />
        </aside>

        {/* Detailed Information Sidebar */}
        {isDetailsVisible && (
          <aside className="viewer-sidebar-details">
            <div className="sidebar-title-search">
              <span>Patient's dentition</span>
              <span className="search-icon">🔍</span>
            </div>
            <input type="text" placeholder="Search..." className="sidebar-search-input" />
            <div className="dental-chart-container">
               {/* Ensure DentalChart is passed the required props */}
              <DentalChart instances={instances} setInstances={setInstances} />
            </div>
            <nav className="sidebar-menu">
              <ul>
                <li>Models &gt;</li>
                <li>Findings &gt;</li>
                <li>Annotations &gt;</li>
                <li>Export &gt;</li>
              </ul>
            </nav>
          </aside>
        )}

      </div>
    </ViewerProvider>
  );
}
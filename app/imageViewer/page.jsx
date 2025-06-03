"use client"

import React from 'react';
import './styles.scss'; // Adjust path
import { ViewerProvider } from '../context/ViewerContext'; // Assuming this context exists
import ImageViewer from './_components/ImageViewer';
import Upload from './_components/Upload';
// import EntitySpace from './_components/EntitySpace'; // Not used in the provided snippet

// Placeholder Icon components (you can replace these with actual SVGs or an icon library)
const PlaceholderIcon = ({ label }) => (
  <div style={{
    width: '40px',
    height: '40px',
    backgroundColor: '#555',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.8em',
    textAlign: 'center',
    marginBottom: '10px'
  }} title={label}>
    {label.substring(0, 3)}
  </div>
);

export default function D2LViewer() {
  return (
    <ViewerProvider>
      <div className="dental-viewer-grid-container">
        <header className="viewer-header">
          <div className="header-left-content">
            <button>Go back</button>
            <div>
              <div>Patient: #43523 - Paciente 123</div>
              <div style={{ fontSize: '0.8em', color: '#aaa' }}>Visit date: 20/01/2025</div>
            </div>
          </div>
          <div className="header-right-content">
            <Upload />
          </div>
        </header>

        <section className="viewer-pane"> {/* This will be the main left content area */}
          <div className="xray-display-area">
            <ImageViewer />
          </div>
          <div className="image-cuts-area">
            <p>Image Cuts / Thumbnails Area</p>
          </div>
        </section>

        {/* NEW: Icons Sidebar - to the left of the detailed viewer-sidebar */}
        <aside className="icons-sidebar-vertical"> {/* Changed class name for clarity */}
          <PlaceholderIcon label="Camera" />
        </aside>

        {/* Existing Right Sidebar (Detailed) */}
        <aside className="viewer-sidebar-details"> {/* Changed class name for clarity */}
          <div className="sidebar-title-search">
            <span>Patient's dentition</span>
            <span>🔍</span> {/* Search Icon */}
          </div>
          <input type="text" placeholder="Search..." className="sidebar-search-input" />
          <div className="dental-chart-placeholder">
            <p>Dental Chart Area</p>
          </div>
          <nav className="sidebar-menu">
            <ul>
              <li>Models &gt;</li>
              <li>Findings &gt;</li>
              <li>Saved cuts &gt;</li>
              <li>Annotations &gt;</li>
              <li>Electronic Health Record (EHR) &gt;</li>
              <li>Treatment planning &gt;</li>
              <li>Export &gt;</li>
            </ul>
          </nav>
        </aside>
      </div>
    </ViewerProvider>
  );
}
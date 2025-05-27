"use client"

import React from 'react';
import './styles.scss'; // Adjust path
import { ViewerProvider } from '../context/ViewerContext';
import ImageViewer from './_components/ImageViewer'
import Upload from './_components/Upload'

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
              <Upload></Upload> 

          </div>
        </header>

        <section className="viewer-pane"> {/* This will be the left content area */}
          <div className="xray-display-area">
            <ImageViewer></ImageViewer>
          </div>
          <div className="image-cuts-area">
            {/* Placeholder for image cuts/thumbnails / Upload component or part of ImageViewer */}
            <p>Image Cuts / Thumbnails Area</p>
          </div>
        </section>

        <aside className="viewer-sidebar"> {/* This will be the right sidebar */}
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
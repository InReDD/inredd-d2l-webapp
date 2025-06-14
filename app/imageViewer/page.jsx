"use client"

import React, { useState } from 'react';
import routes from "@/helpers/routes";
import './styles.scss';


// Import the new self-contained sidebar component
import SidebarMenu from './_components/Menu/SidebarMenu';

// Other imports
import { ViewerProvider } from '../context/ViewerContext';
import ImageViewer from './_components/ImageViewer';
import Upload from './_components/Upload';
import ButtonLink from '@/app/_components/ButtonLink';
import ImageCutsViewer from './_components/ImageCuts';

// Placeholder Icon components
const PlaceholderIcon = ({ label, onClick }) => (
  <div className="placeholder-icon" title={label} onClick={onClick}>{label.substring(0, 3)}</div>
);


export default function D2LViewer() {
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);

  return (
    <ViewerProvider>
      {/* The 'data-details-visible' attribute helps control the layout via CSS */}
      <div className="dental-viewer-grid-container" data-details-visible={isDetailsVisible}>

        {/* Header */}
        <header className="viewer-header">
          <div className="header-left-content">
            <ButtonLink href={routes.DASHBOARD_HOME} className="header-button">Go back</ButtonLink>
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
            <ImageCutsViewer />
          </div>
        </section>

        {/* Vertical Icons Sidebar */}
        <aside className="icons-sidebar-vertical">
          <PlaceholderIcon label="Camera" />
          <PlaceholderIcon
            label={isDetailsVisible ? "Hide" : "Show"}
            onClick={() => setIsDetailsVisible(!isDetailsVisible)}
          />
        </aside>

        {/* DETAILED SIDEBAR: Render the new component when visible */}
        {isDetailsVisible && <SidebarMenu id="#D2L-sidebar" />}

      </div>
    </ViewerProvider>
  );
}
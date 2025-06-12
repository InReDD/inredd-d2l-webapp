"use client"

import React, { useState } from 'react';
import routes from "@/helpers/routes"
import './styles.scss';
import './menu.scss';

// Import your section components
import ModelsMenu from './_components/Menu/SidebarMenu/ModelsMenu';
import FindingsMenu from './_components/Menu/SidebarMenu/FindingsMenu';
import PlaceholderMenu from './_components/Menu/SidebarMenu/PlaceholderMenu'; 

// Other imports
import { ViewerProvider } from '../context/ViewerContext';
import ImageViewer from './_components/ImageViewer';
import Upload from './_components/Upload';
import DentalChart from './_components/Menu/DentalChart';
import ButtonLink from '@/app/_components/ButtonLink';

// Placeholder Icon components
const PlaceholderIcon = ({ label, onClick }) => (
  <div className="placeholder-icon" title={label} onClick={onClick}>{label.substring(0, 3)}</div>
);


export default function D2LViewer() {
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);

  // --- STATE MANAGEMENT FOR NAVIGATION ---
  // 'main' shows the initial menu. Other values ('models', 'findings', etc.) show the specific section.
  const [activeView, setActiveView] = useState('main');

  // Handlers to navigate between views
  const navigateTo = (viewId) => setActiveView(viewId);
  const navigateBack = () => setActiveView('main');

  // --- MENU CONFIGURATION ---
  const menuItems = [
    { id: 'models', title: 'Models', Component: ModelsMenu},
    { id: 'findings', title: 'Findings', Component: FindingsMenu },
    { id: 'saved_cuts', title: 'Saved cuts', Component: () => <PlaceholderMenu title="Saved Cuts" /> },
    { id: 'annotations', title: 'Annotations', Component: () => <PlaceholderMenu title="Anottations"/> },
    { id: 'export', title: 'Export', Component: () => <PlaceholderMenu title="Export" /> },
  ];

  // Find the current component and title based on the active view
  const currentView = menuItems.find(item => item.id === activeView);
  const ActiveComponent = currentView?.Component;

  // --- RENDER LOGIC ---
  const renderSidebarContent = () => {
    // If we are in a specific section view (not 'main')
    if (activeView !== 'main' && ActiveComponent) {
      return (
        <div className="section-view">
          <div className="section-view-header">
            <button onClick={navigateBack} className="back-button">
              &lt;
            </button>
            <h2>{currentView.title}</h2>
          </div>
          <div className="section-view-content">
            <ActiveComponent />
          </div>
        </div>
      );
    }

    // Otherwise, render the Main Menu View
    return (
      <div className="main-menu-view">
        <div className="sidebar-header">
          <h2>Patient's dentition</h2>
          <span className="help-icon">?</span>
        </div>
        <div className="dental-chart-container">
          <DentalChart />
        </div>
        <nav className="main-nav-list">
          <ul>
            {menuItems.map(({ id, title }) => (
              <li key={id}>
                <button className="main-nav-item" onClick={() => navigateTo(id)}>
                  <span>{title}</span>
                  <span className="chevron">&gt;</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };

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

        {/* DETAILED SIDEBAR: Renders content based on the activeView state */}
        {isDetailsVisible && (
          <aside className="viewer-sidebar-details">
            {renderSidebarContent()}
          </aside>
        )}

      </div>
    </ViewerProvider>
  );
}
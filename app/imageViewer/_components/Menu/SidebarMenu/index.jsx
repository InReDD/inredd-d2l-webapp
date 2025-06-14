"use client"

import React, { useState } from 'react';
import "./styles.scss"
import './main-nav.scss'
import './section.scss';

// Import your section components
import ModelsMenu from './ModelsMenu';
import FindingsMenu from './FindingsMenu';
import PlaceholderMenu from './PlaceholderMenu';
import DentalChart from './DentalChart';

/**
 * Renders the main sidebar, handling navigation between the main menu and specific sections.
 */
export default function SidebarMenu() {
  // 'main' shows the initial menu. Other values ('models', 'findings', etc.) show a specific section.
  const [activeView, setActiveView] = useState('main');

  // Handlers to navigate between views
  const navigateTo = (viewId) => setActiveView(viewId);
  const navigateBack = () => setActiveView('main');

  // --- MENU CONFIGURATION ---
  const menuItems = [
    { id: 'models', title: 'Models', Component: ModelsMenu },
    { id: 'findings', title: 'Findings', Component: FindingsMenu },
    { id: 'annotations', title: 'Annotations', Component: () => <PlaceholderMenu title="Annotations" /> },
    { id: 'export', title: 'Export', Component: () => <PlaceholderMenu title="Export" /> },
  ];

  // Find the current component to display based on the active view
  const currentView = menuItems.find(item => item.id === activeView);
  const ActiveComponent = currentView?.Component;

  // If we are in a specific section view (not 'main'), render the detailed view
  if (activeView !== 'main' && ActiveComponent) {
    return (
      <aside className="viewer-sidebar-details section-view">
        {/* Wrap header and description for shared styling and border */}
        <div className="section-intro-block">
          <div className="section-view-header">
            <button onClick={navigateBack} className="back-button">
              &lt;
            </button>

            {/* The title now grows to fill space */}
            <h2 className="section-title">{currentView.title}</h2>

            {/* Added help icon */}
            <button className="help-icon">?</button>
          </div>

          {/* Description is now outside the header */}
          <div className="section-view-description">
            <p>Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>

        <div className="section-view-content">
          <ActiveComponent />
        </div>
      </aside>
    );
  }

  // Otherwise, render the Main Menu View
  return (
    <aside className="viewer-sidebar-details main-menu-view">
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
    </aside>
  );
}
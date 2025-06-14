"use client"

import React, { useState } from 'react';
import "./styles.scss"; 
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
    { id: 'saved_cuts', title: 'Saved cuts', Component: () => <PlaceholderMenu title="Saved cuts" /> },
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
        <div className="section-intro-block">
          <div className="section-view-header">
            <button onClick={navigateBack} className="back-button">
              &lt;
            </button>
            <h2 className="section-title">{currentView.title}</h2>
            <button className="help-icon">?</button>
          </div>
          <div className="section-view-description">
            <p>Description for the {currentView.title} section.</p>
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
        <button className="help-icon">?</button>
      </div>
      <div className="dental-chart-container">
        <DentalChart />
      </div>
      <nav className="main-nav-list">
        <ul>
          {menuItems.map(({ id, title }) => (
            <li className="main-nav-list-item" key={id}>
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
import React from 'react';

// Using a generic 'Arrow' icon component for the toggle indicator
const ArrowIcon = ({ isOpen }) => (
  <span className={`arrow-icon ${isOpen ? 'open' : ''}`}>▼</span>
);

const AccordionMenuItem = ({ title, description, isOpen, onClick, children }) => {
  return (
    <li className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <button className="accordion-header" onClick={onClick}>
        <div className="header-text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <ArrowIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </li>
  );
};

export default AccordionMenuItem;
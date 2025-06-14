import React from 'react';
import "./styles.scss";

/**
 * A reusable toggle switch component.
 * @param {object} props - The component's props.
 * @param {string} props.label - The text label to display.
 * @param {string} props.type - The type for styling the dot (e.g., 'caries', 'bone-loss').
 * @param {boolean} props.checked - Whether the toggle is currently active.
 * @param {Function} props.onChange - The function to call when the toggle is clicked.
 */
const ToggleItem = ({ label, type, checked, onChange }) => {
  return (
    <div className="toggle-item">
      {/* The colored dot's class is now dynamic based on the 'type' prop */}
      <span className={`label-dot ${type}`}></span>
      
      {/* The label text comes from the 'label' prop */}
      <span>{label}</span>
      
      <label className="switch">
        <input
          type="checkbox"
          checked={checked} // The state is passed in via props
          onChange={onChange}  // The handler function is passed in via props
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleItem;
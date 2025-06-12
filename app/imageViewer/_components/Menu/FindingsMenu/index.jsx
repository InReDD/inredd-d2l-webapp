import React, { useState } from 'react';
import './style.scss'; // We'll create this file for styling

// Mock data based on the design. In a real app, this would come from props or an API.
const allFindings = [
  { id: 1, name: '#18 Carie', possibility: 90, type: 'caries' },
  { id: 2, name: '#36 Carie', possibility: 98, type: 'caries' },
  { id: 3, name: '#46 Bone loss', possibility: 70, type: 'bone_loss' }, // Added for filtering demo
];

const FindingsMenu = () => {
  // State for the visibility toggles
  const [showCaries, setShowCaries] = useState(true);
  const [showBoneLoss, setShowBoneLoss] = useState(false);

  // Filter logic based on the toggle states
  const filteredFindings = allFindings.filter(finding => {
    if (finding.type === 'caries' && showCaries) return true;
    if (finding.type === 'bone_loss' && showBoneLoss) return true;
    return false;
  });

  return (
    // This would be a `<li>` if it's inside a `<ul>` as in your SideMenu example
    <div className="findings-menu-container">
      <div className="findings-header">
        <h2>Findings</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="toggle-group">
        {/* Caries Toggle */}
        <div className="toggle-item">
          <span className="label-dot carie"></span>
          <span>Caries</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={showCaries}
              onChange={() => setShowCaries(!showCaries)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Bone Loss Toggle */}
        <div className="toggle-item">
          <span className="label-dot bone-loss"></span>
          <span>Bone loss</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={showBoneLoss}
              onChange={() => setShowBoneLoss(!showBoneLoss)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="findings-list-section">
        <h3>Findings list ({filteredFindings.length})</h3>
        
        <div className="findings-list-header">
          <span>Finding</span>
          <span>Possibility</span>
          <span>Treatment</span>
        </div>

        <div className="findings-list">
          {filteredFindings.map((finding) => (
            <div key={finding.id} className="finding-item">
              <span>{finding.name}</span>
              <span className="possibility">{finding.possibility}%</span>
              <button className="action-btn">🔍</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindingsMenu;
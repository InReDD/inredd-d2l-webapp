import React, { useState } from 'react';
import ToggleItem from "@/app/_components/ToggleItem"

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
    <div className="menu-container">
      <div className="toggle-group">
        <div className="menu-section">
          <ToggleItem
            label="Caries"
            type="carie" // Corresponds to the .carie CSS class
            checked={showCaries}
            onChange={() => setShowCaries(!showCaries)}
          />

          <ToggleItem
            label="Bone loss"
            type="bone-loss" // Corresponds to the .bone-loss CSS class
            checked={showBoneLoss}
            onChange={() => setShowBoneLoss(!showBoneLoss)}
          />
        </div>
      </div>
      <div className="menu-section">
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
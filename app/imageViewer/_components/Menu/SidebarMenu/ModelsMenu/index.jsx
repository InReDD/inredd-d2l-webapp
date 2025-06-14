import React, { useState } from "react";
import ToggleItem from "@/app/_components/ToggleItem";

const ModelsMenu = () => {
  const [showCaries, setShowCaries] = useState(true);
  const [showBoneLoss, setShowBoneLoss] = useState(false);
  
  return (
    <div className="menu-section-container">
      <div className="toggle-group">
        <div className="menu-section">
          <ToggleItem
            label="Caries"
            type="carie" // Corresponds to the .carie CSS class
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
    </div>
  );
};

export default ModelsMenu;
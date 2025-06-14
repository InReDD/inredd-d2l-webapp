import React, { useState } from "react";
import ToggleItem from "@/app/_components/ToggleItem";

const ModelsMenu = ({ onClose }) => {
  // 1. Use a single state object to manage all toggles
  const [modelToggles, setModelToggles] = useState({
    mouthDetection: true,
    teethSegmentation: true, 
  });

  // 2. Create a single handler function to update the state
  const handleToggleChange = (toggleName) => {
    setModelToggles((prevState) => ({
      ...prevState,
      [toggleName]: !prevState[toggleName],
    }));
  };

  return (
    <div className="Menu">
      <div className="toggle-group">
        <ToggleItem
          label="Mouth detection"
          type="yellow"
          checked={modelToggles.mouthDetection}
          onChange={() => handleToggleChange("mouthDetection")}
        />

        <ToggleItem
          label="Teeth Segmentation"
          type="pink"
          checked={modelToggles.implants}
          onChange={() => handleToggleChange("teethSegmentation")}
        />
      </div>
    </div>
  );
};

export default ModelsMenu;
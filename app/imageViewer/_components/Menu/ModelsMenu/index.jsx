import React from "react";
import "./style.scss";

const ModelsMenu = ({ onClose }) => {
  return (
    <div className="Menu">
      <button className="back" onClick={onClose}>←</button>
      <h3>Models</h3>
      <p>Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <div className="option">
        <span className="dot orange"></span> Pathologies
        <input type="checkbox" defaultChecked />
      </div>
      <div className="option">
        <span className="dot yellow"></span> Mouth detection
        <input type="checkbox" defaultChecked />
      </div>
      <div className="option">
        <span className="dot cyan"></span> Bone loss
        <input type="checkbox" defaultChecked />
      </div>
      <div className="option">
        <span className="dot pink"></span> Implants
        <input type="checkbox" />
      </div>
    </div>
  );
};

export default ModelsMenu;
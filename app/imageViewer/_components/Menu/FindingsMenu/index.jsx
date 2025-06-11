import React from "react";
import "./style.scss";

const FindingsMenu = ({ onClose }) => {
    return(
        <div>
            <button className="back" onClick={onClose}>←</button>
            <h3>Findings</h3>
            <p>Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    );
};

export default FindingsMenu;
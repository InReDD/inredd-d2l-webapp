import React from "react";
import "./style.scss";

const AnnotationsMenu = ({ onClose }) => {
    return(
        <div>
            <button className="back" onClick={onClose}></button>
            <h3>Annotations</h3>
            <p>Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    );
};

export default AnnotationsMenu;
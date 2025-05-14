"use client";
import { useState } from "react";
import "./style.scss";
import Image from "next/image";

export default function Accordion({ children, summary, initOpen }) {
  const [isOpen, setIsOpen] = useState(initOpen);
  const pathIcon = "/icons/";
  const icon = isOpen
    ? `${pathIcon}arrow-up.png`
    : `${pathIcon}arrow-down.png`;

  return (
    <div className="accordion-container">
      <details
        className="details"
        open={isOpen}
        onClick={(e) => e.preventDefault()}
      >
        <summary className="summary" onClick={() => setIsOpen(!isOpen)}>
          {summary}
          <Image
            className="image"
            src={icon}
            alt="Ícone de seta"
            width={12}
            height={12}
          />
        </summary>
        <div className="children">{children}</div>
        <div className="is-open-line"></div>
      </details>
    </div>
  );
}

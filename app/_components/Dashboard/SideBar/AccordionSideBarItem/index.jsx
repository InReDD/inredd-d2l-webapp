"use client";
import { useState } from "react";
import "./style.scss";
import Image from "next/image";
import { Paragraph3 } from "@/app/_components/Typography";

export default function AccordionDashboard({ children, summary, initOpen }) {
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
            <div className="avatar-container ml-10">
              <span className="avatar-text">AA</span>
            </div>
            <div className="text">
              <Paragraph3 className="paragrafo3">
                #44651 - Paciente 123
              </Paragraph3>
            </div>
          {summary}
          <Image
            className="image"
            src={icon}
            alt="Ícone de seta"
            width={12}
            height={12}
          />
        </summary>
        <div className="children pl-10">{children}</div>
        <div className="is-open-line"></div>
      </details>
    </div>
  );
}
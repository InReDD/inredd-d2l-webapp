"use client"

import { useState } from "react";
import Image from "next/image";
import { Paragraph1 } from "@/app/_components/Typography";

import "./styles.scss";

export default function AccordionDashboardD2L({ children, summary, initOpen, title, iconSrc }) {
  const [isOpen, setIsOpen] = useState(initOpen);
  const pathIcon = "/icons/";
  const toggleIcon = isOpen ? `${pathIcon}arrow-up.png` : `${pathIcon}arrow-down.png`;

  return (
    <div className="accordion-container">
      {title && (
        <div className="accordion-title d-flex align-items-center mb-2">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt="Ícone do título"
              width={24}
              height={24}
              className="me-2"
            />
          )}
          <Paragraph1 className="paragrafo1">{title}</Paragraph1>
        </div>
      )}

      {/* ACCORDION */}
      <details
        className="details"
        open={isOpen}
        onClick={(e) => e.preventDefault()}
      >
        <summary
          className="summary d-flex justify-content-between align-items-center mb-16"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Texto + ícone colados */}
          <div className="d-flex align-items-center">
            <span className="me-1">{summary}</span>
            {iconSrc && (
              <Image
                src={iconSrc}
                alt="Ícone"
                width={24}
                height={24}
                className="ms-1"
              />
            )}
          </div>

          {/* Ícone de abrir/fechar à direita */}
          <Image
            src={toggleIcon}
            alt="Toggle Accordion"
            width={24}
            height={24}
            className="ms-2"
          />
        </summary>

        <div className="children">{children}</div>
        <div className="is-open-line"></div>
      </details>
    </div>
  );
}
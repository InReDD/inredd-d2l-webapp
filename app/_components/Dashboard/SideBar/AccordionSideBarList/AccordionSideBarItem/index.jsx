import "./style.scss";

import Image from "next/image";
import { Paragraph3 } from "@/app/_components/Typography";
import { ButtonLink } from "@/app/_components";

const getPatientInitials = (name) => {
  if (!name) return "?";
  const parts = name.split(' ');
  return parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
};

/**
 * Its open/closed and active state is controlled by the parent.
 * @param {object} patient - The patient data to display.
 * @param {boolean} isActive - Whether this item is the currently active one.
 * @param {function} onAccordionClick - Function to call when this item is clicked.
 * @param {React.ReactNode} children - Content to display inside the accordion.
 */
export default function AccordionItem({ patient, isActive, onAccordionClick, children }) {
  const pathIcon = "/icons/";
  const icon = isActive ? `${pathIcon}arrow-up.png` : `${pathIcon}arrow-down.png`;

  return (
    <div className={`accordion-container patient-accordion ${isActive ? 'active' : ''}`}>
      <details
        className="details"
        open={isActive}
        onClick={(e) => e.preventDefault()}
      >
        <summary className="summary" onClick={() => onAccordionClick(patient.id)}>
          <div className="avatar-container ml-10">
            <span className="avatar-text">{getPatientInitials(patient.fullName)}</span>
          </div>
          <div className="text">
            <Paragraph3 className="paragrafo3">
              #{patient.id} - {patient.fullName}
            </Paragraph3>
          </div>
          <Image
            className="image"
            src={icon}
            alt="Ícone de seta"
            width={12}
            height={12}
          />
        </summary>
        <div className="accordion-content">
          <ButtonLink href={`/patients/${patient.id}`} className="btn-black" size={"small"}>
            See details
          </ButtonLink>
          <div className="children pl-10 mt-2">
            {children}
          </div>
        </div>
        <div className="is-open-line"></div>
      </details>
    </div>
  );
}
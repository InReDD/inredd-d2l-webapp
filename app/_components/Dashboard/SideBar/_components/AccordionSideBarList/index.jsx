"use client";

import { useState, useEffect } from "react";
import "./style.scss";
import Image from "next/image";
import { Paragraph3 } from "@/app/_components/Typography";
import { ButtonLink } from "@/app/_components";
import { getAllPatients } from "@/services/patient"; 

const getPatientInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(' ');
    return parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
};

/**
 * @param {object} patient - The patient data to display.
 * @param {boolean} isActive - Whether this item is the currently active one.
 * @param {function} onAccordionClick - Function to call when this item is clicked.
 * @param {React.ReactNode} children - Content to display inside the accordion.
 */
function AccordionItem({ patient, isActive, onAccordionClick, children }) {
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

export default function AccordionSideBarList() {
  const [patients, setPatients] = useState([]);
  const [activePatientId, setActivePatientId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const fetchedPatients = await getAllPatients();
        setPatients(fetchedPatients);
        if (fetchedPatients.length > 0) {
          setActivePatientId(fetchedPatients[0].id);
        }
      } catch (e) {
        console.error("Failed to fetch patients:", e);
        setError(e.message || "Não foi possível carregar os pacientes.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPatients();
  }, []); 

  const handleAccordionClick = (patientId) => {
    setActivePatientId(prevActiveId => prevActiveId === patientId ? null : patientId);
  };

  if (isLoading) {
    return <div className="p-4">Carregando pacientes...</div>;
  }

  if (error) {
    return <div className="p-4 text-danger">{error}</div>;
  }

  if (!patients || patients.length === 0) {
    return <div className="p-4">Nenhum paciente encontrado.</div>;
  }

  return (
    <div>
      {patients.map((patient) => (
        <AccordionItem
          key={patient.id}
          patient={patient}
          isActive={patient.id === activePatientId}
          onAccordionClick={handleAccordionClick}
        >
          <div>
            <p><strong>Visits:</strong> {patient.visits?.length || 0}</p>
            <p><strong>Address:</strong> {patient.address || 'N/A'}</p>
          </div>
        </AccordionItem>
      ))}
    </div>
  );
}
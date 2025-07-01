"use client"

import { useState, useEffect } from "react";
import { getAllPatients } from "@/services/patient"; 

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
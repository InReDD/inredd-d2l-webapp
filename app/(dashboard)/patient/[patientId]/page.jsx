import { getPatientById } from "@/services/patient";

import Patient from "@/app/_components/Dashboard/Patient"

import "./styles.scss";

export default async function PatientDetailPage({ params }) {
    let patient = null;
    let error = null;

    try {
        patient = await getPatientById(params.patientId);
    } catch (e) {
        console.error("Failed to fetch patient on server:", e);
        error = e.message || "Could not load patient data.";
    }

    if (error) return <div className="p-4 text-danger">{error}</div>;
    if (!patient) return <div className="p-4">Paciente não encontrado.</div>;

    return <Patient patient={patient} />;
}

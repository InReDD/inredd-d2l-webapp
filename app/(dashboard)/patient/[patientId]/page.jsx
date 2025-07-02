import { getPatientById } from "@/services/patient";

import Patient from "@/app/_components/Dashboard/Patient"

import "./styles.scss";

const getPatientInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(' ');
    return parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
};

export default async function PatientDetailPage({ params }) {
    const { patientId } = params;
    const patient = await getPatientById(patientId)

    if (!patient) return null;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 homepage pl-28 row">
                    <Patient patient={patient}/>
                </div>
            </div>
        </div>
    );
}


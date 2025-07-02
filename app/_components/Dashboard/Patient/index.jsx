"use client";

import { useState, useEffect } from "react";

import PatientEditPage from "./PatientEditPage";
import PatientViewPage from "./PatientViewPage";

import { updatePatient } from "@/services/patient";

export default function PatientPage({ patient: initialPatient }) {
    const [patient, setPatient] = useState(initialPatient);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: initialPatient.fullName,
        sex: initialPatient.sex,
        dateOfBirth: initialPatient.dateOfBirth,
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setFormData({
            fullName: patient.fullName,
            address: patient.address,
            sex: patient.sex,
            dateOfBirth: patient.dateOfBirth,
        });
        setIsEditing(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updatePayload = {
                fullName: formData.fullName,
                address: formData.address,
                sex: formData.sex,
                dateOfBirth: formData.dateOfBirth,
            };
            const updatedPatient = await updatePatient(patient.id, updatePayload);

            setPatient(updatedPatient);
            setIsEditing(false);

        } catch (err) {
            console.error("Failed to save data:", err);
            setError("Houve um erro ao salvar as alterações.");
        }
    };

    if (error) return <div className="p-4 text-danger">{error}</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 homepage pl-28 row">
                    {isEditing ? (
                        <PatientEditPage
                            formData={formData}
                            onInputChange={handleInputChange}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <PatientViewPage
                            patient={patient}
                            onEditClick={() => setIsEditing(true)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
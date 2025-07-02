"use client";

import { useState } from "react";

import PatientEditPage from "./PatientEditPage";
import PatientViewPage from "./PatientViewPage";

export default function PatientDetailPage({ patient }) {
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        // Reset form data to original state and exit edit mode
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
            // The payload must match the backend's PatientCreateDTO structure
            const updatePayload = {
                fullName: formData.fullName,
                address: formData.address,
                sex: formData.sex,
                dateOfBirth: formData.dateOfBirth,
            };
            const updatedPatient = await updatePatient(patientId, updatePayload);
            
            setPatient(updatedPatient);
            setIsEditing(false);

        } catch (err) {
            console.error("Failed to save data:", err);
            setError("Houve um erro ao salvar as alterações.");
        }
    };

    // --- Render Logic ---
    if (!patient) return null; // Or a "not found" component

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
                            patient={patient}
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
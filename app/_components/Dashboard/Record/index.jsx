"use client";

import { useState } from "react";
import { updateVisit } from "@/helpers/api"; 
import VisitRecordView from "./PatientRecordView";
import VisitRecordEdit from "./PatientRecordEdit";

export default function VisitManager({ initialVisit }) {
    const [visit, setVisit] = useState(initialVisit);
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null); // Local error state for save operations

    const handleEditClick = () => {
        // Deep copy the current visit state to the form
        setFormData(JSON.parse(JSON.stringify(visit)));
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(null);
        setError(null); // Clear any previous save errors
    };
    
    const handleInputChange = (e, section = null, subSection = null) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData(prev => {
            const newFormData = { ...prev };
            if (subSection && section) {
                 newFormData[section][subSection] = { ...newFormData[section][subSection], [name]: inputValue };
            } else if (section) {
                newFormData[section] = { ...newFormData[section], [name]: inputValue };
            } else {
                newFormData[name] = inputValue;
            }
            return newFormData;
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        try {
            const updatedVisitFromServer = await updateVisit(visit.id, formData);
            setVisit(updatedVisitFromServer); // Update state with the definitive data from the server
            setIsEditing(false);
            setFormData(null);
        } catch (err) {
            console.error("Failed to save visit data:", err);
            setError("Houve um erro ao salvar as alterações da visita."); // Set local error
        }
    };

    return (
        <div className="pageContainer">
            {/* Display a local error message for the save operation if it fails */}
            {error && <div className="localErrorBanner">{error}</div>}

            {isEditing ? (
                <VisitRecordEdit
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <VisitRecordView
                    visit={visit}
                    onEditClick={handleEditClick}
                />
            )}
        </div>
    );
}
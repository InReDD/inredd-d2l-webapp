"use client";

import { useState } from "react";
import { updateVisit } from "@/services/visit"; 
import VisitRecordView from "./PatientRecordView";
import VisitRecordEdit from "./PatientRecordEdit";

import './styles.scss';

export default function VisitManager({ visit: initialVisit }) {
    const [visit, setVisit] = useState(initialVisit);
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null); 

    const handleEditClick = () => {
        setFormData(JSON.parse(JSON.stringify(visit)));
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(null);
        setError(null); 
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
        setError(null);
        try {
            const updatedVisitFromServer = await updateVisit(visit.id, formData);
            setVisit(updatedVisitFromServer); 
            setIsEditing(false);
            setFormData(null);
        } catch (err) {
            console.error("Failed to save visit data:", err);
            setError("Houve um erro ao salvar as alterações da visita.");
        }
    };

    return (
        <div className="pageContainer">
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
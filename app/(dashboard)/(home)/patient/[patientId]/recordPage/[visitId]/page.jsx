"use client";

import { useState, useMemo, useEffect } from "react";
import { API } from "@/helpers/api";

import "./styles.scss";

const FormField = ({ id, label, value, onChange, type = "text", component: Component = "input", rows }) => (
    <div className="formGroup">
        <label htmlFor={id}>{label}</label>
        <Component
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            rows={rows}
            className="formControl"
        />
    </div>
);

export default function PatientRecordPage({ params }) {
    const { id: patientId } = params;

    const [patientData, setPatientData] = useState(null);
    const [originalPatientData, setOriginalPatientData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!patientId) return;

        const fetchPatientData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await API.get({ path: `/patients/${patientId}` });

                const adaptedData = {
                    id: data.id,
                    name: data.fullName, // API sends fullName
                    dob: data.dateOfBirth, // API sends dateOfBirth
                    sex: data.sex,
                    address: data.address,
                    // Note: Other fields like email, phone, insurance, etc., are not in the API response
                    // and have been removed from the UI for now.
                };

                setPatientData(adaptedData);
                setOriginalPatientData(adaptedData); // Keep a backup for cancel
            } catch (err) {
                console.error("Failed to fetch patient data:", err);
                setError(err.message || "Paciente não encontrado ou erro na API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatientData();
    }, [patientId]);

    // Calculated Values
    const patientAge = useMemo(() => {
        if (!patientData?.dob) return "";
        const birthDate = new Date(patientData.dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }, [patientData?.dob]);

    const getPatientInitials = (name) => {
        if (!name) return "?";
        const parts = name.split(' ');
        return parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
    };

    // Event Handlers 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updatePayload = {
                fullName: patientData.name,
                dateOfBirth: patientData.dob,
                sex: patientData.sex,
                address: patientData.address,
            };

            const updatedPatient = await API.put({
                path: `/api/v1/patients/${patientId}`,
                data: updatePayload,
            });

            const adaptedData = {
                id: updatedPatient.id,
                name: updatedPatient.fullName,
                dob: updatedPatient.dateOfBirth,
                sex: updatedPatient.sex,
                address: updatedPatient.address,
            };

            setPatientData(adaptedData);
            setOriginalPatientData(adaptedData);
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to save patient data:", err);
            setError(err.message || "Não foi possível salvar as alterações.");
        }
    };

    const handleCancel = () => {
        setPatientData(originalPatientData);
        setIsEditing(false);
    };


    // SUB-COMPONENTS for Display/Edit logic ---
    const InfoField = ({ label, value, name, ...props }) => (
        isEditing ? (
            <FormField id={name} label={label} value={value} onChange={handleInputChange} {...props} />
        ) : (
            <div className="infoField">
                <span className="infoLabel">{label}</span>
                <p className="infoValue">{value || "N/A"}</p>
            </div>
        )
    );

    const ToothIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="headingIcon">
            <path d="M9.34,2.55,12,6.21l2.66-3.66A2.12,2.12,0,0,1,17.49,2a2,2,0,0,1,2,2.42l-1.5,5.25,2.75,2.75a2,2,0,0,1,.61,2.76l-4.13,6.2a2,2,0,0,1-3.4.1L12,18.9l-1.82,2.4a2,2,0,0,1-3.4-.1l-4.13-6.2a2,2,0,0,1,.61-2.76l2.75-2.75L4.51,4.42A2,2,0,0,1,6.51,2a2.12,2.12,0,0,1,2.83.55Z" />
            <path d="M4.51,4.42,12,13l7.49-8.58" />
        </svg>
    );

    // --- RENDER LOGIC ---
    if (isLoading) {
        return <div className="pageContainer"><p>Carregando prontuário...</p></div>;
    }

    if (error) {
        return <div className="pageContainer pageError"><p>Erro: {error}</p></div>;
    }

    if (!patientData) {
        return <div className="pageContainer"><p>Nenhum dado de paciente encontrado.</p></div>
    }

    return (
        <div className="pageContainer">
            <header className="pageHeader">
                <h1>Prontuário do Paciente</h1>
                <div className="headerActions">
                    {isEditing ? (
                        <>
                            <button className="button buttonSecondary" onClick={handleCancel}>Cancelar</button>
                            <button className="button buttonPrimary" onClick={handleSave}>Salvar Alterações</button>
                        </>
                    ) : (
                        <button className="button buttonPrimary" onClick={() => setIsEditing(true)}>Editar Prontuário</button>
                    )}
                </div>
            </header>

            <form onSubmit={handleSave} className="formContainer">
                <section className="patientHeader">
                    <div className="avatar">{getPatientInitials(patientData.name)}</div>
                    <div className="patientInfo">
                        {isEditing ? (
                            <FormField id="name" label="Nome Completo" value={patientData.name} onChange={handleInputChange} />
                        ) : (
                            <h2 className="patientName">{patientData.name}</h2>
                        )}
                        <p className="patientMeta">
                            {patientData.sex || "N/A"}
                            <span className="metaDivider">|</span>
                            {patientAge} anos
                        </p>
                    </div>
                </section>

                <div className="contentGrid">
                    <section className="formSection">
                        <h3 className="sectionTitle">Informações Pessoais</h3>
                        <div className="fieldsWrapper">
                            <InfoField label="Data de Nascimento" name="dob" value={patientData.dob} type="date" />
                            <InfoField label="Sexo" name="sex" value={patientData.sex} />
                            <InfoField label="Endereço Completo" name="address" value={patientData.address} component="textarea" rows={3} />
                        </div>
                    </section>

                    <section className="formSection">
                        <h3 className="sectionTitle"><ToothIcon /> Resumo Clínico</h3>
                        <div className="fieldsWrapper">
                            <InfoField label="Última Visita" name="lastVisit" value={new Date(patientData.lastVisit).toLocaleDateString()} type="date" />
                            <InfoField label="Próxima Consulta" name="nextAppointment" value={new Date(patientData.nextAppointment).toLocaleDateString()} type="date" />
                            <TextAreaField label="Queixa Principal" name="chiefComplaint" value={patientData.chiefComplaint} rows={3} />

                        </div>

                    </section>

                </div>
                <section className="formSection fullWidthSection">
                    <h3 className="sectionTitle">Anotações Clínicas Detalhadas</h3>
                    <TextAreaField label="" name="clinicalNotes" value={patientData.clinicalNotes} rows={10} />

                </section>
            </form >
        </div >
    );
}
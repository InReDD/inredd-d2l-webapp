// app/visits/[id]/VisitRecordView.js

import React from 'react';

// You can reuse these from a shared component file
const InfoField = ({ label, value }) => (
    <div><strong>{label}:</strong> <p>{value || "N/A"}</p></div>
);

export default function VisitRecordView({ visit, onEditClick }) {
    const anamnesis = visit.anamnesisForm;
    const questions = anamnesis?.specificHealthQuestions;

    return (
        <div>
            <header className="pageHeader">
                <h1>Detalhes da Visita - {new Date(visit.visitDate).toLocaleDateString()}</h1>
                <button className="button buttonPrimary" onClick={onEditClick}>Editar Visita</button>
            </header>

            <section>
                <h3>Informações Gerais</h3>
                <InfoField label="Data da Visita" value={new Date(visit.visitDate).toLocaleDateString()} />
                <InfoField label="Queixa Principal" value={visit.mainComplaint} />
            </section>

            {anamnesis && (
                <section>
                    <h3>Anamnese</h3>
                    <InfoField label="Peso (kg)" value={anamnesis.weightKg} />
                    <InfoField label="Altura (m)" value={anamnesis.heightM} />
                    <InfoField label="Pressão Sistólica" value={anamnesis.systolicBp} />
                    <InfoField label="Pressão Diastólica" value={anamnesis.diastolicBp} />
                    <InfoField label="Histórico Médico Detalhado" value={anamnesis.detailedMedicalHistory} />
                    {/* ... other anamnesis fields ... */}
                </section>
            )}

            {questions && (
                 <section>
                    <h3>Questionário Específico de Saúde</h3>
                    <InfoField label="Problema Cardiovascular?" value={questions.hasCardiovascularIssue ? 'Sim' : 'Não'} />
                    <InfoField label="Alergias?" value={questions.hasAllergies ? 'Sim' : 'Não'} />
                    {/* ... other specific health questions ... */}
                </section>
            )}
        </div>
    );
}
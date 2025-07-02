import React from 'react';

import "./styles.scss"

/**
 * A helper function to format boolean values for display.
 * Handles true, false, and null/undefined cases as specified.
 * @param {boolean | null | undefined} value - The boolean value from the API.
 * @returns {string} - The formatted string: 'Sim', 'Não', or 'Não declarado'.
 */
const formatBoolean = (value) => {
    if (value === true) {
        return 'Sim';
    }
    if (value === false) {
        return 'Não';
    }
    return 'Não declarado'; // This handles null and undefined
};

/**
 * A reusable component to display a label and its corresponding value.
 * Falls back to 'N/A' if the value is empty, null, or undefined.
 */
const InfoField = ({ label, value }) => (
    <div className="infoField">
        <strong>{label}:</strong>
        <p className="infoValue">{value || "N/A"}</p>
    </div>
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
                    <InfoField label="Informações Adicionais" value={anamnesis.additionalInfoForDentist} />
                </section>
            )}

            {questions && (
                 <section>
                    <h3>Questionário Específico de Saúde</h3>
                    <InfoField label="Possui problema cardiovascular?" value={formatBoolean(questions.hasCardiovascularIssue)} />
                    <InfoField label="Teve febre reumática?" value={formatBoolean(questions.hasRheumaticFever)} />
                    <InfoField label="Sente dor nas articulações?" value={formatBoolean(questions.hasJointPain)} />
                    <InfoField label="Sente dor no peito?" value={formatBoolean(questions.hasChestPain)} />
                    <InfoField label="Sente fadiga ao se exercitar?" value={formatBoolean(questions.hasFatigueOnExertion)} />
                    <InfoField label="Inchaço nos tornozelos?" value={formatBoolean(questions.hasAnkleEdema)} />
                    <InfoField label="Perda de peso recente?" value={formatBoolean(questions.hasRecentWeightLoss)} />
                    <InfoField label="Já teve hepatite?" value={formatBoolean(questions.hadHepatitis)} />
                    <InfoField label="Tem problemas renais?" value={formatBoolean(questions.hasKidneyProblems)} />
                    <InfoField label="Tem problemas gástricos?" value={formatBoolean(questions.hasGastricProblems)} />
                    <InfoField label="Sente tonturas ou desmaios?" value={formatBoolean(questions.hasDizzinessFainting)} />
                    <InfoField label="Tem epilepsia?" value={formatBoolean(questions.hasEpilepsy)} />
                    <InfoField label="Esteve hospitalizado recentemente?" value={formatBoolean(questions.wasHospitalized)} />
                    <InfoField label="Tem tosse persistente?" value={formatBoolean(questions.hasPersistentCough)} />
                    <InfoField label="Já tomou anestesia local?" value={formatBoolean(questions.hadLocalAnesthesia)} />
                    <InfoField label="Teve reação à anestesia?" value={formatBoolean(questions.hadAnesthesiaReaction)} />
                    <InfoField label="Já tomou anestesia geral?" value={formatBoolean(questions.hadGeneralAnesthesia)} />
                    <InfoField label="Teve sangramento excessivo?" value={formatBoolean(questions.hasExcessiveBleeding)} />
                    <InfoField label="Método de controle de sangramento" value={questions.bleedingControlMethod} />
                    <InfoField label="Teve complicação em tratamento dentário?" value={formatBoolean(questions.hadDentalTreatmentComplication)} />
                    <InfoField label="Já tomou penicilina?" value={formatBoolean(questions.tookPenicillin)} />
                    <InfoField label="Tomou corticosteroides nos últimos 12 meses?" value={formatBoolean(questions.tookCorticosteroidLast12m)} />
                    <InfoField label="Tem alergias?" value={formatBoolean(questions.hasAllergies)} />
                    <InfoField label="Teve problema relacionado a medicamentos?" value={formatBoolean(questions.hadMedicationRelatedProblem)} />
                    <InfoField label="Usa substâncias (drogas)?" value={formatBoolean(questions.usesSubstances)} />
                    <InfoField label="Teve manchas brancas na boca?" value={formatBoolean(questions.hadOralWhiteSpots)} />
                    <InfoField label="Tratamento para manchas brancas" value={questions.whiteSpotsTreatment} />
                    <InfoField label="Tem aftas recorrentes?" value={formatBoolean(questions.hasRecurrentAphthousUlcers)} />
                    <InfoField label="Já fez teste de HIV?" value={formatBoolean(questions.hadHivTest)} />
                    <InfoField label="Tem alguma área do corpo insensível?" value={formatBoolean(questions.hasInsensitiveBodyArea)} />
                </section>
            )}
        </div>
    );
}
import React from 'react';

const formatBoolean = (value) => {
    if (value === true) {
        return 'Yes';
    }
    if (value === false) {
        return 'No';
    }
    return 'Not Declared';
};

const InfoField = ({ label, value }) => (
    <div  className="infoField">
        <span className="infoLabel">{label}</span>
        <p className="infoValue">{value || "N/A"}</p>
    </div>
);

const SubSectionTitle = ({ title }) => (
    <h4 className="subSectionTitle">{title}</h4>
);

export default function VisitRecordView({ visit, onEditClick }) {
    const anamnesis = visit.anamnesisForm;
    const questions = anamnesis?.specificHealthQuestions;

    const formattedVisitDate = new Date(visit.visitDate).toLocaleDateString('en-US', {
        year: 'numeric', month: '2-digit', day: '2-digit'
    });

    return (
        <div className="pageContainer">
            <header className="pageHeader">
                <h1>Visit Details - {formattedVisitDate}</h1>
                <button className="button buttonPrimary" onClick={onEditClick}>Edit Visit</button>
            </header>

            <div className="recordContainer">
                <div className="contentGrid">
                    <section className="formSection">
                        <h3 className="sectionTitle">Visit Information</h3>
                        <InfoField label="Visit Date" value={formattedVisitDate} />
                        <InfoField label="Main Complaint" value={visit.mainComplaint} />

                        {anamnesis && (
                            <>
                                <SubSectionTitle title="Anamnesis" />
                                <InfoField label="Weight (kg)" value={anamnesis.weightKg} />
                                <InfoField label="Height (m)" value={anamnesis.heightM} />
                                <InfoField label="Systolic Pressure" value={anamnesis.systolicBp} />
                                <InfoField label="Diastolic Pressure" value={anamnesis.diastolicBp} />
                                <InfoField label="Medical History" value={anamnesis.detailedMedicalHistory} />
                                <InfoField label="Additional Information" value={anamnesis.additionalInfoForDentist} />
                            </>
                        )}
                    </section>

                    {questions && (
                        <section className="formSection">
                            <h3 className="sectionTitle">Health Questionnaire</h3>

                            <SubSectionTitle title="Cardiovascular" />
                            <InfoField label="Cardiovascular issues?" value={formatBoolean(questions.hasCardiovascularIssue)} />
                            <InfoField label="Rheumatic fever?" value={formatBoolean(questions.hasRheumaticFever)} />
                            <InfoField label="Joint pain?" value={formatBoolean(questions.hasJointPain)} />
                            <InfoField label="Chest pain?" value={formatBoolean(questions.hasChestPain)} />
                            <InfoField label="Fatigue on exertion?" value={formatBoolean(questions.hasFatigueOnExertion)} />
                            <InfoField label="Ankle edema?" value={formatBoolean(questions.hasAnkleEdema)} />

                            <SubSectionTitle title="History & Systemic" />
                            <InfoField label="Recent weight loss?" value={formatBoolean(questions.hasRecentWeightLoss)} />
                            <InfoField label="History of hepatitis?" value={formatBoolean(questions.hadHepatitis)} />
                            <InfoField label="Kidney problems?" value={formatBoolean(questions.hasKidneyProblems)} />
                            <InfoField label="Gastric problems?" value={formatBoolean(questions.hasGastricProblems)} />
                            <InfoField label="Dizziness or fainting?" value={formatBoolean(questions.hasDizzinessFainting)} />
                            <InfoField label="Epilepsy?" value={formatBoolean(questions.hasEpilepsy)} />
                            <InfoField label="Previously hospitalized?" value={formatBoolean(questions.wasHospitalized)} />
                            <InfoField label="Persistent cough?" value={formatBoolean(questions.hasPersistentCough)} />

                            <SubSectionTitle title="Anesthesia & Dental Treatment" />
                            <InfoField label="Previous local anesthesia?" value={formatBoolean(questions.hadLocalAnesthesia)} />
                            <InfoField label="Reaction to anesthesia?" value={formatBoolean(questions.hadAnesthesiaReaction)} />
                            <InfoField label="Previous general anesthesia?" value={formatBoolean(questions.hadGeneralAnesthesia)} />
                            <InfoField label="Excessive bleeding?" value={formatBoolean(questions.hasExcessiveBleeding)} />
                            <InfoField label="Bleeding control method" value={questions.bleedingControlMethod} />
                            <InfoField label="Complication with dental treatment?" value={formatBoolean(questions.hadDentalTreatmentComplication)} />
                            
                            <SubSectionTitle title="Medications & Allergies" />
                            <InfoField label="Previously taken penicillin?" value={formatBoolean(questions.tookPenicillin)} />
                            <InfoField label="Corticosteroids in last 12m?" value={formatBoolean(questions.tookCorticosteroidLast12m)} />
                            <InfoField label="Allergies?" value={formatBoolean(questions.hasAllergies)} />
                            <InfoField label="Problem related to medication?" value={formatBoolean(questions.hadMedicationRelatedProblem)} />

                            <SubSectionTitle title="Habits & Other" />
                             <InfoField label="Substance use?" value={formatBoolean(questions.usesSubstances)} />
                             <InfoField label="Oral white spots?" value={formatBoolean(questions.hadOralWhiteSpots)} />
                             <InfoField label="Treatment for white spots" value={questions.whiteSpotsTreatment} />
                             <InfoField label="Recurrent aphthous ulcers?" value={formatBoolean(questions.hasRecurrentAphthousUlcers)} />
                             <InfoField label="Previous HIV test?" value={formatBoolean(questions.hadHivTest)} />
                             <InfoField label="Insensitive body area?" value={formatBoolean(questions.hasInsensitiveBodyArea)} />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
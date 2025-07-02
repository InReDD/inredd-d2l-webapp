import React from 'react';

const FormField = ({ id, label, value, onChange, type = "text", component: Component = "input", rows }) => (
    <div className="formGroup">
        <label htmlFor={id}>{label}</label>
        <Component
            id={id}
            name={id}
            type={type}
            value={value || ''}
            onChange={onChange}
            rows={rows}
            className="formControl"
        />
    </div>
);

const CheckboxField = ({ id, label, checked, onChange }) => (
    <div className="checkboxGroup">
        <input
            id={id}
            name={id}
            type="checkbox"
            checked={!!checked}
            onChange={onChange}
            className="formCheckbox"
        />
        <label htmlFor={id}>{label}</label>
    </div>
);

const SubSectionTitle = ({ title }) => (
    <h4 className="subSectionTitle">{title}</h4>
);

export default function VisitRecordEdit({ formData, onInputChange, onSave, onCancel }) {
    const createHandler = (section = null, subSection = null) => (e) => onInputChange(e, section, subSection);

    if (!formData) {
        return <div className="pageContainer"><p>Loading form...</p></div>;
    }

    return (
        <form onSubmit={onSave}>
            <header className="pageHeader">
                <h1>Editing Visit Details</h1>
                <div className="headerActions">
                    <button type="button" className="button buttonSecondary" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="button buttonPrimary">Save Changes</button>
                </div>
            </header>

            <div className="recordContainer">
                <div className="contentGrid">
                    <section className="formSection">
                        <h3 className="sectionTitle">Visit Information</h3>
                        <FormField label="Visit Date" id="visitDate" type="date" value={formData.visitDate} onChange={createHandler()} />
                        <FormField label="Main Complaint" id="mainComplaint" value={formData.mainComplaint} onChange={createHandler()} component="textarea" rows={4} />

                        {formData.anamnesisForm && (
                            <>
                                <SubSectionTitle title="Anamnesis" />
                                <FormField label="Weight (kg)" id="weightKg" type="number" value={formData.anamnesisForm.weightKg} onChange={createHandler('anamnesisForm')} />
                                <FormField label="Height (m)" id="heightM" type="number" step="0.01" value={formData.anamnesisForm.heightM} onChange={createHandler('anamnesisForm')} />
                                <FormField label="Systolic Pressure" id="systolicBp" type="number" value={formData.anamnesisForm.systolicBp} onChange={createHandler('anamnesisForm')} />
                                <FormField label="Diastolic Pressure" id="diastolicBp" type="number" value={formData.anamnesisForm.diastolicBp} onChange={createHandler('anamnesisForm')} />
                                <FormField label="Medical History" id="detailedMedicalHistory" value={formData.anamnesisForm.detailedMedicalHistory} onChange={createHandler('anamnesisForm')} component="textarea" rows={3} />
                                <FormField label="Additional Information" id="additionalInfoForDentist" value={formData.anamnesisForm.additionalInfoForDentist} onChange={createHandler('anamnesisForm')} component="textarea" rows={3} />
                            </>
                        )}
                    </section>

                    {formData.anamnesisForm?.specificHealthQuestions && (
                        <section className="formSection">
                            <h3 className="sectionTitle">Health Questionnaire</h3>

                            <SubSectionTitle title="Cardiovascular" />
                            <CheckboxField label="Cardiovascular issues?" id="hasCardiovascularIssue" checked={formData.anamnesisForm.specificHealthQuestions.hasCardiovascularIssue} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Rheumatic fever?" id="hasRheumaticFever" checked={formData.anamnesisForm.specificHealthQuestions.hasRheumaticFever} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Joint pain?" id="hasJointPain" checked={formData.anamnesisForm.specificHealthQuestions.hasJointPain} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Chest pain?" id="hasChestPain" checked={formData.anamnesisForm.specificHealthQuestions.hasChestPain} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Fatigue on exertion?" id="hasFatigueOnExertion" checked={formData.anamnesisForm.specificHealthQuestions.hasFatigueOnExertion} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Ankle edema?" id="hasAnkleEdema" checked={formData.anamnesisForm.specificHealthQuestions.hasAnkleEdema} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />

                            <SubSectionTitle title="History & Systemic" />
                            <CheckboxField label="Recent weight loss?" id="hasRecentWeightLoss" checked={formData.anamnesisForm.specificHealthQuestions.hasRecentWeightLoss} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="History of hepatitis?" id="hadHepatitis" checked={formData.anamnesisForm.specificHealthQuestions.hadHepatitis} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Kidney problems?" id="hasKidneyProblems" checked={formData.anamnesisForm.specificHealthQuestions.hasKidneyProblems} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Gastric problems?" id="hasGastricProblems" checked={formData.anamnesisForm.specificHealthQuestions.hasGastricProblems} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Dizziness or fainting?" id="hasDizzinessFainting" checked={formData.anamnesisForm.specificHealthQuestions.hasDizzinessFainting} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Epilepsy?" id="hasEpilepsy" checked={formData.anamnesisForm.specificHealthQuestions.hasEpilepsy} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Previously hospitalized?" id="wasHospitalized" checked={formData.anamnesisForm.specificHealthQuestions.wasHospitalized} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Persistent cough?" id="hasPersistentCough" checked={formData.anamnesisForm.specificHealthQuestions.hasPersistentCough} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />

                            <SubSectionTitle title="Anesthesia & Dental Treatment" />
                            <CheckboxField label="Previous local anesthesia?" id="hadLocalAnesthesia" checked={formData.anamnesisForm.specificHealthQuestions.hadLocalAnesthesia} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Reaction to anesthesia?" id="hadAnesthesiaReaction" checked={formData.anamnesisForm.specificHealthQuestions.hadAnesthesiaReaction} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Previous general anesthesia?" id="hadGeneralAnesthesia" checked={formData.anamnesisForm.specificHealthQuestions.hadGeneralAnesthesia} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Excessive bleeding?" id="hasExcessiveBleeding" checked={formData.anamnesisForm.specificHealthQuestions.hasExcessiveBleeding} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <FormField label="Bleeding control method" id="bleedingControlMethod" value={formData.anamnesisForm.specificHealthQuestions.bleedingControlMethod} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Complication with dental treatment?" id="hadDentalTreatmentComplication" checked={formData.anamnesisForm.specificHealthQuestions.hadDentalTreatmentComplication} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />

                            <SubSectionTitle title="Medications & Allergies" />
                            <CheckboxField label="Previously taken penicillin?" id="tookPenicillin" checked={formData.anamnesisForm.specificHealthQuestions.tookPenicillin} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Corticosteroids in last 12m?" id="tookCorticosteroidLast12m" checked={formData.anamnesisForm.specificHealthQuestions.tookCorticosteroidLast12m} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Allergies?" id="hasAllergies" checked={formData.anamnesisForm.specificHealthQuestions.hasAllergies} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Problem related to medication?" id="hadMedicationRelatedProblem" checked={formData.anamnesisForm.specificHealthQuestions.hadMedicationRelatedProblem} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />

                            <SubSectionTitle title="Habits & Other" />
                            <CheckboxField label="Substance use?" id="usesSubstances" checked={formData.anamnesisForm.specificHealthQuestions.usesSubstances} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Oral white spots?" id="hadOralWhiteSpots" checked={formData.anamnesisForm.specificHealthQuestions.hadOralWhiteSpots} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <FormField label="Treatment for white spots" id="whiteSpotsTreatment" value={formData.anamnesisForm.specificHealthQuestions.whiteSpotsTreatment} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Recurrent aphthous ulcers?" id="hasRecurrentAphthousUlcers" checked={formData.anamnesisForm.specificHealthQuestions.hasRecurrentAphthousUlcers} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Previous HIV test?" id="hadHivTest" checked={formData.anamnesisForm.specificHealthQuestions.hadHivTest} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Insensitive body area?" id="hasInsensitiveBodyArea" checked={formData.anamnesisForm.specificHealthQuestions.hasInsensitiveBodyArea} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                        </section>
                    )}
                </div>
            </div>
        </form>
    );
}
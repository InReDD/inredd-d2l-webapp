import React from 'react';

import './styles.scss';

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

// Specifically for boolean checkboxes
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

// Component for sub-headings to maintain structure
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
                <h1>Editando Detalhes da Visita</h1>
                <div className="headerActions">
                    <button type="button" className="button buttonSecondary" onClick={onCancel}>Cancelar</button>
                    <button type="submit" className="button buttonPrimary">Salvar Alterações</button>
                </div>
            </header>

            <div className="recordContainer">
                <div className="contentGrid">

                    <section className="formSection">
                        <h3 className="sectionTitle">Informações da Visita</h3>
                        <FormField label="Data da Visita" id="visitDate" type="date" value={formData.visitDate} onChange={createHandler()} />
                        <FormField label="Queixa Principal" id="mainComplaint" value={formData.mainComplaint} onChange={createHandler()} component="textarea" rows={4} />

                        {formData.anamnesisForm && (
                            <>
                                <SubSectionTitle title="Anamnese" />
                                <FormField label="Peso (kg)" id="weightKg" type="number" value={formData.anamnesisForm.weightKg} onChange={createHandler('anamnesisForm')} />
                                <FormField label="Altura (m)" id="heightM" type="number" step="0.01" value={formData.anamnesisForm.heightM} onChange={createHandler('anamnesisForm')} />
                                <FormField label="Pressão Sistólica" id="systolicBp" type="number" value={formData.anamnesisForm.systolicBp} onChange={createHandler('anamnesisForm')} />
                                <FormField label="Pressão Diastólica" id="diastolicBp" type="number" value={formData.anamnesisForm.diastolicBp} onChange={createHandler('anamnesisForm')} />
                                <FormField label="Histórico Médico" id="detailedMedicalHistory" value={formData.anamnesisForm.detailedMedicalHistory} onChange={createHandler('anamnesisForm')} component="textarea" rows={3} />
                                <FormField label="Informações Adicionais" id="additionalInfoForDentist" value={formData.anamnesisForm.additionalInfoForDentist} onChange={createHandler('anamnesisForm')} component="textarea" rows={3} />
                            </>
                        )}
                    </section>

                    {formData.anamnesisForm?.specificHealthQuestions && (
                        <section className="formSection">
                            <h3 className="sectionTitle">Questionário de Saúde</h3>

                            <SubSectionTitle title="Cardiovascular" />
                            <CheckboxField label="Problema cardiovascular?" id="hasCardiovascularIssue" checked={formData.anamnesisForm.specificHealthQuestions.hasCardiovascularIssue} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Febre reumática?" id="hasRheumaticFever" checked={formData.anamnesisForm.specificHealthQuestions.hasRheumaticFever} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Dor nas articulações?" id="hasJointPain" checked={formData.anamnesisForm.specificHealthQuestions.hasJointPain} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Dor no peito?" id="hasChestPain" checked={formData.anamnesisForm.specificHealthQuestions.hasChestPain} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Fadiga ao se exercitar?" id="hasFatigueOnExertion" checked={formData.anamnesisForm.specificHealthQuestions.hasFatigueOnExertion} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Inchaço nos tornozelos?" id="hasAnkleEdema" checked={formData.anamnesisForm.specificHealthQuestions.hasAnkleEdema} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />

                            <SubSectionTitle title="Histórico e Sistêmico" />
                            <CheckboxField label="Perda de peso recente?" id="hasRecentWeightLoss" checked={formData.anamnesisForm.specificHealthQuestions.hasRecentWeightLoss} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Já teve hepatite?" id="hadHepatitis" checked={formData.anamnesisForm.specificHealthQuestions.hadHepatitis} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Problemas renais?" id="hasKidneyProblems" checked={formData.anamnesisForm.specificHealthQuestions.hasKidneyProblems} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Problemas gástricos?" id="hasGastricProblems" checked={formData.anamnesisForm.specificHealthQuestions.hasGastricProblems} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Tonturas ou desmaios?" id="hasDizzinessFainting" checked={formData.anamnesisForm.specificHealthQuestions.hasDizzinessFainting} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Tem epilepsia?" id="hasEpilepsy" checked={formData.anamnesisForm.specificHealthQuestions.hasEpilepsy} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Esteve hospitalizado?" id="wasHospitalized" checked={formData.anamnesisForm.specificHealthQuestions.wasHospitalized} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Tosse persistente?" id="hasPersistentCough" checked={formData.anamnesisForm.specificHealthQuestions.hasPersistentCough} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />

                            <SubSectionTitle title="Anestesia e Tratamento Dentário" />
                            <CheckboxField label="Já tomou anestesia local?" id="hadLocalAnesthesia" checked={formData.anamnesisForm.specificHealthQuestions.hadLocalAnesthesia} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Reação à anestesia?" id="hadAnesthesiaReaction" checked={formData.anamnesisForm.specificHealthQuestions.hadAnesthesiaReaction} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Já tomou anestesia geral?" id="hadGeneralAnesthesia" checked={formData.anamnesisForm.specificHealthQuestions.hadGeneralAnesthesia} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Teve sangramento excessivo?" id="hasExcessiveBleeding" checked={formData.anamnesisForm.specificHealthQuestions.hasExcessiveBleeding} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <FormField label="Método de controle de sangramento" id="bleedingControlMethod" value={formData.anamnesisForm.specificHealthQuestions.bleedingControlMethod} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Complicação em tratamento dentário?" id="hadDentalTreatmentComplication" checked={formData.anamnesisForm.specificHealthQuestions.hadDentalTreatmentComplication} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />

                            <SubSectionTitle title="Medicamentos e Alergias" />
                            <CheckboxField label="Já tomou penicilina?" id="tookPenicillin" checked={formData.anamnesisForm.specificHealthQuestions.tookPenicillin} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Tomou corticoides (últimos 12m)?" id="tookCorticosteroidLast12m" checked={formData.anamnesisForm.specificHealthQuestions.tookCorticosteroidLast12m} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Tem alergias?" id="hasAllergies" checked={formData.anamnesisForm.specificHealthQuestions.hasAllergies} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Problema com medicamentos?" id="hadMedicationRelatedProblem" checked={formData.anamnesisForm.specificHealthQuestions.hadMedicationRelatedProblem} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />

                            <SubSectionTitle title="Hábitos e Outros" />
                            <CheckboxField label="Usa substâncias (drogas)?" id="usesSubstances" checked={formData.anamnesisForm.specificHealthQuestions.usesSubstances} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Teve manchas brancas na boca?" id="hadOralWhiteSpots" checked={formData.anamnesisForm.specificHealthQuestions.hadOralWhiteSpots} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <FormField label="Tratamento para manchas brancas" id="whiteSpotsTreatment" value={formData.anamnesisForm.specificHealthQuestions.whiteSpotsTreatment} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Aftas recorrentes?" id="hasRecurrentAphthousUlcers" checked={formData.anamnesisForm.specificHealthQuestions.hasRecurrentAphthousUlcers} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Já fez teste de HIV?" id="hadHivTest" checked={formData.anamnesisForm.specificHealthQuestions.hadHivTest} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Área do corpo insensível?" id="hasInsensitiveBodyArea" checked={formData.anamnesisForm.specificHealthQuestions.hasInsensitiveBodyArea} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                        </section>
                    )}
                </div>
            </div>
        </form>
    );
}
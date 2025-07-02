import React from 'react';
// Assuming your styles are imported in a layout file or directly
// import './styles.scss';

// --- Reusable Form Field Components ---

// For text, number, date, and textarea inputs
const FormField = ({ id, label, value, onChange, type = "text", component: Component = "input", rows }) => (
    <div className="formGroup">
        <label htmlFor={id}>{label}</label>
        <Component
            id={id}
            name={id}
            type={type}
            value={value || ''} // Ensure value is not null/undefined to prevent React warnings
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
            checked={!!checked} // Ensure checked is a boolean
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
    // A helper to avoid verbose onChange calls in the JSX, making the code cleaner.
    const createHandler = (section = null, subSection = null) => (e) => onInputChange(e, section, subSection);

    // If formData hasn't loaded yet, prevent rendering to avoid errors
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

                    {/* --- COLUMN 1: General Info & Anamnesis --- */}
                    <section className="formSection">
                        <h3 className="sectionTitle">Informações da Visita</h3>
                        <FormField label="Data da Visita" id="visitDate" type="date" value={formData.visitDate} onChange={createHandler()} />
                        <FormField label="Queixa Principal" id="mainComplaint" value={formData.mainComplaint} onChange={createHandler()} component="textarea" rows={4}/>

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

                    {/* --- COLUMN 2: Specific Health Questions --- */}
                    {formData.anamnesisForm?.specificHealthQuestions && (
                        <section className="formSection">
                            <h3 className="sectionTitle">Questionário de Saúde</h3>
                            
                            <SubSectionTitle title="Cardiovascular" />
                            <CheckboxField label="Problema cardiovascular?" id="hasCardiovascularIssue" checked={formData.anamnesisForm.specificHealthQuestions.hasCardiovascularIssue} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Febre reumática?" id="hasRheumaticFever" checked={formData.anamnesisForm.specificHealthQuestions.hasRheumaticFever} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            {/* ... Add all other checkboxes similarly ... */}

                            <SubSectionTitle title="Anestesia e Tratamento Dentário" />
                            <CheckboxField label="Já tomou anestesia local?" id="hadLocalAnesthesia" checked={formData.anamnesisForm.specificHealthQuestions.hadLocalAnesthesia} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Reação à anestesia?" id="hadAnesthesiaReaction" checked={formData.anamnesisForm.specificHealthQuestions.hadAnesthesiaReaction} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Teve sangramento excessivo?" id="hasExcessiveBleeding" checked={formData.anamnesisForm.specificHealthQuestions.hasExcessiveBleeding} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <FormField label="Método de controle de sangramento" id="bleedingControlMethod" value={formData.anamnesisForm.specificHealthQuestions.bleedingControlMethod} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            
                            <SubSectionTitle title="Medicamentos e Alergias" />
                            <CheckboxField label="Alergias?" id="hasAllergies" checked={formData.anamnesisForm.specificHealthQuestions.hasAllergies} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />
                            <CheckboxField label="Usa substâncias (drogas)?" id="usesSubstances" checked={formData.anamnesisForm.specificHealthQuestions.usesSubstances} onChange={createHandler('anamnesisForm', 'specificHealthQuestions')} />

                        </section>
                    )}
                </div>
            </div>
        </form>
    );
}
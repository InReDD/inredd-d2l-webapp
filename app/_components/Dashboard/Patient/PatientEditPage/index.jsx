import { Paragraph2, Paragraph3 } from "@/app/_components/Typography";
import { Input, TextArea, Label, Select } from "@/app/_components/Form";
import { Button } from "@/app/_components";

import "./styles.scss"

export default function PatientEditPage({ formData, onSave, onInputChange, onCancel }) {
    const formFields = [
        { name: 'fullName', label: 'Name', FormComponent: Input, colClass: 'col-md-12' },
        { name: 'dateOfBirth', label: 'Date of Birth', FormComponent: Input, colClass: 'col-md-6' },
        {
            name: 'sex',
            label: 'Sex',
            FormComponent: Select,
            colClass: 'col-md-6',
            configs: {
                placeholder: "Select sex...",
                options: [
                    { value: 'Masculino', label: 'Masculino' },
                    { value: 'Feminino', label: 'Feminino' },
                ]
            }
        },
        { name: 'address', label: 'Address', FormComponent: Input, colClass: 'col-md-12' },
    ];

    return (
        <div className="wrapper">
            <form className="patient-edit-form" onSubmit={onSave}>
                <div className="patient-edit-container col-12">
                    <div className="form-actions-top">
                        <Paragraph2 className="paragrafo2 fw-bold">Basic Information</Paragraph2>
                    </div>
                    <div className="row">
                        {formFields.map(field => {
                            const { name, label, FormComponent, colClass, configs = {} } = field;
                            return (
                                <div key={name} className={`${colClass} mt-20`}>
                                    <div className="form-group">
                                        <Label text={label} htmlFor={name} />
                                        <FormComponent
                                            id={name}
                                            name={name}
                                            value={formData[name]}
                                            onChange={onInputChange}
                                            {...configs}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        <div className="bottom">
                            <Button type="button" size="small" className="btn-secondary" onClick={onCancel}>Cancel</Button>
                            <Button type="submit" size="small" className="btn-black ml-10" onClick={onSave}>Save</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
}
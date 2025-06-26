"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Paragraph3 } from "@/app/_components/Typography";
import { Input, TextArea } from "@/app/_components/Form"; 
import routes from "@/helpers/routes";
import { Button } from "@/app/_components";

import "./styles.scss"

export default function PatientEditPage() {
    const router = useRouter(); 
    
    const [formData, setFormData] = useState({
        name: "Patient 123",
        address: "Brazil, São Paulo, Ribeirão Preto",
        email: "pacient@gmail.com",
        resume: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis interdum lorem. Maecenas at orci sapien. In in finibus nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        // Navigates the user to the previous page in their history
        router.back();
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Saving data:", formData);
        router.push(routes.DASHBOARD_HOME);
    };

    return (
        <div className="patient-edit-container">


            {/* --- Edit Form --- */}
            <form className="patient-edit-form" onSubmit={handleSave}>
                {/* --- Avatar and Name --- */}
                <div className="d-flex align-items-start">
                    <div className="card-content">
                        <span className="avatar-text">AA</span>
                    </div>
                    <div className="form-group flex-grow-1 ml-15">
                        <label htmlFor="name">Name</label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <Paragraph3 className="paragrafo3 text-muted mt-8">
                            Since 05/03/2024
                        </Paragraph3>
                    </div>
                </div>

                {/* --- Address and Email (Side-by-side) --- */}
                <div className="row mt-20">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* --- Resume Text Area --- */}
                <div className="form-group mt-20">
                    <label htmlFor="resume">Resume</label>
                    <TextArea
                        id="resume"
                        name="resume"
                        value={formData.resume}
                        onChange={handleInputChange}
                        rows={5}
                    />
                </div>
            </form>

            {/* --- Top Action Buttons --- */}
            <div className="form-actions">
                <Button type="button" className="btn-secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button type="submit" className="btn-black" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    );
}
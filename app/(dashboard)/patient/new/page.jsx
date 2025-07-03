"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPatient } from '@/services/patient';
import { Input, Select, Label } from '@/app/_components/Form'; 
import { SEX_OPTIONS } from '@/helpers/constants'; 
import Link from 'next/link';
import { Button } from '@/app/_components';

import './styles.scss'; 

export default function NewPatientPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        sex: '',
        address: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Basic validation
        if (!formData.fullName || !formData.dateOfBirth || !formData.sex) {
            setError("Full Name, Date of Birth, and Sex are required.");
            setIsLoading(false);
            return;
        }

        try {
            const newPatient = await createPatient(formData);
            router.push(`/patient/${newPatient.id}`);
        } catch (err) {
            setError(err.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="new-patient-container">
            <div className="form-card">
                <header className="form-header">
                    <h1>Create New Patient</h1>
                    <p>Enter the details below to add a new patient to the system.</p>
                </header>

                <form onSubmit={handleSubmit} className="form-body">
                    <div className="form-group">
                        <Label htmlFor="fullName" text="Full Name" />
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g., John Smith"
                            required
                        />
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <Label htmlFor="dateOfBirth" text="Date of Birth" />
                            <Input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <Label htmlFor="sex" text="Sex" />
                            <Select
                                id="sex"
                                name="sex"
                                value={formData.sex}
                                onChange={handleInputChange}
                                options={SEX_OPTIONS}
                                placeholder="Select sex..."
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <Label htmlFor="address" text="Address (Optional)" />
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="e.g., 123 Main St, Anytown"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <footer className="form-actions">
                        <Link href="/dashboard" className="button btn-secondary">
                            Cancel
                        </Link>
                        <Button type="submit" className="btn-primary" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Create Patient'}
                        </Button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
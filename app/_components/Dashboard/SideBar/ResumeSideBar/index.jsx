"use client"

import Image from "next/image"
import { Input } from "@/app/_components/Form";
import SideBarHeader from "@/app/_components/Dashboard/SideBar/SidebarHeader";
import AccordionDashboard from "@/app/_components/Dashboard/SideBar/AccordionSideBarItem";
import Dropdown from "@/app/_components/Dropdown";

import "./styles.scss"

const ResumeSideBar = () => {
    const patients = [
        { id: '#44651', name: 'Paciente 123', initials: 'AA', active: true, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis interdum lorem...' },
        { id: '#44652', name: 'Paciente 124', initials: 'BB', active: false, content: '...' },
        { id: '#44653', name: 'Paciente 125', initials: 'CC', active: false, content: '...' },
        { id: '#44654', name: 'Paciente 126', initials: 'DD', active: false, content: '...' },
    ];

    return (
        <div className="resume-sidebar-content">

            <SideBarHeader title="Patients"/>

            <div className="search-container">
                <Input
                    className="search-input"
                    placeholder="Search for a patient..."
                />
                <Image
                    className="search-icon"
                    src={"/icons/Search.png"}
                    width={20}
                    height={20}
                    alt="Search Icon"
                />

                <a href="/">add new +</a>
            </div>
            <div className="patient-list">
                <div className="pagination-controls">
                    <span>1-10 of 200</span>
                    <div className="page-selector">
                        <span>Page:</span>
                        <Dropdown />
                    </div>
                </div>

                {patients.map(patient => (
                    <div key={patient.id} className={`patient-accordion ${patient.active ? 'active' : ''}`}>
                        <AccordionDashboard title={`${patient.initials} ${patient.id} - ${patient.name}`}>
                            {patient.content}
                        </AccordionDashboard>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResumeSideBar;
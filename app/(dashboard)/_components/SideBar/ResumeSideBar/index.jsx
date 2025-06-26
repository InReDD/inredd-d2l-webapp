import Image from "next/image"

import { Paragraph2, Paragraph3 } from "@/app/_components/Typography";
import { Input } from "@/app/_components/Form";
import AccordionDashboard from "@/app/_components/AccordionDasboardNavbar"; // Assuming this is your Accordion
import Dropdown from "@/app/_components/Dropdown";

const SideBar = () => {
    // This is a mock structure for your patient data
    const patients = [
        { id: '#44651', name: 'Paciente 123', initials: 'AA', active: true, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis interdum lorem...' },
        { id: '#44652', name: 'Paciente 124', initials: 'BB', active: false, content: '...' },
        { id: '#44653', name: 'Paciente 125', initials: 'CC', active: false, content: '...' },
        { id: '#44654', name: 'Paciente 126', initials: 'DD', active: false, content: '...' },
    ];

    return (
        // The component is placed inside the <div class="sidebar-content">
        <>
            <div className="patients-header">
                <h2 className="patients-title">Patients</h2>
                <ul>
                    <li>
                        <a href="/">Add new+</a>
                    </li>
                </ul>
            </div>

            <div className="search-container">
                <Input
                    className="search-input"
                    placeholder="Search for a patient..."
                />
                <Image
                    className="search-icon"
                    src={"/icons/Search.png"} // Update this path if necessary
                    width={20}
                    height={20}
                    alt="Search Icon"
                />
            </div>

            <div className="pagination-controls">
                <span>1-10 of 200</span>
                <div className="page-selector">
                    <span>Page:</span>
                    <Dropdown />
                </div>
            </div>

            <div className="patient-list">
                {/* Map over your patient data.
                  The AccordionDashboard component should handle its own state (expanded/collapsed).
                  The `active` class is for styling the selected patient as in the image.
                */}
                {patients.map(patient => (
                    <div key={patient.id} className={`patient-accordion ${patient.active ? 'active' : ''}`}>
                        <AccordionDashboard title={`${patient.initials} ${patient.id} - ${patient.name}`}>
                            {patient.content}
                        </AccordionDashboard>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SideBar;
"use client"

import Image from "next/image"
import { Input } from "@/app/_components/Form";
import SideBarHeader from "@/app/_components/Dashboard/SideBar/SidebarHeader";
import Dropdown from "@/app/_components/Dropdown";

import "./styles.scss"

import AccordionSideBarList from "../_components/AccordionSideBarList";
import { getAllPatients } from "@/services/patient";

const ResumeSideBar = () => {
    const patients = getAllPatients();

    return (
        <div className="resume-sidebar-content">

            <SideBarHeader title="Patients"/>

            {/* <div className="search-container">
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

                </div> */}
            <div className="patient-list">
                <a href="/">add new +</a>
                <div className="pagination-controls">
                    {/* <span>1-10 of 200</span>
                    <div className="page-selector">
                        <span>Page:</span>
                        <Dropdown />
                    </div> */}
                </div>

                <AccordionSideBarList patients={patients}/>
            </div>
        </div>
    )
}

export default ResumeSideBar;
import "./styles.scss";

import Image from "next/image";
import { Paragraph2 } from "@/app/_components/Typography";
import SideBar from "@/app/_components/Dashboard/SideBar";
import DashboardNavbar from "@/app/_components/Dashboard/Navbar"

export default function DashboardLayout({ children }) {


    return (
        <div id="D2L-dashboard">
            <header id="D2L-header">
                <DashboardNavbar/>
            </header>

            <aside id="D2L-sidebar">
                <div className="sidebar-header">
                <Image
                    className="d2l-icon"
                    src={"/icons/d2l.png"} 
                    width={35}
                    height={35}
                    alt="D2L Icon"
                />
                <Paragraph2 className="paragrafo ml-10">
                    Dental Second Look
                </Paragraph2>
                </div>

                <div className="sidebar-content">
                    <SideBar />
                </div>
            </aside>

            <main id="D2L-content">
                {children}
            </main>
        </div>
    );
}
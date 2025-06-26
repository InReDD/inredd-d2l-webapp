import "./styles.scss";

import ButtonLink from "@/app/_components/ButtonLink";
import routes from "@/helpers/routes";
import UserProfile from "./_components/UserProfile"
import Image from "next/image";
import { Paragraph2 } from "@/app/_components/Typography";
import SideBar from "@/app/(dashboard)/_components/SideBar";

export default function DashboardLayout({ children }) {
    const navLinks = [
        { name: "Resume", href: routes.DASHBOARD_HOME }, 
        { name: "Advanced Search", href: routes.SEARCH },
    ];

    return (
        <div id="D2L-dashboard">
            <header id="D2L-header">
                <nav className="header-center">
                    <ul className="tabs-nav">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <ButtonLink href={link.href}>
                                    {link.name}
                                </ButtonLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="header-right">
                    <UserProfile />
                </div>
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
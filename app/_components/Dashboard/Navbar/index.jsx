"use client"

import routes from "@/helpers/routes";
import { usePathname } from 'next/navigation';

import UserProfile from "@/app/_components/Dashboard/UserProfile"

import "./styles.scss"

const DashboardNavBar = () => {
    const currentPath = usePathname();

    const navLinks = [
        { name: "Resume", href: routes.DASHBOARD_HOME },
        { name: "Advanced Search", href: routes.SEARCH },
    ];

    return (
        <div className="dashboard-navbar">
            <nav className="header-center">
                <ul className="tabs-nav">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className={currentPath === link.href ? 'active' : ''}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="header-right">
                <UserProfile />
            </div>
        </div>
    )
}

export default DashboardNavBar;
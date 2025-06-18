import "./styles.scss";

import ButtonLink from "@/app/_components/ButtonLink";
import routes from "@/helpers/routes";
import UserProfile from "./_components/UserProfile"

export default function DashboardLayout({ children }) {
    const navLinks = [
        { name: "Resume", href: routes.DASHBOARD_HOME }, 
        { name: "Advanced Search", href: routes.SEARCH },
    ];

    return (
        <div id="D2L-dashboard">
            <header id="D2L-header">
                <div className="header-left">
                    <div className="logo">
                        {/* Replace with your actual logo */}
                        <span className="logo-placeholder"></span>
                        <h1>Dental Second Look</h1>
                    </div>
                </div>
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

            <main id="D2L-content">
                {children}
            </main>
        </div>
    );
}
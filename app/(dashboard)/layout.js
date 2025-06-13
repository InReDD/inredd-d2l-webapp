import "./styles.scss"; 

import routes from "@/helpers/routes";

import Image from "next/image";
import SideBar from "@/app/(dashboard)/_components/SideBar"; 
import { Paragraph2 } from "@/app/_components/Typography";
import { ButtonLink } from "../_components";

export default function DashboardLayout({ children }) {
  return (
    <div id="D2L-dashboard">
      <aside id="D2L-sidebar">
        {/* The sidebar's own header, containing the logo. This will be fixed. */}
        <div className="sidebar-header">
          <Image
            className="d2l-icon"
            src={"/icons/d2l.png"} // Make sure this path is correct
            width={35}
            height={35}
            alt="D2L Icon"
          />
          <Paragraph2 className="paragrafo ml-10">
            Dental Second Look
          </Paragraph2>
        </div>

        {/* This wrapper will contain the scrollable list of patients from your SideBar component */}
        <div className="sidebar-content">
          <SideBar />
        </div>
      </aside>

      {/* This is the main page header for "Dashboard", "Patient Details", etc. */}
      <header id="D2L-header">
        <Paragraph2 className="dashboardparagraph2">
          Dashboard
        </Paragraph2>
        <ButtonLink style="width: 40px;" href={routes.IMAGE_VIEWER}>D2L-Viewer</ButtonLink>
        {/* You can add user profile info here */}
      </header>

      {/* This is the main content area that will scroll independently */}
      <main id="D2L-content">
        {children}
      </main>
    </div>
  );
}
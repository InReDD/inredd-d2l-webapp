// app/dashboard/DashboardInteractiveHeader.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/app/_components/Navbar";
import { Paragraph2 } from "@/app/_components/Typography";

export default function DashboardInteractiveHeader() {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <header>
        <div className="col-12 d-flex">
          <div className="col-6 d-flex align-items-center m-24"> {/* Added align-items-center for better vertical alignment */}
            <Image
              className="d2l-icon" // Changed class name to be more conventional
              src={"/icons/d2l.png"}
              width={35}
              height={35}
              alt="D2L Icon"
              onClick={() => setShowNav(!showNav)}
              style={{ cursor: "pointer" }} // Added for better UX to indicate clickability
            />
            <Paragraph2 className="paragrafo ml-10">
              Dental Second Look
            </Paragraph2>
          </div>
          <div className="dashboardheader col-10 d-flex align-items-center justify-content-between">
              <Paragraph2 className="dashboardparagraph2 ml-24">
                Dashboard
              </Paragraph2>
          </div>
        </div>
        
      </header>
      {/* Conditionally render the Navbar based on the showNav state */}
      {showNav && <Navbar />}
    </>
  );
}
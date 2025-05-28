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
        <div className="col-2 d-flex justify-content-between align-items-center"> {/* Added align-items-center for better vertical alignment */}
          <Image
            className="d2l-icon" // Changed class name to be more conventional
            src={"/icons/d2l.png"}
            width={35}
            height={35}
            alt="D2L Icon"
            onClick={() => setShowNav(!showNav)}
            style={{ cursor: "pointer" }} // Added for better UX to indicate clickability
          />
          <Paragraph2 className="paragrafo">
            Dental Second Look
          </Paragraph2>
        </div>
      </header>
      {/* Conditionally render the Navbar based on the showNav state */}
      {showNav && <Navbar />}
    </>
  );
}
import "./style.scss";
import { generateMetadata as generate } from "@/helpers";
import Navbar from "@/app/_components/Navbar";
import Image from "next/image";
// import { useState } from "react";
import { Paragraph2 } from "@/app/_components/Typography";

export async function generateMetadata() {
  return generate({
    title: "Dashboard Home",
    description: "Dental Second Look",
  });
}

export default async function DashboardHome() {
  // const { showNav, setShowNav } = useState(false)
  return (
    <div id="dashboardhome" className="home"> 
      <header>
        <div className="col-2 d-flex justify-content-between">
          <Image
          className="d2l.png"
          src={"/icons/d2l.png"}
          width={35}
          height={35}
          alt="D2L Icon"
          // onClick={() => setShowNav(!showNav)}
          />
          <Paragraph2 className="paragrafo">
              Dental Second Look
          </Paragraph2>
        </div>
      </header>
      
      <Navbar />
      {/* {showNav && <Navbar />} */}
    </div>
  );
}







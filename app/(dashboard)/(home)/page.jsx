// app/dashboard/page.jsx (or your DashboardHome file)
import "./style.scss";
import { generateMetadata as generate } from "@/helpers";
// Navbar and Paragraph2 are now handled by DashboardInteractiveHeader
// Image is also handled by DashboardInteractiveHeader
import SideBar from "./_components/SideBar"; // Adjust path if necessary
import { Paragraph2, Paragraph3 } from "@/app/_components/Typography";

export async function generateMetadata() {
  return generate({
    title: "Dashboard Home",
    description: "Dental Second Look",
  });
}

export default async function DashboardHome() {
  return (
    <div id="dashboardhome" className="home">
      <SideBar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 homepage pl-24">
            <div className="d-flex align-items-center">
              <div className="col-12 card-content mt-32">
                <span className="avatar-text">AA</span>
              </div>
              <div className="text ml-15 pt-32">
                <Paragraph2 className="paragrafo2 fw-bold">
                  Paciente 123
                </Paragraph2>
                <Paragraph3 className="paragrafo3">
                  Since 05/03/2024
                </Paragraph3>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
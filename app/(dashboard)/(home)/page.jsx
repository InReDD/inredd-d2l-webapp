// app/dashboard/page.jsx (or your DashboardHome file)
import "./style.scss";
import { generateMetadata as generate } from "@/helpers";
// Navbar and Paragraph2 are now handled by DashboardInteractiveHeader
// Image is also handled by DashboardInteractiveHeader
import SideBar from "./_components/SideBar"; // Adjust path if necessary
import { Paragraph2, Paragraph3 } from "@/app/_components/Typography";
import { Button } from "@/app/_components";
import Image from "next/image";

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
          <div className="col-12 homepage pl-28 row">

            <div className="col-6">
              <div className="d-flex align-items-center">
                <div className="card-content mt-32">
                  <span className="avatar-text">AA</span>
                </div>
                <div className="ml-15 pt-32 w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Paragraph2 className="paragrafo2 fw-bold">
                      Paciente 123
                    </Paragraph2>
                    <Button type="submit" className="btn-black" size={"small"}>
                      <Image
                        width={16}
                        height={16}
                        src={"/icons/edit-white.png"}
                        alt={"Editar"}
                        className="edit-icon-custom mr-8"
                      />
                      Edit
                    </Button>
                  </div>
                  <Paragraph3 className="paragrafo3">
                    Since 05/03/2024
                  </Paragraph3>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="text pt-32">
                  <Paragraph2 className="paragrafo2 fw-bold">
                    Address
                  </Paragraph2>
                  <Paragraph3 className="paragrafo3 mt-8">
                    Brazil, São Paulo, Ribeirão Preto
                  </Paragraph3>
                </div>
                <div className="text pt-32 ml-62">
                  <Paragraph2 className="paragrafo2 fw-bold">
                    Email
                  </Paragraph2>
                  <Paragraph3 className="paragrafo3 mt-8">
                    pacient@gmail.com
                  </Paragraph3>
                </div>
              </div>
              <div className="text pt-20">
                <Paragraph2 className="paragrafo2 fw-bold">
                  Resume
                </Paragraph2>
                <Paragraph3 className="paragrafo3 mt-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis <br />
                  interdum lorem. Maecenas at orci sapien. In in finibus nisl. Lorem ipsum dolor<br />
                  sit amet, consectetur adipiscing elit.
                </Paragraph3>
              </div>
            </div>

            <div className="col-6 d-flex flex-column align-items-end mt-20">
              <div>
                <Button type="submit" className="btn-black" size={"small"}>
                  New visit
                </Button>
              </div>
              <div className="black-box mt-24">
                <Image
                  width={760}
                  height={399}
                  src={"/images/fotod2l.png"}
                  alt={"Imagem d2l"}
                  
                />
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
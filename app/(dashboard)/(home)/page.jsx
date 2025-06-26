import { generateMetadata as generate } from "@/helpers";

import { Paragraph2, Paragraph3 } from "@/app/_components/Typography";
import { Button } from "@/app/_components";
import Image from "next/image";
import AccordionDashboardD2L from "@/app/_components/Dashboard/AccordionItem";
import routes from "@/helpers/routes";
import ButtonLink from "@/app/_components/ButtonLink";

export async function generateMetadata() {
  return generate({
    title: "Dashboard Home",
    description: "Dental Second Look",
  });
}

export default async function DashboardHome() {
  return (
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
                  <ButtonLink href={routes.EDIT_PAGE} type="submit" className="btn-black" size={"small"}>
                    <Image
                      width={16}
                      height={16}
                      src={"/icons/edit-white.png"}
                      alt={"Editar"}
                      className="edit-icon-custom mr-8"
                    />
                    Edit
                  </ButtonLink>
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

          <div className="accordion mt-62">
            <AccordionDashboardD2L
              initOpen={false}
              iconSrc="/icons/star-d2l.png"
              summary={<span>Auxiliary diagnostic</span>}
            >
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis interdum lorem. Maecenas at orci sapien. In in finibus nisl.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Maecenas quis interdum lorem. Maecenas at orci sapien. In in finibus nisl.Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Maecenas quis interdum lorem. Maecenas at orci sapien. In in finibus nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
                quis interdum lorem. Maecenas at orci sapien. In in finibus nisl.</p>
            </AccordionDashboardD2L>
          </div>
          <div className="accordion mt-20">
            <AccordionDashboardD2L
              initOpen={false}
              summary={<span>Pacient’s visits (08)</span>}
            >
              {/* Cabeçalho da tabela */}
              <div className="visit-table-header d-flex justify-content-between px-3 pt-3">
                <div className="col-1 fw-bold">ID</div>
                <div className="col-3 fw-bold">Visit date</div>
                <div className="col-5 fw-bold">Register</div>
                <div className="col-3 fw-bold text-end">Actions</div>
              </div>
              <div className="divider-line mt-2 mb-3"></div>

              {/* Linhas da tabela */}
              {[12, 13, 14, 15].map((id) => (
                <div key={id} className="visit-row d-flex justify-content-between align-items-start px-3 py-2">
                  <div className="col-1">{id}</div>
                  <div className="col-3">05/10/2024 10:00pm</div>
                  <div className="col-5">
                    Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet,
                    consectetur
                  </div>
                  <div className="col-3 d-flex justify-content-end gap-2">
                    <Button type="submit" className="btn-black" size="small">Analysis</Button>
                    <Button type="submit" className="btn-black" size="small">Record</Button>
                    <Button type="submit" className="btn-black" size="small">Viewer</Button>
                  </div>
                </div>
              ))}
            </AccordionDashboardD2L>
          </div>
          <div className="accordion mt-20">
            <AccordionDashboardD2L
              initOpen={false}
              summary={<span>Exportation</span>}
            >
              <p>Loren ipsun dolor sit.</p>
            </AccordionDashboardD2L>
          </div>
        </div>
      </div>
    </div>
  );
}
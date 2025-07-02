import { generateMetadata as generate } from "@/helpers";
import { getPatientById } from "@/services/patient.service"; // Adjust this import path

import { Paragraph2, Paragraph3 } from "@/app/_components/Typography";
import { Button } from "@/app/_components";
import Image from "next/image";
import ButtonLink from "@/app/_components/ButtonLink";
import { AccordionDashboardD2L } from "@/app/_components";

export async function generateMetadata({ params }) {
  const patient = await getPatientById(params.patientId);
  return generate({
    title: patient ? `Dashboard: ${patient.fullName}` : "Patient Not Found",
    description: `Dashboard for patient ${patient?.fullName || 'N/A'}.`,
  });
}

const getPatientInitials = (name) => {
  if (!name) return "?";
  const parts = name.split(' ');
  return parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
};

export default async function PatientDashboard({ params }) {
  const { patientId } = params;
  let patient = null;
  let error = null;

  try {
    patient = await getPatientById(patientId);
  } catch (e) {
    console.error(`Failed to fetch patient with ID ${patientId}:`, e);
    error = e.message || "Não foi possível carregar os dados do paciente.";
  }

  if (error) {
    return <div className="p-4 text-danger">{error}</div>;
  }

  if (!patient) {
    return <div className="p-4">Paciente não encontrado.</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 homepage pl-28 row">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <div className="card-content mt-32">
                <span className="avatar-text">{getPatientInitials(patient.fullName)}</span>
              </div>
              <div className="ml-15 pt-32 w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <Paragraph2 className="paragrafo2 fw-bold">
                    {patient.fullName}
                  </Paragraph2>
                  <ButtonLink href={`/patients/${patient.id}`} className="btn-black" size={"small"}>
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
                  Paciente desde {new Date(patient.createdAt).toLocaleDateString()}
                </Paragraph3>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="text pt-32">
                <Paragraph2 className="paragrafo2 fw-bold">
                  Address
                </Paragraph2>
                <Paragraph3 className="paragrafo3 mt-8">
                  {patient.address || "Endereço não informado"}
                </Paragraph3>
              </div>
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
              <p>Content for Auxiliary diagnostic...</p>
            </AccordionDashboardD2L>
          </div>

          {/* <PacientVisits patientId={patient.id} /> */}

          <div className="accordion mt-20">
            <AccordionDashboardD2L
              initOpen={false}
              summary={<span>Exportation</span>}
            >
              <p>Content for Exportation...</p>
            </AccordionDashboardD2L>
          </div>

        </div>
      </div>
    </div>
  );
}
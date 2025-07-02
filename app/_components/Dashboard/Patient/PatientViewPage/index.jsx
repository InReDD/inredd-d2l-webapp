import { generateMetadata as generate } from "@/helpers";
import { getPatientById } from "@/services/patient";

import { Paragraph2, Paragraph3 } from "@/app/_components/Typography";
import { Button } from "@/app/_components";
import Image from "next/image";
import { AccordionDashboardD2L } from "@/app/_components";

import PatientsVisits from "@/app/_components/Dashboard/Patient/PatientVisits";

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

const InfoField = ({ label, value }) => (
  <div className="text pt-32">
    <Paragraph2 className="paragrafo2 fw-bold">{label}</Paragraph2>
    <Paragraph3 className="paragrafo3 mt-8">{value || "Não informado"}</Paragraph3>
  </div>
);

export default function PatientViewPage({ patient, onEditClick  }) {
  const { id, fullName, createdAt, address, sex, dateOfBirth } = patient;

  const patientDetails = [
    { label: "Sex", value: sex },
    { label: "Date of Birth", value: new Date(dateOfBirth).toLocaleDateString() }
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 homepage pl-28 row">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <div className="card-content mt-32">
                <span className="avatar-text">{getPatientInitials(fullName)}</span>
              </div>
              <div className="ml-15 pt-32 w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <Paragraph2 className="paragrafo2 fw-bold">
                    {fullName}
                  </Paragraph2>
                  <Button onClick={onEditClick} className="btn-black" size={"small"}>
                    <Image
                      width={8}
                      height={8}
                      src={"/icons/edit-white.png"}
                      alt={"Editar"}
                      className="edit-icon-custom mr-8"
                    />
                    Edit
                  </Button>
                </div>
                {/* <Paragraph3 className="paragrafo3">
                  Paciente desde {new Date(patient.createdAt).toLocaleDateString()}
                </Paragraph3> */}
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-start flex-wrap">
                {patientDetails.map((detail, index) => (
                  <div key={detail.label} className={index > 0 ? 'ml-62' : ''}>
                    <InfoField label={detail.label} value={detail.value} />
                  </div>
                ))}
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
                width={400}
                height={200}
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

          <PatientsVisits patientId={patient.id} />

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
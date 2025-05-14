import { Paragraph1, Title } from "@/app/_components/Typography";
import { UserDetails } from "../../_components";
import "./style.scss";
import { notFound } from "next/navigation";
import { generateMetadata } from "@/helpers";
import routes from "@/helpers/routes";
import { BackButton, Button, CardSolution } from "@/app/_components";
import { DateTime } from "luxon";

export const metadata = generateMetadata({
  title: "Access Request Details",
  description: "Details from a Access Request",
});

export default function AccessRequestId({ params }) {
  if (!params.id) {
    return notFound();
  }

  const data = {
    src: null,
    name: "Alessandra Alaniz Macedo",
    instituition: "DCM - USP",
    title: "Profa. Dra.",
    address: "Brazil, São Paulo, Ribeirão Preto",
    email: "ale.alaniz@usp.br",
    contact: "(16) 99999-9999",
    createdAt: new Date().toISOString(),
    group: 1,
    groupSignedAt: new Date().toISOString(),
    lastRequestAt: null,
    acceptTermsAt: new Date().toISOString(),
    groupName: "Coordinating Professors",
    resumeImported: false,
    resumeId: "174548",
    bio: `Graduação em Odontologia pela Faculdade de Odontologia de Ribeirão Preto, Universidade de SãoPaulo– FORP/USP (1998)
        Mestrado e Doutorado em Reabilitação Oral pela Faculdade de Odontologia de Ribeirão Preto, Universidade de São Paulo– FORP/USP`,
    hasAccessToOpenData: false,
    hasAccessToD2L: true,
  };

  return (
    <main id="collaborator-id">
      <div className="row mb-20">
        <div className="col-12">
          <Title className={"d-flex"}>
            <BackButton className="mr-8" href={routes.ACCESS_REQUESTS} />
            Access request details
          </Title>
        </div>
      </div>
      <UserDetails data={data} noEdit />
      <div className="row mt-32 mb-20">
        <div className="col-12">
          <Paragraph1>Solution request</Paragraph1>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-5 mb-24">
          <CardSolution
            title={"Dental Second Look (D2L)"}
            icon={"/icons/d2l.png"}
            description={
              "A pesquisadora tem trabalhado interdisciplinarmente em colaboração com pesquisadores dentro e fora da Odontologia"
            }
            link={"/"}
            moreInfoLink={routes.D2L}
            noAccess
          />
        </div>
        <div className="col-12 col-lg-7 d-flex flex-column justify-content-between">
          <div className="row">
            <div className="col-12">
              <p className="mb-24">
                User has requested access to <strong>Open Data</strong>{" "}
                solution. You can <strong>ACCEPT</strong>
                or <strong>REJECT</strong> this request.
              </p>
            </div>
            <div className="col-6">
              <p>
                <strong>Accepted terms on</strong>
              </p>
              <p>
                {data.acceptTermsAt
                  ? DateTime.fromISO(data.acceptTermsAt).toFormat(
                      "LLLL dd, yyyy",
                    )
                  : "-"}
              </p>
            </div>
            <div className="col-6">
              <p>
                <strong>Last request on</strong>
              </p>
              <p>
                {data.lastRequestAt
                  ? DateTime.fromISO(data.lastRequestAt).toFormat(
                      "LLLL dd, yyyy",
                    )
                  : "-"}
              </p>
            </div>
          </div>
          <div className="row mt-24">
            <div className="col-12 d-flex justify-content-end">
              <Button size={"medium"} variant={"white"} className={"mr-16"}>
                Reject
              </Button>
              <Button size={"medium"}>Accept</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

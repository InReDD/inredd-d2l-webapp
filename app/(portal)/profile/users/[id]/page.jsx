import { Title } from "@/app/_components/Typography";
import { UserDetails } from "../../_components";
import "./style.scss";
import { notFound } from "next/navigation";
import { generateMetadata } from "@/helpers";
import routes from "@/helpers/routes";
import { BackButton, Button } from "@/app/_components";

export const metadata = generateMetadata({
  title: "User Details",
  description: "Details from a User",
});

export default function UserId({ params }) {
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
    group: null,
    groupSignedAt: new Date().toISOString(),
    groupName: "Coordinating Professors",
    resumeImported: false,
    resumeId: "174548",
    bio: `Graduação em Odontologia pela Faculdade de Odontologia de Ribeirão Preto, Universidade de SãoPaulo– FORP/USP (1998)
        Mestrado e Doutorado em Reabilitação Oral pela Faculdade de Odontologia de Ribeirão Preto, Universidade de São Paulo– FORP/USP`,
    hasAccessToOpenData: false,
    hasAccessToD2L: true,
  };

  return (
    <main id="user-id">
      <div className="row mb-20">
        <div className="col-12">
          <Title className={"d-flex"}>
            <BackButton className="mr-8" href={routes.USERS} />
            User details
          </Title>
        </div>
      </div>
      <UserDetails data={data} />
      <div className="row mt-24">
        <div className="col-12 d-flex justify-content-end">
          <Button size={"small"} variant={"error"}>
            Delete user
          </Button>
        </div>
      </div>
    </main>
  );
}

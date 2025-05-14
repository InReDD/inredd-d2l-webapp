import { Title } from "@/app/_components/Typography";
import { GroupDetails } from "../../_components";
import "./style.scss";
import { notFound } from "next/navigation";
import { generateMetadata as generate } from "@/helpers";
import routes from "@/helpers/routes";
import { BackButton, Button } from "@/app/_components";

export async function generateMetadata({ params }) {
  const isNew = params.id === "new";

  return generate({
    title: isNew ? "Create New Group" : "Edit Group",
    description: `${isNew ? "Create" : "Edit"} a Group`,
  });
}

export default function GroupId({ params }) {
  if (!params.id) {
    return notFound();
  }

  const isNew = params.id === "new";

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
    <main id="group-id">
      <div className="row mb-20">
        <div className="col-12">
          <Title className={"d-flex"}>
            <BackButton className="mr-8" href={routes.GROUPS} />
            {isNew ? "New group" : "Edit group"}
          </Title>
        </div>
      </div>
      <GroupDetails data={data} isNew={isNew} />
      {!isNew && (
        <div className="row mt-24">
          <div className="col-12 d-flex justify-content-end">
            <Button size={"small"} variant={"error"}>
              Delete group
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

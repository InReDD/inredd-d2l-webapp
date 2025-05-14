import { Title } from "@/app/_components/Typography";
import "./style.scss";
import { CardSolution, SearchInput } from "@/app/_components";
import routes from "@/helpers/routes";
import { generateMetadata as generate } from "@/helpers";

export async function generateMetadata() {
  return generate({
    title: "My solutions",
    description: "Get access your InReDD solutions",
  });
}

export default function MySolutions() {
  return (
    <main id="my-solutions">
      <div className="container pt-52 pb-52">
        <div className="row mb-40">
          <div className="col-12 text-center">
            <Title>My solutions</Title>
          </div>
        </div>
        <div className="row mb-52">
          <div className="col-12 col-lg-6 offset-lg-3">
            <SearchInput disableOptions placeholder="Search for a solution" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-4 mb-16">
            <CardSolution
              title={"Dental Second Look (D2L)"}
              icon={"/icons/d2l.png"}
              description={
                "A pesquisadora tem trabalhado interdisciplinarmente em colaboração com pesquisadores dentro e fora da Odontologia"
              }
              link={"/"}
              moreInfoLink={routes.D2L}
            />
          </div>
          <div className="col-12 col-lg-4">
            <CardSolution
              title={"Open Data"}
              icon={"/icons/open-data.png"}
              description={
                "A pesquisadora tem trabalhado interdisciplinarmente em colaboração com pesquisadores dentro e fora da Odontologia..."
              }
              link={"/"}
              moreInfoLink={routes.OPEN_DATA}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

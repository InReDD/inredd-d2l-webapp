import { Paragraph1, SubTitle, Title } from "@/app/_components/Typography";
import "./style.scss";
import { generateMetadata as generate } from "@/helpers";

export async function generateMetadata() {
  return generate({
    title: "Dashboard Home",
    description: "Dental Second Look",
  });
}

export default async function DashboardHome() {

  return (
    <main id="dashboardhome">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center flex-column-reverse flex-lg-row justify-content-center">
          
          </div>
        </div>
      </div>
    </main>
  );
}

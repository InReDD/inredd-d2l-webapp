import { Title } from "@/app/_components/Typography";
import "./style.scss";
import { generateMetadata } from "@/helpers";

export const metadata = generateMetadata({
  title: "Open Data",
  description: "See Open Data statistics",
});

export default function OpenData() {
  return (
    <main id="open-data">
      <div className="row mb-20">
        <div className="col-12">
          <Title>Open Data</Title>
        </div>
      </div>
    </main>
  );
}

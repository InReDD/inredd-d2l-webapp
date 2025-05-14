import { Title } from "@/app/_components/Typography";
import "./style.scss";
import { generateMetadata } from "@/helpers";

export const metadata = generateMetadata({
  title: "Dental Second Look (D2L)",
  description: "See Dental Second Look (D2L) statistics",
});

export default function DentalSecondLook() {
  return (
    <main id="dental-second-look">
      <div className="row mb-20">
        <div className="col-12">
          <Title>Dental Second Look (D2L)</Title>
        </div>
      </div>
    </main>
  );
}

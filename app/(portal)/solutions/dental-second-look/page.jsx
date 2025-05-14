import { Paragraph1, Title } from "@/app/_components/Typography";
import "./style.scss";
import Image from "next/image";
import CardRequest from "@/app/_components/CardRequest";
import { generateMetadata as generate } from "@/helpers";

export async function generateMetadata() {
  return generate({
    title: "Dental Second Look Solution",
    description: "InReDD's access for D2L. Learn about the AI tool.",
  });
}

export default function D2L() {
  return (
    <main id="d2l">
      <div className="container mb-120">
        <div className="row justify-content-center mt-80">
          <div className="icon col-lg-1 flex-column align-items-center mr-4">
            <Image
              className=""
              src="/icons/d2l-primary.png"
              width={60}
              height={60}
              alt="Dental Second Look Icon"
            />
          </div>
          <div className="col-lg-7">
            <Title className="title-d2l align-items-center">
              Dental Second Look
            </Title>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <Paragraph1 className="paragrafo-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              quis interdum lorem. Maecenas at orci sapien. In in finibus
              nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Maecenas quis interdum lorem. Maecenas at orci sapien. In in
              finibus nisl.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Maecenas quis interdum lorem. Maecenas at orci sapien. In in
              finibus nisl.
            </Paragraph1>
          </div>
          <div className="col-lg-6">
            <Paragraph1 className="paragrafo-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              quis interdum lorem. Maecenas at orci sapien. In in finibus
              nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Maecenas quis interdum lorem. Maecenas at orci sapien. In in
              finibus nisl.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Maecenas quis interdum lorem. Maecenas at orci sapien. In in
              finibus nisl.
            </Paragraph1>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5">
            <CardRequest className="card-request" />
          </div>
          <div className="col-1"></div>
          <div className="col-lg-6">
            <Image
              className="video"
              src="/images/foto-video-solutions.png"
              width={558}
              height={284}
              alt="Video"
            />
          </div>
        </div>
      </div>
      <Image
        className="solutions"
        src="/images/solutions-image.png"
        width={1094}
        height={521}
        alt="Solutions"
      />
    </main>
  );
}

import { Paragraph1, Title } from "@/app/_components/Typography";
import "./style.scss";
import Image from "next/image";
import CardRequest from "@/app/_components/CardRequest";
import { generateMetadata as generate } from "@/helpers";

export async function generateMetadata() {
  return generate({
    title: "Open Data Solution",
    description:
      "InReDD's access for Open Data. Access the dental data collection.",
  });
}

export default function OpenData() {
  return (
    <main id="open-data">
      <div className="container mb-120">
        <div className="row justify-content-center mt-80">
          <div className="icon col-lg-1 flex-column align-items-center">
            <Image
              className=""
              src="/icons/open-data-primary.png"
              width={60}
              height={60}
              alt="Open Data Icon"
            />
          </div>
          <div className="col-lg-4 p-0">
            <Title className="title-open-data align-items-center">
              Open Data
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

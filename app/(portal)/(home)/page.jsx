import { Paragraph1, SubTitle, Title } from "@/app/_components/Typography";
import "./style.scss";
import Image from "next/image";
import CardPaper from "@/app/_components/CardPaper";
import CardMember from "@/app/_components/CardMember";
import { ButtonLink } from "@/app/_components";
import routes from "@/helpers/routes";
import { generateMetadata as generate } from "@/helpers";
import { getPapers } from "@/services/papers";
import { getMembers } from "@/services/members";

export async function generateMetadata() {
  return generate({
    title: "Home Page",
    description: "Get to know InReDD",
  });
}

export default async function Home() {
  const papers = await getPapers();
  const members = await getMembers();

  return (
    <main id="home">
      <div className="bg-home">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center flex-column-reverse flex-lg-row justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <Title className="main-title text-primary-1">InReDD</Title>
                <Title className="main-subtitle text-primary-1">
                  INTERDISCIPLINARY RESEARCH GROUP IN DIGITAL DENTISTRY
                </Title>
              </div>
              <Image
                className="inreed-main-logo"
                src={"/images/inredd-main-logo.png"}
                width={529}
                height={568}
                alt="InReDD's Group Icon"
              />
            </div>
          </div>
        </div>
      </div>
      <section id={"about-us"} className="container">
        <div className="row mt-120">
          <div className="col-12">
            <Title className={"text-center text-lg-start"}>Who we are</Title>
          </div>
          <div className="col-12">
            <Paragraph1 className={"text-center text-lg-start"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              quis interdum lorem. Maecenas at orci sapien. In in finibus nisl.
              Ut bibendum pulvinar ex, eget aliquet lorem venenatis eu. Mauris
              tempor velit vitae sodales ultrices. Nam at luctus nisl, nec
              vestibulum urna. Integer dui risus, ullamcorper a interdum at,
              sagittis nec justo. Aliquam ultricies turpis id tellus volutpat
              ullamcorper.
            </Paragraph1>
          </div>
        </div>
        <div className="vector-row row mt-80">
          <div className="col-12 col-lg-6">
            <div className="row mb-52">
              <div className="col-12">
                <SubTitle className="fw-bold mb-12">
                  <span className="text-grey-1">Our</span> mission
                </SubTitle>
              </div>
              <div className="col-12">
                <Paragraph1>
                  Assess, innovate, and disseminate the applicability of digital
                  technologies in Dentistry.
                </Paragraph1>
              </div>
            </div>
            <div className="row mb-52">
              <div className="col-12">
                <SubTitle className="fw-bold mb-12">
                  <span className="text-grey-1">Our</span> vision
                </SubTitle>
              </div>
              <div className="col-12">
                <Paragraph1>
                  To be a reference in studies involving the use clinical images
                  and Artificial Intelligence in Dentistry, and virtual
                  platforms for work and teaching in Dentistry.
                </Paragraph1>
              </div>
            </div>
            <div className="row mb-52">
              <div className="col-12">
                <SubTitle className="fw-bold mb-12">
                  <span className="text-grey-1">Our</span> values
                </SubTitle>
              </div>
              <div className="col-12">
                <Paragraph1>
                  To work ethically and based on science, to enhance the
                  training and tools of dentists, and deliver the best and most
                  efficient treatment to patients.
                </Paragraph1>
              </div>
            </div>
          </div>
          <div className="vector-wrapper col-12 col-md-6">
            <div className="vector-1"></div>
          </div>
        </div>
        {!!members.length && (
          <section id={"group-heads"} className="row mt-80">
            <div className="col-12">
              <SubTitle className="text-center fw-bold mb-32">
                Group heads
              </SubTitle>
            </div>
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {members
                  .reduce((acc, _, i) => {
                    if (i % 3 === 0) {
                      const group = members.slice(i, i + 3);
                      acc.push(group);
                    }
                    return acc;
                  }, [])
                  .map((group, groupIndex) => (
                    <div
                      key={groupIndex}
                      className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
                    >
                      <div className="d-flex justify-content-center gap-3">
                        {group.map((member, index) => (
                          <div
                            key={index}
                            className="flex-fill mx-2"
                            style={{ minWidth: 0 }}
                          >
                            {/* <CardMember
                              // imageSrc={member.profileURL}
                              // title={member.name}
                              // subtitle={member.filiation}
                            >
                              {member.resume}
                            </CardMember> */}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="col-12 d-flex justify-content-center mt-52 mb-80">
              <ButtonLink href={routes.MEMBERS}>Know all members</ButtonLink>
            </div>
          </section>
        )}
      </section>

      <div className="bg-solutions">
        <section id={"solutions"} className="container">
          <div className="row">
            <Image
              className="solutions-image"
              src={"/images/solutions-image.png"}
              width={1094}
              height={521}
              alt="Solutions Image"
            />
            <div>
              <Title className="text-neutral-2 text-center mt-20 mb-12">
                Solutions
              </Title>
            </div>
            <div className="col-12 mt-2 mb-5">
              <Paragraph1 className={"text-center text-lg-start"}>
                <span className="text-neutral-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas quis interdum lorem. Maecenas at orci sapien. In in
                  finibus nisl. Ut bibendum pulvinar ex, eget aliquet lorem
                  venenatis eu ipsum dolor sit.
                </span>
              </Paragraph1>
            </div>
            <Image
              className="foto-video-solutions"
              src={"/images/foto-video-solutions.png"}
              width={1140}
              height={566}
              alt="Video"
            />
            <div className="container mt-80 mb-3">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <SubTitle
                    className={
                      "d-flex flex-column align-items-center text-center flex-lg-row"
                    }
                  >
                    <Image
                      className="open-data-icon mr-8"
                      src={"/icons/open-data-white.png"}
                      width={60}
                      height={60}
                      alt="Open Data Icon"
                    />
                    <span className="text-neutral-2">Open Data</span>
                  </SubTitle>
                  <div className="col-12">
                    <Paragraph1 className={"text-center text-lg-start"}>
                      <span className="text-neutral-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas quis interdum lorem. Maecenas at orci sapien.
                      </span>
                    </Paragraph1>
                  </div>
                  <div className="mt-3 mb-5 d-flex justify-content-center justify-content-center justify-content-lg-start">
                    <ButtonLink href={routes.OPEN_DATA}>
                      Request access
                    </ButtonLink>
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <SubTitle
                    className={
                      "d-flex flex-column align-items-center text-center flex-lg-row"
                    }
                  >
                    <Image
                      className="d2l-icon mr-8 d-block"
                      src={"/icons/d2l-white.png"}
                      width={60}
                      height={60}
                      alt="Dental Second Look Icon"
                    />
                    <span className="text-neutral-2">Dental Second Look</span>
                  </SubTitle>
                  <div className="col-12">
                    <Paragraph1 className={"text-center text-lg-start"}>
                      <span className="text-neutral-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas quis interdum lorem. Maecenas at orci sapien.
                        In in finibus nisl.
                      </span>
                    </Paragraph1>
                  </div>
                  <div className="mt-3 mb-5 d-flex justify-content-center justify-content-center justify-content-lg-start">
                    <ButtonLink href={routes.D2L}>Request access</ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {!!papers.length && (
        <section id={"recent-papers"} className="container">
          <div className="row mt-80 mb-80 ">
            <div className="col-12 mt-5">
              <Title className={"text-center text-lg-start"}>
                Recent papers
              </Title>
            </div>
            {papers.map((paper, index) => (
              <div className="col-12 col-lg-6 mb-16">
                {/* <CardPaper
                  // key={index}
                  // title={paper.title}
                  // authors={paper.authors}
                  // // link={paper.url}
                  // keywords={paper.keywords}
                /> */}
              </div>
            ))}
            <div className="col-12 mt-5 mb-5 d-flex justify-content-center">
              <ButtonLink href={routes.DIGITAL_LIBRARY}>
                View all papers
              </ButtonLink>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

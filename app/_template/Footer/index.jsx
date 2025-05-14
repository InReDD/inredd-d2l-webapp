import { Paragraph2, SubTitle, Title } from "@/app/_components/Typography";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";
import routes from "@/helpers/routes";

export default async function Footer() {
  return (
    <div className="footer-container">
      <div className="container pt-80 pb-32">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3 d-none d-lg-block">
                <Title className="main-title text-neutral-2">InReDD</Title>
                <Title className="main-subtitle text-neutral-2 mb-0">
                  INTERDISCIPLINARY RESEARCH GROUP IN DIGITAL DENTISTRY
                </Title>
              </div>
              <div className="col-0 col-lg-1"></div>
              <div className="col-6 col-lg-2">
                <SubTitle className="find-out d-flex justify-content-start mb-12">
                  Find Out
                </SubTitle>
                <Link
                  href={routes.HOME + "#about-us"}
                  className="about-us d-flex justify-content-start"
                >
                  About us
                </Link>
                <Link
                  href={routes.HOME + "#group-heads"}
                  className="group-heads d-flex justify-content-start"
                >
                  Group heads
                </Link>
                <Link
                  href={routes.HOME + "#solutions"}
                  className="solutions-1 d-flex justify-content-start"
                >
                  Solutions
                </Link>
                <Link
                  href={routes.HOME + "#recent-papers"}
                  className="recent-publications d-flex justify-content-start"
                >
                  Recent papers
                </Link>

                <SubTitle className="research-group d-flex justify-content-start mb-12 mt-12">
                  Research Group
                </SubTitle>
                <Link
                  href={routes.MEMBERS}
                  className="team-members d-flex justify-content-start"
                >
                  Team members
                </Link>
              </div>
              <div className="col-6 col-lg-2">
                <SubTitle className="digital-library d-flex justify-content-start mb-12">
                  Digital Library
                </SubTitle>
                <Link
                  href={routes.DIGITAL_LIBRARY}
                  className="search d-flex justify-content-start"
                >
                  Search
                </Link>

                <SubTitle className="solutions-2 d-flex justify-content-start mb-12 mt-12">
                  Solutions
                </SubTitle>
                <Link
                  href={routes.OPEN_DATA}
                  className="open-data d-flex justify-content-start"
                >
                  Open data
                </Link>
                <Link
                  href={routes.D2L}
                  className="d2l d-flex justify-content-start"
                >
                  Dental second look
                </Link>
              </div>
              <div className="col-0 col-lg-1"></div>
              <div className="col-12 col-lg-3 d-flex flex-lg-column flex-wrap align-lg-items-start mt-32 mt-lg-0">
                <div className="col-6">
                  <SubTitle className="email d-flex justify-content-start mb-12">
                    Contacts
                  </SubTitle>
                  <div className="d-flex align-items-center">
                    <Link href={routes.FACEBOOK} className="facebook">
                      <Image
                        className="facebook-icon mb-0 mr-16"
                        src={"/icons/facebook-white.png"}
                        width={32}
                        height={32}
                        alt="Facebook Icon"
                      />
                    </Link>
                    <Link href={routes.INSTAGRAM} className="instagram">
                      <Image
                        className="instagram-icon mb-0 mr-16"
                        src={"/icons/instagram-white.png"}
                        width={32}
                        height={32}
                        alt="Instagram Icon"
                      />
                    </Link>
                    <Link href={routes.LINKEDIN} className="linkedin">
                      <Image
                        className="linkedin-icon mb-0"
                        src={"/icons/linkedin-white.png"}
                        width={32}
                        height={32}
                        alt="LinkedIn Icon"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-6">
                  <SubTitle className="email d-flex justify-content-start mb-12 mt-12">
                    E-mail
                  </SubTitle>
                  <SubTitle className="mail mb-0 d-flex justify-content-start">
                    <Link
                      className="text-neutral-2"
                      href={"mailto:inredd@usp.br"}
                    >
                      inredd@usp.br
                    </Link>
                  </SubTitle>
                </div>
                <div>
                  <SubTitle className="phone d-flex justify-content-start mb-12 mt-12">
                    Phone
                  </SubTitle>
                  <SubTitle className="number mb-0 d-flex justify-content-start">
                    <Link
                      className="text-neutral-2"
                      href={"tel:+55 (16) 3701-3213"}
                    >
                      +55 (16) 3701-3213
                    </Link>
                  </SubTitle>
                </div>
              </div>
              <div className="col-8 offset-2 d-lg-none mt-32 mt-lg-0">
                <Title className="main-title text-neutral-2 text-center">
                  InReDD
                </Title>
                <Title className="main-subtitle text-neutral-2 text-center">
                  INTERDISCIPLINARY RESEARCH GROUP IN DIGITAL DENTISTRY
                </Title>
              </div>
              <div className="hline mt-80 mb-28"></div>
              <div className="col-12 col-lg-8 text-center text-lg-start">
                <Paragraph2 className="copyright mb-8">
                  Copyright © 2024 InReDD. All rights reserved InReDD -
                  Ribeirão Preto, São Paulo, Brazil.
                </Paragraph2>
                <Link href={routes.PRIVACY_POLICY} className="privacy-policy">
                  Privacy Policy
                </Link>
                <spam className="vertical-bar ml-12 mr-12"> | </spam>
                <Link href={routes.ACCEPT_TERMS} className="accept-terms">
                  Accept Terms
                </Link>
              </div>
              <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end align-items-center mt-32 mt-lg-0">
                <Image
                  className="mb-0 mr-10"
                  src={"/images/logo-dcm.png"}
                  width={80}
                  height={38}
                  alt="DCM Image"
                />
                <Image
                  className="mb-0 mr-10"
                  src={"/images/logo-forp.png"}
                  width={46}
                  height={49}
                  alt="FORP Image"
                />
                <Image
                  className="mb-0"
                  src={"/images/logo-usp.png"}
                  width={104}
                  height={40}
                  alt="USP Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

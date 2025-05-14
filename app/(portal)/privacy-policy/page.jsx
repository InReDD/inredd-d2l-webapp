import { Paragraph2, Paragraph1, Title } from "@/app/_components/Typography";
import "./style.scss";
import React from "react";
import { generateMetadata as generate } from "@/helpers";

export async function generateMetadata() {
  return generate({
    title: "Privacy Policy",
    description: "InReDD's Privacy Policy",
  });
}

export default function PrivacyPolicy() {
  return (
    <main id="privacy-policy">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-lg-3 text-center text-lg-start mt-62">
            <Paragraph1>
              <span className="text-neutral-1 fw-bold">Summary</span>
            </Paragraph1>
            <Paragraph2 className="mt-12 mb-12">
              <span className="text-primary-1 fw-bold ml-14">
                1. Personal data
              </span>
            </Paragraph2>
            <Paragraph2 className="mt-12 mb-12">
              <span className="text-neutral-1 ml-14">2. Personal data</span>
            </Paragraph2>
            <Paragraph2 className="mt-12 mb-12">
              <span className="text-neutral-1 ml-14">3. Personal data</span>
            </Paragraph2>
            <Paragraph2 className="mt-12 mb-12">
              <span className="text-neutral-1 ml-14">4. Personal data</span>
            </Paragraph2>
            <Paragraph2 className="mt-12 mb-12">
              <span className="text-neutral-1 ml-28">4.1 Personal data</span>
            </Paragraph2>
            <Paragraph2 className="mt-12 mb-12">
              <span className="text-neutral-1 ml-28">4.2 Personal data</span>
            </Paragraph2>
            <Paragraph2 className="mt-12 mb-12">
              <span className="text-neutral-1 ml-14">5. Personal data</span>
            </Paragraph2>
            <Paragraph2 className="mt-12 mb-12">
              <span className="text-neutral-1 ml-14">6. Personal data</span>
            </Paragraph2>
            <Paragraph2 className="mt-12 mb-12">
              <span className="text-neutral-1 ml-14">7. Personal data</span>
            </Paragraph2>
          </div>

          <div className="col-12 col-lg-9 mb-120">
            <div className="text-center mb-16 mt-62">
              <Title>
                <span className="text-neutral-1">Privacy Policy</span>
              </Title>
            </div>
            <Paragraph2 className="mb-16 paragraph-line-height text-center text-lg-start">
              <span className="text-neutral-1">
                Graduação em Odontologia pela Faculdade de Odontologia de
                Ribeirão Preto, Universidade de São Paulo– FORP/USP (1998).
                <br />
                Mestrado e Doutorado em Reabilitação Oral pela Faculdade de
                Odontologia de Ribeirão Preto,
                <br />
                Universidade de São Paulo– FORP/USP.
              </span>
            </Paragraph2>
            <Paragraph2 className="mb-16 paragraph-line-height text-center text-lg-start">
              <span className="text-neutral-1">
                Graduação em Odontologia pela Faculdade de Odontologia de
                Ribeirão Preto, Universidade de São Paulo– FORP/USP (1998).
                <br />
                Mestrado e Doutorado em Reabilitação Oral pela Faculdade de
                Odontologia de Ribeirão Preto,
                <br />
                Universidade de São Paulo– FORP/USP.
              </span>
            </Paragraph2>
            <Paragraph2 className="mb-16 paragraph-line-height text-center text-lg-start">
              <span className="text-neutral-1">
                Graduação em Odontologia pela Faculdade de Odontologia de
                Ribeirão Preto, Universidade de São Paulo– FORP/USP (1998).
                <br />
                Mestrado e Doutorado em Reabilitação Oral pela Faculdade de
                Odontologia de Ribeirão Preto,
                <br />
                Universidade de São Paulo– FORP/USP.
              </span>
            </Paragraph2>
            <Paragraph2 className="mb-16 paragraph-line-height text-center text-lg-start">
              <span className="text-neutral-1">
                Graduação em Odontologia pela Faculdade de Odontologia de
                Ribeirão Preto, Universidade de São Paulo– FORP/USP (1998).
                <br />
                Mestrado e Doutorado em Reabilitação Oral pela Faculdade de
                Odontologia de Ribeirão Preto,
                <br />
                Universidade de São Paulo– FORP/USP.
              </span>
            </Paragraph2>
            <Paragraph2 className="mb-80 paragraph-line-height text-center text-lg-start">
              <span className="text-neutral-1">
                Graduação em Odontologia pela Faculdade de Odontologia de
                Ribeirão Preto, Universidade de São Paulo– FORP/USP (1998).
                <br />
                Mestrado e Doutorado em Reabilitação Oral pela Faculdade de
                Odontologia de Ribeirão Preto,
                <br />
                Universidade de São Paulo– FORP/USP.
              </span>
            </Paragraph2>
          </div>
        </div>
      </div>
    </main>
  );
}

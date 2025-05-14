import { Paragraph1, Title } from "@/app/_components/Typography";
import "./style.scss";
import { Accordion } from "@/app/_components";
import { CheckBox } from "@/app/_components/Form";
import { Dropdown } from "@/app/_components";
import { Pagination } from "@/app/_components";
import React from "react";
import { MemberResult } from "./_components";
import { generateMetadata as generate } from "@/helpers";

export async function generateMetadata() {
  return generate({
    title: "Members",
    description: "InReDD's Team members. Know the professionals behind it.",
  });
}

export default function Members() {
  const members = [
    {
      name: "Alessandra Alaniz Macedo",
      institution: "DCM - USP",
      title: "Profa. Dra.",
      resume:
        "Graduação em Ciências da Computação pela Universidade Estadual de Londrina (1996) Mestrado e Doutorado em Ciências da Computação pela Universidade de São Paulo (USP – São Carlos)",
      showMore: "dasd",
      profilePicture: "/images/alessandra.png",
    },
    {
      name: "Camila Tirapelli",
      institution: "FORP - USP",
      title: "Profa. Dra.",
      resume:
        "Graduação em Odontologia pela Faculdade de Odontologia de Ribeirão Preto, Universidade de São Paulo– FORP/USP (1998) Mestrado e Doutorado em Reabilitação Oral pela Faculdade de Odontologia de Ribeirão Preto, Universidade de São Paulo– FORP/USP",
      showMore: "dasd",
      profilePicture: "/images/camila.png",
    },
  ];

  return (
    <main id="members">
      <div className="bg-members pb-80 pt-80">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-20">
              <Title>
                <span className="text-primary-1">Members</span>
              </Title>
            </div>
            <div className="col-12 col-md-10 mx-auto text-center">
              <Paragraph1>
                <span className="text-neutral-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas quis interdum lorem. Maecenas at orci sapien. In in
                  finibus nisl.
                </span>
              </Paragraph1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-52 mb-28">
        <div className="row align-items-center">
          <div className="main-showing col-12 col-lg-6 text-center text-lg-start mb-10 mb-lg-0">
            <Paragraph1>
              Showing <span className="fw-bold">1-25</span> of{" "}
              <span className="fw-bold">1,331</span> results
            </Paragraph1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="hline mt-28"></div>
          </div>
          <div className="col-3 filters">
            <div className="mt-28 mb-16">
              <Paragraph1>
                <span className="fw-bold">Filters</span>
              </Paragraph1>
            </div>
            <div className="col-12">
              <Accordion summary={"Groups"}>
                <CheckBox className="mb-0">Coordinating Professors</CheckBox>
                <CheckBox className="mb-0">Postdoctoral</CheckBox>
                <CheckBox className="mb-0">Doctorate</CheckBox>
                <CheckBox className="mb-0">Master&aposs</CheckBox>
                <CheckBox className="mb-0">Scientific Initiation</CheckBox>
                <CheckBox className="mb-0">Collaborating Researchers</CheckBox>
              </Accordion>
            </div>
          </div>
          <div className="col-12 col-lg-9">
            <div className="mt-28 mb-32 d-flex align-items-center justify-content-end">
              <Dropdown title="Sort by"></Dropdown>
            </div>
            <div className="row">
              {members.map((member, index) => (
                <React.Fragment key={index}>
                  <MemberResult data={member} />
                  <div className="hline mt-32 mb-24"></div>
                </React.Fragment>
              ))}
            </div>

            <div className="mt-24 mb-120 d-flex justify-content-center">
              <Pagination
                meta={{ page: 1, lastPage: 25 }}
                params={{ page: 1, perPage: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

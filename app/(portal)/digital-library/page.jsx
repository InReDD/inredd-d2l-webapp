import "./style.scss";
import { Paragraph1, SubTitle, Title } from "@/app/_components/Typography";
import {
  Accordion,
  Button,
  Dropdown,
  Pagination,
  SearchInput,
} from "@/app/_components";
import { CheckBox } from "@/app/_components/Form";
import { PaperResult } from "./_components";
import React from "react";
import { getPapers } from "@/services/papers";
import { generateMetadata as generate } from "@/helpers";

export async function generateMetadata() {
  return generate({
    title: "Digital Library",
    description: "Search for our group publications.",
  });
}

export default async function Library() {
  const papers = await getPapers();

  return (
    <main id="library">
      <div className="bg-library pt-80 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="d-flex flex-column align-items-center text-center">
                <Title className="main-title text-primary-1 mb-20">
                  Digital Library
                </Title>
                <Paragraph1 className="main-subtitle text-neutral-2 col-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas quis interdum lorem. Maecenas at orci sapien. In in
                  finibus nisl.
                </Paragraph1>
                <div className=" col-12 col-6 col-lg-6 mt-52">
                  <SearchInput className="search"></SearchInput>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container mt-52 mb-28">
        <div className="row align-items-center">
          <div className="main-showing col-12 col-lg-6 text-center text-lg-start mb-10 mb-lg-0">
            <Paragraph1>
              Showing <span className="fw-bold">1-25</span> of{" "}
              <span className="fw-bold">1,331</span> results
            </Paragraph1>
          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <Button className="export mr-8" size="medium">
              Export
            </Button>
            <Button className="set-alert" size="medium">
              Set alert
            </Button>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="hline mt-28"></div>
            </div>
            <div className="col-12 flex-column flex-lg-row">
              <div className="articles">
                <div className="row">
                  <div className="col-lg-3">
                    <SubTitle className="filters fw-bold mt-28 mb-28">
                      Filters
                    </SubTitle>
                    <Accordion summary="Year">
                      from
                      <span>
                        <input className="from"></input>
                      </span>
                      to
                      <span>
                        <input className="to ml-20"></input>
                      </span>
                    </Accordion>
                    {/* <Accordion summary="Author"></Accordion>
                    <Accordion summary="Publisher"></Accordion>
                    <Accordion summary="Type"></Accordion> */}
                  </div>
                  <div className="col-lg-9">
                    {!!papers.length && (
                      <div className="mt-28 mb-32 d-flex align-items-center justify-content-between">
                        <CheckBox>Select all on page</CheckBox>
                        <Dropdown title="Sort by"></Dropdown>
                      </div>
                    )}
                    {papers.length != 0 ? (
                      <>
                        {papers.map((article, index) => (
                          <React.Fragment key={index}>
                            <PaperResult data={article} />
                            <div className="hline mt-32 mb-32"></div>
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      <p className="text-center mt-28 mb-32">
                        No results found
                      </p>
                    )}
                    {!!papers.length && (
                      <div className="mt-32 d-flex justify-content-center">
                        <Pagination
                          meta={{ page: 1, lastPage: 25 }}
                          params={{ page: 1, perPage: 10 }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

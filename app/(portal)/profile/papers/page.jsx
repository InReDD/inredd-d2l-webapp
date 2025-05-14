"use client";
import { Paragraph2, Title } from "@/app/_components/Typography";
import "./style.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonLink,
  Pagination,
  SearchInput,
  Table,
} from "@/app/_components";
import routes from "@/helpers/routes";
import { DateTime } from "luxon";

const INITIAL_META = {
  page: 1,
  perPage: 10,
  lastPage: 25,
};

export default function Papers() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [meta, setMeta] = useState(INITIAL_META);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setData([
      {
        id: 123,
        title:
          "The impact of digital filters on the diagnosis of simulated root resorptions in digital radiographic systems",
        authors: [
          "Hugo Gaêta-Araujo",
          "Nicolly Oliveira-Santos",
          "Larissa de Oliveira Reis",
          "Eduarda Helena Leandro Nascimento",
          "Christiano Oliveira-Santos",
        ],
        keywords: ["digital filters", "image", "external"],
        publishDate: new Date(),
      },
      {
        id: 123,
        title:
          "The impact of digital filters on the diagnosis of simulated root resorptions in digital radiographic systems",
        authors: [
          "Hugo Gaêta-Araujo",
          "Nicolly Oliveira-Santos",
          "Larissa de Oliveira Reis",
          "Eduarda Helena Leandro Nascimento",
          "Christiano Oliveira-Santos",
        ],
        keywords: ["digital filters", "image", "external"],
        publishDate: new Date(),
      },
      {
        id: 123,
        title:
          "The impact of digital filters on the diagnosis of simulated root resorptions in digital radiographic systems",
        authors: [
          "Hugo Gaêta-Araujo",
          "Nicolly Oliveira-Santos",
          "Larissa de Oliveira Reis",
          "Eduarda Helena Leandro Nascimento",
          "Christiano Oliveira-Santos",
        ],
        keywords: ["digital filters", "image", "external"],
        publishDate: new Date(),
      },
      {
        id: 123,
        title:
          "The impact of digital filters on the diagnosis of simulated root resorptions in digital radiographic systems",
        authors: [
          "Hugo Gaêta-Araujo",
          "Nicolly Oliveira-Santos",
          "Larissa de Oliveira Reis",
          "Eduarda Helena Leandro Nascimento",
          "Christiano Oliveira-Santos",
        ],
        keywords: ["digital filters", "image", "external"],
        publishDate: new Date(),
      },
    ]);
  };

  useEffect(() => {
    setMeta((state) => ({
      ...state,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    }));
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [meta]);

  return (
    <main id="papers">
      <div className="row mb-20">
        <div className="col-12">
          <Title>Papers</Title>
        </div>
      </div>
      <div className="row mb-24">
        <div className="col-12 col-lg-6">
          <SearchInput disableOptions placeholder="Search for a paper" />
        </div>
        <div className="col-12 col-lg-6 d-flex justify-content-end mt-32 mt-lg-0">
          <Button size="small" variant={"black"} className="mr-16">
            Filter
          </Button>
          <ButtonLink size="small" href={routes.PAPERS_ID()}>
            Upload new
          </ButtonLink>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Table
            data={data}
            columns={[
              {
                label: "ID",
                className: "center",
                accessor: "id",
                width: "10%",
              },
              {
                label: "Title",
                accessor: "title",
              },
              {
                label: "Authors",
                accessor: "authors",
                width: "20%",
                format: ({ item }) => item.join(", "),
              },
              {
                label: "Keywords",
                accessor: "keywords",
                format: ({ item }) => item.join(", "),
              },
              {
                label: "Publish date",
                className: "center",
                accessor: "publishDate",
                width: "15%",
                format: ({ item }) =>
                  item ? DateTime.fromJSDate(item).toFormat("dd/MM/yyyy") : "-",
              },
            ]}
            onClickRow={({ row }) => router.push(routes.PAPERS_ID(row.id))}
          />
        </div>
        {!!data.length && (
          <>
            <div className="row mt-20">
              <div className="col-12 d-flex justify-content-center justify-content-lg-start">
                <Paragraph2>
                  Showing <span className="fw-bold">1-25</span> of{" "}
                  <span className="fw-bold">1,331</span> results
                </Paragraph2>
              </div>
            </div>
            <div className="row mt-20">
              <div className="col-12 d-flex justify-content-center">
                <Pagination meta={meta} params={meta} />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

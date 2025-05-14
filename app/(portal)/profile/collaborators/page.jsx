"use client";

import { Paragraph2, Title } from "@/app/_components/Typography";
import "./style.scss";
import { Button, Pagination, SearchInput, Table } from "@/app/_components";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import routes from "@/helpers/routes";

const INITIAL_META = {
  page: 1,
  perPage: 10,
  lastPage: 25,
};

export default function Collaborators() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [meta, setMeta] = useState(INITIAL_META);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setData([
      {
        id: 123,
        name: "Camila Tirapelli",
        group: "Coordinating Professor",
        email: "camila.tirapelli@usp.br",
        institution: "FORP - USP",
      },
      {
        id: 456,
        name: "Alessandra Alaniz Macedo",
        group: "Coordinating Professor",
        email: "ale.alaniz@usp.br",
        institution: "FORP - USP",
      },
      {
        id: 123,
        name: "Camila Tirapelli",
        group: "Coordinating Professor",
        email: "camila.tirapelli@usp.br",
        institution: "FORP - USP",
      },
      {
        id: 456,
        name: "Alessandra Alaniz Macedo",
        group: "Coordinating Professor",
        email: "ale.alaniz@usp.br",
        institution: "FORP - USP",
      },
      {
        id: 123,
        name: "Camila Tirapelli",
        group: "Coordinating Professor",
        email: "camila.tirapelli@usp.br",
        institution: "FORP - USP",
      },
      {
        id: 456,
        name: "Alessandra Alaniz Macedo",
        group: "Coordinating Professor",
        email: "ale.alaniz@usp.br",
        institution: "FORP - USP",
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
    <main id="collaborators">
      <div className="row mb-20">
        <div className="col-12">
          <Title>Collaborators</Title>
        </div>
      </div>
      <div className="row mb-24">
        <div className="col-12 col-lg-6">
          <SearchInput disableOptions placeholder="Search for a collaborator" />
        </div>
        <div className="col-12 col-lg-6 d-flex justify-content-end mt-32 mt-lg-0">
          <Button size="small" variant={"black"} className="mr-16">
            Filter
          </Button>
          <Button size="small">Invite new</Button>
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
                label: "Name",
                accessor: "name",
              },
              {
                label: "Group",
                accessor: "group",
                width: "15%",
              },
              {
                label: "E-mail",
                accessor: "email",
              },
              {
                label: "Institution",
                accessor: "institution",
              },
            ]}
            onClickRow={({ row }) =>
              router.push(routes.COLLABORATORS_ID(row.id))
            }
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

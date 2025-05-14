"use client";

import { Paragraph2, Title } from "@/app/_components/Typography";
import "./style.scss";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink, Pagination, Table } from "@/app/_components";
import routes from "@/helpers/routes";

const INITIAL_META = {
  page: 1,
  perPage: 10,
  lastPage: 25,
};

export default function Groups() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [meta, setMeta] = useState(INITIAL_META);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setData([
      {
        id: 123,
        name: "Coordinating Professor",
      },
      {
        id: 456,
        name: "Collaborating Researchers",
      },
      {
        id: 123,
        name: "Coordinating Professor",
      },
      {
        id: 456,
        name: "Collaborating Researchers",
      },
      {
        id: 123,
        name: "Coordinating Professor",
      },
      {
        id: 456,
        name: "Collaborating Researchers",
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
    <main id="groups">
      <div className="row mb-20">
        <div className="col-12">
          <Title>Groups</Title>
        </div>
      </div>
      <div className="row mb-24">
        <div className="col-12 d-flex justify-content-end">
          <ButtonLink size="small" href={routes.GROUPS_ID()}>
            Create new
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
                label: "Name",
                accessor: "name",
              },
            ]}
            onClickRow={({ row }) => router.push(routes.GROUPS_ID(row.id))}
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

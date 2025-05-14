import Item from "../item";
import { paginationProps } from './utilProps'
import { Pagination } from "@/components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaginationDoc() {
  const code = () => `import { Pagination } from "@/components";
import { useState, useEffect } from "@/components";
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const page = searchParams.get("page");
const perPage = searchParams.get("perPage");
const [pagination, setPagination] = useState();

useEffect(() => {
  setPagination({
    page: page ? Number(page) : 1,
    lastPage: 14,
  });
}, [page, perPage]);

return (
  <Pagination
    meta={pagination}
  />
);
  `;
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const perPage = searchParams.get("perPage");
  const [pagination, setPagination] = useState();

  useEffect(() => {
    setPagination({
      page: page ? Number(page) : 1,
      lastPage: 14,
    });
  }, [page, perPage]);

  return (
    <Item
      name={"Pagination"}
      description={"Elemento de paginação"}
      code={code()}
      props={paginationProps}
    >
      <Pagination
        meta={pagination}
      />
    </Item>
  );
}

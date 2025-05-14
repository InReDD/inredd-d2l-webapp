"use client";
import "./style.scss";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Pagination({ meta, params, onChange }) {
  const byState = params && onChange;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  if (!meta) return <></>; /// ADD LOADING

  let { page, lastPage } = meta;
  const firstPage = 1;
  const limit = 4;
  const previousPage = page === 1 ? page : page - 1;
  const nextPage = page === lastPage ? page : page + 1;

  if (!page) page = 1;

  if (page > lastPage) {
    router.replace(`${pathname}?${createQueryString("page", lastPage)}`, {
      scroll: false,
    });
  }

  const handlePaginationChange = (page, perPage) => {
    onChange({ page: page, perPage: perPage });
  };

  const pages = () => {
    let pages = [page];

    // adiciona quantas páginas vai ter
    for (let i = 1; i <= limit; i++) {
      if (pages.length < limit) {
        if (pages[pages.length - 1] < lastPage) {
          pages.push(page + i);
        }
      }

      if (pages.length < limit) {
        if (pages[0] > 1) {
          pages.unshift(page - i);
        }
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <nav id={"page-navigation"} aria-label="Page navigation example">
        <ul className="pagination justify-content-center align-items-center">
          <li className="page-item">
            {!byState ? (
              <Link
                className="page-link link-no-bg"
                href={`${pathname}?${createQueryString("page", previousPage)}`}
                aria-label="Previous"
                scroll={false}
              >
                <span aria-hidden="true">
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/arrow-left.png"}
                    alt={"Voltar"}
                  />
                </span>
              </Link>
            ) : (
              <button
                className="page-link  link-no-bg"
                aria-label="Previous"
                onClick={() =>
                  handlePaginationChange(previousPage, params.perPage)
                }
              >
                <span aria-hidden="true">
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/arrow-left.png"}
                    alt={"Voltar"}
                  />
                </span>
              </button>
            )}
          </li>

          {page - 1 > firstPage && lastPage > limit && (
            <>
              <li className="page-item">
                {!byState ? (
                  <Link
                    className={`page-link ${
                      firstPage === page ? "page-link-active" : ""
                    }`}
                    href={`${pathname}?${createQueryString("page", firstPage)}`}
                    scroll={false}
                  >
                    {firstPage}
                  </Link>
                ) : (
                  <button
                    className={`page-link ${
                      firstPage === page ? "page-link-active" : ""
                    }`}
                    onClick={() =>
                      handlePaginationChange(firstPage, params.perPage)
                    }
                  >
                    {firstPage}
                  </button>
                )}
              </li>

              <p className="page-dots">...</p>
            </>
          )}

          {pages().map((pageIndex) => (
            <li key={pageIndex} className="page-item">
              {!byState ? (
                <Link
                  className={`page-link ${
                    page === pageIndex ? "page-link-active" : ""
                  }`}
                  href={`${pathname}?${createQueryString("page", pageIndex)}`}
                  scroll={false}
                >
                  {pageIndex}
                </Link>
              ) : (
                <button
                  className={`page-link ${
                    page === pageIndex ? "page-link-active" : ""
                  }`}
                  onClick={() =>
                    handlePaginationChange(pageIndex, params.perPage)
                  }
                >
                  {pageIndex}
                </button>
              )}
            </li>
          ))}

          {page + 2 < lastPage && lastPage > limit && (
            <>
              <p className="page-dots">...</p>

              <li className="page-item">
                {!byState ? (
                  <Link
                    className={`page-link ${
                      lastPage === page ? "page-link-active" : ""
                    }`}
                    href={`${pathname}?${createQueryString("page", lastPage)}`}
                    scroll={false}
                  >
                    {lastPage}
                  </Link>
                ) : (
                  <button
                    className={`page-link ${
                      lastPage === page ? "page-link-active" : ""
                    }`}
                    onClick={() =>
                      handlePaginationChange(lastPage, params.perPage)
                    }
                  >
                    {lastPage}
                  </button>
                )}
              </li>
            </>
          )}

          <li className="page-item">
            {!byState ? (
              <Link
                className="page-link link-no-bg"
                href={`${pathname}?${createQueryString("page", nextPage)}`}
                aria-label="Next"
                scroll={false}
              >
                <span aria-hidden="true">
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/arrow-right.png"}
                    alt={"Avançar"}
                  />
                </span>
              </Link>
            ) : (
              <button
                className="page-link link-no-bg"
                aria-label="Next"
                onClick={() => handlePaginationChange(nextPage, params.perPage)}
              >
                <span aria-hidden="true">
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/arrow-right.png"}
                    alt={"Avançar"}
                  />
                </span>
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

"use client";

import classNames from "classnames";
import "./style.scss";

export default function Table({ columns, data, onClickRow }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                className={classNames(column.className)}
                width={column.width}
                key={index}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!!data?.length ? (
            <>
              {data.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => onClickRow && onClickRow({ data, row })}
                >
                  {columns.map((column, index) => {
                    return (
                      <td
                        className={classNames(column.className)}
                        width={column.width}
                        key={index}
                      >
                        {column.format
                          ? column.format({
                              data,
                              row,
                              item: row[column.accessor],
                            })
                          : row[column.accessor]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </>
          ) : (
            <tr className="not-found">
              <td className="text-center" colSpan={columns?.length}>
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

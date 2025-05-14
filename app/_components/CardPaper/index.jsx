"use client";
import React from "react";
import "./style.scss";
import classNames from "classnames";
import Link from "next/link";

function CardPaper({
  className,
  title,
  link,
  authors = [],
  keywords = [],
  bordered = false,
  shadow = false,
}) {
  return (
    <div
      className={classNames("card cardpaper", className, {
        "card-bordered": bordered,
        "card-shadow": shadow,
      })}
    >
      <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        {/* <p className="card-text">{authors?.join(", ")}</p> */}
        <div className="card-links-container">
          <p>
            <strong>Keywords:</strong> {keywords?.join(", ")}
          </p>
          <Link href={link} className="card-link">
            see more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardPaper;

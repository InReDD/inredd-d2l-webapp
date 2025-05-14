"use client";
import React from "react";
import "./style.scss";
import classNames from "classnames";
import Link from "next/link";
import { Button } from "..";
import Image from "next/image";

function CardSolution({
  className,
  title,
  description,
  moreInfoLink,
  link,
  hasAccess,
  icon,
  noAccess,
}) {
  return (
    <div className={classNames("card-solution", className)}>
      <div className="card-body">
        <div>
          <h5 className="card-title">
            {icon && (
              <Image className={"mr-8"} src={icon} width={32} height={32} />
            )}
            {title}
          </h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-links-container">
          <Link className="know-more" href={moreInfoLink} target="_blank">
            Know more
          </Link>
          {!noAccess && (
            <>
              {hasAccess ? (
                <Link className="access" href={link}>
                  Access
                  <Image
                    className="ml-8"
                    src={"/icons/external-url.png"}
                    width={16}
                    height={16}
                  />
                </Link>
              ) : (
                <Button size={"small"} variant={"blank"}>
                  Get access +
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardSolution;

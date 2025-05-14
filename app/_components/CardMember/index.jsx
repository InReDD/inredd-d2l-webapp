"use client";
import "./style.scss";
import React from "react";
import classNames from "classnames";
import { ProfilePicture } from "..";

function CardMember({
  className,
  imageSrc,
  title,
  subtitle,
  children,
  bordered = false,
  shadow = false,
}) {
  return (
    <div
      className={classNames("card cardmember", className, {
        "card-bordered": bordered,
        "card-shadow": shadow,
      })}
    >
      <div className="card-content">
        {imageSrc && (
          <ProfilePicture
            src={imageSrc}
            name={title}
            size={"medium-large"}
            className={"mr-8"}
          />
        )}
        <div className="card-text-content">
          {title && <h5 className="card-title">{title}</h5>}
          {subtitle && <h6 className="card-subtitle">{subtitle}</h6>}
        </div>
      </div>
      <div className="children">{children}</div>
    </div>
  );
}

export default CardMember;

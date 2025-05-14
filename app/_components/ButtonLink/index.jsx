"use client";
import classNames from "classnames";
import "./style.scss";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function ButtonLink({
  icon,
  size,
  className,
  variant,
  href,
  target,
  children,
  disabled,
  dataBsDismiss,
  dataBsTarget,
  dataBsToggle,
  iconClassname,
  widthIcon = 20,
  heightIcon = 20,
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (!["small", "medium", "large"].includes(size)) {
    size = "large";
  }

  if (!["secondary", "black", "white"].includes(variant)) {
    variant = "primary";
  }

  function selectImage() {
    const primary = `/icon/icon_images/${icon}.jpg`;
    const secondary = `/icon/icon_images/${icon}-hover.jpg`;

    if (variant === "primary") {
      return isHovered ? primary : secondary;
    }

    if (variant === "secondary") {
      return isHovered ? secondary : primary;
    }

    if (variant === "black") {
      return secondary;
    }

    if (variant === "white") {
      return secondary;
    }

    return primary;
  }

  return (
    <Link
      className={classNames("btn", className, `btn-${variant}`, size)}
      href={href}
      target={target}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...(dataBsDismiss ? { "data-bs-dismiss": dataBsDismiss } : {})}
      {...(dataBsToggle ? { "data-bs-toggle": dataBsToggle } : {})}
      {...(dataBsTarget ? { "data-bs-target": dataBsTarget } : {})}
    >
      {icon ? (
        <div className="childrenWithIcon">
          <Image
            className={iconClassname || ""}
            src={selectImage(icon, variant, isHovered)}
            alt={`Ícone de ${icon}`}
            width={widthIcon}
            height={heightIcon}
          />
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </Link>
  );
}

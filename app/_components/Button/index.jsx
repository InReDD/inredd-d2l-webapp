"use client";
import classNames from "classnames";
import "./style.scss";
import Image from "next/image";
import { useState } from "react";

export default function Button({
  icon,
  size,
  className,
  variant,
  onClick,
  children,
  disabled,
  dataBsDismiss,
  dataBsTarget,
  dataBsToggle,
  iconClassname,
  type = "button",
  widthIcon = 20,
  heightIcon = 20,
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (!["small", "medium", "large"].includes(size)) {
    size = "large";
  }

  if (!["secondary", "black", "white", "blank", "error"].includes(variant)) {
    variant = "primary";
  }

  function selectImage() {
    const primary = `/icons/${icon}.png`;
    const secondary = `/icons/${icon}-white.png`;

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
    <button
      className={classNames("btn", className, `btn-${variant}`, size)}
      onClick={onClick}
      type={type}
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
    </button>
  );
}

"use client";
import "./style.scss";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useOutsideClick, useWindowResize } from "@/helpers/hooks";

function Dropdown({
  title,
  children,
  large,
  className,
  showIcon = true,
  float = true,
  isOrders = false,
  iconType = "",
  direction,
}) {
  const ref = useRef();
  const optionsRef = useRef();
  const { width } = useWindowResize();
  const [isOpen, setIsOpen] = useState(false);
  const [sideToOpen, setSideToOpen] = useState("left");

  const pathIcon = "/icons/";
  const icon = isOpen
    ? `${pathIcon}arrow-up${iconType ? `-${iconType}` : ""}.png`
    : `${pathIcon}arrow-down${iconType ? `-${iconType}` : ""}.png`;

  useOutsideClick(ref, () => setIsOpen(false));

  const toggleDropdown = useCallback(() => {
    setIsOpen((prevOpen) => !prevOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (
        optionsRef.current.getBoundingClientRect().right +
          optionsRef.current.scrollWidth >
        window.innerWidth
      ) {
        setSideToOpen("right");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setSideToOpen("left");
  }, [width]);

  return (
    <div
      ref={ref}
      className={classNames(`dd-container`, className, { "w-100": isOrders })}
    >
      <button onClick={toggleDropdown} aria-expanded={isOpen} title={title}>
        {title}
        {showIcon && (
          <Image
            className="ml-8"
            src={icon}
            alt="Abrir e fechar opções"
            width={12}
            height={12}
          />
        )}
      </button>
      <div
        ref={optionsRef}
        aria-hidden={!isOpen}
        className={classNames(
          "dd-options",
          { float, large },
          { opened: isOpen },
          `menu-direction-${direction || sideToOpen}`,
          { "w-100": isOrders },
        )}
      >
        <ul>{children}</ul>
      </div>
    </div>
  );
}

export default Dropdown;

"use client";
import "./style.scss";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useOutsideClick } from "@/helpers/hooks";
import { compareValues } from "@/helpers";

function SelectDropdown({
  className,
  label,
  alignRight,
  value,
  onChange,
  options = [],
  float = true,
}) {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const pathIcon = "/icons/";
  const icon = isOpen
    ? `${pathIcon}arrow-up.png`
    : `${pathIcon}arrow-down.png`;

  useOutsideClick(ref, () => setIsOpen(false));

  const toggleDropdown = useCallback(() => {
    setIsOpen((prevOpen) => !prevOpen);
  }, []);

  const handleOptionClick = (e) => {
    let newValue = e;

    if (compareValues(value, e)) {
      newValue = null;
    }

    onChange && onChange(newValue);
  };

  useEffect(() => {
    if (value && !float) {
      setIsOpen(true);
    }
  }, [value]);

  return (
    <div ref={ref} className={classNames("select-dd-container", className)}>
      <div>
        <button
          className={classNames({ right: alignRight })}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
        >
          <p className={"text-neutral-1"}>{label}</p>
          <Image
            className="ml-8"
            src={icon}
            alt="Abrir e fechar opções"
            width={12}
            height={12}
          />
        </button>
        <div
          aria-hidden={!isOpen}
          className={classNames("dd-options", { float }, { opened: isOpen })}
        >
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className={classNames({
                  active: compareValues(value, option.value),
                })}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label || option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SelectDropdown;

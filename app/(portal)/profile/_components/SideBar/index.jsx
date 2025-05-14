"use client";

import { Paragraph1 } from "@/app/_components/Typography";
import "./style.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { BsJustify } from "react-icons/bs";
import { useWindowResize } from "@/helpers/hooks";

export default function SideBar({ items }) {
  const pathname = usePathname();
  const windowSize = useWindowResize();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [windowSize]);

  return (
    <>
      <div className="mobile-side-bar d-lg-none">
        <button
          onClick={() => setIsOpen((state) => !state)}
          className="btn-menu mb-16"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <BsJustify fontSize={32} className="mr-8" />
          <Paragraph1>{isOpen ? "Close" : "Open"} menu</Paragraph1>
        </button>
        <div className={classNames("side-bar--mobile", { show: isOpen })}>
          {items.map((item, index) => {
            return (
              <div className="side-bar mb-28" key={index}>
                <Paragraph1 className={"fw-bold"}>{item.title}</Paragraph1>
                <ul className="side-bar--options">
                  {item.options?.map((option, index) => {
                    return (
                      <Link href={option.route} key={index}>
                        <li
                          className={classNames({
                            active: pathname.startsWith(option.route),
                          })}
                        >
                          {option.title}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-none d-lg-block">
        {items.map((item, index) => {
          return (
            <div className="side-bar mb-28" key={index}>
              <Paragraph1 className={"fw-bold"}>{item.title}</Paragraph1>
              <ul className="side-bar--options">
                {item.options?.map((option, index) => {
                  return (
                    <Link href={option.route} key={index}>
                      <li
                        className={classNames({
                          active: pathname.startsWith(option.route),
                        })}
                      >
                        {option.title}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

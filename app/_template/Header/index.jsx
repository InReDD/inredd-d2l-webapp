"use client";
import Image from "next/image";
import "./style.scss";
import Link from "next/link";
import { ButtonLink, Dropdown } from "@/app/_components";
import routes from "@/helpers/routes";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";
import DropdownImage from "@/app/_components/DropdownImage";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuthContext();

  return (
    <div className="header-container">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-start">
            <Link
              href={routes.HOME}
              aria-label="Go home page"
              className="w-100"
            >
              <Image
                className="usp-logo"
                width={364}
                height={53}
                alt="Logo USP"
                src={"/images/logo-usp-full.png"}
              />
            </Link>
          </div>
          <div className="col-12 col-lg-8 d-flex justify-content-center justify-content-lg-end menus-container-wrapper">
            <ul className="menus-container">
              <li
                className={classNames("mr-20", {
                  active: pathname === routes.HOME,
                })}
              >
                <Link href={routes.HOME}>Home</Link>
              </li>
              <li
                className={classNames("mr-20", {
                  active: pathname === routes.DIGITAL_LIBRARY,
                })}
              >
                <Link href={routes.DIGITAL_LIBRARY}>Digital Library</Link>
              </li>
              <li
                className={classNames("mr-20", {
                  active: pathname === routes.MEMBERS,
                })}
              >
                <Link href={routes.MEMBERS}>Members</Link>
              </li>
              <li
                className={classNames("mr-20", {
                  active: [routes.OPEN_DATA, routes.D2L].includes(pathname),
                })}
              >
                <Dropdown
                  title={"Solutions"}
                  iconType="white"
                  direction={"right"}
                >
                  <li>
                    <Link href={routes.OPEN_DATA}>Open Data</Link>
                  </li>
                  <li>
                    <Link href={routes.D2L}>Dental Second Look</Link>
                  </li>
                </Dropdown>
              </li>
              <li>
                {user ? (
                  <DropdownImage user={user} />
                ) : (
                  <ButtonLink href={routes.LOGIN} size={"small"}>
                    Sign in
                  </ButtonLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

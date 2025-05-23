"use client";
import Image from "next/image";
import "./style.scss";
import { Dropdown } from "@/app/_components";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";
import { Paragraph1, Paragraph3 } from "@/app/_components/Typography";
import { Input } from "@/app/_components/Form";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuthContext();

  return (
    <div className="header-container">
      <div className="row col-3">
        <div className="bg-D2l">
          <div className="container">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-center">
                  <Image
                    className="d2l-icon me-3"
                    src="/icons/d2l.png"
                    width={35}
                    height={35}
                    alt="Dental Second Look Icon"
                  />
                  <Paragraph1 className="mb-0">
                    <span className="text-neutral-1">Dental Second Look</span>
                  </Paragraph1>
                </div>
                <div className="col-12">
                  <div className="hline mt-20"></div>
                </div>
                <div className="d-flex justify-content-between align-items-center m-10">
                  <Paragraph1 className="mt-16 text-neutral-1">
                    <span>Pacients</span>
                  </Paragraph1>
                  <Paragraph3 className="mt-20 text-neutral-1">
                    <span>add new +</span>
                  </Paragraph3>
                </div>
                <div className="w-100 mt-4 m-10">
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Search for a pacient..."
                    required
                  />
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="row col-12">
        <div className="bg-Dashboard">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <div className="col-12 col-md-6 text-start ">
                <Paragraph1 className="mb-0">
                  <span className="text-neutral-2">Dashboard</span>
                </Paragraph1>
              </div>
              <div className="col-12">
                <Dropdown
                  title={"Solutions"}
                  iconType="white"
                  direction="down"
                >
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

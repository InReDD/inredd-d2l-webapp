"use client";
import Image from "next/image";
import "./style.scss";
import { Dropdown } from "@/app/_components";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";
import { Paragraph1 } from "@/app/_components/Typography";



export default function Header() {
  const pathname = usePathname();
  const { user } = useAuthContext();

  return (
    <div className="header-container">
      <div className="container">
        <div className="row align-items-center justify-content-between mt-20 mb-20">
          <div className="col-auto">
            <Paragraph1>
              <span className="text-neutral-2">Dashboard</span>
            </Paragraph1>
          </div>

          <div className="col-auto">
            <Dropdown
              title={"Solutions"}
              iconType="white"
              direction={"down"}
            >
              aaaa
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

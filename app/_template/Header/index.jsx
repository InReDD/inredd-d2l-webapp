"use client";
import "./style.scss";
import { Dropdown } from "@/app/_components";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";
import { Paragraph1 } from "@/app/_components/Typography";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuthContext();

  return (
    <div className="">
      {/* <div className="container">
        <div className="row align-items-center justify-content-between mt-20 mb-20">
          <div className="col-auto">
            <Paragraph1>
              <span className="text-neutral-2">Dashboard</span>
            </Paragraph1>
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
      </div> */}
    </div>
  );
}

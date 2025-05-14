import "./style.scss";
import { Dropdown, ProfilePicture } from "@/components";
import Link from "next/link";
import Image from "next/image";
import routes from "@/helpers/routes";

export default function DropdownImage({ user = { name: "Camila" } }) {
  return (
    <div className="dropdown-image">
      <Dropdown
        iconType={"white"}
        title={
          <div className="card-container">
            <ProfilePicture
              src={user?.profilePicture}
              name={user?.name}
              className={"mr-4"}
              size={"small"}
            />

            <div className="dropdown-text">
              <h6 className="card-subtitle">Olá</h6>
              <h5 className="card-title">{user?.name}</h5>
            </div>
          </div>
        }
      >
        <Link href={routes.MY_SOLUTIONS}>
          <option className="mb-8">My solutions</option>
        </Link>
        <Link href={routes.PERSONAL_DATA}>
          <option className="mb-8">My Profile</option>
        </Link>
        <Link href={"/"}>
          <option className="mb-8">Dental Second Look (D2L)</option>
        </Link>
        <Link href={"/"}>
          <option className="mb-8">Open Data</option>
        </Link>
        <button className="btn-logout" onClick={() => {}}>
          Log Out
        </button>
      </Dropdown>
    </div>
  );
}

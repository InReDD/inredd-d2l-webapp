import "./style.scss";
import routes from "@/helpers/routes";
import { Button, Dropdown } from "@/components";
import Link from "next/link";
import { Input } from "../Form";
import { AiOutlineSearch } from "react-icons/ai";
import classNames from "classnames";

export default function SearchInput({
  disableOptions = false,
  placeholder = "Search for a topic",
}) {
  return (
    <div className={classNames("search-input", { disableOptions })}>
      {!disableOptions && (
        <Dropdown title="All">
          <option>
            <Link href={routes.OPEN_DATA}>Open Data</Link>
          </option>
          <option>
            <Link href={routes.D2L}>Dental Second Look</Link>
          </option>
        </Dropdown>
      )}
      <Input placeholder={placeholder} disableValidation />
      <Button size={"small"} variant={"primary"}>
        <AiOutlineSearch size={24} />
      </Button>
    </div>
  );
}

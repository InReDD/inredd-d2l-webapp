import "./style.scss";
import routes from "@/helpers/routes";
import classNames from "classnames";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";

export default function BackButton({
  href = routes.HOME,
  className,
  title = "Go back",
}) {
  return (
    <Link
      title={title}
      className={classNames("back-button", className)}
      href={href}
    >
      <AiOutlineLeft />
    </Link>
  );
}

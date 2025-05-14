import classNames from "classnames";
import "../typography.scss";

export default function Paragraph2({ children, className }) {
  return <p className={classNames("paragraph2", className)}>{children}</p>;
}

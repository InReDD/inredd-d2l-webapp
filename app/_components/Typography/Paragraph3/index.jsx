import classNames from "classnames";
import "../typography.scss";

export default function Paragraph3({ children, className }) {
  return <p className={classNames("paragraph3", className)}>{children}</p>;
}

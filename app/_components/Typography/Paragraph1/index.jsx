import classNames from "classnames";
import "../typography.scss";

export default function Paragraph1({ children, className }) {
  return <p className={classNames("paragraph1", className)}>{children}</p>;
}

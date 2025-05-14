import classNames from "classnames";
import "../typography.scss";

export default function Title({ children, className }) {
  return <h1 className={classNames("title", className)}>{children}</h1>;
}

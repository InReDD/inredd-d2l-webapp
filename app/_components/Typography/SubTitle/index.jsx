import classNames from "classnames";
import "../typography.scss";

export default function SubTitle({ children, className }) {
  return <h2 className={classNames("subTitle", className)}>{children}</h2>;
}
